import { useEffect, useRef, Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SEO from './components/SEO';
import Navigation from './components/Navigation';
import Home from './pages/Home';
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const WorkDetail = lazy(() => import('./pages/WorkDetail'));
const BlogPage = lazy(() => import('./pages/Blog'));
const FAQPage = lazy(() => import('./pages/FAQ'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Footer = lazy(() => import('./sections/Footer'));
const PromoBanner = lazy(() => import('./components/PromoBanner'));
const Chatbot = lazy(() => import('./components/Chatbot'));
const FloatingActions = lazy(() => import('./components/FloatingActions'));
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Wrap in timeout to let Lenis settle if active
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 10);
  }, [pathname]);
  return null;
}

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenisRef.current.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisRef.current?.destroy();
      gsap.ticker.remove((time) => {
        lenisRef.current?.raf(time * 1000);
      });
    };
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <SEO />
          <div className="relative min-h-screen bg-brand-black noise-overlay">
            <Navigation />
            <Suspense fallback={null}>
              <PromoBanner />
            </Suspense>
            <main>
              <Suspense fallback={<div className="min-h-screen bg-brand-black flex items-center justify-center text-brand-blue">Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services/:slug" element={<ServiceDetail />} />
                  <Route path="/works/:slug" element={<WorkDetail />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<BlogDetail />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                </Routes>
              </Suspense>
            </main>
            <Suspense fallback={null}>
              <Footer />
              <Chatbot />
              <FloatingActions />
            </Suspense>
          </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
