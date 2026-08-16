import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles, projectTemplate, solutions } from "../content";
import { AboutPage, ArticlePage, ContactPage, ContentPage, LegalPage, ProcessPage, ProjectPage, ProjectsPage, ServicesPage, SimulatorPage, SolutionPage, SolutionsPage, TestimonialsPage } from "../components/Site";

type Props = { params: Promise<{ slug: string[] }> };

const pageMeta: Record<string, [string, string]> = {
  sobre: ["Sobre a Aba Sol Energia Solar", "Conheça a história, missão, visão e valores da Aba Sol Energia Solar."],
  solucoes: ["Soluções", "Energia solar residencial, empresarial e rural com análise técnica."],
  servicos: ["Serviços", "Dimensionamento, projeto, instalação, homologação, manutenção e monitoramento."],
  "como-funciona": ["Como funciona", "Entenda todas as etapas de um projeto de energia solar."],
  projetos: ["Projetos", "Galeria editorial de projetos reais da Aba Sol Energia Solar."],
  simulador: ["Simulador solar", "Informe os dados iniciais do imóvel para solicitar uma análise solar."],
  depoimentos: ["Depoimentos", "Relatos reais e autorizados sobre projetos da Aba Sol."],
  conteudos: ["Conteúdos", "Informação direta sobre consumo, energia solar, projeto e homologação."],
  contato: ["Contato", "Fale com a Aba Sol Energia Solar em São José do Rio Preto."],
  privacidade: ["Política de Privacidade", "Informações sobre o tratamento de dados neste site."],
  termos: ["Termos de Uso", "Condições gerais para uso do site da Aba Sol."],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug[0] === "conteudos" && slug[1]) {
    const article = articles.find(item => item.slug === slug[1]);
    if (article) return { title: article.title, description: article.description, alternates: { canonical: `/conteudos/${article.slug}` }, openGraph: { title: article.title, description: article.description, images: [] }, twitter: { title: article.title, description: article.description, images: [] } };
  }
  if (slug[0] === "projetos" && slug[1]) return { title: projectTemplate.title, description: projectTemplate.description, alternates: { canonical: `/projetos/${projectTemplate.slug}` }, openGraph: { title: projectTemplate.title, description: projectTemplate.description, images: [] }, twitter: { title: projectTemplate.title, description: projectTemplate.description, images: [] } };
  if (slug[0] === "solucoes" && slug[1]) {
    const solution=solutions.find(item=>item.slug===slug[1]);
    if(solution) return { title:`Energia Solar ${solution.title}`, description:solution.description, alternates:{canonical:`/solucoes/${solution.slug}`} };
  }
  const meta = pageMeta[slug[0]];
  return meta ? { title: meta[0], description: meta[1], alternates: { canonical: `/${slug.join("/")}` } } : { title: "Página não encontrada", robots: { index: false, follow: false } };
}

export default async function CatchAllPage({ params }: Props) {
  const { slug } = await params;
  const [root, detail] = slug;
  if (root === "sobre" && !detail) return <AboutPage />;
  if (root === "solucoes" && !detail) return <SolutionsPage />;
  if (root === "solucoes" && detail && solutions.some(item=>item.slug===detail)) return <SolutionPage slug={detail} />;
  if (root === "servicos" && !detail) return <ServicesPage />;
  if (root === "como-funciona" && !detail) return <ProcessPage />;
  if (root === "projetos" && !detail) return <ProjectsPage />;
  if (root === "projetos" && detail === projectTemplate.slug) return <ProjectPage />;
  if (root === "simulador" && !detail) return <SimulatorPage />;
  if (root === "depoimentos" && !detail) return <TestimonialsPage />;
  if (root === "conteudos" && !detail) return <ContentPage />;
  if (root === "conteudos" && detail && articles.some(item=>item.slug===detail)) return <ArticlePage slug={detail} />;
  if (root === "contato" && !detail) return <ContactPage />;
  if (root === "privacidade" && !detail) return <LegalPage type="privacidade" />;
  if (root === "termos" && !detail) return <LegalPage type="termos" />;
  return notFound();
}
