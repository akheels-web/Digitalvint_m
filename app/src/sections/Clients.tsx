import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Clients = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.clients-heading',
        { y: 30, opacity: 0 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Client logos as SVG components
  const clients = [
    { name: 'Zaid Book Depot', initials: 'ZB' },
    { name: 'The Observer Post', initials: 'OP' },
    { name: 'Treasure', initials: 'TR' },
    { name: 'Agha Perfumes', initials: 'AP' },
    { name: 'Psyke', initials: 'PS' },
    { name: 'Based Matrimony', initials: 'BM' },
    { name: 'Hyderabad Meri Jaan', initials: 'HM' },
    { name: 'Crown Interiors', initials: 'CI' },
    { name: 'BSA Gold', initials: 'BG' },
    { name: 'Dr. Manti Nath', initials: 'MN' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 bg-brand-black border-y border-white/5 overflow-hidden"
    >
      {/* Section Heading */}
      <div className="clients-heading text-center mb-12 px-4">
        <p className="text-white/50 text-sm uppercase tracking-widest mb-2">
          Trusted by Industry Leaders
        </p>
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-white">
          Trusted by Top Brands Since 2018
        </h2>
      </div>

      {/* Infinite Marquee */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-black to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee">
            {[...clients, ...clients].map((client, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-8 group"
              >
                <div className="flex items-center gap-4 px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-blue/30 transition-all duration-300 cursor-default">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-blue/20 to-brand-blue-light/20 flex items-center justify-center">
                    <span className="text-brand-blue font-display font-bold text-lg">
                      {client.initials}
                    </span>
                  </div>
                  <span className="text-white/70 font-medium whitespace-nowrap group-hover:text-white transition-colors">
                    {client.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex animate-marquee" aria-hidden="true">
            {[...clients, ...clients].map((client, index) => (
              <div
                key={`duplicate-${index}`}
                className="flex-shrink-0 mx-8 group"
              >
                <div className="flex items-center gap-4 px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-blue/30 transition-all duration-300 cursor-default">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-blue/20 to-brand-blue-light/20 flex items-center justify-center">
                    <span className="text-brand-blue font-display font-bold text-lg">
                      {client.initials}
                    </span>
                  </div>
                  <span className="text-white/70 font-medium whitespace-nowrap group-hover:text-white transition-colors">
                    {client.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="mt-16 px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '100%', label: 'Client Satisfaction' },
            { value: '50+', label: '5-Star Reviews' },
            { value: '24/7', label: 'Support Available' },
            { value: '15+', label: 'Industries Served' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-display font-bold text-brand-blue mb-1">
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

export default Clients;
