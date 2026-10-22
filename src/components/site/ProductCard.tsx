import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { brl, installment, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

export function ProductCard({ p }: { p: Product }) {
  const { favs, toggleFav, add } = useStore();
  const fav = favs.includes(p.slug);
  return (
    <article className="group">
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-muted">
        <Link to="/produto/$slug" params={{ slug: p.slug }} aria-label={p.name}>
          <img src={p.images[0]} alt={p.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0" />
          <img src={p.images[1]} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </Link>
        {p.badge && (
          <span className={`absolute left-2 top-2 rounded-sm px-2 py-1 text-[10px] uppercase tracking-[0.2em] ${p.badge === "Novo" ? "bg-ink text-gold-light" : "bg-wine text-gold-light"}`}>{p.badge}</span>
        )}
        <button onClick={() => toggleFav(p.slug)} aria-pressed={fav} aria-label={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-card/85 text-wine">
          <Heart size={16} strokeWidth={1.5} fill={fav ? "currentColor" : "none"} />
        </button>
        <button onClick={() => add({ slug: p.slug, size: "M", color: p.colors[0], qty: 1 })}
          className="absolute inset-x-2 bottom-2 hidden translate-y-2 rounded-sm bg-wine py-3 text-[11px] uppercase tracking-[0.3em] text-gold-light opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 md:block">
          Adicionar à sacola
        </button>
      </div>
      <Link to="/produto/$slug" params={{ slug: p.slug }} className="mt-3 block">
        <h3 className="font-sans text-sm font-normal leading-snug">{p.name}</h3>
        <p className="mt-1 text-sm">
          {p.oldPrice && <span className="mr-2 text-muted-foreground line-through">{brl(p.oldPrice)}</span>}
          <span className="font-medium text-wine">{brl(p.price)}</span>
        </p>
        <p className="text-xs text-muted-foreground">{installment(p.price)}</p>
      </Link>
    </article>
  );
}
