import React, { useState } from 'react';
import { Card } from './ui/card';
import { Play, Image as ImageIcon, Youtube, ExternalLink, Heart, MessageCircle, Bookmark } from 'lucide-react';

const ProjectCard = ({ project, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getAspectRatio = () => {
    if (project.orientation === 'vertical') {
      return 'aspect-[4/5]'; // Instagram post ratio for vertical content
    }
    return 'aspect-square'; // Square Instagram posts
  };

  const getGridItemClass = () => {
    if (project.orientation === 'vertical') {
      return 'w-full'; // Full width for vertical items
    }
    return 'w-full'; // Consistent full width
  };

  return (
    <div className={`${getGridItemClass()} group cursor-pointer`}>
      <Card 
        className={`overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-0 rounded-xl ${getAspectRatio()}`}
        onClick={() => onClick(project)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full h-full overflow-hidden">
          <img 
            src={project.images[0]} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Instagram-style overlay */}
          <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            {/* Center play/view icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              {project.type === 'video' ? (
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30">
                  {project.videoUrl && project.videoUrl.includes('youtube') ? (
                    <Youtube size={28} className="text-white" />
                  ) : (
                    <Play size={28} className="text-white ml-1" />
                  )}
                </div>
              ) : (
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30">
                  <ImageIcon size={28} className="text-white" />
                </div>
              )}
            </div>

            {/* Instagram-style interaction buttons */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-4">
                  <Heart className="w-6 h-6 hover:text-red-400 transition-colors cursor-pointer" />
                  <MessageCircle className="w-6 h-6 hover:text-blue-400 transition-colors cursor-pointer" />
                </div>
                <Bookmark className="w-6 h-6 hover:text-yellow-400 transition-colors cursor-pointer" />
              </div>
            </div>
          </div>
          
          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              FEATURED
            </div>
          )}
          
          {/* Multiple images indicator */}
          {project.images.length > 1 && (
            <div className="absolute top-3 left-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
              1/{project.images.length}
            </div>
          )}

          {/* Project info - Instagram style caption */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 text-white">
            <div className={`transform transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-80'}`}>
              <h3 className="font-bold text-sm mb-1 leading-tight">{project.title}</h3>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-300 font-medium">{project.client}</p>
                <span className="text-xs text-red-300 bg-red-600/30 px-2 py-0.5 rounded-full">
                  {project.category.split(' ')[0]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProjectCard;