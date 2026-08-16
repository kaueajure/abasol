export const company = {
  name: "Aba Sol Energia Solar",
  legalName: "ABA SOL Energia Solar e Soluções Energéticas Ltda",
  shortName: "Aba Sol",
  domain: "https://abasolenergia.com.br",
  email: "comercial@abasolenergia.com.br",
  phoneDisplay: "(17) 99210-9355",
  phoneHref: "+5517992109355",
  whatsappNumber: "5517992109355",
  address: {
    street: "Rua Orlando Zanca, 353 — Gaivota 2",
    city: "São José do Rio Preto",
    state: "SP",
    postalCode: "15063-068",
  },
  businessHours: "Segunda a sexta, das 10h às 18h",
  serviceRegion: "São José do Rio Preto e região",
} as const;

export const whatsappUrl = (message = "Olá! Vim pelo novo site da Aba Sol e quero solicitar um estudo solar.") =>
  `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${company.address.street}, ${company.address.city} - ${company.address.state}, ${company.address.postalCode}`,
)}`;
