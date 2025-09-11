import React, { useState, useEffect } from 'react';
import { Play, Eye, Clock, ThumbsUp, MessageCircle, RefreshCw, Trash2, Settings } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { youtubeService } from '../services/youtubeService';
import { useAdmin } from '../hooks/useAdmin';

const YouTube = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [featuredVideoIndex, setFeaturedVideoIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [channelId, setChannelId] = useState('');
  
  const { isAdmin } = useAdmin();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setIsLoading(true);
      const fetchedVideos = await youtubeService.getYouTubeVideos();
      setVideos(fetchedVideos);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setVideos([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshData = async () => {
    if (!apiKey || !channelId) {
      alert('Please enter both API Key and Channel ID');
      return;
    }

    try {
      setIsRefreshing(true);
      const count = await youtubeService.fetchAndStoreYouTubeVideos(apiKey, channelId);
      alert(`Successfully fetched and stored ${count} videos!`);
      await fetchVideos();
    } catch (error) {
      console.error('Error refreshing data:', error);
      alert('Error fetching YouTube data. Please check your API key and channel ID.');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDeleteAllData = async () => {
    if (!confirm('Are you sure you want to delete all YouTube video data? This action cannot be undone.')) {
      return;
    }

    try {
      setIsDeleting(true);
      const count = await youtubeService.deleteAllYouTubeVideos();
      alert(`Successfully deleted ${count} videos!`);
      await fetchVideos();
    } catch (error) {
      console.error('Error deleting data:', error);
      alert('Error deleting YouTube data.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-[105px] bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading YouTube videos...</p>
          </div>
        </div>
      </div>
    );
  }

  const getEmbedUrl = (videoUrl) => {
    const videoId = videoUrl.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
  };

  const featuredVideo = videos[featuredVideoIndex];
  const otherVideos = videos.filter((_, index) => index !== featuredVideoIndex);

  const handleVideoSelect = (videoIndex) => {
    setFeaturedVideoIndex(videoIndex);
  };

  return (
    <div className="min-h-screen pt-[105px] bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">YouTube Videos</h1>
          <p className="text-lg text-gray-600 mb-6">
            Watch our latest car reviews, comparisons, and automotive content
          </p>
          
          {/* Admin Controls */}
          {isAdmin && (
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Admin Controls</h3>
                <button
                  onClick={() => setShowAdminPanel(!showAdminPanel)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Settings size={16} />
                  {showAdminPanel ? 'Hide' : 'Show'} Settings
                </button>
              </div>
              
              {showAdminPanel && (
                <div className="space-y-4 border-t pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">YouTube API Key</label>
                      <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter YouTube API Key"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">YouTube Channel ID</label>
                      <input
                        type="text"
                        value={channelId}
                        onChange={(e) => setChannelId(e.target.value)}
                        placeholder="Enter Channel ID"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleRefreshData}
                  disabled={isRefreshing}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                >
                  <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                  {isRefreshing ? 'Fetching...' : 'Fetch Latest Videos'}
                </button>
                
                <button
                  onClick={handleDeleteAllData}
                  disabled={isDeleting}
                  className="flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                  {isDeleting ? 'Deleting...' : 'Delete All Data'}
                </button>
              </div>
            </div>
          )}
        </div>

        {videos.length > 0 && featuredVideo && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Featured Video - Large */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative">
                  <iframe
                    src={getEmbedUrl(featuredVideo.videoUrl)}
                    title={featuredVideo.title}
                    className="w-full h-[400px]"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded">
                    <span className="font-bold">{youtubeService.formatDuration(featuredVideo.duration)}</span>
                  </div>
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded">
                    <small className="font-bold">FEATURED</small>
                  </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4 leading-tight">
                    {featuredVideo.title}
                  </h2>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <img 
                        src="/lovable-uploads/c46e1522-af82-4a23-9984-0f13ea99096e.png"
                        alt="93Cars logo"
                        className="w-8 h-8 rounded-full mr-3 object-cover"
                      />
                      <div>
                        <div className="font-semibold">{featuredVideo.channelName}</div>
                        <div className="text-gray-500 text-sm">{youtubeService.formatTimeAgo(new Date(featuredVideo.publishedAt))}</div>
                      </div>
                    </div>
                    <button 
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      onClick={() => window.open('https://www.youtube.com/@93CarsOfficial?sub_confirmation=1', '_blank')}
                    >
                      Subscribe
                    </button>
                  </div>
                  
                  <div className="flex items-center text-gray-600 space-x-6">
                    <div className="flex items-center">
                      <Eye size={16} className="mr-2" />
                      <span>{youtubeService.formatViewCount(featuredVideo.views)} Views</span>
                    </div>
                    <div className="flex items-center">
                      <ThumbsUp size={16} className="mr-2" />
                      <span>{youtubeService.formatViewCount(featuredVideo.likes)} Likes</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle size={16} className="mr-2" />
                      <span>{youtubeService.formatViewCount(featuredVideo.comments)} Comments</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Videos - Scrollable List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4">More Videos</h3>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    {otherVideos.map((video, idx) => {
                      const originalIndex = videos.findIndex(v => v.id === video.id);
                      return (
                        <div 
                          key={video.id} 
                          className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => handleVideoSelect(originalIndex)}
                        >
                          <div className="relative flex-shrink-0">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-24 h-16 object-cover rounded"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/160x90/f8f9fa/6c757d?text=Video';
                              }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-black bg-opacity-75 rounded-full p-1">
                                <Play className="text-white w-3 h-3" fill="white" />
                              </div>
                            </div>
                            <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white px-1 rounded text-xs">
                              {youtubeService.formatDuration(video.duration)}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold line-clamp-2 mb-1">
                              {video.title}
                            </h4>
                            <div className="flex items-center mb-1">
                              <img 
                                src="/lovable-uploads/c46e1522-af82-4a23-9984-0f13ea99096e.png"
                                alt="93Cars logo"
                                className="w-3 h-3 rounded-full mr-1"
                              />
                              <span className="text-xs text-gray-500">{video.channelName}</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-500 space-x-2">
                              <div className="flex items-center">
                                <Eye size={8} className="mr-1" />
                                <span>{youtubeService.formatViewCount(video.views)}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock size={8} className="mr-1" />
                                <span>{youtubeService.formatTimeAgo(new Date(video.publishedAt))}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        )}

        {videos.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">No YouTube Videos Available</h3>
              <p className="text-gray-600 mb-6">
                {isAdmin ? 
                  'Use the admin controls above to fetch videos from your YouTube channel.' :
                  'Check back later for new video content!'
                }
              </p>
              {!isAdmin && (
                <button 
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
                  onClick={() => window.open('https://www.youtube.com/@93CarsOfficial', '_blank')}
                >
                  Visit Our YouTube Channel
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTube;
