import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Filter, Magnet, Users, Handshake, LineChart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MarketingFunnel = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const funnelSteps = [
    {
      title: 'Attract (Awareness)',
      icon: Magnet,
      description: 'We bring the right people to your website through search visibility, Google Maps Presence and targeted campaigns - so you are found when customers are actively looking.',
      metrics: 'Qualified traffic',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      width: 'w-full md:w-[100%]',
    },
    {
      title: 'Engage (Trust & Interest)',
      icon: Users,
      description: 'Once they land, we guide them with clear messaging, fast pages, strong design and proof(reviews, work, results) - so they stay, explore and take action.',
      metrics: 'Engagement + Intent',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      width: 'w-full md:w-[85%]',
    },
    {
      title: 'Convert (Enquiries & Sales)',
      icon: Handshake,
      description: 'We turn visitors into enquiries with high-converting layouts, strong calls-to-action, WhatsApp/call flows and frictionless forms - so you get more calls, messages and bookings.',
      metrics: 'Leads + Conversions',
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'bg-orange-500/10',
      width: 'w-full md:w-[70%]',
    },
    {
      title: 'Retain (Repeat Customers & Referrals)',
      icon: LineChart,
      description: 'After the first enquiry, we help you follow up and stay top-of-mind using simple automation, remarketing and review generation - bringing repeat customers and referrals over time.',
      metrics: 'Retention + Growth',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      width: 'w-full md:w-[55%]',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.funnel-heading',
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

      // Funnel steps animation
      gsap.fromTo(
        '.funnel-step',
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.funnel-container',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="funnel"
      ref={sectionRef}
      className="relative py-12 md:py-16 bg-brand-black overflow-hidden border-t border-white/5"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-blue/5 blur-[100px]" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Heading */}
        <div className="funnel-heading text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-medium mb-4">
            <Filter className="w-4 h-4" /> Strategy & Funnels
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            Our Growth System (Built to Generate Leads)
          </h2>
          <p className="text-white/60 text-lg">
            We don't just build websites or run ads. We build a complete journey that attracts the right audience, earns trust and converts interest into enquiries and sales
          </p>
        </div>

        {/* Funnel Container */}
        <div className="funnel-container max-w-4xl mx-auto flex flex-col items-center gap-4">
          {funnelSteps.map((step, index) => (
            <div
              key={index}
              className={`funnel-step group relative ${step.width} p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden hover:border-white/20 transition-all duration-300 mx-auto text-center md:text-left`}
            >
              {/* Gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`} />

              <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Icon */}
                <div className={`flex-shrink-0 w-16 h-16 rounded-2xl ${step.bgColor} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <h3 className="text-2xl font-display font-bold text-white">
                      {step.title}
                    </h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20 bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                      Goal: {step.metrics}
                    </span>
                  </div>
                  <p className="text-white/60 leading-relaxed text-sm md:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketingFunnel;
