import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, meta } from "@/components/site/Page";
import { LOOKS } from "@/lib/products";

export const Route = createFileRoute("/sobre")({
  head: () => meta("Sobre a loja", "Conheça a história e os valores da DIVINO AMOR."),
  component: () => (
    <>
      <PageTitle eyebrow="Nossa história" title="Sobre a DIVINO AMOR" />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-20 md:grid-cols-2">
        <img src={LOOKS[2]} alt="Look DIVINO AMOR" loading="lazy" className="warm-photo aspect-[4/5] w-full rounded-sm object-cover" />
        <div className="space-y-4 text-[15px] leading-relaxed">
          <p>A DIVINO AMOR nasceu do desejo de vestir mulheres reais com peças que unem conforto, feminilidade e elegância.</p>
          <p>Cada coleção é escolhida com carinho: tecidos leves, cortes que valorizam e cores que alegram o dia.</p>
          <h2 className="pt-4 text-2xl">Nossos valores</h2>
          <ul className="space-y-2">
            <li>— Atendimento próximo e humano</li>
            <li>— Qualidade em cada detalhe</li>
            <li>— Moda que celebra a mulher</li>
          </ul>
        </div>
      </div>
    </>
  ),
});
