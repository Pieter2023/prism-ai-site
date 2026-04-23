export default function Testimonial() {
  return (
    <section className="section">
      <div className="container-narrow">
        <div className="reveal" style={{ textAlign: 'left' }}>
          <div className="eyebrow-accent">Client</div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginTop: 28,
              marginBottom: 32,
            }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#ffb865">
                <path d="M8 1l2.1 4.5 4.9.5-3.7 3.3 1.1 4.8L8 11.7 3.6 14.1l1.1-4.8L1 6l4.9-.5z" />
              </svg>
            ))}
            <span
              className="mono"
              style={{
                fontSize: 12,
                color: 'var(--fg-2)',
                marginLeft: 8,
                letterSpacing: '0.1em',
              }}
            >
              GOOGLE · VERIFIED
            </span>
          </div>
          <blockquote
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(28px, 3.2vw, 44px)',
              fontWeight: 400,
              lineHeight: 1.25,
              letterSpacing: '-0.01em',
              margin: 0,
              color: 'var(--fg-0)',
              textWrap: 'balance',
            }}
          >
            &ldquo;The experience with Prism has been excellent. Pieter is extremely knowledgeable,
            passionate, and responsive to our needs. He has fixes in under 24 hours, and is always
            open to making adjustments as needed.&rdquo;
          </blockquote>
          <div
            style={{
              marginTop: 32,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              paddingTop: 32,
              borderTop: '1px solid var(--line)',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 999,
                border: '1px solid var(--line-strong)',
                background: 'var(--ink-2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 2L17 16H3L10 2Z"
                  fill="url(#tgrad)"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="0.8"
                />
                <defs>
                  <linearGradient id="tgrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#3b5cff" />
                    <stop offset="1" stopColor="#3ec6ff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 15 }}>Innovative Fitness Kelowna</div>
              <div className="caption">Health, wellness &amp; longevity platform · Ongoing custom build</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
