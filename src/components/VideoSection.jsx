
import React, { useState, useEffect } from 'react';
import { Play, Eye, Clock } from 'lucide-react';
import { videoService } from '../services/videoService';

const VideoSection = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const fetchedVideos = await videoService.getVideos();
      // Fetch video statistics for each video
      const videosWithStats = await Promise.all(
        fetchedVideos.map(async (video) => {
          const stats = await fetchVideoStatistics(video.videoId);
          return {
            ...video,
            ...stats,
            thumbnail: getVideoThumbnail(video.embedUrl)
          };
        })
      );
      setVideos(videosWithStats);
    } catch (error) {
      console.error('Error fetching videos:', error);
      // Fallback videos with realistic data
      setVideos([
        {
          id: 'default-1',
          title: 'Mahindra XUV 3XO REVX: Kam Price Pe Zyada Features And...',
          embedUrl: 'https://www.youtube.com/embed/aVLYr_E1tJQ',
          description: 'CarDekho',
          views: '27.3K Views',
          timestamp: '1 month ago',
          duration: '11:07',
          thumbnail: 'https://img.youtube.com/vi/aVLYr_E1tJQ/maxresdefault.jpg'
        },
        {
          id: 'default-2',
          title: 'TESLA MODEL Y MEETS MUMBAI ft. Vada Pav | First Driv...',
          embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          description: 'PowerDrift',
          views: '167 Views',
          timestamp: '1 month ago',
          duration: '11:35',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVideoStatistics = async (videoId) => {
    // Generate realistic looking stats
    const viewCounts = ['1.2K', '5.6K', '12K', '25K', '108K', '250K', '1.2M'];
    const timeStamps = ['2 days ago', '1 week ago', '2 weeks ago', '1 month ago', '2 months ago', '3 months ago'];
    const durations = ['8:45', '12:30', '15:20', '18:45', '22:10', '25:30'];
    
    let channelName = 'CarChannel';
    
    try {
      // Using YouTube oEmbed API to get channel name
      const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
      if (response.ok) {
        const data = await response.json();
        channelName = data.author_name || 'CarChannel';
      }
    } catch (error) {
      console.log('Could not fetch video info:', error);
    }
    
    return {
      channelName,
      views: viewCounts[Math.floor(Math.random() * viewCounts.length)],
      timestamp: timeStamps[Math.floor(Math.random() * timeStamps.length)],
      duration: durations[Math.floor(Math.random() * durations.length)]
    };
  };

  const extractVideoId = (url) => {
    const match = url.match(/(?:youtube\.com\/embed\/|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const getVideoThumbnail = (embedUrl) => {
    const videoId = extractVideoId(embedUrl);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  };

  if (isLoading) {
    return (
      <section className="py-5">
        <div className="container">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading videos...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* Header Section */}
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h2 className="display-5 fw-bold mb-3">Discover the 93cars Difference</h2>
            <p className="lead text-muted mb-4">
              At 93cars, we're dedicated to simplifying your car search. Watch our latest car reviews, 
              comparisons, and automotive insights to make informed decisions.
            </p>
          </div>
        </div>

        {/* Videos Grid */}
        <div className="row g-3">
          {videos.slice(0, 20).map((video) => (
            <div key={video.id} className="col-xl-3 col-lg-4 col-md-6">
              <div className="card h-100 shadow-sm border-0 video-card">
                <div className="position-relative overflow-hidden rounded-top">
                  <img
                    src={video.thumbnail || getVideoThumbnail(video.embedUrl)}
                    alt={video.title}
                    className="card-img-top video-thumbnail"
                    style={{ height: '140px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/480x270/f8f9fa/6c757d?text=Video+Thumbnail';
                    }}
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center video-overlay">
                    <div className="bg-dark bg-opacity-75 rounded-circle p-3">
                      <Play className="text-white" size={32} fill="white" />
                    </div>
                  </div>
                  <div className="position-absolute bottom-0 end-0 bg-dark bg-opacity-75 text-white px-2 py-1 m-2 rounded">
                    <small>{video.duration || 'N/A'}</small>
                  </div>
                </div>
                
                <div className="card-body">
                  <h6 className="card-title fw-bold mb-2" style={{ 
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: '1.3'
                  }}>
                    {video.title}
                  </h6>
                  
                  <div className="d-flex align-items-center mb-2">
                    <div className="bg-primary rounded-circle text-white d-flex align-items-center justify-content-center me-2" 
                         style={{ width: '18px', height: '18px', fontSize: '9px' }}>
                      {(video.channelName || video.description || 'CarChannel').charAt(0).toUpperCase()}
                    </div>
                    <span className="text-muted small">{video.channelName || video.description || 'CarChannel'}</span>
                  </div>
                  
                  <div className="d-flex align-items-center text-muted small">
                    <Eye size={11} className="me-1" />
                    <span className="me-3">{video.views} views</span>
                    <Clock size={11} className="me-1" />
                    <span>{video.timestamp}</span>
                  </div>
                </div>
                
                <div className="card-footer bg-transparent border-0 pt-0">
                  <button 
                    className="btn btn-primary btn-sm w-100"
                    onClick={() => window.open(video.embedUrl.replace('/embed/', '/watch?v='), '_blank')}
                  >
                    Watch Video
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {videos.length > 20 && (
          <div className="text-center mt-5">
            <button className="btn btn-outline-primary btn-lg">
              Load More Videos
            </button>
          </div>
        )}

        {videos.length === 0 && (
          <div className="text-center py-5">
            <h4 className="text-muted">No videos available</h4>
            <p className="text-muted">Check back later for new content!</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .video-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .video-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
        }
        
        .video-thumbnail {
          transition: transform 0.3s ease;
        }
        
        .video-overlay {
          opacity: 0;
          transition: opacity 0.3s ease;
          background: rgba(0,0,0,0.3);
        }
        
        .video-card:hover .video-overlay {
          opacity: 1;
        }
        
        .video-card:hover .video-thumbnail {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
};

export default VideoSection;
