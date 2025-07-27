import React, { useState } from 'react';
import { Card } from './ui/card';
import { Play, Youtube } from 'lucide-react';

const ProjectCard = ({ project, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getAspectRatio = () => {
    if (project.orientation === 'vertical') {
      return 'aspect-[4/5]'; // Instagram portrait ratio
    }
    return 'aspect-square'; // Square Instagram posts
  };

  return (
    <div className="w-full group cursor-pointer">
      <Card 
        className={`overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 border-0 rounded-lg ${getAspectRatio()}`}
        onClick={() => onClick(project)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`relative w-full h-full overflow-hidden project-image-container ${
          project.category === 'Photography Projects' ? 'photography-project' : ''
        }`}>
          <img 
            src={project.images[0]} 
            alt={project.title}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            style={{
              minWidth: '100%',
              minHeight: '100%',
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          />
          
          {/* Simple overlay on hover */}
          <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 flex items-center justify-center ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            {/* Center icon */}
            {project.type === 'video' ? (
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30">
                {project.videoUrl && project.videoUrl.includes('youtube') ? (
                  <Youtube size={24} className="text-white" />
                ) : (
                  <Play size={24} className="text-white ml-1" />
                )}
              </div>
            ) : null}
          </div>

          {/* Simple bottom info - only shows on hover */}
          <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <h3 className="font-semibold text-sm leading-tight">{project.title}</h3>
            <p className="text-xs text-gray-300 mt-1">{project.client}</p>
          </div>

          {/* Featured indicator - small and subtle */}
          {project.featured && (
            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ProjectCard;