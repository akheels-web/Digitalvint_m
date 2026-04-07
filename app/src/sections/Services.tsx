import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { servicesData as services } from '../data/services';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const [activeService, setActiveService] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.services-heading',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        '.service-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-12 md:py-16 bg-brand-black overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-brand-blue/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-brand-blue-light/5 blur-3xl" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="services-heading text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            How We Help Local Businesses grow Online
          </h2>
          <p className="text-white/60 text-lg">
            Everything we do is focused on helping businesses get online, attract customers and generate consistent leads.
          </p>
        </div>

        {/* Services Grid - Desktop Accordion */}
        <div
          ref={cardsRef}
          className="hidden lg:flex h-[600px] gap-4"
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`service-card relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-expo ${activeService === index ? 'flex-[3]' : 'flex-1'
                }`}
              onClick={() => setActiveService(index)}
              onMouseEnter={() => setActiveService(index)}
            >
              {/* Background Image */}
              <div
                className={`absolute inset-0 transition-all duration-700 ${activeService === index ? 'opacity-100' : 'opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-75'
                  }`}
              >
                <img
                  src={service.image}
                  alt={`${service.title} - Digital Marketing Services India`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/80 to-transparent" />
              </div>

              {/* Background Gradient (when collapsed) */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} mix-blend-overlay pointer-events-none transition-opacity duration-500 ${activeService === index ? 'opacity-0' : 'opacity-60'
                  }`}
              />
              <div
                className={`absolute inset-0 bg-brand-darker/80 pointer-events-none transition-opacity duration-500 ${activeService === index ? 'opacity-0' : 'opacity-100'
                  }`}
              />

              {/* Content */}
              <div className="relative h-full p-6 flex flex-col">
                {/* Number & Icon */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl font-display font-bold text-white/20">
                    {service.number}
                  </span>
                  <service.icon
                    className={`w-8 h-8 transition-colors duration-300 ${activeService === index ? 'text-brand-blue' : 'text-white/40'
                      }`}
                  />
                </div>

                {/* Title */}
                <h3
                  className={`font-display font-semibold text-white transition-all duration-500 ${activeService === index
                    ? 'text-2xl mb-4'
                    : 'text-lg writing-mode-vertical transform rotate-180'
                    }`}
                  style={
                    activeService !== index
                      ? { writingMode: 'vertical-rl' }
                      : undefined
                  }
                >
                  {service.title}
                </h3>

                {/* Expanded Content */}
                <div
                  className={`flex-1 flex flex-col transition-all duration-500 ${activeService === index
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                >
                  <p className="text-white/70 mb-6 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, fIndex) => (
                      <li
                        key={fIndex}
                        className="flex items-center gap-2 text-white/60 text-sm"
                      >
                        <Check className="w-4 h-4 text-brand-blue flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link to={`/services/${service.slug}`} className="mt-auto flex items-center gap-2 w-fit text-brand-blue hover:text-brand-blue-light font-medium group">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Services Grid - Mobile/Tablet Cards */}
        <div className="lg:hidden grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="service-card relative rounded-2xl overflow-hidden bg-brand-darker border border-white/10 hover:border-brand-blue/30 transition-all duration-300 group"
            >
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-brand-blue" />
                    </div>
                    <span className="text-3xl font-display font-bold text-white/10">
                      {service.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-white/60 text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-1.5 mb-4">
                  {service.features.slice(0, 3).map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-center gap-2 text-white/50 text-xs"
                    >
                      <Check className="w-3 h-3 text-brand-blue flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link to={`/services/${service.slug}`} className="flex items-center gap-2 w-fit text-brand-blue hover:text-brand-blue-light text-sm font-medium group/btn">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
