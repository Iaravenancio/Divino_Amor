import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/site/Logo";
import { btnPrimary, field, meta } from "@/components/site/Page";

export const Route = createFileRoute("/entrar")({
  head: () => meta("Entrar", "Acesse sua conta DIVINO AMOR."),
  component: Entrar,
});

function Entrar() {
  const [mode, setMode] = useState<"login" | "cadastro">("login");
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="mx-auto mb-8 w-fit"><Logo size={130} /></div>
      <div className="mb-8 grid grid-cols-2 border-b border-border text-xs uppercase tracking-[0.3em]">
        {(["login", "cadastro"] as const).map((m) => <button key={m} onClick={() => setMode(m)} className={`pb-3 ${mode === m ? "border-b-2 border-gold text-wine" : "text-muted-foreground"}`}>{m === "login" ? "Entrar" : "Criar conta"}</button>)}
      </div>
      <p className="mb-6 rounded-sm border border-gold/50 bg-card p-3 text-center text-xs text-muted-foreground">A área da cliente estará disponível em breve.</p>
      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        {mode === "cadastro" && <><input placeholder="Nome" aria-label="Nome" className={field} /><input placeholder="Telefone" aria-label="Telefone" className={field} /></>}
        <input type="email" placeholder="E-mail" aria-label="E-mail" className={field} />
        <input type="password" placeholder="Senha" aria-label="Senha" className={field} />
        <button disabled className={`${btnPrimary} w-full`}>{mode === "login" ? "Entrar" : "Criar conta"}</button>
      </form>
    </div>
  );
}
