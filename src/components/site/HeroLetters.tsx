import { Link } from "@tanstack/react-router";
import { LOOKS, PRODUCTS } from "@/lib/products";
import StrokeText from "./StrokeText";

function Carousel() {
  const list = [...LOOKS, ...LOOKS];
  return (
    <div className="hero-carousel hero-band" aria-label="Looks da coleção">
      <div className="marquee-track flex h-full w-max">
        {list.map((src, i) => {
          const product = PRODUCTS[i % PRODUCTS.length];
          return (
            <Link
              key={`${src}-${i}`}
              to="/produto/$slug"
              params={{ slug: product.slug }}
              className="hero-look block h-full shrink-0 overflow-hidden"
              aria-label={`Ver produto: ${product.name}`}
              tabIndex={i >= LOOKS.length ? -1 : 0}
            >
              <img src={src} alt={product.name} className="warm-photo h-full w-full object-cover object-[center_25%]" loading={i < LOOKS.length ? "eager" : "lazy"} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function HeroLetters() {
  return (
    <section className="home-hero">
      <div className="hero-wordmark">
        <StrokeText
          text="DIVINO AMOR"
          strokeColor="#C9A24B"
          strokeStyle="solid"
          strokeWidth={1.4}
          dashLength={10}
          drawDuration={1.6}
          fillDelay={0.2}
          stagger={0.05}
          ease="power2.out"
          trigger="mount"
          fillMode="wipe"
          wipeFrom="left"
          fontSize="clamp(40px, 9vw, 112px)"
          fontWeight={800}
          letterSpacing={4}
          marching={false}
          hoverRedraw
          shadow={false}
          fontFamily="'Playfair Display', serif"
          reverse={false}
        />
      </div>
      <Carousel />
      <div className="hero-copy">
        <p className="hero-tagline">Moda feminina com amor e elegância</p>
        <Link to="/produtos" className="hero-cta">Ver coleção</Link>
      </div>
    </section>
  );
}
