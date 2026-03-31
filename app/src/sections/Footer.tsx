import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ArrowUp,
  Mail,
  Phone,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Custom X (formerly Twitter) icon since lucide-react doesn't have it
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerLinks = {
    services: [
      { name: 'Digital Strategy', id: 'services' },
      { name: 'SEO & Content', id: 'services' },
      { name: 'Performance Marketing', id: 'services' },
      { name: 'Web Design & Dev', id: 'services' },
      { name: 'E-Commerce Solutions', id: 'services' },
    ],
    company: [
      { name: 'About Us', id: 'why-us' },
      { name: 'Portfolio', id: 'works' },
      { name: 'Our Process', id: 'process' },
      { name: 'Testimonials', id: 'testimonials' },
      { name: 'Contact', id: 'contact' },
    ],
    resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'Case Studies', id: 'works' },
      { name: 'FAQs', href: '/faq' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/DigitalVint/', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/digital.vint/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://in.linkedin.com/company/digitalvint', label: 'LinkedIn' },
    { icon: XIcon, href: 'https://x.com/DigitalVint', label: 'X (Twitter)' },
    { icon: Youtube, href: 'https://www.youtube.com/channel/UC5Kgd9Y7fMoFUZxgpeSSE7g', label: 'YouTube' },
  ];

  return (
    <footer className="relative bg-brand-black overflow-hidden pt-20">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Top CTA Section (Modern Trend) */}
      <div className="px-4 sm:px-6 lg:px-12 xl:px-20 mb-20">
        <div className="max-w-7xl mx-auto bg-white/5 border border-white/10 rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden group hover:border-brand-blue/30 transition-colors duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10 max-w-2xl text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
              Ready to grow your revenue?
            </h2>
            <p className="text-white/60 text-lg">
              Let's talk about how our digital marketing strategies can scale your business.
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-brand-blue to-purple-600 hover:from-brand-blue-light hover:to-purple-500 text-white px-8 py-7 rounded-full text-lg shadow-glow transition-all hover:scale-105 inline-flex items-center gap-2 group/btn"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="px-4 sm:px-6 lg:px-12 xl:px-20 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand Column (Spans 4) */}
          <div className="lg:col-span-4 lg:pr-12">
            <div className="mb-6">
              <Link to="/" onClick={scrollToTop}>
                <img
                  src="https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/Digitalvint.png"
                  alt="Digital Vint Logo"
                  className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
                />
              </Link>
            </div>

            <p className="text-white/60 text-base leading-relaxed mb-8">
              Hyderabad's premier digital marketing agency. We specialize in high-converting web design, robust development, and aggressive local SEO strategies for businesses across India.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-brand-blue hover:border-brand-blue transition-all duration-300 hover:-translate-y-1"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Details (Spans 3) */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-display font-bold text-lg mb-6 tracking-wide">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+919391795320" className="flex items-start gap-3 text-white/60 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-blue/20 transition-colors shrink-0">
                    <Phone className="w-4 h-4 text-brand-blue" />
                  </div>
                  <span className="pt-1">+91 93917 95320</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@digitalvint.com" className="flex items-start gap-3 text-white/60 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-blue/20 transition-colors shrink-0">
                    <Mail className="w-4 h-4 text-brand-blue" />
                  </div>
                  <span className="pt-1 break-all">info@digitalvint.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/60 group">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-brand-blue" />
                  </div>
                  <span className="pt-1">Banjara Hills, Hyderabad,<br />Telangana, India</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Navigation Columns (Spans 5) */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-display font-bold text-lg mb-6 tracking-wide">Services</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <button onClick={() => scrollToSection(link.id)} className="block w-full text-left text-white/50 hover:text-white hover:pl-1 text-sm transition-all duration-300">
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-display font-bold text-lg mb-6 tracking-wide">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <button onClick={() => scrollToSection(link.id)} className="block w-full text-left text-white/50 hover:text-white hover:pl-1 text-sm transition-all duration-300">
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-white font-display font-bold text-lg mb-6 tracking-wide">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    {'id' in link ? (
                      <button onClick={() => scrollToSection(link.id!)} className="text-left text-white/50 hover:text-white hover:pl-1 text-sm transition-all duration-300">
                        {link.name}
                      </button>
                    ) : (
                      <Link to={link.href!} onClick={scrollToTop} className="block text-left text-white/50 hover:text-white hover:pl-1 text-sm transition-all duration-300">
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 px-4 sm:px-6 lg:px-12 xl:px-20 py-6 bg-black/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm font-medium">
            &copy; {new Date().getFullYear()} Digital Vint. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-white/30 text-xs hidden lg:block tracking-wide">
              Top Digital Marketing Agency Hyderabad | Expert SEO Services Telangana
            </span>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-brand-blue hover:border-brand-blue transition-all duration-300"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
