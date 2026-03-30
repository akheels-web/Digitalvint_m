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

  // Client logos
  const clients = [
    { name: 'Tarzee', initials: 'TZ', logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/terzee.webp' },
    { name: 'Zaid Book Depot', initials: 'ZB', logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/zaid%20book%20depot.webp' },
    { name: 'The Observer Post', initials: 'OP', logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/the%20observer%20post.webp' },
    { name: 'Treasure', initials: 'TR', logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/treasure.webp' },
    { name: 'Agha Perfumes', initials: 'AP', logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/agha%20perfumes.webp' },
    { name: 'Psyke', initials: 'PS', logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/psyke.webp' },
    { name: 'Joharfa', initials: 'JF', logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/joharfa.webp' },
    { name: 'Viluthila Maldives', initials: 'VM', logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/viluthila%20maldives.webp' },
    { name: 'Saltan', initials: 'SL', logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/saltan2.webp' },
    { name: 'BSA Gold', initials: 'BG', logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/BSA.webp' },
    { name: 'RVJ Fine Diamonds', initials: 'RVJ', logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/rvj.webp' },
    { name: 'Residential Ease', initials: 'RE', logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/residential%20ease.webp' },
    { name: 'Signature Retreat', initials: 'SR', logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/signature%20retreat.webp' },
    { name: 'Chiro Nation', initials: 'CN', logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/Chironation.webp' },
    { name: 'Pragna', initials: 'PR', logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/pragna.webp' },
    { name: 'The Tehqeeq', initials: 'TT', logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/The%20tehqeeq.webp' },
    { name: 'Time Square Entertainment', initials: 'TS', logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/Time%20square%20entertainment.webp' },
    { name: 'Radhika Jewelers', initials: 'RJ', logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/radhika%20jewellers.webp' },
    { name: 'Salamah', initials: 'SH', logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/salamah.webp' },
    { name: 'House of Yugandhar', initials: 'HY', logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/house%20of%20yugandhar.webp' },
    { name: 'Simple Space Architects', initials: 'SS', logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/simple%20space%20architects.webp' },
    { name: 'Next Modest', initials: 'NM', logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/next%20modest.webp' },
    { name: 'Proxima', initials: 'PX', logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/proxima.webp' },
    { name: 'AI Energy Systems', initials: 'AE', logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/Ai%20Energy%20system.webp' },
    { name: 'Sidra Collections', initials: 'SC', logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/sidra.webp' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-10 bg-brand-black overflow-hidden"
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

      {/* Infinite Marquee Rows */}
      <div className="relative space-y-12">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-black via-brand-black/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-black via-brand-black/90 to-transparent z-10 pointer-events-none" />

        {/* Row 1: Moving Left */}
        <div className="flex overflow-hidden group/marquee py-4">
          <div className="flex animate-marquee flex-shrink-0">
            {clients.map((client, index) => (
              <div key={`row1-${index}`} className="flex-shrink-0 mx-8 md:mx-12 group/logo transition-all duration-300">
                <div className="relative flex items-center justify-center h-12 md:h-16 transition-all duration-300">
                  <img
                    src={client.logo || `https://ui-avatars.com/api/?name=${client.initials}&background=0D0D12&color=fff&size=128&font-size=0.4`}
                    alt={`${client.name} - Digital Marketing Client India`}
                    title={`${client.name} partnership with Digital Vint`}
                    loading="eager"
                    decoding="async"
                    className={`h-full w-auto object-contain grayscale opacity-40 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 group-hover/logo:scale-110 transition-all duration-500 ${!client.logo ? 'rounded-full' : ''}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  {/* Subtle Glow on Hover */}
                  <div className="absolute inset-0 bg-brand-blue/5 blur-2xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500 rounded-full" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex animate-marquee flex-shrink-0" aria-hidden="true">
            {clients.map((client, index) => (
              <div key={`row1-dup-${index}`} className="flex-shrink-0 mx-8 md:mx-12 group/logo transition-all duration-300">
                <div className="relative flex items-center justify-center h-12 md:h-16 transition-all duration-300">
                  <img
                    src={client.logo || `https://ui-avatars.com/api/?name=${client.initials}&background=0D0D12&color=fff&size=128&font-size=0.4`}
                    alt={`${client.name} - Digital Marketing Client India`}
                    loading="eager"
                    decoding="async"
                    className={`h-full w-auto object-contain grayscale opacity-40 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 group-hover/logo:scale-110 transition-all duration-500 ${!client.logo ? 'rounded-full' : ''}`}
                  />
                  <div className="absolute inset-0 bg-brand-blue/5 blur-2xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Moving Right */}
        <div className="flex overflow-hidden group/marquee py-4">
          <div className="flex animate-marquee-reverse flex-shrink-0">
            {clients.map((client, index) => (
              <div key={`row2-${index}`} className="flex-shrink-0 mx-8 md:mx-12 group/logo transition-all duration-300">
                <div className="relative flex items-center justify-center h-12 md:h-16 transition-all duration-300">
                  <img
                    src={client.logo || `https://ui-avatars.com/api/?name=${client.initials}&background=0D0D12&color=fff&size=128&font-size=0.4`}
                    alt={`${client.name} - Trusted Client India`}
                    loading="eager"
                    decoding="async"
                    className={`h-full w-auto object-contain grayscale opacity-40 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 group-hover/logo:scale-110 transition-all duration-500 ${!client.logo ? 'rounded-full' : ''}`}
                  />
                  <div className="absolute inset-0 bg-purple-500/5 blur-2xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500 rounded-full" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex animate-marquee-reverse flex-shrink-0" aria-hidden="true">
            {clients.map((client, index) => (
              <div key={`row2-dup-${index}`} className="flex-shrink-0 mx-8 md:mx-12 group/logo transition-all duration-300">
                <div className="relative flex items-center justify-center h-12 md:h-16 transition-all duration-300">
                  <img
                    src={client.logo || `https://ui-avatars.com/api/?name=${client.initials}&background=0D0D12&color=fff&size=128&font-size=0.4`}
                    alt={`${client.name} - Trusted Client India`}
                    loading="eager"
                    decoding="async"
                    className={`h-full w-auto object-contain grayscale opacity-40 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 group-hover/logo:scale-110 transition-all duration-500 ${!client.logo ? 'rounded-full' : ''}`}
                  />
                  <div className="absolute inset-0 bg-purple-500/5 blur-2xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
