import { NotFoundPage } from "./components/Site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Página não encontrada", robots: { index: false, follow: false } };

export default function NotFound() {
  return <NotFoundPage />;
}
