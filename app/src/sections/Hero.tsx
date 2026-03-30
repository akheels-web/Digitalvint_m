import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.fromTo(
        '.hero-bg',
        { scale: 1.2, filter: 'blur(10px)' },
        { scale: 1, filter: 'blur(0px)', duration: 1.8 }
      )
        .fromTo(
          headingRef.current,
          { y: 100, opacity: 0, rotateX: 90 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.2 },
          0.2
        )
        .fromTo(
          subheadingRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0.6
        )
        .fromTo(
          ctaRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
          0.8
        )
        .fromTo(
          statsRef.current?.children || [],
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
          1
        );

      // Scroll parallax
      gsap.to(headingRef.current, {
        y: -100,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.hero-bg', {
        y: 50,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 20,
        y: (clientY / innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { value: '7+', label: 'Years Experience' },
    { value: '213+', label: 'Projects Delivered' },
    { value: '182+', label: 'Happy Clients' },
    { value: '86+', label: 'Custom Solutions' },
  ];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-black"
    >
      {/* Background Image with Parallax */}
      <div
        className="hero-bg absolute inset-0 z-0"
        style={{
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
          alt="Digital Vint Team"
          className="w-full h-full object-cover opacity-40"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-brand-black/40 to-brand-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/80 via-transparent to-brand-black/80" />
      </div>

      {/* 3D Floating Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {/* Floating Orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-brand-blue/20 blur-3xl animate-float"
          style={{
            transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px)`,
            transition: 'transform 0.5s ease-out',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-brand-blue-light/10 blur-3xl animate-float"
          style={{
            animationDelay: '1s',
            transform: `translate(${mousePosition.x * -1.5}px, ${mousePosition.y * -1.5}px)`,
            transition: 'transform 0.5s ease-out',
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 130, 243, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 130, 243, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 w-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-20 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-white/80 text-sm font-medium">
              Trusted by 200+ Brands Since 2018
            </span>
          </div>

          {/* Main Heading */}
          <h1
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-white leading-tight mb-6 perspective-1000"
            style={{
              transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            <span className="block">Transform Your</span>
            <span className="block text-gradient">Digital Presence</span>
          </h1>

          {/* Subheading - Minimal */}
          <p
            ref={subheadingRef}
            className="text-lg sm:text-xl text-white/60 max-w-xl mx-auto mb-10 font-light"
          >
            We build high-performance websites, run ROI-focused campaigns, and craft brands that convert.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              onClick={() => scrollToSection('contact')}
              size="lg"
              className="bg-gradient-to-r from-brand-blue to-purple-600 hover:from-brand-blue-light hover:to-purple-500 text-white font-semibold px-8 py-6 rounded-full text-lg transition-all duration-300 hover:shadow-glow-lg group"
            >
              Get Free Quote
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => scrollToSection('works')}
              variant="outline"
              size="lg"
              className="border-white/20 text-white bg-white/10 hover:bg-white/20 hover:text-white px-8 py-6 rounded-full text-lg transition-all"
            >
              View Our Work
            </Button>
          </div>

          {/* Stats - Compact */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-black to-transparent z-20" />
    </section>
  );
};

export default Hero;
