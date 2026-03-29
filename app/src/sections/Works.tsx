import { useEffect, useCallback, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { worksData } from '../data/works';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const Works = () => {
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.works-heading',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: '#works',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="works" className="relative py-24 bg-brand-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-blue/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-blue-light/5 blur-3xl" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-12 xl:px-20 max-w-[100vw]">
        {/* Section Header */}
        <div className="works-heading flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-medium mb-4">
              Featured Work
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Our Latest <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-white/60 text-lg">
              Explore our portfolio of successful digital marketing campaigns, high-performance websites, and e-commerce solutions.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-brand-blue hover:border-brand-blue transition-colors group"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-brand-blue hover:border-brand-blue transition-colors group"
              aria-label="Next project"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Slider Container */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {worksData.map((project, index) => (
                <div 
                  key={project.id} 
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_85%] lg:flex-[0_0_90%] pl-4 md:pl-8 first:pl-0"
                >
                  <div className={`transition-all duration-500 ease-out grid lg:grid-cols-2 gap-8 items-center bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 ${selectedIndex === index ? 'opacity-100 scale-100' : 'opacity-40 scale-[0.98]'}`}>
                    
                    {/* Project Info */}
                    <div className="order-2 lg:order-1 space-y-8">
                      <div className="flex items-center gap-4">
                        {project.logo && (
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-brand-black border border-white/10 flex items-center justify-center shadow-lg">
                            <img src={project.logo} alt={`${project.title} logo`} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div>
                          <span className="text-brand-blue text-sm font-medium tracking-wider uppercase mb-1 block">
                            {project.category}
                          </span>
                          <h3 className="text-3xl font-display font-bold text-white">
                            {project.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-lg text-white/70 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Display a key stat if available */}
                      {project.stats && (
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(project.stats).slice(0, 2).map(([key, value]) => (
                            <div key={key} className="bg-white/5 rounded-xl p-4 border border-white/5">
                              <div className="text-2xl font-bold text-white mb-1">{value}</div>
                              <div className="text-sm text-white/50 capitalize">{key}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm hover:text-white transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Button
                        onClick={() => navigate(`/works/${project.slug}`)}
                        className="bg-transparent hover:bg-white/10 text-white border border-white/20 font-medium px-8 py-6 rounded-full transition-all duration-300 group inline-flex items-center gap-2"
                      >
                        Read Case Study
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>

                    {/* Laptop Mockup Image */}
                    <div className="order-1 lg:order-2 perspective-1000">
                      <div className="relative w-full max-w-2xl mx-auto transform transition-transform duration-700 hover:scale-[1.02] hover:rotate-y-[-5deg]">
                        {/* Laptop Frame */}
                        <div className="relative rounded-[2rem] bg-gray-900 border-[8px] md:border-[12px] border-gray-800 shadow-2xl aspect-[16/10] overflow-hidden">
                          {/* Screen Content */}
                          <div className="absolute inset-0 bg-brand-darker">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover object-top"
                              loading="lazy"
                            />
                            {/* Inner Screen Shadow/Glass Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                          </div>
                        </div>
                        {/* Laptop Base Base */}
                        <div className="relative h-4 md:h-6 bg-gray-300 rounded-b-[2rem] w-[110%] -ml-[5%] shadow-xl flex items-center justify-center">
                          {/* Trackpad Indent */}
                          <div className="w-1/4 h-1 md:h-2 bg-gray-400 rounded-b-md" />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Slider Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {worksData.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi && emblaApi.scrollTo(index)}
                className={`transition-all duration-300 rounded-full h-2 ${
                  selectedIndex === index 
                    ? 'w-8 bg-brand-blue' 
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
           <Button
              className="bg-gradient-to-r from-brand-blue to-purple-600 hover:from-brand-blue-light hover:to-purple-500 text-white font-medium px-8 py-6 rounded-full text-lg shadow-glow transition-all duration-300 hover:scale-105"
              onClick={() => navigate('/#works')} // Replace with actual works page if exists, or contact
            >
              View All Projects
              <ExternalLink className="ml-2 w-5 h-5" />
           </Button>
        </div>
      </div>
    </section>
  );
};

export default Works;
