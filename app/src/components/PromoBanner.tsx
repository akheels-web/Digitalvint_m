import { useState, useEffect } from 'react';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Small delay to ensure smooth entrance after mount
    const timer = setTimeout(() => {
      // Check session storage to see if user dismissed it this session
      const dismissed = sessionStorage.getItem('promo_dismissed');
      if (!dismissed) {
        setIsVisible(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('promo_dismissed', 'true');
  };

  const handleClaim = () => {
    navigate('/faq');
    handleDismiss();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-6 md:right-auto md:w-[400px] z-[100] animate-in slide-in-from-bottom-10 fade-in duration-700">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-2xl relative overflow-hidden group">
        
        {/* Glow Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-transparent opacity-50 pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-blue/40 rounded-full blur-[50px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />

        {/* Close Button */}
        <button 
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-2 text-white/50 hover:text-white transition-all z-30 cursor-pointer rounded-full hover:bg-white/10"
          aria-label="Close offer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-brand-blue" />
            <span className="text-white font-display font-bold text-lg">Limited Offer</span>
          </div>
          
          <p className="text-white/80 text-sm mb-4 leading-relaxed">
            Get a <strong className="text-white">Free Logo Design</strong> with any comprehensive website package this month.
          </p>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleClaim}
              className="flex-1 bg-brand-blue hover:bg-brand-blue-light text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-glow flex items-center justify-center gap-2"
            >
              Learn More <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={handleDismiss}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
