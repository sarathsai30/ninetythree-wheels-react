import {
  collection,
  getDocs,
  orderBy,
  query,
  deleteDoc,
  doc,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";

const COLLECTION_NAME = "youtube_videos";

// Helper to fetch all videos with pagination
async function fetchAllYouTubeVideos(apiKey, channelId) {
  let allVideos = [];
  let nextPageToken = "";

  try {
    do {
      const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=50&pageToken=${nextPageToken}&type=video`;
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (data.error) throw new Error(data.error.message || "YouTube API error");
      if (data.items) allVideos = allVideos.concat(data.items);

      nextPageToken = data.nextPageToken || "";
    } while (nextPageToken);

    return allVideos;
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    throw error;
  }
}

export const youtubeService = {
  // Fetch videos from Firestore
  async getYouTubeVideos() {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy("publishedAt", "desc"));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
      throw error;
    }
  },

  

  // Delete all Firestore docs and repopulate from YouTube API
  async refreshYouTubeVideos(apiKey, channelId) {
    // 1. Delete existing docs
    const querySnapshot = await getDocs(collection(db, "youtube_videos"));
    await Promise.all(querySnapshot.docs.map((d) => deleteDoc(doc(db, "youtube_videos", d.id))));

    // 2. Fetch all video IDs
    const videoIds = await fetchAllVideoIds(apiKey, channelId);

    // 3. Fetch all video details including statistics
    const videos = await fetchVideoDetails(apiKey, videoIds);

    // 4. Add to Firestore
    const addPromises = videos.map((v) =>
      addDoc(collection(db, "youtube_videos"), {
        videoId: v.id,
        title: v.snippet?.title || "",
        description: v.snippet?.description || "",
        publishedAt: v.snippet?.publishedAt ? Timestamp.fromDate(new Date(v.snippet.publishedAt)) : null,
        thumbnails: v.snippet?.thumbnails || {},
        views: Number(v.statistics?.viewCount || 0),
        likes: Number(v.statistics?.likeCount || 0),
      })
    );
    await Promise.all(addPromises);
  },

  
};

async function fetchAllVideoIds(apiKey, channelId) {
  let videoIds = [];
  let nextPageToken = "";

  do {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=id&order=date&type=video&maxResults=50&pageToken=${nextPageToken}`
    );
    const data = await res.json();
    if (data.error) throw new Error(data.error.message || "YouTube API error");

    const ids = data.items
      .filter((item) => item.id?.videoId)
      .map((item) => item.id.videoId);

    videoIds = videoIds.concat(ids);
    nextPageToken = data.nextPageToken || "";
  } while (nextPageToken);

  return videoIds;
}


async function fetchVideoDetails(apiKey, videoIds) {
  let videos = [];
  for (let i = 0; i < videoIds.length; i += 50) {
    const batchIds = videoIds.slice(i, i + 50).join(",");
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${batchIds}&part=snippet,statistics`
    );
    const data = await res.json();
    if (data.error) throw new Error(data.error.message || "YouTube API error");
    videos = videos.concat(data.items);
  }
  return videos;
}
