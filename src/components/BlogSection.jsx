
import React, { useState, useEffect } from 'react';
import { Youtube, Linkedin, Twitter } from 'lucide-react';
import { blogService } from '../services/blogService';

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedBlogs, setExpandedBlogs] = useState(new Set());

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const fetchedBlogs = await blogService.getAllBlogs();
        setBlogs(fetchedBlogs);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
        setError('Failed to load blogs');
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

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'youtube':
        return <Youtube size={16} className="text-danger" />;
      case 'linkedin':
        return <Linkedin size={16} className="text-primary" />;
      case 'twitter':
        return <Twitter size={16} className="text-info" />;
      default:
        return <Youtube size={16} className="text-danger" />;
    }
  };

  // Strip HTML tags and get plain text for preview
  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const toggleReadMore = (blogId) => {
    setExpandedBlogs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(blogId)) {
        newSet.delete(blogId);
      } else {
        newSet.add(blogId);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 text-muted">Loading blogs...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center">
            <p className="text-danger">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return null; // Don't render section if no blogs
  }

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Latest from 93cars</h2>
          <p className="text-muted">Stay updated with our latest insights and automotive news</p>
        </div>
        <div className="row">
          {blogs.slice(0, 3).map(blog => (
            <div key={blog.id} className="col-12 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title fw-bold">{blog.title}</h5>
                  <div 
                    className="card-text text-muted"
                    dangerouslySetInnerHTML={{ 
                      __html: expandedBlogs.has(blog.id) 
                        ? blog.content 
                        : blog.content.length > 1000 
                          ? `${blog.content.substring(0, 1000)}...` 
                          : blog.content 
                    }}
                  />
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div>
                      {blog.content.length > 1000 && (
                        <button 
                          onClick={() => toggleReadMore(blog.id)}
                          className="btn btn-link p-0 text-warning fw-bold"
                          style={{ textDecoration: 'none' }}
                        >
                          {expandedBlogs.has(blog.id) ? 'Read Less' : 'Read More'}
                        </button>
                      )}
                    </div>
                    <small className="text-muted">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                  {blog.videoUrl && (
                    <div className="mb-3">
                      <a 
                        href={blog.videoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-outline-warning btn-sm d-flex align-items-center gap-2"
                      >
                        {getPlatformIcon(blog.platform)}
                        Watch Video
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {blogs.length > 3 && (
          <div className="text-center mt-4">
            <button className="btn btn-warning">
              View More Posts
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
