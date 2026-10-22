import type { ReactNode } from "react";

export const btnPrimary = "inline-block rounded-sm bg-wine px-8 py-3.5 text-xs uppercase tracking-[0.3em] text-gold-light transition hover:opacity-90 disabled:opacity-50";
export const btnOutline = "inline-block rounded-sm border border-wine px-8 py-3.5 text-xs uppercase tracking-[0.3em] text-wine transition hover:bg-wine hover:text-gold-light";
export const field = "w-full rounded-sm border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-gold";

export function PageTitle({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <header className="mx-auto max-w-7xl px-4 pb-8 pt-12 text-center md:pt-16">
      {eyebrow && <p className="mb-3 text-[11px] uppercase tracking-[0.4em] text-gold-dark">{eyebrow}</p>}
      <h1 className="text-4xl md:text-5xl">{title}</h1>
      <div className="gold-rule mx-auto mt-5 w-16" />
      {children && <div className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground">{children}</div>}
    </header>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-2xl space-y-4 px-4 pb-20 text-[15px] leading-relaxed [&_h2]:mt-8 [&_h2]:text-2xl">{children}</div>;
}

export function meta(title: string, description: string) {
  const t = `${title} | DIVINO AMOR`;
  return {
    meta: [
      { title: t },
      { name: "description", content: description },
      { property: "og:title", content: t },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
