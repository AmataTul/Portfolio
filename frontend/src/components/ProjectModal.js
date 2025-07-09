import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { X, Play, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto bg-white border-0 shadow-2xl">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-3xl font-bold text-gray-900 mb-2">{project.title}</DialogTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-red-100 text-red-800 font-medium">
                {project.category}
              </Badge>
              <span className="text-gray-500">•</span>
              <span className="text-gray-700 font-medium">{project.client}</span>
            </div>
            {project.featured && (
              <Badge className="bg-gradient-to-r from-red-600 to-red-500 text-white">
                Featured Project
              </Badge>
            )}
          </div>
        </DialogHeader>
        
        <div className="space-y-8">
          {/* Project Media */}
          <div className="relative">
            <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-lg">
              <img 
                src={project.images[currentImageIndex]} 
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {project.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 rounded-full p-6 shadow-lg">
                    <Play size={32} className="text-white ml-1" />
                  </Button>
                </div>
              )}
              
              {/* Navigation arrows for multiple images */}
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={previousImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
              
              {/* Image counter */}
              {project.images.length > 1 && (
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {project.images.length}
                </div>
              )}
            </div>
            
            {/* Thumbnail navigation */}
            {project.images.length > 1 && (
              <div className="flex space-x-2 mt-4 justify-center">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentImageIndex 
                        ? 'border-red-600 ring-2 ring-red-200' 
                        : 'border-gray-300 hover:border-gray-400'
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
            
            {/* Project Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
              <div className="space-y-2">
                <h4 className="font-semibold text-red-600 text-sm uppercase tracking-wider">Project Type</h4>
                <p className="text-gray-700">{project.category}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-red-600 text-sm uppercase tracking-wider">Client</h4>
                <p className="text-gray-700">{project.client}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-red-600 text-sm uppercase tracking-wider">Media Type</h4>
                <p className="text-gray-700 capitalize">{project.type}</p>
              </div>
            </div>
            
            {/* Additional project details based on category */}
            {project.category === "Social Media Content & Campaigns" && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">Campaign Highlights</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Multi-platform content strategy</li>
                  <li>• Engaging video content and reels</li>
                  <li>• Consistent brand messaging</li>
                  <li>• Performance-optimized creative</li>
                </ul>
              </div>
            )}
            
            {project.category === "Photography Projects" && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">Photography Details</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Professional studio setup</li>
                  <li>• Creative lighting techniques</li>
                  <li>• Post-processing and retouching</li>
                  <li>• Brand-consistent styling</li>
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