import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PrismLogo from './PrismLogo';
import { openVoicebot } from '../utils/voicebot';

interface NavLink {
  to: string;
  label: string;
  badge?: string;
}

const links: NavLink[] = [
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/audit', label: 'Audit', badge: 'Free' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/';
    // /services is aliased to /pricing
    if (to === '/services') return location.pathname === '/services' || location.pathname === '/pricing';
    return location.pathname.startsWith(to);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: scrolled ? '10px 0' : '18px 0',
        transition: 'padding 280ms ease, background 280ms ease, border-color 280ms ease',
        background: scrolled ? 'rgba(7,8,11,0.72)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      }}
    >
      <div
        className="container"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <button
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
          aria-label="Prism AI home"
        >
          <PrismLogo size={26} />
        </button>

        <nav className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {links.map((l) => {
            const active = isActive(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                style={{
                  padding: '8px 14px',
                  fontSize: 14,
                  color: active ? 'var(--fg-0)' : 'var(--fg-1)',
                  fontWeight: 400,
                  letterSpacing: '-0.005em',
                  borderRadius: 999,
                  transition: 'color 180ms ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg-0)')}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = active ? 'var(--fg-0)' : 'var(--fg-1)')
                }
              >
                {l.label}
                {l.badge && (
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 9,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--accent)',
                      border: '1px solid rgba(59,92,255,0.3)',
                      borderRadius: 999,
                      padding: '1px 6px',
                      lineHeight: 1.4,
                    }}
                  >
                    {l.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="nav-cta" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <a
            href="tel:+12367774093"
            className="btn btn-ghost btn-sm nav-phone"
            title="Call us"
          >
            <span style={{ fontFamily: 'var(--mono)', fontSize: 12 }}>+1 236 777 4093</span>
          </a>
          <button className="btn btn-accent btn-sm" onClick={openVoicebot}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>mic</span>
            Talk to AI
          </button>

          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d={mobileOpen ? 'M5 5l10 10M15 5L5 15' : 'M3 6h14M3 10h14M3 14h14'}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="nav-mobile-menu"
          style={{
            marginTop: 12,
            borderTop: '1px solid var(--line)',
            padding: '20px var(--gutter)',
            background: 'rgba(7,8,11,0.96)',
            backdropFilter: 'blur(14px)',
          }}
        >
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '14px 0',
                borderBottom: '1px solid var(--line)',
                fontSize: 18,
                fontFamily: 'var(--serif)',
                color: 'var(--fg-0)',
              }}
            >
              {l.label}
              {l.badge && (
                <span
                  style={{
                    marginLeft: 8,
                    fontFamily: 'var(--mono)',
                    fontSize: 10,
                    color: 'var(--accent)',
                  }}
                >
                  {l.badge}
                </span>
              )}
            </Link>
          ))}
          <button
            className="btn btn-accent"
            style={{ width: '100%', marginTop: 20 }}
            onClick={() => {
              setMobileOpen(false);
              openVoicebot();
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>mic</span>
            Talk to AI
          </button>
          <a
            href="tel:+12367774093"
            style={{
              display: 'block',
              marginTop: 14,
              textAlign: 'center',
              fontFamily: 'var(--mono)',
              fontSize: 13,
              color: 'var(--fg-1)',
            }}
          >
            +1 236 777 4093
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 980px) {
          .nav-desktop { display: none !important; }
          .nav-phone { display: none !important; }
        }
        @media (min-width: 981px) {
          .nav-mobile-toggle { display: none !important; }
          .nav-mobile-menu { display: none !important; }
        }
        .nav-mobile-toggle {
          width: 38px; height: 38px;
          display: inline-flex; align-items: center; justify-content: center;
          color: var(--fg-0);
          border: 1px solid var(--line);
          border-radius: 10px;
        }
      `}</style>
    </header>
  );
}
