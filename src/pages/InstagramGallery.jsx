// import React, { useEffect, useState } from "react";
// import { Heart, MessageCircle } from "lucide-react";
// import { instagramService } from "../firebase/instagramService"; // adjust path

// const formatCount = (count) => {
//   const num = parseInt(count);
//   if (isNaN(num)) return "0";
//   if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
//   if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
//   return num.toString();
// };

// const formatTimeAgo = (input) => {
//   if (!input) return "";
//   let date;

//   if (input?.toDate) date = input.toDate();
//   else if (input?.seconds) date = new Date(input.seconds * 1000);
//   else if (typeof input === "string") date = new Date(input);
//   else if (input instanceof Date) date = input;
//   else return "";

//   if (isNaN(date.getTime())) return "";

//   const diff = Date.now() - date.getTime();
//   const seconds = Math.floor(diff / 1000);
//   if (seconds < 60) return "just now";

//   const minutes = Math.floor(seconds / 60);
//   if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;

//   const hours = Math.floor(minutes / 60);
//   if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

//   const days = Math.floor(hours / 24);
//   if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
//   if (days < 30) return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? "s" : ""} ago`;
//   if (days < 365) return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? "s" : ""} ago`;

//   return `${Math.floor(days / 365)} year${Math.floor(days / 365) > 1 ? "s" : ""} ago`;
// };

// const InstagramGallery = () => {
//   const [posts, setPosts] = useState([]);
//   const [query, setQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);

//   const pageSize = 12;

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         setLoading(true);
//         const data = await instagramService.getInstagramPosts();
//         setPosts(data);
//       } catch (err) {
//         console.error("Error fetching Instagram posts:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPosts();
//   }, []);

//   const filteredPosts = posts.filter(
//     (p) =>
//       (p.caption && p.caption.toLowerCase().includes(query.toLowerCase())) ||
//       (p.permalink && p.permalink.toLowerCase().includes(query.toLowerCase()))
//   );

//   const totalPages = Math.ceil(filteredPosts.length / pageSize);
//   const startIndex = (currentPage - 1) * pageSize;
//   const currentPosts = filteredPosts.slice(startIndex, startIndex + pageSize);

//   const showingFrom = filteredPosts.length === 0 ? 0 : startIndex + 1;
//   const showingTo = Math.min(startIndex + pageSize, filteredPosts.length);

//   const goto = (page) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

//   const getPageList = () => {
//     const pages = [];
//     if (totalPages <= 7) {
//       for (let i = 1; i <= totalPages; i++) pages.push(i);
//     } else if (currentPage <= 4) {
//       pages.push(1, 2, 3, 4, 5, "...", totalPages);
//     } else if (currentPage >= totalPages - 3) {
//       pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
//     } else {
//       pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
//     }
//     return pages;
//   };

//   if (loading) return <div className="text-center py-6">Loading Instagram posts…</div>;

//   return (
//     <div>
//       {/* Search */}
//       <div className="mb-6">
//         <input
//           value={query}
//           onChange={(e) => {
//             setQuery(e.target.value);
//             setCurrentPage(1);
//           }}
//           type="text"
//           placeholder="Search Instagram posts..."
//           className="w-full border rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
//         {currentPosts.length === 0 ? (
//           <div className="col-span-full text-center text-gray-500 text-sm sm:text-base">
//             No posts found
//           </div>
//         ) : (
//           currentPosts.map((post, idx) => {
//             const key = `${post.id}-${startIndex + idx}`;
//             return (
//               <div
//                 key={key}
//                 className="w-full max-w-xs rounded-xl shadow hover:shadow-lg overflow-hidden border bg-white"
//               >
//                 {/* Media */}
//                 <div
//                   className="relative cursor-pointer"
//                   onClick={() =>
//                     post.permalink && window.open(post.permalink, "_blank", "noopener,noreferrer")
//                   }
//                 >
//                   {post.mediaType === "VIDEO" ? (
//                     <video
//                       src={post.mediaUrl}
//                       className="w-full aspect-square object-cover"
//                       muted
//                       playsInline
//                       controls
//                     />
//                   ) : (
//                     <img
//                       src={post.mediaUrl}
//                       alt={post.caption || "Instagram post"}
//                       className="w-full aspect-square object-cover"
//                     />
//                   )}
//                 </div>

//                 {/* Content */}
//                 <div className="p-3 sm:p-4">
//                   <p className="text-sm font-medium mb-2 line-clamp-2">
//                     {post.caption || "Instagram Post"}
//                   </p>

//                   <div className="flex items-center justify-between text-xs text-gray-600">
//                     <span>{formatTimeAgo(post.timestamp)}</span>
//                   </div>

//                   <div className="border-t my-2"></div>

//                   <div className="flex items-center justify-between text-xs text-gray-600">
//                     <span className="flex items-center gap-1">
//                       <Heart size={14} /> {formatCount(post.likeCount)} Likes
//                     </span>
//                     <span className="flex items-center gap-1 flex-shrink-0">
//                       <MessageCircle size={14} /> {formatCount(post.commentsCount)} Comments
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>

//       {/* Pagination */}
//       <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//         <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
//           Showing {showingFrom}–{showingTo} of {filteredPosts.length} posts
//         </div>

//         {totalPages > 1 && (
//           <nav className="flex flex-wrap items-center justify-center gap-1 sm:gap-2" aria-label="Pagination">
//             <button onClick={() => goto(1)} disabled={currentPage === 1} className="px-2 sm:px-3 py-1 border rounded text-xs sm:text-sm disabled:opacity-50">«</button>
//             <button onClick={() => goto(currentPage - 1)} disabled={currentPage === 1} className="px-2 sm:px-3 py-1 border rounded text-xs sm:text-sm disabled:opacity-50">Prev</button>

//             {getPageList().map((p, i) =>
//               typeof p === "number" ? (
//                 <button key={i} onClick={() => goto(p)} className={`px-2 sm:px-3 py-1 border rounded text-xs sm:text-sm ${currentPage === p ? "bg-blue-600 text-white" : ""}`}>{p}</button>
//               ) : (
//                 <span key={i} className="px-2 sm:px-3 py-1 text-xs sm:text-sm">…</span>
//               )
//             )}

//             <button onClick={() => goto(currentPage + 1)} disabled={currentPage === totalPages} className="px-2 sm:px-3 py-1 border rounded text-xs sm:text-sm disabled:opacity-50">Next</button>
//             <button onClick={() => goto(totalPages)} disabled={currentPage === totalPages} className="px-2 sm:px-3 py-1 border rounded text-xs sm:text-sm disabled:opacity-50">»</button>
//           </nav>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InstagramGallery;
