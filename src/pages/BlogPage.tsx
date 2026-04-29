import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { getAllPosts, formatDateLabel } from '../lib/posts';

export default function BlogPage() {
  useReveal();
  const posts = getAllPosts();

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
          {posts.length === 0 ? (
            <div
              style={{
                border: '1px solid var(--line)',
                borderRadius: 'var(--r-lg)',
                padding: '60px 40px',
                textAlign: 'center',
                background: 'var(--ink-0)',
              }}
            >
              <p className="body-lg" style={{ margin: 0, color: 'var(--fg-2)' }}>
                The first article is on the way. Check back soon.
              </p>
            </div>
          ) : (
            <div
              className="blog-grid"
              style={{
                display: 'grid',
                gap: 1,
                background: 'var(--line)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--r-lg)',
                overflow: 'hidden',
              }}
            >
              {posts.map((p, i) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
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
                    {String(i + 1).padStart(2, '0')}
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
                      {formatDateLabel(p.date)}
                    </div>
                    <div
                      className="mono"
                      style={{
                        fontSize: 11,
                        color: 'var(--fg-2)',
                        marginTop: 4,
                        letterSpacing: '0.1em',
                      }}
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
                </Link>
              ))}
            </div>
          )}
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
