import React from 'react';
import { contactInfo } from '../data/mock';
import { MapPin, Award, TrendingUp } from 'lucide-react';

const InstagramHeader = () => {
  return (
    <div className="bg-white border-b border-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-500 via-pink-500 to-red-600 p-1 shadow-xl">
              <div className="w-full h-full rounded-full bg-white p-1">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center">
                  <span className="text-4xl font-black text-red-600">AT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{contactInfo.name}</h1>
                <p className="text-gray-600 font-medium">Performance Marketing Strategist</p>
              </div>
              
              {/* Stats */}
              <div className="flex space-x-8 mt-4 sm:mt-0">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">80+</div>
                  <div className="text-sm text-gray-600">Campaigns</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">5+</div>
                  <div className="text-sm text-gray-600">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">300%</div>
                  <div className="text-sm text-gray-600">Growth</div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2 mb-6">
              <p className="text-gray-900 font-medium">
                🚀 Transforming brands into revenue generators
              </p>
              <p className="text-gray-700">
                📊 Data-driven strategies • ROI-focused campaigns
              </p>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{contactInfo.location}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button 
                onClick={() => {
                  const subject = "Let's Collaborate - Marketing Opportunity";
                  const body = "Hi Amata,\n\nI came across your portfolio and I'm impressed with your marketing expertise. I'd love to discuss a potential collaboration opportunity.\n\nBest regards,";
                  window.location.href = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Contact
              </button>
              <a
                href="/about"
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-2 px-6 rounded-lg transition-colors duration-200 text-center"
              >
                About
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramHeader;