import type { MetadataRoute } from "next";
import { solutions } from "./content";
import { company } from "./company";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/sobre", "/solucoes", "/servicos", "/como-funciona", "/simulador", "/contato", "/privacidade", "/termos"];
  const dynamic = solutions.map(item => `/solucoes/${item.slug}`);
  return [...routes, ...dynamic].map(route => ({ url: `${company.domain}${route}`, changeFrequency: "monthly", priority: route === "" ? 1 : .7 }));
}
