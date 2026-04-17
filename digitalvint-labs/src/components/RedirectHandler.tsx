import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDestination, trackClick } from '../lib/sanityClient';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const RedirectHandler = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      if (!slug) return;

      try {
        const result = await getDestination(slug);
        
        if (result && result.destination) {
          // Increment click counter in background
          trackClick(result._id, result.clicks);
          
          // Small delay for the "wow" feeling
          setTimeout(() => {
            window.location.href = result.destination;
          }, 800);
        } else {
          console.error('Short link not found');
          setTimeout(() => navigate('/'), 3000);
        }
      } catch (err) {
        console.error('Redirect error:', err);
        setTimeout(() => navigate('/'), 3000);
      }
    };

    handleRedirect();
  }, [slug, navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-brand-black text-white p-6 text-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10"
      >
        <div className="relative mb-10">
          <div className="absolute inset-0 bg-brand-blue/30 blur-3xl rounded-full" />
          <div className="w-24 h-24 rounded-3xl bg-brand-blue flex items-center justify-center shadow-2xl shadow-brand-blue/50 relative z-10 mx-auto">
            <Loader2 className="w-12 h-12 text-white animate-spin-slow" />
          </div>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-display font-black mb-4 tracking-tighter">
          Verifying <span className="text-brand-blue">Link</span>
        </h2>
        
        <div className="flex flex-col items-center gap-6">
          <p className="text-white/40 text-lg max-w-sm mx-auto leading-relaxed">
            Please wait while we establish a secure connection to your destination.
          </p>
          
          <div className="flex items-center gap-3">
             <div className="h-1 w-12 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                    className="h-full w-full bg-brand-blue" 
                />
             </div>
             <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Redirecting</span>
             <div className="h-1 w-12 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                    className="h-full w-full bg-brand-blue" 
                />
             </div>
          </div>
        </div>
      </motion.div>
      
      <div className="absolute bottom-12 flex flex-col items-center gap-2">
        <span className="text-[8px] font-black text-white/10 uppercase tracking-[0.5em] mb-2">Developed By</span>
        <div className="text-sm font-display font-black text-white/30 tracking-widest">
            VINT<span className="text-brand-blue/30">LABS</span>
        </div>
      </div>
    </div>
  );
};

export default RedirectHandler;
