import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ArrowRight, ChevronDown } from 'lucide-react';
import { servicesData } from '../data/services';
import { Button } from '@/components/ui/button';
import SEO from '../components/SEO';
import { useState } from 'react';

// Service-specific FAQs — AI engines pull directly from FAQ-formatted content
const serviceFaqs: Record<string, { q: string; a: string }[]> = {
  'website-designing': [
    { q: 'How much does a business website cost in Hyderabad?', a: 'The cost depends on your requirements, number of pages, and functionality needed. Most local business websites in Hyderabad range from ₹15,000 to ₹80,000. We provide a detailed, transparent quote after a free consultation — no hidden charges.' },
    { q: 'How long does it take to build a website?', a: 'A standard 5–8 page business website typically takes 2–4 weeks from design approval to launch. More complex sites with custom features can take 6–10 weeks. We always share a clear timeline upfront.' },
    { q: 'Will my website work on mobile phones?', a: 'Yes — all websites we build are mobile-first, meaning they are designed and tested for smartphones first. Over 80% of your visitors will be on mobile, so this is non-negotiable for us.' },
    { q: 'Can I update my website myself after it is built?', a: 'Yes. We build all websites with a simple content management system so you can update text, images, and blog posts yourself without needing technical knowledge. We also provide basic training.' },
    { q: 'Do you provide support after the website launches?', a: 'Yes — we offer post-launch support and maintenance packages. We remain available for fixes, updates, and improvements even after the site goes live.' },
  ],
  'seo-optimization': [
    { q: 'How long does SEO take to show results?', a: 'Most local businesses start seeing measurable improvements in Google rankings within 60–90 days. Consistent leads from organic traffic typically begin in 3–6 months. SEO is a long-term investment, but the results compound over time unlike paid ads.' },
    { q: 'What is Local SEO and why do Hyderabad businesses need it?', a: 'Local SEO ensures your business appears when someone in Hyderabad searches for your service — for example, "interior designer near me" or "best CA in Hyderabad". It includes Google Business Profile optimisation, local keyword targeting, and Google Maps ranking. If you serve local customers, Local SEO is often more valuable than broad national SEO.' },
    { q: 'Do you guarantee first page rankings on Google?', a: 'No ethical SEO agency can guarantee specific rankings — Google controls its algorithm. What we guarantee is transparent, white-hat SEO work that consistently improves your visibility. We share clear monthly reports so you can see exactly what is improving.' },
    { q: 'Can SEO help my business get more WhatsApp enquiries?', a: 'Yes. We optimise your website and Google Business Profile to drive calls, WhatsApp messages, and form enquiries directly from search results. This is especially effective for service businesses in Hyderabad.' },
  ],
  'performance-marketing': [
    { q: 'How much budget do I need to start Google Ads?', a: 'For most local businesses in Hyderabad, a starting budget of ₹5,000–₹15,000 per month is workable. Our management fees are separate. We recommend starting lean, proving ROI, and scaling. We will advise the right budget for your specific goals in our free consultation.' },
    { q: 'How quickly will I see leads from paid ads?', a: 'This is the key advantage of paid advertising — leads can start coming in within 24–72 hours of campaign launch. Unlike SEO which takes months, Google Ads and Meta Ads deliver immediate visibility and enquiries.' },
    { q: 'What is the difference between Google Ads and Facebook Ads?', a: 'Google Ads capture demand — shown to people actively searching for your service. Facebook and Instagram Ads create demand — shown to people who match your customer profile but are not actively searching. For most local service businesses, Google Ads delivers higher-intent leads, while social media ads are better for brand awareness and remarketing.' },
    { q: 'Can you run ads for a very niche local business?', a: 'Absolutely. Hyper-local campaigns are our speciality. We have run successful campaigns for jewellers, dental clinics, interior designers, fashion brands, and restaurants — all with very specific local targeting.' },
  ],
  'ecommerce-solutions': [
    { q: 'Should I use Shopify or WooCommerce for my online store?', a: 'Shopify is better if you want to launch fast with minimal technical management — it handles hosting, security, and updates for you. WooCommerce (WordPress) gives more flexibility and lower long-term costs if you have specific customisation needs. We recommend the right platform after understanding your products, volume, and budget.' },
    { q: 'Do you support UPI and Indian payment gateways?', a: 'Yes — we integrate all major Indian payment options including Razorpay (UPI, Cards, Net Banking), PhonePe, Paytm, and PayU. We also support cash on delivery flows for businesses that need them.' },
    { q: 'Can I manage my own products and inventory after launch?', a: 'Yes — you will have full control over your product catalogue, pricing, inventory, and orders through an easy admin dashboard. No technical knowledge required to add or update products.' },
    { q: 'How do I drive customers to my online store?', a: 'Building the store is step one — driving traffic is step two. We help with e-commerce SEO to rank your product pages on Google, Google Shopping campaigns, and social media advertising to bring targeted buyers to your store.' },
  ],
};


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

  
  const service = servicesData.find(s => s.slug === slug);
  const relatedServices = servicesData.filter(s => s.slug !== slug).slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-white">
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

      <div className="pt-24 pb-20 min-h-screen">
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
                src={service.image} 
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
              {service.features.map((feature, idx) => (
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

          {/* FAQ Section — drives FAQPage JSON-LD for AI + Google rich results */}
          {serviceFaqs[service.slug] && (
            <div className="mb-24 max-w-4xl">
              {/* FAQPage Schema — injected for this service */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    'mainEntity': serviceFaqs[service.slug].map(faq => ({
                      '@type': 'Question',
                      'name': faq.q,
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': faq.a
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
                {serviceFaqs[service.slug].map((faq, idx) => (
                  <FAQItem key={idx} question={faq.q} answer={faq.a} />
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
              {relatedServices.map(rs => (
                <Link key={rs.id} to={`/services/${rs.slug}`} className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-brand-blue/30 transition-all duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img src={rs.image} alt={`${rs.title} services Hyderabad`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
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
