import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Lazy load below-fold sections to reduce initial bundle on mobile
const Process = lazy(() => import('./components/Process'));
const UseCases = lazy(() => import('./components/UseCases'));
const FAQ = lazy(() => import('./components/FAQ'));
const Pricing = lazy(() => import('./components/Pricing'));
const Blog = lazy(() => import('./components/Blog'));
const Contact = lazy(() => import('./components/Contact'));
const AuditPage = lazy(() => import('./pages/AuditPage'));

function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Suspense>
          <Process />
          <UseCases />
          <Pricing />
          <Blog />
          <FAQ />
        </Suspense>
      </main>
      <Suspense>
        <Contact />
      </Suspense>
    </>
  );
}

function App() {
  return (
    <div className="bg-[#0a0f1a] min-h-screen text-slate-100 selection:bg-primary/30 selection:text-white font-display overflow-x-hidden">
      <Navbar />
      <Suspense>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/audit" element={<AuditPage />} />
          <Route path="/audit/results/:id" element={<AuditPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
