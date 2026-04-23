import { Link } from 'react-router-dom';
import PrismHero from '../PrismHero';

export default function CTABlock() {
  return (
    <section className="section">
      <div className="container">
        <div
          className="reveal"
          style={{
            position: 'relative',
            border: '1px solid var(--line-strong)',
            borderRadius: 'var(--r-xl)',
            padding: 'clamp(48px, 6vw, 96px)',
            overflow: 'hidden',
            background:
              'radial-gradient(ellipse at top right, rgba(59,92,255,0.14), transparent 55%), var(--ink-1)',
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }} className="spectrum-bar" />
          <div
            className="cta-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: 60,
              alignItems: 'center',
            }}
          >
            <div>
              <h2 className="display-sm" style={{ maxWidth: 560 }}>
                See what AI could{' '}
                <span className="italic-accent" style={{ fontStyle: 'italic' }}>
                  actually
                </span>{' '}
                do for you.
              </h2>
              <p className="body-lg" style={{ marginTop: 24, maxWidth: 500 }}>
                Five minutes to a readiness score and the three highest-ROI automations in your
                business. No email wall.
              </p>
              <div style={{ marginTop: 36, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link to="/audit" className="btn btn-accent btn-lg">
                  Start free audit
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6h8M7 3l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>
                <Link to="/contact" className="btn btn-ghost btn-lg">
                  Book a call
                </Link>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <PrismHero size={340} />
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 980px) {
          .cta-grid { grid-template-columns: 1fr !important; }
          .cta-grid > div:last-child { display: none !important; }
        }
      `}</style>
    </section>
  );
}
