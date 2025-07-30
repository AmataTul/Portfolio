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
          {/* Project Media - Only show if there are images */}
          {project.images && project.images.length > 0 && (
            <div className="relative">
              {/* Special Grid Layout for Aigata Brand Project */}
              {project.title && project.title.includes('Aigata Brand') ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 text-center">E-commerce Product Graphics Collection</h3>
                  <div className="grid grid-cols-4 gap-4 p-6 bg-gray-50 rounded-xl">
                    {project.images.map((image, index) => (
                      <div key={index} className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group">
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600 hover:bg-gray-200 transition-colors duration-300 group-hover:text-gray-800">
                          {image.startsWith('AIGATA_BRAND_IMAGE_') ? (
                            <div className="text-center p-2">
                              <div className="text-gray-400 mb-2 text-2xl">🛍️</div>
                              <div className="text-xs">Product Graphic {index + 1}</div>
                            </div>
                          ) : (
                            <img 
                              src={image} 
                              alt={`Aigata E-commerce Asset ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
                    <div className="font-medium text-blue-800 mb-2">🛒 Complete E-commerce Business Graphics System</div>
                    <div>20 professional product listing graphics for Amazon, eBay, Etsy, and TikTok Shop platforms, plus social media marketing assets. Includes complete business operations management with overseas vendor coordination and home-based fulfillment.</div>
                  </div>
                </div>
              ) : project.title && project.title.includes('Digital Drive Thru Menu Design') ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 text-center">Coffee House Digital Menu Collection</h3>
                  <div className="grid grid-cols-1 gap-6">
                    {/* Main Drive Thru Menu */}
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg border">
                      <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                        <div className="text-center p-4">
                          <div className="text-gray-400 mb-2 text-3xl">☕</div>
                          <div className="text-sm font-medium mb-1">DIGITAL_DRIVE_THRU_MENU</div>
                          <div className="text-xs text-gray-500">Main Menu Design</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
                    <div className="font-medium text-green-800 mb-1">☕ Digital Drive Thru Menu Design</div>
                    <div>Custom digital menu board design for drive-thru service, featuring clear product categories, pricing, and visual appeal optimized for quick customer decision-making.</div>
                  </div>
                  
                  {/* Special handling for Coffee House Digital Menu - separate event sign */}
                  <div className="mt-8 space-y-4">
                    <div className="border-t pt-6">
                      <h4 className="text-md font-semibold text-gray-800 mb-3 text-center">Event Signage Design</h4>
                      <div className="flex justify-center">
                        <div className="w-80 h-48 bg-white rounded-lg overflow-hidden shadow-lg border">
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                            <div className="text-center p-4">
                              <div className="text-gray-400 mb-2 text-3xl">🪧</div>
                              <div className="text-sm font-medium mb-1">DOUBLE_SIDED_EVENT_SIGN</div>
                              <div className="text-xs text-gray-500">Event Signage Design</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center text-sm text-gray-600 bg-green-50 p-3 rounded-lg mt-4 max-w-md mx-auto">
                        <div className="font-medium text-green-800 mb-1">📋 Double-Sided Event Sign</div>
                        <div>Custom menu design for double-sided signage used at community events and special occasions, designed and created by me to promote the coffee house at various venues.</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : project.title && project.title.includes('Comprehensive Graphic Design Skills Portfolio') ? (
                <div className="space-y-3 max-h-screen overflow-hidden">
                  <h3 className="text-md font-semibold text-gray-800 text-center">Multi-Category Design Skills Showcase</h3>
                  
                  {/* Line 1: Professional & Social Media Graphics - Ultra compact */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-gray-700">Professional & Social Media Graphics</h4>
                    <div className="grid grid-cols-8 md:grid-cols-10 gap-1 p-1 bg-blue-50 rounded">
                      {project.images.slice(0, 13).map((image, index) => (
                        <div key={index} className="aspect-square bg-white rounded overflow-hidden shadow-sm" style={{minHeight: '40px', maxHeight: '60px'}}>
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                            {image.startsWith('PROFESSIONAL_GRAPHIC_') ? (
                              <div className="text-center p-0.5">
                                <div className="text-blue-500 mb-0.5 text-xs">💼</div>
                                <div className="text-xs">P{index + 1}</div>
                              </div>
                            ) : (
                              <img src={image} alt={`Professional ${index + 1}`} className="w-full h-full object-cover" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Line 2: Drawing/Illustrator Skills - Ultra compact */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-gray-700">Drawing & Illustration Skills</h4>
                    <div className="grid grid-cols-4 gap-2 p-1 bg-purple-50 rounded">
                      {project.images.slice(13, 17).map((image, index) => (
                        <div key={index} className="aspect-square bg-white rounded overflow-hidden shadow-sm" style={{minHeight: '50px', maxHeight: '80px'}}>
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                            {image.startsWith('ILLUSTRATION_') ? (
                              <div className="text-center p-1">
                                <div className="text-purple-500 mb-1 text-sm">🎨</div>
                                <div className="text-xs">{
                                  index === 0 ? 'Sticker' : 
                                  index === 1 ? 'T-Shirt' : 
                                  `Logo ${index - 1}`
                                }</div>
                              </div>
                            ) : (
                              <img src={image} alt={`Illustration ${index + 1}`} className="w-full h-full object-cover" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Line 3: Promotional Materials - Ultra compact */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-gray-700">Promotional Materials - Ute Plaza & Coffee House</h4>
                    <div className="grid grid-cols-6 md:grid-cols-12 gap-1 p-1 bg-green-50 rounded">
                      {project.images.slice(17, 29).map((image, index) => (
                        <div key={index} className="aspect-square bg-white rounded overflow-hidden shadow-sm" style={{minHeight: '40px', maxHeight: '60px'}}>
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                            {image.startsWith('PROMO_') ? (
                              <div className="text-center p-0.5">
                                <div className="text-green-500 mb-0.5 text-xs">📢</div>
                                <div className="text-xs">PR{index + 1}</div>
                              </div>
                            ) : (
                              <img src={image} alt={`Promo ${index + 1}`} className="w-full h-full object-cover" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Line 4: Event Flyers - Ultra compact */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-gray-700">Event Flyers</h4>
                    <div className="grid grid-cols-4 gap-2 p-1 bg-orange-50 rounded">
                      {project.images.slice(29, 33).map((image, index) => (
                        <div key={index} className="aspect-square bg-white rounded overflow-hidden shadow-sm" style={{minHeight: '50px', maxHeight: '80px'}}>
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                            {image.startsWith('EVENT_FLYER_') ? (
                              <div className="text-center p-1">
                                <div className="text-orange-500 mb-1 text-sm">📋</div>
                                <div className="text-xs">E{index + 1}</div>
                              </div>
                            ) : (
                              <img src={image} alt={`Event ${index + 1}`} className="w-full h-full object-cover" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-center text-xs text-gray-600 bg-gray-50 p-2 rounded">
                    <div className="font-medium text-gray-800 mb-1">🎯 Selected Best Digital Assets</div>
                    <div>Comprehensive showcase of graphic design versatility across multiple categories.</div>
                  </div>
                </div>
              ) : (
                /* Regular Single Image Display */
                <div className={`relative ${getAspectRatio()} bg-gray-100 rounded-xl overflow-hidden shadow-xl project-image-container ${
                  project.category === 'Photography Projects' ? 'photography-project' : ''
                }`}>
                <img 
                  src={project.images[currentImageIndex]} 
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover object-center"
                  style={{
                    minWidth: '100%',
                    minHeight: '100%',
                    maxWidth: '100%',
                    maxHeight: '100%'
                  }}
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
            )}
            
          </div>
          )}
          
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

            {/* Multiple Videos Section - For Advertising Projects */}
            {project.videos && project.videos.length > 0 && (
              <div className="bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 border-4 border-transparent bg-clip-padding rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <h4 className="text-3xl font-bold bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 bg-clip-text text-transparent mb-4 flex items-center justify-center">
                    <span className="text-4xl mr-3">🎬</span>
                    Professional Advertisement Campaign
                  </h4>
                  <p className="text-gray-700 text-lg max-w-4xl mx-auto leading-relaxed">
                    Multi-platform video advertisements directed and produced for cinema screenings, YouTube, social media, and big screen displays
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {project.videos.map((video, index) => (
                    <div key={index} className="group relative">
                      <div className="bg-gradient-to-br from-red-400 via-rose-400 to-pink-400 rounded-xl p-1">
                        <div className="bg-white rounded-lg overflow-hidden">
                          <div className="relative aspect-video bg-gray-100 overflow-hidden">
                            {/* Video Thumbnail */}
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                              {video.thumbnail === "COFFEE_HOUSE_VIDEO_THUMBNAIL_1" || video.thumbnail === "UTE_CROSSING_GRILL_VIDEO_THUMBNAIL_2" ? (
                                <div className="text-center p-6">
                                  <Play size={48} className="mx-auto mb-2 text-gray-400" />
                                  <p className="text-sm">Upload your screenshot here</p>
                                  <p className="text-xs text-gray-400">({video.thumbnail})</p>
                                </div>
                              ) : (
                                <img 
                                  src={video.thumbnail} 
                                  alt={video.title}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            
                            {/* Video Title Overlay */}
                            <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-rose-500 text-white font-bold text-xs px-3 py-1 rounded-full shadow-lg">
                              Advertisement #{index + 1}
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <h5 className="font-bold text-gray-800 mb-2">{video.title}</h5>
                            <p className="text-gray-600 text-sm mb-3">{video.description}</p>
                            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              File: {video.videoFile}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Additional Project Details for Ute Crossing Grill */}
                {project.additionalProject && (
                  <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
                    <h5 className="font-bold text-red-800 mb-4 flex items-center">
                      <span className="text-2xl mr-2">🏢</span>
                      {project.additionalProject.businessName}
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                      <div>
                        <strong>Business Type:</strong> {project.additionalProject.businessType}
                      </div>
                      <div>
                        <strong>Location:</strong> {project.additionalProject.location}
                      </div>
                      <div>
                        <strong>Services:</strong> {project.additionalProject.services}
                      </div>
                      <div>
                        <strong>Marketing Focus:</strong> {project.additionalProject.marketingFocus}
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <strong className="text-gray-800">Advertising Distribution:</strong>
                      <p className="text-gray-600 text-sm mt-1">{project.additionalProject.advertisingScope}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Additional Images Section - Displayed right below video */}
            {project.additionalImages && (
              <div className="bg-gradient-to-r from-gray-50 to-slate-50 border-2 border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-800 mb-3 text-lg flex items-center">
                  <span className="text-xl mr-2">📄</span>
                  {project.additionalImages.title}
                </h4>
                <p className="text-gray-600 mb-4 text-sm">
                  {project.additionalImages.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.additionalImages.images.map((image, index) => (
                    <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                      <img 
                        src={image} 
                        alt={`${project.additionalImages.title} - Image ${index + 1}`}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dual Sections for Analytics & Graphic Design Projects */}
            {project.dualSections && (
              <div className="space-y-8">
                {/* Analytics Section */}
                <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-4 border-transparent bg-clip-padding rounded-2xl p-8 shadow-2xl">
                  <div className="text-center mb-6">
                    <h4 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 flex items-center justify-center">
                      <span className="text-4xl mr-3">📊</span>
                      {project.dualSections.analyticsSection.title}
                    </h4>
                    <p className="text-gray-700 text-lg max-w-4xl mx-auto leading-relaxed">
                      {project.dualSections.analyticsSection.description}
                    </p>
                  </div>
                  
                  {/* Analytics Images Grid - Flexible Layout for 4 images */}
                  <div className={`mb-6 ${
                    project.dualSections.analyticsSection.layout === 'mixed' 
                      ? 'space-y-4' 
                      : 'grid grid-cols-1 md:grid-cols-3 gap-6'
                  }`}>
                    {project.dualSections.analyticsSection.layout === 'mixed' ? (
                      <>
                        {/* First 3 images in a row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {project.dualSections.analyticsSection.images.slice(0, 3).map((image, index) => (
                            <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg">
                              <div className="bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 rounded-xl p-1">
                                <div className="bg-white rounded-lg overflow-hidden">
                                  <img 
                                    src={image} 
                                    alt={`Analytics Work ${index + 1}`}
                                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                  />
                                  <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-xs px-3 py-1 rounded-full shadow-lg">
                                    Analytics #{index + 1}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* Horizontal image separately */}
                        {project.dualSections.analyticsSection.images[3] && (
                          <div className="group relative overflow-hidden rounded-xl shadow-lg">
                            <div className="bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 rounded-xl p-1">
                              <div className="bg-white rounded-lg overflow-hidden">
                                <img 
                                  src={project.dualSections.analyticsSection.images[3]} 
                                  alt="Analytics Presentation"
                                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-xs px-3 py-1 rounded-full shadow-lg">
                                  Presentation
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      project.dualSections.analyticsSection.images.map((image, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg">
                          <div className="bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 rounded-xl p-1">
                            <div className="bg-white rounded-lg overflow-hidden">
                              <img 
                                src={image} 
                                alt={`Analytics Work ${index + 1}`}
                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-xs px-3 py-1 rounded-full shadow-lg">
                                Analytics #{index + 1}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {/* Analytics Highlights */}
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h5 className="font-bold text-indigo-800 mb-4 flex items-center">
                      <span className="text-2xl mr-2">🔍</span>
                      Research & Analysis Highlights
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.dualSections.analyticsSection.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700 text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Graphic Design Section */}
                <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 border-4 border-transparent bg-clip-padding rounded-2xl p-8 shadow-2xl">
                  <div className="text-center mb-6">
                    <h4 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 bg-clip-text text-transparent mb-4 flex items-center justify-center">
                      <span className="text-4xl mr-3">🎨</span>
                      {project.dualSections.brandingSection.title}
                    </h4>
                    <p className="text-gray-700 text-lg max-w-4xl mx-auto leading-relaxed">
                      {project.dualSections.brandingSection.description}
                    </p>
                  </div>
                  
                  {/* Branding Images Grid - Flexible Layout for 2 images */}
                  <div className={`mb-6 ${
                    project.dualSections.brandingSection.layout === 'vertical_horizontal' 
                      ? 'grid grid-cols-1 md:grid-cols-2 gap-6' 
                      : 'grid grid-cols-1 md:grid-cols-3 gap-6'
                  }`}>
                    {project.dualSections.brandingSection.images.map((image, index) => (
                      <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg">
                        <div className="bg-gradient-to-br from-pink-400 via-rose-400 to-red-400 rounded-xl p-1">
                          <div className="bg-white rounded-lg overflow-hidden">
                            <img 
                              src={image} 
                              alt={`Design Work ${index + 1}`}
                              className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                                project.dualSections.brandingSection.layout === 'vertical_horizontal' 
                                  ? 'h-64' 
                                  : 'h-48'
                              }`}
                            />
                            <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs px-3 py-1 rounded-full shadow-lg">
                              Design #{index + 1}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Branding Highlights */}
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h5 className="font-bold text-rose-800 mb-4 flex items-center">
                      <span className="text-2xl mr-2">✨</span>
                      Creative Design Highlights
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.dualSections.brandingSection.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-rose-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700 text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Combined TikTok Section - Indigenous Coffee House Success Story */}
            {project.combinedTikTokSection && (
              <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 border-4 border-transparent bg-clip-padding rounded-2xl p-8 shadow-2xl">
                
                {/* Section Header with Indigenous Coffee House Theme */}
                <div className="text-center mb-8">
                  <h4 className="text-3xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
                    {project.combinedTikTokSection.sectionTitle}
                  </h4>
                </div>

                {/* Videos Title */}
                <div className="text-center mb-6">
                  <h5 className="text-2xl font-bold text-amber-800 mb-2 flex items-center justify-center">
                    <span className="text-3xl mr-3">🎬</span>
                    {project.combinedTikTokSection.videosTitle}
                  </h5>
                  <p className="text-amber-600 font-medium">
                    {project.combinedTikTokSection.videosSubtitle}
                  </p>
                </div>
                
                {/* 6 TikTok Videos Grid - Easy to Customize */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {project.combinedTikTokSection.videos.map((video, index) => (
                    <div key={video.id} className="group relative">
                      {/* Video Card with Indigenous-inspired Gradient Border */}
                      <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 rounded-2xl p-1 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                        <div className="bg-white rounded-xl overflow-hidden">
                          {/* Video Thumbnail - EASY TO REPLACE */}
                          <div className="relative aspect-[9/16] overflow-hidden bg-gray-100 flex items-center justify-center">
                            {video.thumbnail.startsWith('PLACEHOLDER_THUMBNAIL_') ? (
                              // Placeholder for your custom thumbnails
                              <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 flex flex-col items-center justify-center text-amber-700">
                                <span className="text-4xl mb-2">📱</span>
                                <span className="text-sm font-medium">Your Screenshot Here</span>
                                <span className="text-xs">{video.thumbnail}</span>
                              </div>
                            ) : (
                              <img 
                                src={video.thumbnail} 
                                alt={video.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            )}
                            
                            {/* TikTok Play Overlay */}
                            <div 
                              className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                              onClick={() => window.open(video.url, '_blank')}
                            >
                              <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-full p-4 shadow-xl animate-pulse">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                            </div>
                            
                            {/* Video Number Badge */}
                            <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm px-3 py-1 rounded-full shadow-lg">
                              #{index + 1}
                            </div>
                            
                            {/* Content Type Badge */}
                            <div className={`absolute top-3 right-3 text-white font-semibold text-xs px-2 py-1 rounded-full shadow-lg ${
                              video.type === 'organic_content' 
                                ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                                : 'bg-gradient-to-r from-orange-400 to-red-500'
                            }`}>
                              {video.type === 'organic_content' ? '🌟 ORGANIC' : '🎯 AD'}
                            </div>
                          </div>
                          
                          {/* Video Info */}
                          <div className="p-4">
                            <h5 className="font-bold text-gray-800 text-sm mb-2 truncate">
                              {video.title}
                            </h5>
                            <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                              {video.description}
                            </p>
                            
                            {/* Watch Button with Indigenous Theme */}
                            <button
                              onClick={() => window.open(video.url, '_blank')}
                              className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-bold py-2 px-4 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm flex items-center justify-center space-x-2"
                            >
                              <span>🎵</span>
                              <span>Watch on TikTok</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Performance Stats with Indigenous Business Theme */}
                <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-red-100 rounded-xl p-6">
                  <h5 className="font-bold text-amber-800 mb-4 text-center flex items-center justify-center">
                    <span className="text-2xl mr-2">🏜️</span>
                    Indigenous Business Success Metrics
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">85%</div>
                      <div className="text-sm text-gray-600 font-medium">Engagement Increase</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">40%</div>
                      <div className="text-sm text-gray-600 font-medium">Foot Traffic Boost</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">120%</div>
                      <div className="text-sm text-gray-600 font-medium">Brand Awareness Growth</div>
                    </div>
                  </div>
                </div>

                {/* Easy Customization Instructions */}
                <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <div className="text-xs text-blue-700">
                    <strong>💡 Easy Customization:</strong> Replace "PLACEHOLDER_THUMBNAIL_X" with your actual screenshot URLs and update video URLs in the data file for seamless integration.
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Project Information Section */}
            <div className="space-y-8 pt-6 border-t border-gray-200">
              
              {/* Project Overview Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <h4 className="font-bold text-red-600 text-sm uppercase tracking-wider">Category</h4>
                  <p className="text-gray-700 font-medium">{project.category}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-red-600 text-sm uppercase tracking-wider">Client</h4>
                  <p className="text-gray-700 font-medium">{project.client}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-red-600 text-sm uppercase tracking-wider">Project Type</h4>
                  <p className="text-gray-700 font-medium">{project.project_type || project.projectType || 'Digital Marketing'}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-red-600 text-sm uppercase tracking-wider">Format</h4>
                  <p className="text-gray-700 font-medium capitalize">{project.orientation} {project.type}</p>
                </div>
              </div>

              {/* Key Contributions Section */}
              {(project.key_contributions || project.keyContributions) && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
                  <h4 className="font-bold text-blue-800 mb-4 text-lg flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Key Contributions
                  </h4>
                  <ul className="space-y-3">
                    {(project.key_contributions || project.keyContributions || []).map((contribution, index) => (
                      <li key={index} className="flex items-start text-blue-700">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm leading-relaxed">{contribution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skills Utilized Section */}
              {(project.skills_utilized || project.skillsUtilized) && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                  <h4 className="font-bold text-green-800 mb-4 text-lg flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                    Skills Utilized
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(project.skills_utilized || project.skillsUtilized || []).map((skill, index) => (
                      <span 
                        key={index}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium border border-green-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Impact Section */}
              {project.impact && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
                  <h4 className="font-bold text-purple-800 mb-4 text-lg flex items-center">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                    Project Impact
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Quantified Metrics */}
                    {project.impact.quantified_metrics && project.impact.quantified_metrics.length > 0 && (
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h5 className="font-semibold text-purple-700 mb-3 flex items-center">
                          <span className="text-lg mr-2">📈</span>
                          Quantified Results
                        </h5>
                        <ul className="space-y-2">
                          {project.impact.quantified_metrics.map((metric, index) => (
                            <li key={index} className="flex items-start text-purple-600 text-sm">
                              <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              {metric}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Qualitative Outcomes */}
                    {project.impact.qualitative_outcomes && project.impact.qualitative_outcomes.length > 0 && (
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h5 className="font-semibold text-pink-700 mb-3 flex items-center">
                          <span className="text-lg mr-2">✨</span>
                          Qualitative Outcomes
                        </h5>
                        <ul className="space-y-2">
                          {project.impact.qualitative_outcomes.map((outcome, index) => (
                            <li key={index} className="flex items-start text-pink-600 text-sm">
                              <span className="w-1.5 h-1.5 bg-pink-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Legacy custom fields for backward compatibility */}
              {(project.program || project.focus || project.myRole) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
                  {project.program && (
                    <div className="space-y-2">
                      <h4 className="font-bold text-red-600 text-sm uppercase tracking-wider">Program</h4>
                      <p className="text-gray-700 font-medium">{project.program}</p>
                    </div>
                  )}
                  {project.focus && (
                    <div className="space-y-2">
                      <h4 className="font-bold text-red-600 text-sm uppercase tracking-wider">Focus</h4>
                      <p className="text-gray-700 font-medium">{project.focus}</p>
                    </div>
                  )}
                  {project.myRole && (
                    <div className="space-y-2">
                      <h4 className="font-bold text-red-600 text-sm uppercase tracking-wider">My Role</h4>
                      <p className="text-gray-700 font-medium">{project.myRole}</p>
                    </div>
                  )}
                </div>
              )}
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
            
            {project.socialMediaCampaign && (
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-200 rounded-xl p-4 md:p-6">
                <h4 className="font-bold text-pink-800 mb-4 text-lg">Social Media Campaign Performance</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h5 className="font-semibold text-pink-700 mb-2">Platform & Scale</h5>
                    <p className="text-sm text-pink-600 mb-1">📱 Platform: {project.socialMediaCampaign.platform}</p>
                    <p className="text-sm text-pink-600">🎥 Total Videos: {project.socialMediaCampaign.totalVideos}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h5 className="font-semibold text-purple-700 mb-2">Performance Metrics</h5>
                    <div className="text-sm text-purple-600 space-y-1">
                      {project.socialMediaCampaign.performanceMetrics.conversionIncrease && (
                        <p>💹 Conversion Increase: {project.socialMediaCampaign.performanceMetrics.conversionIncrease}</p>
                      )}
                      {project.socialMediaCampaign.performanceMetrics.highEngagement && (
                        <p>🔥 High Engagement Videos: {project.socialMediaCampaign.performanceMetrics.highEngagement}</p>
                      )}
                      {project.socialMediaCampaign.performanceMetrics.topConverter && (
                        <p>🎯 Top Converter: {project.socialMediaCampaign.performanceMetrics.topConverter} video</p>
                      )}
                      <p>📊 Brand Awareness: {project.socialMediaCampaign.performanceMetrics.brandAwareness}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h5 className="font-semibold text-green-700 mb-3">Campaign Videos</h5>
                  <div className="space-y-3">
                    {project.socialMediaCampaign.videos.map((video, index) => (
                      <div key={index} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm text-gray-700 mb-1">{video.description}</p>
                          <p className="text-xs text-green-600 font-medium">📈 {video.performance}</p>
                        </div>
                        <a
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-pink-500 hover:bg-pink-600 text-white text-xs px-3 py-1 rounded-full transition-colors ml-3"
                        >
                          View Video
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {project.videoContent && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-4 md:p-6">
                <h4 className="font-bold text-purple-800 mb-4 text-lg">Video Content Collection</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h5 className="font-semibold text-purple-700 mb-2">Content Series</h5>
                    <p className="text-sm text-purple-600">📹 Total Videos: {project.videoContent.totalVideos}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h5 className="font-semibold text-blue-700 mb-2">Platform Distribution</h5>
                    <p className="text-sm text-blue-600">🎬 {project.type === 'video' ? 'Social Media & YouTube' : 'Educational Platform'}</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h5 className="font-semibold text-green-700 mb-3">Video Collection</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.videoContent.videos.map((video, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm text-gray-700 mb-1">Video {index + 1}</p>
                          <p className="text-xs text-green-600 font-medium">
                            {project.type === 'video' ? '📱 Social Media Reel' : '📚 Educational Content'}
                          </p>
                        </div>
                        <a
                          href={video}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-purple-500 hover:bg-purple-600 text-white text-xs px-3 py-1 rounded-full transition-colors ml-3"
                        >
                          Watch
                        </a>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-700">
                      💡 <strong>Note:</strong> Video content can be updated through the backend admin panel. Upload new videos or update social media links as needed.
                    </p>
                  </div>
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
