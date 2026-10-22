import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CartLines } from "@/components/site/MiniCart";
import { PageTitle, btnPrimary, field, meta } from "@/components/site/Page";
import { useStore } from "@/lib/store";
import { Summary, useTotals } from "./sacola";

export const Route = createFileRoute("/checkout")({
  head: () => meta("Finalizar compra", "Dados, entrega e pagamento com Pix ou cartão."),
  component: Checkout,
});

function Checkout() {
  const t = useTotals();
  const { clear } = useStore();
  const [pay, setPay] = useState<"pix" | "cartao">("pix");
  const [done, setDone] = useState(false);
  const L = "mb-4 block text-[11px] uppercase tracking-[0.3em] text-gold-dark";

  if (done) return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="text-4xl">Pedido recebido!</h1>
      <p className="mt-4 text-sm text-muted-foreground">Obrigada por comprar na DIVINO AMOR. Entraremos em contato para confirmar o pagamento.</p>
      <Link to="/produtos" className={`${btnPrimary} mt-8`}>Continuar comprando</Link>
    </div>
  );

  return (
    <>
      <PageTitle title="Finalizar compra" />
      <form className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 md:grid-cols-[1fr_380px]"
        onSubmit={(e) => { e.preventDefault(); if (!t.cart.length) return; clear(); setDone(true); }}>
        <div className="space-y-10">
          <fieldset><legend className={L}>1. Seus dados</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              <input required placeholder="Nome completo" aria-label="Nome completo" className={`${field} sm:col-span-2`} />
              <input required type="email" placeholder="E-mail" aria-label="E-mail" className={field} />
              <input required placeholder="Telefone / WhatsApp" aria-label="Telefone" className={field} />
            </div></fieldset>
          <fieldset><legend className={L}>2. Endereço e entrega</legend>
            <div className="grid gap-3 sm:grid-cols-3">
              <input required placeholder="CEP" aria-label="CEP" value={t.cep} onChange={(e) => t.setCep(e.target.value)} className={field} />
              <input required placeholder="Rua" aria-label="Rua" className={`${field} sm:col-span-2`} />
              <input required placeholder="Número" aria-label="Número" className={field} />
              <input placeholder="Complemento" aria-label="Complemento" className={field} />
              <input required placeholder="Cidade / UF" aria-label="Cidade" className={field} />
            </div></fieldset>
          <fieldset><legend className={L}>3. Pagamento</legend>
            <div className="flex gap-3">
              {(["pix", "cartao"] as const).map((m) => (
                <label key={m} className={`flex-1 cursor-pointer rounded-sm border p-4 text-center text-sm ${pay === m ? "border-wine bg-card" : "border-input"}`}>
                  <input type="radio" name="pay" className="sr-only" checked={pay === m} onChange={() => setPay(m)} />{m === "pix" ? "Pix (5% off)" : "Cartão de crédito"}
                </label>))}
            </div>
            {pay === "cartao" && <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input required placeholder="Número do cartão" aria-label="Número do cartão" className={`${field} sm:col-span-2`} />
              <input required placeholder="Validade" aria-label="Validade" className={field} />
              <input required placeholder="CVV" aria-label="CVV" className={field} />
            </div>}
          </fieldset>
        </div>
        <div className="space-y-4">
          <CartLines compact />
          <Summary t={t} />
          <button disabled={!t.cart.length} className={`${btnPrimary} w-full`}>Confirmar pedido</button>
        </div>
      </form>
    </>
  );
}
