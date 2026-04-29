import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { getPostBySlug, formatDateLabel } from '../lib/posts';

const SITE_URL = 'https://prismaiservices.ca';
const DEFAULT_OG = '/og-default.svg';

function setMeta(name: string, content: string, isProperty = false) {
  const selector = isProperty
    ? `meta[property="${name}"]`
    : `meta[name="${name}"]`;
  let tag = document.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement('meta');
    if (isProperty) tag.setAttribute('property', name);
    else tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function setCanonical(href: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
}

function setArticleSchema(post: ReturnType<typeof getPostBySlug>) {
  if (!post) return;
  const id = 'article-jsonld';
  let tag = document.getElementById(id) as HTMLScriptElement | null;
  if (!tag) {
    tag = document.createElement('script');
    tag.type = 'application/ld+json';
    tag.id = id;
    document.head.appendChild(tag);
  }
  tag.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription ?? post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: 'Pieter van der Walt' },
    publisher: {
      '@type': 'Organization',
      name: 'Prism AI Services',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon-180.png`,
      },
    },
    image: `${SITE_URL}${post.ogImage ?? DEFAULT_OG}`,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    keywords: post.keywords?.join(', '),
  });
}

export default function BlogPostPage() {
  useReveal();
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (!post) {
      document.title = 'Article not found — Prism AI';
      return;
    }
    const desc = post.metaDescription ?? post.excerpt;
    const url = `${SITE_URL}/blog/${post.slug}`;
    const image = `${SITE_URL}${post.ogImage ?? DEFAULT_OG}`;

    document.title = `${post.title} — Prism AI`;
    setMeta('description', desc);
    setCanonical(url);

    setMeta('og:title', post.title, true);
    setMeta('og:description', desc, true);
    setMeta('og:url', url, true);
    setMeta('og:image', image, true);
    setMeta('og:type', 'article', true);
    setMeta('og:site_name', 'Prism AI Services', true);

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', post.title);
    setMeta('twitter:description', desc);
    setMeta('twitter:image', image);

    if (post.keywords?.length) {
      setMeta('keywords', post.keywords.join(', '));
    }

    setArticleSchema(post);
  }, [post]);

  if (!post) {
    return (
      <main>
        <section style={{ paddingTop: 140, paddingBottom: 120 }}>
          <div className="container-narrow" style={{ textAlign: 'center' }}>
            <div className="chip">
              <span className="chip-dot" /> 404
            </div>
            <h1
              className="display"
              style={{
                marginTop: 24,
                fontSize: 'clamp(48px, 6vw, 80px)',
              }}
            >
              Article not{' '}
              <span className="italic-accent" style={{ fontStyle: 'italic' }}>
                found.
              </span>
            </h1>
            <p
              className="body-lg"
              style={{ margin: '24px auto 0', maxWidth: 540 }}
            >
              Either this article moved or it was never here. Head back to the
              blog index.
            </p>
            <div style={{ marginTop: 40 }}>
              <Link to="/blog" className="btn btn-ghost btn-lg">
                ← Back to blog
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <article>
        <section style={{ paddingTop: 140, paddingBottom: 24 }}>
          <div className="container-narrow">
            <Link
              to="/blog"
              className="mono"
              style={{
                fontSize: 12,
                color: 'var(--fg-2)',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                textDecoration: 'none',
              }}
            >
              ← Blog
            </Link>
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: post.color,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                marginTop: 32,
                marginBottom: 20,
              }}
            >
              {post.category}
            </div>
            <h1
              className="display"
              style={{
                fontSize: 'clamp(40px, 5.5vw, 72px)',
                lineHeight: 1.1,
                maxWidth: 880,
                margin: 0,
              }}
            >
              {post.title}
            </h1>
            <div
              className="mono"
              style={{
                fontSize: 12,
                color: 'var(--fg-2)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginTop: 32,
              }}
            >
              {formatDateLabel(post.date)} · {post.readTime} · By Pieter van der
              Walt
            </div>
          </div>
        </section>

        <section style={{ paddingBottom: 80 }}>
          <div
            className="container-narrow blog-post-body"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </section>

        <section style={{ paddingBottom: 100 }}>
          <div className="container-narrow">
            <div
              style={{
                background: 'var(--ink-1)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--r-lg)',
                padding: 'clamp(28px, 4vw, 44px)',
              }}
            >
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  marginBottom: 12,
                }}
              >
                Drowning in admin?
              </div>
              <p className="body-lg" style={{ marginTop: 0, maxWidth: 620 }}>
                I help Kelowna and BC small businesses automate the chaos —
                websites, AI receptionists, and custom workflows that pay for
                themselves.
              </p>
              <div style={{ marginTop: 24 }}>
                <Link to="/contact" className="btn btn-primary btn-lg">
                  Book a Free Strategy Call
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6h8M7 3l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </article>

      <style>{`
        .blog-post-body {
          max-width: 740px;
        }
        .blog-post-body h2 {
          font-family: var(--serif);
          font-size: clamp(28px, 3vw, 36px);
          font-weight: 400;
          letter-spacing: -0.02em;
          margin: 56px 0 16px;
          line-height: 1.2;
          color: var(--fg-0);
        }
        .blog-post-body h3 {
          font-family: var(--serif);
          font-size: clamp(20px, 2.2vw, 26px);
          font-weight: 400;
          letter-spacing: -0.01em;
          margin: 40px 0 12px;
          line-height: 1.3;
          color: var(--fg-0);
        }
        .blog-post-body p {
          font-size: 18px;
          line-height: 1.65;
          color: var(--fg-1);
          margin: 0 0 20px;
        }
        .blog-post-body ul,
        .blog-post-body ol {
          font-size: 18px;
          line-height: 1.65;
          color: var(--fg-1);
          padding-left: 24px;
          margin: 20px 0;
        }
        .blog-post-body li {
          margin-bottom: 8px;
        }
        .blog-post-body a {
          color: var(--accent);
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-thickness: 1px;
        }
        .blog-post-body a:hover {
          text-decoration-thickness: 2px;
        }
        .blog-post-body strong {
          color: var(--fg-0);
          font-weight: 600;
        }
        .blog-post-body blockquote {
          border-left: 3px solid var(--accent);
          padding: 4px 0 4px 24px;
          margin: 32px 0;
          font-family: var(--serif);
          font-style: italic;
          font-size: 22px;
          color: var(--fg-0);
          line-height: 1.4;
        }
        .blog-post-body code {
          background: var(--ink-1);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: var(--mono);
          font-size: 0.92em;
        }
        .blog-post-body pre {
          background: var(--ink-1);
          border: 1px solid var(--line);
          border-radius: var(--r-md);
          padding: 16px 20px;
          overflow-x: auto;
          margin: 24px 0;
          font-family: var(--mono);
          font-size: 14px;
          line-height: 1.55;
        }
        .blog-post-body pre code {
          background: transparent;
          padding: 0;
        }
        .blog-post-body hr {
          border: none;
          border-top: 1px solid var(--line);
          margin: 48px 0;
        }
        .blog-post-body img {
          width: 100%;
          height: auto;
          border-radius: var(--r-md);
          margin: 32px 0;
        }
        .blog-post-body table {
          width: 100%;
          border-collapse: collapse;
          margin: 24px 0;
          font-size: 16px;
        }
        .blog-post-body th,
        .blog-post-body td {
          border: 1px solid var(--line);
          padding: 12px 16px;
          text-align: left;
        }
        .blog-post-body th {
          background: var(--ink-1);
          font-weight: 600;
          color: var(--fg-0);
        }
      `}</style>
    </main>
  );
}
