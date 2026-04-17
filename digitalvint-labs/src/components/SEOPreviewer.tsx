import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ChevronRight, Globe, Monitor, Smartphone, AlertCircle } from 'lucide-react';

const SEOPreviewer = () => {
  const [title, setTitle] = useState('Digital Vint | Leading Digital Marketing Agency in Hyderabad');
  const [description, setDescription] = useState('Digital Vint is a premier digital marketing agency in Hyderabad specializing in SEO, Web Design, and lead generation for local businesses.');
  const [url, setUrl] = useState('digitalvint.com');
  const [view, setView] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <div className="px-6 py-12 md:py-20">
      <div className="max-w-5xl mx-auto w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-white/30 hover:text-white mb-10 transition-all hover:-translate-x-1 uppercase text-[10px] font-black tracking-widest">
          <ChevronRight className="w-4 h-4 rotate-180" /> Dashboard
        </Link>
        
        <div className="labs-card p-10 md:p-16 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                <Search className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-1">SEO Previewer</h2>
                <p className="text-white/40">Optimize how your site appears in Google search results.</p>
              </div>
            </div>
            
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
              <button 
                onClick={() => setView('desktop')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${view === 'desktop' ? 'bg-brand-blue text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                <Monitor className="w-4 h-4" /> Desktop
              </button>
              <button 
                onClick={() => setView('mobile')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${view === 'mobile' ? 'bg-brand-blue text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                <Smartphone className="w-4 h-4" /> Mobile
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Controls */}
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">SEO Title ({title.length}/60)</label>
                <input 
                  type="text" 
                  className="input-field"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={70}
                />
                <div className={`h-1 rounded-full transition-all ${title.length > 60 ? 'bg-orange-500' : 'bg-green-500'}`} style={{ width: `${Math.min(100, (title.length/60)*100)}%` }} />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Meta Description ({description.length}/160)</label>
                <textarea 
                  className="input-field min-h-[120px] py-4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={200}
                />
                 <div className={`h-1 rounded-full transition-all ${description.length > 160 ? 'bg-orange-500' : 'bg-green-500'}`} style={{ width: `${Math.min(100, (description.length/160)*100)}%` }} />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Display URL</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input 
                    type="text" 
                    className="input-field pl-12"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="sticky top-10">
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-6 text-center lg:text-left">Google Search Result Preview</p>
              
              <div className={`bg-white rounded-xl p-6 md:p-10 shadow-2xl transition-all duration-500 ${view === 'mobile' ? 'max-w-[360px] mx-auto' : 'w-full'}`}>
                <div className="space-y-1.5 flex flex-col">
                  {view === 'mobile' ? (
                    <>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-400">G</div>
                        <span className="text-[12px] text-[#202124] truncate">https://{url}</span>
                      </div>
                      <h3 className="text-[#1a0dab] text-[18px] font-medium leading-tight hover:underline cursor-pointer">
                        {title || 'Enter a page title...'}
                      </h3>
                    </>
                  ) : (
                    <>
                      <cite className="text-[#202124] text-[14px] not-italic mb-1 truncate block font-sans">
                        https://{url}
                      </cite>
                      <h3 className="text-[#1a0dab] text-[20px] font-medium leading-tight hover:underline cursor-pointer font-sans">
                        {title || 'Enter a page title...'}
                      </h3>
                    </>
                  )}
                  <p className="text-[#4d5156] text-[14px] leading-relaxed font-sans line-clamp-2">
                    {description || 'Enter a meta description to see how it looks in search...'}
                  </p>
                </div>
              </div>
              
              <div className="mt-10 p-6 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
                  <AlertCircle className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                  <p className="text-white/40 text-xs leading-relaxed">
                    <span className="text-white font-bold">Pro Tip:</span> Keep titles under 60 characters and descriptions under 160 to prevent Google from cutting them off (truncation).
                  </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOPreviewer;
