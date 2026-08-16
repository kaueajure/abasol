import Link from "next/link";
import Image from "next/image";
import { company, mapsUrl, whatsappUrl } from "../company";
import { articles, faqs, processSteps, projectTemplate, solutions } from "../content";
import { ContactForm, EnergySimulator, Header, ProjectFilters, SolarScrollStory, SolutionScrollStory } from "./Interactive";

const Arrow = () => <span aria-hidden="true">↗</span>;

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div><Link className="brand footer-brand" href="/"><span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span><span>ABA SOL</span></Link><p>Projeto, instalação, homologação e acompanhamento de sistemas fotovoltaicos.</p></div>
        <div><h4>Soluções</h4><Link href="/solucoes/residencial">Residencial</Link><Link href="/solucoes/empresarial">Empresarial</Link><Link href="/solucoes/rural">Agronegócio</Link><Link href="/servicos">Serviços</Link></div>
        <div><h4>Empresa</h4><Link href="/sobre">Sobre</Link><Link href="/como-funciona">Como funciona</Link><Link href="/projetos">Projetos</Link><Link href="/conteudos">Conteúdo</Link></div>
        <div><h4>Contato</h4><a href={`tel:${company.phoneHref}`}>{company.phoneDisplay}</a><a href={`mailto:${company.email}`}>{company.email}</a><a href={mapsUrl} target="_blank" rel="noreferrer">{company.address.city} — {company.address.state}</a><span>{company.businessHours}</span></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} {company.name}</span><div><Link href="/privacidade">Privacidade</Link><Link href="/termos">Termos de uso</Link></div></div>
    </footer>
  );
}

export function WhatsAppButton() {
  return <a className="whatsapp" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Falar com a Aba Sol no WhatsApp"><span>W</span><b>WhatsApp</b></a>;
}

export function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

export function FinalCTA({ title = "Envie sua conta de energia." }: { title?: string }) {
  return <section className="final-cta" data-reveal="image"><div><p className="eyebrow">Próximo passo</p><h2>{title}</h2><p>A Aba Sol verifica o consumo e as condições do imóvel antes de dimensionar o sistema.</p><Link className="button button-primary" href="/simulador">Solicitar análise <Arrow /></Link></div></section>;
}

export function HomeView() {
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="hero-photo" aria-hidden="true" />
          <div className="hero-foreground" aria-hidden="true" />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-copy"><p className="eyebrow">Energia solar · {company.serviceRegion}</p><h1>Energia solar,<br />medida pelo seu<br />consumo.</h1><p className="hero-lede">A Aba Sol projeta, instala e homologa sistemas fotovoltaicos para casas, empresas e propriedades rurais.</p><div className="hero-actions"><Link className="button button-primary" href="/simulador">Simular meu projeto <Arrow /></Link><Link className="text-link" href="/solucoes">Ver soluções <Arrow /></Link></div></div>
          <div className="hero-index" aria-hidden="true"><span>01</span><b /></div><p className="hero-caption">Projeto técnico · instalação · homologação</p>
          <div className="hero-panel-bridge" aria-hidden="true">{Array.from({length:12}).map((_,index)=><i key={index}/>)}</div>
        </section>

        <SolarScrollStory />
        <SolutionScrollStory />

        <section className="process-section section-pad" data-reveal="line"><SectionHeading eyebrow="Etapas do projeto" title="Da conta de energia à homologação." /><div className="timeline">{processSteps.map(([number,title,text])=><div className="timeline-step" key={number}><span>{number}</span><i /><h3>{title}</h3><p>{text}</p></div>)}</div><Link className="text-link dark" href="/como-funciona">Ver todas as etapas <Arrow /></Link></section>

        <section className="simulator-section section-pad"><div className="simulator-intro"><p className="eyebrow dark-eye">Simulação inicial</p><h2>Informe o imóvel e a conta mensal.</h2><p>A equipe usa esses dados para iniciar o dimensionamento. Nenhum percentual é calculado sem análise técnica.</p></div><EnergySimulator compact /></section>

        <section className="projects-teaser"><div className="projects-photo" data-reveal="image"><Image src="/solar-field.webp" alt="Painéis fotovoltaicos em grande área, imagem de referência" fill sizes="(max-width: 1024px) 100vw, 68vw" /></div><div className="projects-copy"><p className="eyebrow">Projetos da Aba Sol</p><h2>Fotografia e dados confirmados.</h2><p>Os cases entram no site depois da validação das informações técnicas.</p><Link className="button button-light" href="/projetos">Ver projetos <Arrow /></Link></div></section>
        <FinalCTA title="Quer dimensionar seu imóvel?" />
      </main>
      <Footer /><WhatsAppButton />
    </>
  );
}

function InnerHero({ eyebrow, title, text, image }: { eyebrow: string; title: string; text: string; image?: string }) {
  return <section className={`inner-hero ${image ? "with-image" : ""}`} data-reveal="hero">{image && <Image src={image} alt="" fill priority sizes="100vw" />}<div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{text}</p></div></section>;
}

function FAQSection({ custom = faqs }: { custom?: readonly (readonly [string,string])[] }) {
  return <section className="faq-section section-pad"><SectionHeading eyebrow="Perguntas frequentes" title="Dúvidas antes do projeto." /><div className="faq-list">{custom.map(([question,answer])=><details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>;
}

function StandardLayout({ children, darkHero = false }: { children: React.ReactNode; darkHero?: boolean }) {
  return <><Header solid={!darkHero}/><main>{children}</main><Footer/><WhatsAppButton/></>;
}

export function SolutionsPage() {
  return <StandardLayout><InnerHero eyebrow="Soluções" title="Onde será instalado o sistema?" text="Casa, empresa e propriedade rural exigem análises diferentes de consumo e estrutura." /><section className="solution-list section-pad">{solutions.map((solution,index)=><article key={solution.slug}><div className="solution-list-image" data-reveal="image"><Image src={solution.image} alt="" fill sizes="(max-width: 760px) 100vw, 55vw" /><span>0{index+1}</span></div><div><p className="eyebrow dark-eye">{solution.kicker}</p><h2>{solution.title}</h2><p>{solution.description}</p><ul>{solution.needs.map(item=><li key={item}>{item}</li>)}</ul><Link className="button button-dark" href={`/solucoes/${solution.slug}`}>{solution.cta} <Arrow /></Link></div></article>)}</section><FinalCTA /></StandardLayout>;
}

export function SolutionPage({ slug }: { slug: string }) {
  const solution = solutions.find(item=>item.slug===slug) || solutions[0];
  const specifics: Record<string,{hero:string;intro:string;points:string[];cta:string}> = {
    residencial:{hero:"Produza parte da energia consumida pela sua casa.",intro:"A análise residencial cruza o histórico da conta com as condições do telhado.",points:["Histórico da conta e hábitos de consumo","Orientação, inclinação e sombreamento do telhado","Projeto, instalação e homologação","Monitoramento do sistema"],cta:"Simular projeto residencial"},
    empresarial:{hero:"Dimensione a geração para o consumo da empresa.",intro:"Perfil de demanda, operação e área disponível são avaliados em conjunto.",points:["Consumo e perfil de demanda","Telhado, solo e infraestrutura elétrica","Planejamento da instalação","Projeto técnico e homologação"],cta:"Solicitar análise empresarial"},
    rural:{hero:"Calcule o sistema a partir da operação rural.",intro:"Cargas, distâncias, estruturas e rotina da propriedade orientam o estudo.",points:["Consumo da propriedade","Áreas e estruturas disponíveis","Dimensionamento das cargas","Instalação e homologação"],cta:"Solicitar estudo rural"},
  };
  const item=specifics[solution.slug];
  return <StandardLayout darkHero><InnerHero eyebrow={`Solução · ${solution.title}`} title={item.hero} text={solution.description} image={solution.image}/><section className="narrative section-pad"><div><p className="eyebrow dark-eye">O que analisamos</p><h2>Consumo, área e estrutura.</h2></div><div><p className="lead">{item.intro}</p><ol>{item.points.map((point,index)=><li key={point}><span>0{index+1}</span>{point}</li>)}</ol><Link className="button button-dark" href="/simulador">{item.cta} <Arrow /></Link></div></section><section className="monitor-section"><div className="monitor-visual"><div className="monitor-line"/><span>Produção</span><b>Acompanhamento visual</b><small>Dados ilustrativos — sem estimativa de geração</small></div><div><p className="eyebrow">Após a ativação</p><h2>Acompanhe a produção.</h2><p>O formato de monitoramento depende dos equipamentos definidos no projeto.</p></div></section><FAQSection/><FinalCTA /></StandardLayout>;
}

export function ProcessPage() {
  return <StandardLayout><InnerHero eyebrow="Como funciona" title="O que acontece entre a análise e a geração." text="Seis etapas, da leitura da conta ao acompanhamento do sistema." /><section className="process-deep section-pad">{processSteps.map(([number,title,text],index)=><article key={number}><div className="process-number">{number}</div><div><p className="eyebrow dark-eye">Etapa {number}</p><h2>{title}</h2><p>{text}</p>{index===0&&<small>Documento inicial: histórico da conta de energia.</small>}{index===4&&<small>A conexão segue o processo da concessionária.</small>}</div></article>)}</section><section className="flow-section light-flow"><div className="flow-copy"><p className="eyebrow dark-eye">Sistema conectado</p><h2>Sol. Painel. Inversor. Imóvel. Rede.</h2></div><div className="energy-flow">{["Sol","Painel","Inversor","Imóvel","Rede"].map((label,index)=><div key={label} className="flow-node"><span>0{index+1}</span><b>{label}</b>{index<4&&<i/>}</div>)}</div></section><FinalCTA/></StandardLayout>;
}

export function AboutPage() {
  return <StandardLayout><InnerHero eyebrow="Sobre a Aba Sol" title="Energia solar em São José do Rio Preto e região." text="Projetos residenciais, empresariais e rurais com análise, instalação e homologação." /><section className="about-story section-pad"><div data-reveal="image"><Image src="/solar-detail.webp" alt="Detalhe técnico de módulos fotovoltaicos, imagem de referência" fill sizes="(max-width: 760px) 100vw, 50vw" /><span>Imagem de referência técnica</span></div><article><p className="eyebrow dark-eye">Como a empresa trabalha</p><h2>Uma equipe acompanha o projeto completo.</h2><p>A Aba Sol reúne dimensionamento, projeto técnico, instalação, homologação, manutenção e monitoramento.</p><p>O atendimento informado pela empresa cobre casas, negócios e propriedades rurais da região.</p><Link className="text-link dark" href="/contato">Falar com a equipe <Arrow/></Link></article></section><FinalCTA/></StandardLayout>;
}

export function ServicesPage() {
  const services=[["Dimensionamento","Leitura do consumo, da estrutura e do espaço disponível."],["Projeto técnico","Planejamento elétrico e documentação do sistema."],["Instalação","Execução e integração dos equipamentos ao imóvel."],["Homologação","Condução das etapas necessárias junto à concessionária."],["Manutenção","Suporte técnico para sistemas fotovoltaicos."],["Monitoramento","Acompanhamento da produção conforme a solução instalada."]];
  return <StandardLayout><InnerHero eyebrow="Serviços" title="Projeto, instalação e homologação com a mesma equipe." text="Aba Sol acompanha o sistema desde a análise do consumo." /><section className="services-list section-pad">{services.map(([title,text],index)=><article key={title}><span>0{index+1}</span><h2>{title}</h2><p>{text}</p></article>)}</section><FinalCTA/></StandardLayout>;
}

export function SimulatorPage() { return <StandardLayout><InnerHero eyebrow="Simulador" title="Informe o imóvel e a conta de energia." text="Esses dados iniciam a análise. A estimativa final depende do dimensionamento técnico." /><section className="simulator-page section-pad"><EnergySimulator/></section></StandardLayout>; }

export function ProjectsPage() { return <StandardLayout><InnerHero eyebrow="Projetos" title="Instalações da Aba Sol." text="Fotografias e dados técnicos serão publicados depois da validação de cada projeto." /><section className="projects-page section-pad"><ProjectFilters/></section><FinalCTA title="Quer analisar seu imóvel?"/></StandardLayout>; }

export function ProjectPage() { return <StandardLayout darkHero><InnerHero eyebrow={projectTemplate.category} title={projectTemplate.title} text={projectTemplate.description} image="/solar-roof.webp"/><section className="case-layout section-pad"><aside><span>Status editorial</span><b>Dados aguardando validação</b><span>Cidade</span><b>{projectTemplate.city}</b><span>Capacidade</span><b>Não informada</b></aside><article><p className="eyebrow dark-eye">Estrutura do case</p><h2>Dados antes de divulgação.</h2><p>Esta página receberá fotografias autorizadas, desafio do local, solução e informações técnicas confirmadas.</p><p>Potência, economia e resultado não serão estimados editorialmente.</p><Link className="button button-dark" href="/contato">Solicitar análise <Arrow/></Link></article></section><FinalCTA/></StandardLayout>; }

export function TestimonialsPage() { return <StandardLayout><InnerHero eyebrow="Depoimentos" title="Relatos em validação." text="Aba Sol publicará apenas depoimentos identificados e autorizados." /><section className="editorial-empty section-pad"><span>Em curadoria</span><h2>Enquanto isso, veja como o projeto é executado.</h2><Link className="text-link dark" href="/como-funciona">Conhecer as etapas <Arrow/></Link></section></StandardLayout>; }

export function ContentPage() { return <StandardLayout><InnerHero eyebrow="Conteúdo" title="Entenda a conta antes de pedir o projeto." text="Guias sobre consumo, dimensionamento e homologação." /><section className="article-grid section-pad">{articles.map((article,index)=><article key={article.slug}><span>0{index+1}</span><p>{article.category}</p><h2>{article.title}</h2><small>{article.readTime}</small><p>{article.description}</p><Link className="text-link dark" href={`/conteudos/${article.slug}`}>Ler artigo <Arrow/></Link></article>)}</section><FinalCTA/></StandardLayout>; }

export function ArticlePage({ slug }: { slug:string }) {
  const article=articles.find(item=>item.slug===slug)||articles[0];
  return <StandardLayout><InnerHero eyebrow={`${article.category} · ${article.readTime}`} title={article.title} text={article.description}/><article className="article-body"><p className="lead">O dimensionamento depende das informações do imóvel e do consumo.</p><h2>Leitura antes do projeto</h2><p>O histórico da conta mostra como o consumo varia. Ele precisa ser combinado com orientação, sombreamento, área e infraestrutura elétrica.</p><p>Uma única conta ajuda a iniciar a conversa, mas não fecha o diagnóstico.</p><h2>O que separar</h2><ul><li>Contas recentes de energia;</li><li>endereço do projeto;</li><li>mudanças previstas no consumo;</li><li>fotografias do local, quando solicitadas.</li></ul></article><section className="article-related"><p className="eyebrow dark-eye">Continue</p><Link href="/conteudos">Ver todos os conteúdos <Arrow/></Link><Link href="/simulador">Iniciar simulação <Arrow/></Link></section><FinalCTA/></StandardLayout>;
}

export function ContactPage() { return <StandardLayout><InnerHero eyebrow="Contato" title="Envie os dados do imóvel." text="Atendimento em São José do Rio Preto e região." /><section className="contact-layout section-pad"><aside><div><span>WhatsApp</span><a href={whatsappUrl()}>{company.phoneDisplay}</a></div><div><span>E-mail</span><a href={`mailto:${company.email}`}>{company.email}</a></div><div><span>Endereço</span><a href={mapsUrl} target="_blank" rel="noreferrer">{company.address.street}<br/>{company.address.city} — {company.address.state}</a></div><div><span>Atendimento</span><p>{company.businessHours}</p></div></aside><ContactForm/></section></StandardLayout>; }

export function LegalPage({ type }: { type:"privacidade"|"termos" }) {
  const privacy=type==="privacidade";
  return <StandardLayout><InnerHero eyebrow="Informações legais" title={privacy?"Política de Privacidade":"Termos de Uso"} text={privacy?"Como tratamos os dados enviados pelos formulários deste site.":"Condições gerais para uso do site e de seus conteúdos."}/><article className="legal-body"><p>Última atualização: agosto de 2026.</p>{privacy?<><h2>Dados coletados</h2><p>Os formulários podem solicitar nome, telefone, e-mail, cidade, tipo de imóvel e informações de consumo fornecidas voluntariamente para atendimento.</p><h2>Finalidade</h2><p>Os dados são usados para responder à solicitação, preparar a análise comercial e técnica e manter o contato relacionado ao projeto.</p><h2>Seus direitos</h2><p>Para pedir acesso, correção ou exclusão de dados, escreva para <a href={`mailto:${company.email}`}>{company.email}</a>.</p></>:<><h2>Conteúdo informativo</h2><p>As informações do site apresentam o processo da Aba Sol e não substituem a avaliação técnica de um imóvel ou proposta formal.</p><h2>Estimativas</h2><p>O site não apresenta projeções automáticas de economia sem parâmetros técnicos validados. Resultados dependem das condições de cada projeto.</p><h2>Contato</h2><p>Dúvidas sobre estes termos podem ser enviadas para <a href={`mailto:${company.email}`}>{company.email}</a>.</p></>}</article></StandardLayout>;
}

export function NotFoundPage() { return <StandardLayout><section className="not-found"><span>404</span><p className="eyebrow dark-eye">Conteúdo não encontrado</p><h1>Endereço não encontrado.</h1><p>Confira o link ou volte ao início.</p><Link className="button button-dark" href="/">Voltar ao início <Arrow/></Link></section></StandardLayout>; }
