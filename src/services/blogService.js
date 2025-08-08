
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
const CONTENT_CHUNKS_COLLECTION = 'blog_content_chunks';
const MAX_CONTENT_SIZE = 800000; // 800KB to stay well under Firestore's 1MB limit

// Helper function to split large content into chunks
const splitContent = (content) => {
  if (!content || content.length <= MAX_CONTENT_SIZE) {
    return { chunks: [content], totalChunks: 1 };
  }
  
  const chunks = [];
  let currentIndex = 0;
  
  while (currentIndex < content.length) {
    chunks.push(content.slice(currentIndex, currentIndex + MAX_CONTENT_SIZE));
    currentIndex += MAX_CONTENT_SIZE;
  }
  
  return { chunks, totalChunks: chunks.length };
};

// Helper function to reconstruct content from chunks
const reconstructContent = async (blogId, totalChunks) => {
  if (totalChunks === 1) {
    return null; // Content is stored directly in the blog document
  }
  
  const chunkPromises = [];
  for (let i = 0; i < totalChunks; i++) {
    chunkPromises.push(getDocs(query(
      collection(db, CONTENT_CHUNKS_COLLECTION),
      orderBy('chunkIndex')
    )));
  }
  
  const chunks = [];
  const chunksQuery = query(
    collection(db, CONTENT_CHUNKS_COLLECTION),
    orderBy('chunkIndex')
  );
  const chunksSnapshot = await getDocs(chunksQuery);
  
  chunksSnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.blogId === blogId) {
      chunks[data.chunkIndex] = data.content;
    }
  });
  
  return chunks.join('');
};

export const blogService = {
  // Get all blogs
  async getAllBlogs() {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const blogs = [];
      
      for (const docSnapshot of querySnapshot.docs) {
        const blogData = docSnapshot.data();
        let content = blogData.content;
        
        // If content is chunked, reconstruct it
        if (blogData.isChunked && blogData.totalChunks > 1) {
          content = await reconstructContent(docSnapshot.id, blogData.totalChunks);
        }
        
        blogs.push({
          id: docSnapshot.id,
          ...blogData,
          content,
          createdAt: blogData.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          updatedAt: blogData.updatedAt?.toDate?.()?.toISOString()
        });
      }
      
      return blogs;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  },

  // Add a new blog
  async addBlog(blogData) {
    try {
      const { content, ...otherData } = blogData;
      const { chunks, totalChunks } = splitContent(content);
      
      const blogDoc = {
        ...otherData,
        content: totalChunks === 1 ? content : '', // Store content directly if small enough
        isChunked: totalChunks > 1,
        totalChunks,
        createdAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, COLLECTION_NAME), blogDoc);
      const blogId = docRef.id;
      
      // If content is chunked, store chunks separately
      if (totalChunks > 1) {
        const chunkPromises = chunks.map((chunk, index) => 
          addDoc(collection(db, CONTENT_CHUNKS_COLLECTION), {
            blogId,
            chunkIndex: index,
            content: chunk,
            createdAt: serverTimestamp()
          })
        );
        
        await Promise.all(chunkPromises);
      }
      
      return blogId;
    } catch (error) {
      console.error('Error adding blog:', error);
      throw error;
    }
  },

  // Update a blog
  async updateBlog(blogId, blogData) {
    try {
      const { content, ...otherData } = blogData;
      const { chunks, totalChunks } = splitContent(content);
      
      // Delete existing chunks if any
      const existingChunksQuery = query(collection(db, CONTENT_CHUNKS_COLLECTION));
      const existingChunksSnapshot = await getDocs(existingChunksQuery);
      const deletePromises = [];
      
      existingChunksSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.blogId === blogId) {
          deletePromises.push(deleteDoc(doc.ref));
        }
      });
      
      await Promise.all(deletePromises);
      
      const blogRef = doc(db, COLLECTION_NAME, blogId);
      const updateData = {
        ...otherData,
        content: totalChunks === 1 ? content : '',
        isChunked: totalChunks > 1,
        totalChunks,
        updatedAt: serverTimestamp()
      };
      
      await updateDoc(blogRef, updateData);
      
      // If content is chunked, store new chunks
      if (totalChunks > 1) {
        const chunkPromises = chunks.map((chunk, index) => 
          addDoc(collection(db, CONTENT_CHUNKS_COLLECTION), {
            blogId,
            chunkIndex: index,
            content: chunk,
            createdAt: serverTimestamp()
          })
        );
        
        await Promise.all(chunkPromises);
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  },

  // Delete a blog
  async deleteBlog(blogId) {
    try {
      // Delete associated content chunks first
      const chunksQuery = query(collection(db, CONTENT_CHUNKS_COLLECTION));
      const chunksSnapshot = await getDocs(chunksQuery);
      const deletePromises = [];
      
      chunksSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.blogId === blogId) {
          deletePromises.push(deleteDoc(doc.ref));
        }
      });
      
      await Promise.all(deletePromises);
      
      // Delete the main blog document
      await deleteDoc(doc(db, COLLECTION_NAME, blogId));
    } catch (error) {
      console.error('Error deleting blog:', error);
      throw error;
    }
  }
};
