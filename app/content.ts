export type SolutionSlug = "residencial" | "empresarial" | "rural";

export type Solution = {
  slug: SolutionSlug;
  title: string;
  navLabel: string;
  eyebrow: string;
  hero: string;
  description: string;
  image: string;
  imageAlt: string;
  analysis: readonly string[];
  process: readonly { title: string; text: string }[];
  technicalNote: string;
  cta: string;
};

export const solutions: readonly Solution[] = [
  {
    slug: "residencial",
    title: "Energia solar residencial",
    navLabel: "Residencial",
    eyebrow: "Casas e condomínios",
    hero: "Um sistema calculado para a rotina da sua casa.",
    description: "A análise combina histórico da conta, hábitos de consumo, telhado, orientação e sombreamento.",
    image: "/residencial.webp",
    imageAlt: "Módulos fotovoltaicos instalados no telhado de uma residência",
    analysis: ["Histórico de consumo", "Orientação e inclinação do telhado", "Sombras ao longo do dia", "Mudanças previstas na rotina"],
    process: [
      { title: "Leitura da conta", text: "O histórico mostra como o consumo varia durante o ano." },
      { title: "Visita e estrutura", text: "A equipe verifica telhado, acesso, orientação e pontos de sombra." },
      { title: "Projeto e conexão", text: "O sistema é dimensionado, instalado e conduzido até a homologação." },
    ],
    technicalNote: "O formato do telhado e o perfil de uso influenciam o dimensionamento. A proposta é preparada somente depois dessa leitura.",
    cta: "Solicitar análise residencial",
  },
  {
    slug: "empresarial",
    title: "Energia solar para empresas",
    navLabel: "Empresarial",
    eyebrow: "Comércio e indústria",
    hero: "Geração planejada para o perfil de consumo da operação.",
    description: "Demanda, horários de funcionamento, infraestrutura elétrica e área disponível orientam o projeto empresarial.",
    image: "/solar-roof.webp",
    imageAlt: "Conjunto de módulos fotovoltaicos sobre uma cobertura de grande área",
    analysis: ["Curva e histórico de consumo", "Demanda e horário de operação", "Cobertura, solo e infraestrutura", "Planejamento da instalação"],
    process: [
      { title: "Perfil da operação", text: "Consumo e demanda são lidos dentro da rotina real da empresa." },
      { title: "Compatibilidade técnica", text: "Área, estrutura e instalação elétrica são avaliadas em conjunto." },
      { title: "Execução coordenada", text: "O projeto considera acesso, segurança e continuidade da operação." },
    ],
    technicalNote: "Retorno e geração dependem dos dados de consumo, da tarifa e das condições do local. Nenhum resultado é prometido sem o estudo.",
    cta: "Solicitar análise empresarial",
  },
  {
    slug: "rural",
    title: "Energia solar para propriedades rurais",
    navLabel: "Rural",
    eyebrow: "Operação no campo",
    hero: "O projeto começa pelas cargas e distâncias da propriedade.",
    description: "Estruturas disponíveis, pontos de consumo, rede interna e rotina da operação entram na análise rural.",
    image: "/solar-field.webp",
    imageAlt: "Fileiras de módulos fotovoltaicos instalados em uma grande área aberta",
    analysis: ["Cargas e pontos de consumo", "Distâncias dentro da propriedade", "Galpões, solo e estruturas disponíveis", "Condições de acesso e manutenção"],
    process: [
      { title: "Mapa da propriedade", text: "A equipe identifica cargas, estruturas e distâncias relevantes." },
      { title: "Local de instalação", text: "Coberturas e áreas de solo são comparadas tecnicamente." },
      { title: "Projeto para a rotina", text: "Instalação e homologação são planejadas conforme a operação local." },
    ],
    technicalNote: "Aplicações específicas dependem de levantamento técnico. A análise parte das cargas efetivamente atendidas na propriedade.",
    cta: "Solicitar análise rural",
  },
] as const;

export const processSteps = [
  { title: "Leitura inicial", text: "Conta de energia, endereço, tipo de imóvel e mudanças previstas no consumo." },
  { title: "Análise do local", text: "Área, orientação, sombreamento, estrutura e infraestrutura elétrica." },
  { title: "Dimensionamento", text: "Definição do sistema a partir dos dados levantados, sem projeções genéricas." },
  { title: "Projeto e instalação", text: "Planejamento elétrico, organização da execução e integração ao imóvel." },
  { title: "Homologação", text: "Documentação e condução do processo aplicável junto à concessionária." },
  { title: "Acompanhamento", text: "Orientação após a ativação e monitoramento conforme os equipamentos adotados." },
] as const;

export const solarStory = [
  { label: "Instalação", title: "Orientação e sombra vêm primeiro.", text: "A posição do módulo é definida a partir do local, da inclinação e da incidência solar." },
  { label: "Captação", title: "As células recebem a luz.", text: "A superfície do módulo converte a incidência solar em corrente elétrica contínua." },
  { label: "Conversão", title: "O inversor adequa a energia.", text: "A corrente produzida pelos módulos é convertida para uso na instalação." },
  { label: "Consumo", title: "A geração alimenta o imóvel.", text: "A energia passa pelo quadro elétrico e atende as cargas em funcionamento." },
  { label: "Monitoramento", title: "A produção pode ser acompanhada.", text: "A visualização depende do inversor e da configuração definida para o projeto." },
] as const;

export const faqs = [
  ["Como começa o dimensionamento?", "Com o histórico de consumo e as informações do imóvel. Depois, a equipe avalia área, orientação, sombreamento e infraestrutura."],
  ["A Aba Sol cuida da homologação?", "A homologação integra o processo apresentado pela Aba Sol, junto com dimensionamento, projeto e instalação."],
  ["Existe estimativa automática de economia?", "Não. Geração e resultado dependem de dados técnicos, tarifa e condições do local. A equipe prepara a análise depois de receber as informações."],
  ["Qual é a região atendida?", "A empresa atende São José do Rio Preto e região, conforme a viabilidade de cada projeto."],
] as const;
