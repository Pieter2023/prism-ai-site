import { Link } from 'react-router-dom';
import PrismHero from '../PrismHero';

export default function Hero() {
  return (
    <section style={{ position: 'relative', paddingTop: 140, paddingBottom: 80, overflow: 'hidden' }}>
      <div className="container">
        <div
          className="hero-grid"
          style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 60, alignItems: 'center' }}
        >
          <div>
            <div className="chip fade-up" style={{ animationDelay: '0.1s' }}>
              <span className="chip-dot" />
              <span>AI &amp; Automation · Kelowna BC</span>
            </div>
            <h1
              className="display fade-up"
              style={{ marginTop: 28, marginBottom: 28, animationDelay: '0.2s' }}
            >
              Practical AI<br />
              that actually<br />
              <span className="italic-accent" style={{ fontStyle: 'italic' }}>
                runs your business.
              </span>
            </h1>
            <p className="body-lg fade-up" style={{ maxWidth: 520, animationDelay: '0.35s' }}>
              We don&apos;t sell AI. We build the systems that quietly take the tedium out of your
              operations—so your team spends its hours on work that actually matters.
            </p>
            <div
              className="fade-up"
              style={{
                marginTop: 36,
                display: 'flex',
                gap: 12,
                flexWrap: 'wrap',
                animationDelay: '0.5s',
              }}
            >
              <Link to="/audit" className="btn btn-accent btn-lg">
                Start free 5-min audit
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6h8M7 3l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link to="/pricing" className="btn btn-ghost btn-lg">
                See what we build
              </Link>
            </div>
            <div
              className="fade-up"
              style={{
                marginTop: 48,
                display: 'flex',
                gap: 28,
                flexWrap: 'wrap',
                animationDelay: '0.65s',
              }}
            >
              {(
                [
                  ['Fixed-fee', 'No hourly surprises'],
                  ['24 hrs', 'To your proposal'],
                  ['100%', 'Custom-built'],
                ] as const
              ).map(([k, v]) => (
                <div key={k}>
                  <div
                    className="mono"
                    style={{
                      fontSize: 11,
                      color: 'var(--fg-2)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                    }}
                  >
                    {v}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--serif)',
                      fontSize: 28,
                      marginTop: 4,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {k}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="hero-visual fade-in"
            style={{ display: 'flex', justifyContent: 'center', animationDelay: '0.3s' }}
          >
            <PrismHero size={520} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-visual { order: -1; }
        }
      `}</style>
    </section>
  );
}
