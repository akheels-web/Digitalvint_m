import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { client } from '../lib/sanityClient';

gsap.registerPlugin(ScrollTrigger);

interface ClientLogo {
  name: string;
  initials: string;
  logoUrl: string | null;
  logo?: string; // fallback mapping
}

const Clients = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [clients, setClients] = useState<ClientLogo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback Client logos if Sanity is empty
  const fallbackClients = [
    { name: 'Tarzee', initials: 'TZ', logoUrl: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/terzee.webp' },
    { name: 'Zaid Book Depot', initials: 'ZB', logoUrl: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/zaid%20book%20depot.webp' },
    { name: 'The Observer Post', initials: 'OP', logoUrl: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/the%20observer%20post.webp' },
    { name: 'Treasure', initials: 'TR', logoUrl: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/treasure.webp' },
    { name: 'Agha Perfumes', initials: 'AP', logoUrl: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/agha%20perfumes.webp' },
    { name: 'Psyke', initials: 'PS', logoUrl: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/psyke.webp' },
    { name: 'Joharfa', initials: 'JF', logoUrl: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/joharfa.webp' },
    { name: 'Viluthila Maldives', initials: 'VM', logoUrl: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/viluthila%20maldives.webp' },
    { name: 'Saltan', initials: 'SL', logoUrl: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/saltan2.webp' },
    { name: 'BSA Gold', initials: 'BG', logoUrl: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/BSA.webp' },
    { name: 'RVJ Fine Diamonds', initials: 'RVJ', logoUrl: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/rvj.webp' },
    { name: 'Residential Ease', initials: 'RE', logoUrl: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/residential%20ease.webp' },
    { name: 'Signature Retreat', initials: 'SR', logoUrl: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/signature%20retreat.webp' },
    { name: 'Chiro Nation', initials: 'CN', logoUrl: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/Chironation.webp' },
    { name: 'Pragna', initials: 'PR', logoUrl: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/pragna.webp' },
    { name: 'The Tehqeeq', initials: 'TT', logoUrl: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/The%20tehqeeq.webp' },
    { name: 'Time Square Entertainment', initials: 'TS', logoUrl: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/Time%20square%20entertainment.webp' },
    { name: 'Radhika Jewelers', initials: 'RJ', logoUrl: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/radhika%20jewellers.webp' },
    { name: 'Salamah', initials: 'SH', logoUrl: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/salamah.webp' },
    { name: 'House of Yugandhar', initials: 'HY', logoUrl: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/house%20of%20yugandhar.webp' },
    { name: 'Simple Space Architects', initials: 'SS', logoUrl: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/simple%20space%20architects.webp' },
    { name: 'Next Modest', initials: 'NM', logoUrl: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/next%20modest.webp' },
    { name: 'Proxima', initials: 'PX', logoUrl: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/proxima.webp' },
    { name: 'AI Energy Systems', initials: 'AE', logoUrl: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/Ai%20Energy%20system.webp' },
    { name: 'Sidra Collections', initials: 'SC', logoUrl: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/sidra.webp' },
  ];

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const query = '*[_type == "clientLogo" && isActive == true] | order(order asc)';
        const fetched = await client.fetch(query);
        if (fetched && fetched.length > 0) {
          setClients(fetched);
        } else {
          setClients(fallbackClients);
        }
      } catch (error) {
        console.error("Failed to load clients from sanity:", error);
        setClients(fallbackClients);
      } finally {
        setIsLoading(false);
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    
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
  }, [isLoading]);

  if (isLoading) {
    return <section className="py-10 bg-brand-black min-h-[300px]"></section>;
  }

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
            {clients.map((client: ClientLogo, index: number) => (
              <div key={`row1-${index}`} className="flex-shrink-0 mx-8 md:mx-12 group/logo transition-all duration-300">
                <div className="relative flex items-center justify-center h-12 md:h-16 transition-all duration-300">
                  <img
                    src={client.logoUrl || client.logo || `https://ui-avatars.com/api/?name=${client.initials}&background=0D0D12&color=fff&size=128&font-size=0.4`}
                    alt={`${client.name} - Digital Marketing Client India`}
                    title={`${client.name} partnership with Digital Vint`}
                    loading="eager"
                    decoding="async"
                    className={`h-full w-auto object-contain grayscale opacity-40 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 group-hover/logo:scale-110 transition-all duration-500 ${(!client.logoUrl && !client.logo) ? 'rounded-full' : ''}`}
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
            {clients.map((client: ClientLogo, index: number) => (
              <div key={`row1-dup-${index}`} className="flex-shrink-0 mx-8 md:mx-12 group/logo transition-all duration-300">
                <div className="relative flex items-center justify-center h-12 md:h-16 transition-all duration-300">
                  <img
                    src={client.logoUrl || client.logo || `https://ui-avatars.com/api/?name=${client.initials}&background=0D0D12&color=fff&size=128&font-size=0.4`}
                    alt={`${client.name} - Digital Marketing Client India`}
                    loading="eager"
                    decoding="async"
                    className={`h-full w-auto object-contain grayscale opacity-40 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 group-hover/logo:scale-110 transition-all duration-500 ${(!client.logoUrl && !client.logo) ? 'rounded-full' : ''}`}
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
            {clients.map((client: ClientLogo, index: number) => (
              <div key={`row2-${index}`} className="flex-shrink-0 mx-8 md:mx-12 group/logo transition-all duration-300">
                <div className="relative flex items-center justify-center h-12 md:h-16 transition-all duration-300">
                  <img
                    src={client.logoUrl || client.logo || `https://ui-avatars.com/api/?name=${client.initials}&background=0D0D12&color=fff&size=128&font-size=0.4`}
                    alt={`${client.name} - Trusted Client India`}
                    loading="eager"
                    decoding="async"
                    className={`h-full w-auto object-contain grayscale opacity-40 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 group-hover/logo:scale-110 transition-all duration-500 ${(!client.logoUrl && !client.logo) ? 'rounded-full' : ''}`}
                  />
                  <div className="absolute inset-0 bg-purple-500/5 blur-2xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500 rounded-full" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex animate-marquee-reverse flex-shrink-0" aria-hidden="true">
            {clients.map((client: ClientLogo, index: number) => (
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
