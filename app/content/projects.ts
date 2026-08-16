export type Project = {
  title: string;
  slug: string;
  category: "residencial" | "empresarial" | "rural";
  city: string;
  photos: readonly string[];
  capacityKwp?: number;
  challenge: string;
  solution: string;
  equipment: readonly string[];
  result?: string;
  publicationAuthorized: boolean;
};

// Projetos só entram na experiência pública depois da validação dos dados e da autorização.
export const publishedProjects: readonly Project[] = [];
