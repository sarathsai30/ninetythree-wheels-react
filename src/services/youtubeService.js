import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query, writeBatch } from 'firebase/firestore';
import { db } from '../firebase/config';

const COLLECTION_NAME = 'youtube_videos';

export const youtubeService = {
  // Get all YouTube videos from Firebase
  async getYouTubeVideos() {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('publishedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      throw error;
    }
  },

  // Fetch videos from YouTube API and store in Firebase
  async fetchAndStoreYouTubeVideos(apiKey, channelId) {
    try {
      // Fetch videos from YouTube Data API
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=50&type=video`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch YouTube videos');
      }
      
      const data = await response.json();
      
      // Fetch additional video statistics
      const videoIds = data.items.map(item => item.id.videoId).join(',');
      const statsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=statistics,contentDetails`
      );
      
      const statsData = await statsResponse.json();
      
      // Combine video data with statistics
      const videosWithStats = data.items.map((item, index) => {
        const stats = statsData.items[index];
        return {
          youtubeId: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
          channelName: item.snippet.channelTitle,
          publishedAt: new Date(item.snippet.publishedAt),
          views: parseInt(stats?.statistics?.viewCount || '0'),
          likes: parseInt(stats?.statistics?.likeCount || '0'),
          comments: parseInt(stats?.statistics?.commentCount || '0'),
          duration: stats?.contentDetails?.duration || 'PT0M0S',
          videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          createdAt: new Date(),
          updatedAt: new Date()
        };
      });
      
      // Store videos in Firebase using batch write
      const batch = writeBatch(db);
      const collectionRef = collection(db, COLLECTION_NAME);
      
      videosWithStats.forEach((video) => {
        const docRef = doc(collectionRef);
        batch.set(docRef, video);
      });
      
      await batch.commit();
      
      return videosWithStats.length;
    } catch (error) {
      console.error('Error fetching and storing YouTube videos:', error);
      throw error;
    }
  },

  // Delete all YouTube videos from Firebase
  async deleteAllYouTubeVideos() {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      
      if (querySnapshot.empty) {
        return 0;
      }
      
      const batch = writeBatch(db);
      
      querySnapshot.docs.forEach((docSnapshot) => {
        batch.delete(docSnapshot.ref);
      });
      
      await batch.commit();
      
      return querySnapshot.docs.length;
    } catch (error) {
      console.error('Error deleting YouTube videos:', error);
      throw error;
    }
  },

  // Helper functions for formatting
  formatTimeAgo(date) {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  },

  formatViewCount(count) {
    const num = parseInt(count);
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  },

  formatDuration(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = (match[1] || '').replace('H', '');
    const minutes = (match[2] || '').replace('M', '');
    const seconds = (match[3] || '').replace('S', '');
    
    if (hours) {
      return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    }
    return `${minutes || '0'}:${seconds.padStart(2, '0')}`;
  }
};