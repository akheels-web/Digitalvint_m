import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDestination, trackClick } from '../lib/sanityClient';
import { Loader2 } from 'lucide-react';

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
          
          // Redirect to destination
          window.location.href = result.destination;
        } else {
          // Link not found
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
    <div className="h-screen flex flex-col items-center justify-center bg-brand-black text-white p-6 text-center">
      <div className="relative">
        <div className="absolute inset-0 bg-brand-blue/20 blur-3xl rounded-full" />
        <Loader2 className="w-16 h-16 text-brand-blue animate-spin relative z-10" />
      </div>
      <h2 className="text-3xl font-display font-bold mt-8 mb-4">Redirecting...</h2>
      <p className="text-white/40 max-w-sm">
        We're taking you to your destination. Hang tight, this won't take more than a second.
      </p>
      <div className="mt-12 flex items-center gap-2 text-xs text-white/20 uppercase tracking-widest font-bold">
        Powered by <span className="text-white/40">Vint-Short</span>
      </div>
    </div>
  );
};

export default RedirectHandler;
