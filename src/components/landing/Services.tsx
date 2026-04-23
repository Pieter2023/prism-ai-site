import { useNavigate } from 'react-router-dom';

type Service = {
  no: string;
  title: string;
  body: string;
  features: string[];
  price: string;
  color: string;
  featured?: boolean;
};

const services: Service[] = [
  {
    no: '01',
    title: 'AI receptionist & voice agents',
    body: 'A 24/7 voice agent that answers calls, qualifies leads, and books appointments in your brand voice. Your team stops fielding noise.',
    features: ['Call routing & qualification', 'Calendar & CRM sync', 'Multilingual', 'Custom-trained on your services'],
    price: 'From $4,500',
    color: 'var(--spec-indigo)',
  },
  {
    no: '02',
    title: 'Workflow automation',
    body: 'End-to-end automation of repetitive operations—follow-ups, reporting, invoicing, onboarding. The boring work disappears.',
    features: ['Process mapping', 'Multi-system orchestration', 'Dashboards & reporting', 'Email & SMS sequences'],
    price: 'From $7,500',
    color: 'var(--spec-cyan)',
    featured: true,
  },
  {
    no: '03',
    title: 'Custom AI systems',
    body: "For operations that don't fit a template. Fine-tuned models, proprietary integrations, and agents that reason over your data.",
    features: ['Fine-tuned LLMs', 'Custom API development', 'Multi-agent orchestration', 'Legacy system bridges'],
    price: 'Custom quote',
    color: 'var(--spec-amber)',
  },
];

export default function Services() {
  const navigate = useNavigate();
  return (
    <section className="section" id="services">
      <div className="container">
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 60,
            alignItems: 'end',
            marginBottom: 80,
          }}
        >
          <div>
            <div className="eyebrow-accent">What we build</div>
            <h2 className="display-sm" style={{ marginTop: 18 }}>
              Three things, done{' '}
              <span className="italic-accent" style={{ fontStyle: 'italic' }}>
                exceptionally
              </span>{' '}
              well.
            </h2>
          </div>
          <p className="body-lg" style={{ maxWidth: 460, justifySelf: 'end' }}>
            No dashboards full of features nobody uses. Each build is scoped to one outcome, shipped
            in weeks, and measured in hours saved.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gap: 1,
            background: 'var(--line)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--r-lg)',
            overflow: 'hidden',
          }}
        >
          {services.map((s, i) => (
            <div
              key={s.no}
              className="reveal service-row"
              style={{
                background: 'var(--ink-0)',
                padding: '48px clamp(24px, 4vw, 56px)',
                display: 'grid',
                gridTemplateColumns: '80px 1.4fr 1fr 160px',
                gap: 32,
                alignItems: 'start',
                transition: 'background 240ms ease',
                cursor: 'pointer',
                transitionDelay: `${i * 80}ms`,
              }}
              onClick={() => navigate('/pricing')}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--ink-1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--ink-0)';
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 44,
                  color: s.color,
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                {s.no}
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 'clamp(28px, 3vw, 40px)',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    margin: 0,
                    lineHeight: 1.1,
                  }}
                >
                  {s.title}
                </h3>
                <p className="body" style={{ marginTop: 14, maxWidth: 520 }}>
                  {s.body}
                </p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {s.features.map((f) => (
                  <span
                    key={f}
                    style={{
                      fontSize: 12,
                      padding: '5px 10px',
                      color: 'var(--fg-1)',
                      border: '1px solid var(--line-strong)',
                      borderRadius: 999,
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
              <div style={{ textAlign: 'right' }}>
                <div
                  className="mono"
                  style={{
                    fontSize: 11,
                    color: 'var(--fg-2)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  Starting at
                </div>
                <div
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 28,
                    marginTop: 4,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {s.price}
                </div>
                <div
                  style={{
                    marginTop: 16,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 13,
                    color: s.color,
                  }}
                >
                  Details
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6h8M7 3l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .service-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
