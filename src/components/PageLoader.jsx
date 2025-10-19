import React from 'react';
import { Car } from 'lucide-react';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary via-purple-600 to-primary z-50 flex items-center justify-center">
      <div className="text-center space-y-6 animate-fade-in">
        <div className="relative">
          <Car 
            className="w-16 h-16 text-yellow-400 animate-bounce mx-auto" 
            strokeWidth={2}
          />
          <div className="absolute inset-0 w-16 h-16 mx-auto">
            <div className="w-full h-full border-4 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin"></div>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">
            Loading the best cars for you
          </h2>
          <div className="flex gap-1 justify-center">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
