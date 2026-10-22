import { Link } from "@tanstack/react-router";
import { LOOKS } from "@/lib/products";

function Carousel() {
  const list = [...LOOKS, ...LOOKS];
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="marquee-track flex h-full w-max">
        {list.map((src, i) => (
          <img key={i} src={src} alt="" className="warm-photo h-full w-[34vw] object-cover object-[center_30%]" />
        ))}
      </div>
    </div>
  );
}

function Lettering({ lines, id, vb }: { lines: string[]; id: string; vb: [number, number] }) {
  const [w, h] = vb;
  const lh = h / lines.length;
  let n = 0;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full" role="img" aria-label="DIVINO AMOR">
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width={w} height={h}>
          <rect width={w} height={h} fill="white" />
          {lines.map((line, li) => (
            <text key={li} x={w / 2} y={lh * li + lh * 0.86} textAnchor="middle" fontFamily="Archivo Black, Anton, sans-serif"
              fontSize={lh * 1.0} textLength={w * 0.97} lengthAdjust="spacingAndGlyphs">
              {line.split("").map((ch, i) => {
                const d = n++ * 60;
                return <tspan key={i} className="letter-fill" style={{ animationDelay: `${d}ms` }}>{ch}</tspan>;
              })}
            </text>
          ))}
        </mask>
      </defs>
      <rect width={w} height={h} fill="black" mask={`url(#${id})`} />
    </svg>
  );
}

export function HeroLetters() {
  return (
    <section className="bg-ink">
      <div className="hero-band relative h-[52vh] max-h-[560px] overflow-hidden md:h-[40vh] md:max-h-none md:min-h-[260px]">
        <Carousel />
        <div className="md:hidden"><Lettering id="m-mobile" lines={["DIVINO", "AMOR"]} vb={[600, 560]} /></div>
        <div className="hidden md:block"><Lettering id="m-desk" lines={["DIVINO AMOR"]} vb={[1600, 300]} /></div>
      </div>
      <div className="flex flex-col items-center gap-6 px-6 pb-14 pt-8 text-center">
        <p className="rise font-serif text-xl italic text-ink-foreground md:text-2xl" style={{ animationDelay: "800ms" }}>Moda feminina com amor e elegância</p>
        <Link to="/produtos" className="rise rounded-sm border border-gold/60 bg-wine px-10 py-3.5 text-xs font-medium uppercase tracking-[0.35em] text-gold-light transition hover:bg-gold hover:text-ink" style={{ animationDelay: "1000ms" }}>
          Ver coleção
        </Link>
      </div>
    </section>
  );
}
