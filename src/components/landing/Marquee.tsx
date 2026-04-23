export default function Marquee() {
  const items = [
    'Kelowna BC',
    'Fixed-fee projects',
    'Receptionist AI',
    'Workflow automation',
    'Custom integrations',
    '24-hr proposal',
    '5★ Google reviews',
    'No templates',
  ];
  return (
    <div
      style={{
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        padding: '20px 0',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 48,
          animation: 'slide 40s linear infinite',
          whiteSpace: 'nowrap',
        }}
      >
        {[...items, ...items, ...items].map((t, i) => (
          <span
            key={i}
            className="mono"
            style={{
              fontSize: 12,
              color: 'var(--fg-2)',
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 48,
            }}
          >
            {t}
            <span style={{ width: 4, height: 4, borderRadius: 999, background: 'var(--fg-3)' }} />
          </span>
        ))}
      </div>
      <style>{`
        @keyframes slide { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
        @media (prefers-reduced-motion: reduce) {
          div[style*="slide"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
