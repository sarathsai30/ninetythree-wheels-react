
import React, { useState, useEffect } from 'react';
import { Youtube, Linkedin, Twitter } from 'lucide-react';
import blogsData from '../data/blogs.json';

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Load blogs from JSON file
    setBlogs(blogsData);
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
            <div key={blog.id} className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title fw-bold">{blog.title}</h5>
                  <p className="card-text text-muted">
                    {blog.content.length > 120 
                      ? `${blog.content.substring(0, 120)}...` 
                      : blog.content
                    }
                  </p>
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
