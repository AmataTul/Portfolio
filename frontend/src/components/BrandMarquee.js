import React from 'react';
import { brands } from '../data/mock';

const BrandMarquee = () => {
  return (
    <div className="bg-gradient-to-r from-red-50 to-white py-6 overflow-hidden border-y border-red-100">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...brands, ...brands, ...brands].map((brand, index) => (
          <span 
            key={index} 
            className="inline-block mx-8 text-xl font-semibold text-red-600/70 hover:text-red-600 transition-colors"
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BrandMarquee;