interface PrismLogoProps {
  size?: number;
  withWordmark?: boolean;
  className?: string;
}

export default function PrismLogo({ size = 28, withWordmark = true, className = '' }: PrismLogoProps) {
  return (
    <div
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 10, height: size }}
    >
      <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
        <defs>
          <linearGradient id="plA-1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#6b5cff" />
            <stop offset="1" stopColor="#3b5cff" />
          </linearGradient>
          <linearGradient id="plA-2" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#3ec6ff" />
            <stop offset="0.5" stopColor="#5df0c0" />
            <stop offset="1" stopColor="#ffb865" />
          </linearGradient>
        </defs>
        <path d="M16 3 L29 26 L16 19 Z" fill="url(#plA-1)" />
        <path d="M16 3 L16 19 L3 26 Z" fill="url(#plA-2)" opacity="0.85" />
        <path
          d="M16 3 L29 26 L3 26 Z"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </svg>
      {withWordmark && (
        <span
          style={{
            fontFamily: 'Geist, sans-serif',
            fontWeight: 600,
            fontSize: size * 0.57,
            letterSpacing: '-0.01em',
            color: '#f4f4f5',
            lineHeight: 1,
          }}
        >
          Prism
          <span
            style={{
              fontFamily: 'Instrument Serif, serif',
              fontStyle: 'italic',
              fontWeight: 400,
              marginLeft: 2,
              background: 'linear-gradient(92deg,#3b5cff,#3ec6ff,#ffb865)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ai
          </span>
        </span>
      )}
    </div>
  );
}
