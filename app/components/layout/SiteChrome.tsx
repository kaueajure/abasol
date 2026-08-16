import Link from "next/link";
import type { ReactNode } from "react";
import { company, mapsUrl, whatsappUrl } from "../../company";
import { Header } from "./Header";

export function Footer() {
  return <footer className="footer"><div className="footer__main shell"><div className="footer__about"><Link className="brand brand--footer" href="/"><span className="brand__cells" aria-hidden="true"><i /><i /><i /><i /></span><b>ABA SOL</b></Link><p>Projeto, instalação, homologação e acompanhamento de sistemas fotovoltaicos em São José do Rio Preto e região.</p></div><div><h2>Soluções</h2><Link href="/solucoes/residencial">Residencial</Link><Link href="/solucoes/empresarial">Empresarial</Link><Link href="/solucoes/rural">Rural</Link></div><div><h2>Empresa</h2><Link href="/sobre">Sobre</Link><Link href="/como-funciona">Como funciona</Link><Link href="/contato">Contato</Link></div><address><h2>Atendimento</h2><a href={`tel:${company.phoneHref}`}>{company.phoneDisplay}</a><a href={`mailto:${company.email}`}>{company.email}</a><a href={mapsUrl} target="_blank" rel="noreferrer">{company.address.city} — {company.address.state}</a><span>{company.businessHours}</span></address></div><div className="footer__bottom shell"><span>© {new Date().getFullYear()} {company.name}</span><div><Link href="/privacidade">Privacidade</Link><Link href="/termos">Termos de uso</Link></div></div></footer>;
}

export function WhatsAppLink() { return <a className="whatsapp" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Falar com a Aba Sol pelo WhatsApp"><span aria-hidden="true">W</span><b>WhatsApp</b></a>; }

export function SiteLayout({ children, overlayHeader = false }: { children: ReactNode; overlayHeader?: boolean }) {
  return <><Header overlay={overlayHeader} /><main>{children}</main><Footer /><WhatsAppLink /></>;
}
