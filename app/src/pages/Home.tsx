import { useEffect, Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../sections/Hero';
import Clients from '../sections/Clients';
import Services from '../sections/Services';
import Works from '../sections/Works';
import MarketingFunnel from '../sections/MarketingFunnel';
import SEO from '../components/SEO';

const Industries = lazy(() => import('../sections/Industries'));
const Process = lazy(() => import('../sections/Process'));
const WhyUs = lazy(() => import('../sections/WhyUs'));
const Testimonials = lazy(() => import('../sections/Testimonials'));
const Contact = lazy(() => import('../sections/Contact'));

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <SEO />
      <Hero />
      <Clients />
      <Services />
      <MarketingFunnel />
      <Suspense fallback={<div className="h-20" />}>
        <Industries />
        <Works />
        <Process />
        <WhyUs />
        <Testimonials />
        <Contact />
      </Suspense>
    </>
  );
};

export default Home;
