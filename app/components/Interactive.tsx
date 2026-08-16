"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { company, whatsappUrl } from "../company";
import { solutions } from "../content";

const Arrow = () => <span aria-hidden="true">↗</span>;

export function Header({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 24);
        const heroProgress = Math.min(1, window.scrollY / Math.max(window.innerHeight, 1));
        document.documentElement.style.setProperty("--hero-progress", heroProgress.toFixed(3));
        document.documentElement.style.setProperty("--hero-shift", `${window.scrollY * .16}px`);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("is-revealed"); });
    }, { threshold: .16 });
    const observeReveals = () => document.querySelectorAll("[data-reveal]").forEach(element => observer.observe(element));
    observeReveals();
    const mutationObserver = new MutationObserver(observeReveals);
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    return () => { window.removeEventListener("scroll", update); observer.disconnect(); mutationObserver.disconnect(); window.cancelAnimationFrame(frame); };
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

const panelStory = [
  { label: "Captação", title: "A luz chega às células.", text: "Orientação, inclinação e sombras mudam o que o módulo pode captar." },
  { label: "Conversão", title: "O inversor prepara a energia.", text: "A corrente produzida pelos módulos é convertida para uso no imóvel." },
  { label: "Consumo", title: "A geração atende a instalação.", text: "A energia produzida passa a alimentar as cargas conectadas ao sistema." },
  { label: "Monitoramento", title: "A produção fica visível.", text: "O acompanhamento depende dos equipamentos definidos no projeto." },
] as const;

const panelFrames = [
  { rx: 58, ry: -28, rz: -12, scale: .62, x: 31, y: 15, shine: 16 },
  { rx: 24, ry: -12, rz: -5, scale: .82, x: 19, y: 7, shine: 36 },
  { rx: 5, ry: 1, rz: 0, scale: 1.02, x: 8, y: -1, shine: 54 },
  { rx: 20, ry: 19, rz: 4, scale: 1.12, x: -2, y: -4, shine: 75 },
  { rx: 2, ry: 0, rz: 0, scale: 1.2, x: -12, y: 25, shine: 88 },
] as const;

const mix = (a: number, b: number, amount: number) => a + (b - a) * amount;

export function SolarScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let scheduled = false;
    const render = () => {
      scheduled = false;
      if (reduced.matches) return;
      const rect = section.getBoundingClientRect();
      const range = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / range));
      const scaled = progress * 4;
      const index = Math.min(3, Math.floor(scaled));
      const local = Math.min(1, scaled - index);
      const start = panelFrames[index];
      const end = panelFrames[index + 1];
      stage.style.setProperty("--panel-rx", `${mix(start.rx, end.rx, local)}deg`);
      stage.style.setProperty("--panel-ry", `${mix(start.ry, end.ry, local)}deg`);
      stage.style.setProperty("--panel-rz", `${mix(start.rz, end.rz, local)}deg`);
      stage.style.setProperty("--panel-scale", `${mix(start.scale, end.scale, local)}`);
      stage.style.setProperty("--panel-x", `${mix(start.x, end.x, local)}vw`);
      stage.style.setProperty("--panel-y", `${mix(start.y, end.y, local)}vh`);
      stage.style.setProperty("--panel-shine", `${mix(start.shine, end.shine, local)}%`);
      stage.style.setProperty("--story-progress", `${progress}`);
      setActive(current => current === index ? current : index);
    };
    const queue = () => { if (!scheduled) { scheduled = true; window.requestAnimationFrame(render); } };
    render();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => { window.removeEventListener("scroll", queue); window.removeEventListener("resize", queue); };
  }, []);

  return (
    <section className="solar-scroll-story" ref={sectionRef} aria-label="Como a energia percorre o sistema">
      <div className="solar-scroll-sticky" ref={stageRef}>
        <div className="story-grid" aria-hidden="true" />
        <div className="story-heading"><p className="eyebrow">Como o sistema trabalha</p><span>Role para acompanhar</span></div>
        <div className="story-copy" aria-live="polite">
          {panelStory.map((item, index) => <article key={item.label} className={active === index ? "is-active" : ""}><span>0{index + 1} · {item.label}</span><h2>{item.title}</h2><p>{item.text}</p></article>)}
        </div>
        <div className="story-panel-wrap" aria-hidden="true">
          <div className="story-panel"><div className="story-cells">{Array.from({ length: 60 }).map((_, index) => <i key={index} />)}</div></div>
        </div>
        <div className="story-rail" aria-hidden="true"><i /><span>01</span><span>02</span><span>03</span><span>04</span></div>
        <div className="story-spec" aria-hidden="true"><span>Módulo fotovoltaico</span><b>superfície · célula · estrutura</b></div>
      </div>
      <div className="story-reduced">
        {panelStory.map((item, index) => <article key={item.label}><span>0{index + 1}</span><h3>{item.label}</h3><p>{item.text}</p></article>)}
      </div>
    </section>
  );
}

export function SolutionScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const range = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(.999, -rect.top / range));
      const scaled = progress * 3;
      const index = Math.min(2, Math.floor(scaled));
      stage.style.setProperty("--solution-local", `${scaled - index}`);
      setActive(current => current === index ? current : index);
    };
    const queue = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => { window.removeEventListener("scroll", queue); window.removeEventListener("resize", queue); window.cancelAnimationFrame(frame); };
  }, []);

  return (
    <section className="solution-scroll" ref={sectionRef} aria-label="Soluções por tipo de imóvel">
      <div className="solution-scroll-sticky" ref={stageRef}>
        <div className="solution-visuals">
          {solutions.map((item, index) => <Image key={item.slug} className={`${active === index ? "is-active" : ""} ${index < active ? "is-past" : ""}`} src={item.image} alt="" fill sizes="100vw" />)}
        </div>
        <div className="solution-shade" />
        <div className="solution-scroll-title"><p className="eyebrow">Projetos por contexto</p><span>Residencial · Empresarial · Rural</span></div>
        <div className="solution-scroll-copy">
          <span>0{active + 1}</span><h2>{solutions[active].title}</h2><p>{solutions[active].description}</p><Link className="text-link" href={`/solucoes/${solutions[active].slug}`}>Ver solução <Arrow /></Link>
        </div>
        <div className="solution-dots" aria-hidden="true">{solutions.map((item, index) => <i key={item.slug} className={active === index ? "is-active" : ""} />)}</div>
      </div>
      <div className="solution-reduced">
        {solutions.map((item, index) => <article key={item.slug}><Image src={item.image} alt="" width={900} height={650} /><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p><Link href={`/solucoes/${item.slug}`}>Ver solução <Arrow /></Link></article>)}
      </div>
    </section>
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
  return (
    <div className="project-empty">
      <div className="project-placeholder"><p className="eyebrow">Acervo em preparação</p><h3>Projetos serão publicados após a validação dos dados.</h3><p>Fotografias, cidade, capacidade e resultados precisam ser confirmados antes de entrar no site.</p><Link className="text-link dark" href="/projetos/modelo-de-case">Ver estrutura do case <Arrow /></Link></div>
    </div>
  );
}
