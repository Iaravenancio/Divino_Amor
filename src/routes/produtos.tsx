import { createFileRoute } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { PageTitle, field, meta } from "@/components/site/Page";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CATEGORIES, PRODUCTS, SIZES } from "@/lib/products";

type Search = { categoria?: string };

export const Route = createFileRoute("/produtos")({
  validateSearch: (s: Record<string, unknown>): Search => ({ categoria: typeof s.categoria === "string" ? s.categoria : undefined }),
  head: () => meta("Produtos", "Vestidos, macacões, conjuntos e acessórios femininos DIVINO AMOR."),
  component: () => <Catalog title="Produtos" />,
});

const COLORS = Array.from(new Set(PRODUCTS.flatMap((p) => p.colors)));
const PAGE = 8;

export function Catalog({ title, onlyNew = false }: { title: string; onlyNew?: boolean }) {
  const search = (Route.useSearch?.() ?? {}) as Search;
  const [q, setQ] = useState("");
  const [cats, setCats] = useState<string[]>(search.categoria ? [search.categoria] : []);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [max, setMax] = useState(400);
  const [sort, setSort] = useState("recentes");
  const [limit, setLimit] = useState(PAGE);
  const [drawer, setDrawer] = useState(false);

  const list = useMemo(() => {
    let l = PRODUCTS.filter((p) =>
      (!onlyNew || p.badge === "Novo") &&
      p.name.toLowerCase().includes(q.toLowerCase()) &&
      (!cats.length || cats.includes(p.category)) &&
      (!sizes.length || sizes.some((s) => p.sizes.includes(s))) &&
      (!colors.length || colors.some((c) => p.colors.includes(c))) &&
      p.price <= max);
    l = [...l].sort((a, b) => sort === "menor" ? a.price - b.price : sort === "maior" ? b.price - a.price : b.createdAt - a.createdAt);
    return l;
  }, [q, cats, sizes, colors, max, sort, onlyNew]);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const chip = (on: boolean) => `rounded-sm border px-3 py-1.5 text-xs ${on ? "border-wine bg-wine text-gold-light" : "border-input"}`;

  const filters = (
    <div className="space-y-8 text-sm">
      <div><p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold-dark">Categoria</p>
        <div className="flex flex-wrap gap-2">{CATEGORIES.map((c) => <button key={c} aria-pressed={cats.includes(c)} className={chip(cats.includes(c))} onClick={() => toggle(cats, setCats, c)}>{c}</button>)}</div></div>
      <div><p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold-dark">Tamanho</p>
        <div className="flex flex-wrap gap-2">{SIZES.map((c) => <button key={c} aria-pressed={sizes.includes(c)} className={chip(sizes.includes(c))} onClick={() => toggle(sizes, setSizes, c)}>{c}</button>)}</div></div>
      <div><p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold-dark">Cor</p>
        <div className="flex flex-wrap gap-2">{COLORS.map((c) => <button key={c} aria-pressed={colors.includes(c)} className={chip(colors.includes(c))} onClick={() => toggle(colors, setColors, c)}>{c}</button>)}</div></div>
      <div><label htmlFor="max" className="mb-3 block text-[11px] uppercase tracking-[0.3em] text-gold-dark">Até R$ {max}</label>
        <input id="max" type="range" min={100} max={400} step={10} value={max} onChange={(e) => setMax(+e.target.value)} className="w-full accent-wine" /></div>
    </div>
  );

  return (
    <>
      <PageTitle eyebrow="Coleção" title={title} />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 md:grid-cols-[220px_1fr]">
        <aside className="hidden md:block">{filters}</aside>
        <div>
          <div className="mb-6 grid grid-cols-[1fr_auto] gap-3 sm:grid-cols-[1fr_auto_auto]">
            <input aria-label="Buscar por nome" placeholder="Buscar por nome…" value={q} onChange={(e) => setQ(e.target.value)} className={`${field} col-span-2 sm:col-span-1`} />
            <button className="flex items-center gap-2 rounded-sm border border-input px-3 text-xs uppercase tracking-widest md:hidden" onClick={() => setDrawer(true)}><SlidersHorizontal size={14} />Filtros</button>
            <select aria-label="Ordenar" value={sort} onChange={(e) => setSort(e.target.value)} className={`${field} w-auto`}>
              <option value="recentes">Mais recentes</option><option value="menor">Menor preço</option><option value="maior">Maior preço</option>
            </select>
          </div>
          {list.length === 0 && <p className="py-20 text-center text-muted-foreground">Nenhum produto encontrado.</p>}
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3">{list.slice(0, limit).map((p) => <ProductCard key={p.slug} p={p} />)}</div>
          {list.length > limit && <div className="mt-12 text-center"><button onClick={() => setLimit(limit + PAGE)} className="rounded-sm border border-wine px-8 py-3 text-xs uppercase tracking-[0.3em] text-wine">Carregar mais</button></div>}
        </div>
      </div>
      <Sheet open={drawer} onOpenChange={setDrawer}>
        <SheetContent side="left" className="bg-background"><SheetHeader><SheetTitle className="font-serif font-normal">Filtros</SheetTitle></SheetHeader><div className="px-4">{filters}</div></SheetContent>
      </Sheet>
    </>
  );
}
