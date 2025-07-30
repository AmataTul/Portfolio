import React from 'react';
import { categories } from '../data/mock';
import { Target, Palette, Megaphone, Smartphone, Camera, Lightbulb, BookOpen, BarChart3, Sparkles } from 'lucide-react';

const StoriesBar = ({ activeCategory, onCategoryChange }) => {
  const categoryIcons = {
    "All": Target,
    "Branding": Sparkles,
    "Analytics & Research": BarChart3,
    "Graphic Design": Palette,
    "Advertising": Megaphone,
    "Social Media Content & Campaigns": Smartphone,
    "Photography Projects": Camera,
    "Creative Concepts": Lightbulb,
    "Illustrations & Educational Content": BookOpen
  };

  const shortNames = {
    "All": "All",
    "Branding": "Branding",
    "Analytics & Research": "Analytics & Research",
    "Graphic Design": "Graphic Design",
    "Advertising": "Advertising",
    "Social Media Content & Campaigns": "Social Media",
    "Photography Projects": "Photography",
    "Creative Concepts": "Creative",
    "Illustrations & Educational Content": "Education"
  };

  return (
    <div className="bg-white border-b border-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {categories.map((category) => {
            const IconComponent = categoryIcons[category];
            return (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`group flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-red-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md'
                }`}
              >
                <IconComponent 
                  size={20} 
                  className={`transition-colors duration-300 ${
                    activeCategory === category 
                      ? 'text-white' 
                      : 'text-gray-600 group-hover:text-gray-800'
                  }`}
                />
                <span className="text-sm font-medium whitespace-nowrap">
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