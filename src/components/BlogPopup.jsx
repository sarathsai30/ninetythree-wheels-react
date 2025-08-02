import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Book } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { blogService } from '../services/blogService';

const BlogPopup = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await blogService.getAllBlogs();
        setBlogs(fetchedBlogs.slice(0, 2)); // Show only 2 latest blogs
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = (blog) => {
    const slug = blog.slug || blog.id;
    navigate(`/news/${slug}`);
    setIsVisible(false);
  };

  const handleViewAllBlogs = () => {
    navigate('/news');
    setIsVisible(false);
  };

  if (!isVisible || loading || blogs.length === 0) {
    return null;
  }

  return (
    <div className="position-fixed" style={{ 
      top: '120px', 
      right: '20px', 
      zIndex: 1000,
      maxWidth: '320px',
      minWidth: '280px'
    }}>
      <div className="card shadow-lg border-0" style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px'
      }}>
        <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center p-3">
          <div className="d-flex align-items-center gap-2">
            <Book size={16} className="text-warning" />
            <h6 className="mb-0 fw-bold text-dark">Latest News</h6>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="btn btn-sm btn-outline-secondary border-0 p-1"
            style={{ borderRadius: '50%', width: '28px', height: '28px' }}
          >
            <X size={14} />
          </button>
        </div>
        
        <div className="card-body p-3 pt-0">
          {blogs.map((blog, index) => (
            <div 
              key={blog.id}
              className={`cursor-pointer p-2 rounded mb-2 ${index === blogs.length - 1 ? 'mb-0' : ''}`}
              style={{ 
                transition: 'all 0.2s ease',
                backgroundColor: 'transparent',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f8f9fa';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
              onClick={() => handleBlogClick(blog)}
            >
              <h6 className="mb-1 fw-semibold text-dark" style={{ 
                fontSize: '0.85rem',
                lineHeight: '1.3',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}>
                {blog.title}
              </h6>
              <small className="text-muted">
                {new Date(blog.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))}
          
          <div className="mt-3 pt-2 border-top">
            <button 
              onClick={handleViewAllBlogs}
              className="btn btn-warning btn-sm w-100 d-flex align-items-center justify-content-center gap-2"
              style={{ fontSize: '0.8rem' }}
            >
              View All News
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPopup;