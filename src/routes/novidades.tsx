import { createFileRoute } from "@tanstack/react-router";
import { Catalog } from "@/components/site/Catalog";
import { meta } from "@/components/site/Page";

export const Route = createFileRoute("/novidades")({
  head: () => meta("Novidades", "As peças que acabaram de chegar na DIVINO AMOR."),
  component: () => <Catalog title="Novidades" onlyNew />,
});
