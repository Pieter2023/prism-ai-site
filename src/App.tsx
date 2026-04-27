import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';

const AuditPage = lazy(() => import('./pages/AuditPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const WebsitesPage = lazy(() => import('./pages/WebsitesPage'));
const ScopeRecorderPage = lazy(() => import('./pages/ScopeRecorderPage'));

const IDENTITY_CALLBACK_KEYS = [
  'invite_token',
  'recovery_token',
  'confirmation_token',
  'email_change_token',
  'access_token',
];

function hasIdentityCallback(search: string, hash: string) {
  const raw = `${search}&${hash.replace(/^#/, '')}`;
  return IDENTITY_CALLBACK_KEYS.some((key) => raw.includes(`${key}=`));
}

function isInternalScopeRecorderHost() {
  if (typeof window === 'undefined') return false;
  const host = window.location.hostname;
  return (
    host === 'prism-scope-recorder-internal.netlify.app' ||
    host.endsWith('--prism-scope-recorder-internal.netlify.app')
  );
}

function App() {
  const location = useLocation();
  const isScopeRecorder = location.pathname.startsWith('/scope-recorder');
  const shouldRouteIdentityCallback =
    !isScopeRecorder && hasIdentityCallback(location.search, location.hash);
  const shouldRouteInternalRecorderHost = !isScopeRecorder && isInternalScopeRecorderHost();

  if (shouldRouteIdentityCallback || shouldRouteInternalRecorderHost) {
    return (
      <Navigate
        to={{
          pathname: '/scope-recorder',
          search: location.search,
          hash: location.hash,
        }}
        replace
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ink-0)', color: 'var(--fg-0)' }}>
      {!isScopeRecorder && <Navbar />}
      <Suspense>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/services" element={<Navigate to="/pricing" replace />} />
          <Route path="/websites" element={<WebsitesPage />} />
          <Route path="/services/websites" element={<Navigate to="/websites" replace />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/audit" element={<AuditPage />} />
          <Route path="/audit/results/:id" element={<AuditPage />} />
          <Route path="/scope-recorder" element={<ScopeRecorderPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      {!isScopeRecorder && <Footer />}
    </div>
  );
}

export default App;
