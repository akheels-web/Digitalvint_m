import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Calendar, Share2, Tag, CheckCircle, Facebook, Linkedin, Instagram, Quote, Info, AlertTriangle, Lightbulb, Sparkles, Twitter, ChevronDown, PlayCircle, ThumbsUp, ThumbsDown } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import type { PortableTextComponents } from '@portabletext/react';
import confetti from 'canvas-confetti';
import { client, urlFor } from '../lib/sanityClient';
import { Button } from '@/components/ui/button';
import SEO from '../components/SEO';

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const articleRef = useRef<HTMLDivElement>(null);
  const [readProgress, setReadProgress] = useState(0);
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  // Micro-interaction States
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<'yes' | 'no' | null>(null);
  const [highlightMenu, setHighlightMenu] = useState<{ text: string, x: number, y: number } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) return;

    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const query = `*[_type == "post" && slug.current == $slug][0]`;
        const relatedQuery = `*[_type == "post" && slug.current != $slug] | order(date desc)[0...3]`;

        const [postData, relatedData] = await Promise.all([
          client.fetch(query, { slug }),
          client.fetch(relatedQuery, { slug })
        ]);

        setPost(postData);
        setRelatedPosts(relatedData);
      } catch (err) {
        console.error("Error fetching blog detail", err);
      } finally {
        setIsLoading(false);
      }

    };

    fetchPost();
  }, [slug]);

  // Reading progress
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const { top, height } = articleRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.min(100, Math.max(0, ((windowHeight - top) / height) * 100));
      setReadProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });


    // Highlight-to-share logic
    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().length > 10 && !selection.isCollapsed) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setHighlightMenu({
          text: selection.toString(),
          x: rect.left + rect.width / 2,
          y: rect.top - 60 // Viewport-relative offset instead of page-relative
        });
      } else {
        setHighlightMenu(null);
      }
    };
    const handleScrollHide = () => setHighlightMenu(null);

    document.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('scroll', handleScrollHide, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollHide);
      document.removeEventListener('mouseup', handleMouseUp);
      // Stop audio if navigating away
      window.speechSynthesis.cancel();
    };
  }, []);

  const handlePlayAudio = () => {
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      const articleText = articleRef.current?.innerText || '';
      const textToRead = `${post.title}. ${articleText}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.onend = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleFeedback = (type: 'yes' | 'no') => {
    setFeedbackGiven(type);
    if (type === 'yes') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#a855f7', '#10b981']
      });
    }
  };

  if (isLoading) {
    return <div className="min-h-screen pt-32 flex justify-center text-white/50 text-xl">Loading article...</div>;
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-display font-bold mb-4">Post Not Found</h1>
        <Button onClick={() => navigate('/blog')} className="bg-gradient-to-r from-brand-blue to-purple-600 hover:from-brand-blue-light hover:to-purple-500 text-white">
          Back to Blog
        </Button>
      </div>
    );
  }


  const imageUrl = post.image ? urlFor(post.image).url() : '';

  const ptComponents: PortableTextComponents = {
    block: {
      h2: ({ children }) => {
        const id = slugify(children?.toString() || '');
        return <h2 id={id} className="scroll-mt-32">{children}</h2>;
      },
      h3: ({ children }) => {
        const id = slugify(children?.toString() || '');
        return <h3 id={id} className="scroll-mt-32">{children}</h3>;
      },
    },
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) return null;
        return (
          <div className="my-8 rounded-2xl overflow-hidden aspect-[16/9] relative bg-white/5 border border-white/10">
            <img src={urlFor(value).width(800).url()} alt="Blog Content" className="w-full h-full object-cover" loading="lazy" />
          </div>
        );
      },
      callout: ({ value }) => {
        const { type, title, text } = value;
        const config = {
          info: { icon: Info, bg: 'from-blue-500/10 to-blue-400/5', border: 'border-blue-500/20', text: 'text-blue-200', iconColor: 'text-blue-400' },
          warning: { icon: AlertTriangle, bg: 'from-yellow-500/10 to-yellow-400/5', border: 'border-yellow-500/20', text: 'text-yellow-200', iconColor: 'text-yellow-400' },
          success: { icon: Lightbulb, bg: 'from-green-500/10 to-green-400/5', border: 'border-green-500/20', text: 'text-green-200', iconColor: 'text-green-400' }
        }[type as string] || { icon: Info, bg: 'bg-white/5', border: 'border-white/10', text: 'text-white/80', iconColor: 'text-brand-blue' };

        const Icon = config.icon;

        return (
          <div className={`my-8 p-6 rounded-2xl bg-gradient-to-r ${config.bg} border ${config.border} flex gap-4 md:gap-6`}>
            <div className="shrink-0 mt-1">
              <div className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/5 ${config.iconColor}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <div>
              {title && <h4 className={`text-lg font-display font-bold mb-2 ${config.text}`}>{title}</h4>}
              <p className="text-white/80 leading-relaxed m-0 text-sm md:text-base">{text}</p>
            </div>
          </div>
        );
      },
      tweetQuote: ({ value }) => {
        return (
          <div className="my-10 px-8 py-10 relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 border border-brand-blue/20">
            <Quote className="absolute -top-4 -left-4 w-32 h-32 text-brand-blue/10 rotate-180 pointer-events-none" />
            <div className="relative z-10 text-center">
              <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-6 leading-snug">
                "{value.quote}"
              </h3>
              {value.author && (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-8 h-px bg-brand-blue/50" />
                  <span className="text-brand-blue font-semibold uppercase tracking-widest text-xs">{value.author}</span>
                  <div className="w-8 h-px bg-brand-blue/50" />
                </div>
              )}
            </div>
            <button
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${value.quote}" - ${value.author || ''}`)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
              className="mt-8 mx-auto flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-brand-blue hover:border-brand-blue text-white/60 hover:text-white transition-all text-xs font-semibold uppercase tracking-wide group"
            >
              <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Tweet this quote
            </button>
          </div>
        );
      },
      expandable: ({ value }) => {
        return (
          <details className="my-8 group rounded-2xl bg-white/5 border border-white/10 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/5 transition-colors">
              <span className="font-display font-bold text-white/90 text-lg">{value.title}</span>
              <ChevronDown className="w-5 h-5 text-brand-blue transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-6 pb-6 pt-2 text-white/70 leading-relaxed border-t border-white/5 bg-black/20">
              {value.content}
            </div>
          </details>
        );
      }
    }
  };

  return (
    <>
      <SEO title={`${post.title} | Digital Vint Blog`} description={post.snippet} image={imageUrl} article={true} />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60]">
        <div className="h-full bg-gradient-to-r from-brand-blue to-purple-600 transition-all duration-150 ease-out" style={{ width: `${readProgress}%` }} />
      </div>

      <div className="pt-24 pb-20 min-h-screen bg-brand-black">

        {/* Hero Banner */}
        <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden mb-16">
          {imageUrl && <img src={imageUrl} alt={post.title} className="w-full h-full object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-12 pb-12">
            <div className="max-w-7xl mx-auto">
              <button onClick={() => navigate('/blog')} className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors group text-sm">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Articles
              </button>
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/20 text-brand-blue font-medium text-sm border border-brand-blue/30 mb-4">
                {post.category || 'Uncategorized'}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-display font-bold text-white leading-tight max-w-4xl">
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12 items-start">

            {/* Main Article Content */}
            <main className="flex-1 min-w-0 relative">



              {/* Highlight to Share Tooltip */}
              {highlightMenu && (
                <div
                  style={{ top: highlightMenu.y, left: highlightMenu.x, transform: 'translateX(-50%)' }}
                  className="fixed z-[100] flex items-center gap-3 bg-gradient-to-r from-brand-blue to-purple-600 backdrop-blur-xl border border-white/20 p-2 pl-5 rounded-full shadow-[0_10px_40px_rgba(59,130,246,0.5)] animate-in zoom-in-95 fade-in duration-200"
                >
                  <span className="text-white text-xs font-bold tracking-widest uppercase drop-shadow-sm">Share:</span>
                  <div className="w-px h-4 bg-white/30 ml-1 mr-1" />
                  <button onClick={() => {
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${highlightMenu.text}" \n\n Via ${window.location.href}`)}`, '_blank');
                    setHighlightMenu(null);
                  }}
                    className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-all group"
                  >
                    <Twitter className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                  </button>
                  <button onClick={() => {
                    navigator.clipboard.writeText(`"${highlightMenu.text}" \n\n ${window.location.href}`);
                    setHighlightMenu(null);
                  }}
                    className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-all group"
                  >
                    <Share2 className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              )}

              {/* Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-y border-white/10 py-5 mb-10">
                <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
                  <div className="flex items-center gap-2"><User className="w-4 h-4" /><span className="font-medium text-white/80">{post.author || 'Digital Vint Team'}</span></div>
                  <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
                  {post.readTime && <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>{post.readTime}</span></div>}
                  <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{post.date ? new Date(post.date).toLocaleDateString() : ''}</span></div>
                </div>

                {/* Audio Player Micro-interaction */}
                <button
                  onClick={handlePlayAudio}
                  className={`group flex items-center gap-3 px-5 py-2.5 rounded-full border transition-all duration-300 mt-2 sm:mt-0 shadow-lg ${isPlayingAudio
                      ? 'bg-brand-blue border-brand-blue text-white shadow-brand-blue/20 scale-105'
                      : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-brand-blue/50 hover:text-brand-blue hover:shadow-brand-blue/10'
                    }`}
                >
                  <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-white/10 group-hover:bg-brand-blue/20 transition-colors">
                    {isPlayingAudio ? (
                      <div className="flex items-center justify-center gap-0.5">
                        <div className="w-0.5 h-3 bg-white animate-[bounce_1s_infinite_100ms]" />
                        <div className="w-0.5 h-4 bg-white animate-[bounce_1s_infinite_200ms]" />
                        <div className="w-0.5 h-3 bg-white animate-[bounce_1s_infinite_300ms]" />
                      </div>
                    ) : (
                      <PlayCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
                    )}
                  </div>
                  <span className="text-xs font-bold tracking-widest uppercase">{isPlayingAudio ? 'Playing' : 'Listen to Article'}</span>
                </button>

              </div>

              {/* AI Key Takeaways */}
              {post.aiSummary && post.aiSummary.length > 0 && (
                <div className="mb-12 p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-brand-blue/5 border border-purple-500/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-20 pointer-events-none">
                    <Sparkles className="w-24 h-24 text-purple-400" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 text-purple-400 font-display font-bold tracking-wider text-sm uppercase mb-4">
                      <Sparkles className="w-4 h-4" /> AI Quick Digest
                    </div>
                    <ul className="space-y-3">
                      {post.aiSummary.map((point: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-white/80 text-sm md:text-base leading-relaxed">
                          <CheckCircle className="w-5 h-5 shrink-0 text-purple-500/50 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Sanity Portable Text */}
              <article ref={articleRef} className="blog-article max-w-none prose prose-invert prose-headings:font-display prose-a:text-brand-blue hover:prose-a:text-brand-blue-light prose-img:rounded-2xl">
                {post.content ? (
                  <PortableText value={post.content} components={ptComponents} />
                ) : (
                  <p>No content available.</p>
                )}
              </article>

              {/* Tags and Share */}
              {(post.tags && post.tags.length > 0) && (
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <Tag className="w-4 h-4 text-white/40" />
                    {post.tags.map((tag: string) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs">{tag}</span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-white/40 text-xs font-display uppercase tracking-widest font-semibold mr-2">Share</span>
                    <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all group">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    </button>
                    <button onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`, '_blank')} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#25D366] transition-all">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    </button>
                    <button onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`, '_blank')} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#0A66C2] transition-all">
                      <Linkedin className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}


              {/* End of Post Feedback */}
              <div className="mt-16 py-8 border-y border-white/10 flex flex-col items-center justify-center gap-5 text-center">
                <div className="max-w-lg">
                  <h4 className="text-lg font-display font-bold text-white mb-1">Was this article helpful?</h4>
                  <p className="text-white/50 text-xs">Let us know so we can keep creating great content for you.</p>
                </div>

                {feedbackGiven ? (
                  <div className="flex items-center justify-center gap-2 text-brand-blue/90 bg-brand-blue/10 px-5 py-2 rounded-full border border-brand-blue/20 text-xs font-medium">
                    <CheckCircle className="w-3.5 h-3.5" /> Thank you for the feedback!
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <button onClick={() => handleFeedback('no')} className="flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-transparent hover:bg-white/5 border border-white/10 text-white/50 hover:text-white transition-all text-sm font-medium">
                      <ThumbsDown className="w-3.5 h-3.5" /> No
                    </button>
                    <button onClick={() => handleFeedback('yes')} className="flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 hover:border-white/20 border border-white/10 text-white/50 hover:text-white transition-all text-sm font-medium">
                      <ThumbsUp className="w-3.5 h-3.5" /> Yes
                    </button>
                  </div>
                )}
              </div>
            </main>

            {/* Right Sidebar: Sticky Author & CTA */}
            <aside className="hidden lg:flex flex-col gap-6 w-80 shrink-0 sticky top-32">
              <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:bg-white/[0.05] transition-all duration-500">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/10 rounded-full blur-3xl -mr-12 -mt-12" />
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-brand-blue/20 flex items-center justify-center border border-brand-blue/30 group-hover:scale-110 transition-transform duration-500">
                    <User className="w-7 h-7 text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="text-white font-display font-bold text-lg">{post.author || 'Digital Vint Team'}</h4>
                    <span className="text-brand-blue text-xs font-semibold uppercase tracking-wider">Verified Contributor</span>
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  Get industry-leading insights on digital strategy, web design, and SEO directly from the experts behind Hyderabad's fastest-growing digital agency.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0a0f1d] to-[#1a1a2e] border border-brand-blue/30 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] group">
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

                <h4 className="text-2xl font-display font-bold text-white mb-3">Scale Your Business</h4>
                <p className="text-white/70 text-sm mb-8 leading-relaxed">Stop guessing with your digital strategy. Let's build a custom roadmap for your brand.</p>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center text-xs font-medium text-white/80 justify-center gap-2 mb-2 bg-white/5 py-2 rounded-full border border-white/5">
                    <CheckCircle className="w-4 h-4 text-green-400" /> Free Audit included
                  </div>
                  <Button
                    onClick={() => navigate('/#contact')}
                    className="w-full bg-white text-brand-black hover:bg-brand-blue hover:text-white rounded-xl font-bold h-12 transition-all duration-300 shadow-xl"
                  >
                    Book Strategy Call
                  </Button>
                </div>
              </div>
            </aside>


          </div>

          {/* Related Posts Bottom Section */}
          {relatedPosts.length > 0 && (
            <div className="mt-24 pt-16 border-t border-white/10">
              <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">Keep Reading</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((rp: any) => (
                  <Link key={rp._id} to={`/blog/${rp.slug.current}`} className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-brand-blue/30 transition-all flex flex-col">
                    <div className="aspect-[16/10] overflow-hidden">
                      {rp.image && <img src={urlFor(rp.image).width(600).url()} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="text-brand-blue text-xs font-medium mb-2">{rp.category || 'Uncategorized'}</span>
                      <h3 className="text-xl text-white font-display font-bold group-hover:text-brand-blue transition-colors line-clamp-2 mb-4">{rp.title}</h3>
                      <div className="flex items-center gap-2 mt-auto text-white/40 text-xs">
                        <User className="w-3.5 h-3.5" /> {rp.author || 'Digital Vint'}
                        <span className="mx-1">•</span>
                        <Clock className="w-3.5 h-3.5" /> {rp.readTime}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
