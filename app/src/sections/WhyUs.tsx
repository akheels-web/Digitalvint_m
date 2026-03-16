import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Monitor,
  Zap,
  Settings,
  Layers,
  Users,
  Headphones,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WhyUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Monitor,
      title: 'Responsive Design',
      description: 'Flawless experiences across all devices and screen sizes. Your website looks perfect on mobile, tablet, and desktop.',
      gradient: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized code for speedy load times and smooth interactions. Core Web Vitals optimized for better rankings.',
      gradient: 'from-yellow-500/20 to-orange-500/20',
    },
    {
      icon: Settings,
      title: 'Custom Solutions',
      description: 'Tailor-made solutions to match your unique requirements. No cookie-cutter templates, every project is unique.',
      gradient: 'from-green-500/20 to-emerald-500/20',
    },
    {
      icon: Layers,
      title: 'Modern Frameworks',
      description: 'Expertise in both code and no-code frameworks. React, Next.js, WordPress, Shopify, and more.',
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      icon: Users,
      title: 'Collaborative Approach',
      description: 'We work closely with your team for seamless integration. Regular updates and transparent communication.',
      gradient: 'from-red-500/20 to-rose-500/20',
    },
    {
      icon: Headphones,
      title: 'Ongoing Support',
      description: 'Continuous maintenance and updates to keep your digital presence fresh and secure. 24/7 support available.',
      gradient: 'from-indigo-500/20 to-blue-500/20',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.whyus-heading',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards flip animation
      gsap.fromTo(
        '.feature-card',
        { rotateY: 90, opacity: 0 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardRef: HTMLDivElement | null) => {
    if (!cardRef) return;
    
    const rect = cardRef.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    cardRef.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (cardRef: HTMLDivElement | null) => {
    if (!cardRef) return;
    cardRef.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-brand-black overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-blue/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-blue-light/5 blur-3xl" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="whyus-heading text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            Why Choose Us?
          </h2>
          <p className="text-white/60 text-lg">
            We run behind results. Our focus is on delivering measurable outcomes that help your business grow.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group relative"
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              style={{ transition: 'transform 0.1s ease-out', transformStyle: 'preserve-3d' }}
            >
              <div className="relative h-full p-6 lg:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden group-hover:border-white/20 transition-colors duration-300">
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Gloss Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors duration-300">
                    <feature.icon className="w-7 h-7 text-brand-blue" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-display font-semibold text-white mb-3 group-hover:text-brand-blue transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { value: '99%', label: 'Client Retention' },
            { value: '4.9/5', label: 'Average Rating' },
            { value: '24h', label: 'Avg. Response Time' },
            { value: '100%', label: 'Project Delivery' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-brand-blue mb-1">
                {stat.value}
              </div>
              <div className="text-white/50 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
