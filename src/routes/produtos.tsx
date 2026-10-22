import { createFileRoute } from "@tanstack/react-router";
import { Catalog } from "@/components/site/Catalog";
import { meta } from "@/components/site/Page";

type Search = { categoria?: string | undefined };

export const Route = createFileRoute("/produtos")({
  validateSearch: (s: Record<string, unknown>): Search => ({ categoria: typeof s["categoria"] === "string" ? s["categoria"] : undefined }),
  head: () => meta("Produtos", "Vestidos, macacões, conjuntos e acessórios femininos DIVINO AMOR."),
  component: Produtos,
});

function Produtos() {
  const { categoria } = Route.useSearch();
  return <Catalog key={categoria ?? "all"} title={categoria ?? "Produtos"} initialCat={categoria} />;
}
