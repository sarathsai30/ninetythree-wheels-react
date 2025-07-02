
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';

const COLLECTION_NAME = 'videos';

export const videoService = {
  // Get all videos
  async getVideos() {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('order', 'asc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }
  },

  // Add new video
  async addVideo(videoData) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...videoData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding video:', error);
      throw error;
    }
  },

  // Update video
  async updateVideo(id, videoData) {
    try {
      const videoRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(videoRef, {
        ...videoData,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating video:', error);
      throw error;
    }
  },

  // Delete video
  async deleteVideo(id) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      console.error('Error deleting video:', error);
      throw error;
    }
  }
};
