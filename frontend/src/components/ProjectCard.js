import React, { useState } from 'react';
import { Card } from './ui/card';
import { Play, Image as ImageIcon } from 'lucide-react';

const ProjectCard = ({ project, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="group cursor-pointer overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-red-100 hover:border-red-200"
      onClick={() => onClick(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute inset-0 flex items-center justify-center">
            {project.type === 'video' ? (
              <div className="bg-red-600 rounded-full p-4 transform transition-transform duration-300 group-hover:scale-110">
                <Play size={24} className="text-white ml-1" />
              </div>
            ) : (
              <div className="bg-red-600 rounded-full p-4 transform transition-transform duration-300 group-hover:scale-110">
                <ImageIcon size={24} className="text-white" />
              </div>
            )}
          </div>
        </div>
        
        {/* Project Info Overlay */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <h3 className="font-semibold text-lg">{project.title}</h3>
          <p className="text-sm text-gray-300">{project.client}</p>
          <p className="text-xs text-gray-400 mt-1">{project.category}</p>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;