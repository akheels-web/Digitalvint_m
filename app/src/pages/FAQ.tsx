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
    category: 'General',
    items: [
      {
        question: 'What services do you offer?',
        answer: 'We offer a comprehensive suite of digital services including Custom UI/UX Design, Website Development, E-Commerce Solutions, Portal Development, Digital Marketing (SEO, PPC), and solid corporate branding.'
      },
      {
        question: 'How long does a typical project take?',
        answer: 'Timelines vary greatly based on complexity. A standard informational website may take 2-4 weeks, while a complex e-commerce platform or custom portal might take 8-12 weeks. We discuss timelines during our initial consultation.'
      },
      {
        question: 'Do you work with startups?',
        answer: 'Absolutely. We love working with startups to build their initial MVP, craft their digital presence from scratch, and scale their marketing efforts as they grow.'
      }
    ]
  },
  {
    category: 'Pricing & Engagement',
    items: [
      {
        question: 'How much does a website cost?',
        answer: 'Every project is unique, so we provide custom quotes based on your specific requirements, scope, and goals. Contact us for a free consultation and we will prepare a detailed proposal tailored to your business.'
      },
      {
        question: 'What are your payment terms?',
        answer: 'We typically require a 50% upfront deposit to commence work, followed by 25% at a major milestone (e.g., design approval), and the final 25% prior to launch.'
      }
    ]
  },
  {
    category: 'Development Process',
    items: [
      {
        question: 'Will my website be mobile-friendly?',
        answer: 'Yes, 100%. We take a mobile-first approach to design and development, ensuring your site looks stunning and performs flawlessly across smartphones, tablets, and desktops.'
      },
      {
        question: 'Do you provide ongoing support after launch?',
        answer: 'Yes, we offer monthly maintenance and retainer packages to ensure your website remains secure, updated, and continuously optimized for performance.'
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
        title="Frequently Asked Questions | Digital Vint"
        description="Have questions about our digital marketing, web development, or design services? Find answers to common FAQs about Digital Vint."
        keywords="digital vint faqs, web design cost in hyderabad, digital marketing questions, startup web development"
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
