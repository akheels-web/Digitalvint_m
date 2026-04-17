import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ArrowRight, ChevronDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO from '../components/SEO';
import { client } from '../lib/sanityClient';

// Minimal FAQ accordion component — no extra dependency
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-white font-medium text-sm md:text-base leading-snug">{question}</span>
        <ChevronDown className={`w-5 h-5 text-white/40 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-brand-blue' : ''}`} />
      </button>
      {open && (
        <div className="px-6 pb-5 text-white/60 text-sm md:text-base leading-relaxed border-t border-white/5 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
}

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null);
  const [relatedServices, setRelatedServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchServiceData = async () => {
      setIsLoading(true);
      try {
        const query = `*[_type == "service" && slug.current == $slug][0]`;
        const data = await client.fetch(query, { slug });
        setService(data);

        // Fetch related services (3 other services)
        const relatedQuery = `*[_type == "service" && slug.current != $slug][0...3]`;
        const relatedData = await client.fetch(relatedQuery, { slug });
        setRelatedServices(relatedData);
      } catch (err) {
        console.error('Error fetching service detail:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServiceData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 flex justify-center bg-brand-black">
        <Loader2 className="w-10 h-10 text-brand-blue animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-white bg-brand-black">
        <h1 className="text-4xl font-display font-bold mb-4">Service Not Found</h1>
        <Button onClick={() => navigate('/')} className="bg-gradient-to-r from-brand-blue to-purple-600 hover:from-brand-blue-light hover:to-purple-500 text-white">
          Return Home
        </Button>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${service.title} Services in Hyderabad | Digital Vint`}
        description={service.description}
        keywords={`${service.title.toLowerCase()}, digital marketing hyderabad, ${service.title.toLowerCase()} hyderabad, digital vint services, best ${service.title.toLowerCase()} company telangana`}
      />

      <div className="pt-24 pb-20 min-h-screen bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        
          {/* Back Button */}
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-12 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-medium mb-4">
                {service.number} — Service
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
                {service.title}
              </h1>
              <p className="text-lg text-white/60 leading-relaxed mb-8">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => navigate('/#contact')} className="bg-gradient-to-r from-brand-blue to-purple-600 hover:from-brand-blue-light hover:to-purple-500 text-white px-8 py-6 rounded-full text-lg shadow-glow">
                  Get a Free Quote
                </Button>
                <Button onClick={() => navigate('/#process')} variant="outline" className="border-white/20 text-white bg-white/5 hover:bg-white/10 px-8 py-6 rounded-full text-lg">
                  See Our Process
                </Button>
              </div>
            </div>
            <div className="relative aspect-video lg:aspect-square rounded-3xl overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 to-purple-600/10 mix-blend-overlay z-10" />
              <img 
                src={service.imageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'} 
                alt={`${service.title} services in Hyderabad - Digital Vint`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-24">
            <h2 className="text-3xl font-display font-bold text-white mb-4">What's Included</h2>
            <p className="text-white/50 mb-10 max-w-2xl">Every engagement includes these core deliverables, tailored to your specific business needs and goals.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {service.features?.map((feature: any, idx: number) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-start gap-3 hover:border-brand-blue/30 hover:bg-white/[0.07] transition-all duration-300 group">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-white/80 text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Long Content (SEO-rich) */}
          {service.longContent && (
            <div className="mb-24 max-w-4xl">
              <article
                className="blog-article"
                dangerouslySetInnerHTML={{ __html: service.longContent }}
              />
            </div>
          )}

          {/* FAQ Section */}
          {service.faqs && service.faqs.length > 0 && (
            <div className="mb-24 max-w-4xl">
              {/* FAQPage Schema — injected for this service */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    'mainEntity': service.faqs.map((faq: any) => ({
                      '@type': 'Question',
                      'name': faq.question,
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': faq.answer
                      }
                    }))
                  })
                }}
              />
              <h2 className="text-3xl font-display font-bold text-white mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-white/50 mb-10">Common questions local businesses ask about {service.title.toLowerCase()} in Hyderabad.</p>
              <div className="space-y-4">
                {service.faqs.map((faq: any, idx: number) => (
                  <FAQItem key={idx} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="mb-24 bg-gradient-to-br from-brand-blue/10 to-purple-600/10 border border-brand-blue/20 rounded-3xl p-8 md:p-14 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Ready to Get Started with {service.title}?
            </h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto text-lg">
              Let's discuss your project requirements and create a tailored strategy for your business in Hyderabad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/#contact')} className="bg-gradient-to-r from-brand-blue to-purple-600 hover:from-brand-blue-light hover:to-purple-500 text-white px-10 py-7 rounded-full text-lg shadow-glow inline-flex items-center gap-2">
                Start Your Project
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Related Services */}
          <div>
            <h2 className="text-2xl font-display font-bold text-white mb-8">Explore More Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedServices.map((rs: any) => (
                <Link key={rs._id} to={`/services/${rs.slug?.current}`} className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-brand-blue/30 transition-all duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img src={rs.imageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80'} alt={`${rs.title} services Hyderabad`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <span className="text-brand-blue text-xs font-medium uppercase tracking-wider">{rs.number}</span>
                    <h3 className="text-white font-display font-bold text-lg mt-2 group-hover:text-brand-blue transition-colors">{rs.title}</h3>
                    <p className="text-white/50 text-sm mt-2 line-clamp-2">{rs.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ServiceDetail;
