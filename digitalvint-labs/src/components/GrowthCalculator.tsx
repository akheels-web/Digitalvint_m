import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, ChevronRight, Users, Target, DollarSign, TrendingUp, ArrowRight } from 'lucide-react';

const GrowthCalculator = () => {
  const [traffic, setTraffic] = useState(5000);
  const [convRate, setConvRate] = useState(1);
  const [leadValue, setLeadValue] = useState(500);
  
  const [currentRevenue, setCurrentRevenue] = useState(0);
  const [potentialRevenue, setPotentialRevenue] = useState(0);
  const [growth, setGrowth] = useState(0);

  useEffect(() => {
    const current = (traffic * (convRate / 100)) * leadValue;
    setCurrentRevenue(current);

    const optimizedConv = Math.max(convRate * 1.5, 2.5);
    const optimizedTraffic = traffic * 2.5;
    const potential = (optimizedTraffic * (optimizedConv / 100)) * leadValue;
    
    setPotentialRevenue(potential);
    setGrowth(potential - current);
  }, [traffic, convRate, leadValue]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="px-6 py-12 md:py-20 min-h-screen">
      <div className="max-w-6xl mx-auto w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-white/30 hover:text-white mb-10 transition-all hover:-translate-x-1 uppercase text-[10px] font-black tracking-widest">
          <ChevronRight className="w-4 h-4 rotate-180" /> Dashboard
        </Link>
        
        <div className="labs-card p-10 md:p-16 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center gap-8 mb-16">
            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
              <BarChart3 className="w-8 h-8 text-orange-400" />
            </div>
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-2">Growth Profit</h2>
              <p className="text-white/40 text-lg">Calculate your monthly revenue growth potential with Digital Vint.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Inputs */}
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex justify-between items-center text-white">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-blue" />
                    <span className="text-[10px] uppercase font-black tracking-widest text-white/60">Monthly Visitors</span>
                  </div>
                  <span className="text-2xl font-display font-black">{traffic.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="500" max="50000" step="500"
                  className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                  value={traffic}
                  onChange={(e) => setTraffic(Number(e.target.value))}
                />
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center text-white">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-purple-400" />
                    <span className="text-[10px] uppercase font-black tracking-widest text-white/60">Conversion Rate</span>
                  </div>
                  <span className="text-2xl font-display font-black">{convRate}%</span>
                </div>
                <input 
                  type="range" 
                  min="0.1" max="10" step="0.1"
                  className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  value={convRate}
                  onChange={(e) => setConvRate(Number(e.target.value))}
                />
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center text-white">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="text-[10px] uppercase font-black tracking-widest text-white/60">Average Lead Value</span>
                  </div>
                  <span className="text-2xl font-display font-black">{formatCurrency(leadValue)}</span>
                </div>
                <input 
                  type="range" 
                  min="100" max="10000" step="100"
                  className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-green-600"
                  value={leadValue}
                  onChange={(e) => setLeadValue(Number(e.target.value))}
                />
              </div>

              <div className="pt-10 border-t border-white/5">
                <p className="text-white/40 text-sm italic leading-relaxed">
                  "Adjust the sliders to see how small improvements in traffic and conversion can exponentially increase your monthly revenue."
                </p>
              </div>
            </div>

            {/* Results Card */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-blue/20 to-purple-600/20 blur-3xl opacity-50" />
              <div className="relative bg-[#1a1a1c] border border-white/10 rounded-[3rem] p-10 md:p-12 text-center overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 rounded-full blur-3xl" />
                
                <p className="text-white/30 uppercase tracking-[0.3em] font-black text-[10px] mb-4">Estimated Monthly Gain</p>
                <div className="text-5xl md:text-7xl font-display font-black text-white mb-6 animate-pulse">
                  +{formatCurrency(growth)}
                </div>
                
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-black uppercase tracking-widest mb-12">
                   <TrendingUp className="w-4 h-4" /> Potential {(potentialRevenue / Math.max(1, currentRevenue)).toFixed(1)}x Scale
                </div>

                <div className="grid grid-cols-2 gap-4 mb-12">
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                    <p className="text-white/20 text-[10px] font-black uppercase tracking-widest mb-2">Current</p>
                    <p className="text-lg font-display font-bold text-white/60">{formatCurrency(currentRevenue)}</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-brand-blue/5 border border-brand-blue/10">
                    <p className="text-brand-blue text-[10px] font-black uppercase tracking-widest mb-2">After Digital Vint</p>
                    <p className="text-lg font-display font-bold text-white">{formatCurrency(potentialRevenue)}</p>
                  </div>
                </div>

                <a 
                  href="https://digitalvint.com/#contact"
                  className="btn-primary w-full py-6 text-xl"
                >
                  Claim This Growth <ArrowRight className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthCalculator;
