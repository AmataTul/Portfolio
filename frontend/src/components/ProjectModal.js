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
      return 'aspect-[9/16]'; // Vertical aspect ratio for social media content
    }
    return 'aspect-video'; // Default video aspect ratio
  };

  const handleVideoClick = () => {
    if (project.videoUrl) {
      window.open(project.videoUrl, '_blank');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto bg-white border-0 shadow-2xl rounded-2xl">
        <DialogHeader className="pb-8">
          <DialogTitle className="text-4xl font-bold text-gray-900 mb-3">{project.title}</DialogTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-red-100 text-red-800 font-semibold text-sm px-4 py-2">
                {project.category}
              </Badge>
              <span className="text-gray-400">•</span>
              <span className="text-gray-700 font-semibold text-lg">{project.client}</span>
            </div>
            {project.featured && (
              <Badge className="bg-gradient-to-r from-red-600 to-red-500 text-white font-bold px-4 py-2">
                FEATURED PROJECT
              </Badge>
            )}
          </div>
        </DialogHeader>
        
        <div className="space-y-10">
          {/* Project Media */}
          <div className="relative">
            <div className={`relative ${getAspectRatio()} bg-gray-100 rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-4xl`}>
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
                    className="bg-red-600 hover:bg-red-700 rounded-full p-8 shadow-2xl transform hover:scale-110 transition-all duration-300"
                  >
                    {project.videoUrl && project.videoUrl.includes('youtube') ? (
                      <Youtube size={48} className="text-white" />
                    ) : (
                      <Play size={48} className="text-white ml-2" />
                    )}
                  </Button>
                </div>
              )}
              
              {/* Navigation arrows for multiple images */}
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={previousImage}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
                  >
                    <ChevronRight size={28} />
                  </button>
                </>
              )}
              
              {/* Image counter */}
              {project.images.length > 1 && (
                <div className="absolute top-6 right-6 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {currentImageIndex + 1} / {project.images.length}
                </div>
              )}
            </div>
            
            {/* Thumbnail navigation */}
            {project.images.length > 1 && (
              <div className="flex space-x-4 mt-6 justify-center">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-3 transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'border-red-600 ring-4 ring-red-200 shadow-lg' 
                        : 'border-gray-300 hover:border-gray-400 hover:shadow-md'
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
          <div className="space-y-8">
            <div className="prose prose-xl max-w-none">
              <p className="text-gray-700 text-xl leading-relaxed">{project.description}</p>
            </div>
            
            {/* Video Link */}
            {project.videoUrl && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Youtube className="w-8 h-8 text-red-600" />
                    <div>
                      <h4 className="font-semibold text-red-800 text-lg">Watch on YouTube</h4>
                      <p className="text-red-600 text-sm">Educational content for high school students</p>
                    </div>
                  </div>
                  <Button 
                    onClick={handleVideoClick}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Watch Video
                  </Button>
                </div>
              </div>
            )}
            
            {/* Project Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="space-y-3">
                <h4 className="font-bold text-red-600 text-sm uppercase tracking-wider">Category</h4>
                <p className="text-gray-700 font-medium text-lg">{project.category}</p>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-red-600 text-sm uppercase tracking-wider">Client</h4>
                <p className="text-gray-700 font-medium text-lg">{project.client}</p>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-red-600 text-sm uppercase tracking-wider">Format</h4>
                <p className="text-gray-700 font-medium text-lg capitalize">
                  {project.orientation} {project.type}
                </p>
              </div>
            </div>
            
            {/* Category-specific highlights */}
            {project.category === "Social Media Content & Campaigns" && (
              <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-6">
                <h4 className="font-bold text-red-800 mb-4 text-lg">Campaign Highlights</h4>
                <ul className="text-red-700 space-y-2">
                  <li className="flex items-center"><span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>Multi-platform content strategy</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>Vertical video optimization for TikTok/Instagram</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>Consistent brand messaging across platforms</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>Performance-optimized creative assets</li>
                </ul>
              </div>
            )}
            
            {project.category === "Illustrations & Educational Content" && (
              <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-6">
                <h4 className="font-bold text-red-800 mb-4 text-lg">Educational Impact</h4>
                <ul className="text-red-700 space-y-2">
                  <li className="flex items-center"><span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>Age-appropriate content design</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>Engaging animation and visual storytelling</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>Curriculum-aligned educational goals</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>Interactive learning components</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;