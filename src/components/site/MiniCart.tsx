import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { brl, getProduct } from "@/lib/products";
import { useStore, type CartItem } from "@/lib/store";

export function CartLines({ compact = false }: { compact?: boolean }) {
  const { cart, setQty, remove } = useStore();
  if (!cart.length) return <p className="py-10 text-center text-sm text-muted-foreground">Sua sacola está vazia.</p>;
  return (
    <ul className="divide-y divide-border">
      {cart.map((i: CartItem) => {
        const p = getProduct(i.slug);
        if (!p) return null;
        return (
          <li key={`${i.slug}-${i.size}-${i.color}`} className="flex gap-4 py-4">
            <img src={p.images[0]} alt={p.name} className={`${compact ? "h-24 w-18" : "h-32 w-24"} shrink-0 rounded-sm object-cover`} />
            <div className="min-w-0 flex-1">
              <div className="flex justify-between gap-2">
                <p className="text-sm">{p.name}</p>
                <button onClick={() => remove(i)} aria-label={`Remover ${p.name}`} className="text-muted-foreground hover:text-wine"><X size={16} /></button>
              </div>
              <p className="text-xs text-muted-foreground">Tamanho {i.size} · {i.color}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center rounded-sm border border-input">
                  <button className="p-2" aria-label="Diminuir" onClick={() => setQty(i, i.qty - 1)}><Minus size={12} /></button>
                  <span className="w-6 text-center text-sm">{i.qty}</span>
                  <button className="p-2" aria-label="Aumentar" onClick={() => setQty(i, i.qty + 1)}><Plus size={12} /></button>
                </div>
                <span className="text-sm font-medium text-wine">{brl(p.price * i.qty)}</span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export const subtotalOf = (cart: CartItem[]) => cart.reduce((s, i) => s + (getProduct(i.slug)?.price ?? 0) * i.qty, 0);

export function MiniCart() {
  const { miniOpen, setMiniOpen, cart } = useStore();
  return (
    <Sheet open={miniOpen} onOpenChange={setMiniOpen}>
      <SheetContent className="flex w-full flex-col bg-background sm:max-w-md">
        <SheetHeader><SheetTitle className="font-serif text-2xl font-normal">Sua sacola</SheetTitle></SheetHeader>
        <div className="flex-1 overflow-y-auto px-4"><CartLines compact /></div>
        {cart.length > 0 && (
          <div className="space-y-3 border-t border-border p-4">
            <div className="flex justify-between text-sm"><span>Subtotal</span><span className="font-medium">{brl(subtotalOf(cart))}</span></div>
            <Link to="/sacola" onClick={() => setMiniOpen(false)} className="block rounded-sm border border-wine py-3 text-center text-xs uppercase tracking-[0.3em] text-wine">Ver sacola</Link>
            <Link to="/checkout" onClick={() => setMiniOpen(false)} className="block rounded-sm bg-wine py-3 text-center text-xs uppercase tracking-[0.3em] text-gold-light">Finalizar compra</Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
