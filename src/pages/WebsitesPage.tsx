import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';

/* ──────────────────────────────────────────────
   Pricing tiers — locked to CAD per CLAUDE.md
   ────────────────────────────────────────────── */
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

const TIERS: Tier[] = [
  {
    name: 'Essential',
    price: '$4,500',
    note: 'Fixed fee · 2 weeks',
    color: 'var(--spec-indigo)',
    tagline: 'A real site, fast.',
    features: [
      'Up to 5 page templates',
      'Mobile-responsive build',
      'On-page SEO + metadata',
      'Lead form + email routing',
      'Netlify deploy + domain handover',
      '30 days post-launch support',
    ],
    fit: 'You need a credible web presence and fast launch — content mostly supplied.',
  },
  {
    name: 'Professional',
    price: '$7,500',
    note: 'Fixed fee · 3–4 weeks',
    color: 'var(--spec-cyan)',
    featured: true,
    tagline: 'The site that books the work.',
    features: [
      'Custom design across all key pages',
      'Conversion-focused copywriting polish',
      'SEO setup, schema + Google Business links',
      'Booking / appointment request flow',
      'Analytics + conversion tracking',
      'Speed optimisation (90+ Lighthouse)',
      'Netlify deploy + launch support',
    ],
    fit: 'Local business that wants the site to actually generate enquiries — not just exist.',
  },
  {
    name: 'Premium',
    price: '$10,000–$12,500',
    note: 'Fixed fee · 4–6 weeks',
    color: 'var(--spec-amber)',
    tagline: 'AI-native. Books and sells.',
    features: [
      'Everything in Professional',
      'Embedded AI receptionist (voice + chat)',
      'Programmatic SEO / location pages',
      'Full SEO migration from old site',
      'Custom integrations (CRM, booking, payments)',
      'Editable CMS + training for your team',
      '60 days post-launch support',
    ],
    fit: 'Multi-location, high-volume, or service businesses where the website is a sales engine.',
  },
];

const PROCESS = [
  {
    no: '01',
    t: 'Audit',
    d: "Free 30-minute call. We map your offer, your customers, and what the site actually has to do — leads, bookings, applications.",
  },
  {
    no: '02',
    t: 'Blueprint',
    d: "Within 48 hours: a written scope, sitemap, fixed price, and the outcomes we'll be measured against.",
  },
  {
    no: '03',
    t: 'Build',
    d: 'Design and build, usually 2 to 6 weeks. You see real pages weekly — not a dead silence followed by a reveal.',
  },
  {
    no: '04',
    t: 'Launch',
    d: 'Domain transfer, Netlify deploy, analytics. 30 days of post-launch support included on every build.',
  },
];

const INCLUDED = [
  'Discovery + content strategy workshop',
  'Custom mobile-responsive design',
  'Copywriting polish on every page',
  'On-page SEO + structured data',
  'Lead/contact forms with email routing',
  'Speed optimisation (Core Web Vitals)',
  'Google Analytics + conversion tracking',
  'Netlify deployment + SSL',
  'Domain transfer + email setup',
  '30-day post-launch support',
  'Full ownership transfer (no lock-in)',
  'Written scope + fixed-fee quote',
];

const EXCLUDED: ReadonlyArray<readonly [string, string]> = [
  ['Stock photography or custom shoots', 'Sourced or commissioned at cost'],
  ['Third-party tools (CRM, booking, etc.)', 'Subscriptions billed direct to you'],
  ['Domain registration', '~$15–25/yr — handed over on launch'],
  ['Hosting', 'Netlify free tier or via support plan'],
  ['Paid advertising (Google / Meta)', 'Optional, scoped separately'],
];

const ADDONS = [
  {
    name: 'AI Receptionist',
    price: 'From $4,500',
    body: 'Embedded voice + chat agent that answers, qualifies, and books — 24/7. Trained on your services and pricing.',
    icon: 'M12 2a4 4 0 014 4v6a4 4 0 11-8 0V6a4 4 0 014-4zM5 11a7 7 0 0014 0M12 18v3M9 21h6',
  },
  {
    name: 'Programmatic SEO',
    price: 'From $2,500',
    body: 'Auto-generated location and service pages — every neighbourhood, every service combination — indexed and ranking.',
    icon: 'M3 6h18M3 12h18M3 18h18M7 6v12M17 6v12',
  },
  {
    name: 'Workflow Automation',
    price: 'From $7,500',
    body: 'Intake form → CRM → email follow-ups → calendar. Or your own custom flow. The boring work disappears.',
    icon: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6zM10 7h4M7 10v4M14 17h6',
  },
];

const FAQS = [
  {
    q: 'How is this different from a normal web agency?',
    a: "We're an AI shop that builds sites — not a web shop adding AI on top. Every site we build can plug straight into our voice receptionist, automation, and programmatic SEO stack. If you only want a site, you only pay for the site. If you later want AI to answer the phone, the foundation is already there.",
  },
  {
    q: 'What if I just want a brochure site? No AI, no fancy stuff.',
    a: "Essential at $4,500 is exactly that. Five pages, responsive, SEO clean, a lead form, deployed on Netlify. We won't try to upsell you into something you don't need.",
  },
  {
    q: 'How long does it take?',
    a: "Essential is 2 weeks. Professional is 3–4 weeks. Premium is 4–6 weeks. Faster if your content is ready, slower if we're starting from scratch on copy and photography.",
  },
  {
    q: 'Do I own the site? Can I edit it?',
    a: 'Yes. Full ownership transfers on launch — domain, code, deployment, everything. Premium includes a CMS so your team can edit pages directly. No vendor lock-in, ever.',
  },
  {
    q: "What's the support plan for after launch?",
    a: 'Every build includes 30 days post-launch support free. After that, the optional Care plan at $350/month covers hosting, security, content edits, form testing, and minor improvements. Cancel anytime.',
  },
  {
    q: 'Can you migrate my existing site?',
    a: 'Yes — Premium includes full SEO migration: 301 redirects, metadata transfer, indexing audit, and Google Search Console handoff. We make sure your existing rankings carry over.',
  },
];

/* ──────────────────────────────────────────────
   Sections
   ────────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{ position: 'relative', paddingTop: 140, paddingBottom: 80, overflow: 'hidden' }}>
      <div className="container">
        <div style={{ maxWidth: 920 }}>
          <div className="chip fade-up" style={{ animationDelay: '0.1s' }}>
            <span className="chip-dot" />
            <span>New service · Website Building</span>
          </div>
          <h1
            className="display fade-up"
            style={{
              marginTop: 28,
              marginBottom: 28,
              animationDelay: '0.2s',
              fontSize: 'clamp(44px, 7.5vw, 104px)',
            }}
          >
            The website that
            <br />
            books the work —{' '}
            <span className="italic-accent" style={{ fontStyle: 'italic' }}>
              and the AI that answers it.
            </span>
          </h1>
          <p className="body-lg fade-up" style={{ maxWidth: 620, animationDelay: '0.35s' }}>
            Conversion-focused websites for local businesses, with optional AI receptionist,
            automation, and programmatic SEO baked in. Fixed fee. Yours to keep.
          </p>
          <div
            className="fade-up"
            style={{ marginTop: 36, display: 'flex', gap: 12, flexWrap: 'wrap', animationDelay: '0.5s' }}
          >
            <Link to="/contact" className="btn btn-accent btn-lg">
              Book a Free Strategy Call
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
            <a href="#tiers" className="btn btn-ghost btn-lg">
              See pricing
            </a>
          </div>
        </div>

        <div className="fade-up" style={{ marginTop: 72, animationDelay: '0.7s' }}>
          <BrowserMock />
        </div>

        <div
          className="hero-stats fade-up"
          style={{
            marginTop: 56,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
            animationDelay: '0.85s',
          }}
        >
          {(
            [
              ['From 2 wks', 'Time to launch'],
              ['Fixed fee', 'No hourly surprises'],
              ['100%', 'Your code, your domain'],
              ['AI-ready', 'Plug in the receptionist'],
            ] as const
          ).map(([k, v]) => (
            <div key={v}>
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
                  marginTop: 6,
                  letterSpacing: '-0.02em',
                }}
              >
                {k}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrowserMock() {
  return (
    <div className="browser">
      <div className="browser-bar">
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-url">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          yourbusiness.ca
        </span>
      </div>
      <div className="mock">
        <div className="mock-nav">
          <div className="mock-logo">
            Maple &amp; Stone{' '}
            <span style={{ color: 'var(--fg-2)', fontFamily: 'var(--mono)', fontSize: 10, marginLeft: 8 }}>
              DENTAL
            </span>
          </div>
          <div className="mock-nav-links">
            <span>Services</span>
            <span>Team</span>
            <span>Reviews</span>
            <span>Contact</span>
          </div>
          <span className="mock-cta">Book now</span>
        </div>
        <div className="mock-hero">
          <div>
            <h3 className="mock-h1">
              A modern dental home for{' '}
              <span className="italic-accent" style={{ fontStyle: 'italic' }}>
                your whole family
              </span>
              .
            </h3>
            <p className="mock-sub">
              Implants, Invisalign, cosmetic, and family dentistry — with senior-friendly financing
              and same-week openings.
            </p>
            <div className="mock-row">
              <span className="mock-pill">Request appointment →</span>
              <span className="mock-pill ghost">Our services</span>
            </div>
          </div>
          <div className="mock-card">
            <div className="mock-tile" />
            <div className="mock-line long" />
            <div className="mock-line med" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 6 }}>
              <div
                style={{
                  background: 'var(--ink-2)',
                  borderRadius: 6,
                  padding: 8,
                  border: '1px solid var(--line)',
                }}
              >
                <div className="mock-line short" />
                <div
                  style={{
                    marginTop: 6,
                    fontFamily: 'var(--serif)',
                    fontSize: 18,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Implants
                </div>
              </div>
              <div
                style={{
                  background: 'var(--ink-2)',
                  borderRadius: 6,
                  padding: 8,
                  border: '1px solid var(--line)',
                }}
              >
                <div className="mock-line short" />
                <div
                  style={{
                    marginTop: 6,
                    fontFamily: 'var(--serif)',
                    fontSize: 18,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Invisalign
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mock-stats">
          {(
            [
              ['12k+', 'Patients'],
              ['4.9★', 'Google rating'],
              ['20 yrs', 'Local'],
              ['Same-wk', 'Openings'],
            ] as const
          ).map(([k, v]) => (
            <div key={v}>
              <div className="mock-stat-k">{k}</div>
              <div className="mock-stat-v">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Included() {
  return (
    <section className="section" id="included">
      <div className="container">
        <div
          className="reveal incl-header"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 60,
            alignItems: 'end',
            marginBottom: 64,
          }}
        >
          <div>
            <div className="eyebrow-accent">What&apos;s included</div>
            <h2 className="display-sm" style={{ marginTop: 18 }}>
              No menu of{' '}
              <span className="italic-accent" style={{ fontStyle: 'italic' }}>
                upsells.
              </span>{' '}
              Everything you need to launch.
            </h2>
          </div>
          <p className="body-lg" style={{ maxWidth: 460, justifySelf: 'end' }}>
            Every project ships with the same foundation. The tiers below differ in design depth,
            copy, integrations, and AI features — never in basic build quality.
          </p>
        </div>

        <div className="incl-grid reveal">
          <div className="incl-col">
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: 'var(--fg-2)',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                marginBottom: 18,
              }}
            >
              Included in every build
            </div>
            {INCLUDED.map((item) => (
              <div className="incl-row" key={item}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 7.5l3 3 7-7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="incl-col">
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: 'var(--fg-2)',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                marginBottom: 18,
              }}
            >
              Billed separately, at cost
            </div>
            {EXCLUDED.map(([k, v]) => (
              <div className="incl-row" key={k} style={{ flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    style={{ marginTop: 3, color: 'var(--fg-2)' }}
                  >
                    <path d="M3 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <div>
                    <div style={{ color: 'var(--fg-0)' }}>{k}</div>
                    <div className="caption" style={{ marginTop: 2 }}>
                      {v}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Tiers() {
  return (
    <section className="section" id="tiers">
      <div className="container">
        <div className="reveal" style={{ marginBottom: 56 }}>
          <div className="eyebrow-accent">Pricing</div>
          <h2 className="display-sm" style={{ marginTop: 18, maxWidth: 800 }}>
            Three tiers. Fixed fees.{' '}
            <span className="italic-accent" style={{ fontStyle: 'italic' }}>
              Zero surprises.
            </span>
          </h2>
        </div>
        <div className="web-tier-grid">
          {TIERS.map((t) => (
            <div key={t.name} className={`web-tier reveal ${t.featured ? 'featured' : ''}`}>
              {t.featured && (
                <div
                  className="spectrum-bar"
                  style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
                />
              )}
              <div className="web-tier-name" style={{ color: t.color }}>
                {t.name}
              </div>
              <div className="web-tier-tag">{t.tagline}</div>
              <div className="web-tier-price">
                <span className="v">{t.price}</span>
                <span className="mono caption">CAD</span>
              </div>
              <div className="caption mono" style={{ marginTop: 6, letterSpacing: '0.08em' }}>
                {t.note}
              </div>
              <div className="web-tier-feat">
                {t.features.map((f) => (
                  <div key={f} className="web-tier-feat-row">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2 7.5l3 3 7-7"
                        stroke={t.color}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <div className="web-tier-foot">
                <div className="caption">Ideal for: {t.fit}</div>
                <Link
                  to="/contact"
                  className={t.featured ? 'btn btn-accent' : 'btn btn-paper'}
                  style={{ width: '100%', marginTop: 20 }}
                >
                  Discuss this build
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div
          className="caption mono"
          style={{ marginTop: 24, textAlign: 'center', letterSpacing: '0.08em' }}
        >
          + applicable taxes · Quoted in Canadian dollars
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section">
      <div className="container">
        <div className="reveal" style={{ marginBottom: 56 }}>
          <div className="eyebrow-accent">How it works</div>
          <h2 className="display-sm" style={{ marginTop: 18, maxWidth: 800 }}>
            From first call to live site in{' '}
            <span className="italic-accent" style={{ fontStyle: 'italic' }}>
              weeks,
            </span>{' '}
            not quarters.
          </h2>
        </div>
        <div className="web-process-grid reveal">
          {PROCESS.map((s, i) => (
            <div className="web-process-cell" key={s.no} style={{ transitionDelay: `${i * 80}ms` }}>
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
    </section>
  );
}

function Addons() {
  return (
    <section className="section" id="addons">
      <div className="container">
        <div
          className="reveal addons-header"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 60,
            alignItems: 'end',
            marginBottom: 56,
          }}
        >
          <div>
            <div className="eyebrow-accent">The AI difference</div>
            <h2 className="display-sm" style={{ marginTop: 18 }}>
              Every site we build is{' '}
              <span className="italic-accent" style={{ fontStyle: 'italic' }}>
                upgrade-ready.
              </span>
            </h2>
          </div>
          <p className="body-lg" style={{ maxWidth: 460, justifySelf: 'end' }}>
            Add any of these on day one, or six months in. Same architecture, no replatforming, no
            second invoice for &ldquo;integration work&rdquo;.
          </p>
        </div>

        <div className="addons">
          {ADDONS.map((a) => (
            <div className="addon reveal" key={a.name}>
              <div className="addon-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={a.icon} />
                </svg>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 28,
                  letterSpacing: '-0.02em',
                  margin: '20px 0 0',
                  lineHeight: 1.1,
                }}
              >
                {a.name}
              </h3>
              <p className="body" style={{ marginTop: 12, fontSize: 14 }}>
                {a.body}
              </p>
              <div
                className="mono"
                style={{
                  marginTop: 18,
                  fontSize: 11,
                  color: 'var(--fg-2)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                }}
              >
                {a.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudy() {
  return (
    <section className="section" id="work">
      <div className="container">
        <div className="reveal" style={{ marginBottom: 48 }}>
          <div className="eyebrow-accent">Recent work</div>
          <h2 className="display-sm" style={{ marginTop: 18 }}>
            A dental practice that needed{' '}
            <span className="italic-accent" style={{ fontStyle: 'italic' }}>
              more chairs filled.
            </span>
          </h2>
        </div>

        <div className="case reveal">
          <div className="case-img">
            <div
              className="browser"
              style={{ width: '100%', maxWidth: 480, boxShadow: '0 30px 80px -30px rgba(0,0,0,0.6)' }}
            >
              <div className="browser-bar">
                <span className="browser-dot" />
                <span className="browser-dot" />
                <span className="browser-dot" />
                <span className="browser-url">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  dawsoncreekdental.ca
                </span>
              </div>
              <div className="mock" style={{ padding: '20px 22px 24px' }}>
                <div className="mock-nav">
                  <div className="mock-logo" style={{ fontSize: 14 }}>
                    Dawson Creek Dental
                  </div>
                  <span className="mock-cta" style={{ height: 22, fontSize: 10 }}>
                    Book →
                  </span>
                </div>
                <div style={{ marginTop: 18 }}>
                  <div
                    style={{
                      fontFamily: 'var(--serif)',
                      fontSize: 26,
                      lineHeight: 1.05,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Implants. Invisalign.{' '}
                    <span className="italic-accent" style={{ fontStyle: 'italic' }}>
                      Family.
                    </span>
                  </div>
                  <div className="mock-line long" style={{ marginTop: 14 }} />
                  <div className="mock-line med" style={{ marginTop: 8 }} />
                  <div
                    style={{
                      marginTop: 14,
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: 6,
                    }}
                  >
                    {['Implants', 'Invisalign', 'Senior Care'].map((s) => (
                      <div
                        key={s}
                        style={{
                          background: 'var(--ink-0)',
                          border: '1px solid var(--line)',
                          borderRadius: 6,
                          padding: '8px 6px',
                          fontSize: 10,
                          fontFamily: 'var(--mono)',
                          textAlign: 'center',
                          color: 'var(--fg-1)',
                        }}
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="case-meta">
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: 'var(--fg-2)',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
              }}
            >
              Dental · Dawson Creek, BC
            </div>
            <h3
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(28px, 3vw, 40px)',
                letterSpacing: '-0.02em',
                margin: '14px 0 0',
                lineHeight: 1.1,
              }}
            >
              Premium positioning around implants, Invisalign, and senior care.
            </h3>
            <p className="body" style={{ marginTop: 18, maxWidth: 460 }}>
              Custom design across Home, Services, Team, Reviews, and Contact. Conversion-focused
              copy, financing program, senior-care section, and SEO structured around their
              highest-margin services. Netlify deploy with launch support.
            </p>
            <div
              style={{
                marginTop: 28,
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 16,
                paddingTop: 20,
                borderTop: '1px solid var(--line)',
              }}
            >
              {(
                [
                  ['3 wks', 'Build → launch'],
                  ['7 pages', 'Custom designed'],
                  ['90+', 'Lighthouse score'],
                ] as const
              ).map(([k, v]) => (
                <div key={v}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 28, letterSpacing: '-0.02em' }}>
                    {k}
                  </div>
                  <div
                    className="mono"
                    style={{
                      fontSize: 10,
                      color: 'var(--fg-2)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginTop: 4,
                    }}
                  >
                    {v}
                  </div>
                </div>
              ))}
            </div>
            <div className="caption" style={{ marginTop: 24, fontStyle: 'italic' }}>
              Tier delivered: Professional · CAD $7,500
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Retainer() {
  return (
    <section className="section">
      <div className="container">
        <div className="reveal" style={{ marginBottom: 48 }}>
          <div className="eyebrow-accent">After launch</div>
          <h2 className="display-sm" style={{ marginTop: 18, maxWidth: 800 }}>
            Optional Care plan.{' '}
            <span className="italic-accent" style={{ fontStyle: 'italic' }}>
              $350
            </span>{' '}
            a month.
          </h2>
        </div>
        <div className="retainer reveal">
          <div>
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: 'var(--accent)',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
              }}
            >
              Care plan
            </div>
            <div
              style={{
                marginTop: 14,
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(36px, 4vw, 56px)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              $350<span style={{ fontSize: '0.5em', color: 'var(--fg-2)' }}> /month</span>
            </div>
            <p className="body" style={{ marginTop: 16, maxWidth: 440 }}>
              For practices that want their site to stay sharp without needing a full-time
              webmaster. Cancel anytime; everything still belongs to you.
            </p>
          </div>
          <div
            className="retainer-list"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 0,
              borderLeft: '1px solid var(--line)',
            }}
          >
            {[
              'Hosting management',
              'Small content edits',
              'Security & uptime checks',
              'Basic SEO monitoring',
              'Form testing each month',
              'Minor monthly improvements',
            ].map((item) => (
              <div
                key={item}
                style={{
                  padding: '14px 20px',
                  fontSize: 14,
                  color: 'var(--fg-1)',
                  borderBottom: '1px solid var(--line)',
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ color: 'var(--accent)', marginTop: 1 }}>·</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number>(0);
  return (
    <section className="section" id="faq">
      <div className="container-narrow">
        <div className="reveal" style={{ marginBottom: 48 }}>
          <div className="eyebrow-accent">Frequently asked</div>
          <h2 className="display-sm" style={{ marginTop: 18 }}>
            Things you&apos;re{' '}
            <span className="italic-accent" style={{ fontStyle: 'italic' }}>
              probably
            </span>{' '}
            wondering.
          </h2>
        </div>
        <div className="reveal">
          {FAQS.map((f, i) => (
            <div key={f.q} className={`faq-row ${open === i ? 'open' : ''}`}>
              <div className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{f.q}</span>
                <span className="faq-toggle">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
              <div className="faq-a">
                <div className="faq-a-inner body">{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="section-sm" id="contact">
      <div className="container">
        <div className="cta-block reveal">
          <div className="eyebrow-accent">Ready when you are</div>
          <h2
            className="display-sm"
            style={{ marginTop: 16, maxWidth: 760, marginLeft: 'auto', marginRight: 'auto' }}
          >
            Tell us what your business actually needs the website to do — and we&apos;ll send a fixed
            quote in{' '}
            <span className="italic-accent" style={{ fontStyle: 'italic' }}>
              48 hours.
            </span>
          </h2>
          <div
            style={{
              marginTop: 36,
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Link to="/contact" className="btn btn-accent btn-lg">
              Book a Free Strategy Call
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
            <a href="mailto:pieter@prismaiservices.ca" className="btn btn-ghost btn-lg">
              pieter@prismaiservices.ca
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Page-level meta (no react-helmet-async installed)
   ────────────────────────────────────────────── */
const PAGE_TITLE = 'Website Building | Prism AI — AI-native sites for local businesses';
const PAGE_DESCRIPTION =
  'AI-native websites for local businesses. Custom design, conversion-focused copy, SEO-clean, AI-receptionist ready. Fixed fees from CAD $4,500.';

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const prevTitle = document.title;
    const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') ?? null;

    document.title = title;
    if (metaDesc) metaDesc.setAttribute('content', description);

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc !== null) metaDesc.setAttribute('content', prevDesc);
    };
  }, [title, description]);
}

export default function WebsitesPage() {
  useReveal();
  usePageMeta(PAGE_TITLE, PAGE_DESCRIPTION);

  return (
    <main className="websites-page" style={{ overflow: 'hidden' }}>
      <Hero />
      <Included />
      <Tiers />
      <Process />
      <Addons />
      <CaseStudy />
      <Retainer />
      <FAQ />
      <CTA />
    </main>
  );
}
