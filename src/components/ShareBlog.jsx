import React, { useState } from 'react';
import { Share2, MessageCircle, Copy, Check } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';

const ShareBlog = ({ blog }) => {
  const [copied, setCopied] = useState(false);
  
  if (!blog) return null;
  
  const blogUrl = `${window.location.origin}/news/${blog.slug || blog.id}`;
  const whatsappText = `Check out this article: ${blog.title}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText + ' - ' + blogUrl)}`;
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(blogUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 size={16} />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-2">Share this article</h4>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <input 
                type="text" 
                value={blogUrl} 
                readOnly 
                className="flex-1 bg-transparent text-sm text-gray-600 outline-none"
              />
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 px-3 py-1 bg-white border rounded hover:bg-gray-50 transition-colors"
              >
                {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                <span className="text-xs">{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 mb-3">Share on social media:</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              <MessageCircle size={16} />
              Share on WhatsApp
            </a>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ShareBlog;