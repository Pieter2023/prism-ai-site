const steps = [
  {
    no: '01',
    t: 'Audit',
    d: "Free 5-minute questionnaire or a conversation. We map what you do, where it leaks time, and where AI has a real payoff.",
  },
  {
    no: '02',
    t: 'Blueprint',
    d: "Within 24 hours you get a written plan: scope, timeline, fixed price, and the outcomes we'll be measured against.",
  },
  {
    no: '03',
    t: 'Build',
    d: 'We design, build, and integrate—usually 2 to 6 weeks. You see working software weekly, not quarterly.',
  },
  {
    no: '04',
    t: 'Operate',
    d: 'Launch with 30 days of support included. Retainer optional. If it breaks, we fix it that day.',
  },
];

export default function Process() {
  return (
    <section className="section">
      <div className="container">
        <div className="reveal" style={{ marginBottom: 72 }}>
          <div className="eyebrow-accent">How it works</div>
          <h2 className="display-sm" style={{ marginTop: 18, maxWidth: 800 }}>
            A process built on{' '}
            <span className="italic-accent" style={{ fontStyle: 'italic' }}>
              accountability,
            </span>{' '}
            not promises.
          </h2>
        </div>
        <div
          className="process-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            background: 'var(--line)',
          }}
        >
          {steps.map((s, i) => (
            <div
              key={s.no}
              className="reveal"
              style={{
                background: 'var(--ink-0)',
                padding: '40px 28px',
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                }}
              >
                Step {s.no}
              </div>
              <div
                style={{
                  marginTop: 16,
                  fontFamily: 'var(--serif)',
                  fontSize: 32,
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                {s.t}
              </div>
              <p className="body" style={{ marginTop: 14, fontSize: 14 }}>
                {s.d}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 780px) {
          .process-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
