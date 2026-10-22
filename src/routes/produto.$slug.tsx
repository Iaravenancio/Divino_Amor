import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { btnOutline, btnPrimary, field } from "@/components/site/Page";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { brl, getProduct, installment, PRODUCTS, SIZES, waLink } from "@/lib/products";
import { shippingFor, useStore } from "@/lib/store";

export const Route = createFileRoute("/produto/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getProduct(loaderData.slug) : undefined;
    const t = p ? `${p.name} | DIVINO AMOR` : "Produto indisponível | DIVINO AMOR";
    const d = p?.description ?? "Produto não encontrado.";
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }, { property: "og:type", content: "product" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const p = getProduct(slug)!;
  const { add, favs, toggleFav } = useStore();
  const [img, setImg] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [size, setSize] = useState("");
  const [color, setColor] = useState(p.colors[0]);
  const [qty, setQty] = useState(1);
  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState<number | null | undefined>(undefined);
  const [guide, setGuide] = useState(false);
  const [err, setErr] = useState(false);
  const fav = favs.includes(p.slug);
  const related = PRODUCTS.filter((x) => x.slug !== p.slug).slice(0, 4);

  const addToBag = () => { if (!size) return setErr(true); add({ slug: p.slug, size, color, qty }); };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <nav className="mb-6 text-xs text-muted-foreground"><Link to="/produtos" className="hover:text-wine">Produtos</Link> / {p.category}</nav>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="grid grid-cols-[64px_1fr] gap-3">
          <div className="space-y-3">
            {p.images.map((src, i) => (
              <button key={i} onClick={() => setImg(i)} aria-label={`Foto ${i + 1}`} className={`block overflow-hidden rounded-sm border ${img === i ? "border-gold" : "border-transparent"}`}>
                <img src={src} alt="" className="aspect-[3/4] w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="relative aspect-[3/4] cursor-zoom-in overflow-hidden rounded-sm bg-muted"
            onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }); }}
            onMouseLeave={() => setZoom(null)}>
            <img src={p.images[img]} alt={p.name} className="h-full w-full object-cover transition-transform duration-200"
              style={zoom ? { transform: "scale(2)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined} />
          </div>
        </div>

        <div>
          {p.badge && <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-gold-dark">{p.badge}</p>}
          <h1 className="text-3xl md:text-4xl">{p.name}</h1>
          <p className="mt-4 text-2xl text-wine">{p.oldPrice && <span className="mr-3 text-base text-muted-foreground line-through">{brl(p.oldPrice)}</span>}{brl(p.price)}</p>
          <p className="text-sm text-muted-foreground">{installment(p.price)} · ou 5% off no Pix</p>
          <div className="gold-rule my-6 w-full opacity-60" />

          <p className="mb-2 text-[11px] uppercase tracking-[0.3em]">Cor: {color}</p>
          <div className="mb-6 flex gap-2">{p.colors.map((c) => <button key={c} onClick={() => setColor(c)} aria-pressed={c === color} className={`rounded-sm border px-3 py-1.5 text-xs ${c === color ? "border-wine" : "border-input"}`}>{c}</button>)}</div>

          <div className="mb-2 flex items-center justify-between"><p className="text-[11px] uppercase tracking-[0.3em]">Tamanho</p><button onClick={() => setGuide(true)} className="text-xs underline underline-offset-4">Guia de medidas</button></div>
          <div className="flex gap-2">
            {SIZES.map((s) => { const ok = p.sizes.includes(s); return (
              <button key={s} disabled={!ok} onClick={() => { setSize(s); setErr(false); }} aria-pressed={size === s}
                className={`h-11 w-12 rounded-sm border text-sm ${size === s ? "border-wine bg-wine text-gold-light" : "border-input"} disabled:line-through disabled:opacity-40`}>{s}</button>); })}
          </div>
          {err && <p className="mt-2 text-xs text-destructive">Escolha um tamanho.</p>}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-sm border border-input">
              <button className="p-3" aria-label="Diminuir" onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={14} /></button>
              <span className="w-8 text-center">{qty}</span>
              <button className="p-3" aria-label="Aumentar" onClick={() => setQty(qty + 1)}><Plus size={14} /></button>
            </div>
            <button onClick={addToBag} className={`${btnPrimary} flex-1 text-center`}>Adicionar à sacola</button>
            <button onClick={() => toggleFav(p.slug)} aria-pressed={fav} aria-label="Favoritar" className="rounded-sm border border-input p-3 text-wine"><Heart size={18} fill={fav ? "currentColor" : "none"} strokeWidth={1.5} /></button>
          </div>
          <a target="_blank" rel="noreferrer" href={waLink(`Olá! Quero comprar: ${p.name}${size ? ` — tamanho ${size}` : ""} — ${color}`)} className={`${btnOutline} mt-3 block text-center`}>Comprar pelo WhatsApp</a>

          <form className="mt-8 flex gap-2" onSubmit={(e) => { e.preventDefault(); setFrete(shippingFor(cep, p.price * qty)); }}>
            <input aria-label="CEP" placeholder="Calcular frete (CEP)" value={cep} onChange={(e) => setCep(e.target.value)} className={field} inputMode="numeric" />
            <button className="rounded-sm border border-wine px-5 text-xs uppercase tracking-widest text-wine">OK</button>
          </form>
          {frete !== undefined && <p className="mt-2 text-sm">{frete === null ? "CEP inválido." : frete === 0 ? "Frete grátis! Entrega em 3 a 7 dias úteis." : `Frete ${brl(frete)} — entrega em 3 a 7 dias úteis.`}</p>}

          <div className="mt-8 space-y-4 text-sm leading-relaxed">
            <div><h2 className="mb-1 text-lg">Descrição</h2><p>{p.description}</p></div>
            <div><h2 className="mb-1 text-lg">Composição</h2><p>{p.composition}</p></div>
          </div>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="text-center text-3xl">Combine com</h2>
        <div className="gold-rule mx-auto mb-10 mt-4 w-16" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div>
      </section>

      <Dialog open={guide} onOpenChange={setGuide}>
        <DialogContent className="bg-background">
          <DialogHeader><DialogTitle className="font-serif font-normal">Guia de medidas (cm)</DialogTitle></DialogHeader>
          <table className="w-full text-center text-sm">
            <thead className="text-[11px] uppercase tracking-widest text-gold-dark"><tr><th className="py-2">Tam.</th><th>Busto</th><th>Cintura</th><th>Quadril</th></tr></thead>
            <tbody className="divide-y divide-border">
              {[["P", "84–88", "64–68", "92–96"], ["M", "89–93", "69–73", "97–101"], ["G", "94–98", "74–78", "102–106"], ["GG", "99–104", "79–84", "107–112"]].map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i} className="py-2">{c}</td>)}</tr>)}
            </tbody>
          </table>
        </DialogContent>
      </Dialog>
    </div>
  );
}
