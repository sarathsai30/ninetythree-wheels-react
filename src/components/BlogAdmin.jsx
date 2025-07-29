
import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Edit3, RefreshCw, Upload, X } from 'lucide-react';
import { blogService } from '../services/blogService';
import { supabase } from '../firebase/config';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    videoUrl: '',
    platform: 'youtube',
    imageUrl: ''
  });
  const [operationLoading, setOperationLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Rich text editor configuration
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['link', 'image', 'code-block'],
      ['clean']
    ],
    clipboard: {
      // Allow pasting of HTML content including Instagram embeds
      matchVisual: false,
    }
  };

  const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'list', 'bullet', 'indent',
    'link', 'image', 'code-block'
  ];

  // Load blogs from Firebase on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const fetchedBlogs = await blogService.getAllBlogs();
      setBlogs(fetchedBlogs);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      alert('Failed to load blogs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload using Supabase Storage
  const handleImageUpload = async (file) => {
    if (!file) return null;
    
    try {
      setUploadingImage(true);
      const timestamp = Date.now();
      const fileName = `blog-images/${timestamp}-${file.name}`;
      
      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file);

      if (error) {
        console.error('Upload error:', error);
        alert('Failed to upload image. Please try again.');
        return null;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);
      
      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Remove selected image
  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setNewBlog({...newBlog, imageUrl: ''});
  };

  const handleAddBlog = async () => {
    if (newBlog.title.trim() && newBlog.content.trim()) {
      try {
        setOperationLoading(true);
        
        // Upload image if selected
        let imageUrl = '';
        if (imageFile) {
          imageUrl = await handleImageUpload(imageFile);
          if (!imageUrl) return; // Stop if image upload failed
        }
        
        const blogData = {
          ...newBlog,
          imageUrl
        };
        
        await blogService.addBlog(blogData);
        setNewBlog({ title: '', content: '', videoUrl: '', platform: 'youtube', imageUrl: '' });
        setImageFile(null);
        setImagePreview(null);
        setIsAddingBlog(false);
        await fetchBlogs(); // Refresh the list
        alert('Blog added successfully!');
      } catch (error) {
        console.error('Failed to add blog:', error);
        alert('Failed to add blog. Please try again.');
      } finally {
        setOperationLoading(false);
      }
    }
  };

  const handleEditBlog = (blog) => {
    setEditingBlogId(blog.id);
    setNewBlog({
      title: blog.title,
      content: blog.content,
      videoUrl: blog.videoUrl || '',
      platform: blog.platform || 'youtube',
      imageUrl: blog.imageUrl || ''
    });
    setImagePreview(blog.imageUrl || null);
    setImageFile(null);
  };

  const handleUpdateBlog = async () => {
    try {
      setOperationLoading(true);
      
      // Upload new image if selected
      let imageUrl = newBlog.imageUrl;
      if (imageFile) {
        imageUrl = await handleImageUpload(imageFile);
        if (!imageUrl) return; // Stop if image upload failed
      }
      
      const blogData = {
        ...newBlog,
        imageUrl
      };
      
      await blogService.updateBlog(editingBlogId, blogData);
      setEditingBlogId(null);
      setNewBlog({ title: '', content: '', videoUrl: '', platform: 'youtube', imageUrl: '' });
      setImageFile(null);
      setImagePreview(null);
      await fetchBlogs(); // Refresh the list
      alert('Blog updated successfully!');
    } catch (error) {
      console.error('Failed to update blog:', error);
      alert('Failed to update blog. Please try again.');
    } finally {
      setOperationLoading(false);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        setOperationLoading(true);
        await blogService.deleteBlog(blogId);
        await fetchBlogs(); // Refresh the list
        alert('Blog deleted successfully!');
      } catch (error) {
        console.error('Failed to delete blog:', error);
        alert('Failed to delete blog. Please try again.');
      } finally {
        setOperationLoading(false);
      }
    }
  };

  const cancelEdit = () => {
    setIsAddingBlog(false);
    setEditingBlogId(null);
    setNewBlog({ title: '', content: '', videoUrl: '', platform: 'youtube', imageUrl: '' });
    setImageFile(null);
    setImagePreview(null);
  };

  // Strip HTML tags for preview
  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  if (loading) {
    return (
      <div className="container py-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Blog Management</h2>
        <div className="d-flex gap-2">
          <button 
            className="btn btn-outline-secondary d-flex align-items-center gap-2"
            onClick={fetchBlogs}
            disabled={operationLoading}
          >
            <RefreshCw size={18} />
            Refresh
          </button>
          <button 
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={() => setIsAddingBlog(true)}
            disabled={operationLoading}
          >
            <Plus size={18} />
            Add New Blog
          </button>
        </div>
      </div>

      <div className="alert alert-success mb-4">
        <h5 className="alert-heading">Firebase Integration Active</h5>
        <p>
          Your blogs are now stored in Firebase Firestore and will be instantly visible to all website visitors. 
          Any changes you make here will appear immediately on the website.
        </p>
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
                disabled={operationLoading}
              />
            </div>

            {/* Image Upload Section */}
            <div className="mb-3">
              <label className="form-label">Blog Header Image</label>
              <div className="border border-2 border-dashed rounded p-3">
                {imagePreview ? (
                  <div className="text-center">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="img-fluid mb-2 rounded"
                      style={{ maxHeight: '200px', objectFit: 'cover' }}
                    />
                    <div>
                      <button 
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={removeImage}
                        disabled={operationLoading}
                      >
                        <X size={16} className="me-1" />
                        Remove Image
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload size={48} className="text-muted mb-2" />
                    <p className="mb-2">Click to upload blog header image</p>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={operationLoading}
                    />
                    <small className="text-muted">Recommended: 800x400px, JPG or PNG</small>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Content *</label>
              <div className="alert alert-info">
                <small>
                  <strong>Tip:</strong> You can paste Instagram embed codes directly into the editor. 
                  Use the code block format for Instagram embeds or switch to HTML mode if needed.
                </small>
              </div>
              <div style={{ height: '300px' }}>
                <ReactQuill
                  theme="snow"
                  value={newBlog.content}
                  onChange={(content) => setNewBlog({...newBlog, content})}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Write your blog content here... You can paste Instagram embed codes directly."
                  style={{ height: '240px' }}
                  readOnly={operationLoading}
                />
              </div>
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
                  disabled={operationLoading}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Platform</label>
                <select
                  className="form-select"
                  value={newBlog.platform}
                  onChange={(e) => setNewBlog({...newBlog, platform: e.target.value})}
                  disabled={operationLoading}
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
                disabled={operationLoading || uploadingImage}
              >
                {operationLoading || uploadingImage ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {uploadingImage ? 'Uploading Image...' : editingBlogId ? 'Updating...' : 'Adding...'}
                  </>
                ) : (
                  editingBlogId ? 'Update Blog' : 'Add Blog'
                )}
              </button>
              <button 
                className="btn btn-secondary"
                onClick={cancelEdit}
                disabled={operationLoading}
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
                {blog.imageUrl && (
                  <img 
                    src={blog.imageUrl} 
                    alt={blog.title}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title">{blog.title}</h5>
                    <div className="d-flex gap-1">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEditBlog(blog)}
                        disabled={operationLoading}
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteBlog(blog.id)}
                        disabled={operationLoading}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="card-text">
                    {stripHtml(blog.content).substring(0, 150)}...
                  </p>
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
