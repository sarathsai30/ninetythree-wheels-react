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
  
  // Replace YouTube URLs with embedded iframes (smaller size) - improved pattern to capture query parameters
  const youtubeUrlPattern = /(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/))([a-zA-Z0-9_-]+)(?:[^\s<]*)?/g;
  
  let processedContent = content.replace(youtubeUrlPattern, (match, baseUrl, videoId) => {
    return `
      <div class="youtube-embed-wrapper" style="position: relative; padding-bottom: 42%; height: 0; margin: 20px 0; max-width: 600px;">
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

// Load Instagram embed script if needed
export const loadInstagramScript = () => {
  if (!window.instgrm && !document.querySelector('script[src*="instagram.com/embed.js"]')) {
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.onload = () => {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      }
    };
    document.head.appendChild(script);
  } else if (window.instgrm && window.instgrm.Embeds) {
    // Reload Instagram embeds if script already exists
    window.instgrm.Embeds.process();
  }
};

// Sanitize and process HTML content for safe rendering
export const sanitizeAndProcessHTML = (html) => {
  if (!html) return '';
  
  // First process YouTube embeds
  let processedHtml = processContentWithEmbeds(html);
  
  // Ensure proper table styling for Bootstrap
  processedHtml = processedHtml.replace(/<table/g, '<table class="table table-bordered table-striped"');
  
  // Ensure proper styling for other HTML elements but preserve Instagram blockquotes
  processedHtml = processedHtml.replace(/<blockquote(?![^>]*instagram-media)/g, '<blockquote class="blockquote border-start border-warning border-4 ps-3 ms-3"');
  
  // Reduce Instagram embed size and load script
  if (processedHtml.includes('instagram-media')) {
    // Add styling to reduce Instagram embed size
    processedHtml = processedHtml.replace(
      /<blockquote class="instagram-media"/g, 
      '<blockquote class="instagram-media" style="max-width: 540px; min-width: 280px; width: 100% !important;"'
    );
    
    // Load Instagram script with a delay to ensure DOM is ready
    setTimeout(() => {
      loadInstagramScript();
    }, 500);
  }
  
  return processedHtml;
};