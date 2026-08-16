export type Solution = {
  slug: "residencial" | "empresarial" | "rural";
  title: string;
  kicker: string;
  description: string;
  image: string;
  needs: string[];
  cta: string;
};

export const solutions: Solution[] = [
  {
    slug: "residencial",
    title: "Residencial",
    kicker: "Casas e condomínios",
    description: "Conta de energia, telhado e sombreamento definem o dimensionamento residencial.",
    image: "/residencial.webp",
    needs: ["Leitura da conta de energia", "Análise do telhado e sombreamento", "Dimensionamento e homologação"],
    cta: "Simular projeto residencial",
  },
  {
    slug: "empresarial",
    title: "Empresas",
    kicker: "Comércio e indústria",
    description: "Consumo, demanda e área disponível orientam o projeto empresarial.",
    image: "/solar-roof.webp",
    needs: ["Perfil de consumo e demanda", "Telhado, solo e infraestrutura", "Projeto técnico e acompanhamento"],
    cta: "Solicitar análise empresarial",
  },
  {
    slug: "rural",
    title: "Agronegócio",
    kicker: "Propriedades rurais",
    description: "Cargas, distâncias e estruturas da propriedade entram na análise rural.",
    image: "/solar-field.webp",
    needs: ["Mapeamento da operação", "Área e infraestrutura disponíveis", "Instalação, homologação e monitoramento"],
    cta: "Solicitar estudo rural",
  },
];

export const processSteps = [
  ["01", "Análise", "Conta, local, área disponível e perfil de consumo."],
  ["02", "Dimensionamento", "Definição técnica baseada nos dados do imóvel."],
  ["03", "Projeto", "Planejamento elétrico e documentação necessária."],
  ["04", "Instalação", "Execução organizada e integração ao imóvel."],
  ["05", "Homologação", "Condução do processo junto à concessionária."],
  ["06", "Monitoramento", "Acompanhamento da produção após a ativação."],
] as const;

export const articles = [
  {
    slug: "como-ler-sua-conta-de-energia",
    category: "Economia",
    title: "O que sua conta de energia revela antes do projeto",
    description: "Consumo, histórico e modalidade tarifária ajudam a construir um dimensionamento mais responsável.",
    readTime: "5 min de leitura",
  },
  {
    slug: "o-que-influencia-o-dimensionamento",
    category: "Energia Solar",
    title: "O que influencia o dimensionamento de um sistema solar",
    description: "Área, orientação, sombreamento e perfil de uso são parte de uma mesma análise técnica.",
    readTime: "6 min de leitura",
  },
  {
    slug: "etapas-da-homologacao",
    category: "Tecnologia",
    title: "Homologação: onde o projeto encontra a rede elétrica",
    description: "Uma visão direta sobre documentação, vistoria e conexão do sistema à concessionária.",
    readTime: "4 min de leitura",
  },
] as const;

export const projectTemplate = {
  slug: "modelo-de-case",
  title: "Modelo editorial de projeto",
  category: "Dados em validação",
  city: "Local a confirmar",
  description: "Estrutura preparada para receber um projeto real da Aba Sol assim que fotografias e dados técnicos forem validados.",
};

export const faqs = [
  ["Como é feito o dimensionamento?", "A equipe parte do histórico de consumo, das condições do local e da área disponível. A proposta só é definida depois dessa leitura técnica."],
  ["A Aba Sol cuida da homologação?", "Sim. A homologação faz parte do processo apresentado pela empresa, junto com projeto, instalação e acompanhamento."],
  ["O sistema pode ser monitorado?", "O monitoramento faz parte das soluções informadas pela Aba Sol. A forma de acompanhamento depende da configuração adotada no projeto."],
  ["Vocês atendem propriedades rurais?", "Sim. A Aba Sol informa atuação em projetos residenciais, empresariais e rurais em São José do Rio Preto e região."],
] as const;
