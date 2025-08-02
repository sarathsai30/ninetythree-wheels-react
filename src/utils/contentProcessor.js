// Utility functions for processing blog content

// Convert YouTube URL to embedded format
export const convertYouTubeToEmbed = (url) => {
  if (!url) return '';
  
  // Handle different YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }
  
  return url; // Return original if not a YouTube URL
};

// Extract YouTube video ID from URL
export const getYouTubeVideoId = (url) => {
  if (!url) return null;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return null;
};

// Process content to embed YouTube videos automatically
export const processContentWithEmbeds = (content) => {
  if (!content) return '';
  
  // Replace YouTube URLs with embedded iframes
  const youtubeUrlPattern = /(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+))/g;
  
  let processedContent = content.replace(youtubeUrlPattern, (match, fullUrl, videoId) => {
    return `
      <div class="youtube-embed-wrapper" style="position: relative; padding-bottom: 56.25%; height: 0; margin: 20px 0;">
        <iframe 
          src="https://www.youtube.com/embed/${videoId}" 
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" 
          allowfullscreen
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
        </iframe>
      </div>
    `;
  });
  
  return processedContent;
};

// Sanitize and process HTML content for safe rendering
export const sanitizeAndProcessHTML = (html) => {
  if (!html) return '';
  
  // First process YouTube embeds
  let processedHtml = processContentWithEmbeds(html);
  
  // Ensure proper table styling for Bootstrap
  processedHtml = processedHtml.replace(/<table/g, '<table class="table table-bordered table-striped"');
  
  // Ensure proper styling for other HTML elements
  processedHtml = processedHtml.replace(/<blockquote/g, '<blockquote class="blockquote border-start border-warning border-4 ps-3 ms-3"');
  
  return processedHtml;
};