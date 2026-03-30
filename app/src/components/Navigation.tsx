import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      setIsMobileMenuOpen(false);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'Services', id: 'services' },
    { name: 'Works', id: 'works' },
    { name: 'Process', id: 'process' },
    { name: 'Why Us', id: 'why-us' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-500 ease-expo ${isScrolled
            ? 'bg-brand-black/90 backdrop-blur-lg border-b border-white/10'
            : 'bg-transparent'
          }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  scrollToSection('hero');
                }
              }}
              className="flex items-center gap-2 group"
            >
              <img
                src="https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/Digitalvint.png"
                alt="Digital Vint Logo"
                className="h-8 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-white/80 hover:text-white text-sm font-medium transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-blue group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <a href="tel:+919391795320" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">+91 93917 95320</span>
              </a>
              <Button
                onClick={() => scrollToSection('contact')}
                className="bg-brand-blue hover:bg-brand-blue-light text-white font-medium px-6 py-2 rounded-full transition-all duration-300 hover:shadow-glow"
              >
                Get a Quote
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        <div className="absolute inset-0 bg-brand-black/95 backdrop-blur-xl" onClick={() => setIsMobileMenuOpen(false)} />
        <div
          className={`absolute top-20 left-0 right-0 p-6 transition-transform duration-500 ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-white text-xl font-medium py-3 border-b border-white/10 hover:text-brand-blue transition-colors text-left"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.name}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-brand-blue hover:bg-brand-blue-light text-white font-medium px-6 py-4 rounded-full mt-4 w-full"
            >
              Get a Free Quote
            </Button>
            <a
              href="tel:+919391795320"
              className="flex items-center justify-center gap-2 text-white/80 py-4"
            >
              <Phone className="w-5 h-5" />
              <span className="text-lg font-medium">+91 93917 95320</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
