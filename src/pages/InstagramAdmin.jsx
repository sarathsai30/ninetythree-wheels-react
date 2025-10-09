// import React, { useState, useEffect } from "react";
// import { instagramService } from "../firebase/instagramService";

// // ⚠️ Replace these with your actual values
// const INSTAGRAM_ACCESS_TOKEN = "EAAQJDUYYiccBPpAynTkAKSTsFYfTnZCnCQHRUuah54qFOzQ0rBogaS0ks7sqmnKgavfuA6AAvQT2Bd8heOnk0Fhqt5ZBT6R7ln4AKSnmSfMFJ99HUnSrfGLqi1AfqtZAa8JVLsKHwAfSzwhKZAZCJ1xXJTEN128VHONUxSBqKju7PHXQheZCVhTRj0S8O1uTZAkVRdXZBxZA27f1qNuOI7B3T5WZB3L8ZBcLrc0d2hSedWCCUEvlwZDZD";
// const INSTAGRAM_BUSINESS_ID = "17841475005806934"; // Get this from your page → instagram_business_account.id

// const InstagramAdmin = () => {
//   const [loading, setLoading] = useState(false);
//   const [posts, setPosts] = useState([]);

//   const loadPosts = async () => {
//     try {
//       setLoading(true);
//       const data = await instagramService.getInstagramPosts();
//       setPosts(data);
//     } catch (err) {
//       console.error("Error loading Instagram posts:", err);
//       alert("Failed to load Instagram posts.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadPosts();
//   }, []);

//   const handleRefresh = async () => {
//     try {
//       setLoading(true);
//       await instagramService.refreshInstagramPosts(INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_BUSINESS_ID);
//       await loadPosts();
//       alert("Instagram posts refreshed successfully!");
//     } catch (err) {
//       console.error("Error refreshing Instagram posts:", err);
//       alert("Failed to refresh Instagram posts.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownloadJSON = () => {
//     if (!posts || posts.length === 0) {
//       alert("No posts to download.");
//       return;
//     }
//     const blob = new Blob([JSON.stringify(posts, null, 2)], { type: "application/json" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "instagram_posts.json";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="p-4 md:p-6">
//       <h2 className="text-2xl font-bold mb-4">Manage Instagram Posts</h2>

//       <div className="flex flex-wrap items-center mb-6 justify-between">
//         <div className="flex flex-wrap gap-3">
//           <button
//             className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md disabled:opacity-50 transition"
//             onClick={loadPosts}
//             disabled={loading}
//           >
//             {loading ? "Loading..." : "Load Posts"}
//           </button>

//           <button
//             className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md disabled:opacity-50 transition"
//             onClick={handleRefresh}
//             disabled={loading}
//           >
//             {loading ? "Refreshing..." : "Refresh Instagram Posts"}
//           </button>
//         </div>

//         <button
//           className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md"
//           onClick={handleDownloadJSON}
//         >
//           Download JSON
//         </button>
//       </div>

//       <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
//         <table className="min-w-full divide-y divide-gray-200 bg-white">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">S.No</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Caption</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Likes</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Comments</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Media</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Published</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Link</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {posts.length === 0 ? (
//               <tr>
//                 <td colSpan="8" className="px-4 py-6 text-center text-gray-500">
//                   No posts loaded
//                 </td>
//               </tr>
//             ) : (
//               posts.map((post, index) => (
//                 <tr key={post.id} className="hover:bg-gray-50 transition-colors">
//                   <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
//                   <td className="px-4 py-3 text-sm text-gray-800 font-medium">
//                     {post.caption || "—"}
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">{post.mediaType}</td>
//                   <td className="px-4 py-3 text-sm text-gray-600">{post.likeCount}</td>
//                   <td className="px-4 py-3 text-sm text-gray-600">{post.commentsCount}</td>
//                   <td className="px-4 py-3 text-sm text-gray-600">
//                     {post.mediaType === "IMAGE" || post.mediaType === "CAROUSEL_ALBUM" ? (
//                       <img src={post.mediaUrl} alt="media" className="w-24 rounded" />
//                     ) : (
//                       <video src={post.mediaUrl} controls className="w-24 rounded" />
//                     )}
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">
//                     {post.timestamp?.seconds
//                       ? new Date(post.timestamp.seconds * 1000).toLocaleString()
//                       : "N/A"}
//                   </td>
//                   <td className="px-4 py-3 text-sm text-blue-600">
//                     <a href={post.permalink} target="_blank" rel="noopener noreferrer" className="hover:underline">
//                       View
//                     </a>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default InstagramAdmin;
