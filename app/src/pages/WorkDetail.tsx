import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, BarChart3 } from 'lucide-react';
import { worksData } from '../data/works';
import { Button } from '@/components/ui/button';
import SEO from '../components/SEO';

const WorkDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const project = worksData.find(w => w.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-display font-bold mb-4">Project Not Found</h1>
        <Button onClick={() => navigate('/#works')} className="bg-gradient-to-r from-brand-blue to-purple-600 hover:from-brand-blue-light hover:to-purple-500 text-white">
          View All Works
        </Button>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${project.title} - ${project.category} Portfolio | Digital Vint`}
        description={project.description}
        keywords={`${project.title.toLowerCase()}, ${project.category.toLowerCase()} portfolio, web design case study hyderabad`}
        image={project.image}
      />
      <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </button>

        {/* Hero Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-1.5 rounded-full bg-brand-blue/20 text-brand-blue font-medium text-sm border border-brand-blue/30">
              {project.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8 leading-tight max-w-4xl">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6">
            <Button className="bg-white text-brand-black hover:bg-white/90 px-8 py-6 rounded-full text-lg font-medium flex items-center gap-2">
              Visit Live Site
              <ExternalLink className="w-5 h-5" />
            </Button>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Big Image */}
        <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden mb-20 border border-white/10 shadow-2xl relative group">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-display font-bold text-white">Project Overview</h2>
            <p className="text-lg text-white/70 leading-relaxed">
              {project.description}
            </p>
            <p className="text-lg text-white/70 leading-relaxed">
              To deliver on the vision, we established a clear design roadmap tailored to effectively communicate the brand's unique value props. From ideation to deployment, the focus remained solidly on maintaining high performance scores and robust SEO architectures.
            </p>
          </div>

          <div className="space-y-8">
            <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-brand-blue" />
              Impact & Results
            </h3>
            <div className="space-y-4">
              {Object.entries(project.stats).map(([key, value]) => (
                <div key={key} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-blue/30 transition-colors">
                  <div className="text-3xl font-display font-bold text-brand-blue mb-1">
                    {value}
                  </div>
                  <div className="text-white/60 capitalize text-sm tracking-wide">
                    {key}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        </div>

      </div>
    </>
  );
};

export default WorkDetail;
