import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Calendar, Share2, Tag, CheckCircle } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import type { PortableTextComponents } from '@portabletext/react';
import { client, urlFor } from '../lib/sanityClient';
import { Button } from '@/components/ui/button';
import SEO from '../components/SEO';

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const articleRef = useRef<HTMLDivElement>(null);
  const [readProgress, setReadProgress] = useState(0);
  const [activeHeader, setActiveHeader] = useState('');
  
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [headings, setHeadings] = useState<{ id: string, text: string, level: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

        // Extract TOC Headings from Sanity Portable Text
        if (postData?.content) {
          const extracted = postData.content
            .filter((block: any) => block._type === 'block' && ['h2', 'h3'].includes(block.style))
            .map((block: any) => {
              const text = block.children.map((c: any) => c.text).join('');
              return { id: slugify(text), text, level: block.style };
            });
          setHeadings(extracted);
        }
      } catch (err) {
        console.error("Error fetching blog detail", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Reading progress and active TOC
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const { top, height } = articleRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.min(100, Math.max(0, ((windowHeight - top) / height) * 100));
      setReadProgress(progress);

      // Active Header logic
      const headingElements = document.querySelectorAll('.blog-article h2, .blog-article h3');
      let currentActive = '';
      headingElements.forEach((el) => {
        const bounds = el.getBoundingClientRect();
        if (bounds.top < windowHeight * 0.4) {
          currentActive = el.id;
        }
      });
      if (currentActive) setActiveHeader(currentActive);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: post.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

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
            
            {/* Left Sidebar: Sticky Table of Contents */}
            <aside className="hidden lg:block w-64 shrink-0 sticky top-32">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h4 className="text-white font-display font-bold mb-4 flex items-center gap-2">
                  Table of Contents
                </h4>
                <nav className="flex flex-col gap-3 text-sm">
                  {headings.map((heading) => (
                    <a 
                      key={heading.id} 
                      href={`#${heading.id}`}
                      className={`transition-colors duration-200 line-clamp-2 ${activeHeader === heading.id ? 'text-brand-blue font-medium' : 'text-white/50 hover:text-white/80'} ${heading.level === 'h3' ? 'pl-4 text-xs' : ''}`}
                    >
                      {heading.text}
                    </a>
                  ))}
                </nav>
              </div>
              
              <div className="mt-6 flex items-center justify-center gap-4">
                <button onClick={handleShare} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-brand-blue/20 transition-all text-sm group">
                  <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>
                <div className="text-white/30 text-sm">Share Article</div>
              </div>
            </aside>

            {/* Main Article Content */}
            <main className="flex-1 min-w-0 max-w-3xl lg:max-w-none">
              {/* Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-y border-white/10 py-5 mb-10">
                <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
                  <div className="flex items-center gap-2"><User className="w-4 h-4" /><span className="font-medium text-white/80">{post.author || 'Digital Vint Team'}</span></div>
                  <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
                  {post.readTime && <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>{post.readTime}</span></div>}
                  <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{post.date ? new Date(post.date).toLocaleDateString() : ''}</span></div>
                </div>
              </div>

              {/* Sanity Portable Text */}
              <article ref={articleRef} className="blog-article max-w-none prose prose-invert prose-headings:font-display prose-a:text-brand-blue hover:prose-a:text-brand-blue-light prose-img:rounded-2xl">
                {post.content ? (
                  <PortableText value={post.content} components={ptComponents} />
                ) : (
                  <p>No content available.</p>
                )}
              </article>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center gap-3">
                  <Tag className="w-4 h-4 text-white/40" />
                  {post.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs">{tag}</span>
                  ))}
                </div>
              )}
            </main>

            {/* Right Sidebar: Sticky Author & CTA */}
            <aside className="hidden xl:flex flex-col gap-6 w-80 shrink-0 sticky top-32">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-blue/20 flex items-center justify-center border border-brand-blue/30">
                    <User className="w-6 h-6 text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{post.author || 'Digital Vint Expert'}</h4>
                    <span className="text-brand-blue text-xs font-medium">Verified Contributor</span>
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  Get industry-leading insights on digital strategy, web design, and SEO directly from the experts behind Hyderabad's fastest-growing digital agency.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-brand-blue/20 to-purple-600/20 border border-brand-blue/30 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/30 rounded-full blur-3xl -mr-16 -mt-16" />
                <h4 className="text-xl font-display font-bold text-white mb-3">Scale Your Business</h4>
                <p className="text-white/70 text-sm mb-6">Stop guessing with your digital strategy. Let's build a custom roadmap for your brand.</p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center text-xs text-white/60 justify-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-400"/> Free Audit included</div>
                  <Button onClick={() => navigate('/#contact')} className="w-full bg-white text-brand-black hover:bg-white/90 rounded-full font-semibold">
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
