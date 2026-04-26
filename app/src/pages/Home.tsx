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
      const hash = location.hash.substring(1);
      
      const scrollToElement = (retryCount = 0) => {
        const element = document.getElementById(hash);
        if (element) {
          // Get position
          const rect = element.getBoundingClientRect();
          const topPosition = rect.top + window.scrollY;
          
          // If the element is still at the top or we haven't reached a reasonable height yet,
          // it might still be loading. Wait and retry up to 5 times.
          if (topPosition < 100 && retryCount < 5) {
            setTimeout(() => scrollToElement(retryCount + 1), 200);
            return;
          }

          window.scrollTo({
            top: topPosition - 80, // Offset for sticky header
            behavior: 'smooth'
          });
        } else if (retryCount < 5) {
          setTimeout(() => scrollToElement(retryCount + 1), 200);
        }
      };

      // Initial delay to let the basic layout render
      setTimeout(() => scrollToElement(), 300);
    }
  }, [location.hash]);

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
