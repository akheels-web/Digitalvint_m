import { useEffect, useRef } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Analytics } from '@vercel/analytics/react';

import SEO from './components/SEO';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import WorkDetail from './pages/WorkDetail';
import BlogPage from './pages/Blog';
import FAQPage from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import BlogDetail from './pages/BlogDetail';
import Footer from './sections/Footer';
import PromoBanner from './components/PromoBanner';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Chatbot from './components/Chatbot';
import FloatingActions from './components/FloatingActions';

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
          <PromoBanner />
          <main>
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
          </main>
          <Footer />
          <Chatbot />
          <FloatingActions />
        </div>
        <Analytics />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
