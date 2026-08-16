import type { MetadataRoute } from "next";
import { articles, projectTemplate, solutions } from "./content";
import { company } from "./company";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/sobre", "/solucoes", "/servicos", "/como-funciona", "/projetos", "/simulador", "/depoimentos", "/conteudos", "/contato", "/privacidade", "/termos"];
  const dynamic = [
    ...solutions.map(item => `/solucoes/${item.slug}`),
    `/projetos/${projectTemplate.slug}`,
    ...articles.map(item => `/conteudos/${item.slug}`),
  ];
  return [...routes, ...dynamic].map(route => ({ url: `${company.domain}${route}`, lastModified: new Date(), changeFrequency: route.startsWith("/conteudos/") ? "monthly" : "weekly", priority: route === "" ? 1 : .7 }));
}
