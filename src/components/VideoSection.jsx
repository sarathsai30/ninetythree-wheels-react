
import React, { useState, useEffect } from 'react';
import { Play, Eye, Clock, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';

const VideoSection = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // YouTube API Configuration - Replace with your actual values
  const YOUTUBE_API_KEY = 'YOUR_YOUTUBE_API_KEY_HERE'; // Replace with your API key
  const YOUTUBE_CHANNEL_ID = 'YOUR_CHANNEL_ID_HERE'; // Replace with your channel ID

  useEffect(() => {
    fetchYouTubeVideos();
  }, []);

  const fetchYouTubeVideos = async () => {
    try {
      if (YOUTUBE_API_KEY === 'YOUR_YOUTUBE_API_KEY_HERE' || YOUTUBE_CHANNEL_ID === 'YOUR_CHANNEL_ID_HERE') {
        // Show fallback data when API keys are not set
        setVideos(getFallbackVideos());
        setIsLoading(false);
        return;
      }

      // Fetch videos from YouTube Data API
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=20&type=video`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch YouTube videos');
      }
      
      const data = await response.json();
      
      // Fetch additional video statistics
      const videoIds = data.items.map(item => item.id.videoId).join(',');
      const statsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoIds}&part=statistics,contentDetails`
      );
      
      const statsData = await statsResponse.json();
      
      // Combine video data with statistics
      const videosWithStats = data.items.map((item, index) => {
        const stats = statsData.items[index];
        return {
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
          channelName: item.snippet.channelTitle,
          publishedAt: formatTimeAgo(item.snippet.publishedAt),
          views: formatViewCount(stats?.statistics?.viewCount || '0'),
          likes: formatViewCount(stats?.statistics?.likeCount || '0'),
          comments: formatViewCount(stats?.statistics?.commentCount || '0'),
          duration: formatDuration(stats?.contentDetails?.duration || 'PT0M0S'),
          videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`
        };
      });
      
      setVideos(videosWithStats);
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      setVideos(getFallbackVideos());
    } finally {
      setIsLoading(false);
    }
  };

  const getFallbackVideos = () => [
    {
      id: 'fallback-1',
      title: 'Toyota Taisor 3500+ Km Long Term Review: Subtly Smart!',
      thumbnail: 'https://img.youtube.com/vi/aVLYr_E1tJQ/maxresdefault.jpg',
      channelName: 'CarDekho',
      publishedAt: '4 days ago',
      views: '2.6K',
      likes: '2',
      comments: '0',
      duration: '10:03',
      videoUrl: 'https://www.youtube.com/watch?v=aVLYr_E1tJQ'
    },
    {
      id: 'fallback-2',
      title: 'Mahindra XEV 9e Detailed Review: Itna Sab Kon Deta Hai?',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      channelName: 'CarDekho',
      publishedAt: '8 days ago',
      views: '13.8K',
      likes: '5',
      comments: '2',
      duration: '29:01',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      id: 'fallback-3',
      title: 'The Defender Octa is everything you need. And MORE.',
      thumbnail: 'https://img.youtube.com/vi/ScMzIvxBSi4/maxresdefault.jpg',
      channelName: 'PowerDrift',
      publishedAt: '15 days ago',
      views: '14.9K',
      likes: '8',
      comments: '3',
      duration: '6:27',
      videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4'
    },
    {
      id: 'fallback-4',
      title: 'Mahindra\'s Future SUVs Unveiled | New Thar, Creta-rival SUV',
      thumbnail: 'https://img.youtube.com/vi/p1rAyCQbUBU/maxresdefault.jpg',
      channelName: 'PowerDrift',
      publishedAt: '20 days ago',
      views: '25.2K',
      likes: '12',
      comments: '5',
      duration: '8:45',
      videoUrl: 'https://www.youtube.com/watch?v=p1rAyCQbUBU'
    }
  ];

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const publishedDate = new Date(dateString);
    const diffTime = Math.abs(now - publishedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const formatViewCount = (count) => {
    const num = parseInt(count);
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = (match[1] || '').replace('H', '');
    const minutes = (match[2] || '').replace('M', '');
    const seconds = (match[3] || '').replace('S', '');
    
    if (hours) {
      return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    }
    return `${minutes || '0'}:${seconds.padStart(2, '0')}`;
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

  const featuredVideo = videos[0];
  const otherVideos = videos.slice(1);

  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* Header Section */}
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h2 className="display-5 fw-bold mb-3">Latest from Our Channel</h2>
            <p className="lead text-muted mb-4">
              Stay updated with our latest car reviews, comparisons, and automotive insights
            </p>
          </div>
        </div>

        {videos.length > 0 && (
          <div className="row">
            {/* Featured Video - Large */}
            <div className="col-lg-8 mb-4">
              <div className="card border-0 shadow-lg featured-video">
                <div className="position-relative overflow-hidden rounded">
                  <img
                    src={featuredVideo.thumbnail}
                    alt={featuredVideo.title}
                    className="card-img featured-thumbnail"
                    style={{ height: '400px', objectFit: 'cover', width: '100%' }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x400/f8f9fa/6c757d?text=Featured+Video';
                    }}
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center video-overlay">
                    <div className="bg-dark bg-opacity-75 rounded-circle p-4">
                      <Play className="text-white" size={48} fill="white" />
                    </div>
                  </div>
                  <div className="position-absolute bottom-0 end-0 bg-dark bg-opacity-75 text-white px-3 py-2 m-3 rounded">
                    <span className="fw-bold">{featuredVideo.duration}</span>
                  </div>
                  <div className="position-absolute top-0 start-0 bg-danger text-white px-3 py-1 m-3 rounded">
                    <small className="fw-bold">LATEST</small>
                  </div>
                </div>
                
                <div className="card-body p-4">
                  <h3 className="card-title fw-bold mb-3 lh-base">
                    {featuredVideo.title}
                  </h3>
                  
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-danger rounded-circle text-white d-flex align-items-center justify-content-center me-3" 
                         style={{ width: '32px', height: '32px', fontSize: '14px' }}>
                      {featuredVideo.channelName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="fw-semibold">{featuredVideo.channelName}</div>
                      <div className="text-muted small">{featuredVideo.publishedAt}</div>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center text-muted">
                      <Eye size={16} className="me-2" />
                      <span className="me-4">{featuredVideo.views} Views</span>
                      <ThumbsUp size={16} className="me-2" />
                      <span className="me-4">{featuredVideo.likes} Likes</span>
                      <MessageCircle size={16} className="me-2" />
                      <span>{featuredVideo.comments} Comments</span>
                    </div>
                    <button className="btn btn-outline-secondary btn-sm">
                      <Share2 size={16} className="me-1" />
                      Share
                    </button>
                  </div>
                  
                  <button 
                    className="btn btn-danger btn-lg w-100 mt-3"
                    onClick={() => window.open(featuredVideo.videoUrl, '_blank')}
                  >
                    <Play size={20} className="me-2" fill="white" />
                    Watch Now
                  </button>
                </div>
              </div>
            </div>

            {/* Other Videos - Two Column Grid */}
            <div className="col-lg-4">
              <div className="d-flex flex-column gap-3">
                <h5 className="fw-bold mb-0">Up Next</h5>
                {otherVideos.slice(0, 6).map((video) => (
                  <div key={video.id} className="card border-0 shadow-sm video-card-small">
                    <div className="row g-0">
                      <div className="col-5">
                        <div className="position-relative overflow-hidden rounded-start">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="img-fluid video-thumbnail-small"
                            style={{ height: '80px', objectFit: 'cover', width: '100%' }}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/160x90/f8f9fa/6c757d?text=Video';
                            }}
                          />
                          <div className="position-absolute bottom-0 end-0 bg-dark bg-opacity-75 text-white px-1 rounded" style={{ fontSize: '10px' }}>
                            {video.duration}
                          </div>
                        </div>
                      </div>
                      <div className="col-7">
                        <div className="card-body p-2">
                          <h6 className="card-title mb-1 small fw-semibold" style={{ 
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: '1.2',
                            fontSize: '0.85rem'
                          }}>
                            {video.title}
                          </h6>
                          
                          <div className="d-flex align-items-center mb-1">
                            <div className="bg-danger rounded-circle text-white d-flex align-items-center justify-content-center me-1" 
                                 style={{ width: '12px', height: '12px', fontSize: '7px' }}>
                              {video.channelName.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-muted" style={{ fontSize: '0.7rem' }}>{video.channelName}</span>
                          </div>
                          
                          <div className="d-flex align-items-center text-muted" style={{ fontSize: '0.7rem' }}>
                            <Eye size={10} className="me-1" />
                            <span className="me-2">{video.views}</span>
                            <Clock size={10} className="me-1" />
                            <span>{video.publishedAt}</span>
                          </div>
                          
                          <button 
                            className="btn btn-outline-danger btn-sm mt-1 w-100"
                            style={{ fontSize: '0.7rem', padding: '2px 8px' }}
                            onClick={() => window.open(video.videoUrl, '_blank')}
                          >
                            Watch
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {videos.length === 0 && (
          <div className="text-center py-5">
            <h4 className="text-muted">No videos available</h4>
            <p className="text-muted">
              {YOUTUBE_API_KEY === 'YOUR_YOUTUBE_API_KEY_HERE' ? 
                'Please configure your YouTube API key and Channel ID to display videos from your channel.' :
                'Check back later for new content!'
              }
            </p>
          </div>
        )}

        {/* API Configuration Notice */}
        {YOUTUBE_API_KEY === 'YOUR_YOUTUBE_API_KEY_HERE' && (
          <div className="alert alert-info mt-4">
            <h6 className="alert-heading">YouTube API Configuration Required</h6>
            <p className="mb-0">
              To display videos from your YouTube channel, please:
              <br />1. Get a YouTube Data API key from Google Cloud Console
              <br />2. Replace <code>YOUR_YOUTUBE_API_KEY_HERE</code> with your API key
              <br />3. Replace <code>YOUR_CHANNEL_ID_HERE</code> with your YouTube channel ID
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        .featured-video {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .featured-video:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2) !important;
        }
        
        .featured-thumbnail {
          transition: transform 0.3s ease;
        }
        
        .video-overlay {
          opacity: 0;
          transition: opacity 0.3s ease;
          background: rgba(0,0,0,0.4);
          cursor: pointer;
        }
        
        .featured-video:hover .video-overlay {
          opacity: 1;
        }
        
        .featured-video:hover .featured-thumbnail {
          transform: scale(1.05);
        }
        
        .video-card-small {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
        }
        
        .video-card-small:hover {
          transform: translateX(5px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.1) !important;
        }
        
        .video-thumbnail-small {
          transition: transform 0.2s ease;
        }
        
        .video-card-small:hover .video-thumbnail-small {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
};

export default VideoSection;
