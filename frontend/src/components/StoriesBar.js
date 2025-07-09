import React from 'react';
import { categories } from '../data/mock';

const StoriesBar = ({ activeCategory, setActiveCategory }) => {
  const categoryIcons = {
    "All": "🎯",
    "Graphic Design & Marketing Materials": "🎨",
    "Advertising": "📢",
    "Social Media Content & Campaigns": "📱",
    "Photography Projects": "📸",
    "Creative Concepts & Branding": "💡",
    "Illustrations & Educational Content": "📚"
  };

  const shortNames = {
    "All": "All",
    "Graphic Design & Marketing Materials": "Graphics",
    "Advertising": "Ads",
    "Social Media Content & Campaigns": "Social",
    "Photography Projects": "Photos",
    "Creative Concepts & Branding": "Branding",
    "Illustrations & Educational Content": "Education"
  };

  return (
    <div className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6 lg:px-8 overflow-x-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex space-x-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="flex-shrink-0 flex flex-col items-center space-y-2 group"
            >
              {/* Story circle */}
              <div className={`w-16 h-16 rounded-full p-0.5 transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-gradient-to-tr from-red-500 via-pink-500 to-red-600 shadow-lg scale-105'
                  : 'bg-gray-300 group-hover:bg-gray-400'
              }`}>
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-2xl">
                  {categoryIcons[category]}
                </div>
              </div>
              
              {/* Story label */}
              <span className={`text-xs font-medium transition-colors duration-200 ${
                activeCategory === category 
                  ? 'text-red-600' 
                  : 'text-gray-600 group-hover:text-gray-800'
              }`}>
                {shortNames[category]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoriesBar;