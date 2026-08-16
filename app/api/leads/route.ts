import { LeadRecord, WebhookLeadProvider, validateLead } from "../../lib/leads";

const attempts = new Map<string, { count: number; resetAt: number }>();

function limited(key: string) {
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + 10 * 60_000 });
    return false;
  }
  current.count += 1;
  return current.count > 5;
}

const reply = (body: { error?: string; ok?: boolean }, status: number) => Response.json(body, { status, headers: { "cache-control": "no-store" } });

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 24_000) return reply({ error: "Solicitação muito grande." }, 413);
  let input: unknown;
  try { input = await request.json(); } catch { return reply({ error: "Não foi possível ler a solicitação." }, 400); }
  const validation = validateLead(input);
  if (!validation.ok) return reply({ error: validation.error }, 400);
  const { lead } = validation;
  if (lead.companyWebsite) return reply({ ok: true }, 200);
  if (!lead.formStartedAt || Date.now() - lead.formStartedAt < 1_200) return reply({ error: "Revise os dados e tente novamente." }, 400);
  const requester = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || "local";
  if (limited(requester.split(",")[0].trim())) return reply({ error: "Muitas tentativas. Aguarde alguns minutos." }, 429);
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  if (!webhookUrl) return reply({ error: "O envio online está temporariamente indisponível. Use o WhatsApp para falar com a equipe." }, 503);

  const record: LeadRecord = {
    source: lead.source,
    propertyType: lead.propertyType,
    city: lead.city,
    monthlyBill: lead.monthlyBill,
    utility: lead.utility,
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    message: lead.message,
    consent: lead.consent,
    origin: lead.origin,
    submittedAt: new Date().toISOString(),
  };
  try {
    await new WebhookLeadProvider(webhookUrl, process.env.LEADS_WEBHOOK_SECRET).send(record);
    return reply({ ok: true }, 201);
  } catch {
    return reply({ error: "Não foi possível enviar agora. Seus dados continuam no formulário; tente novamente ou use o WhatsApp." }, 502);
  }
}
