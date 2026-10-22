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
  const icon = "relative p-2 text-cream transition-colors hover:text-gold";

  return (
    <div className={`site-nav relative z-30 ${className}`}>
      <nav className="nav-inner mx-auto grid h-[72px] max-w-[1600px] grid-cols-[auto_1fr_auto] items-center px-4 sm:px-6 lg:px-10" aria-label="Principal">
        <Link to="/" aria-label="DIVINO AMOR — início" className="justify-self-start"><Logo size={42} withName={false} /></Link>
        <ul className="hidden justify-center gap-7 lg:flex xl:gap-9">
          {LINKS.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="nav-link text-[13px] font-light uppercase tracking-[0.25em] text-nav transition-colors hover:text-gold" activeProps={{ className: "nav-link text-[13px] font-light uppercase tracking-[0.25em] text-gold" }} activeOptions={{ exact: true }}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <button
          className="nav-menu-button flex items-center gap-2 justify-self-center text-xs tracking-[0.2em] text-cream lg:hidden"
          aria-expanded={open} aria-controls="drawer" onClick={() => setOpen(!open)}
        >
          <span className="relative block h-3 w-5" aria-hidden>
            <span className={`absolute left-0 h-px w-5 bg-current transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-px w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-px w-5 bg-current transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
          {open ? "FECHAR" : "MENU"}
        </button>
        <div className="flex items-center justify-self-end">
          <Link to="/produtos" className={`${icon} hidden sm:block`} aria-label="Buscar"><Search size={18} strokeWidth={1.35} /></Link>
          <Link to="/entrar" className={icon} aria-label="Minha conta"><User size={18} strokeWidth={1.35} /></Link>
          <Link to="/favoritos" className={`${icon} hidden sm:block`} aria-label="Favoritos"><Heart size={18} strokeWidth={1.35} /></Link>
          <button className={icon} aria-label={`Sacola, ${count} itens`} onClick={() => setMiniOpen(true)}>
            <ShoppingBag size={18} strokeWidth={1.35} />
            {count > 0 && <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] font-medium text-ink">{count}</span>}
          </button>
        </div>
      </nav>
      {open && (
        <div id="drawer" className="mobile-drawer absolute inset-x-0 top-[72px] border-t border-gold/25 pb-8 lg:hidden">
          <ul className="flex flex-col px-6 pt-4">
            {LINKS.map((l) => (
              <li key={l.to}><Link to={l.to} onClick={() => setOpen(false)} className="block border-b border-nav/15 py-4 text-sm uppercase tracking-[0.3em] text-nav">{l.label}</Link></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
