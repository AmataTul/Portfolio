import React from 'react';
import { categories } from '../data/mock';

const CategoryTabs = ({ activeCategory, setActiveCategory }) => {
  const shortNames = {
    "All": "All",
    "Graphic Design & Marketing Materials": "Graphics",
    "Advertising": "Advertising", 
    "Social Media Content & Campaigns": "Social Media",
    "Photography Projects": "Photography",
    "Creative Concepts & Branding": "Branding",
    "Illustrations & Educational Content": "Education"
  };

  return (
    <div className="w-full max-w-6xl mx-auto mb-12">
      {/* Desktop/Tablet Layout */}
      <div className="hidden md:flex justify-center">
        <div className="inline-flex bg-white rounded-2xl p-2 shadow-lg border-2 border-gray-200">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-red-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              {shortNames[category]}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="grid grid-cols-2 gap-2 bg-white rounded-2xl p-2 shadow-lg border-2 border-gray-200">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-3 rounded-xl font-semibold text-xs transition-all duration-300 text-center ${
                activeCategory === category
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              {shortNames[category]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;