import { createFileRoute, Link } from "@tanstack/react-router";
import { Instagram, RefreshCw, Truck, CreditCard } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { HeroLetters } from "@/components/site/HeroLetters";
import { ProductCard } from "@/components/site/ProductCard";
import { Logo } from "@/components/site/Logo";
import { btnPrimary, field, meta } from "@/components/site/Page";
import { CATEGORIES, INSTALLMENTS, LOOKS, PRODUCTS, waLink } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => meta("Moda feminina com amor e elegância", "Vestidos, macacões e conjuntos femininos com elegância. Frete para todo o Brasil e parcelamento sem juros."),
  component: Index,
});

const CAT_IMG: Record<string, string> = { Vestidos: LOOKS[5], Macacões: LOOKS[3], Conjuntos: LOOKS[4], Acessórios: LOOKS[0] };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
      <h2 className="text-center text-3xl md:text-4xl">{title}</h2>
      <div className="gold-rule mx-auto mb-10 mt-4 w-16" />
      {children}
    </section>
  );
}

function Index() {
  const [email, setEmail] = useState("");
  const latest = [...PRODUCTS].sort((a, b) => b.createdAt - a.createdAt);
  return (
    <>
      <HeroLetters />
      <div className="bg-gold-gradient">
        <ul className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-10 gap-y-2 px-4 py-3 text-[11px] uppercase tracking-[0.25em] text-ink">
          <li className="flex items-center gap-2"><Truck size={14} strokeWidth={1.5} />Frete para todo o Brasil</li>
          <li className="flex items-center gap-2"><CreditCard size={14} strokeWidth={1.5} />Parcele em até {INSTALLMENTS}x</li>
          <li className="flex items-center gap-2"><RefreshCw size={14} strokeWidth={1.5} />Troca fácil</li>
        </ul>
      </div>

      <Section title="Novidades">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-3">
          {latest.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
        <div className="mt-12 text-center"><Link to="/produtos" className={btnPrimary}>Ver todos</Link></div>
      </Section>

      <Section title="Categorias">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link key={c} to="/produtos" search={{ categoria: c }} className="group relative aspect-[3/4] overflow-hidden rounded-sm">
              <img src={CAT_IMG[c]} alt={c} loading="lazy" className="warm-photo h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent" />
              <span className="absolute inset-x-0 bottom-6 text-center font-serif text-2xl text-ink-foreground">{c}</span>
            </Link>
          ))}
        </div>
      </Section>

      <section className="bg-wine">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-16 text-center md:flex-row md:text-left">
          <Logo size={130} />
          <div className="flex-1">
            <h2 className="text-3xl text-gold-light md:text-4xl">Atendimento pertinho de você</h2>
            <p className="mt-2 text-sm text-ink-foreground/80">Tire dúvidas de tamanho, peça fotos e compre pelo WhatsApp.</p>
          </div>
          <a href={waLink("Olá! Quero conhecer a coleção DIVINO AMOR.")} target="_blank" rel="noreferrer"
            className="rounded-sm bg-gold-gradient px-8 py-3.5 text-xs font-medium uppercase tracking-[0.3em] text-ink">Falar no WhatsApp</a>
        </div>
      </section>

      <Section title="Siga-nos no Instagram">
        <div className="grid grid-cols-3 gap-1 md:grid-cols-6">
          {LOOKS.map((src, i) => (
            <a key={i} href="https://instagram.com" target="_blank" rel="noreferrer" className="group relative aspect-square overflow-hidden" aria-label="Ver no Instagram">
              <img src={src} alt="Look DIVINO AMOR" loading="lazy" className="h-full w-full object-cover object-top" />
              <span className="absolute inset-0 grid place-items-center bg-wine/60 text-gold-light opacity-0 transition group-hover:opacity-100"><Instagram /></span>
            </a>
          ))}
        </div>
      </Section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-xl px-6 py-16 text-center">
          <h2 className="text-3xl">Receba novidades e ofertas</h2>
          <form className="mt-6 flex flex-col gap-3 sm:flex-row" onSubmit={(e) => { e.preventDefault(); setEmail(""); toast.success("Inscrição feita! Obrigada."); }}>
            <label htmlFor="nl" className="sr-only">E-mail</label>
            <input id="nl" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Seu e-mail" className={field} />
            <button className={btnPrimary}>Inscrever</button>
          </form>
        </div>
      </section>
    </>
  );
}
