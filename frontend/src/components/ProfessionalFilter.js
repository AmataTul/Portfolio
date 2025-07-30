import React from 'react';
import { Input } from './ui/input.jsx';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

const ProfessionalFilter = ({ searchTerm, setSearchTerm, activeCategory, setActiveCategory, categories }) => {
  return (
    <div className="bg-white border-b border-gray-200 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search marketing campaigns and projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg text-base transition-all duration-200"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-600">
              <SlidersHorizontal size={20} className="mr-2" />
              <span className="text-sm font-medium">Filter by:</span>
            </div>
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 focus:border-red-500 focus:ring-red-500 transition-all duration-200"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filter Indicator */}
        {activeCategory !== 'All' && (
          <div className="flex items-center mt-4">
            <span className="text-sm text-gray-500 mr-2">Showing:</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
              {activeCategory}
              <button
                onClick={() => setActiveCategory('All')}
                className="ml-2 text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalFilter;