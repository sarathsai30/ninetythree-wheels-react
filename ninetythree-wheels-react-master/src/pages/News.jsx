
import React, { useState, useEffect } from 'react';
import { blogService } from '../services/blogService';
import { Calendar, User, Eye } from 'lucide-react';

const News = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const fetchedBlogs = await blogService.getAllBlogs();
        setBlogs(fetchedBlogs);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
        setError('Failed to load news');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Load Instagram embed script when blogs are loaded
  useEffect(() => {
    if (blogs.length > 0) {
      // Check if any blog contains Instagram embeds
      const hasInstagramEmbeds = blogs.some(blog => 
        blog.content && blog.content.includes('instagram.com/embed.js')
      );
      
      if (hasInstagramEmbeds) {
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
    }
  }, [blogs]);

  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

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
            <p className="mt-4 text-gray-600">Loading latest car news...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const featuredNews = blogs.slice(0, 3);
  const recentNews = blogs.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div>
              <a 
                href="/news" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-3xl font-bold text-gray-900 hover:text-yellow-600 transition-colors"
              >
                LATEST CAR NEWS
              </a>
              <div className="w-20 h-1 bg-yellow-500 mt-2"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Latest News */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {featuredNews.map((blog) => (
                <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Article Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                    {blog.imageUrl ? (
                      <img 
                        src={blog.imageUrl} 
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
                    )}
                    <div className="absolute bottom-3 left-3 bg-yellow-500 text-white px-3 py-1 text-sm font-semibold rounded">
                      93cars
                    </div>
                  </div>
                  
                  {/* Article Content */}
                  <div className="p-4">
                    <a 
                      href={`/news/${blog.slug || blog.id}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-bold text-lg mb-3 text-gray-900 leading-tight hover:text-yellow-600 transition-colors block"
                    >
                      {blog.title}
                    </a>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(blog.createdAt).toLocaleDateString('en-GB', { 
                          day: '2-digit', 
                          month: 'short', 
                          year: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>1</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                      {truncateText(stripHtml(blog.content), 120)}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <a 
                        href={`/news/${blog.slug || blog.id}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-yellow-600 font-semibold text-sm hover:text-yellow-700 transition-colors"
                      >
                        READ MORE »
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar - Recent News */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">RECENT NEWS</h2>
                <div className="w-16 h-1 bg-yellow-500 mt-2"></div>
              </div>
              
              <div className="space-y-4">
                {recentNews.map((blog) => (
                  <div key={blog.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex gap-3">
                      {/* Thumbnail */}
                      <div className="w-16 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded flex-shrink-0 overflow-hidden">
                        {blog.imageUrl ? (
                          <img 
                            src={blog.imageUrl} 
                            alt={blog.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-yellow-500 opacity-20 rounded"></div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <a 
                          href={`/news/${blog.slug || blog.id}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-semibold text-sm text-gray-900 leading-tight mb-1 hover:text-yellow-600 transition-colors block"
                        >
                          {truncateText(blog.title, 60)}
                        </a>
                        <div className="text-xs text-gray-600 flex items-center gap-2">
                          <span>{new Date(blog.createdAt).toLocaleDateString('en-GB', { 
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

export default News;
