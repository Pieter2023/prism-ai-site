import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { AuditProvider } from '../context/AuditContext';
import QuizShell from '../components/audit/QuizShell';
import PaymentGate from '../components/audit/PaymentGate';

export default function AuditPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const hasPaymentParam = searchParams.has('payment');

  useEffect(() => {
    document.title = 'AI Blueprint Audit | Prism AI';
    const meta = document.querySelector('meta[name="description"]');
    const prevContent = meta?.getAttribute('content') || '';
    if (meta)
      meta.setAttribute(
        'content',
        'Free AI readiness assessment for your business. Get an instant score, discover automation opportunities, and unlock a personalized AI blueprint.'
      );
    window.scrollTo(0, 0);
    return () => {
      document.title = 'Prism AI | Practical AI for growing businesses';
      if (meta) meta.setAttribute('content', prevContent);
    };
  }, []);

  // Results page with payment status
  if (id && hasPaymentParam) {
    return (
      <main>
        <section style={{ paddingTop: 140, paddingBottom: 100 }}>
          <div className="container-narrow">
            <PaymentGate />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section style={{ paddingTop: 140, paddingBottom: 80 }}>
        <div className="container-narrow">
          <div className="chip">
            <span className="chip-dot" /> Free AI readiness audit · 5 min
          </div>
          <h1 className="display-sm" style={{ marginTop: 24, maxWidth: 760 }}>
            Get your AI{' '}
            <span className="italic-accent" style={{ fontStyle: 'italic' }}>
              Blueprint.
            </span>
          </h1>
          <p className="body-lg" style={{ marginTop: 20, maxWidth: 640 }}>
            Answer a few questions about your business and get an instant AI readiness score with
            personalized automation opportunities.
          </p>

          <div style={{ marginTop: 56 }}>
            <AuditProvider>
              <QuizShell />
            </AuditProvider>
          </div>
        </div>
      </section>
    </main>
  );
}
