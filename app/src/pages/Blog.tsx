import { useEffect, useState } from 'react';
import { ArrowLeft, Clock, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { client, urlFor } from '../lib/sanityClient';
import SEO from '../components/SEO';
import '../Blog.css';
import type { SanityPost } from '../types/sanity';

const BlogPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<SanityPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Fetch posts from Sanity
    const fetchPosts = async () => {
      try {
        const query = `*[_type == "post"] | order(date desc) {
          _id,
          title,
          slug,
          snippet,
          author,
          date,
          readTime,
          category,
          image
        }`;
        const data = await client.fetch(query);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  return (
    <>
      <SEO 
        title="Digital Marketing & Web Design Blog | Digital Vint"
        description="Latest insights, news, and strategies on web design, SEO, and digital marketing from the experts at Digital Vint."
        keywords="digital marketing blog, seo tips 2026, web design trends, digital agency news hyderabad, marketing insights"
      />
      <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back Home
        </button>

        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Insights & <span className="text-brand-blue">News</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl">
            Thoughts, ideas, and strategies on design, development, and digital marketing from our expert team.
          </p>
        </div>

        {/* Loading State or Blog Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20 text-white/50 text-xl">Loading latest insights...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article 
                key={post._id} 
                onClick={() => navigate(`/blog/${post.slug.current}`)}
                className="group rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-brand-blue/30 transition-colors flex flex-col cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {post.image && (
                    <img 
                      src={urlFor(post.image).width(800).url()} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-brand-black/80 backdrop-blur-md text-white text-xs font-medium border border-white/10">
                      {post.category || 'Uncategorized'}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-white/40 text-xs mb-4">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      {post.author || 'Digital Vint'}
                    </div>
                    {post.readTime && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-display font-bold text-white mb-3 group-hover:text-brand-blue transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-white/60 text-sm mb-6 line-clamp-3 flex-grow">
                    {post.snippet}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                    <span className="text-white/40 text-xs">{post.date ? new Date(post.date).toLocaleDateString() : ''}</span>
                    <button className="flex items-center gap-1 text-brand-blue font-medium text-sm group/btn">
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
