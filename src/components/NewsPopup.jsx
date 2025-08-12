import React, { useState, useEffect } from 'react';
import { X, Calendar, ExternalLink } from 'lucide-react';
import { blogService } from '../services/blogService';

const NewsPopup = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const fetchedBlogs = await blogService.getAllBlogs();
        setNews(fetchedBlogs.slice(0, 2)); // Get latest 2 news items
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  useEffect(() => {
    // Check if popup was previously closed
    const wasClosedBefore = localStorage.getItem('newsPopupClosed');
    if (wasClosedBefore) {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('newsPopupClosed', 'true');
  };

  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (!isVisible || loading || news.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 z-50 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden animate-slideInRight">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 flex justify-between items-center">
        <h3 className="font-bold text-sm flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
          Latest Car News
        </h3>
        <button
          onClick={handleClose}
          className="text-white hover:text-gray-200 transition-colors p-1 hover:bg-white/20 rounded"
        >
          <X size={16} />
        </button>
      </div>

      {/* News Items */}
      <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
        {news.map((item, index) => (
          <div key={item.id} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
            <div className="flex gap-3">
              {/* Thumbnail */}
              <div className="w-16 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded flex-shrink-0 overflow-hidden">
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <span className="text-xs text-blue-600 font-bold">93</span>
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-gray-900 leading-tight mb-1 hover:text-blue-600 cursor-pointer">
                  {truncateText(item.title, 60)}
                </h4>
                <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                  {truncateText(stripHtml(item.content), 80)}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar size={10} />
                    <span>{new Date(item.createdAt).toLocaleDateString('en-GB', { 
                      day: '2-digit', 
                      month: 'short'
                    })}</span>
                  </div>
                  <a 
                    href={`/news/${item.slug || item.id}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-3 border-t border-gray-100">
        <a 
          href="/news" 
          className="text-center block text-blue-600 hover:text-blue-700 font-semibold text-xs transition-colors"
        >
          View All News →
        </a>
      </div>
    </div>
  );
};

export default NewsPopup;