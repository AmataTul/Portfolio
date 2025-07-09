import React, { useState } from 'react';
import { Card } from './ui/card';
import { Play, Image as ImageIcon, Youtube, ExternalLink } from 'lucide-react';

const ProjectCard = ({ project, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getAspectRatio = () => {
    if (project.orientation === 'vertical') {
      return 'aspect-[3/4]'; // 3:4 ratio for vertical content
    }
    return 'aspect-square'; // Default square ratio
  };

  return (
    <Card 
      className={`group cursor-pointer overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-0 ${getAspectRatio()}`}
      onClick={() => onClick(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full overflow-hidden">
        <img 
          src={project.images[0]} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />
        
        {/* Content Overlay */}
        <div className={`absolute inset-0 flex flex-col justify-center items-center transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Icon */}
          <div className="mb-4">
            {project.type === 'video' ? (
              <div className="bg-red-600 rounded-full p-6 transform transition-all duration-300 group-hover:scale-110 shadow-2xl">
                {project.videoUrl && project.videoUrl.includes('youtube') ? (
                  <Youtube size={32} className="text-white" />
                ) : (
                  <Play size={32} className="text-white ml-1" />
                )}
              </div>
            ) : (
              <div className="bg-red-600 rounded-full p-6 transform transition-all duration-300 group-hover:scale-110 shadow-2xl">
                <ImageIcon size={32} className="text-white" />
              </div>
            )}
          </div>
          
          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-lg">
              FEATURED
            </div>
          )}
          
          {/* Multiple Images Indicator */}
          {project.images.length > 1 && (
            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-medium">
              {project.images.length} images
            </div>
          )}
        </div>
        
        {/* Project Info - Always visible at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white">
          <div className="transform transition-all duration-300 group-hover:translate-y-0 translate-y-2">
            <h3 className="font-bold text-lg mb-2 leading-tight">{project.title}</h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-300 font-medium">{project.client}</p>
              <span className="text-xs text-red-300 bg-red-600/30 px-2 py-1 rounded-full">
                {project.category.split(' ')[0]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;