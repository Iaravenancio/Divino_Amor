import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Prose, meta } from "@/components/site/Page";

export const Route = createFileRoute("/privacidade")({
  head: () => meta("Política de privacidade", "Política de privacidade da loja DIVINO AMOR."),
  component: () => (
    <>
      <PageTitle title="Política de privacidade" />
      <Prose><p>Usamos seus dados apenas para processar pedidos e, se autorizado, enviar novidades.</p><h2>Seus direitos</h2><p>Você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento, conforme a LGPD.</p></Prose>
    </>
  ),
});
