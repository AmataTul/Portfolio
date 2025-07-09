import React from 'react';
import { brands } from '../data/mock';

const BrandMarquee = () => {
  // Triple the brands array for seamless scrolling
  const infiniteBrands = [...brands, ...brands, ...brands, ...brands, ...brands, ...brands];

  return (
    <div className="bg-gradient-to-r from-red-50 via-white to-red-50 py-8 overflow-hidden border-y border-red-100 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-red-50 via-transparent to-red-50 z-10 pointer-events-none"></div>
      
      <div className="flex animate-marquee-smooth whitespace-nowrap">
        {infiniteBrands.map((brand, index) => (
          <span 
            key={index} 
            className="inline-block mx-12 text-2xl font-bold text-red-600/80 hover:text-red-600 transition-all duration-300 hover:scale-110 cursor-default"
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BrandMarquee;