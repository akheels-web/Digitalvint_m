import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Link as LinkIcon, 
  Search, 
  BarChart3, 
  ArrowRight, 
  ExternalLink,
  ChevronRight,
  Zap,
  Layout,
  Globe,
  Plus
} from 'lucide-react';
import { createShortLink } from './lib/sanityClient';
import RedirectHandler from './components/RedirectHandler';

// Common Components
const Nav = () => (
  <nav className="relative z-20 px-6 py-8 flex items-center justify-between max-w-7xl mx-auto">
    <Link to="/" className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center shadow-glow">
        <Zap className="w-6 h-6 text-white" />
      </div>
      <span className="text-2xl font-display font-bold text-white tracking-tight">
        VINT<span className="text-brand-blue">LABS</span>
      </span>
    </Link>
    <div className="flex items-center gap-6">
      <Link to="/" className="text-white/60 hover:text-white transition-colors">Tools</Link>
      <a href="https://digitalvint.com" className="text-white/60 hover:text-white transition-colors">Digital Vint</a>
    </div>
  </nav>
);

const Home = () => {
  const tools = [
    {
      title: 'Vint-Short',
      description: 'Enterprise-grade URL shortener with real-time click tracking.',
      icon: LinkIcon,
      path: '/shortener',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      title: 'SEO Preview',
      description: 'Simulate how your site appears on Google SERP in 2026.',
      icon: Search,
      path: '/seo',
      color: 'from-purple-500 to-pink-400'
    },
    {
      title: 'Profit Growth',
      description: 'Calculate your monthly revenue growth potential.',
      icon: BarChart3,
      path: '/growth',
      color: 'from-orange-500 to-yellow-400'
    }
  ];

  return (
    <div className="px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6">
            The Digital <span className="text-gradient">Growth Lab</span>
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">
            Free, high-precision tools designed to help you analyze, optimize, and scale your digital presence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tools.map((tool, idx) => (
            <Link key={idx} to={tool.path}>
              <motion.div 
                whileHover={{ y: -10 }}
                className="labs-card p-8 h-full flex flex-col group cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-6 shadow-xl`}>
                  <tool.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-brand-blue transition-colors">
                  {tool.title}
                </h3>
                <p className="text-white/60 mb-8 flex-1">
                  {tool.description}
                </p>
                <div className="flex items-center gap-2 text-brand-blue font-bold uppercase tracking-widest text-xs">
                  Launch Tool <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// URL Shortener Feature (Demo Interface)
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
      // Create a slug from the title
      const cleanSlug = title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      const finalSlug = `${cleanSlug}-${Math.random().toString(36).substring(7)}`;
      
      await createShortLink(title, url, finalSlug);
      
      // Get the absolute base URL for the short link
      const baseUrl = window.location.origin;
      setResult(`${baseUrl}/s/${finalSlug}`);
    } catch (err) {
      console.error('Failed to create short link:', err);
      alert('Failed to connect to Sanity. Check your Write Token.');
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
    <div className="px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-8 transition-colors">
          <ChevronRight className="w-4 h-4 rotate-180" /> Back to Dashboard
        </Link>
        <div className="labs-card p-10 md:p-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <LinkIcon className="w-8 h-8 text-brand-blue" />
            </div>
            <div>
              <h2 className="text-3xl font-display font-bold text-white leading-none mb-2">Vint-Short</h2>
              <p className="text-white/40">Enter a long URL to create an enterprise-ready link.</p>
            </div>
          </div>

          <form onSubmit={handleShorten} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-white/60 uppercase tracking-widest px-1">Internal Reference Name</label>
              <input 
                type="text" 
                placeholder="e.g. Summer Ads 2026"
                className="input-field"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-white/60 uppercase tracking-widest px-1">Destination URL</label>
              <input 
                type="url" 
                placeholder="https://example.com/very/long/marketing/url"
                className="input-field"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-primary w-full py-5 text-lg justify-center shadow-glow disabled:opacity-50"
            >
              {isSubmitting ? 'Generating...' : 'Generate Short Link'} <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <AnimatePresence>
            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 p-8 rounded-2xl bg-white/5 border border-brand-blue/30 relative overflow-hidden group"
              >
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <p className="text-white/40 text-xs font-bold uppercase mb-2">Your Short Link</p>
                    <p className="text-xl md:text-2xl font-display font-bold text-white">{result}</p>
                  </div>
                  <button 
                    onClick={copyToClipboard}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${isCopied ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-white/90'}`}
                  >
                    {isCopied ? 'Copied!' : 'Copy Link'}
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
      <div className="relative min-h-screen">
        <div className="noise-overlay" />
        <Nav />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shortener" element={<UrlShortener />} />
            <Route path="/s/:slug" element={<RedirectHandler />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className="relative z-10 px-6 py-20 border-t border-white/5 mt-20 text-center">
          <p className="text-white/20 text-sm">
            &copy; {new Date().getFullYear()} Digital Vint Labs. All tools are free to use.
          </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
