import React from 'react';
import { categories } from '../data/mock';
import { Target, Palette, Megaphone, Smartphone, Camera, Lightbulb, BookOpen } from 'lucide-react';

const StoriesBar = ({ activeCategory, setActiveCategory }) => {
  const categoryIcons = {
    "All": Target,
    "Graphic Design & Marketing Materials": Palette,
    "Advertising": Megaphone,
    "Social Media Content & Campaigns": Smartphone,
    "Photography Projects": Camera,
    "Creative Concepts & Branding": Lightbulb,
    "Illustrations & Educational Content": BookOpen
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
    <div className="bg-white border-b border-gray-200 py-6 px-4 sm:px-6 lg:px-8 overflow-x-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex space-x-8 justify-center md:justify-start">
          {categories.map((category) => {
            const IconComponent = categoryIcons[category];
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className="flex-shrink-0 flex flex-col items-center space-y-3 group min-w-fit"
              >
                {/* Icon circle */}
                <div className={`w-18 h-18 rounded-full p-1 transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-tr from-red-500 via-red-600 to-red-700 shadow-lg scale-105'
                    : 'bg-gray-200 group-hover:bg-gray-300'
                }`}>
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                    <IconComponent 
                      size={24} 
                      className={`transition-colors duration-300 ${
                        activeCategory === category 
                          ? 'text-red-600' 
                          : 'text-gray-600 group-hover:text-gray-800'
                      }`}
                    />
                  </div>
                </div>
                
                {/* Category label */}
                <span className={`text-sm font-medium transition-colors duration-300 text-center max-w-20 leading-tight ${
                  activeCategory === category 
                    ? 'text-red-600' 
                    : 'text-gray-600 group-hover:text-gray-800'
                }`}>
                  {shortNames[category]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StoriesBar;