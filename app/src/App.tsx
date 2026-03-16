import { useEffect, useRef } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SEO from './components/SEO';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import Clients from './sections/Clients';
import Services from './sections/Services';
import Works from './sections/Works';
import Pricing from './sections/Pricing';
import WhyUs from './sections/WhyUs';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

import './App.css';

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
      <SEO />
      <div className="relative min-h-screen bg-brand-black noise-overlay">
        <Navigation />
        <main>
          <Hero />
          <Clients />
          <Services />
          <Works />
          <Pricing />
          <WhyUs />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
