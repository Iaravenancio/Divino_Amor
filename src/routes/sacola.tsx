import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CartLines, subtotalOf } from "@/components/site/MiniCart";
import { PageTitle, btnPrimary, field, meta } from "@/components/site/Page";
import { brl } from "@/lib/products";
import { COUPONS, shippingFor, useStore } from "@/lib/store";

export const Route = createFileRoute("/sacola")({
  head: () => meta("Sacola", "Revise os itens da sua sacola DIVINO AMOR."),
  component: Sacola,
});

export function useTotals() {
  const { cart } = useStore();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState<string | null>(null);
  const [cep, setCep] = useState("");
  const sub = subtotalOf(cart);
  const discount = applied ? sub * (COUPONS[applied] ?? 0) : 0;
  const ship = shippingFor(cep, sub);
  return { cart, coupon, setCoupon, applied, setApplied, cep, setCep, sub, discount, ship, total: sub - discount + (ship ?? 0) };
}

export function Summary({ t }: { t: ReturnType<typeof useTotals> }) {
  const [msg, setMsg] = useState("");
  return (
    <div className="space-y-4 rounded-sm border border-border bg-card p-6 text-sm">
      <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); const c = t.coupon.trim().toUpperCase(); if (COUPONS[c]) { t.setApplied(c); setMsg(""); } else setMsg("Cupom inválido."); }}>
        <input aria-label="Cupom" placeholder="Cupom de desconto" value={t.coupon} onChange={(e) => t.setCoupon(e.target.value)} className={field} />
        <button className="rounded-sm border border-wine px-4 text-xs uppercase tracking-widest text-wine">Aplicar</button>
      </form>
      {msg && <p className="text-xs text-destructive">{msg}</p>}
      <input aria-label="CEP" placeholder="CEP para frete" value={t.cep} onChange={(e) => t.setCep(e.target.value)} className={field} inputMode="numeric" />
      <div className="space-y-2 border-t border-border pt-4">
        <div className="flex justify-between"><span>Subtotal</span><span>{brl(t.sub)}</span></div>
        {t.applied && <div className="flex justify-between text-wine"><span>Cupom {t.applied}</span><span>−{brl(t.discount)}</span></div>}
        <div className="flex justify-between"><span>Frete</span><span>{t.ship === null ? "Informe o CEP" : t.ship === 0 ? "Grátis" : brl(t.ship)}</span></div>
        <div className="flex justify-between border-t border-border pt-3 text-base font-medium"><span>Total</span><span className="text-wine">{brl(t.total)}</span></div>
      </div>
    </div>
  );
}

function Sacola() {
  const t = useTotals();
  return (
    <>
      <PageTitle title="Sua sacola" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 md:grid-cols-[1fr_360px]">
        <CartLines />
        {t.cart.length > 0 ? (
          <div className="space-y-4"><Summary t={t} /><Link to="/checkout" className={`${btnPrimary} block text-center`}>Finalizar compra</Link></div>
        ) : <div className="text-center"><Link to="/produtos" className={btnPrimary}>Ver coleção</Link></div>}
      </div>
    </>
  );
}
