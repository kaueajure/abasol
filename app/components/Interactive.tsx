"use client";

import { FormEvent, PointerEvent, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { company, whatsappUrl } from "../company";
import { solutions } from "../content";

const Arrow = () => <span aria-hidden="true">↗</span>;

export function Header({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className={`site-header ${solid ? "is-solid" : ""} ${scrolled ? "is-scrolled" : ""}`}>
        <Link className="brand" href="/" aria-label="Aba Sol — início" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>
          <span>ABA SOL</span>
        </Link>
        <nav aria-label="Navegação principal">
          <Link href="/solucoes">Soluções</Link>
          <Link href="/como-funciona">Como funciona</Link>
          <Link href="/projetos">Projetos</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/conteudos">Conteúdo</Link>
        </nav>
        <Link className="header-cta" href="/simulador">Simular economia <Arrow /></Link>
        <button className="menu-toggle" type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
      </header>
      <div className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <p className="eyebrow">Navegação</p>
        <div className="mobile-links">
          {[['Início','/'],['Soluções','/solucoes'],['Como funciona','/como-funciona'],['Projetos','/projetos'],['Sobre','/sobre'],['Conteúdo','/conteudos'],['Contato','/contato']].map(([label, href], index) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}><small>0{index + 1}</small>{label}</Link>
          ))}
        </div>
        <Link className="button button-primary" href="/simulador" onClick={() => setOpen(false)}>Simular meu projeto <Arrow /></Link>
      </div>
    </>
  );
}

export function SolarPanelTilt() {
  const move = (event: PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - .5;
    const y = (event.clientY - box.top) / box.height - .5;
    event.currentTarget.style.setProperty("--rx", `${-y * 7}deg`);
    event.currentTarget.style.setProperty("--ry", `${x * 9}deg`);
    event.currentTarget.style.setProperty("--shine", `${45 + x * 22}%`);
  };
  const reset = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--rx", "-2deg");
    event.currentTarget.style.setProperty("--ry", "3deg");
  };
  return (
    <div className="panel-stage" onPointerMove={move} onPointerLeave={reset}>
      <div className="solar-object" role="img" aria-label="Representação tridimensional de um módulo fotovoltaico">
        {Array.from({ length: 48 }).map((_, index) => <span key={index} />)}
      </div>
      <p>Objeto fotovoltaico <b>48 células</b></p>
    </div>
  );
}

export function SolutionSelector() {
  const [selected, setSelected] = useState(0);
  const solution = solutions[selected];
  return (
    <div className="solution-selector">
      <div className="solution-image-wrap">
        {solutions.map((item, index) => <Image key={item.slug} className={index === selected ? "is-active" : ""} src={item.image} alt="" fill sizes="(max-width: 1024px) 100vw, 60vw" />)}
        <span className="image-credit">Imagem de referência arquitetônica</span>
      </div>
      <div className="solution-copy">
        <div className="solution-tabs" role="tablist" aria-label="Tipos de projeto">
          {solutions.map((item, index) => (
            <button key={item.slug} role="tab" aria-selected={index === selected} onClick={() => setSelected(index)}>
              <span>0{index + 1}</span>{item.title}
            </button>
          ))}
        </div>
        <p className="eyebrow">{solution.kicker}</p>
        <h3>{solution.title}</h3>
        <p>{solution.description}</p>
        <Link className="text-link dark" href={`/solucoes/${solution.slug}`}>Explorar solução <Arrow /></Link>
      </div>
    </div>
  );
}

const propertyTypes = ["Residencial", "Empresa", "Propriedade rural", "Outro"];

export function EnergySimulator({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState(1);
  const [property, setProperty] = useState("");
  const [location, setLocation] = useState("");
  const [bill, setBill] = useState(800);
  const [utility, setUtility] = useState("");
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const next = () => {
    if (step === 1 && !property) return setError("Selecione o tipo de imóvel.");
    if (step === 2 && location.trim().length < 3) return setError("Informe sua cidade ou CEP.");
    setError(""); setStep(Math.min(5, step + 1));
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!contact.name || contact.phone.replace(/\D/g, "").length < 10 || !contact.email.includes("@")) return setError("Revise nome, WhatsApp e e-mail.");
    setError(""); setSent(true);
  };
  const phoneMask = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    return digits.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d{1,4})$/, "$1-$2");
  };

  if (sent) return (
    <div className={`simulator success ${compact ? "compact" : ""}`}>
      <span className="success-mark">✓</span>
      <p className="eyebrow">Solicitação registrada</p>
      <h3>Agora entra a análise humana.</h3>
      <p>Recebemos os dados do seu projeto. A equipe irá preparar uma análise com base no consumo informado e nas condições do imóvel. Nenhuma economia foi estimada sem os parâmetros técnicos necessários.</p>
      <a className="button button-dark" href={whatsappUrl(`Olá! Acabei de simular um projeto ${property.toLowerCase()} em ${location}.`)}>Continuar no WhatsApp <Arrow /></a>
    </div>
  );

  return (
    <form className={`simulator ${compact ? "compact" : ""}`} onSubmit={submit} noValidate>
      <div className="simulator-head">
        <span>Etapa {step} de 5</span>
        <div className="progress" aria-label={`${step * 20}% concluído`}><i style={{ width: `${step * 20}%` }} /></div>
      </div>
      <div className="simulator-body">
        {step === 1 && <fieldset><legend>Qual é o seu tipo de imóvel?</legend><p>Isso orienta as próximas perguntas da análise.</p><div className="choice-grid">{propertyTypes.map(item => <button type="button" className={property === item ? "selected" : ""} key={item} onClick={() => { setProperty(item); setError(""); }}>{item}<span>→</span></button>)}</div></fieldset>}
        {step === 2 && <fieldset><legend>Onde fica o projeto?</legend><p>Informe a cidade ou o CEP do imóvel.</p><label>Cidade ou CEP<input value={location} onChange={event => setLocation(event.target.value)} placeholder="Ex.: São José do Rio Preto" /></label></fieldset>}
        {step === 3 && <fieldset><legend>Quanto você paga de energia por mês?</legend><p>Use uma média aproximada dos últimos meses.</p><div className="bill-value"><span>R$</span>{bill.toLocaleString("pt-BR")}</div><input aria-label="Valor mensal da conta" type="range" min="150" max="5000" step="50" value={bill} onChange={event => setBill(Number(event.target.value))} /><div className="range-labels"><span>R$ 150</span><span>R$ 5.000+</span></div><div className="no-estimate">O valor ajuda no dimensionamento. Não exibimos estimativas automáticas sem parâmetros técnicos validados.</div></fieldset>}
        {step === 4 && <fieldset><legend>Qual é a concessionária?</legend><p>Esta etapa é opcional.</p><label>Concessionária<input value={utility} onChange={event => setUtility(event.target.value)} placeholder="Digite se souber" /></label></fieldset>}
        {step === 5 && <fieldset><legend>Para onde enviamos a análise?</legend><p>Seus dados serão usados somente para o atendimento solicitado.</p><div className="form-grid"><label>Nome<input value={contact.name} onChange={event => setContact({ ...contact, name: event.target.value })} /></label><label>WhatsApp<input inputMode="tel" value={contact.phone} onChange={event => setContact({ ...contact, phone: phoneMask(event.target.value) })} placeholder="(17) 99999-9999" /></label><label className="wide">E-mail<input type="email" value={contact.email} onChange={event => setContact({ ...contact, email: event.target.value })} /></label></div><label className="check"><input required type="checkbox" /> <span>Concordo com o uso dos dados para retorno sobre esta solicitação.</span></label></fieldset>}
        {error && <p className="form-error" role="alert">{error}</p>}
      </div>
      <div className="simulator-actions">
        {step > 1 && <button type="button" className="back" onClick={() => { setError(""); setStep(step - 1); }}>← Voltar</button>}
        {step < 5 ? <button type="button" className="button button-dark" onClick={next}>Continuar <Arrow /></button> : <button type="submit" className="button button-dark">Solicitar análise <Arrow /></button>}
      </div>
    </form>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setLoading(true);
    window.setTimeout(() => { setLoading(false); setSent(true); }, 550);
  };
  if (sent) return <div className="contact-success"><span>✓</span><h3>Solicitação pronta para análise.</h3><p>Obrigado. Você também pode continuar pelo WhatsApp para falar diretamente com a equipe.</p><a className="button button-primary" href={whatsappUrl()}>Abrir WhatsApp <Arrow /></a></div>;
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-grid"><label>Nome<input required /></label><label>WhatsApp<input required inputMode="tel" placeholder="(17) 99999-9999" /></label><label>E-mail<input required type="email" /></label><label>Cidade<input required /></label><label className="wide">Tipo de projeto<select required defaultValue=""><option value="" disabled>Selecione</option>{propertyTypes.map(item => <option key={item}>{item}</option>)}</select></label><label className="wide">Mensagem<textarea rows={5} placeholder="Conte brevemente sobre o imóvel e sua conta de energia." /></label></div>
      <label className="check"><input required type="checkbox" /><span>Autorizo o contato da {company.shortName} sobre esta solicitação.</span></label>
      <button disabled={loading} className="button button-primary" type="submit">{loading ? "Enviando…" : "Enviar solicitação"} <Arrow /></button>
    </form>
  );
}

export function ProjectFilters() {
  const [filter, setFilter] = useState("Todos");
  return (
    <div className="project-empty">
      <div className="filter-row" role="group" aria-label="Filtrar projetos">{["Todos", "Residencial", "Empresarial", "Rural"].map(item => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div>
      <div className="project-placeholder"><p className="eyebrow">Acervo em preparação</p><h3>Nenhum case é publicado sem validação.</h3><p>Esta galeria está pronta para receber fotografias, cidade, categoria, capacidade e resultados dos projetos reais da Aba Sol. Até essa curadoria terminar, o site não cria números ou obras fictícias.</p><Link className="text-link dark" href="/projetos/modelo-de-case">Ver o modelo editorial <Arrow /></Link></div>
    </div>
  );
}
