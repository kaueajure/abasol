import Link from "next/link";
import Image from "next/image";
import { company, mapsUrl, whatsappUrl } from "../company";
import { articles, faqs, processSteps, projectTemplate, solutions } from "../content";
import { ContactForm, EnergySimulator, Header, ProjectFilters, SolarPanelTilt, SolutionSelector } from "./Interactive";

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

export function FinalCTA({ title = "Seu projeto começa com uma leitura precisa." }: { title?: string }) {
  return <section className="final-cta"><div><p className="eyebrow">Próximo passo</p><h2>{title}</h2><p>Conte onde você quer gerar energia. A equipe da Aba Sol analisa o consumo e as condições do local antes de propor o sistema.</p><Link className="button button-primary" href="/simulador">Solicitar estudo solar <Arrow /></Link></div></section>;
}

export function HomeView() {
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="hero-photo" aria-hidden="true" />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-copy"><p className="eyebrow">Energia solar · {company.serviceRegion}</p><h1>Luz que trabalha<br />para você.</h1><p className="hero-lede">Projetamos e instalamos sistemas fotovoltaicos a partir do seu consumo, do espaço disponível e da forma como você usa energia.</p><div className="hero-actions"><Link className="button button-primary" href="/simulador">Simular meu projeto <Arrow /></Link><Link className="text-link" href="/solucoes">Conhecer soluções <Arrow /></Link></div></div>
          <div className="hero-index" aria-hidden="true"><span>01</span><b /></div><p className="hero-caption">Engenharia solar para residências, empresas e propriedades rurais.</p>
        </section>

        <section className="value-section section-pad">
          <div className="value-copy"><p className="eyebrow dark-eye">Decisão técnica, impacto mensal</p><h2>Antes de falar em economia, entendemos o seu consumo.</h2><p>A conta de energia é o ponto de partida — não uma promessa pronta. Histórico, espaço, sombreamento e perfil de uso definem o estudo.</p><Link className="text-link dark" href="/como-funciona">Entender a análise <Arrow /></Link></div>
          <div className="bill-visual"><div className="bill-top"><span>Leitura de consumo</span><b>12 meses</b></div><div className="bill-bars" aria-hidden="true">{[42,55,48,61,69,58,75,78,65,83,71,88].map((h,i)=><i key={i} style={{height:`${h}%`}} />)}</div><div className="bill-note"><span>A conta informa.</span><strong>O projeto interpreta.</strong></div></div>
        </section>

        <section className="object-section"><div className="object-copy"><p className="eyebrow">Tecnologia que ocupa espaço real</p><h2>Um sistema começa pela superfície.</h2><p>O painel não é um elemento abstrato. Orientação, inclinação, área útil e incidência solar fazem parte da engenharia de cada projeto.</p><dl><div><dt>01</dt><dd>Incidência</dd></div><div><dt>02</dt><dd>Estrutura</dd></div><div><dt>03</dt><dd>Integração</dd></div></dl></div><SolarPanelTilt /></section>

        <section className="solutions-section section-pad"><SectionHeading eyebrow="Uma solução para cada contexto" title="Onde você quer gerar sua energia?" text="Três realidades, três leituras de projeto. Escolha o cenário mais próximo do seu." /><SolutionSelector /></section>

        <section className="process-section section-pad"><SectionHeading eyebrow="Como funciona" title="Da análise à geração da sua própria energia." /><div className="timeline">{processSteps.map(([number,title,text])=><div className="timeline-step" key={number}><span>{number}</span><i /><h3>{title}</h3><p>{text}</p></div>)}</div><Link className="text-link dark" href="/como-funciona">Ver o processo completo <Arrow /></Link></section>

        <section className="flow-section"><div className="flow-copy"><p className="eyebrow">Energia em percurso</p><h2>Da luz ao ponto de consumo.</h2><p>O sistema converte a energia captada pelos módulos e a integra à instalação elétrica do imóvel. A relação com a rede depende da configuração homologada.</p></div><div className="energy-flow" aria-label="Fluxo: sol, painel, inversor, imóvel e rede">{["Sol","Painel","Inversor","Imóvel","Rede"].map((label,index)=><div key={label} className="flow-node"><span>0{index+1}</span><b>{label}</b>{index<4&&<i />}</div>)}</div></section>

        <section className="simulator-section section-pad"><div className="simulator-intro"><p className="eyebrow dark-eye">Simule o potencial do seu projeto</p><h2>Poucas perguntas. Uma análise com contexto.</h2><p>Você informa o essencial antes de deixar seus dados. A Aba Sol recebe uma base melhor para avaliar seu projeto sem exibir números genéricos.</p></div><EnergySimulator compact /></section>

        <section className="projects-teaser"><div className="projects-photo"><Image src="/solar-field.webp" alt="Painéis fotovoltaicos em grande área, imagem de referência" fill sizes="(max-width: 1024px) 100vw, 68vw" /></div><div className="projects-copy"><p className="eyebrow">Projetos reais</p><h2>Dados e fotografias antes de qualquer promessa.</h2><p>O novo acervo foi estruturado para apresentar obras reais da Aba Sol. Cases só entram no ar depois da confirmação das informações técnicas e da autorização das imagens.</p><Link className="button button-light" href="/projetos">Acessar projetos <Arrow /></Link></div></section>

        <section className="trust-strip"><span>Projeto técnico</span><span>Instalação especializada</span><span>Homologação</span><span>Acompanhamento</span></section>

        <section className="about-teaser section-pad"><div><p className="eyebrow dark-eye">Aba Sol Energia Solar</p><h2>Engenharia próxima de quem usa a energia.</h2></div><div><p>Com base em São José do Rio Preto, a Aba Sol atua em projetos fotovoltaicos para casas, empresas e propriedades rurais da região.</p><p>O trabalho reúne dimensionamento, projeto técnico, instalação, homologação, manutenção e monitoramento em um mesmo processo.</p><Link className="text-link dark" href="/sobre">Conhecer a empresa <Arrow /></Link></div></section>
        <FinalCTA title="Descubra o que seu imóvel pode gerar." />
      </main>
      <Footer /><WhatsAppButton />
    </>
  );
}

function InnerHero({ eyebrow, title, text, image }: { eyebrow: string; title: string; text: string; image?: string }) {
  return <section className={`inner-hero ${image ? "with-image" : ""}`}>{image && <Image src={image} alt="" fill priority sizes="100vw" />}<div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{text}</p></div></section>;
}

function FAQSection({ custom = faqs }: { custom?: readonly (readonly [string,string])[] }) {
  return <section className="faq-section section-pad"><SectionHeading eyebrow="Perguntas frequentes" title="O que costuma surgir antes da decisão." /><div className="faq-list">{custom.map(([question,answer])=><details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>;
}

function StandardLayout({ children, darkHero = false }: { children: React.ReactNode; darkHero?: boolean }) {
  return <><Header solid={!darkHero}/><main>{children}</main><Footer/><WhatsAppButton/></>;
}

export function SolutionsPage() {
  return <StandardLayout><InnerHero eyebrow="Soluções" title="Onde você quer gerar sua energia?" text="O tipo de imóvel muda a leitura do consumo, da estrutura e da instalação. Escolha seu contexto para entender o próximo passo." /><section className="solution-list section-pad">{solutions.map((solution,index)=><article key={solution.slug}><div className="solution-list-image"><Image src={solution.image} alt="" fill sizes="(max-width: 760px) 100vw, 55vw" /><span>0{index+1}</span></div><div><p className="eyebrow dark-eye">{solution.kicker}</p><h2>{solution.title}</h2><p>{solution.description}</p><ul>{solution.needs.map(item=><li key={item}>{item}</li>)}</ul><Link className="button button-dark" href={`/solucoes/${solution.slug}`}>{solution.cta} <Arrow /></Link></div></article>)}</section><FinalCTA /></StandardLayout>;
}

export function SolutionPage({ slug }: { slug: string }) {
  const solution = solutions.find(item=>item.slug===slug) || solutions[0];
  const specifics: Record<string,{hero:string;intro:string;points:string[];cta:string}> = {
    residencial:{hero:"Energia pensada para a rotina da sua casa.",intro:"O dimensionamento residencial começa pelo histórico de consumo e pela leitura do telhado. O objetivo é integrar o sistema ao imóvel com clareza sobre cada etapa.",points:["Histórico da conta e hábitos de consumo","Orientação, inclinação e sombreamento do telhado","Projeto, instalação e homologação","Monitoramento e acompanhamento do sistema"],cta:"Simular projeto residencial"},
    empresarial:{hero:"Energia tratada como infraestrutura de negócio.",intro:"Em empresas, perfil de demanda, continuidade da operação e área disponível precisam ser avaliados em conjunto. A análise técnica vem antes de qualquer projeção financeira.",points:["Leitura do consumo e do perfil de demanda","Avaliação de telhado, solo e infraestrutura elétrica","Planejamento da instalação com a operação em mente","Projeto técnico, homologação e acompanhamento"],cta:"Solicitar análise empresarial"},
    rural:{hero:"Um estudo conectado à operação no campo.",intro:"Projetos rurais pedem uma leitura própria: cargas, distâncias, estruturas e dinâmica da propriedade. A solução não é uma cópia do projeto residencial.",points:["Mapeamento do consumo da propriedade","Leitura de áreas disponíveis e estruturas existentes","Dimensionamento considerando a operação rural","Instalação, homologação e monitoramento"],cta:"Solicitar estudo rural"},
  };
  const item=specifics[solution.slug];
  return <StandardLayout darkHero><InnerHero eyebrow={`Solução · ${solution.title}`} title={item.hero} text={solution.description} image={solution.image}/><section className="narrative section-pad"><div><p className="eyebrow dark-eye">Como analisamos</p><h2>O projeto nasce dos dados do local.</h2></div><div><p className="lead">{item.intro}</p><ol>{item.points.map((point,index)=><li key={point}><span>0{index+1}</span>{point}</li>)}</ol><Link className="button button-dark" href="/simulador">{item.cta} <Arrow /></Link></div></section><section className="monitor-section"><div className="monitor-visual"><div className="monitor-line"/><span>Produção</span><b>Acompanhamento visual</b><small>Dados ilustrativos — sem estimativa de geração</small></div><div><p className="eyebrow">Depois da ativação</p><h2>Geração que pode ser acompanhada.</h2><p>A forma de monitoramento depende da configuração técnica adotada. O objetivo é tornar a produção do sistema legível para o usuário.</p></div></section><FAQSection/><FinalCTA /></StandardLayout>;
}

export function ProcessPage() {
  return <StandardLayout><InnerHero eyebrow="Como funciona" title="Engenharia explicada etapa por etapa." text="Do histórico de consumo à produção acompanhada, cada fase resolve uma pergunta concreta do projeto." /><section className="process-deep section-pad">{processSteps.map(([number,title,text],index)=><article key={number}><div className="process-number">{number}</div><div><p className="eyebrow dark-eye">Etapa {number}</p><h2>{title}</h2><p>{text}</p>{index===0&&<small>Documento de partida: histórico da conta de energia.</small>}{index===4&&<small>A conexão ocorre conforme o processo da concessionária.</small>}</div></article>)}</section><section className="flow-section light-flow"><div className="flow-copy"><p className="eyebrow dark-eye">O sistema em operação</p><h2>Captar. Converter. Consumir. Integrar.</h2></div><div className="energy-flow">{["Sol","Painel","Inversor","Imóvel","Rede"].map((label,index)=><div key={label} className="flow-node"><span>0{index+1}</span><b>{label}</b>{index<4&&<i/>}</div>)}</div></section><FinalCTA/></StandardLayout>;
}

export function AboutPage() {
  return <StandardLayout><InnerHero eyebrow="Sobre a Aba Sol" title="Atendimento regional. Processo técnico completo." text="Aba Sol Energia Solar e Soluções Energéticas Ltda, com base em São José do Rio Preto e atuação regional." /><section className="about-story section-pad"><div><Image src="/solar-detail.webp" alt="Detalhe técnico de módulos fotovoltaicos, imagem de referência" fill sizes="(max-width: 760px) 100vw, 50vw" /><span>Imagem de referência técnica</span></div><article><p className="eyebrow dark-eye">Como a empresa trabalha</p><h2>O projeto reúne o que costuma aparecer separado.</h2><p>A Aba Sol concentra dimensionamento, projeto técnico, instalação, homologação, manutenção e monitoramento. Isso cria uma linha clara entre a análise inicial e o acompanhamento do sistema.</p><p>A atuação informada pela empresa abrange residências, negócios e propriedades rurais em São José do Rio Preto e região.</p><blockquote>“Engenharia próxima” aqui significa explicar decisões, documentar etapas e manter um canal direto com a equipe.</blockquote></article></section><section className="principles"><div><span>01</span><h3>Antes do orçamento</h3><p>Entender consumo, local e necessidade.</p></div><div><span>02</span><h3>Durante o projeto</h3><p>Tratar execução e documentação como um mesmo processo.</p></div><div><span>03</span><h3>Depois da ativação</h3><p>Manter monitoramento e acompanhamento acessíveis.</p></div></section><FinalCTA/></StandardLayout>;
}

export function ServicesPage() {
  const services=[["Dimensionamento","Leitura do consumo, da estrutura e do espaço disponível."],["Projeto técnico","Planejamento elétrico e documentação do sistema."],["Instalação","Execução e integração dos equipamentos ao imóvel."],["Homologação","Condução das etapas necessárias junto à concessionária."],["Manutenção","Suporte técnico para sistemas fotovoltaicos."],["Monitoramento","Acompanhamento da produção conforme a solução instalada."]];
  return <StandardLayout><InnerHero eyebrow="Serviços" title="Um processo contínuo, não uma coleção de peças." text="A Aba Sol atua da análise inicial ao acompanhamento do sistema fotovoltaico." /><section className="services-list section-pad">{services.map(([title,text],index)=><article key={title}><span>0{index+1}</span><h2>{title}</h2><p>{text}</p></article>)}</section><FinalCTA/></StandardLayout>;
}

export function SimulatorPage() { return <StandardLayout><InnerHero eyebrow="Simulador" title="Comece pelo que você já sabe." text="Tipo de imóvel, local e conta mensal formam a base inicial. A análise técnica vem depois — sem percentuais inventados." /><section className="simulator-page section-pad"><EnergySimulator/></section></StandardLayout>; }

export function ProjectsPage() { return <StandardLayout><InnerHero eyebrow="Projetos" title="Energia funcionando no mundo real." text="Esta área foi desenhada para mostrar somente projetos reais, com informações que possam ser confirmadas." /><section className="projects-page section-pad"><ProjectFilters/></section><FinalCTA title="Quer construir o próximo case real?"/></StandardLayout>; }

export function ProjectPage() { return <StandardLayout darkHero><InnerHero eyebrow={projectTemplate.category} title={projectTemplate.title} text={projectTemplate.description} image="/solar-roof.webp"/><section className="case-layout section-pad"><aside><span>Status editorial</span><b>Dados aguardando validação</b><span>Cidade</span><b>{projectTemplate.city}</b><span>Capacidade</span><b>Não informada</b></aside><article><p className="eyebrow dark-eye">Template de case</p><h2>Uma estrutura pronta para fatos.</h2><p>Quando um projeto real for selecionado, esta página receberá o desafio do local, a solução projetada, fotografias autorizadas, dados técnicos confirmados e resultados documentados.</p><h3>Por que não há números aqui?</h3><p>Porque potência, economia e resultado não devem ser estimados editorialmente. O compromisso desta página é separar layout pronto de conteúdo ainda não validado.</p><Link className="button button-dark" href="/contato">Quero um projeto semelhante <Arrow/></Link></article></section><FinalCTA/></StandardLayout>; }

export function TestimonialsPage() { return <StandardLayout><InnerHero eyebrow="Depoimentos" title="Confiança também exige fonte." text="Relatos só serão publicados com texto verdadeiro, identificação e autorização adequadas." /><section className="editorial-empty section-pad"><span>Em curadoria</span><h2>Sem frases genéricas atribuídas a clientes fictícios.</h2><p>Enquanto os depoimentos reais são organizados, o site apresenta o processo verificável da Aba Sol: projeto técnico, instalação, homologação e acompanhamento.</p><Link className="text-link dark" href="/como-funciona">Conhecer o processo <Arrow/></Link></section><FinalCTA/></StandardLayout>; }

export function ContentPage() { return <StandardLayout><InnerHero eyebrow="Conteúdo" title="Energia solar, sem atalhos na explicação." text="Leituras diretas para entender consumo, dimensionamento, projeto e homologação antes de tomar uma decisão." /><section className="article-grid section-pad">{articles.map((article,index)=><article key={article.slug}><span>0{index+1}</span><p>{article.category}</p><h2>{article.title}</h2><small>{article.readTime}</small><p>{article.description}</p><Link className="text-link dark" href={`/conteudos/${article.slug}`}>Ler artigo <Arrow/></Link></article>)}</section><FinalCTA/></StandardLayout>; }

export function ArticlePage({ slug }: { slug:string }) {
  const article=articles.find(item=>item.slug===slug)||articles[0];
  return <StandardLayout><InnerHero eyebrow={`${article.category} · ${article.readTime}`} title={article.title} text={article.description}/><article className="article-body"><p className="lead">Um bom projeto começa antes da escolha dos equipamentos. Ele começa na qualidade das informações usadas para entender o imóvel e o consumo.</p><h2>Leitura antes de dimensionamento</h2><p>O histórico da conta mostra como o consumo varia ao longo do tempo. Essa leitura precisa ser combinada com a condição física do local, orientação das superfícies, sombreamento e infraestrutura elétrica.</p><p>Por isso, uma única conta mensal ou um percentual genérico não fecha o diagnóstico. Eles ajudam a iniciar a conversa, mas a proposta depende da análise técnica.</p><h2>O que levar para a primeira conversa</h2><ul><li>Contas recentes de energia;</li><li>endereço ou localização do projeto;</li><li>informações sobre mudanças previstas no consumo;</li><li>fotografias do local, quando solicitadas.</li></ul><blockquote>Quanto melhor a informação de entrada, mais coerente tende a ser o estudo.</blockquote><p>Na Aba Sol, essa etapa se conecta ao dimensionamento, projeto, instalação, homologação e monitoramento.</p></article><section className="article-related"><p className="eyebrow dark-eye">Continue</p><Link href="/conteudos">Ver todos os conteúdos <Arrow/></Link><Link href="/simulador">Iniciar simulação <Arrow/></Link></section><FinalCTA/></StandardLayout>;
}

export function ContactPage() { return <StandardLayout><InnerHero eyebrow="Contato" title="Conte onde você quer gerar energia." text="A equipe atende projetos em São José do Rio Preto e região." /><section className="contact-layout section-pad"><aside><div><span>WhatsApp</span><a href={whatsappUrl()}>{company.phoneDisplay}</a></div><div><span>E-mail</span><a href={`mailto:${company.email}`}>{company.email}</a></div><div><span>Endereço</span><a href={mapsUrl} target="_blank" rel="noreferrer">{company.address.street}<br/>{company.address.city} — {company.address.state}</a></div><div><span>Atendimento</span><p>{company.businessHours}</p></div></aside><ContactForm/></section></StandardLayout>; }

export function LegalPage({ type }: { type:"privacidade"|"termos" }) {
  const privacy=type==="privacidade";
  return <StandardLayout><InnerHero eyebrow="Informações legais" title={privacy?"Política de Privacidade":"Termos de Uso"} text={privacy?"Como tratamos os dados enviados pelos formulários deste site.":"Condições gerais para uso do site e de seus conteúdos."}/><article className="legal-body"><p>Última atualização: agosto de 2026.</p>{privacy?<><h2>Dados coletados</h2><p>Os formulários podem solicitar nome, telefone, e-mail, cidade, tipo de imóvel e informações de consumo fornecidas voluntariamente para atendimento.</p><h2>Finalidade</h2><p>Os dados são usados para responder à solicitação, preparar a análise comercial e técnica e manter o contato relacionado ao projeto.</p><h2>Seus direitos</h2><p>Para pedir acesso, correção ou exclusão de dados, escreva para <a href={`mailto:${company.email}`}>{company.email}</a>.</p></>:<><h2>Conteúdo informativo</h2><p>As informações do site apresentam o processo da Aba Sol e não substituem a avaliação técnica de um imóvel ou proposta formal.</p><h2>Estimativas</h2><p>O site não apresenta projeções automáticas de economia sem parâmetros técnicos validados. Resultados dependem das condições de cada projeto.</p><h2>Contato</h2><p>Dúvidas sobre estes termos podem ser enviadas para <a href={`mailto:${company.email}`}>{company.email}</a>.</p></>}</article></StandardLayout>;
}

export function NotFoundPage() { return <StandardLayout><section className="not-found"><span>404</span><p className="eyebrow dark-eye">Conteúdo não encontrado</p><h1>Este caminho não está conectado.</h1><p>A página pode ter mudado ou o endereço foi digitado incorretamente.</p><Link className="button button-dark" href="/">Voltar ao início <Arrow/></Link></section></StandardLayout>; }
