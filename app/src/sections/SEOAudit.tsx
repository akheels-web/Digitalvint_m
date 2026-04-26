import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

const SEOAudit = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Use our new local API bridge
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: 'SEO Audit Request',
          message: `Website to audit: ${formData.website}`,
          source: 'Free Audit Form'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      setStatus('success');
      setFormData({ name: '', email: '', website: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-24 relative overflow-hidden bg-brand-black/50 border-y border-white/5">
      <div className="absolute inset-0 bg-brand-blue/5 md:bg-brand-blue/10 mix-blend-overlay z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/20 text-brand-blue text-sm font-medium border border-brand-blue/30 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
              </span>
              Limited Time Offer
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              Get a Free Comprehensive SEO Audit <span className="text-brand-blue">(Value $299)</span>
            </h2>
            
            <p className="text-lg text-white/60 mb-8 leading-relaxed">
              Find out exactly why your competitors are outranking you. Our manual audit uncovers technical errors, on-page optimization gaps, and provides a clear roadmap to the first page of Google.
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                'Deep Technical Site Health Analysis',
                'Core Web Vitals & Speed Assessment',
                'Competitor Keyword Gap Analysis',
                'Actionable 30-Day Growth Strategy'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Form Card */}
          <div className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl backdrop-blur-sm relative overflow-hidden group hover:border-brand-blue/30 transition-colors">
            {/* Ambient Glow */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand-blue/30 rounded-full blur-[100px] opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <h3 className="text-2xl font-display font-bold text-white mb-6">Request Your Audit</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">Full Name</label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-black/50 border-white/10 text-white focus:border-brand-blue h-12"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">Work Email</label>
                  <Input 
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-black/50 border-white/10 text-white focus:border-brand-blue h-12"
                    placeholder="john@company.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-white/70 mb-2">Website URL</label>
                  <Input 
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    required
                    className="bg-black/50 border-white/10 text-white focus:border-brand-blue h-12"
                    placeholder="https://www.yourdomain.com"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full bg-gradient-to-r from-brand-blue to-purple-600 hover:from-brand-blue-light hover:to-purple-500 text-white h-14 text-lg font-medium rounded-xl shadow-glow transition-all"
              >
                {status === 'submitting' ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing Request...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Claim Free Audit <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>

              {status === 'success' && (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p>Success! We've received your request. Our SEO team will review your site and email the manual audit within 48 hours.</p>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p>Something went wrong submitting your request. Please try again or email us directly at grow@digitalvint.com.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOAudit;
