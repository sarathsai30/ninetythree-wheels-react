
import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Edit3, Eye, EyeOff } from 'lucide-react';

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    videoUrl: '',
    platform: 'youtube'
  });

  // Load blogs from localStorage on component mount
  useEffect(() => {
    const savedBlogs = localStorage.getItem('93cars-blogs');
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    }
  }, []);

  // Save blogs to localStorage whenever blogs change
  useEffect(() => {
    localStorage.setItem('93cars-blogs', JSON.stringify(blogs));
  }, [blogs]);

  const handleAddBlog = () => {
    if (newBlog.title.trim() && newBlog.content.trim()) {
      const blog = {
        id: Date.now(),
        ...newBlog,
        createdAt: new Date().toISOString()
      };
      setBlogs([blog, ...blogs]);
      setNewBlog({ title: '', content: '', videoUrl: '', platform: 'youtube' });
      setIsAddingBlog(false);
    }
  };

  const handleEditBlog = (blog) => {
    setEditingBlogId(blog.id);
    setNewBlog({
      title: blog.title,
      content: blog.content,
      videoUrl: blog.videoUrl || '',
      platform: blog.platform || 'youtube'
    });
  };

  const handleUpdateBlog = () => {
    setBlogs(blogs.map(blog => 
      blog.id === editingBlogId 
        ? { ...blog, ...newBlog, updatedAt: new Date().toISOString() }
        : blog
    ));
    setEditingBlogId(null);
    setNewBlog({ title: '', content: '', videoUrl: '', platform: 'youtube' });
  };

  const handleDeleteBlog = (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setBlogs(blogs.filter(blog => blog.id !== blogId));
    }
  };

  const cancelEdit = () => {
    setIsAddingBlog(false);
    setEditingBlogId(null);
    setNewBlog({ title: '', content: '', videoUrl: '', platform: 'youtube' });
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Blog Management</h2>
        <button 
          className="btn btn-primary d-flex align-items-center gap-2"
          onClick={() => setIsAddingBlog(true)}
        >
          <Plus size={18} />
          Add New Blog
        </button>
      </div>

      {/* Add/Edit Blog Form */}
      {(isAddingBlog || editingBlogId) && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">
              {editingBlogId ? 'Edit Blog Post' : 'Add New Blog Post'}
            </h5>
            <div className="mb-3">
              <label className="form-label">Title *</label>
              <input
                type="text"
                className="form-control"
                value={newBlog.title}
                onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
                placeholder="Enter blog title"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Content *</label>
              <textarea
                className="form-control"
                rows="5"
                value={newBlog.content}
                onChange={(e) => setNewBlog({...newBlog, content: e.target.value})}
                placeholder="Write your blog content here..."
              />
            </div>
            <div className="row">
              <div className="col-md-8">
                <label className="form-label">Video URL (Optional)</label>
                <input
                  type="url"
                  className="form-control"
                  value={newBlog.videoUrl}
                  onChange={(e) => setNewBlog({...newBlog, videoUrl: e.target.value})}
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Platform</label>
                <select
                  className="form-select"
                  value={newBlog.platform}
                  onChange={(e) => setNewBlog({...newBlog, platform: e.target.value})}
                >
                  <option value="youtube">YouTube</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="twitter">Twitter</option>
                </select>
              </div>
            </div>
            <div className="mt-3">
              <button 
                className="btn btn-success me-2"
                onClick={editingBlogId ? handleUpdateBlog : handleAddBlog}
              >
                {editingBlogId ? 'Update Blog' : 'Add Blog'}
              </button>
              <button 
                className="btn btn-secondary"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blog List */}
      <div className="row">
        {blogs.length === 0 ? (
          <div className="col-12 text-center py-5">
            <h4 className="text-muted">No blog posts yet</h4>
            <p className="text-muted">Create your first blog post to get started!</p>
          </div>
        ) : (
          blogs.map(blog => (
            <div key={blog.id} className="col-lg-6 col-md-12 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title">{blog.title}</h5>
                    <div className="d-flex gap-1">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEditBlog(blog)}
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteBlog(blog.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="card-text">{blog.content.substring(0, 150)}...</p>
                  {blog.videoUrl && (
                    <div className="mb-2">
                      <span className="badge bg-secondary me-2">{blog.platform}</span>
                      <a href={blog.videoUrl} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                        View Video
                      </a>
                    </div>
                  )}
                  <small className="text-muted">
                    Created: {new Date(blog.createdAt).toLocaleDateString()}
                    {blog.updatedAt && (
                      <span> • Updated: {new Date(blog.updatedAt).toLocaleDateString()}</span>
                    )}
                  </small>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogAdmin;
