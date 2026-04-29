import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';

const AuditPage = lazy(() => import('./pages/AuditPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const WebsitesPage = lazy(() => import('./pages/WebsitesPage'));

function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--ink-0)', color: 'var(--fg-0)' }}>
      <Navbar />
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
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/audit" element={<AuditPage />} />
          <Route path="/audit/results/:id" element={<AuditPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
