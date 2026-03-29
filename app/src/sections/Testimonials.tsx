import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: 'Dr. Manti Nath',
      role: 'Founder',
      company: 'Healthcare Startup',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
      content: 'Digital Vint built us a sleek, professional website that perfectly aligned with our brand. Their attention to detail and communication was top-notch. Highly recommended!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Shalini Dutta',
      role: 'Founder',
      company: 'Fashion Brand',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
      content: 'Our website redesign improved user engagement and conversions. The team was responsive, skilled, and understood our business goals clearly.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Sufiyan Khan',
      role: 'Founder',
      company: 'Agha Perfumes',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
      content: 'Digital Vint delivered a beautiful, responsive website for our tech company. It is fast, clean, and represents our brand perfectly.',
      rating: 5,
    },
    {
      id: 4,
      name: 'Adeed Ahmed',
      role: 'Founder',
      company: 'Psyke Tech',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      content: 'From design to deployment, everything was smooth. The website looks stunning and functions flawlessly. Great job!',
      rating: 5,
    },
    {
      id: 5,
      name: 'Usama Hazari',
      role: 'Founder',
      company: 'Based Matrimony',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80',
      content: 'The team brought our vision to life with a vibrant and user-focused website. Excellent design sense and execution.',
      rating: 5,
    },
    {
      id: 6,
      name: 'Sarfaraz Ali',
      role: 'Founder/Creator',
      company: 'Hyderabad Meri Jaan',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
      content: 'Our new portfolio website looks elegant and professional. It has helped us gain more clients online. Very satisfied!',
      rating: 5,
    },
    {
      id: 7,
      name: 'Shaik Azhar',
      role: 'Founder',
      company: 'Crown Interiors',
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&q=80',
      content: 'They crafted a premium website that showcases our products beautifully. The design and user experience are top class!',
      rating: 5,
    },
    {
      id: 8,
      name: 'Habeeb Hasan',
      role: 'Founder',
      company: 'BSA Gold & Diamonds',
      image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&q=80',
      content: 'Digital Vint built us a powerful website with integrated booking and contact forms. It is mobile-friendly and looks fantastic. We have seen a spike in inquiries since launch!',
      rating: 5,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonials-heading',
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

      gsap.fromTo(
        '.testimonial-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.testimonials-container',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAnimating, testimonials.length]);

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = -1; i <= 1; i++) {
      const index = (activeIndex + i + testimonials.length) % testimonials.length;
      visible.push({ ...testimonials[index], position: i });
    }
    return visible;
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-brand-black overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-brand-blue/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-brand-blue-light/5 blur-3xl" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="testimonials-heading text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            First Impression, Our Clients
          </h2>
          <p className="text-white/60 text-lg">
            Do not just take our word for it. Here is what our clients have to say about working with us.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="testimonials-container relative max-w-6xl mx-auto">
          {/* Desktop Carousel */}
          <div className="hidden md:block relative h-[400px]">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className={`testimonial-card absolute top-1/2 left-1/2 w-full max-w-2xl transition-all duration-500 ease-expo ${
                  testimonial.position === 0
                    ? 'opacity-100 scale-100 z-20 translate-x-[-50%] translate-y-[-50%]'
                    : testimonial.position === -1
                    ? 'opacity-40 scale-90 z-10 translate-x-[-120%] translate-y-[-50%]'
                    : 'opacity-40 scale-90 z-10 translate-x-[20%] translate-y-[-50%]'
                }`}
              >
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  {/* Quote Icon */}
                  <Quote className="w-10 h-10 text-brand-blue/30 mb-4" />

                  {/* Content */}
                  <p className="text-white/80 text-lg leading-relaxed mb-6">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-brand-blue/30"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-white/50 text-sm">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="testimonial-card p-6 rounded-2xl bg-white/5 border border-white/10">
              <Quote className="w-8 h-8 text-brand-blue/30 mb-4" />
              <p className="text-white/80 text-base leading-relaxed mb-4">
                &ldquo;{testimonials[activeIndex].content}&rdquo;
              </p>
              <div className="flex gap-1 mb-4">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={testimonials[activeIndex].image}
                  alt={testimonials[activeIndex].name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-blue/30"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-white font-semibold text-sm">{testimonials[activeIndex].name}</h4>
                  <p className="text-white/50 text-xs">
                    {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrev}
              className="w-12 h-12 rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setActiveIndex(index);
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-8 bg-brand-blue'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="w-12 h-12 rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20 transition-all"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </Button>
          </div>
        </div>

        {/* Client Logos Grid */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto opacity-50">
          {testimonials.slice(0, 4).map((testimonial, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-brand-blue/20 flex items-center justify-center mx-auto mb-2">
                  <span className="text-brand-blue font-display font-bold text-sm">
                    {testimonial.company.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <span className="text-white/50 text-xs">{testimonial.company}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
