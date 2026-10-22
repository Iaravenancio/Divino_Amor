import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Prose, meta } from "@/components/site/Page";

export const Route = createFileRoute("/trocas")({
  head: () => meta("Trocas e devoluções", "Trocas e devoluções da loja DIVINO AMOR."),
  component: () => (
    <>
      <PageTitle title="Trocas e devoluções" />
      <Prose><p>Você tem até 7 dias após o recebimento para solicitar troca ou devolução.</p><h2>Como solicitar</h2><p>Fale com a gente pelo WhatsApp com o número do pedido. A peça deve estar sem uso e com etiqueta.</p><h2>Primeira troca</h2><p>A primeira troca é por nossa conta.</p></Prose>
    </>
  ),
});
