import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    category: 'Getting Started',
    items: [
      {
        question: 'What digital marketing services do you offer in Hyderabad?',
        answer: 'We offer four core services tailored for local businesses: Lead-Generating Business Websites, Local SEO & Google Visibility, Paid Ads for Faster Leads (Google & Meta), and E-Commerce Store Development. Every service is focused on one outcome — helping your business get more enquiries and customers.'
      },
      {
        question: 'How long does a typical project take?',
        answer: 'A standard business website typically takes 2–4 weeks from design approval to launch. SEO results begin showing within 60–90 days. Paid ad campaigns can generate leads within 24–72 hours of launch. We always share a clear timeline before starting any project.'
      },
      {
        question: 'Do you work with small and local businesses in Hyderabad?',
        answer: 'Yes — this is our primary focus. We work with local service businesses, shops, clinics, real estate agents, restaurants, fashion brands, and more across Hyderabad and Telangana. We understand the local market and what works here.'
      }
    ]
  },
  {
    category: 'Pricing & Engagement',
    items: [
      {
        question: 'How much does a business website cost in Hyderabad?',
        answer: 'Most local business websites in Hyderabad range from ₹15,000 to ₹80,000 depending on the number of pages, design complexity, and features required. We provide a detailed, transparent quote after a free consultation — no hidden charges.'
      },
      {
        question: 'What are your payment terms?',
        answer: 'We require 50% upfront to begin work, 25% at design approval, and the final 25% before the website goes live. This is structured to protect both parties and ensure commitment from both sides.'
      },
      {
        question: 'Do you have long-term contracts?',
        answer: 'No. We do not lock clients into long-term contracts. Monthly retainers for SEO and ads run month-to-month. You stay because the results make it worth it — not because a contract forces you to.'
      }
    ]
  },
  {
    category: 'Websites & Development',
    items: [
      {
        question: 'Will my website appear on Google after it is built?',
        answer: 'Yes — all websites we build are structured for search engine visibility from day one. We include proper page titles, meta descriptions, fast loading speeds, and mobile optimization. However, ranking for competitive keywords requires ongoing SEO work beyond just building the site.'
      },
      {
        question: 'Will my website work on mobile phones?',
        answer: 'Absolutely. All websites we build are mobile-first — designed and tested for smartphones before desktop. Over 80% of your visitors will be on mobile, so this is non-negotiable for us.'
      },
      {
        question: 'Do you provide ongoing support after launch?',
        answer: 'Yes. We offer post-launch support and maintenance packages. We remain available for fixes, updates, and improvements even after the site goes live. Many of our clients have stayed with us for 2+ years.'
      }
    ]
  },
  {
    category: 'SEO & Digital Marketing',
    items: [
      {
        question: 'How long does SEO take to show results in Hyderabad?',
        answer: 'Most local businesses in Hyderabad start seeing measurable improvements in Google rankings within 60–90 days. Consistent leads from organic traffic typically begin in 3–6 months. Unlike paid ads, SEO results compound over time and keep delivering without ongoing ad spend.'
      },
      {
        question: 'Can Google Ads work for a small local business with a limited budget?',
        answer: 'Yes — local campaigns are often the most cost-effective use of Google Ads. Even a ₹5,000–₹10,000/month budget can generate consistent enquiries when campaigns are set up correctly with local targeting, the right keywords, and a high-converting landing page.'
      }
    ]
  }
];

import SEO from '../components/SEO';

const FAQPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="Frequently Asked Questions | Digital Vint Hyderabad"
        description="Answers to common questions about Digital Vint's digital marketing, web design, SEO, and Google Ads services in Hyderabad. No jargon, just straight answers."
        keywords="digital marketing agency FAQ hyderabad, web design cost hyderabad, SEO results timeline, google ads budget local business"
      />
      {/* FAQPage Schema — AI and Google extract Q&As for featured snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': faqs.flatMap(cat => cat.items.map(item => ({
              '@type': 'Question',
              'name': item.question,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': item.answer
              }
            })))
          })
        }}
      />
      <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back Home
        </button>

        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Frequently Asked <span className="text-brand-blue">Questions</span>
          </h1>
          <p className="text-lg text-white/60">
            Find answers to common questions about our services, process, and pricing.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-16">
          {faqs.map((category, index) => (
            <div key={index}>
              <h2 className="text-2xl font-display font-bold text-white mb-6 pb-2 border-b border-white/10">
                {category.category}
              </h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {category.items.map((faq, itemIndex) => (
                  <AccordionItem 
                    key={itemIndex} 
                    value={`item-${index}-${itemIndex}`}
                    className="bg-white/5 border border-white/10 rounded-xl px-6 data-[state=open]:border-brand-blue/30 transition-colors"
                  >
                    <AccordionTrigger className="text-left text-lg font-medium text-white hover:text-brand-blue-light transition-colors py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-white/60 pb-6 text-base leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;
