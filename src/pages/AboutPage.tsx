import { useNavigate } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';

export default function AboutPage() {
  const navigate = useNavigate();
  useReveal();

  return (
    <main>
      <section style={{ paddingTop: 140, paddingBottom: 60 }}>
        <div className="container-narrow">
          <div className="chip">
            <span className="chip-dot" /> About
          </div>
          <h1
            className="display"
            style={{ marginTop: 24, fontSize: 'clamp(52px, 8vw, 120px)', maxWidth: 900 }}
          >
            We don&apos;t sell AI.
          </h1>
          <p
            className="display-sm"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              color: 'var(--fg-1)',
              marginTop: 24,
              maxWidth: 780,
              lineHeight: 1.2,
            }}
          >
            We build{' '}
            <span className="italic-accent" style={{ fontStyle: 'italic' }}>
              practical systems
            </span>{' '}
            that make your business run better—and we measure whether they do.
          </p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div
            className="reveal ab-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 80,
              alignItems: 'start',
            }}
          >
            {(
              [
                [
                  '01',
                  'Outcomes over demos.',
                  'Every engagement is scoped to a specific, measurable result. Hours saved per week. Leads converted. Tickets deflected. If a build won’t hit its number, we won’t start it.',
                ],
                [
                  '02',
                  'Fixed fees, full stop.',
                  'Hourly billing turns consultants into clock-watchers. We quote to scope, eat the overruns ourselves, and you know your budget before anyone writes code.',
                ],
                [
                  '03',
                  'You own what we build.',
                  'Code, prompts, configs, docs—yours at the end. No lock-in, no licensing games, no ransomware if you decide to part ways. We earn the renewal or we don’t.',
                ],
                [
                  '04',
                  'Small by design.',
                  'Boutique on purpose. You work directly with the person building your system—no account managers, no offshore handoffs, no telephone-game requirements.',
                ],
              ] as const
            ).map(([no, title, body]) => (
              <div key={no}>
                <div className="eyebrow-accent">Principle {no}</div>
                <h3
                  className="display-sm"
                  style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', marginTop: 16 }}
                >
                  {title}
                </h3>
                <p className="body-lg" style={{ marginTop: 20 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
          <style>{`@media (max-width: 780px) { .ab-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
        </div>
      </section>

      <section className="section">
        <div className="container-narrow">
          <div
            className="reveal"
            style={{
              position: 'relative',
              padding: 'clamp(40px, 5vw, 72px)',
              border: '1px solid var(--line-strong)',
              borderRadius: 'var(--r-lg)',
              background: 'var(--ink-1)',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }} className="spectrum-bar" />
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: 'var(--fg-2)',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
              }}
            >
              Founder
            </div>
            <h3
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(36px, 4.5vw, 64px)',
                letterSpacing: '-0.02em',
                margin: '16px 0 28px',
                lineHeight: 1.05,
              }}
            >
              Pieter — one person,{' '}
              <span className="italic-accent" style={{ fontStyle: 'italic' }}>
                every engagement.
              </span>
            </h3>
            <p className="body-lg" style={{ maxWidth: 680 }}>
              Prism is a studio of one by design. You work directly with the person scoping your
              build, the person writing your prompts, and the person picking up the phone when
              something breaks. Based in Kelowna, British Columbia. Previous work spans enterprise
              automation, product engineering, and the unglamorous plumbing that actually makes AI
              useful.
            </p>
            <div
              className="founder-stats"
              style={{
                marginTop: 36,
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 24,
                paddingTop: 28,
                borderTop: '1px solid var(--line)',
              }}
            >
              {(
                [
                  ['5.0', 'Google rating'],
                  ['< 24h', 'Response time'],
                  ['Kelowna', 'British Columbia'],
                ] as const
              ).map(([k, v]) => (
                <div key={v}>
                  <div
                    style={{
                      fontFamily: 'var(--serif)',
                      fontSize: 'clamp(28px, 3vw, 40px)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                    }}
                  >
                    {k}
                  </div>
                  <div
                    className="mono"
                    style={{
                      fontSize: 11,
                      color: 'var(--fg-2)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      marginTop: 8,
                    }}
                  >
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style>{`@media (max-width: 640px) { .founder-stats { grid-template-columns: 1fr !important; gap: 16px !important; } }`}</style>
        </div>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <h3 className="display-sm" style={{ maxWidth: 720, margin: '0 auto' }}>
            Ready to put AI to{' '}
            <span className="italic-accent" style={{ fontStyle: 'italic' }}>
              actual work?
            </span>
          </h3>
          <div
            style={{
              marginTop: 32,
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <button className="btn btn-accent btn-lg" onClick={() => navigate('/audit')}>
              Start free audit
            </button>
            <button className="btn btn-ghost btn-lg" onClick={() => navigate('/contact')}>
              Book a call
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
