import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageTitle, btnOutline, btnPrimary, field, meta } from "@/components/site/Page";
import { waLink } from "@/lib/products";

export const Route = createFileRoute("/contato")({
  head: () => meta("Contato", "Fale com a DIVINO AMOR pelo WhatsApp ou formulário."),
  component: () => (
    <>
      <PageTitle title="Contato">Respondemos de segunda a sábado, das 9h às 19h.</PageTitle>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 md:grid-cols-2">
        <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); (e.target as HTMLFormElement).reset(); toast.success("Mensagem enviada!"); }}>
          <input required placeholder="Nome" aria-label="Nome" className={field} />
          <input required type="email" placeholder="E-mail" aria-label="E-mail" className={field} />
          <textarea required rows={5} placeholder="Mensagem" aria-label="Mensagem" className={field} />
          <button className={btnPrimary}>Enviar</button>
        </form>
        <div className="space-y-4 text-sm">
          <a href={waLink("Olá!")} target="_blank" rel="noreferrer" className={btnOutline}>Chamar no WhatsApp</a>
          <p>Rua Exemplo, 123 — Centro</p>
          <iframe title="Mapa" loading="lazy" className="h-64 w-full rounded-sm border border-border" src="https://www.openstreetmap.org/export/embed.html?bbox=-46.66%2C-23.56%2C-46.62%2C-23.53&layer=mapnik" />
        </div>
      </div>
    </>
  ),
});
