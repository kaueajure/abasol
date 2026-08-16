"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "../ui/Elements";

const primary = [["Soluções", "/solucoes"], ["Como funciona", "/como-funciona"], ["Sobre", "/sobre"], ["Contato", "/contato"]] as const;
const solutionLinks = [["Residencial", "/solucoes/residencial"], ["Empresarial", "/solucoes/empresarial"], ["Rural", "/solucoes/rural"]] as const;

export function Header({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => { if (!frame) frame = requestAnimationFrame(() => { frame = 0; setScrolled(window.scrollY > 18); }); };
    update();
    addEventListener("scroll", update, { passive: true });
    return () => { removeEventListener("scroll", update); cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    const dialog = dialogRef.current;
    const focusable = () => Array.from(dialog?.querySelectorAll<HTMLElement>('a[href],button:not([disabled])') ?? []);
    requestAnimationFrame(() => focusable()[0]?.focus());
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); requestAnimationFrame(() => triggerRef.current?.focus()); return; }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0]; const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", keydown);
    return () => { document.removeEventListener("keydown", keydown); document.body.style.overflow = previousOverflow; document.body.style.paddingRight = previousPadding; };
  }, [open]);

  const close = () => setOpen(false);
  return (
    <>
      <header className={`site-header ${overlay ? "site-header--overlay" : ""} ${scrolled ? "is-scrolled" : ""}`}>
        <Link className="brand" href="/" aria-label="Aba Sol — página inicial"><span className="brand__cells" aria-hidden="true"><i /><i /><i /><i /></span><b>ABA SOL</b></Link>
        <nav aria-label="Navegação principal">{primary.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
        <Link className="header-action" href="/simulador">Solicitar análise <Arrow /></Link>
        <button ref={triggerRef} className="menu-trigger" type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(value => !value)}><span>{open ? "Fechar" : "Menu"}</span><i aria-hidden="true" /></button>
      </header>
      {open && <div id="site-menu" className="menu-panel" role="dialog" aria-modal="true" aria-label="Menu do site" ref={dialogRef}>
        <div className="menu-panel__inner shell">
          <div><p className="label">Navegação</p>{primary.map(([label, href]) => <Link className="menu-panel__primary" key={href} href={href} onClick={close}>{label}</Link>)}</div>
          <div><p className="label">Tipos de projeto</p>{solutionLinks.map(([label, href]) => <Link key={href} href={href} onClick={close}>{label}<Arrow /></Link>)}<Link href="/simulador" onClick={close}>Solicitar análise<Arrow /></Link></div>
        </div>
      </div>}
    </>
  );
}
