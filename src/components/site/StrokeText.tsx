import { useEffect, useId, useMemo, useState } from "react";

type StrokeTextProps = {
  text: string;
  strokeColor?: string;
  strokeStyle?: "solid" | "dashed";
  strokeWidth?: number;
  dashLength?: number;
  drawDuration?: number;
  fillDelay?: number;
  stagger?: number;
  ease?: string;
  trigger?: "mount";
  fillMode?: "wipe";
  wipeFrom?: "left" | "right";
  fontSize?: number | string;
  fontWeight?: number;
  letterSpacing?: number;
  marching?: boolean;
  hoverRedraw?: boolean;
  shadow?: boolean;
  fontFamily?: string;
  reverse?: boolean;
};

export default function StrokeText({
  text,
  strokeColor = "#C9A24B",
  strokeStyle = "solid",
  strokeWidth = 1.4,
  drawDuration = 1.6,
  fillDelay = 0.2,
  stagger = 0.05,
  fontSize = "clamp(40px, 9vw, 112px)",
  fontWeight = 800,
  letterSpacing = 4,
  hoverRedraw = false,
  shadow = false,
  fontFamily = "'Playfair Display', serif",
  reverse = false,
}: StrokeTextProps) {
  const id = useId().replace(/:/g, "");
  const [redraw, setRedraw] = useState(0);
  const letters = useMemo(() => Array.from(text), [text]);
  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setTimeout(() => {
      const svg = document.getElementById(`stroke-${id}`);
      if (!svg) return;
      svg.querySelectorAll<SVGTextElement>(".stroke-letter").forEach((letter, index) => {
        const length = letter.getComputedTextLength() + 4;
        letter.style.strokeDasharray = `${length}`;
        letter.style.strokeDashoffset = `${length}`;
        letter.animate([{ strokeDashoffset: length }, { strokeDashoffset: 0 }], {
          duration: drawDuration * 1000,
          delay: index * stagger * 1000,
          easing: "cubic-bezier(.2,.8,.2,1)",
          fill: "forwards",
        });
      });
    }, 30);
    return () => window.clearTimeout(timer);
  }, [id, drawDuration, stagger, reducedMotion, redraw]);

  const letterDuration = drawDuration + Math.max(0, letters.length - 1) * stagger;
  return (
    <div
      className={`stroke-text-wrap${shadow ? " stroke-text-shadow" : ""}`}
      onMouseEnter={() => { if (hoverRedraw && !reducedMotion) setRedraw((v) => v + 1); }}
      aria-label={text}
      role="img"
    >
      <svg id={`stroke-${id}`} className="stroke-text-svg" viewBox={`0 0 ${Math.max(600, text.length * 80)} 150`} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <linearGradient id={`gold-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E6C879" />
            <stop offset="100%" stopColor="#B8893A" />
          </linearGradient>
          <clipPath id={`wipe-${id}`}>
            <rect className={`stroke-fill-wipe ${reverse ? "wipe-reverse" : ""}`} x="0" y="0" width="100%" height="100%" style={{ animationDelay: `${letterDuration + fillDelay}s` }} />
          </clipPath>
        </defs>
        <text
          x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
          fontFamily={fontFamily} fontSize="100" fontWeight={fontWeight} letterSpacing={letterSpacing}
          fill="transparent" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
          className="stroke-text-outline"
        >
          {letters.map((letter, index) => (
            <tspan
              key={`${letter}-${index}-${redraw}`}
              className="stroke-letter"
              style={{ animationDelay: `${index * stagger}s`, strokeDasharray: 0, strokeDashoffset: 0, strokeDashstyle: strokeStyle === "dashed" ? "dashed" : undefined } as React.CSSProperties}
            >{letter === " " ? "\u00a0" : letter}</tspan>
          ))}
        </text>
        <text
          x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
          fontFamily={fontFamily} fontSize="100" fontWeight={fontWeight} letterSpacing={letterSpacing}
          fill={reducedMotion ? "url(#gold-" + id + ")" : "url(#gold-" + id + ")"}
          stroke="none" clipPath={`url(#wipe-${id})`}
          className="stroke-text-fill"
        >{text}</text>
      </svg>
    </div>
  );
}
