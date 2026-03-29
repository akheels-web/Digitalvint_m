import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../sections/Hero';
import Clients from '../sections/Clients';
import Services from '../sections/Services';
import Works from '../sections/Works';
import MarketingFunnel from '../sections/MarketingFunnel';
import Industries from '../sections/Industries';
import Process from '../sections/Process';
import WhyUs from '../sections/WhyUs';
import Testimonials from '../sections/Testimonials';
import Contact from '../sections/Contact';
import SEO from '../components/SEO';

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
      <Industries />
      <Works />
      <Process />
      <WhyUs />
      <Testimonials />
      <Contact />
    </>
  );
};

export default Home;
