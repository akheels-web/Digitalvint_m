import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Calendar, Share2, Bookmark, Tag } from 'lucide-react';
import { blogsData } from '../data/blogs';
import { Button } from '@/components/ui/button';
import SEO from '../components/SEO';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const articleRef = useRef<HTMLDivElement>(null);
  const [readProgress, setReadProgress] = useState(0);

  const post = blogsData.find(b => b.slug === slug);
  const currentIndex = blogsData.findIndex(b => b.slug === slug);
  const relatedPosts = blogsData.filter(b => b.slug !== slug).slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const { top, height } = articleRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.min(100, Math.max(0, ((windowHeight - top) / height) * 100));
      setReadProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <>
      <SEO
        title={`${post.title} | Digital Vint Blog`}
        description={post.excerpt}
        image={post.image}
        article={true}
      />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60]">
        <div
          className="h-full bg-gradient-to-r from-brand-blue to-purple-600 transition-all duration-150 ease-out"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <div className="pt-24 pb-20 min-h-screen bg-brand-black">

        {/* Hero Banner */}
        <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden mb-16">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-12 pb-12">
            <div className="max-w-4xl mx-auto">
              <button
                onClick={() => navigate('/blog')}
                className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors group text-sm"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Articles
              </button>
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/20 text-brand-blue font-medium text-sm border border-brand-blue/30 mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">

          {/* Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-y border-white/10 py-5 mb-12">
            <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm">
              <div className="flex items-center gap-2"><User className="w-4 h-4" /><span className="font-medium text-white/80">{post.author}</span></div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>{post.readTime}</span></div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{post.date}</span></div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleShare} className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-brand-blue/20 transition-all" aria-label="Share">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-brand-blue/20 transition-all" aria-label="Bookmark">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Article Content */}
          <article
            ref={articleRef}
            className="blog-article max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center gap-3">
            <Tag className="w-4 h-4 text-white/40" />
            {[post.category, 'Digital Marketing', 'Hyderabad'].map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs">{tag}</span>
            ))}
          </div>

          {/* CTA Card */}
          <div className="mt-16 bg-gradient-to-br from-brand-blue/10 to-purple-600/10 border border-brand-blue/20 rounded-3xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">Need help with your digital strategy?</h3>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">Our team of experts is ready to help you implement the strategies discussed in this article.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/#contact')} className="bg-gradient-to-r from-brand-blue to-purple-600 hover:from-brand-blue-light hover:to-purple-500 text-white px-8 py-6 rounded-full text-lg shadow-glow">
                Get a Free Consultation
              </Button>
              <Button onClick={() => navigate('/#services')} variant="outline" className="border-white/20 text-white bg-white/5 hover:bg-white/10 px-8 py-6 rounded-full text-lg">
                View Our Services
              </Button>
            </div>
          </div>

          {/* Prev / Next Navigation */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentIndex > 0 && (
              <Link to={`/blog/${blogsData[currentIndex - 1].slug}`} className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-blue/30 transition-all">
                <span className="text-xs text-white/40 mb-2 block">← Previous Article</span>
                <span className="text-white font-display font-semibold group-hover:text-brand-blue transition-colors line-clamp-2">{blogsData[currentIndex - 1].title}</span>
              </Link>
            )}
            {currentIndex < blogsData.length - 1 && (
              <Link to={`/blog/${blogsData[currentIndex + 1].slug}`} className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-blue/30 transition-all text-right md:col-start-2">
                <span className="text-xs text-white/40 mb-2 block">Next Article →</span>
                <span className="text-white font-display font-semibold group-hover:text-brand-blue transition-colors line-clamp-2">{blogsData[currentIndex + 1].title}</span>
              </Link>
            )}
          </div>

          {/* Related Posts */}
          <div className="mt-20">
            <h2 className="text-2xl font-display font-bold text-white mb-8">You Might Also Like</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map(rp => (
                <Link key={rp.id} to={`/blog/${rp.slug}`} className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-brand-blue/30 transition-all">
                  <div className="aspect-video overflow-hidden">
                    <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <span className="text-brand-blue text-xs font-medium">{rp.category}</span>
                    <h3 className="text-white font-display font-semibold mt-2 group-hover:text-brand-blue transition-colors line-clamp-2 text-sm">{rp.title}</h3>
                    <div className="flex items-center gap-2 mt-3 text-white/40 text-xs">
                      <Clock className="w-3 h-3" /> {rp.readTime}
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

export default BlogDetail;
