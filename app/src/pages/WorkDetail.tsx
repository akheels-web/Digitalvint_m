import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, BarChart3, ArrowRight, Lightbulb, Target, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO from '../components/SEO';
import { client, urlFor, settingsQuery } from '../lib/sanityClient';

const WorkDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [relatedProjects, setRelatedProjects] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchWorkData = async () => {
      setIsLoading(true);
      try {
        const query = `*[_type == "caseStudy" && slug.current == $slug][0]`;
        const data = await client.fetch(query, { slug });
        setProject(data);

        // Fetch related works (3 other works)
        const relatedQuery = `*[_type == "caseStudy" && slug.current != $slug][0...3]`;
        const relatedData = await client.fetch(relatedQuery, { slug });
        setRelatedProjects(relatedData);

        // Fetch settings for WhatsApp
        const settingsData = await client.fetch(settingsQuery);
        setSettings(settingsData);
      } catch (err) {
        console.error('Error fetching work detail:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorkData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 flex justify-center bg-brand-black">
        <Loader2 className="w-10 h-10 text-brand-blue animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-white bg-brand-black">
        <h1 className="text-4xl font-display font-bold mb-4">Project Not Found</h1>
        <Button onClick={() => navigate('/#works')} className="bg-gradient-to-r from-brand-blue to-purple-600 hover:from-brand-blue-light hover:to-purple-500 text-white">
          View All Works
        </Button>
      </div>
    );
  }

  // CaseStudy JSON-LD
  const caseStudySchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    'name': `${project.title} — Digital Vint Case Study`,
    'description': project.description,
    'creator': {
      '@type': 'Organization',
      'name': 'Digital Vint',
      'url': 'https://digitalvint.com',
    },
    'dateCreated': project.year || '2024',
    'about': {
      '@type': 'Organization',
      'name': project.clientName || project.title,
      'location': project.location || 'Hyderabad',
    },
    'genre': project.category || 'Digital Marketing',
    'keywords': (project.tags || []).join(', '),
    'url': `https://digitalvint.com/works/${project.slug?.current}`,
    'hasPart': (project.results || []).map((stat: any) => ({
      '@type': 'PropertyValue',
      'name': stat.label,
      'value': stat.metric,
    })),
  };

  return (
    <>
      <SEO 
        title={`${project.title} Case Study — ${project.category || 'Portfolio'} | Digital Vint Hyderabad`}
        description={`${project.description} See results: ${(project.results || []).map((s: any) => `${s.label}: ${s.metric}`).join(', ')}.`}
        keywords={`${project.title.toLowerCase()}, ${(project.category || '').toLowerCase()} case study hyderabad, digital vint portfolio, ${(project.tags || []).map((t: string) => t.toLowerCase()).join(', ')}`}
        image={project.mainImage ? urlFor(project.mainImage).url() : project.image}
      />

      {/* CaseStudy JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />

      <div className="pt-24 pb-20 min-h-screen bg-brand-black">
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
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-4 py-1.5 rounded-full bg-brand-blue/20 text-brand-blue font-medium text-sm border border-brand-blue/30">
                {project.category || 'Success Story'}
              </span>
              <span className="text-white/30 text-sm">{project.year || '2024'} · {project.location || 'Hyderabad, India'}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8 leading-tight max-w-4xl">
              {project.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4">
              {project.link && project.link !== '#' && (
                <Button
                  onClick={() => window.open(project.link, '_blank')}
                  className="bg-white text-brand-black hover:bg-white/90 px-8 py-6 rounded-full text-base font-medium flex items-center gap-2"
                >
                  Visit Live Site
                  <ExternalLink className="w-4 h-4" />
                </Button>
              )}
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag: any, idx: number) => (
                  <span key={idx} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Big Image */}
          <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden mb-20 border border-white/10 shadow-2xl relative group">
            <img 
              src={project.mainImage ? urlFor(project.mainImage).width(1200).url() : (project.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80')} 
              alt={`${project.title} — ${project.category} project by Digital Vint Hyderabad`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20">
            {project.results?.map((stat: any, idx: number) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gradient-to-br from-brand-blue/10 to-purple-600/5 border border-brand-blue/20 text-center"
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-brand-blue mb-2">
                  {stat.metric}
                </div>
                <div className="text-white/60 text-sm tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Challenge + Solution */}
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {/* Challenge */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-orange-400" />
                </div>
                <h2 className="text-xl font-display font-bold text-white">The Challenge</h2>
              </div>
              <p className="text-white/65 leading-relaxed text-base">
                {project.challenge || 'Every growth journey starts with a set of unique challenges that require creative problem-solving and strategic execution.'}
              </p>
            </div>

            {/* Solution */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-brand-blue" />
                </div>
                <h2 className="text-xl font-display font-bold text-white">Our Solution</h2>
              </div>
              <p className="text-white/65 leading-relaxed text-base">
                {project.solution || 'We implemented a custom strategy focused on high-intent user journeys, conversion-led design, and multi-channel optimization.'}
              </p>
            </div>
          </div>

          {/* Project Overview */}
          <div className="mb-20 max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-brand-blue" />
              <h2 className="text-2xl font-display font-bold text-white">Project Overview</h2>
            </div>
            <p className="text-lg text-white/70 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* CTA */}
          <div className="mb-20 bg-gradient-to-br from-brand-blue/10 to-purple-600/10 border border-brand-blue/20 rounded-3xl p-8 md:p-14 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Want results like this for your business?
            </h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
              We help local businesses in Hyderabad attract customers, generate leads, and grow online. Let's talk about your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/#contact')}
                className="bg-gradient-to-r from-brand-blue to-purple-600 hover:from-brand-blue-light hover:to-purple-500 text-white px-10 py-7 rounded-full text-lg shadow-glow inline-flex items-center gap-2"
              >
                Get a Free Consultation
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                onClick={() => window.open(`https://wa.me/${settings?.whatsappNumber || '919391795320'}?text=Hi%2C%20I%20saw%20your%20case%20studies%20and%20would%20like%20to%20discuss%20a%20project.`, '_blank')}
                variant="outline"
                className="border-white/20 text-white bg-white/5 hover:bg-white/10 px-10 py-7 rounded-full text-lg"
              >
                WhatsApp Us
              </Button>
            </div>
          </div>

          {/* Related Projects */}
          <div>
            <h2 className="text-2xl font-display font-bold text-white mb-8">More Case Studies</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProjects.map((rp: any) => (
                <Link
                  key={rp._id}
                  to={`/works/${rp.slug?.current}`}
                  className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-brand-blue/30 transition-all duration-300"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={rp.mainImage ? urlFor(rp.mainImage).width(400).url() : (rp.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80')}
                      alt={`${rp.title} case study — Digital Vint`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-brand-blue text-xs font-medium uppercase tracking-wider">{rp.category || 'Case Study'}</span>
                    <h3 className="text-white font-display font-bold text-lg mt-2 group-hover:text-brand-blue transition-colors">{rp.title}</h3>
                    <p className="text-white/50 text-sm mt-2 line-clamp-2">{rp.description}</p>
                    <div className="mt-4 flex gap-3 flex-wrap">
                      {(rp.results || []).slice(0, 2).map((s: any, i: number) => (
                        <span key={i} className="text-xs font-semibold text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full border border-brand-blue/20">
                          {s.metric} {s.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default WorkDetail;
