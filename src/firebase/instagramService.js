// import {
//   collection,
//   getDocs,
//   orderBy,
//   query,
//   deleteDoc,
//   doc,
//   addDoc,
//   Timestamp,
// } from "firebase/firestore";
// import { db } from "./config";

// const COLLECTION_NAME = "instagram_posts";

// /**
//  * Fetch all Instagram media (images, videos, reels, carousel)
//  */
// async function fetchAllInstagramMedia(accessToken, instagramBusinessId) {
//   let allMedia = [];
//   let nextUrl = `https://graph.facebook.com/v23.0/${instagramBusinessId}/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${accessToken}`;

//   try {
//     while (nextUrl) {
//       const res = await fetch(nextUrl);
//       const data = await res.json();
//       if (data.error) throw new Error(data.error.message || "Instagram API error");
//       if (data.data) allMedia = allMedia.concat(data.data);
//       nextUrl = data.paging?.next || null;
//     }
//     return allMedia;
//   } catch (error) {
//     console.error("Error fetching Instagram media:", error);
//     throw error;
//   }
// }

// /**
//  * Fetch like_count and comments_count for each media item
//  */
// async function fetchMediaInsights(accessToken, mediaId) {
//   try {
//     const res = await fetch(
//       `https://graph.facebook.com/v20.0/${mediaId}?fields=like_count,comments_count&access_token=${accessToken}`
//     );
//     const data = await res.json();
//     if (data.error) throw new Error(data.error.message);
//     return {
//       like_count: data.like_count || 0,
//       comments_count: data.comments_count || 0,
//     };
//   } catch (error) {
//     console.error(`Error fetching insights for media ${mediaId}:`, error);
//     return { like_count: 0, comments_count: 0 };
//   }
// }

// export const instagramService = {
//   /**
//    * Load posts from Firestore
//    */
//   async getInstagramPosts() {
//     try {
//       const q = query(collection(db, COLLECTION_NAME), orderBy("timestamp", "desc"));
//       const snapshot = await getDocs(q);
//       return snapshot.docs.map((d) => ({
//         id: d.id,
//         ...d.data(),
//       }));
//     } catch (error) {
//       console.error("Error fetching Instagram posts:", error);
//       throw error;
//     }
//   },

//   /**
//    * Refresh Firestore collection with fresh data from Instagram
//    */
//   async refreshInstagramPosts(accessToken, instagramBusinessId) {
//     // 1. Delete old docs
//     const snapshot = await getDocs(collection(db, COLLECTION_NAME));
//     await Promise.all(snapshot.docs.map((d) => deleteDoc(doc(db, COLLECTION_NAME, d.id))));

//     // 2. Fetch posts
//     const posts = await fetchAllInstagramMedia(accessToken, instagramBusinessId);

//     // 3. Fetch insights for each post
//     const postsWithInsights = await Promise.all(
//       posts.map(async (p) => {
//         const insights = await fetchMediaInsights(accessToken, p.id);
//         return {
//           ...p,
//           like_count: insights.like_count,
//           comments_count: insights.comments_count,
//         };
//       })
//     );

//     // 4. Save to Firestore
//     const addPromises = postsWithInsights.map((p) =>
//       addDoc(collection(db, COLLECTION_NAME), {
//         mediaId: p.id,
//         caption: p.caption || "",
//         mediaType: p.media_type,
//         mediaUrl: p.media_url,
//         permalink: p.permalink,
//         likeCount: p.like_count || 0,
//         commentsCount: p.comments_count || 0,
//         timestamp: p.timestamp ? Timestamp.fromDate(new Date(p.timestamp)) : null,
//       })
//     );

//     await Promise.all(addPromises);
//   },
// };
