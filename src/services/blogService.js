
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  orderBy, 
  query,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';

const COLLECTION_NAME = 'blogs';

export const blogService = {
  // Get all blogs
  async getAllBlogs() {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const blogs = [];
      querySnapshot.forEach((doc) => {
        blogs.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString()
        });
      });
      return blogs;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  },

  // Add a new blog
  async addBlog(blogData) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...blogData,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding blog:', error);
      throw error;
    }
  },

  // Update a blog
  async updateBlog(blogId, blogData) {
    try {
      const blogRef = doc(db, COLLECTION_NAME, blogId);
      await updateDoc(blogRef, {
        ...blogData,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  },

  // Delete a blog
  async deleteBlog(blogId) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, blogId));
    } catch (error) {
      console.error('Error deleting blog:', error);
      throw error;
    }
  }
};
