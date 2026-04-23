import { useReveal } from '../hooks/useReveal';

type Post = {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  category: string;
  readTime: string;
  color: string;
};

const posts: Post[] = [
  {
    title: "AI Voice Agents Are Replacing Hold Music — Here's What That Means for Your Business",
    excerpt:
      'The shift from hold music to instant AI response is happening now across every Canadian industry. Businesses that adopt early gain a measurable competitive advantage.',
    slug: 'ai-voice-agents-replacing-hold-music',
    date: 'Mar 4, 2026',
    category: 'AI Voice Agents',
    readTime: '6 min read',
    color: 'var(--spec-indigo)',
  },
  {
    title: 'AI Receptionist Trends 2026: What Canadian Service Businesses Need to Know',
    excerpt:
      'From after-hours lead capture to multilingual call handling, these are the AI receptionist trends reshaping how Canadian SMBs operate in 2026.',
    slug: 'ai-voicebot-trends-2026',
    date: 'Mar 3, 2026',
    category: 'Industry Trends',
    readTime: '7 min read',
    color: 'var(--spec-cyan)',
  },
  {
    title: 'Stop Losing Leads While You Sleep',
    excerpt:
      'Every missed after-hours call is a lost opportunity. Learn how AI-powered lead capture keeps your pipeline full 24/7 — even when your team clocks out.',
    slug: 'stop-losing-leads-while-you-sleep',
    date: 'Mar 2, 2026',
    category: 'Lead Capture',
    readTime: '5 min read',
    color: 'var(--spec-amber)',
  },
];

export default function BlogPage() {
  useReveal();

  return (
    <main>
      <section style={{ paddingTop: 140, paddingBottom: 40 }}>
        <div className="container-narrow">
          <div className="chip">
            <span className="chip-dot" /> Insights
          </div>
          <h1
            className="display"
            style={{ marginTop: 24, fontSize: 'clamp(52px, 8vw, 120px)', maxWidth: 900 }}
          >
            Practical AI,
            <br />
            <span className="italic-accent" style={{ fontStyle: 'italic' }}>
              plainly written.
            </span>
          </h1>
          <p className="body-lg" style={{ marginTop: 24, maxWidth: 620 }}>
            Field notes on AI automation, lead capture, and workflow design for Canadian service
            businesses. No hype. What actually works, and what doesn&apos;t.
          </p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div
            className="blog-grid"
            style={{ display: 'grid', gap: 1, background: 'var(--line)', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}
          >
            {posts.map((p, i) => (
              <a
                key={p.slug}
                href={`/blog/${p.slug}/`}
                className="reveal blog-row"
                style={{
                  background: 'var(--ink-0)',
                  padding: '40px clamp(24px, 4vw, 56px)',
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr 200px',
                  gap: 32,
                  alignItems: 'start',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'background 240ms ease',
                  transitionDelay: `${i * 80}ms`,
                }}
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
                    color: p.color,
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}
                >
                  0{i + 1}
                </div>
                <div>
                  <div
                    className="mono"
                    style={{
                      fontSize: 11,
                      color: p.color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                      marginBottom: 10,
                    }}
                  >
                    {p.category}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--serif)',
                      fontSize: 'clamp(24px, 2.6vw, 32px)',
                      fontWeight: 400,
                      letterSpacing: '-0.02em',
                      margin: 0,
                      lineHeight: 1.15,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p className="body" style={{ marginTop: 14, maxWidth: 560 }}>
                    {p.excerpt}
                  </p>
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
                    {p.date}
                  </div>
                  <div
                    className="mono"
                    style={{ fontSize: 11, color: 'var(--fg-2)', marginTop: 4, letterSpacing: '0.1em' }}
                  >
                    {p.readTime}
                  </div>
                  <div
                    style={{
                      marginTop: 20,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 13,
                      color: p.color,
                    }}
                  >
                    Read article
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
              </a>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <a href="/blog/" className="btn btn-ghost btn-lg">
              View all articles
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 6h8M7 3l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .blog-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
