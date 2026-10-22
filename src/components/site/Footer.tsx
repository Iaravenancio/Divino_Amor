import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { waLink } from "@/lib/products";

export function Footer() {
  const h = "mb-4 text-xs uppercase tracking-[0.3em] text-gold";
  const a = "block py-1 text-sm text-nav hover:text-gold";
  return (
    <footer className="bg-ink text-nav">
      <div className="gold-rule" />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-start gap-4">
          <Logo size={110} />
          <p className="text-sm">Moda feminina com amor e elegância.</p>
          <div className="flex gap-3">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-gold"><Instagram size={20} strokeWidth={1.4} /></a>
            <a href={waLink("Olá! Vim pelo site DIVINO AMOR.")} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="text-gold"><MessageCircle size={20} strokeWidth={1.4} /></a>
          </div>
        </div>
        <div>
          <p className={h}>Loja</p>
          <Link to="/produtos" className={a}>Produtos</Link>
          <Link to="/novidades" className={a}>Novidades</Link>
          <Link to="/favoritos" className={a}>Favoritos</Link>
          <Link to="/sobre" className={a}>Sobre</Link>
          <Link to="/contato" className={a}>Contato</Link>
        </div>
        <div>
          <p className={h}>Ajuda</p>
          <Link to="/trocas" className={a}>Trocas e devoluções</Link>
          <Link to="/privacidade" className={a}>Política de privacidade</Link>
          <Link to="/termos" className={a}>Termos de uso</Link>
        </div>
        <div className="text-sm">
          <p className={h}>Visite</p>
          <p>Rua Exemplo, 123 — Centro</p>
          <p>Seg a Sáb, 9h às 19h</p>
          <p className={`${h} mt-6`}>Pagamento</p>
          <p>Pix · Cartão de crédito em até 6x</p>
        </div>
      </div>
      <p className="border-t border-nav/15 py-5 text-center text-xs tracking-widest">© {new Date().getFullYear()} DIVINO AMOR</p>
    </footer>
  );
}
