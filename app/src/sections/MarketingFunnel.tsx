import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Filter, Magnet, Users, Handshake, LineChart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MarketingFunnel = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const funnelSteps = [
    {
      title: 'Attract (Top of Funnel)',
      icon: Magnet,
      description: 'We drive high-intent traffic to your website using Data-Driven SEO, Google Ads, and targeted Social Media campaigns.',
      metrics: 'Traffic & Awareness',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      width: 'w-full md:w-[100%]',
    },
    {
      title: 'Engage (Middle of Funnel)',
      icon: Users,
      description: 'We capture your audience\'s interest with high-converting UI/UX design, compelling Lead Magnets, and valuable Content Marketing.',
      metrics: 'Leads & Engagement',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      width: 'w-full md:w-[85%]',
    },
    {
      title: 'Convert (Bottom of Funnel)',
      icon: Handshake,
      description: 'We turn prospects into paying customers through Retargeting Ads, automated Email Sequences, and Conversion Rate Optimization (CRO).',
      metrics: 'Sales & Revenue',
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'bg-orange-500/10',
      width: 'w-full md:w-[70%]',
    },
    {
      title: 'Scale (Post-Purchase)',
      icon: LineChart,
      description: 'We maximize Customer Lifetime Value (LTV) through loyalty loops, upselling strategies, and deploying scalable SaaS solutions.',
      metrics: 'Retention & Growth',
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
            Our Proven Growth Funnel
          </h2>
          <p className="text-white/60 text-lg">
            We don't just run ads or build websites. We craft end-to-end digital marketing funnels designed to systematically attract, convert, and scale your customer base.
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
