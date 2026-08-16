import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { solutions } from "../content";
import { AboutPage, ContactPage, LegalPage, ProcessPage, ServicesPage, SimulatorPage, SolutionPage, SolutionsPage } from "../components/Site";

type Props = { params: Promise<{ slug: string[] }> };

const pageMeta: Record<string, { title: string; description: string }> = {
  sobre: { title: "Sobre a Aba Sol", description: "Conheça a origem da Aba Sol e a experiência de mais de 40 anos no setor elétrico antes da criação da empresa." },
  solucoes: { title: "Soluções de energia solar", description: "Projetos fotovoltaicos para residências, empresas e propriedades rurais em São José do Rio Preto e região." },
  servicos: { title: "Serviços", description: "Dimensionamento, projeto, instalação, homologação e acompanhamento de sistemas fotovoltaicos." },
  "como-funciona": { title: "Como funciona um projeto solar", description: "Entenda as etapas da leitura do consumo à instalação e homologação do sistema fotovoltaico." },
  simulador: { title: "Solicitar análise do projeto", description: "Envie os dados iniciais do imóvel e do consumo para a equipe da Aba Sol." },
  contato: { title: "Contato", description: "Fale com a Aba Sol Energia Solar em São José do Rio Preto." },
  privacidade: { title: "Política de Privacidade", description: "Saiba como a Aba Sol trata os dados enviados pelos formulários." },
  termos: { title: "Termos de Uso", description: "Condições para uso das informações publicadas no site da Aba Sol." },
};

const social = (title: string, description: string, canonical: string, image?: string): Metadata => ({
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, images: image ? [{ url: image }] : [] },
  twitter: { card: "summary_large_image", title, description, images: image ? [image] : [] },
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug[0] === "solucoes" && slug[1]) {
    const solution = solutions.find(item => item.slug === slug[1]);
    if (solution) return social(solution.title, solution.description, `/solucoes/${solution.slug}`, solution.image);
  }
  const meta = pageMeta[slug[0]];
  return meta ? social(meta.title, meta.description, `/${slug.join("/")}`) : { title: "Página não encontrada", robots: { index: false, follow: false } };
}

export default async function CatchAllPage({ params }: Props) {
  const { slug } = await params;
  const [root, detail] = slug;
  if (root === "sobre" && !detail) return <AboutPage />;
  if (root === "solucoes" && !detail) return <SolutionsPage />;
  if (root === "solucoes" && detail) {
    const solution = solutions.find(item => item.slug === detail);
    if (solution) return <SolutionPage slug={solution.slug} />;
  }
  if (root === "servicos" && !detail) return <ServicesPage />;
  if (root === "como-funciona" && !detail) return <ProcessPage />;
  if (root === "simulador" && !detail) return <SimulatorPage />;
  if (root === "contato" && !detail) return <ContactPage />;
  if (root === "privacidade" && !detail) return <LegalPage type="privacidade" />;
  if (root === "termos" && !detail) return <LegalPage type="termos" />;
  return notFound();
}
