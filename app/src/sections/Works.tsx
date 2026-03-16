import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const Works = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const projects = [
    {
      id: 1,
      title: 'Zaid Book Depot',
      category: 'E-Commerce',
      description: 'We built a user-friendly eCommerce website for Zaid Book Depot, an online bookstore offering a wide range of academic and general books. The platform ensures smooth browsing, easy checkout, and a seamless shopping experience.',
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1200&q=80',
      tags: ['Shopify', 'E-Commerce', 'UI/UX'],
      stats: { traffic: '+150%', conversion: '+85%' },
      link: '#',
    },
    {
      id: 2,
      title: 'The Observer Post',
      category: 'News Portal',
      description: 'We developed a clean and fast-loading news website for The Observer Post, ensuring easy navigation and real-time content updates for a seamless reading experience.',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80',
      tags: ['WordPress', 'Custom CMS', 'SEO'],
      stats: { traffic: '+200%', engagement: '+120%' },
      link: '#',
    },
    {
      id: 3,
      title: 'Treasure Jewelry',
      category: 'E-Commerce',
      description: 'We built an elegant and responsive website for Treasure, a jewelry brand, highlighting their collections with stunning visuals and a smooth shopping experience.',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=80',
      tags: ['React', 'E-Commerce', '3D Configurator'],
      stats: { sales: '+180%', bounce: '-40%' },
      link: '#',
    },
    {
      id: 4,
      title: 'Agha Perfumes',
      category: 'Brand Website',
      description: 'Digital Vint delivered a beautiful, responsive website for this tech company. It is fast, clean, and represents their brand perfectly.',
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200&q=80',
      tags: ['Web Design', 'Branding', 'Animation'],
      stats: { leads: '+250%', load: '0.8s' },
      link: '#',
    },
    {
      id: 5,
      title: 'Psyke Tech',
      category: 'Corporate',
      description: 'From design to deployment, everything was smooth. The website looks stunning and functions flawlessly. Great job!',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
      tags: ['Next.js', 'SaaS', 'Dashboard'],
      stats: { signups: '+300%', retention: '+90%' },
      link: '#',
    },
    {
      id: 6,
      title: 'Based Matrimony',
      category: 'Web Application',
      description: 'The team brought our vision to life with a vibrant and user-focused website. Excellent design sense and execution.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
      tags: ['React', 'Node.js', 'Real-time'],
      stats: { users: '+500%', matches: '+400%' },
      link: '#',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.works-heading',
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

      // Project cards animation
      gsap.fromTo(
        '.project-card',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-brand-black overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-blue/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-blue-light/5 blur-3xl" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="works-heading flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-medium mb-4">
              Our Portfolio
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
              Our Works
            </h2>
            <p className="text-white/60 text-lg max-w-xl">
              Made to stand out. Explore our latest projects and see how we have helped businesses transform their digital presence.
            </p>
          </div>
          <button className="flex items-center gap-2 text-brand-blue hover:text-brand-blue-light font-medium group self-start md:self-auto">
            View All Projects
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card group relative rounded-2xl overflow-hidden cursor-pointer ${
                index === 0 || index === 3 ? 'md:row-span-2' : ''
              }`}
              onClick={() => setSelectedProject(project)}
            >
              {/* Image Container */}
              <div
                className={`relative overflow-hidden ${
                  index === 0 || index === 3 ? 'h-[500px] md:h-[600px]' : 'h-[300px] md:h-[350px]'
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* RGB Split Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-red-500/10 mix-blend-screen translate-x-1" />
                  <div className="absolute inset-0 bg-blue-500/10 mix-blend-screen -translate-x-1" />
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                {/* Category */}
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-xs font-medium mb-3">
                  {project.category}
                </span>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-display font-semibold text-white mb-2 group-hover:text-brand-blue transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                  {project.tags.map((tag, tIndex) => (
                    <span
                      key={tIndex}
                      className="px-2 py-0.5 rounded bg-white/5 text-white/50 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Project Button */}
                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl bg-brand-darker border-white/10 text-white max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-6">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-darker to-transparent" />
              </div>
              
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full bg-brand-blue/20 text-brand-blue text-sm">
                    {selectedProject.category}
                  </span>
                </div>
                <DialogTitle className="text-2xl md:text-3xl font-display font-bold text-white">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-white/60 text-base">
                  {selectedProject.description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(selectedProject.stats).map(([key, value]) => (
                    <div key={key} className="p-4 rounded-xl bg-white/5">
                      <div className="text-2xl font-display font-bold text-brand-blue">
                        {value}
                      </div>
                      <div className="text-white/50 text-sm capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div>
                  <h4 className="text-white font-medium mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-light text-white font-medium transition-colors flex items-center justify-center gap-2">
                  View Live Project
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Works;
