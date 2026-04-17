import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, ChevronRight, Copy, Check, Globe, Tag, Info, Share2 } from 'lucide-react';

const UTMArchitect = () => {
  const [url, setUrl] = useState('');
  const [source, setSource] = useState('');
  const [medium, setMedium] = useState('');
  const [campaign, setCampaign] = useState('');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');
  
  const [result, setResult] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!url) {
      setResult('');
      return;
    }

    try {
      const baseUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
      const params = new URLSearchParams();

      if (source) params.set('utm_source', source.toLowerCase().replace(/\s+/g, '_'));
      if (medium) params.set('utm_medium', medium.toLowerCase().replace(/\s+/g, '_'));
      if (campaign) params.set('utm_campaign', campaign.toLowerCase().replace(/\s+/g, '_'));
      if (term) params.set('utm_term', term.toLowerCase().replace(/\s+/g, '_'));
      if (content) params.set('utm_content', content.toLowerCase().replace(/\s+/g, '_'));

      const queryString = params.toString();
      setResult(queryString ? `${baseUrl.origin}${baseUrl.pathname}?${queryString}` : baseUrl.toString());
    } catch (e) {
      setResult('Invalid URL');
    }
  }, [url, source, medium, campaign, term, content]);

  const copyToClipboard = () => {
    if (!result || result === 'Invalid URL') return;
    navigator.clipboard.writeText(result);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const socialPresets = [
    { name: 'Facebook Ad', s: 'facebook', m: 'paid_social' },
    { name: 'Google Search', s: 'google', m: 'cpc' },
    { name: 'Email Blast', s: 'newsletter', m: 'email' },
    { name: 'Instagram Bio', s: 'instagram', m: 'social_bio' },
  ];

  return (
    <div className="pt-32 pb-20 px-6 relative z-10 font-sans">
      <div className="max-w-4xl mx-auto w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-white/30 hover:text-white mb-8 transition-all hover:-translate-x-1 uppercase text-[9px] font-black tracking-widest pl-2">
          <ChevronRight className="w-3.5 h-3.5 rotate-180" /> Back to Dashboard
        </Link>
        
        <div className="labs-card p-8 md:p-12 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12 border-b border-white/5 pb-10">
            <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center border border-brand-blue/20">
              <Target className="w-7 h-7 text-brand-blue" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-black text-white leading-tight">UTM Architect</h2>
              <p className="text-white/40 text-sm">Standardize your campaign tracking parameters.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Inputs */}
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Main Website URL</label>
                <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input 
                        type="text" 
                        placeholder="digitalvint.com"
                        className="input-field pl-12"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Source</label>
                    <input 
                        type="text" 
                        placeholder="e.g. facebook"
                        className="input-field py-3 text-base"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                    />
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Medium</label>
                    <input 
                        type="text" 
                        placeholder="e.g. cpc"
                        className="input-field py-3 text-base"
                        value={medium}
                        onChange={(e) => setMedium(e.target.value)}
                    />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Campaign Name</label>
                <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input 
                        type="text" 
                        placeholder="e.g. summer_promo_2026"
                        className="input-field pl-12"
                        value={campaign}
                        onChange={(e) => setCampaign(e.target.value)}
                    />
                </div>
              </div>

              {/* Presets */}
              <div className="pt-8 border-t border-white/5">
                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-4">Quick Presets</p>
                <div className="flex flex-wrap gap-2">
                    {socialPresets.map((p, i) => (
                        <button 
                            key={i}
                            onClick={() => { setSource(p.s); setMedium(p.m); }}
                            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-bold text-white/40 hover:text-white hover:bg-brand-blue/20 hover:border-brand-blue/30 transition-all"
                        >
                            {p.name}
                        </button>
                    ))}
                </div>
              </div>
            </div>

            {/* Result Preview */}
            <div className="relative">
                <div className="absolute -inset-4 bg-brand-blue/10 blur-3xl opacity-30 rounded-full" />
                <div className="relative p-8 rounded-[2rem] bg-white/[0.03] border border-white/10">
                    <div className="flex items-center gap-3 mb-6">
                        <Share2 className="w-5 h-5 text-brand-blue" />
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Architect Preview</span>
                    </div>

                    <div className="bg-black/40 rounded-2xl p-6 border border-white/5 break-all min-h-[120px] mb-8 font-mono text-xs leading-relaxed text-white/60">
                        {result || 'Waiting for URL and parameters...'}
                    </div>

                    <button 
                        onClick={copyToClipboard}
                        disabled={!result || result === 'Invalid URL'}
                        className={`w-full py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 transition-all ${isCopied ? 'bg-green-500 text-white' : 'bg-brand-blue text-white hover:bg-brand-blue/90 shadow-glow disabled:opacity-30'}`}
                    >
                        {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {isCopied ? 'Copied Link' : 'Copy Tracked URL'}
                    </button>

                    <div className="mt-8 p-5 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-4">
                        <Info className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                        <p className="text-[10px] text-white/30 leading-relaxed font-medium">
                            <span className="text-white/60 font-bold italic">Lab Secret:</span> All spaces are automatically converted to underscores and lowercase to prevent tracking breaks in GA4.
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UTMArchitect;
