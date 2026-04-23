const items = [
  { k: '85%', v: 'Reduction in weekly reporting time', ctx: 'Automated exec summaries' },
  { k: '3×', v: 'Lead conversion lift', ctx: 'AI receptionist + qualification' },
  { k: '60%', v: 'Fewer internal support tickets', ctx: 'Smart internal assistant' },
  { k: '99.7%', v: 'Document processing accuracy', ctx: 'Invoice & contract extraction' },
];

export default function Outcomes() {
  return (
    <section
      className="section"
      style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}
    >
      <div className="container">
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 60,
            alignItems: 'end',
            marginBottom: 64,
          }}
        >
          <div>
            <div className="eyebrow-accent">Real outcomes</div>
            <h2 className="display-sm" style={{ marginTop: 18 }}>
              The only numbers that matter.
            </h2>
          </div>
          <p className="body-lg" style={{ maxWidth: 440, justifySelf: 'end' }}>
            Ranges from real projects. We scope everything to measurable outcomes and track them
            after launch.
          </p>
        </div>

        <div
          className="outcomes-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}
        >
          {items.map((it, i) => (
            <div
              key={i}
              className="reveal"
              style={{
                padding: '48px 32px 48px 0',
                borderRight: i < items.length - 1 ? '1px solid var(--line)' : 'none',
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div className="num spectrum-text" style={{ fontSize: 'clamp(56px, 6vw, 96px)' }}>
                {it.k}
              </div>
              <div
                style={{
                  marginTop: 16,
                  fontSize: 16,
                  color: 'var(--fg-0)',
                  maxWidth: 220,
                  lineHeight: 1.35,
                }}
              >
                {it.v}
              </div>
              <div
                className="mono"
                style={{
                  marginTop: 12,
                  fontSize: 11,
                  color: 'var(--fg-2)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}
              >
                {it.ctx}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 980px) {
          .outcomes-grid { grid-template-columns: 1fr 1fr !important; }
          .outcomes-grid > div { padding: 32px 24px !important; border-bottom: 1px solid var(--line) !important; }
        }
      `}</style>
    </section>
  );
}
