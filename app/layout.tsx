import type { Metadata } from "next";
import "./globals.css";
import { company } from "./company";

export const metadata: Metadata = {
  metadataBase: new URL("https://abasolenergia.com.br"),
  title: {
    default: "Aba Sol Energia Solar | São José do Rio Preto",
    template: "%s | Aba Sol Energia Solar",
  },
  description: "Projetos de energia solar fotovoltaica para residências, empresas e propriedades rurais em São José do Rio Preto e região.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Aba Sol Energia Solar",
    title: "Aba Sol Energia Solar",
    description: "Engenharia solar para residências, empresas e propriedades rurais em São José do Rio Preto e região.",
    images: [{ url: "/og-v2.png", width: 1732, height: 908, alt: "Aba Sol — Energia solar, medida pelo seu consumo." }],
  },
  twitter: { card: "summary_large_image", title: "Aba Sol Energia Solar", description: "Engenharia solar para São José do Rio Preto e região.", images: ["/og-v2.png"] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: company.name,
              legalName: company.legalName,
              url: company.domain,
              telephone: company.phoneHref,
              email: company.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: company.address.street,
                addressLocality: company.address.city,
                addressRegion: company.address.state,
                postalCode: company.address.postalCode,
                addressCountry: "BR",
              },
              areaServed: company.serviceRegion,
            }).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
