import { Link } from 'react-router-dom';
import PrismLogo from './PrismLogo';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', marginTop: 0, paddingTop: 80 }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 48,
            paddingBottom: 64,
          }}
        >
          <div style={{ maxWidth: 320 }}>
            <PrismLogo size={30} />
            <p className="caption" style={{ marginTop: 20, color: 'var(--fg-2)' }}>
              We don&apos;t sell AI. We build practical systems that make your business run
              better—and measurably so.
            </p>
            <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="chip">
                <span
                  className="chip-dot"
                  style={{ background: '#5df0c0', boxShadow: '0 0 10px #5df0c0' }}
                />
                Available · Kelowna BC
              </span>
            </div>
          </div>

          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Work</div>
            {[
              ['/services', 'Services'],
              ['/pricing', 'Pricing'],
              ['/audit', 'Free AI audit'],
            ].map(([to, label]) => (
              <Link
                key={to}
                to={to}
                style={{ display: 'block', padding: '6px 0', color: 'var(--fg-1)', fontSize: 14 }}
              >
                {label}
              </Link>
            ))}
          </div>

          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Company</div>
            {[
              ['/about', 'About'],
              ['/blog', 'Blog'],
              ['/contact', 'Contact'],
            ].map(([to, label]) => (
              <Link
                key={to}
                to={to}
                style={{ display: 'block', padding: '6px 0', color: 'var(--fg-1)', fontSize: 14 }}
              >
                {label}
              </Link>
            ))}
          </div>

          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Get in touch</div>
            <a
              href="tel:+12367774093"
              style={{
                display: 'block',
                padding: '6px 0',
                color: 'var(--fg-1)',
                fontSize: 14,
                fontFamily: 'var(--mono)',
              }}
            >
              +1 236 777 4093
            </a>
            <a
              href="mailto:pieter@prismaiservices.ca"
              style={{ display: 'block', padding: '6px 0', color: 'var(--fg-1)', fontSize: 14 }}
            >
              pieter@prismaiservices.ca
            </a>
          </div>
        </div>

        <div className="spectrum-bar" />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '28px 0',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div className="caption mono" style={{ color: 'var(--fg-3)' }}>
            © {new Date().getFullYear()} Prism AI Services · Kelowna, British Columbia
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#" className="caption" style={{ color: 'var(--fg-3)' }}>
              Privacy
            </a>
            <a href="#" className="caption" style={{ color: 'var(--fg-3)' }}>
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
