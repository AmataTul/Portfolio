import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { X, Play, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-red-600">{project.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Project Image/Video */}
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            {project.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 rounded-full p-4">
                  <Play size={32} className="text-white ml-1" />
                </Button>
              </div>
            )}
          </div>
          
          {/* Project Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                {project.category}
              </Badge>
              <div className="text-sm text-gray-600">
                Client: <span className="font-medium text-red-600">{project.client}</span>
              </div>
            </div>
            
            <p className="text-gray-700 text-lg leading-relaxed">{project.description}</p>
            
            {/* Additional project details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <h4 className="font-semibold text-red-600 mb-2">Project Type</h4>
                <p className="text-gray-600">{project.category}</p>
              </div>
              <div>
                <h4 className="font-semibold text-red-600 mb-2">Client</h4>
                <p className="text-gray-600">{project.client}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;