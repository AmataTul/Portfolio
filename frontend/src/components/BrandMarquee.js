import React from 'react';
import { brands } from '../data/mock';

const BrandMarquee = () => {
  // Triple the brands array for seamless scrolling
  const infiniteBrands = [...brands, ...brands, ...brands, ...brands, ...brands, ...brands];

  return (
    <div className="bg-gradient-to-r from-yellow-100 via-pink-50 to-purple-100 py-8 overflow-hidden border-y-2 border-gradient-to-r from-yellow-300 to-pink-300 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/30 via-transparent to-purple-200/30 z-10 pointer-events-none"></div>
      
      <div className="flex animate-marquee-smooth whitespace-nowrap">
        {infiniteBrands.map((brand, index) => (
          <span 
            key={index} 
            className="inline-block mx-12 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-pink-600 hover:to-purple-600 transition-all duration-300 hover:scale-110 cursor-default"
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BrandMarquee;