"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { company, whatsappUrl } from "../../company";
import { Arrow } from "../ui/Elements";

const types = ["Residencial", "Empresarial", "Propriedade rural", "Outro"] as const;
const phoneMask = (value: string) => value.replace(/\D/g, "").slice(0, 11).replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d{1,4})$/, "$1-$2");

async function sendLead(payload: Record<string, unknown>) {
  const response = await fetch("/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
  const result = await response.json().catch(() => ({ error: "Não foi possível concluir o envio." }));
  if (!response.ok) throw new Error(result.error || "Não foi possível concluir o envio.");
}

type Status = "idle" | "sending" | "success" | "error";

export function Simulator({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [data, setData] = useState({ propertyType: "", city: "", monthlyBill: 800, utility: "", name: "", phone: "", email: "", consent: false, companyWebsite: "" });
  const startedAt = useRef(0);
  useEffect(() => { startedAt.current = Date.now(); }, []);
  const set = <K extends keyof typeof data>(key: K, value: (typeof data)[K]) => setData(current => ({ ...current, [key]: value }));
  const next = () => {
    if (step === 1 && !data.propertyType) return setError("Selecione o tipo de imóvel.");
    if (step === 2 && data.city.trim().length < 2) return setError("Informe a cidade do projeto.");
    setError(""); setStep(current => Math.min(4, current + 1));
  };
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setError("");
    if (data.name.trim().length < 2 || data.phone.replace(/\D/g, "").length < 10 || !data.email.includes("@") || !data.consent) return setError("Revise nome, WhatsApp, e-mail e autorização de contato.");
    setStatus("sending");
    try { await sendLead({ ...data, source: "simulator", origin: window.location.href, formStartedAt: startedAt.current }); setStatus("success"); }
    catch (reason) { setStatus("error"); setError(reason instanceof Error ? reason.message : "Não foi possível enviar."); }
  };

  if (status === "success") return <div className={`lead-success ${compact ? "is-compact" : ""}`} role="status"><span aria-hidden="true">✓</span><p className="label">Solicitação enviada</p><h3>Os dados chegaram à Aba Sol.</h3><p>A equipe poderá continuar a análise a partir das informações enviadas.</p><a className="button button--dark" href={whatsappUrl(`Olá! Enviei uma solicitação para um projeto ${data.propertyType.toLowerCase()} em ${data.city}.`)} target="_blank" rel="noreferrer">Continuar no WhatsApp <Arrow /></a></div>;

  return <form className={`simulator ${compact ? "is-compact" : ""}`} onSubmit={submit} noValidate aria-busy={status === "sending"}>
    <div className="simulator__progress"><span>Etapa {step} de 4</span><i><b style={{ width: `${step * 25}%` }} /></i></div>
    <div className="simulator__body">
      {step === 1 && <fieldset><legend>Qual é o tipo de imóvel?</legend><p>Essa escolha orienta as perguntas da análise.</p><div className="choice-grid">{types.map(type => <button type="button" aria-pressed={data.propertyType === type} key={type} onClick={() => { set("propertyType", type); setError(""); }}>{type}<Arrow /></button>)}</div></fieldset>}
      {step === 2 && <fieldset><legend>Onde fica o projeto?</legend><p>A região e as condições do local fazem parte do estudo.</p><label>Cidade ou CEP<input autoComplete="postal-code" value={data.city} onChange={event => set("city", event.target.value)} placeholder="Ex.: São José do Rio Preto" /></label></fieldset>}
      {step === 3 && <fieldset><legend>Qual é o valor médio da conta?</legend><p>O valor inicia a leitura do consumo. Ele não gera uma promessa automática de economia.</p><output className="bill-output"><small>R$</small>{data.monthlyBill.toLocaleString("pt-BR")}</output><input aria-label="Valor médio mensal da conta de energia" type="range" min="150" max="5000" step="50" value={data.monthlyBill} onChange={event => set("monthlyBill", Number(event.target.value))} /><div className="range-labels"><span>R$ 150</span><span>R$ 5.000+</span></div><label>Concessionária <span>(opcional)</span><input value={data.utility} onChange={event => set("utility", event.target.value)} /></label></fieldset>}
      {step === 4 && <fieldset><legend>Como a equipe pode falar com você?</legend><div className="form-grid"><label>Nome<input autoComplete="name" value={data.name} onChange={event => set("name", event.target.value)} /></label><label>WhatsApp<input autoComplete="tel" inputMode="tel" value={data.phone} onChange={event => set("phone", phoneMask(event.target.value))} placeholder="(17) 99999-9999" /></label><label className="wide">E-mail<input autoComplete="email" type="email" value={data.email} onChange={event => set("email", event.target.value)} /></label><label className="honeypot" aria-hidden="true">Site da empresa<input tabIndex={-1} autoComplete="off" value={data.companyWebsite} onChange={event => set("companyWebsite", event.target.value)} /></label></div><label className="consent"><input type="checkbox" checked={data.consent} onChange={event => set("consent", event.target.checked)} /><span>Autorizo o contato da {company.shortName} sobre esta solicitação e li a política de privacidade.</span></label></fieldset>}
      {error && <p className="form-message form-message--error" role="alert">{error}</p>}
    </div>
    <div className="simulator__actions">{step > 1 && <button className="text-button" type="button" onClick={() => { setError(""); setStep(current => current - 1); }}>← Voltar</button>}{step < 4 ? <button className="button button--dark" type="button" onClick={next}>Continuar <Arrow /></button> : <button className="button button--dark" disabled={status === "sending"} type="submit">{status === "sending" ? "Enviando…" : "Enviar para análise"} <Arrow /></button>}</div>
  </form>;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [data, setData] = useState({ name: "", phone: "", email: "", city: "", propertyType: "", message: "", consent: false, companyWebsite: "" });
  const startedAt = useRef(0);
  useEffect(() => { startedAt.current = Date.now(); }, []);
  const set = <K extends keyof typeof data>(key: K, value: (typeof data)[K]) => setData(current => ({ ...current, [key]: value }));
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setError(""); setStatus("sending");
    try { await sendLead({ ...data, source: "contact", origin: window.location.href, formStartedAt: startedAt.current }); setStatus("success"); }
    catch (reason) { setStatus("error"); setError(reason instanceof Error ? reason.message : "Não foi possível enviar."); }
  };
  if (status === "success") return <div className="lead-success lead-success--dark" role="status"><span aria-hidden="true">✓</span><p className="label">Solicitação enviada</p><h3>Mensagem recebida.</h3><p>A equipe poderá responder pelos dados informados.</p><a className="button button--sun" href={whatsappUrl()} target="_blank" rel="noreferrer">Abrir WhatsApp <Arrow /></a></div>;
  return <form className="contact-form" onSubmit={submit} noValidate aria-busy={status === "sending"}><div className="form-grid"><label>Nome<input required autoComplete="name" value={data.name} onChange={event => set("name", event.target.value)} /></label><label>WhatsApp<input required autoComplete="tel" inputMode="tel" value={data.phone} onChange={event => set("phone", phoneMask(event.target.value))} placeholder="(17) 99999-9999" /></label><label>E-mail<input required autoComplete="email" type="email" value={data.email} onChange={event => set("email", event.target.value)} /></label><label>Cidade<input required autoComplete="address-level2" value={data.city} onChange={event => set("city", event.target.value)} /></label><label className="wide">Tipo de projeto<select required value={data.propertyType} onChange={event => set("propertyType", event.target.value)}><option value="">Selecione</option>{types.map(type => <option key={type}>{type}</option>)}</select></label><label className="wide">Mensagem <span>(opcional)</span><textarea rows={5} value={data.message} onChange={event => set("message", event.target.value)} placeholder="Conte brevemente sobre o imóvel e o consumo." /></label><label className="honeypot" aria-hidden="true">Site da empresa<input tabIndex={-1} autoComplete="off" value={data.companyWebsite} onChange={event => set("companyWebsite", event.target.value)} /></label></div><label className="consent"><input type="checkbox" checked={data.consent} onChange={event => set("consent", event.target.checked)} /><span>Autorizo o contato da {company.shortName} sobre esta solicitação.</span></label>{error && <p className="form-message form-message--error" role="alert">{error}</p>}<button className="button button--sun" disabled={status === "sending"} type="submit">{status === "sending" ? "Enviando…" : "Enviar solicitação"} <Arrow /></button></form>;
}
