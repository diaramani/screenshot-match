type DiyaProps = { lit: boolean; className?: string };

export function Diya({ lit, className }: DiyaProps) {
  return (
    <svg viewBox="0 0 600 420" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="bowl" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--brass-light)" />
          <stop offset="0.45" stopColor="var(--brass-mid)" />
          <stop offset="1" stopColor="var(--brass-dark)" />
        </linearGradient>
        <linearGradient id="rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--rim-dark)" />
          <stop offset="0.5" stopColor="var(--rim-light)" />
          <stop offset="1" stopColor="var(--rim-end)" />
        </linearGradient>
        <radialGradient id="oil" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor={lit ? "var(--oil-lit)" : "var(--oil-unlit)"} />
          <stop offset="1" stopColor="var(--oil-dark)" />
        </radialGradient>
        <radialGradient id="flame" cx="0.5" cy="0.75" r="0.6">
          <stop offset="0" stopColor="var(--flame-core)" />
          <stop offset="0.45" stopColor="var(--flame-gold)" />
          <stop offset="1" stopColor="var(--flame-tip)" />
        </radialGradient>
        <radialGradient id="halo">
          <stop offset="0" stopColor="var(--halo)" />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
      </defs>
      {lit && <circle cx="300" cy="80" r="170" fill="url(#halo)" className="animate-ignite" />}
      {/* shadow */}
      <ellipse cx="320" cy="400" rx="170" ry="16" fill="var(--art-shadow)" />
      {/* base */}
      <path d="M230 330 L370 330 L410 395 L190 395 Z" fill="url(#bowl)" stroke="var(--ink)" strokeWidth="9" strokeLinejoin="round" />
      <path d="M200 375 L400 375" stroke="var(--ink)" strokeWidth="6" />
      {/* bowl */}
      <path d="M35 130 Q60 330 300 335 Q540 330 565 130 Z" fill="url(#bowl)" stroke="var(--ink)" strokeWidth="10" strokeLinejoin="round" />
      <path d="M70 200 Q300 240 530 175" fill="none" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const x = 115 + i * 62;
        const y = 228 - Math.abs(i - 3) * 2 + (i < 3 ? 4 : -2);
        return (
          <g key={i}>
            <ellipse cx={x} cy={y} rx="12" ry="18" fill="var(--cream)" stroke="var(--ink)" strokeWidth="6" />
            <circle cx={x - 10} cy={y + 34} r="7" fill="var(--ink)" />
          </g>
        );
      })}
      {/* rim + oil */}
      <ellipse cx="300" cy="130" rx="265" ry="62" fill="url(#rim)" stroke="var(--ink)" strokeWidth="10" />
      <ellipse cx="300" cy="135" rx="225" ry="42" fill="url(#oil)" />
      <ellipse cx="240" cy="118" rx="110" ry="10" fill="var(--oil-shine)" />
      {/* wick holder */}
      <path d="M255 175 Q300 135 345 175 Q300 200 255 175 Z" fill="url(#rim)" stroke="var(--ink)" strokeWidth="7" />
      <path d="M300 172 L300 70" stroke="var(--ink)" strokeWidth="9" strokeLinecap="round" />
      <circle cx="300" cy="66" r="10" fill={lit ? "var(--wick-lit)" : "var(--saffron)"} />
      {lit && (
        <g className="animate-ignite">
          <g className="animate-flicker">
            <path d="M300 -10 C340 30 335 60 300 75 C265 60 260 30 300 -10 Z" fill="url(#flame)" stroke="var(--ink)" strokeWidth="5" />
            <path d="M300 30 C315 45 312 60 300 66 C288 60 285 45 300 30 Z" fill="var(--flame-core)" />
          </g>
        </g>
      )}
    </svg>
  );
}

const PETALS = 14;
export function Marigold({ className }: { className?: string }) {
  const ring = (r: number, len: number, w: number, fill: string, offset: number) =>
    Array.from({ length: PETALS }).map((_, i) => (
      <ellipse
        key={`${r}-${i}`}
        cx="100"
        cy={100 - r}
        rx={w}
        ry={len}
        fill={fill}
        stroke="var(--ink)"
        strokeWidth="4"
        transform={`rotate(${(360 / PETALS) * i + offset} 100 100)`}
      />
    ));
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      {ring(62, 26, 16, "var(--marigold)", 0)}
      {ring(42, 22, 14, "var(--saffron)", 12)}
      {ring(24, 16, 11, "var(--marigold)", 5)}
      <circle cx="100" cy="100" r="14" fill="var(--vermilion)" stroke="var(--ink)" strokeWidth="4" />
    </svg>
  );
}

export function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path d="M20 2 C22 15 25 18 38 20 C25 22 22 25 20 38 C18 25 15 22 2 20 C15 18 18 15 20 2 Z" fill="currentColor" stroke="var(--ink)" strokeWidth="2" />
    </svg>
  );
}

export function DiyaLogo() {
  return (
    <span className="grid h-9 w-9 place-items-center rounded-lg border-2 border-ink bg-vermilion">
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path d="M12 3 C15 7 15 10 12 12 C9 10 9 7 12 3Z" fill="var(--marigold)" stroke="var(--ink)" strokeWidth="1.3" />
        <path d="M4 14 H20 Q19 20 12 20 Q5 20 4 14Z" fill="var(--marigold)" stroke="var(--ink)" strokeWidth="1.3" />
      </svg>
    </span>
  );
}
