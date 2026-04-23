import { useNavigate } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';

type Tier = {
  name: string;
  price: string;
  note: string;
  color: string;
  featured?: boolean;
  tagline: string;
  features: string[];
  fit: string;
};

const tiers: Tier[] = [
  {
    name: 'AI Receptionist',
    price: '$4,500',
    note: 'Fixed fee · 2–3 weeks',
    color: 'var(--spec-indigo)',
    tagline: 'Stop leaking leads.',
    features: [
      'Custom-trained AI voice agent',
      'Call routing & lead qualification',
      'CRM + calendar integration',
      'Branded voice & personality',
      '30 days post-launch support',
    ],
    fit: 'Businesses losing leads to missed calls or after-hours inquiries.',
  },
  {
    name: 'Workflow Automation',
    price: '$7,500',
    note: 'Fixed fee · 3–6 weeks',
    color: 'var(--spec-cyan)',
    featured: true,
    tagline: 'Operations run themselves.',
    features: [
      'Process mapping & design',
      'Multi-step workflow builds',
      'Email / SMS follow-up',
      'Dashboards & reporting',
      '30 days post-launch support',
    ],
    fit: 'Teams spending hours on manual entry, follow-ups, or reporting.',
  },
  {
    name: 'Custom AI System',
    price: 'Quoted',
    note: 'Scoped together',
    color: 'var(--spec-amber)',
    tagline: 'Beyond templates.',
    features: [
      'Fine-tuned AI model',
      'Proprietary API integrations',
      'Multi-system orchestration',
      'Advanced analytics',
      '30 days post-launch support',
    ],
    fit: 'Complex operations, legacy systems, or unique AI needs.',
  },
];

const retainers = [
  {
    name: 'Essential Care',
    price: '$497',
    period: '/mo',
    items: ['Monitoring & uptime', 'Minor adjustments', 'Monthly performance report', 'Email support · 48h'],
  },
  {
    name: 'Priority Ops',
    price: '$997',
    period: '/mo',
    items: [
      'Everything in Essential',
      'Priority support · 24h',
      'Monthly strategy call',
      'New builds · up to 8 hrs',
      'Quarterly AI roadmap',
    ],
  },
];

export default function PricingPage() {
  const navigate = useNavigate();
  useReveal();

  return (
    <main>
      <section style={{ paddingTop: 140, paddingBottom: 60 }}>
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <div className="chip" style={{ margin: '0 auto' }}>Pricing</div>
          <h1 className="display" style={{ fontSize: 'clamp(52px, 7vw, 96px)', marginTop: 24 }}>
            Fixed fees.
            <br />
            <span className="italic-accent" style={{ fontStyle: 'italic' }}>
              Zero surprises.
            </span>
          </h1>
          <p
            className="body-lg"
            style={{ marginTop: 28, maxWidth: 640, margin: '28px auto 0' }}
          >
            Every project includes discovery, design, build, and 30 days of post-launch support.
            Third-party usage (telephony, AI APIs) is billed at cost with no markup.
          </p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div
            className="tier-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}
          >
            {tiers.map((t) => (
              <div
                key={t.name}
                className="reveal"
                style={{
                  padding: 40,
                  background: t.featured
                    ? 'linear-gradient(180deg, rgba(62,198,255,0.05), transparent)'
                    : 'var(--ink-1)',
                  border: `1px solid ${t.featured ? 'rgba(62,198,255,0.28)' : 'var(--line)'}`,
                  borderRadius: 'var(--r-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  minHeight: 520,
                }}
              >
                {t.featured && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }} className="spectrum-bar" />
                )}
                <div
                  className="mono"
                  style={{
                    fontSize: 11,
                    color: t.color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                  }}
                >
                  {t.name}
                </div>
                <div
                  style={{ marginTop: 20, fontFamily: 'var(--serif)', fontSize: 28, lineHeight: 1.15 }}
                >
                  {t.tagline}
                </div>
                <div style={{ marginTop: 24, display: 'flex', alignItems: 'baseline', gap: 10 }}>
                  <span
                    style={{
                      fontFamily: 'var(--serif)',
                      fontSize: 56,
                      letterSpacing: '-0.03em',
                      lineHeight: 1,
                    }}
                  >
                    {t.price}
                  </span>
                </div>
                <div className="caption mono" style={{ marginTop: 6, letterSpacing: '0.08em' }}>
                  {t.note}
                </div>
                <div
                  style={{
                    marginTop: 28,
                    paddingTop: 24,
                    borderTop: '1px solid var(--line)',
                    flex: 1,
                  }}
                >
                  {t.features.map((f) => (
                    <div
                      key={f}
                      style={{
                        padding: '8px 0',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                        fontSize: 14,
                        color: 'var(--fg-1)',
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        style={{ marginTop: 4, flexShrink: 0 }}
                      >
                        <path
                          d="M2 7.5l3 3 7-7"
                          stroke={t.color}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {f}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--line)' }}>
                  <div className="caption">Ideal for: {t.fit}</div>
                  <button
                    className={t.featured ? 'btn btn-accent' : 'btn btn-paper'}
                    style={{ width: '100%', marginTop: 20 }}
                    onClick={() => navigate('/contact')}
                  >
                    Discuss this build
                  </button>
                </div>
              </div>
            ))}
          </div>
          <style>{`@media (max-width: 980px) { .tier-grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="reveal" style={{ marginBottom: 48 }}>
            <div className="eyebrow-accent">Ongoing management</div>
            <h2 className="display-sm" style={{ marginTop: 18, maxWidth: 700 }}>
              After launch, keep it{' '}
              <span className="italic-accent" style={{ fontStyle: 'italic' }}>
                sharp.
              </span>
            </h2>
          </div>
          <div
            className="ret-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
          >
            {retainers.map((r) => (
              <div key={r.name} className="reveal card" style={{ padding: 36 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 28 }}>{r.name}</div>
                  <div>
                    <span style={{ fontFamily: 'var(--serif)', fontSize: 36 }}>{r.price}</span>
                    <span className="mono" style={{ color: 'var(--fg-2)', fontSize: 13 }}>
                      {r.period}
                    </span>
                  </div>
                </div>
                <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--line)' }}>
                  {r.items.map((i) => (
                    <div
                      key={i}
                      style={{
                        padding: '6px 0',
                        fontSize: 14,
                        color: 'var(--fg-1)',
                        display: 'flex',
                        gap: 10,
                      }}
                    >
                      <span style={{ color: 'var(--accent)' }}>·</span>
                      {i}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <style>{`@media (max-width: 780px) { .ret-grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container-narrow">
          <div className="reveal">
            <div className="eyebrow-accent">Fine print</div>
            <h3
              className="display-sm"
              style={{ fontSize: 'clamp(28px, 3vw, 40px)', marginTop: 16 }}
            >
              What&apos;s included, what&apos;s billed separately.
            </h3>
            <div
              className="fp-grid"
              style={{
                marginTop: 32,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
              }}
            >
              {(
                [
                  [
                    'Included in every project',
                    [
                      'Discovery workshop',
                      'Written scope & fixed quote',
                      'Design & build',
                      'Integration & testing',
                      '30 days post-launch support',
                      'Transfer of ownership',
                    ],
                  ],
                  [
                    'Billed separately, at cost',
                    [
                      'Telephony minutes (voice agents)',
                      'AI API usage (OpenAI, Anthropic, etc.)',
                      'Third-party SaaS subscriptions',
                      'Domain & hosting (if applicable)',
                    ],
                  ],
                ] as const
              ).map(([title, items]) => (
                <div key={title} className="card" style={{ padding: 28 }}>
                  <div
                    className="mono"
                    style={{
                      fontSize: 11,
                      color: 'var(--fg-2)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                    }}
                  >
                    {title}
                  </div>
                  <div style={{ marginTop: 16 }}>
                    {items.map((i) => (
                      <div key={i} style={{ padding: '6px 0', fontSize: 14, color: 'var(--fg-1)' }}>
                        — {i}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style>{`@media (max-width: 780px) { .fp-grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>
    </main>
  );
}
