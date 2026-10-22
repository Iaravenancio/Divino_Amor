import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Prose, meta } from "@/components/site/Page";

export const Route = createFileRoute("/termos")({
  head: () => meta("Termos de uso", "Termos de uso da loja DIVINO AMOR."),
  component: () => (
    <>
      <PageTitle title="Termos de uso" />
      <Prose><p>Ao comprar na DIVINO AMOR você concorda com estes termos.</p><h2>Preços e estoque</h2><p>Preços e disponibilidade podem mudar sem aviso prévio.</p></Prose>
    </>
  ),
});
