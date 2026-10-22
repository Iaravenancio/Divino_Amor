import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/site/ProductCard";
import { PageTitle, btnPrimary, meta } from "@/components/site/Page";
import { PRODUCTS } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/favoritos")({
  head: () => meta("Favoritos", "Os looks que você marcou com coração."),
  component: Favs,
});

function Favs() {
  const { favs } = useStore();
  const list = PRODUCTS.filter((p) => favs.includes(p.slug));
  return (
    <>
      <PageTitle title="Favoritos" />
      <div className="mx-auto max-w-7xl px-4 pb-20">
        {list.length ? <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
          : <div className="text-center"><p className="mb-6 text-muted-foreground">Você ainda não marcou nenhum favorito.</p><Link to="/produtos" className={btnPrimary}>Ver coleção</Link></div>}
      </div>
    </>
  );
}
