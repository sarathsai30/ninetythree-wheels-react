
import React, { useState, useEffect } from 'react';
import { videoService } from '../services/videoService';

const VideoAdmin = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    youtubeUrl: '',
    description: '',
    order: 1
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setIsLoading(true);
      const fetchedVideos = await videoService.getVideos();
      setVideos(fetchedVideos);
    } catch (error) {
      alert('Failed to fetch videos');
    } finally {
      setIsLoading(false);
    }
  };

  const extractVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const videoId = extractVideoId(formData.youtubeUrl);
    if (!videoId) {
      alert('Please enter a valid YouTube URL');
      return;
    }

    try {
      const videoData = {
        ...formData,
        videoId,
        embedUrl: `https://www.youtube.com/embed/${videoId}`
      };

      if (editingVideo) {
        await videoService.updateVideo(editingVideo.id, videoData);
        alert('Video updated successfully!');
      } else {
        await videoService.addVideo(videoData);
        alert('Video added successfully!');
      }

      setFormData({ title: '', youtubeUrl: '', description: '', order: 1 });
      setIsAdding(false);
      setEditingVideo(null);
      fetchVideos();
    } catch (error) {
      alert('Failed to save video');
    }
  };

  const handleEdit = (video) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      youtubeUrl: video.youtubeUrl,
      description: video.description,
      order: video.order
    });
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await videoService.deleteVideo(id);
        alert('Video deleted successfully!');
        fetchVideos();
      } catch (error) {
        alert('Failed to delete video');
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: '', youtubeUrl: '', description: '', order: 1 });
    setIsAdding(false);
    setEditingVideo(null);
  };

  if (isLoading) {
    return <div className="text-center">Loading videos...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Video Management</h3>
        <button 
          className="btn btn-primary"
          onClick={() => setIsAdding(true)}
        >
          Add New Video
        </button>
      </div>

      {isAdding && (
        <div className="card mb-4">
          <div className="card-header">
            <h5>{editingVideo ? 'Edit Video' : 'Add New Video'}</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">YouTube URL</label>
                <input
                  type="url"
                  className="form-control"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData({...formData, youtubeUrl: e.target.value})}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Order</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  value={formData.order}
                  onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                  required
                />
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success">
                  {editingVideo ? 'Update Video' : 'Add Video'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="row">
        {videos.map((video) => (
          <div key={video.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card">
              <div className="ratio ratio-16x9">
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="card-body">
                <h6 className="card-title">{video.title}</h6>
                <p className="card-text small text-muted">{video.description}</p>
                <div className="d-flex gap-2">
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleEdit(video)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(video.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {videos.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted">No videos added yet. Add your first video!</p>
        </div>
      )}
    </div>
  );
};

export default VideoAdmin;
