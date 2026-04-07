import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Lightbulb, Rocket, TrendingUp, ArrowRight, CheckCircle2, Mail, Phone, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const Process = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [auditEmail, setAuditEmail] = useState('');
  const [auditWebsite, setAuditWebsite] = useState('');
  const [auditSubmitted, setAuditSubmitted] = useState(false);

  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Discovery & Audit',
      description: 'We start by understanding your business, your customers and whats currently holding back your online performance. This helps us find quick wins and avoid guesswork.',
      details: ['Competitor analysis', 'Website health audit', 'Keyword research', 'Market positioning'],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      number: '02',
      icon: Lightbulb,
      title: 'Strategy & Planning',
      description: 'Based on the insights, we create a clear plan focused on your goals - whether thats more enquiries calls, online sales or visibility.',
      details: ['Custom roadmap', 'Channel selection', 'Budget allocation', 'KPI definition'],
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      number: '03',
      icon: Rocket,
      title: 'Execution & Launch',
      description: 'Our team designs, builds and launches fast, conversion-focused websites and campaigns - ensuring everything is tested, responsive and ready to perform from day one.',
      details: ['Design & development', 'Content creation', 'Campaign setup', 'Quality assurance'],
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      number: '04',
      icon: TrendingUp,
      title: 'Growth & Improvements',
      description: 'Once things are live, we track whats working, make improvements and focus on increasing enquiries and results over time.',
      details: ['Performance tracking', 'A/B testing', 'Monthly reporting', 'Continuous scaling'],
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.process-heading',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.process-step',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.process-grid',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.audit-cta',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: '.audit-cta',
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Instantly show the success message so the user feels zero lag!
    setAuditSubmitted(true);
    
    // Fire the request to Google Sheets in the background (fire-and-forget)
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbymXtTfHMJrQoz2nxoDaz9tCdNguciL75bPTxXSzuOhqfskYQE6o-vgpYxlRe0tlwax/exec';
    
    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        name: 'Not Provided',
        email: auditEmail,
        phone: '',
        company: '',
        service: 'SEO Audit Request', // Labels it uniquely in Google Sheets
        message: `Website to audit: ${auditWebsite}`,
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      })
    }).catch(error => {
      console.error('Audit submit error:', error);
    });
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-12 md:py-16 bg-brand-black overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full bg-brand-blue/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-12 xl:px-20">

        {/* ===== SECTION 1: HOW WE WORK ===== */}
        <div className="process-heading text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-medium mb-4">
            Our Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            How We Deliver Results
          </h2>
          <p className="text-white/60 text-lg">
            A simple, proven process that helps businesses get more visibility, enquiries and consistent growth.
          </p>
        </div>

        {/* Process Steps */}
        <div className="process-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-24">
          {steps.map((step, index) => (
            <div key={index} className="process-step group relative">
              <div className="relative h-full p-6 lg:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden hover:border-white/20 transition-all duration-300">
                {/* Step number watermark */}
                <div className="absolute top-4 right-4 text-6xl font-display font-bold text-white/[0.03] select-none">
                  {step.number}
                </div>

                {/* Gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500`} />

                {/* Icon */}
                <div className={`relative w-14 h-14 rounded-xl ${step.bgColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>

                {/* Step Label */}
                <div className="relative">
                  <span className={`text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-2 block`}>
                    STEP {step.number}
                  </span>
                  <h3 className="text-xl font-display font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-5">
                    {step.description}
                  </p>

                  {/* Detail bullets */}
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-white/50">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Connector arrow (between cards on desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                  <ArrowRight className="w-6 h-6 text-white/15" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ===== SECTION 2: FREE SEO AUDIT CTA ===== */}
        <div className="audit-cta relative rounded-3xl overflow-hidden max-w-5xl mx-auto">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-purple-600/15 to-pink-500/10" />
          <div className="absolute inset-0 border border-brand-blue/20 rounded-3xl" />

          {/* Decorative orbs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-brand-blue/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative p-8 md:p-14">
            <div className="grid lg:grid-cols-2 gap-10 items-center">

              {/* Left Content */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wider">
                    100% Free — No Strings Attached
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 leading-tight">
                  Get a Free<br />
                  <span className="bg-gradient-to-r from-brand-blue to-purple-500 bg-clip-text text-transparent">
                    Website Performance Audit
                  </span>
                </h2>
                <p className="text-white/60 mb-6 leading-relaxed">
                  Discover what's stopping your website from bringing enquiries, calls and customers - and how to fix it.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    'Website Speed & user experience issues',
                    'Visibility gaps affecting customer discovery',
                    'Technical issues impacting enquiries & conversions',
                    'Competitor comparison to find growth opportunities',
                    'Local search readiness',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/70 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Form */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md">
                {!auditSubmitted ? (
                  <form onSubmit={handleAuditSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="audit-website" className="text-white/80 text-sm font-medium mb-1.5 block">
                        Website URL
                      </label>
                      <input
                        id="audit-website"
                        name="url"
                        type="url"
                        placeholder="https://yourwebsite.com"
                        autoComplete="url"
                        value={auditWebsite}
                        onChange={(e) => setAuditWebsite(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="audit-email" className="text-white/80 text-sm font-medium mb-1.5 block">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                        <input
                          id="audit-email"
                          name="email"
                          type="email"
                          placeholder="you@company.com"
                          autoComplete="email"
                          value={auditEmail}
                          onChange={(e) => setAuditEmail(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all text-sm"
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-brand-blue to-purple-600 hover:from-brand-blue-light hover:to-purple-500 text-white py-6 rounded-xl text-base font-semibold shadow-glow inline-flex items-center justify-center gap-2"
                    >
                      Get My Free Website Report
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    <p className="text-white/30 text-xs text-center">
                      No spam. We'll send your audit report within 24 hours.
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-white mb-2">Audit Request Received!</h3>
                    <p className="text-white/60 text-sm">
                      Our SEO team will analyze your site and send a detailed report to your email within 24 hours.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Trust line */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-white/30 text-xs">
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Or call us: +91 9391795320</span>
              <span>•</span>
              <span>Trusted by 150+ businesses in Hyderabad</span>
              <span>•</span>
              <button onClick={scrollToContact} className="text-brand-blue hover:text-brand-blue-light transition-colors">
                Prefer to chat? Contact us →
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Process;
