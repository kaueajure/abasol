import Link from "next/link";
import Image from "next/image";

export const Arrow = () => <span aria-hidden="true">↗</span>;

export function PageHero({ eyebrow, title, text, image, imageAlt = "" }: { eyebrow: string; title: string; text: string; image?: string; imageAlt?: string }) {
  return (
    <section className={`page-hero ${image ? "page-hero--media" : ""}`}>
      {image && <Image src={image} alt={imageAlt} fill priority sizes="100vw" />}
      <div className="page-hero__shade" aria-hidden="true" />
      <div className="page-hero__content shell">
        <p className="label">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lead">{text}</p>
      </div>
    </section>
  );
}

export function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <header className="section-intro"><p className="label">{eyebrow}</p><h2>{title}</h2>{text && <p>{text}</p>}</header>;
}

export function PrimaryCTA({ title = "Comece pela conta de energia.", text = "Envie os dados iniciais. A equipe verifica o consumo e as condições do imóvel antes de dimensionar o sistema." }: { title?: string; text?: string }) {
  return (
    <section className="primary-cta">
      <div className="primary-cta__photo" aria-hidden="true" />
      <div className="shell primary-cta__content"><p className="label">Próximo passo</p><h2>{title}</h2><p>{text}</p><Link className="button button--sun" href="/simulador">Solicitar análise do projeto <Arrow /></Link></div>
    </section>
  );
}

export function FAQ({ items }: { items: readonly (readonly [string, string])[] }) {
  const json = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) };
  return (
    <section className="faq section shell">
      <SectionIntro eyebrow="Perguntas frequentes" title="Antes de solicitar a análise." />
      <div className="faq__list">{items.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json).replace(/</g, "\\u003c") }} />
    </section>
  );
}
