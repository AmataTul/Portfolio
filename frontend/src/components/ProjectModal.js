import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { X, Play, ChevronLeft, ChevronRight, ExternalLink, Youtube } from 'lucide-react';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return null;

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen, project]);

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

  // Utility function to extract YouTube video ID from various URL formats
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Check if the video URL is YouTube
  const isYouTubeUrl = (url) => {
    return url && (url.includes('youtube.') || url.includes('youtu.be'));
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
          {/* YouTube Embedded Video Section - Show immediately for YouTube projects */}
          {(project.youtubeEmbedId || isYouTubeUrl(project.video_url)) && (
            <div className="mb-8">
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border border-red-200 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <Youtube className="w-8 h-8 text-red-600" />
                  <div>
                    <h3 className="font-bold text-red-800 text-xl">Advertisement Video</h3>
                    <p className="text-red-600 text-sm">Professional advertisement campaign</p>
                  </div>
                </div>
                
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-xl">
                  <iframe
                    src={`https://www.youtube.com/embed/${project.youtubeEmbedId || getYouTubeId(project.video_url)}?rel=0`}
                    title={project.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                
                <div className="mt-4 flex items-center justify-end">
                  <Button
                    onClick={() => window.open(project.video_url, '_blank')}
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Open in YouTube
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Project Media - Skip for YouTube projects */}
          {!(project.youtubeEmbedId || isYouTubeUrl(project.video_url)) && project.images && project.images.length > 0 && (
            <div className="relative">
              {/* Special Disney Magic Marketing Audit Showcase */}
              {project.title && project.title.includes('Disney Brand Marketing Audit') ? (
                <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-xl p-6 shadow-lg">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">✨ Disney Brand Marketing Audit</h3>
                    <p className="text-lg text-purple-700 mb-3 font-semibold">Strategic Analysis & Consumer Insights</p>
                    <div className="bg-white/80 backdrop-blur rounded-lg p-4 mb-6 border border-purple-200">
                      <div className="flex justify-center items-center space-x-8 mb-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-600">🏰</div>
                          <div className="text-sm font-semibold text-gray-700">Disney Magic</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-pink-600">📊</div>
                          <div className="text-sm font-semibold text-gray-700">Strategic Audit</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600">🎯</div>
                          <div className="text-sm font-semibold text-gray-700">USU Project</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-600">💡</div>
                          <div className="text-sm font-semibold text-gray-700">Brand Insights</div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg px-6 py-2 inline-block border border-purple-300">
                          <span className="text-lg font-semibold text-purple-800">🎓 Utah State University Strategic Marketing Analysis</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center flex-wrap gap-2 mb-6">
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">Brand Analysis</span>
                      <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">Consumer Insights</span>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Marketing Strategy</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Competitive Analysis</span>
                    </div>
                  </div>
                  
                  {/* Key Visual Insights Section - Only 3 Items */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="text-2xl mr-2">🎯</span>
                      Key Strategic Insights (3 core findings)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {project.images.map((item, index) => (
                        <div key={index} className="bg-white/90 backdrop-blur rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 border-purple-200 hover:border-purple-300">
                          <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center p-4 relative">
                            <div className="absolute top-2 right-2 text-yellow-400 text-xs">✨</div>
                            <div className="text-center">
                              <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center mb-3 border-2 border-white shadow-md">
                                <span className="text-3xl">
                                  {index === 0 && '🏰'}
                                  {index === 1 && '👥'}
                                  {index === 2 && '📱'}
                                </span>
                              </div>
                              <div className="text-sm font-bold text-purple-700 mb-2">
                                {item.category}
                              </div>
                              <div className="text-xs text-purple-600 leading-tight">
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Disney Magic Summary */}
                  <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 rounded-xl p-6 border-2 border-purple-200 mb-8">
                    <h4 className="font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
                      <span className="text-2xl mr-2">✨</span>
                      Key Disney Marketing Insights
                      <span className="text-2xl ml-2">🏰</span>
                    </h4>
                    
                    {/* Concise Findings Section */}
                    <div className="mb-6">
                      <h5 className="font-semibold text-purple-700 mb-3 text-lg">🔍 What We Discovered:</h5>
                      <div className="space-y-3">
                        {project.key_audit_findings && project.key_audit_findings.map((finding, index) => (
                          <div key={index} className="bg-white/90 backdrop-blur rounded-lg p-4 text-sm text-gray-700 shadow-sm border border-purple-200">
                            {finding}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Strategic Recommendations */}
                    <div>
                      <h5 className="font-semibold text-blue-700 mb-3 text-lg">💡 Strategic Recommendations:</h5>
                      <div className="space-y-3">
                        {project.strategic_recommendations && project.strategic_recommendations.map((recommendation, index) => (
                          <div key={index} className="bg-white/90 backdrop-blur rounded-lg p-4 text-sm text-gray-700 shadow-sm border border-blue-200">
                            {recommendation}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Academic Excellence Summary */}
                  <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 rounded-xl p-6 border-2 border-purple-200">
                    <h4 className="font-bold text-gray-800 mb-4 text-center flex items-center justify-center">
                      <span className="text-2xl mr-2">🏰</span>
                      Disney Marketing Audit Excellence
                      <span className="text-2xl ml-2">✨</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div className="bg-white/80 backdrop-blur rounded-lg p-4 shadow-sm border border-purple-200">
                        <div className="text-2xl mb-2">🎯</div>
                        <div className="text-lg font-bold text-purple-600 mb-1">Strategic Analysis</div>
                        <div className="text-sm text-gray-600">Comprehensive brand positioning and competitive landscape analysis</div>
                      </div>
                      <div className="bg-white/80 backdrop-blur rounded-lg p-4 shadow-sm border border-pink-200">
                        <div className="text-2xl mb-2">📊</div>
                        <div className="text-lg font-bold text-pink-600 mb-1">Consumer Insights</div>
                        <div className="text-sm text-gray-600">In-depth audience analysis and behavioral pattern evaluation</div>
                      </div>
                      <div className="bg-white/80 backdrop-blur rounded-lg p-4 shadow-sm border border-blue-200">
                        <div className="text-2xl mb-2">💫</div>
                        <div className="text-lg font-bold text-blue-600 mb-1">Strategic Recommendations</div>
                        <div className="text-sm text-gray-600">Data-driven recommendations for marketing optimization</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : project.title && project.title.includes('Adobe Analytics Competition - Hildon Hotel Data Analysis') ? (
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">🏆 Academic Excellence & Research Achievement</h3>
                    <p className="text-lg text-gray-600 mb-3">Adobe Analytics Competition - Hildon Hotel Data Analysis</p>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
                      <div className="flex justify-center items-center space-x-8 mb-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600">5000+</div>
                          <div className="text-sm text-gray-600">Universities Competed</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-600">2021</div>
                          <div className="text-sm text-gray-600">Competition Year</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-600">USU</div>
                          <div className="text-sm text-gray-600">Utah State University</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-orange-600">Senior</div>
                          <div className="text-sm text-gray-600">Bachelor's Level</div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="bg-white rounded-lg px-6 py-3 inline-block">
                          <span className="text-lg font-semibold text-gray-800">🎓 Represented Utah State University in Master's Level Competition</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center flex-wrap gap-2 mb-6">
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">Adobe Analytics</span>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Data Analysis</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Research Excellence</span>
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">Team Collaboration</span>
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">Hildon Hotel Analysis</span>
                    </div>
                  </div>
                  
                  {/* Competition Overview & Key Slides Section */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="text-2xl mr-2">📊</span>
                      Competition Overview & Presentation Highlights (4 items)
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {project.images.slice(0, 4).map((item, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                          <div className="aspect-square bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-3">
                            <div className="text-center">
                              <div className="w-14 h-14 bg-blue-200 rounded-lg flex items-center justify-center mb-2">
                                <svg className="w-7 h-7 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="text-xs font-medium text-gray-700 leading-tight mb-1">
                                {item.placeholder}
                              </div>
                              <div className="text-xs text-gray-500">
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Data Analysis & Methodology Section */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="text-2xl mr-2">🔍</span>
                      Data Analysis & Research Methodology (4 items)
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {project.images.slice(4, 8).map((item, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                          <div className="aspect-square bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-3">
                            <div className="text-center">
                              <div className="w-14 h-14 bg-green-200 rounded-lg flex items-center justify-center mb-2">
                                <svg className="w-7 h-7 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="text-xs font-medium text-gray-700 leading-tight mb-1">
                                {item.placeholder}
                              </div>
                              <div className="text-xs text-gray-500">
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Results & Achievement Section */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="text-2xl mr-2">📈</span>
                      Competition Results & Academic Achievement (4 items)
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {project.images.slice(8, 12).map((item, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                          <div className="aspect-square bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-3">
                            <div className="text-center">
                              <div className="w-14 h-14 bg-purple-200 rounded-lg flex items-center justify-center mb-2">
                                <svg className="w-7 h-7 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="text-xs font-medium text-gray-700 leading-tight mb-1">
                                {item.placeholder}
                              </div>
                              <div className="text-xs text-gray-500">
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Academic Excellence Summary */}
                  <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-800 mb-4 text-center">🎓 Outstanding Academic & Research Achievement</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-xl font-bold text-blue-600 mb-1">Competitive Excellence</div>
                        <div className="text-sm text-gray-600">Represented university against 5000+ competitors in Adobe Analytics Challenge</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-xl font-bold text-purple-600 mb-1">Graduate-Level Work</div>
                        <div className="text-sm text-gray-600">Bachelor's senior collaborating with master's research team on advanced analytics</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-xl font-bold text-green-600 mb-1">Professional Tools</div>
                        <div className="text-sm text-gray-600">Advanced proficiency in Adobe Analytics platform for complex data analysis</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : project.title && project.title.includes('Aigata Brand - Complete Business Development') ? (
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">🏢 Complete Business Success Story</h3>
                    <p className="text-lg text-gray-600 mb-3">Aigata Brand - "Friendly Futures"</p>
                    <div className="flex justify-center items-center space-x-8 mb-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">1000+</div>
                        <div className="text-sm text-gray-600">Total Sales</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">6+</div>
                        <div className="text-sm text-gray-600">Years Running</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">5</div>
                        <div className="text-sm text-gray-600">Platforms</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-orange-600">24</div>
                        <div className="text-sm text-gray-600">Product Designs</div>
                      </div>
                    </div>
                    <div className="flex justify-center flex-wrap gap-2 mb-6">
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">Amazon</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Etsy</span>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">eBay</span>
                      <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">TikTok Shop</span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">In-Person Events</span>
                    </div>
                  </div>
                  
                  {/* Brand Identity Section */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="text-2xl mr-2">🎨</span>
                      Brand Identity & Logo Design (6 items)
                    </h4>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {project.images.slice(0, 6).map((item, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                          <div className="aspect-square bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-3">
                            <div className="text-center">
                              <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center mb-2">
                                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="text-xs font-medium text-gray-700 leading-tight">
                                {item.placeholder}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top-Selling Products Section */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="text-2xl mr-2">🛍️</span>
                      Top-Selling Products Across Platforms (6 items)
                    </h4>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {project.images.slice(6, 12).map((item, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                          <div className="aspect-square bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-3">
                            <div className="text-center">
                              <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center mb-2">
                                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="text-xs font-medium text-gray-700 leading-tight">
                                {item.placeholder}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Product Development Process Section */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="text-2xl mr-2">⚙️</span>
                      Product Development & Business Operations (6 items)
                    </h4>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {project.images.slice(12, 18).map((item, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                          <div className="aspect-square bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center p-3">
                            <div className="text-center">
                              <div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center mb-2">
                                <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="text-xs font-medium text-gray-700 leading-tight">
                                {item.placeholder}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sales Success & Analytics Section */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="text-2xl mr-2">📈</span>
                      Sales Success & Performance Analytics (6 items)
                    </h4>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {project.images.slice(18, 24).map((item, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                          <div className="aspect-square bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-3">
                            <div className="text-center">
                              <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center mb-2">
                                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="text-xs font-medium text-gray-700 leading-tight">
                                {item.placeholder}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Business Achievement Summary */}
                  <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-green-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-800 mb-4 text-center">🏆 Complete Business Ownership & Success</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-xl font-bold text-purple-600 mb-1">Full Development</div>
                        <div className="text-sm text-gray-600">Initiated, designed, and launched complete business from concept to success</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-xl font-bold text-blue-600 mb-1">Multi-Platform</div>
                        <div className="text-sm text-gray-600">Successfully managing sales across 5+ platforms and in-person events</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-xl font-bold text-green-600 mb-1">Proven Results</div>
                        <div className="text-sm text-gray-600">1000+ sales milestone achieved with 6+ years of continuous operation</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : project.title && project.title.includes('Multi-Business Social Media Posts') ? (
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">📱 30 Social Media Posts Campaign</h3>
                  <p className="text-sm text-gray-600 mb-6 text-center">
                    Content created for Ute Tribal Enterprises, Ute Bison Ranch, Ute Plaza Supermarket & KahPeeh Kah-Ahn Coffee House
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                    {project.images.map((post, index) => (
                      <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                        {/* Instagram-style post */}
                        <div className="flex flex-col">
                          {/* Post header */}
                          <div className="flex items-center justify-between p-3 border-b border-gray-100">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-xs">
                                {post.business.includes('Tribal') && 'UT'}
                                {post.business.includes('Bison') && 'BR'}
                                {post.business.includes('Plaza') && 'PS'}
                                {post.business.includes('Coffee') && 'CH'}
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-gray-800">
                                  {post.business.includes('Tribal') && 'utetribal'}
                                  {post.business.includes('Bison') && 'utebisonranch'}
                                  {post.business.includes('Plaza') && 'uteplaza'}
                                  {post.business.includes('Coffee') && 'kahpeehkah'}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Image placeholder */}
                          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                            <div className="text-center p-4">
                              <div className="text-gray-400 text-sm font-medium mb-3">{post.placeholder}</div>
                              <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="text-xs text-gray-500 mt-2 font-medium">Upload Image</div>
                            </div>
                          </div>
                          
                          {/* Action buttons (Instagram style) */}
                          <div className="p-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                {/* Heart (Like) */}
                                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                                {/* Comment */}
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                {/* Share */}
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                </svg>
                              </div>
                              {/* Bookmark */}
                              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                              </svg>
                            </div>
                            
                            {/* Engagement numbers */}
                            <div className="space-y-1">
                              <div className="text-xs font-semibold text-gray-800">{post.likes} likes</div>
                              <div className="text-xs text-gray-600">{post.comments} comments</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Campaign Performance Metrics */}
                  <div className="mt-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-800 mb-4 text-center">📈 Campaign Impact Metrics</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="text-2xl font-bold text-indigo-600">30</div>
                        <div className="text-sm text-gray-600">Posts Created</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="text-2xl font-bold text-blue-600">8</div>
                        <div className="text-sm text-gray-600">Platforms Managed</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="text-2xl font-bold text-green-600">4</div>
                        <div className="text-sm text-gray-600">Businesses</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="text-2xl font-bold text-purple-600">95%</div>
                        <div className="text-sm text-gray-600">Engagement Rate</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : project.title && project.title.includes('Comprehensive Graphic Design Portfolio') ? (
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">🎨 34 Professional Graphic Design Pieces</h3>
                  <p className="text-sm text-gray-600 mb-6 text-center">
                    Multi-category portfolio spanning promotional materials, brand identity, and event marketing
                  </p>
                  
                  {/* Line 1: Ute Bison Ranch Graphics */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="text-2xl mr-2">🦬</span>
                      Ute Bison Ranch Promos & Marketing Materials (13 items)
                    </h4>
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 md:gap-3">
                      {project.images.slice(0, 13).map((item, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                          <div className="aspect-square bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-2">
                            <div className="text-center">
                              <div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center mb-2">
                                <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="text-xs font-medium text-gray-700 leading-tight">
                                {item.placeholder}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Line 2: Design Assets */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="text-2xl mr-2">🎨</span>
                      Custom Design Assets (4 items)
                    </h4>
                    <div className="grid grid-cols-4 gap-4">
                      {project.images.slice(13, 17).map((item, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                          <div className="aspect-square bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-3">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-purple-200 rounded-lg flex items-center justify-center mb-2">
                                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="text-sm font-medium text-gray-700 leading-tight">
                                {item.placeholder}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Line 3: Multi-Business Graphics */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="text-2xl mr-2">🏪</span>
                      Multi-Business Graphics: Plaza, Petroleum & Coffee House (13 items)
                    </h4>
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 md:gap-3">
                      {project.images.slice(17, 30).map((item, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                          <div className="aspect-square bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-2">
                            <div className="text-center">
                              <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center mb-2">
                                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="text-xs font-medium text-gray-700 leading-tight">
                                {item.placeholder}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Line 4: Event Flyers */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="text-2xl mr-2">📋</span>
                      Event Flyers (4 items)
                    </h4>
                    <div className="grid grid-cols-4 gap-4">
                      {project.images.slice(30, 34).map((item, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                          <div className="aspect-square bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center p-3">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-yellow-200 rounded-lg flex items-center justify-center mb-2">
                                <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="text-sm font-medium text-gray-700 leading-tight">
                                {item.placeholder}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Regular image display - Auto-fit any image size to container */
                <div className={`relative aspect-video max-w-4xl mx-auto bg-gray-100 rounded-xl overflow-hidden shadow-xl project-image-container`}>
                  <img 
                    src={project.images[currentImageIndex]} 
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    style={{ 
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                  
                  {/* Navigation arrows for multiple images */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={previousImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                  
                  {/* Image counter for multiple images */}
                  {project.images.length > 1 && (
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
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

            {/* Creative Design Highlights - Show after description for Beats by Dre */}
            {project.creativeDesignHighlights && (
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200 rounded-xl p-6">
                <h4 className="font-semibold text-pink-800 mb-4 text-lg flex items-center">
                  <span className="text-2xl mr-2">🎨</span>
                  Creative Design Highlights
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.creativeDesignHighlights.map((highlight, index) => (
                    <div key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-pink-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700 text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Separate Analytics Section - Independent from main images */}
            {project.separateAnalyticsSection && (
              <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-4 border-transparent bg-clip-padding rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <h4 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 flex items-center justify-center">
                    <span className="text-4xl mr-3">📊</span>
                    {project.separateAnalyticsSection.title}
                  </h4>
                  <p className="text-gray-700 text-lg max-w-4xl mx-auto leading-relaxed">
                    {project.separateAnalyticsSection.description}
                  </p>
                </div>
                
                {/* All 4 Horizontal Analytics Images Grid */}
                <div className="space-y-6">
                  {/* First row: 2 horizontal images */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.separateAnalyticsSection.images.slice(0, 2).map((image, index) => (
                      <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg">
                        <div className="bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 rounded-xl p-1">
                          <div className="bg-white rounded-lg overflow-hidden">
                            <div className="relative aspect-video bg-gray-100 flex items-center justify-center">
                              <img 
                                src={image} 
                                alt={`Beats Analytics ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                style={{ 
                                  objectFit: 'cover',
                                  objectPosition: 'center'
                                }}
                              />
                            </div>
                            <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-xs px-3 py-1 rounded-full shadow-lg">
                              Analytics #{index + 1}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Second row: 2 horizontal images */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.separateAnalyticsSection.images.slice(2, 4).map((image, index) => (
                      <div key={index + 2} className="group relative overflow-hidden rounded-xl shadow-lg">
                        <div className="bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 rounded-xl p-1">
                          <div className="bg-white rounded-lg overflow-hidden">
                            <div className="relative aspect-video bg-gray-100 flex items-center justify-center">
                              <img 
                                src={image} 
                                alt={`Beats Analytics ${index + 3}`}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                style={{ 
                                  objectFit: 'cover',
                                  objectPosition: 'center'
                                }}
                              />
                            </div>
                            <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-xs px-3 py-1 rounded-full shadow-lg">
                              Analytics #{index + 3}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Analytics Highlights */}
                <div className="bg-white rounded-xl p-6 shadow-sm mt-6">
                  <h5 className="font-bold text-indigo-800 mb-4 flex items-center">
                    <span className="text-2xl mr-2">🔍</span>
                    Research & Analysis Highlights
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.separateAnalyticsSection.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700 text-sm">{highlight}</span>
                      </div>
                    ))}
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
