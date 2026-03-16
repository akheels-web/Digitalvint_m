import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, X, Sparkles, Zap, Crown, ArrowRight, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

gsap.registerPlugin(ScrollTrigger);

const Pricing = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small businesses and startups beginning their digital journey',
      monthlyPrice: 8000,
      yearlyPrice: 80000, // 2 months free
      icon: Sparkles,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      popular: false,
      features: [
        { name: 'Basic SEO Optimization', included: true, tooltip: 'On-page SEO, meta tags, and basic keyword optimization' },
        { name: '5-Page Website', included: true, tooltip: 'Responsive website with up to 5 pages' },
        { name: 'Social Media Setup (2 platforms)', included: true, tooltip: 'Facebook and Instagram business setup' },
        { name: '8 Social Media Posts/Month', included: true, tooltip: 'Custom designed posts with captions' },
        { name: 'Google Business Profile Setup', included: true, tooltip: 'Complete GMB optimization' },
        { name: 'Monthly Performance Report', included: true, tooltip: 'Detailed analytics and insights' },
        { name: 'Basic Google Ads Setup', included: true, tooltip: 'Campaign setup with ₹5K ad budget management' },
        { name: 'Email Support', included: true, tooltip: '48-hour response time' },
        { name: 'Content Creation (2 blogs)', included: false, tooltip: 'SEO-optimized blog posts' },
        { name: 'Advanced Analytics', included: false, tooltip: 'Custom dashboards and deep insights' },
        { name: 'Dedicated Account Manager', included: false, tooltip: 'Personal point of contact' },
        { name: 'Priority Support', included: false, tooltip: '24-hour response time' },
      ],
      cta: 'Get Started',
    },
    {
      id: 'growth',
      name: 'Growth',
      description: 'Ideal for growing businesses seeking to expand their digital presence',
      monthlyPrice: 18000,
      yearlyPrice: 180000, // 2 months free
      icon: Zap,
      color: 'from-brand-blue to-brand-blue-light',
      bgColor: 'bg-brand-blue/10',
      borderColor: 'border-brand-blue/50',
      popular: true,
      features: [
        { name: 'Advanced SEO (On-page + Off-page)', included: true, tooltip: 'Complete SEO with backlink building' },
        { name: '10-Page Website', included: true, tooltip: 'Responsive website with up to 10 pages' },
        { name: 'Social Media Management (4 platforms)', included: true, tooltip: 'FB, IG, LinkedIn, Twitter management' },
        { name: '16 Social Media Posts/Month', included: true, tooltip: 'Custom designed posts with captions' },
        { name: 'Google Business Profile Optimization', included: true, tooltip: 'Advanced GMB with posts and reviews' },
        { name: 'Weekly Performance Reports', included: true, tooltip: 'Detailed analytics with recommendations' },
        { name: 'Google Ads + Facebook Ads', included: true, tooltip: 'Campaign management with ₹15K ad budget' },
        { name: 'Priority Email & Chat Support', included: true, tooltip: '24-hour response time' },
        { name: 'Content Creation (4 blogs)', included: true, tooltip: 'SEO-optimized blog posts' },
        { name: 'Advanced Analytics Dashboard', included: true, tooltip: 'Real-time custom dashboards' },
        { name: 'Dedicated Account Manager', included: false, tooltip: 'Personal point of contact' },
        { name: 'Video Content Creation', included: false, tooltip: 'Short-form video content for social media' },
      ],
      cta: 'Start Growing',
    },
    {
      id: 'agency',
      name: 'Agency',
      description: 'Complete digital solution for enterprises and marketing agencies',
      monthlyPrice: 35000,
      yearlyPrice: 350000, // 2 months free
      icon: Crown,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      popular: false,
      features: [
        { name: 'Enterprise SEO (Full Suite)', included: true, tooltip: 'Complete SEO with technical audits' },
        { name: 'Unlimited Pages Website', included: true, tooltip: 'Custom web application or large website' },
        { name: 'All Social Media Platforms', included: true, tooltip: 'Management of all major platforms' },
        { name: '30+ Social Media Posts/Month', included: true, tooltip: 'Daily posts with stories and reels' },
        { name: 'Multi-location GMB Management', included: true, tooltip: 'Manage multiple business locations' },
        { name: 'Real-time Analytics & Reporting', included: true, tooltip: 'Live dashboards and weekly calls' },
        { name: 'Full PPC Management', included: true, tooltip: 'Google, FB, LinkedIn, YouTube ads with ₹50K budget' },
        { name: '24/7 Priority Support', included: true, tooltip: 'Phone, email, and chat support' },
        { name: 'Content Creation (8+ blogs)', included: true, tooltip: 'SEO-optimized content strategy' },
        { name: 'Custom Analytics & BI', included: true, tooltip: 'Business intelligence dashboards' },
        { name: 'Dedicated Account Manager', included: true, tooltip: 'Personal point of contact' },
        { name: 'Video Content & Reels', included: true, tooltip: 'Professional video content creation' },
      ],
      cta: 'Go Enterprise',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pricing-heading',
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
        '.pricing-card',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.pricing-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const scrollToContact = (planName: string) => {
    const element = document.getElementById('contact');
    if (element) {
      // Store selected plan in session storage for the contact form
      sessionStorage.setItem('selectedPlan', planName);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-brand-black overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full bg-brand-blue/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="pricing-heading text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-medium mb-4">
            Pricing Plans
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            Transparent Pricing
          </h2>
          <p className="text-white/60 text-lg">
            Choose the perfect plan for your business. All plans include our core features with no hidden fees.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span
            className={`text-sm font-medium transition-colors ${
              billingCycle === 'monthly' ? 'text-white' : 'text-white/50'
            }`}
          >
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="relative w-16 h-8 rounded-full bg-white/10 p-1 transition-colors"
          >
            <div
              className={`absolute top-1 w-6 h-6 rounded-full bg-brand-blue transition-all duration-300 ${
                billingCycle === 'yearly' ? 'left-9' : 'left-1'
              }`}
            />
          </button>
          <span
            className={`text-sm font-medium transition-colors ${
              billingCycle === 'yearly' ? 'text-white' : 'text-white/50'
            }`}
          >
            Yearly
          </span>
          {billingCycle === 'yearly' && (
            <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
              Save 17%
            </span>
          )}
        </div>

        {/* Pricing Cards */}
        <TooltipProvider>
          <div className="pricing-grid grid md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`pricing-card relative rounded-2xl overflow-hidden ${
                  plan.popular ? 'md:-mt-4 md:mb-4' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 py-2 bg-gradient-to-r from-brand-blue to-brand-blue-light text-center">
                    <span className="text-white text-sm font-medium">Most Popular</span>
                  </div>
                )}

                {/* Card Background */}
                <div
                  className={`h-full p-6 lg:p-8 rounded-2xl border ${plan.borderColor} ${plan.bgColor} backdrop-blur-sm`}
                >
                  {/* Icon & Name */}
                  <div className={`pt-${plan.popular ? '6' : '0'} mb-6`}>
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}
                    >
                      <plan.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-white/60 text-sm">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl lg:text-5xl font-display font-bold text-white">
                        {formatPrice(billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice)}
                      </span>
                      <span className="text-white/50 text-sm">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <p className="text-green-400 text-sm mt-1">
                        Save {formatPrice(plan.monthlyPrice * 2)}
                      </p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => scrollToContact(plan.name)}
                    className={`w-full mb-8 py-6 rounded-xl font-semibold transition-all duration-300 group ${
                      plan.popular
                        ? 'bg-brand-blue hover:bg-brand-blue-light text-white hover:shadow-glow'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  {/* Features */}
                  <div className="space-y-3">
                    <p className="text-white/50 text-sm font-medium mb-3">What&apos;s included:</p>
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-white/20 flex-shrink-0 mt-0.5" />
                        )}
                        <span
                          className={`text-sm ${
                            feature.included ? 'text-white/80' : 'text-white/30'
                          }`}
                        >
                          {feature.name}
                        </span>
                        {feature.tooltip && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="text-white/30 hover:text-white/50">
                                <HelpCircle className="w-4 h-4" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-brand-darker border-white/10 text-white max-w-xs">
                              <p>{feature.tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TooltipProvider>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-white/50 mb-4">
            Need a custom solution? Contact us for enterprise pricing.
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-brand-blue hover:text-brand-blue-light font-medium inline-flex items-center gap-2 group"
          >
            Contact Sales
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Plan Details Dialog */}
      <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
        <DialogContent className="max-w-2xl bg-brand-darker border-white/10 text-white">
          {selectedPlan && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedPlan.color} flex items-center justify-center`}
                  >
                    <selectedPlan.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-display font-bold text-white">
                      {selectedPlan.name} Plan
                    </DialogTitle>
                    <DialogDescription className="text-white/60">
                      {selectedPlan.description}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="mt-6">
                <p className="text-white/80 leading-relaxed">
                  Our {selectedPlan.name} plan is designed to help businesses like yours achieve their digital marketing goals.
                  With comprehensive features and dedicated support, you&apos;ll have everything you need to succeed online.
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Pricing;
