export type LeadSource = "simulator" | "contact";

export type LeadInput = {
  source: LeadSource;
  propertyType: string;
  city: string;
  monthlyBill?: number;
  utility?: string;
  name: string;
  phone: string;
  email: string;
  message?: string;
  consent: boolean;
  origin: string;
  formStartedAt: number;
  companyWebsite?: string;
};

export type LeadRecord = Omit<LeadInput, "companyWebsite" | "formStartedAt"> & { submittedAt: string };

const clean = (value: unknown, max = 240) => typeof value === "string" ? value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, max) : "";

export function validateLead(value: unknown): { ok: true; lead: LeadInput } | { ok: false; error: string } {
  if (!value || typeof value !== "object") return { ok: false, error: "Dados inválidos." };
  const input = value as Record<string, unknown>;
  const source = input.source === "simulator" || input.source === "contact" ? input.source : null;
  const lead: LeadInput = {
    source: source ?? "contact",
    propertyType: clean(input.propertyType, 60),
    city: clean(input.city, 120),
    monthlyBill: typeof input.monthlyBill === "number" && Number.isFinite(input.monthlyBill) ? Math.round(input.monthlyBill) : undefined,
    utility: clean(input.utility, 100) || undefined,
    name: clean(input.name, 120),
    phone: clean(input.phone, 24),
    email: clean(input.email, 160).toLowerCase(),
    message: clean(input.message, 1600) || undefined,
    consent: input.consent === true,
    origin: clean(input.origin, 300),
    formStartedAt: typeof input.formStartedAt === "number" ? input.formStartedAt : 0,
    companyWebsite: clean(input.companyWebsite, 200) || undefined,
  };
  if (!source) return { ok: false, error: "Origem da solicitação inválida." };
  if (!lead.propertyType) return { ok: false, error: "Informe o tipo de imóvel." };
  if (lead.city.length < 2) return { ok: false, error: "Informe a cidade do projeto." };
  if (lead.name.length < 2) return { ok: false, error: "Informe seu nome." };
  if (lead.phone.replace(/\D/g, "").length < 10) return { ok: false, error: "Informe um WhatsApp válido." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return { ok: false, error: "Informe um e-mail válido." };
  if (!lead.consent) return { ok: false, error: "Autorize o contato para enviar a solicitação." };
  if (lead.source === "simulator" && (!lead.monthlyBill || lead.monthlyBill < 1)) return { ok: false, error: "Informe o valor aproximado da conta." };
  return { ok: true, lead };
}

export interface LeadProvider { send(lead: LeadRecord): Promise<void> }

export class WebhookLeadProvider implements LeadProvider {
  constructor(private readonly url: string, private readonly secret?: string) {}
  async send(lead: LeadRecord) {
    const response = await fetch(this.url, {
      method: "POST",
      headers: { "content-type": "application/json", ...(this.secret ? { authorization: `Bearer ${this.secret}` } : {}) },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) throw new Error(`Lead provider returned ${response.status}`);
  }
}
