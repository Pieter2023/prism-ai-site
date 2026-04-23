import { useState, type FormEvent } from 'react';
import { useReveal } from '../hooks/useReveal';
import { sendContactInquiry } from '../utils/api';

type ContactInfo = {
  label: string;
  value: string;
  href?: string;
  mono?: boolean;
};

const contacts: ContactInfo[] = [
  { label: 'Direct line', value: '+1 236 777 4093', href: 'tel:+12367774093', mono: true },
  { label: 'Email', value: 'pieter@prismaiservices.ca', href: 'mailto:pieter@prismaiservices.ca' },
  { label: 'Location', value: 'Kelowna, British Columbia' },
];

export default function ContactPage() {
  useReveal();
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      await sendContactInquiry({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim() || undefined,
        message: form.message.trim(),
      });
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send your inquiry. Please email pieter@prismaiservices.ca directly.');
      setSubmitting(false);
    }
  };

  const setField =
    (key: 'name' | 'email' | 'company' | 'message') =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <main>
      <section style={{ paddingTop: 140, paddingBottom: 100 }}>
        <div className="container">
          <div
            className="c-grid"
            style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 80 }}
          >
            <div>
              <div className="chip">
                <span className="chip-dot" /> Contact
              </div>
              <h1
                className="display"
                style={{ marginTop: 24, fontSize: 'clamp(56px, 8vw, 120px)' }}
              >
                Let&apos;s scope
                <br />
                something{' '}
                <span className="italic-accent" style={{ fontStyle: 'italic' }}>
                  real.
                </span>
              </h1>
              <p className="body-lg" style={{ marginTop: 28, maxWidth: 480 }}>
                Tell us what&apos;s slow, tedious, or leaking money. We respond within a business
                day with a written plan or a polite &ldquo;not us.&rdquo;
              </p>

              <div style={{ marginTop: 48, display: 'grid', gap: 20, maxWidth: 480 }}>
                {contacts.map((c) => (
                  <div
                    key={c.label}
                    style={{ paddingBottom: 20, borderBottom: '1px solid var(--line)' }}
                  >
                    <div
                      className="mono"
                      style={{
                        fontSize: 11,
                        color: 'var(--fg-2)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.14em',
                      }}
                    >
                      {c.label}
                    </div>
                    {c.href ? (
                      <a
                        href={c.href}
                        style={{
                          fontFamily: c.mono ? 'var(--mono)' : 'var(--serif)',
                          fontSize: c.mono ? 22 : 28,
                          marginTop: 6,
                          display: 'block',
                          color: 'var(--fg-0)',
                          letterSpacing: c.mono ? '0.02em' : '-0.01em',
                        }}
                      >
                        {c.value}
                      </a>
                    ) : (
                      <div
                        style={{
                          fontFamily: 'var(--serif)',
                          fontSize: 28,
                          marginTop: 6,
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {c.value}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: 'clamp(28px, 3vw, 48px)', alignSelf: 'start' }}>
              {!sent ? (
                <form onSubmit={onSubmit}>
                  <div
                    className="mono"
                    style={{
                      fontSize: 11,
                      color: 'var(--accent)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                    }}
                  >
                    Project inquiry
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--serif)',
                      fontSize: 28,
                      marginTop: 10,
                      marginBottom: 28,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Tell us about your business.
                  </div>

                  {(
                    [
                      { id: 'name', label: 'Your name', type: 'text', required: true },
                      { id: 'email', label: 'Email', type: 'email', required: true },
                      { id: 'company', label: 'Company', type: 'text', required: false },
                    ] as const
                  ).map((f) => (
                    <label key={f.id} style={{ display: 'block', marginBottom: 18 }}>
                      <span
                        className="mono"
                        style={{
                          fontSize: 10,
                          color: 'var(--fg-2)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.14em',
                        }}
                      >
                        {f.label}
                      </span>
                      <input
                        required={f.required}
                        type={f.type}
                        value={form[f.id]}
                        onChange={setField(f.id)}
                        disabled={submitting}
                        style={{
                          width: '100%',
                          background: 'transparent',
                          border: 'none',
                          borderBottom: '1px solid var(--line-strong)',
                          padding: '10px 0',
                          color: 'var(--fg-0)',
                          fontFamily: 'var(--sans)',
                          fontSize: 16,
                          marginTop: 4,
                          outline: 'none',
                          transition: 'border-color 160ms ease',
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line-strong)')}
                      />
                    </label>
                  ))}

                  <label style={{ display: 'block', marginBottom: 18 }}>
                    <span
                      className="mono"
                      style={{
                        fontSize: 10,
                        color: 'var(--fg-2)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.14em',
                      }}
                    >
                      What are you trying to solve?
                    </span>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={setField('message')}
                      disabled={submitting}
                      style={{
                        width: '100%',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid var(--line-strong)',
                        padding: '10px 0',
                        color: 'var(--fg-0)',
                        fontFamily: 'var(--sans)',
                        fontSize: 16,
                        marginTop: 4,
                        outline: 'none',
                        resize: 'none',
                      }}
                    />
                  </label>

                  {error && (
                    <div
                      style={{
                        marginTop: 4,
                        marginBottom: 14,
                        padding: '10px 14px',
                        borderRadius: 'var(--r-md)',
                        background: 'rgba(255, 106, 139, 0.08)',
                        border: '1px solid rgba(255, 106, 139, 0.25)',
                        color: '#ff8aa3',
                        fontSize: 13,
                      }}
                    >
                      {error}
                    </div>
                  )}

                  <button
                    className="btn btn-accent btn-lg"
                    style={{ width: '100%', marginTop: 16 }}
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? 'Sending…' : 'Send inquiry'}
                    {!submitting && (
                      <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 6h8M7 3l3 3-3 3"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </button>
                  <p className="caption" style={{ textAlign: 'center', marginTop: 16 }}>
                    Response within one business day.
                  </p>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      margin: '0 auto',
                      borderRadius: 999,
                      background: 'rgba(93,240,192,0.1)',
                      border: '1px solid rgba(93,240,192,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 12l6 6 10-12"
                        stroke="#5df0c0"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--serif)',
                      fontSize: 32,
                      marginTop: 24,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Inquiry received.
                  </div>
                  <p className="body" style={{ marginTop: 12, maxWidth: 340, margin: '12px auto 0' }}>
                    We&apos;ll be in touch within one business day. A confirmation has been sent to{' '}
                    <span style={{ color: 'var(--fg-0)' }}>{form.email}</span>.
                  </p>
                </div>
              )}
            </div>
          </div>
          <style>{`@media (max-width: 980px) { .c-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
        </div>
      </section>
    </main>
  );
}
