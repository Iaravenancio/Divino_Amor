export function Logo({ size = 120, withName = true }: { size?: number; withName?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" role="img" aria-label="DIVINO AMOR">
      <defs>
        <linearGradient id="lg-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E6C879" />
          <stop offset="0.5" stopColor="#C9A24B" />
          <stop offset="1" stopColor="#B8893A" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="98" fill="#561228" />
      <path
        d={withName ? "M100 82 C80 66 66 52 76 40 C84 31 96 35 100 45 C104 35 116 31 124 40 C134 52 120 66 100 82Z" : "M100 150 C60 118 36 92 54 66 C68 46 92 52 100 72 C108 52 132 46 146 66 C164 92 140 118 100 150Z"}
        fill="none" stroke="url(#lg-gold)" strokeWidth={withName ? 4 : 8} strokeLinejoin="round"
      />
      {withName && (
        <>
          <text x="100" y="122" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="30" fontWeight="600" fill="url(#lg-gold)">Divino Amor</text>
          <line x1="62" y1="138" x2="138" y2="138" stroke="url(#lg-gold)" strokeWidth="1" />
        </>
      )}
    </svg>
  );
}
