import { useEffect, Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../sections/Hero';
import SEO from '../components/SEO';

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
      <Suspense fallback={null}>
        <Clients />
        <Services />
        <MarketingFunnel />
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
