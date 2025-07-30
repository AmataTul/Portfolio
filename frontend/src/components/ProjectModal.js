import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

const ProjectModalTest = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white border-0 shadow-2xl rounded-2xl">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{project.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8">
          <div>Test content</div>
        </div>
        
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModalTest;