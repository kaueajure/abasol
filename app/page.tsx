import type { Metadata } from "next";
import { HomeView } from "./components/Site";

export const metadata: Metadata = {
  title: { absolute: "Aba Sol Energia Solar | São José do Rio Preto" },
  description: "Projeto e instalação de energia solar para residências, empresas e propriedades rurais em São José do Rio Preto e região.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomeView />;
}
