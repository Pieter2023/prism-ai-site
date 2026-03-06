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
    if (meta) meta.setAttribute('content', 'Free AI readiness assessment for your business. Get an instant score, discover automation opportunities, and unlock a personalized AI blueprint.');
    window.scrollTo(0, 0);
    return () => {
      document.title = 'Prism AI | Automate the Chaos';
      if (meta) meta.setAttribute('content', prevContent);
    };
  }, []);

  // Results page with payment status
  if (id && hasPaymentParam) {
    return (
      <main className="min-h-screen pt-28 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <PaymentGate />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-primary mb-4">
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            Free AI Readiness Assessment
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            How AI-Ready Is Your Business?
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto text-sm sm:text-base">
            Answer a few questions about your business and get an instant AI readiness score with personalized automation opportunities.
          </p>
        </div>

        <AuditProvider>
          <QuizShell />
        </AuditProvider>
      </div>
    </main>
  );
}
