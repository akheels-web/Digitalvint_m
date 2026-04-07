import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  MessageCircle,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

gsap.registerPlugin(ScrollTrigger);

// Form validation schema with security measures
const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  phone: z
    .string()
    .regex(/^[\d\s\-+()]{10,20}$/, 'Please enter a valid phone number'),
  company: z
    .string()
    .max(100, 'Company name must be less than 100 characters')
    .optional(),
  service: z
    .string()
    .min(1, 'Please select a service'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  honeypot: z.string().max(0).optional(), // Honeypot field for bot detection
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-heading',
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
        '.contact-form',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.contact-info',
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Rate limiting - prevent spam
  const checkRateLimit = () => {
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;
    const minInterval = 30000; // 30 seconds between submissions

    if (timeSinceLastSubmit < minInterval) {
      const waitSeconds = Math.ceil((minInterval - timeSinceLastSubmit) / 1000);
      return { allowed: false, waitSeconds };
    }

    return { allowed: true, waitSeconds: 0 };
  };

  const onSubmit = async (data: ContactFormData) => {
    // Check honeypot
    if (data.honeypot && data.honeypot.length > 0) {
      return; // Bot detected, silently fail
    }

    // Rate limiting
    const rateLimit = checkRateLimit();
    if (!rateLimit.allowed) {
      setSubmitStatus('error');
      setSubmitMessage(`Please wait ${rateLimit.waitSeconds} seconds before submitting again.`);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Replace this URL with your Google Apps Script Web App URL
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbymXtTfHMJrQoz2nxoDaz9tCdNguciL75bPTxXSzuOhqfskYQE6o-vgpYxlRe0tlwax/exec';

      // Using text/plain to bypass Google Apps Script CORS preflight issues
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        }),
      });

      if (!response.ok && response.type !== 'opaque') {
        throw new Error('Failed to submit form');
      }

      setSubmitStatus('success');
      setSubmitMessage('Thank you! We have received your message and will contact you shortly.');
      setLastSubmitTime(Date.now());
      reset();
      sessionStorage.removeItem('selectedPlan');
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 93917 95320',
      href: 'tel:+919391795320',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@digitalvint.com',
      href: 'mailto:info@digitalvint.com',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'Banjara Hills, Hyderabad, Telangana',
      href: 'https://maps.google.com/?q=Banjara+Hills+Hyderabad',
    },
    {
      icon: Clock,
      label: 'Business Hours',
      value: 'Mon - Sat: 10:00 AM - 7:00 PM IST',
      href: null,
    },
  ];

  const services = [
    'Website Development',
    'SEO Services',
    'Social Media Marketing',
    'PPC Advertising',
    'UI/UX Design',
    'E-Commerce Solutions',
    'SaaS Solutions & Deployment',
    'Other',
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-12 md:py-16 bg-brand-black overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-brand-blue/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-brand-blue-light/5 blur-3xl" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="contact-heading text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-medium mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            Let's Talk About Growing Your Business Online
          </h2>
          <p className="text-white/60 text-lg">
            Tell us a bit about your business and goals, We'll review it and get back to you with clear next steps.
          </p>
        </div>

        {/* Contact Content */}
        <div className="contact-content grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="contact-form">
            <div className="p-6 lg:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              {/* Security Badge */}
              <div className="flex items-center gap-2 mb-6 text-white/50 text-sm">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Your information is secure and encrypted</span>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Honeypot field - hidden from humans */}
                <div className="hidden">
                  <Input
                    {...register('honeypot')}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      {...register('name')}
                      autoComplete="name"
                      placeholder="John Doe"
                      className={`bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-brand-blue focus-visible:ring-1 focus-visible:ring-brand-blue ${errors.name ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      autoComplete="email"
                      placeholder="john@example.com"
                      className={`bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-brand-blue focus-visible:ring-1 focus-visible:ring-brand-blue ${errors.email ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                      className={`bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-brand-blue focus-visible:ring-1 focus-visible:ring-brand-blue ${errors.phone ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-white">
                      Company Name
                    </Label>
                    <Input
                      id="company"
                      {...register('company')}
                      autoComplete="organization"
                      placeholder="Your Company"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-brand-blue focus-visible:ring-1 focus-visible:ring-brand-blue"
                    />
                  </div>
                </div>

                {/* Service */}
                <div className="space-y-2">
                  <Label htmlFor="service" className="text-white">
                    Service Interested In <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="service"
                    {...register('service')}
                    className={`w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue ${errors.service ? 'border-red-500' : ''
                      }`}
                  >
                    <option value="" className="bg-brand-darker">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service} className="bg-brand-darker">
                        {service}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="text-red-500 text-xs">{errors.service.message}</p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">
                    Your Message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    {...register('message')}
                    placeholder="Tell us about your project..."
                    rows={5}
                    className={`bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-brand-blue resize-none ${errors.message ? 'border-red-500' : ''
                      }`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs">{errors.message.message}</p>
                  )}
                </div>

                {/* Status Messages */}
                {submitStatus !== 'idle' && (
                  <Alert
                    className={`${submitStatus === 'success'
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-red-500/10 border-red-500/30'
                      }`}
                  >
                    {submitStatus === 'success' ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                    <AlertDescription
                      className={submitStatus === 'success' ? 'text-green-400' : 'text-red-400'}
                    >
                      {submitMessage}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 bg-brand-blue hover:bg-brand-blue-light text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="contact-info space-y-8">
            {/* Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-brand-blue/30 transition-colors group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue/20 transition-colors">
                      <info.icon className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div>
                      <p className="text-white/50 text-sm mb-1">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-white font-medium hover:text-brand-blue transition-colors"
                          target={info.href.startsWith('http') ? '_blank' : undefined}
                          rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white font-medium">{info.value}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Contact CTA */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-brand-blue/20 to-brand-blue-light/20 border border-brand-blue/30">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-6 h-6 text-brand-blue" />
                <h3 className="text-white font-semibold">Prefer to chat?</h3>
              </div>
              <p className="text-white/70 text-sm mb-4">
                Reach out to us on WhatsApp for instant responses during business hours.
                Ideal for quick questions and initial guidance.
              </p>
              <a
                href="https://wa.me/919391795320"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-xl overflow-hidden border border-white/10 h-64 bg-white/5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.8!2d78.4486!3d17.4123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb973bbc64d2c7%3A0x1f0!2sBanjara%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Digital Vint Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
