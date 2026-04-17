import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Link as LinkIcon, 
  Search, 
  BarChart3, 
  ArrowRight, 
  ChevronRight,
  Zap,
  Copy,
  Check
} from 'lucide-react';
import { createShortLink } from './lib/sanityClient';
import RedirectHandler from './components/RedirectHandler';
import SEOPreviewer from './components/SEOPreviewer';
import GrowthCalculator from './components/GrowthCalculator';

// Common Components
const Nav = () => (
  <nav className="relative z-20 px-6 py-8 flex items-center justify-between max-w-7xl mx-auto">
    <Link to="/" className="flex items-center gap-3 group">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-blue to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-brand-blue/40 transition-all duration-500 group-hover:rotate-12">
        <Zap className="w-7 h-7 text-white" />
      </div>
      <span className="text-2xl font-display font-black text-white tracking-widest uppercase">
        VINT<span className="text-brand-blue">LABS</span>
      </span>
    </Link>
    <div className="flex items-center gap-8">
      <Link to="/" className="text-white/40 hover:text-white font-medium transition-colors hidden md:block">Toolbox</Link>
      <a href="https://digitalvint.com" className="px-6 py-2.5 rounded-full border border-white/10 hover:border-brand-blue/50 hover:bg-brand-blue/5 text-white/80 hover:text-white text-sm font-bold transition-all duration-300">
        Main Site
      </a>
    </div>
  </nav>
);

const Home = () => {
  const tools = [
    {
      title: 'Vint-Short',
      description: 'Enterprise-grade URL shortener with real-time analytics and custom slugs.',
      icon: LinkIcon,
      path: '/shortener',
      color: 'from-blue-500 to-indigo-600',
      tag: 'Most Popular'
    },
    {
      title: 'SEO Preview',
      description: 'See exactly how your website appears on Google SERP results in 2026.',
      icon: Search,
      path: '/seo',
      color: 'from-purple-500 to-fuchsia-600',
      tag: 'SEO Tool'
    },
    {
      title: 'Growth Profit',
      description: 'Professional calculator to visualize your monthly revenue growth potential.',
      icon: BarChart3,
      path: '/growth',
      color: 'from-orange-500 to-red-600',
      tag: 'Strategy'
    }
  ];

  return (
    <div className="px-6 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-display font-black text-white mb-8 tracking-tighter leading-[0.9]">
              Future-Proof <br />
              <span className="text-gradient">Marketing Labs</span>
            </h1>
            <p className="text-white/40 text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
              Professional-grade tools built to analyze, scale, and automate your digital growth.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tools.map((tool, idx) => (
            <Link key={idx} to={tool.path}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="labs-card p-10 h-full flex flex-col group"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-16 h-16 rounded-[1.5rem] bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                    <tool.icon className="w-9 h-9 text-white" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase font-black tracking-widest text-white/40">
                    {tool.tag}
                  </span>
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-4 group-hover:text-brand-blue transition-colors">
                  {tool.title}
                </h3>
                <p className="text-white/50 text-lg mb-10 flex-1 leading-relaxed">
                  {tool.description}
                </p>
                <div className="flex items-center gap-3 text-brand-blue font-black uppercase tracking-[0.2em] text-[10px]">
                  Launch Lab <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const UrlShortener = () => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !title) return;
    
    setIsSubmitting(true);
    try {
      const cleanSlug = title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      const finalSlug = `${cleanSlug}-${Math.random().toString(36).substring(7)}`;
      
      await createShortLink(title, url, finalSlug);
      const baseUrl = window.location.origin;
      setResult(`${baseUrl}/s/${finalSlug}`);
    } catch (err: any) {
      console.error('Shorten error detail:', err);
      const msg = err?.message || 'Unknown network error';
      if (msg.includes('Not authorized') || msg.includes('401')) {
        alert('Permission Denied: Your Sanity Write Token is missing or invalid.');
      } else if (msg.includes('403')) {
        alert('CORS Error: You need to add labs.digitalvint.com to your Sanity project settings (API -> CORS Origins).');
      } else {
        alert(`Error creating link: ${msg}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="pt-32 pb-20 px-6 relative z-10">
      <div className="max-w-3xl mx-auto w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-white/30 hover:text-white mb-8 transition-all hover:-translate-x-1 uppercase text-[9px] font-black tracking-widest pl-2">
          <ChevronRight className="w-3.5 h-3.5 rotate-180" /> Back to Dashboard
        </Link>
        
        <div className="labs-card p-8 md:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center gap-8 mb-16">
            <div className="w-20 h-20 rounded-[2rem] bg-brand-blue/10 flex items-center justify-center border border-brand-blue/20">
              <LinkIcon className="w-10 h-10 text-brand-blue" />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-2">Vint-Short</h2>
              <p className="text-white/40 text-lg">Generate ultra-fast, branded marketing links.</p>
            </div>
          </div>

          <form onSubmit={handleShorten} className="space-y-10 max-w-2xl">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Internal Name</label>
              <input 
                type="text" 
                placeholder="Summer Campaign July 2026"
                className="input-field"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Target URL</label>
              <input 
                type="url" 
                placeholder="https://yourwebsite.com/promotion"
                className="input-field"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-primary w-full py-6 text-xl shadow-glow disabled:opacity-50"
            >
              {isSubmitting ? 'Creating Link...' : 'Generate Branded Link'}
              <ArrowRight className="w-6 h-6" />
            </button>
          </form>

          <AnimatePresence>
            {result && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-16 p-10 rounded-[2.5rem] bg-brand-blue/5 border border-brand-blue/20"
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex-1">
                    <p className="text-[10px] font-black text-brand-blue uppercase tracking-[0.2em] mb-3">Live Short Link</p>
                    <p className="text-2xl md:text-3xl font-display font-bold text-white break-all">{result}</p>
                  </div>
                  <button 
                    onClick={copyToClipboard}
                    className={`flex-shrink-0 flex items-center gap-3 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${isCopied ? 'bg-green-500 text-white shadow-green-500/20 shadow-lg' : 'bg-white text-brand-black hover:bg-brand-blue hover:text-white'}`}
                  >
                    {isCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    {isCopied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="relative min-h-screen selection:bg-brand-blue selection:text-white">
        <div className="noise-overlay" />
        <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_#1a1a1a_0%,_#0a0a0b_100%)] pointer-events-none" />
        
        <Nav />
        
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shortener" element={<UrlShortener />} />
            <Route path="/seo" element={<SEOPreviewer />} />
            <Route path="/growth" element={<GrowthCalculator />} />
            <Route path="/s/:slug" element={<RedirectHandler />} />
            {/* Fallback */}
            <Route path="*" element={<div className="h-[60vh] flex flex-col items-center justify-center text-center px-6">
                <h2 className="text-4xl font-display font-bold text-white mb-4">404 - Lab Not Found</h2>
                <Link to="/" className="text-brand-blue font-bold uppercase tracking-widest text-xs border-b border-brand-blue/30 pb-1">Back to Hub</Link>
            </div>} />
          </Routes>
        </main>
        
        <footer className="relative z-10 px-6 py-24 mt-20 text-center border-t border-white/[0.03]">
          <p className="text-white/20 text-xs font-bold uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} Digital Vint Labs &bull; Professional Growth Engine
          </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
