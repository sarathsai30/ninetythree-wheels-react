
import React, { useState, useEffect } from 'react';
import { Youtube, Linkedin, Twitter } from 'lucide-react';
import { blogService } from '../services/blogService';

const BlogSection = () => {
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
        setError('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

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
                      __html: blog.content.length > 1000 
                        ? `${blog.content.substring(0, 1000)}...` 
                        : blog.content 
                    }}
                  />
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
                  <small className="text-muted">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </small>
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
