import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Pill, ShoppingCart, Stethoscope, Cloud, Coffee, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Industries = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const industries = [
    {
      name: 'Service-Based Businesses',
      icon: Pill,
      description: 'Builders, consultants, agencies, repair services and professionals who rely on calls, messages and enquiries to grow.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      name: 'Retail & Local Brands',
      icon: Coffee,
      description: 'Shops, showrooms and consumer brands looking to improve visibility, attract customers and drive more walk-ins or enquiries.'
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      name: 'Real Estate & Construction',
      icon: Building2,
      description: 'Builders and real estate firms that depend on qualified leads, project visibility and strong brand credebility.',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      name: 'E-Commerce & D2C',
      icon: ShoppingCart,
      description: 'Businesses ready to sell products online through fast, reliable and conversion-focused websites.',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
    },
    {
      name: 'SaaS & Technology',
      icon: Cloud,
      description: 'B2B lead generation, scalable web applications, and inbound content marketing for tech startups and enterprises.',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-500/10',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.industries-heading',
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

      // Cards flip animation
      gsap.fromTo(
        '.industry-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.industries-grid',
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
      id="industries"
      ref={sectionRef}
      className="relative py-12 md:py-16 bg-brand-black overflow-hidden border-t border-white/5"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-12 xl:px-20 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="industries-heading text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            <ShieldCheck className="w-4 h-4" /> Specialized Expertise
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            Businesses We Help Grow Online
          </h2>
          <p className="text-white/60 text-lg">
            We work with businesses that depend on visibility, trust and steady enquiries to grow.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="industries-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="industry-card group relative p-8 rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300"
            >
              {/* Hover Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`} />

              <div className="relative">
                {/* Icon Wrapper */}
                <div className={`w-14 h-14 rounded-xl ${industry.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300`}>
                  <industry.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-bold text-white mb-3">
                  {industry.name}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {industry.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
