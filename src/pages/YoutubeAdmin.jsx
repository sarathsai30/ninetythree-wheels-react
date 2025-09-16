import React, { useState, useEffect } from "react";
import { youtubeService } from "../firebase/YoutubeService"; // adjust path

const YOUTUBE_API_KEY = "AIzaSyAQ34xD5mF6-WxcvRMHVAG-_hsmETAjDBQ";
const CHANNEL_ID = "UCr9--Ai4SYN00hQ_Sj0wn2w";

const YoutubeAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);

  // Load videos from Firestore
  const loadVideos = async () => {
    try {
      setLoading(true);
      const data = await youtubeService.getYouTubeVideos();
      setVideos(data);
    } catch (err) {
      console.error("Error loading videos:", err);
      alert("Failed to load YouTube videos.");
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
    loadVideos();
  }, []);

  // Refresh Firestore data
  const handleRefresh = async () => {
    try {
      setLoading(true);
      await youtubeService.refreshYouTubeVideos(YOUTUBE_API_KEY, CHANNEL_ID);
      await loadVideos();
      alert("YouTube videos refreshed successfully!");
    } catch (err) {
      console.error("Error refreshing videos:", err);
      alert("Error refreshing YouTube videos. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  

  // Download Firestore data as JSON
  const handleDownloadJSON = () => {
    if (!videos || videos.length === 0) {
      alert("No videos to download.");
      return;
    }
    const blob = new Blob([JSON.stringify(videos, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "youtube_videos.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-4">Manage YouTube Videos</h2>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center mb-6 justify-between">
        <div className="flex flex-wrap gap-3">
            <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md disabled:opacity-50 transition"
            onClick={loadVideos}
            disabled={loading}
            >
            {loading ? "Loading..." : "Load Videos"}
            </button>

            <button
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md disabled:opacity-50 transition"
            onClick={handleRefresh}
            disabled={loading}
            >
            {loading ? "Refreshing..." : "Refresh YouTube Videos"}
            </button>
        </div>

        <button
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md disabled:opacity-50 transition"
            onClick={handleDownloadJSON}
        >
            Download JSON
        </button>
    </div>


      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
  <table className="min-w-full divide-y divide-gray-200 bg-white">
    <thead className="bg-gray-100">
      <tr>
        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">S.No</th>
        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Views</th>
        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Likes</th>
        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Published At</th>
        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Video ID</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {videos.length === 0 ? (
        <tr>
          <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
            No videos loaded
          </td>
        </tr>
      ) : (
        videos.map((video, index) => (
          <tr key={video.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
            <td className="px-4 py-3 text-sm text-gray-800 font-medium">{video.title}</td>
            <td className="px-4 py-3 text-sm text-gray-600">{video.views || 0}</td>
            <td className="px-4 py-3 text-sm text-gray-600">{video.likes || 0}</td>
            <td className="px-4 py-3 text-sm text-gray-600">
              {video.publishedAt?.seconds
                ? new Date(video.publishedAt.seconds * 1000).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "N/A"}
            </td>
            <td className="px-4 py-3 text-sm text-blue-600">
              {video.videoId ? (
                <a
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {video.videoId}
                </a>
              ) : (
                "N/A"
              )}
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>
</div>
  );
};

export default YoutubeAdmin;
