import Image from "next/image";
import Link from "next/link";
import { faqs, processSteps, SolutionSlug, solutions } from "../../content";
import { SiteLayout } from "../layout/SiteChrome";
import { Arrow, FAQ, PageHero, PrimaryCTA, SectionIntro } from "../ui/Elements";

export function SolutionsPage() {
  return <SiteLayout><PageHero eyebrow="Soluções" title="O projeto muda quando o imóvel muda." text="Residências, empresas e propriedades rurais pedem análises próprias de consumo, área e infraestrutura." /><section className="solutions-index section shell">{solutions.map((solution, index) => <article key={solution.slug}><div className="solutions-index__number">0{index + 1}</div><div className="solutions-index__media"><Image src={solution.image} alt={solution.imageAlt} fill sizes="(max-width: 760px) 100vw, 45vw" /></div><div className="solutions-index__copy"><p className="label">{solution.eyebrow}</p><h2>{solution.navLabel}</h2><p>{solution.description}</p><ul>{solution.analysis.slice(0, 3).map(item => <li key={item}>{item}</li>)}</ul><Link className="button button--dark" href={`/solucoes/${solution.slug}`}>Entender esta solução <Arrow /></Link></div></article>)}</section><PrimaryCTA /></SiteLayout>;
}

export function SolutionPage({ slug }: { slug: SolutionSlug }) {
  const solution = solutions.find(item => item.slug === slug) ?? solutions[0];
  const schema = { "@context": "https://schema.org", "@type": "Service", name: solution.title, description: solution.description, areaServed: "São José do Rio Preto e região", provider: { "@type": "LocalBusiness", name: "Aba Sol Energia Solar" } };
  return <SiteLayout overlayHeader><PageHero eyebrow={solution.eyebrow} title={solution.hero} text={solution.description} image={solution.image} imageAlt={solution.imageAlt} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <section className={`solution-analysis solution-analysis--${solution.slug} section shell`}><div><p className="label">Leitura técnica</p><h2>{solution.slug === "residencial" ? "A casa é lida pelo telhado e pela rotina." : solution.slug === "empresarial" ? "A operação define o ponto de partida." : "A propriedade precisa ser vista como um conjunto."}</h2><p>{solution.technicalNote}</p></div><ol>{solution.analysis.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ol></section>
    <section className={`solution-method solution-method--${solution.slug}`}><div className="shell"><SectionIntro eyebrow="Como abordamos" title={solution.slug === "residencial" ? "Uma sequência simples para a residência." : solution.slug === "empresarial" ? "Coordenação técnica sem ignorar a operação." : "Levantamento adaptado às distâncias do campo."} /><div className="solution-method__grid">{solution.process.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>
    {solution.slug === "residencial" && <section className="solution-feature shell section"><div className="roof-diagram" aria-hidden="true"><i /><i /><i /><span>orientação</span><b>sombreamento</b></div><div><p className="label">Telhado e consumo</p><h2>O desenho do sistema começa antes da instalação.</h2><p>A posição dos módulos e a quantidade necessária dependem do que é encontrado no local e no histórico da conta.</p></div></section>}
    {solution.slug === "empresarial" && <section className="business-data section shell"><div><p className="label">Perfil de carga</p><h2>Consumo não é apenas um total mensal.</h2></div><div className="load-chart" role="img" aria-label="Diagrama conceitual de variação do consumo durante o dia"><i /><i /><i /><i /><i /><i /><i /><i /></div><p>Horários de funcionamento, demanda e mudanças previstas precisam entrar na conversa técnica.</p></section>}
    {solution.slug === "rural" && <section className="rural-map section shell"><div><p className="label">Distâncias e estruturas</p><h2>Os pontos de consumo podem estar separados.</h2><p>O levantamento considera como a propriedade está organizada e onde a instalação é tecnicamente possível.</p></div><div className="rural-map__diagram" aria-hidden="true"><span>Entrada</span><span>Estrutura</span><span>Consumo</span><i /><i /></div></section>}
    <FAQ items={faqs} /><PrimaryCTA title={solution.cta} />
  </SiteLayout>;
}

export function ServicesPage() {
  return <SiteLayout><PageHero eyebrow="Serviços" title="Uma equipe acompanha o projeto do início à ativação." text="Dimensionamento, projeto, instalação, homologação e orientação após a conexão." /><section className="service-sequence section shell"><SectionIntro eyebrow="Escopo" title="Responsabilidades conectadas." />{processSteps.map((step, index) => <article key={step.title}><span>0{index + 1}</span><h2>{step.title}</h2><p>{step.text}</p></article>)}</section><PrimaryCTA /></SiteLayout>;
}
