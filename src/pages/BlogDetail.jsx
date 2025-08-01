import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { blogService } from '../services/blogService';
import { Calendar, User, ArrowLeft } from 'lucide-react';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogAndRecent = async () => {
      try {
        setLoading(true);
        const allBlogs = await blogService.getAllBlogs();
        // Try to find by slug first, fallback to ID for backward compatibility
        const currentBlog = allBlogs.find(b => b.slug === slug || b.id === slug);
        
        if (currentBlog) {
          setBlog(currentBlog);
          setRecentBlogs(allBlogs.filter(b => b.id !== currentBlog.id).slice(0, 5));
        } else {
          setError('Blog not found');
        }
      } catch (err) {
        console.error('Failed to fetch blog:', err);
        setError('Failed to load blog');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlogAndRecent();
    }
  }, [slug]);

  // Load Instagram embed script when blog is loaded
  useEffect(() => {
    if (blog && blog.content && blog.content.includes('instagram.com/embed.js')) {
      // Load Instagram embed script if not already loaded
      if (!document.querySelector('script[src*="instagram.com/embed.js"]')) {
        const script = document.createElement('script');
        script.src = '//www.instagram.com/embed.js';
        script.async = true;
        document.body.appendChild(script);
      } else {
        // If script already exists, process embeds
        if (window.instgrm && window.instgrm.Embeds) {
          window.instgrm.Embeds.process();
        }
      }
    }
  }, [blog]);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading article...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600 text-lg">{error || 'Article not found'}</p>
            <button 
              onClick={() => window.close()}
              className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded font-semibold"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">LATEST CAR NEWS</h1>
              <div className="w-20 h-1 bg-yellow-500 mt-2"></div>
            </div>
            <button 
              onClick={() => window.close()}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded font-semibold flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Close
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Article */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Article Header */}
              <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                {blog.imageUrl ? (
                  <img 
                    src={blog.imageUrl} 
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
                )}
                <div className="absolute bottom-4 left-4 bg-yellow-500 text-white px-4 py-2 text-sm font-semibold rounded">
                  93cars
                </div>
              </div>
              
              {/* Article Content */}
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {blog.title}
                </h1>
                
                <div className="flex items-center gap-6 text-sm text-gray-600 mb-6 pb-6 border-b">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{new Date(blog.createdAt).toLocaleDateString('en-GB', { 
                      day: '2-digit', 
                      month: 'long', 
                      year: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>93cars Team</span>
                  </div>
                </div>
                
                <div className="prose max-w-none text-gray-700 leading-relaxed">
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>
                
                {blog.videoUrl && (
                  <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3">Related Video</h3>
                    <a 
                      href={blog.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-yellow-600 hover:text-yellow-700 font-medium"
                    >
                      Watch Video →
                    </a>
                  </div>
                )}
              </div>
            </article>
          </div>

          {/* Sidebar - Recent News */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">RECENT NEWS</h2>
                <div className="w-16 h-1 bg-yellow-500 mt-2"></div>
              </div>
              
              <div className="space-y-4">
                {recentBlogs.map((recentBlog) => (
                  <div key={recentBlog.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex gap-3">
                      {/* Thumbnail */}
                      <div className="w-16 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded flex-shrink-0 overflow-hidden">
                        {recentBlog.imageUrl ? (
                          <img 
                            src={recentBlog.imageUrl} 
                            alt={recentBlog.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-yellow-500 opacity-20 rounded"></div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <a 
                          href={`/news/${recentBlog.slug || recentBlog.id}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-semibold text-sm text-gray-900 leading-tight mb-1 hover:text-yellow-600 transition-colors block"
                        >
                          {truncateText(recentBlog.title, 60)}
                        </a>
                        <div className="text-xs text-gray-600 flex items-center gap-2">
                          <span>{new Date(recentBlog.createdAt).toLocaleDateString('en-GB', { 
                            day: '2-digit', 
                            month: 'short', 
                            year: 'numeric' 
                          })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;