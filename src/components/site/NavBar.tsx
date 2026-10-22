import { Link } from "@tanstack/react-router";
import { Heart, Search, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { Logo } from "./Logo";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/produtos", label: "Produtos" },
  { to: "/novidades", label: "Novidades" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Contato" },
] as const;

export function NavBar({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const { cart, setMiniOpen } = useStore();
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const icon = "p-2 text-nav transition-colors hover:text-gold";

  return (
    <div className={`relative z-30 bg-ink ${className}`}>
      <nav className="mx-auto grid h-14 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 md:grid-cols-[auto_1fr_auto]" aria-label="Principal">
        <button
          className="flex items-center gap-2 text-xs tracking-[0.25em] text-nav md:hidden"
          aria-expanded={open} aria-controls="drawer" onClick={() => setOpen(!open)}
        >
          <span className="relative block h-3 w-5" aria-hidden>
            <span className={`absolute left-0 h-px w-5 bg-current transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-px w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-px w-5 bg-current transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
          {open ? "FECHAR" : "MENU"}
        </button>
        <Link to="/" aria-label="DIVINO AMOR — início" className="justify-self-center md:justify-self-start"><Logo size={38} withName={false} /></Link>
        <ul className="hidden justify-center gap-9 md:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="text-xs font-light uppercase tracking-[0.3em] text-nav transition-colors hover:text-gold" activeProps={{ className: "text-gold" }} activeOptions={{ exact: true }}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-self-end">
          <Link to="/produtos" className={`${icon} hidden sm:block`} aria-label="Buscar"><Search size={18} strokeWidth={1.4} /></Link>
          <Link to="/entrar" className={`${icon} hidden sm:block`} aria-label="Minha conta"><User size={18} strokeWidth={1.4} /></Link>
          <Link to="/favoritos" className={icon} aria-label="Favoritos"><Heart size={18} strokeWidth={1.4} /></Link>
          <button className={`${icon} relative`} aria-label={`Sacola, ${count} itens`} onClick={() => setMiniOpen(true)}>
            <ShoppingBag size={18} strokeWidth={1.4} />
            {count > 0 && <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] font-medium text-ink">{count}</span>}
          </button>
        </div>
      </nav>
      {open && (
        <div id="drawer" className="absolute inset-x-0 top-14 border-t border-gold/30 bg-ink pb-8 md:hidden">
          <ul className="flex flex-col px-6 pt-4">
            {[...LINKS, { to: "/entrar", label: "Minha conta" } as const].map((l) => (
              <li key={l.to}><Link to={l.to} onClick={() => setOpen(false)} className="block border-b border-nav/15 py-4 text-sm uppercase tracking-[0.3em] text-nav">{l.label}</Link></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
