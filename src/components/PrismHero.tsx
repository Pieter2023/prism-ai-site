interface PrismHeroProps {
  size?: number;
}

export default function PrismHero({ size = 480 }: PrismHeroProps) {
  return (
    <div style={{ position: 'relative', width: size, height: size, maxWidth: '100%' }}>
      <svg viewBox="0 0 480 480" width="100%" height="100%" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="pfL" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1a1f2e" stopOpacity="0.95" />
            <stop offset="1" stopColor="#0b0d12" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="pfR" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#242b3d" stopOpacity="0.95" />
            <stop offset="1" stopColor="#0b0d12" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="pfT" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0" stopColor="#2a3048" stopOpacity="0.9" />
            <stop offset="1" stopColor="#11141b" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="pbeam-in" x1="0" y1="0.5" x2="1" y2="0.5">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.9" />
          </linearGradient>
          {(
            [
              ['pr-v', '#6b5cff'],
              ['pr-i', '#3b5cff'],
              ['pr-c', '#3ec6ff'],
              ['pr-g', '#5df0c0'],
              ['pr-a', '#ffb865'],
              ['pr-r', '#ff6a8b'],
            ] as const
          ).map(([id, color]) => (
            <linearGradient key={id} id={id} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor={color} stopOpacity="0.9" />
              <stop offset="1" stopColor={color} stopOpacity="0" />
            </linearGradient>
          ))}
          <filter id="p-soft-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <filter id="p-hard-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        <circle cx="240" cy="240" r="180" fill="#3b5cff" opacity="0.1" filter="url(#p-hard-glow)" />

        <g opacity="0.85">
          <line x1="40" y1="240" x2="180" y2="240" stroke="url(#pbeam-in)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="40" y1="240" x2="180" y2="240" stroke="#ffffff" strokeWidth="0.5" strokeLinecap="round" opacity="0.6" />
        </g>

        <g>
          <path d="M240 80 L 240 340 L 120 360 Z" fill="url(#pfL)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" strokeLinejoin="round" />
          <path d="M240 80 L 240 340 L 360 360 Z" fill="url(#pfR)" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" strokeLinejoin="round" />
          <path d="M240 80 L 120 360 L 360 360 Z" fill="url(#pfT)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" strokeLinejoin="round" />
          <line x1="240" y1="80" x2="240" y2="340" stroke="rgba(255,255,255,0.35)" strokeWidth="0.6" />
        </g>

        <g className="prism-rays">
          {(
            [
              { y1: 245, y2: 180, c: 'pr-v', w: 2 },
              { y1: 250, y2: 220, c: 'pr-i', w: 2 },
              { y1: 255, y2: 260, c: 'pr-c', w: 2.2 },
              { y1: 260, y2: 300, c: 'pr-g', w: 2 },
              { y1: 265, y2: 340, c: 'pr-a', w: 2 },
              { y1: 270, y2: 380, c: 'pr-r', w: 2 },
            ] as const
          ).map((r, i) => (
            <line
              key={i}
              x1="300"
              y1={r.y1}
              x2="460"
              y2={r.y2}
              stroke={`url(#${r.c})`}
              strokeWidth={r.w}
              strokeLinecap="round"
              style={{ filter: 'url(#p-soft-glow)' }}
            />
          ))}
        </g>
      </svg>

      <style>{`
        .prism-rays line { animation: rayPulse 4s ease-in-out infinite; }
        .prism-rays line:nth-child(2) { animation-delay: 0.2s; }
        .prism-rays line:nth-child(3) { animation-delay: 0.4s; }
        .prism-rays line:nth-child(4) { animation-delay: 0.6s; }
        .prism-rays line:nth-child(5) { animation-delay: 0.8s; }
        .prism-rays line:nth-child(6) { animation-delay: 1s; }
        @keyframes rayPulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .prism-rays line { animation: none; }
        }
      `}</style>
    </div>
  );
}
