import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { X, Play, ChevronLeft, ChevronRight, ExternalLink, Youtube } from 'lucide-react';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const getAspectRatio = () => {
    if (project.orientation === 'vertical') {
      return 'aspect-[9/16] max-w-md mx-auto'; // Vertical aspect ratio, smaller max width
    }
    return 'aspect-video max-w-4xl mx-auto'; // Horizontal aspect ratio
  };

  const handleVideoClick = () => {
    if (project.videoUrl) {
      window.open(project.videoUrl, '_blank');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white border-0 shadow-2xl rounded-2xl">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{project.title}</DialogTitle>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary" className="bg-red-100 text-red-800 font-semibold text-sm px-3 py-1">
                {project.category}
              </Badge>
              <span className="text-gray-400 hidden sm:inline">•</span>
              <span className="text-gray-700 font-semibold">{project.client}</span>
            </div>
            {project.featured && (
              <Badge className="bg-gradient-to-r from-red-600 to-red-500 text-white font-bold px-3 py-1">
                FEATURED
              </Badge>
            )}
          </div>
        </DialogHeader>
        
        <div className="space-y-8">
          {/* Project Media */}
          <div className="relative">
            <div className={`relative ${getAspectRatio()} bg-gray-100 rounded-xl overflow-hidden shadow-xl`}>
              <img 
                src={project.images[currentImageIndex]} 
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Video/YouTube Overlay */}
              {project.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors duration-300">
                  <Button 
                    size="lg" 
                    onClick={handleVideoClick}
                    className="bg-red-600 hover:bg-red-700 rounded-full p-4 md:p-6 shadow-xl transform hover:scale-110 transition-all duration-300"
                  >
                    {project.videoUrl && project.videoUrl.includes('youtube') ? (
                      <Youtube size={32} className="text-white" />
                    ) : (
                      <Play size={32} className="text-white ml-1" />
                    )}
                  </Button>
                </div>
              )}
              
              {/* Navigation arrows for multiple images */}
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={previousImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
              
              {/* Image counter */}
              {project.images.length > 1 && (
                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {currentImageIndex + 1} / {project.images.length}
                </div>
              )}
            </div>
            
            {/* Thumbnail navigation */}
            {project.images.length > 1 && (
              <div className="flex space-x-3 mt-4 justify-center overflow-x-auto pb-2">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'border-red-600 ring-2 ring-red-200 shadow-md' 
                        : 'border-gray-300 hover:border-gray-400 hover:shadow-sm'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Project Details */}
          <div className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed">{project.description}</p>
            </div>
            
            {/* Video Link */}
            {project.videoUrl && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 md:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <Youtube className="w-6 h-6 md:w-8 md:h-8 text-red-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-red-800 text-lg">Watch on YouTube</h4>
                      <p className="text-red-600 text-sm">Educational content for high school students</p>
                    </div>
                  </div>
                  <Button 
                    onClick={handleVideoClick}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold w-full sm:w-auto"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Watch Video
                  </Button>
                </div>
              </div>
            )}
            
            {/* Project Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
              <div className="space-y-2">
                <h4 className="font-bold text-red-600 text-sm uppercase tracking-wider">Category</h4>
                <p className="text-gray-700 font-medium">{project.category}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-red-600 text-sm uppercase tracking-wider">Client</h4>
                <p className="text-gray-700 font-medium">{project.client}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-red-600 text-sm uppercase tracking-wider">Format</h4>
                <p className="text-gray-700 font-medium capitalize">
                  {project.orientation} {project.type}
                </p>
              </div>
            </div>
            
            {/* Category-specific highlights */}
            {project.category === "Social Media Content & Campaigns" && (
              <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-4 md:p-6">
                <h4 className="font-bold text-red-800 mb-3 text-lg">Campaign Highlights</h4>
                <ul className="text-red-700 space-y-2 text-sm md:text-base">
                  <li className="flex items-center"><span className="w-2 h-2 bg-red-600 rounded-full mr-3 flex-shrink-0"></span>Multi-platform content strategy</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-red-600 rounded-full mr-3 flex-shrink-0"></span>Vertical video optimization for TikTok/Instagram</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-red-600 rounded-full mr-3 flex-shrink-0"></span>Consistent brand messaging across platforms</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-red-600 rounded-full mr-3 flex-shrink-0"></span>Performance-optimized creative assets</li>
                </ul>
              </div>
            )}
            
            {project.category === "Illustrations & Educational Content" && (
              <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-4 md:p-6">
                <h4 className="font-bold text-red-800 mb-3 text-lg">Educational Impact</h4>
                <ul className="text-red-700 space-y-2 text-sm md:text-base">
                  <li className="flex items-center"><span className="w-2 h-2 bg-red-600 rounded-full mr-3 flex-shrink-0"></span>Age-appropriate content design</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-red-600 rounded-full mr-3 flex-shrink-0"></span>Engaging animation and visual storytelling</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-red-600 rounded-full mr-3 flex-shrink-0"></span>Curriculum-aligned educational goals</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-red-600 rounded-full mr-3 flex-shrink-0"></span>Interactive learning components</li>
                </ul>
              </div>
            )}
            
            {project.category === "Business Analytics & Strategy" && project.analytics && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-4 md:p-6">
                <h4 className="font-bold text-blue-800 mb-4 text-lg">Strategic Achievement</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h5 className="font-semibold text-blue-700 mb-2">Competition Results</h5>
                    <p className="text-sm text-blue-600 mb-1">🏆 {project.analytics.achievement}</p>
                    <p className="text-sm text-blue-600">🌍 {project.analytics.competitionLevel}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h5 className="font-semibold text-purple-700 mb-2">Key Financial Metrics</h5>
                    <div className="text-sm text-purple-600 space-y-1">
                      <p>📈 ROE: {project.analytics.keyMetrics.returnOnEquity}%</p>
                      <p>💰 EPS: ${project.analytics.keyMetrics.earningsPerShare}</p>
                      <p>⭐ Credit Rating: {project.analytics.keyMetrics.creditRating}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h5 className="font-semibold text-green-700 mb-3">Strategic Decisions & Impact</h5>
                  <ul className="text-sm text-green-600 space-y-2">
                    {project.analytics.strategicDecisions.map((decision, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {decision}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;