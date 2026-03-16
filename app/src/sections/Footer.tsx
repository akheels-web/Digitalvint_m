import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Youtube,
  ArrowUp,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerLinks = {
    services: [
      { name: 'Website Development', id: 'services' },
      { name: 'SEO Services', id: 'services' },
      { name: 'Social Media Marketing', id: 'services' },
      { name: 'PPC Advertising', id: 'services' },
      { name: 'UI/UX Design', id: 'services' },
      { name: 'E-Commerce Solutions', id: 'services' },
    ],
    company: [
      { name: 'About Us', id: 'hero' },
      { name: 'Our Work', id: 'works' },
      { name: 'Pricing', id: 'pricing' },
      { name: 'Testimonials', id: 'why-us' },
      { name: 'Contact', id: 'contact' },
    ],
    resources: [
      { name: 'Blog', href: '#' },
      { name: 'Case Studies', id: 'works' },
      { name: 'FAQs', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/digitalvint', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/digitalvint', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/digitalvint', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/digitalvint', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com/digitalvint', label: 'YouTube' },
  ];

  return (
    <footer className="relative bg-brand-darker border-t border-white/10">
      {/* Main Footer */}
      <div className="px-4 sm:px-6 lg:px-12 xl:px-20 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-blue-light flex items-center justify-center">
                  <span className="text-white font-display font-bold text-xl">DV</span>
                </div>
                <span className="text-white font-display font-semibold text-xl">
                  Digital Vint
                </span>
              </div>

              <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
                Hyderabad&apos;s leading digital marketing agency. We transform businesses through innovative web solutions and data-driven marketing strategies.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <a
                  href="tel:+919391795320"
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 text-brand-blue" />
                  +91 93917 95320
                </a>
                <a
                  href="mailto:info@digitalvint.com"
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 text-brand-blue" />
                  info@digitalvint.com
                </a>
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <MapPin className="w-4 h-4 text-brand-blue" />
                  Banjara Hills, Hyderabad, Telangana
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-brand-blue/20 hover:border-brand-blue/30 transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h3 className="text-white font-semibold mb-6">Services</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-white font-semibold mb-6">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="text-white font-semibold mb-6">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    {'id' in link ? (
                      <button
                        onClick={() => scrollToSection(link.id!)}
                        className="text-white/60 hover:text-white text-sm transition-colors"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="text-white/60 hover:text-white text-sm transition-colors"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 px-4 sm:px-6 lg:px-12 xl:px-20 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Digital Vint. All rights reserved. Made with passion in Hyderabad, India.
          </p>

          <div className="flex items-center gap-6">
            {/* Local SEO Keywords */}
            <span className="text-white/30 text-xs hidden lg:block">
              Digital Marketing Agency Hyderabad | SEO Services Telangana
            </span>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-brand-blue/20 hover:border-brand-blue/30 transition-all"
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
