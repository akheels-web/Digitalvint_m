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
    { name: 'Tarzee', initials: 'TZ', logo: 'https://digitalvint.com/wp-content/uploads/2025/04/43_20250411_225642_0042.webp' },
    { name: 'Zaid Book Depot', initials: 'ZB', logo: 'https://digitalvint.com/wp-content/uploads/2025/04/47_20250411_225643_0046.webp' },
    { name: 'The Observer Post', initials: 'OP', logo: 'https://digitalvint.com/wp-content/uploads/2025/04/25_20250411_225641_0024.webp' },
    { name: 'Treasure', initials: 'TR', logo: 'https://digitalvint.com/wp-content/uploads/2025/04/22_20250411_225641_0021.webp' },
    { name: 'Agha Perfumes', initials: 'AP', logo: 'https://digitalvint.com/wp-content/uploads/2025/04/3_20250411_225641_0002.webp' },
    { name: 'Psyke', initials: 'PS', logo: 'https://digitalvint.com/wp-content/uploads/2025/04/1_20250411_225641_0000.webp' },
    { name: 'Joharfa', initials: 'JF', logo: 'https://digitalvint.com/wp-content/uploads/2025/04/14_20250411_225641_0013.webp' },
    { name: 'Viluthila Maldives', initials: 'VM', logo: 'https://digitalvint.com/wp-content/uploads/2025/04/20_20250411_225641_0019.webp' },
    { name: 'Saltan', initials: 'SL', logo: 'https://digitalvint.com/wp-content/uploads/2025/04/24_20250411_225641_0023.webp' },
    { name: 'BSA Gold', initials: 'BG', logo: 'https://digitalvint.com/wp-content/uploads/2025/04/8_20250411_225641_0007.webp' },
    { name: 'Residential Ease', initials: 'RE', logo: 'https://digitalvint.com/wp-content/uploads/2025/04/5_20250411_225641_0004.webp' },
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
      <div className="relative space-y-10">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-black via-brand-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-black via-brand-black/80 to-transparent z-10 pointer-events-none" />

        {/* Row 1: Moving Left */}
        <div className="flex overflow-hidden group/marquee">
          <div className="flex animate-marquee flex-shrink-0 will-change-transform">
            {clients.map((client, index) => (
              <div key={`row1-${index}`} className="flex-shrink-0 mx-4 md:mx-8 group/logo transition-all duration-500">
                <div className="relative flex items-center justify-center h-14 md:h-16 grayscale opacity-40 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 group-hover/logo:scale-110 transition-all duration-300">
                  <img
                    src={client.logo || `https://ui-avatars.com/api/?name=${client.initials}&background=0D0D12&color=fff&size=128&font-size=0.4`}
                    alt={`${client.name} - Digital Marketing Client India`}
                    title={`${client.name} partnered with Digital Vint`}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-auto object-contain ${!client.logo ? 'rounded-full' : ''}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  {/* Subtle Glow on Hover */}
                  <div className="absolute inset-0 bg-brand-blue/20 blur-2xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500 rounded-full" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex animate-marquee flex-shrink-0 will-change-transform" aria-hidden="true">
            {clients.map((client, index) => (
              <div key={`row1-dup-${index}`} className="flex-shrink-0 mx-4 md:mx-8 group/logo transition-all duration-500">
                <div className="relative flex items-center justify-center h-14 md:h-16 grayscale opacity-40 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 group-hover/logo:scale-110 transition-all duration-300">
                  <img
                    src={client.logo || `https://ui-avatars.com/api/?name=${client.initials}&background=0D0D12&color=fff&size=128&font-size=0.4`}
                    alt={`${client.name} Logo`}
                    className={`h-full w-auto object-contain ${!client.logo ? 'rounded-full' : ''}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-brand-blue/20 blur-2xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Moving Right */}
        <div className="flex overflow-hidden group/marquee">
          <div className="flex animate-marquee-reverse flex-shrink-0 will-change-transform">
            {[...clients].reverse().map((client, index) => (
              <div key={`row2-${index}`} className="flex-shrink-0 mx-4 md:mx-8 group/logo transition-all duration-500">
                <div className="relative flex items-center justify-center h-14 md:h-16 grayscale opacity-40 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 group-hover/logo:scale-110 transition-all duration-300">
                  <img
                    src={client.logo || `https://ui-avatars.com/api/?name=${client.initials}&background=0D0D12&color=fff&size=128&font-size=0.4`}
                    alt={`${client.name} Logo`}
                    className={`h-full w-auto object-contain ${!client.logo ? 'rounded-full' : ''}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-brand-blue/20 blur-2xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500 rounded-full" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex animate-marquee-reverse flex-shrink-0 will-change-transform" aria-hidden="true">
            {[...clients].reverse().map((client, index) => (
              <div key={`row2-dup-${index}`} className="flex-shrink-0 mx-4 md:mx-8 group/logo transition-all duration-500">
                <div className="relative flex items-center justify-center h-14 md:h-16 grayscale opacity-40 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 group-hover/logo:scale-110 transition-all duration-300">
                  <img
                    src={client.logo || `https://ui-avatars.com/api/?name=${client.initials}&background=0D0D12&color=fff&size=128&font-size=0.4`}
                    alt={`${client.name} Logo`}
                    className={`h-full w-auto object-contain ${!client.logo ? 'rounded-full' : ''}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-brand-blue/20 blur-2xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500 rounded-full" />
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
