import { useEffect, Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../sections/Hero';
import SEO from '../components/SEO';
import InViewLazy from '../components/InViewLazy';

const Clients = lazy(() => import('../sections/Clients'));
const Services = lazy(() => import('../sections/Services'));
const MarketingFunnel = lazy(() => import('../sections/MarketingFunnel'));
const Industries = lazy(() => import('../sections/Industries'));
const Works = lazy(() => import('../sections/Works'));
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
      
      <Suspense fallback={<div className="h-40" />}>
        <InViewLazy minHeight="200px">
          <Clients />
        </InViewLazy>
        
        <InViewLazy minHeight="400px">
          <Services />
        </InViewLazy>
        
        <InViewLazy minHeight="400px">
          <MarketingFunnel />
        </InViewLazy>
        
        <InViewLazy minHeight="400px">
          <Industries />
        </InViewLazy>
        
        <InViewLazy minHeight="600px">
          <Works />
        </InViewLazy>
        
        <InViewLazy minHeight="400px">
          <Process />
        </InViewLazy>
        
        <InViewLazy minHeight="400px">
          <WhyUs />
        </InViewLazy>
        
        <InViewLazy minHeight="400px">
          <Testimonials />
        </InViewLazy>
        
        <InViewLazy minHeight="600px">
          <Contact />
        </InViewLazy>
      </Suspense>
    </>
  );
};

export default Home;
