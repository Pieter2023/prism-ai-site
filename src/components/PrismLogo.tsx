interface PrismLogoProps {
  size?: number;
  withWordmark?: boolean;
  className?: string;
  /**
   * Background colour shown through the centre "hole" of the prism ring.
   * Defaults to --ink-0. On light backgrounds, pass the surrounding colour
   * (e.g. "#ffffff") so the hole doesn't read as a black dot.
   */
  holeColor?: string;
}

/**
 * Prism ring glyph — six spectrum wedges around a hollow centre.
 * Inline SVG so it renders identically in-app, in favicons, and in OG cards.
 *
 * Colour order matches the CSS token spectrum and the conic-gradient
 * starting at 200deg used elsewhere in the brand:
 *   violet → indigo → cyan → green → amber → rose
 */
export default function PrismLogo({
  size = 28,
  withWordmark = true,
  className = '',
  holeColor = '#07080b',
}: PrismLogoProps) {
  return (
    <div
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 10, height: size }}
    >
      <svg
        viewBox="0 0 32 32"
        width={size}
        height={size}
        aria-hidden="true"
        role="img"
      >
        {/* Six spectrum wedges, each 60°, starting at SVG 110°
            (== CSS conic 200°) and rotating clockwise. */}
        <path d="M16 16 L11.21 29.16 A14 14 0 0 1 2.21 18.43 Z" fill="#6b5cff" />
        <path d="M16 16 L2.21 18.43  A14 14 0 0 1 7.00 5.27  Z" fill="#3b5cff" />
        <path d="M16 16 L7.00 5.27   A14 14 0 0 1 20.79 2.84 Z" fill="#3ec6ff" />
        <path d="M16 16 L20.79 2.84  A14 14 0 0 1 29.79 13.57 Z" fill="#5df0c0" />
        <path d="M16 16 L29.79 13.57 A14 14 0 0 1 25.00 26.73 Z" fill="#ffb865" />
        <path d="M16 16 L25.00 26.73 A14 14 0 0 1 11.21 29.16 Z" fill="#ff6a8b" />
        {/* Hollow centre — the "prism" read */}
        <circle cx="16" cy="16" r="7" fill={holeColor} />
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
