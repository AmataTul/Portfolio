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

  // Check if the video URL is TikTok
  const isTikTokUrl = (url) => {
    return url && url.includes('tiktok.com');
  };

  // Extract TikTok video ID from URL
  const getTikTokId = (url) => {
    if (!url) return null;
    const match = url.match(/video\/(\d+)/);
    return match ? match[1] : null;
  };

  // Check if the video URL is Facebook
  const isFacebookUrl = (url) => {
    return url && (url.includes('facebook.com') || url.includes('fb.watch'));
  };

  // Extract Facebook video ID from URL
  const getFacebookEmbedUrl = (url) => {
    if (!url) return null;
    
    // Handle fb.watch URLs
    if (url.includes('fb.watch')) {
      const watchId = url.split('/').pop();
      return `https://www.facebook.com/plugins/video.php?height=476&href=https://fb.watch/${watchId}&show_text=false&width=267&t=0`;
    }
    
    // Handle facebook.com/reel URLs
    if (url.includes('/reel/')) {
      const reelMatch = url.match(/\/reel\/(\d+)/);
      const reelId = reelMatch ? reelMatch[1] : null;
      if (reelId) {
        return `https://www.facebook.com/plugins/video.php?height=476&href=https://www.facebook.com/reel/${reelId}&show_text=false&width=267&t=0`;
      }
    }
    
    // Handle facebook.com/videos URLs
    if (url.includes('/videos/')) {
      return `https://www.facebook.com/plugins/video.php?height=476&href=${encodeURIComponent(url)}&show_text=false&width=267&t=0`;
    }
    
    // Default fallback for other Facebook URLs
    return `https://www.facebook.com/plugins/video.php?height=476&href=${encodeURIComponent(url)}&show_text=false&width=267&t=0`;
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
                <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-2xl p-8 shadow-2xl border border-gray-200">
                  {/* Dynamic Header with Animated Elements */}
                  <div className="relative mb-12">
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
                    <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full opacity-15 animate-bounce"></div>
                    
                    <div className="text-center relative z-10">
                      <div className="inline-flex items-center gap-3 mb-4 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-gray-200">
                        <span className="text-3xl animate-bounce">🏰</span>
                        <div className="h-8 w-px bg-gray-300"></div>
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">RESEARCH DEEP DIVE</span>
                        <div className="h-8 w-px bg-gray-300"></div>
                        <span className="text-3xl animate-pulse">📊</span>
                      </div>
                      
                      <h3 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
                        Disney Brand Marketing Audit
                      </h3>
                      <p className="text-xl text-gray-600 font-medium mb-6">Strategic Analysis & Consumer Insights Research</p>
                      
                      {/* Research Metrics Dashboard */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-md border border-purple-200 hover:shadow-lg transition-all duration-300">
                          <div className="text-3xl font-bold text-purple-600">12+</div>
                          <div className="text-sm font-medium text-gray-700">Analysis Areas</div>
                        </div>
                        <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-md border border-pink-200 hover:shadow-lg transition-all duration-300">
                          <div className="text-3xl font-bold text-pink-600">8+</div>
                          <div className="text-sm font-medium text-gray-700">Platforms Studied</div>
                        </div>
                        <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-md border border-blue-200 hover:shadow-lg transition-all duration-300">
                          <div className="text-3xl font-bold text-blue-600">15+</div>
                          <div className="text-sm font-medium text-gray-700">Campaigns Analyzed</div>
                        </div>
                        <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-md border border-indigo-200 hover:shadow-lg transition-all duration-300">
                          <div className="text-3xl font-bold text-indigo-600">6+</div>
                          <div className="text-sm font-medium text-gray-700">Strategic Insights</div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl px-6 py-3 inline-block border border-indigo-200 shadow-md">
                        <span className="font-semibold text-indigo-800 flex items-center gap-2">
                          <span className="text-lg">🎓</span>
                          Utah State University Strategic Marketing Analysis
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Research Methodology Section */}
                  <div className="mb-10">
                    <div className="flex items-center justify-center mb-6">
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"></div>
                      <div className="px-6 py-2 bg-white rounded-full shadow-md border border-gray-200">
                        <span className="font-bold text-gray-800 flex items-center gap-2">
                          <span className="text-xl">🔬</span>
                          RESEARCH FRAMEWORK
                        </span>
                      </div>
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {project.images.map((item, index) => (
                        <div key={index} className="group relative bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                          <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                            {index + 1}
                          </div>
                          
                          <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center border-2 border-indigo-200 group-hover:border-indigo-400 transition-colors duration-300">
                              <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                                {index === 0 && '🏰'}
                                {index === 1 && '👥'}
                                {index === 2 && '📱'}
                              </span>
                            </div>
                            <h5 className="font-bold text-gray-900 mb-2 text-lg">{item.category}</h5>
                            <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Findings & Insights Section */}
                  <div className="mb-10">
                    <div className="flex items-center justify-center mb-8">
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"></div>
                      <div className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg">
                        <span className="font-bold flex items-center gap-2">
                          <span className="text-xl">💡</span>
                          RESEARCH DISCOVERIES
                        </span>
                      </div>
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"></div>
                    </div>
                    
                    <div className="space-y-6">
                      {project.key_audit_findings && project.key_audit_findings.map((finding, index) => (
                        <div key={index} className="group bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-400 hover:shadow-lg hover:border-purple-500 transition-all duration-300">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center border-2 border-purple-200 group-hover:border-purple-400 transition-colors duration-300">
                              <span className="font-bold text-purple-600 text-sm">#{index + 1}</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-800 leading-relaxed">{finding}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strategic Recommendations Section */}
                  <div className="mb-10">
                    <div className="flex items-center justify-center mb-8">
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"></div>
                      <div className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-lg">
                        <span className="font-bold flex items-center gap-2">
                          <span className="text-xl">🎯</span>
                          STRATEGIC RECOMMENDATIONS
                        </span>
                      </div>
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {project.strategic_recommendations && project.strategic_recommendations.map((recommendation, index) => (
                        <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 hover:border-blue-300 shadow-md hover:shadow-lg transition-all duration-300">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                              R{index + 1}
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-800 leading-relaxed font-medium">{recommendation}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Research Impact Summary */}
                  <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-2xl p-8 border-2 border-indigo-200 shadow-lg">
                    <div className="text-center mb-8">
                      <h4 className="text-2xl font-black text-gray-900 mb-2 flex items-center justify-center gap-3">
                        <span className="text-3xl">🏆</span>
                        RESEARCH IMPACT & EXCELLENCE
                        <span className="text-3xl">✨</span>
                      </h4>
                      <p className="text-gray-600 font-medium">Comprehensive strategic analysis delivering actionable business insights</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white/90 backdrop-blur rounded-xl p-6 shadow-md border border-purple-200 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                          🎯
                        </div>
                        <h5 className="font-bold text-lg text-purple-700 mb-2">Strategic Analysis</h5>
                        <p className="text-gray-600 text-sm leading-relaxed">Comprehensive brand positioning and competitive landscape analysis</p>
                      </div>
                      
                      <div className="bg-white/90 backdrop-blur rounded-xl p-6 shadow-md border border-blue-200 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                          📊
                        </div>
                        <h5 className="font-bold text-lg text-blue-700 mb-2">Consumer Insights</h5>
                        <p className="text-gray-600 text-sm leading-relaxed">In-depth audience analysis and behavioral pattern evaluation</p>
                      </div>
                      
                      <div className="bg-white/90 backdrop-blur rounded-xl p-6 shadow-md border border-indigo-200 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                          💡
                        </div>
                        <h5 className="font-bold text-lg text-indigo-700 mb-2">Strategic Outcomes</h5>
                        <p className="text-gray-600 text-sm leading-relaxed">Data-driven recommendations for marketing optimization</p>
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
                  
                  {/* Data Analysis & Findings Section */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="text-2xl mr-2">📊</span>
                      Data Analysis & Findings (5 items)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {project.images.slice(0, 5).map((image, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                          <div className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden relative">
                            {typeof image === 'string' && (image.includes('http') || image.includes('https')) ? (
                              <img 
                                src={image}
                                alt={`Data Analysis Question ${index + 1}`}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextElementSibling.style.display = 'flex';
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-500">
                                <span className="text-4xl mb-2">📈</span>
                              </div>
                            )}
                            
                            {/* Question Number Overlay */}
                            <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded-full">
                              Q{index + 1}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Results Section */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="text-2xl mr-2">🎯</span>
                      Results & Recommendations (1 item)
                    </h4>
                    <div className="grid grid-cols-1 gap-4 max-w-lg mx-auto">
                      {project.images.slice(5, 6).map((image, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                          <div className="aspect-[3/2] bg-gray-100 flex items-center justify-center overflow-hidden relative">
                            {typeof image === 'string' && (image.includes('http') || image.includes('https')) ? (
                              <img 
                                src={image}
                                alt="Final Recommendations & Results"
                                className="w-full h-full object-contain"
                                onLoad={() => console.log('Recommendations image loaded successfully')}
                                onError={(e) => {
                                  console.error('Failed to load recommendations image:', image);
                                  e.target.style.display = 'none';
                                  e.target.nextElementSibling.style.display = 'flex';
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-500">
                                <span className="text-4xl mb-2">📈</span>
                                <div className="text-sm text-center">
                                  <div>Recommendations Image</div>
                                  <div className="text-xs text-gray-400 mt-1">{image}</div>
                                </div>
                              </div>
                            )}
                            
                            {/* Results Label Overlay */}
                            <div className="absolute top-2 left-2 bg-green-600 bg-opacity-90 text-white text-sm px-3 py-1 rounded-full">
                              Final Results
                            </div>
                          </div>
                        </div>
                      ))}
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
                  
                  {/* Brand Identity and Logo Design - Actual Business Logos Section */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="text-2xl mr-2">🎨</span>
                      Brand Identity and Logo Design - Actual Business Logos (5 items)
                    </h4>
                    <div className="grid grid-cols-5 gap-4">
                      {project.images.slice(0, 5).map((item, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                          <div className="aspect-square bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-3 relative overflow-hidden">
                            {item.placeholder && (item.placeholder.includes('http') || item.placeholder.includes('.jpg')) ? (
                              /* Real Image Display */
                              <img 
                                src={item.placeholder.includes('http') ? item.placeholder : `/images/aigata-brand/${item.placeholder}`} 
                                alt={`Brand Identity - ${item.description || 'Design Asset'}`}
                                className="w-full h-full aigata-brand-placeholder-image"
                                style={{
                                  objectFit: 'contain',
                                  objectPosition: 'center',
                                  width: '100%',
                                  height: '100%',
                                  maxWidth: '100%',
                                  maxHeight: '100%'
                                }}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextElementSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            
                            {/* Fallback Placeholder Display */}
                            <div className={`text-center w-full h-full flex flex-col items-center justify-center ${item.placeholder && (item.placeholder.includes('http') || item.placeholder.includes('.jpg')) ? 'hidden' : 'flex'}`}>
                              <div className="w-16 h-16 bg-purple-200 rounded-lg flex items-center justify-center mb-2">
                                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="text-sm font-medium text-gray-700 leading-tight break-words max-w-full">
                                {item.placeholder}
                              </div>
                              {item.description && (
                                <div className="text-xs text-gray-500 mt-1 break-words max-w-full">
                                  {item.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Concept Logos & Brand Development Section */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="text-2xl mr-2">💡</span>
                      Concept Logos & Brand Development (3 items)
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      {project.images.slice(5, 8).map((item, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                          <div className="aspect-square bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-3 relative overflow-hidden">
                            {item.placeholder && (item.placeholder.includes('http') || item.placeholder.includes('.jpg')) ? (
                              /* Real Image Display */
                              <img 
                                src={item.placeholder.includes('http') ? item.placeholder : `/images/aigata-brand/${item.placeholder}`} 
                                alt={`Concept Logo - ${item.description || 'Concept Asset'}`}
                                className="w-full h-full aigata-brand-placeholder-image"
                                style={{
                                  objectFit: 'contain',
                                  objectPosition: 'center',
                                  width: '100%',
                                  height: '100%',
                                  maxWidth: '100%',
                                  maxHeight: '100%'
                                }}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextElementSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            
                            {/* Fallback Placeholder Display */}
                            <div className={`text-center w-full h-full flex flex-col items-center justify-center ${item.placeholder && (item.placeholder.includes('http') || item.placeholder.includes('.jpg')) ? 'hidden' : 'flex'}`}>
                              <div className="w-16 h-16 bg-indigo-200 rounded-lg flex items-center justify-center mb-2">
                                <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="text-sm font-medium text-gray-700 leading-tight break-words max-w-full">
                                {item.placeholder}
                              </div>
                              {item.description && (
                                <div className="text-xs text-gray-500 mt-1 break-words max-w-full">
                                  {item.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Business Cards Section */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="text-2xl mr-2">💼</span>
                      Business Cards (2 items)
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {project.images.slice(8, 10).map((item, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                          <div className="aspect-square bg-gradient-to-br from-gray-50 to-slate-50 flex items-center justify-center p-3 relative overflow-hidden">
                            {item.placeholder && (item.placeholder.includes('http') || item.placeholder.includes('.jpg')) ? (
                              /* Real Image Display */
                              <img 
                                src={item.placeholder.includes('http') ? item.placeholder : `/images/aigata-brand/${item.placeholder}`} 
                                alt={`Business Card - ${item.description || 'Card Design'}`}
                                className="w-full h-full aigata-brand-placeholder-image"
                                style={{
                                  objectFit: 'contain',
                                  objectPosition: 'center',
                                  width: '100%',
                                  height: '100%',
                                  maxWidth: '100%',
                                  maxHeight: '100%'
                                }}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextElementSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            
                            {/* Fallback Placeholder Display */}
                            <div className={`text-center w-full h-full flex flex-col items-center justify-center ${item.placeholder && (item.placeholder.includes('http') || item.placeholder.includes('.jpg')) ? 'hidden' : 'flex'}`}>
                              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                                <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="text-sm font-medium text-gray-700 leading-tight break-words max-w-full">
                                {item.placeholder}
                              </div>
                              {item.description && (
                                <div className="text-xs text-gray-500 mt-1 break-words max-w-full">
                                  {item.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Products Sold Across Platforms Section */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="text-2xl mr-2">🛍️</span>
                      Products Sold Across Platforms (23 items)
                    </h4>
                    <div className="grid grid-cols-5 gap-4">
                      {project.images.slice(10, 33).map((item, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                          <div className="aspect-square bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-3 relative overflow-hidden">
                            {item.placeholder && (item.placeholder.includes('http') || item.placeholder.includes('.jpg')) ? (
                              /* Real Image Display */
                              <img 
                                src={item.placeholder.includes('http') ? item.placeholder : `/images/aigata-brand/${item.placeholder}`} 
                                alt={`Product - ${item.description || 'Top Seller'}`}
                                className="w-full h-full aigata-brand-placeholder-image"
                                style={{
                                  objectFit: 'contain',
                                  objectPosition: 'center',
                                  width: '100%',
                                  height: '100%',
                                  maxWidth: '100%',
                                  maxHeight: '100%'
                                }}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextElementSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            
                            {/* Fallback Placeholder Display */}
                            <div className={`text-center w-full h-full flex flex-col items-center justify-center ${item.placeholder && (item.placeholder.includes('http') || item.placeholder.includes('.jpg')) ? 'hidden' : 'flex'}`}>
                              <div className="w-16 h-16 bg-green-200 rounded-lg flex items-center justify-center mb-2">
                                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="text-sm font-medium text-gray-700 leading-tight break-words max-w-full">
                                {item.placeholder}
                              </div>
                              {item.description && (
                                <div className="text-xs text-gray-500 mt-1 break-words max-w-full">
                                  {item.description}
                                </div>
                              )}
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
                    <div className="grid grid-cols-4 gap-4">
                      {project.images.slice(33, 39).map((item, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                          <div className="aspect-square bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center p-3 relative overflow-hidden">
                            {item.placeholder && (item.placeholder.includes('http') || item.placeholder.includes('.jpg')) ? (
                              /* Real Image Display */
                              <img 
                                src={item.placeholder.includes('http') ? item.placeholder : `/images/aigata-brand/${item.placeholder}`} 
                                alt={`Development - ${item.description || 'Business Operation'}`}
                                className="w-full h-full aigata-brand-placeholder-image"
                                style={{
                                  objectFit: 'contain',
                                  objectPosition: 'center',
                                  width: '100%',
                                  height: '100%',
                                  maxWidth: '100%',
                                  maxHeight: '100%'
                                }}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextElementSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            
                            {/* Fallback Placeholder Display */}
                            <div className={`text-center w-full h-full flex flex-col items-center justify-center ${item.placeholder && (item.placeholder.includes('http') || item.placeholder.includes('.jpg')) ? 'hidden' : 'flex'}`}>
                              <div className="w-16 h-16 bg-orange-200 rounded-lg flex items-center justify-center mb-2">
                                <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="text-sm font-medium text-gray-700 leading-tight break-words max-w-full">
                                {item.placeholder}
                              </div>
                              {item.description && (
                                <div className="text-xs text-gray-500 mt-1 break-words max-w-full">
                                  {item.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Performance & Sales Insights Section */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="text-2xl mr-2">📈</span>
                      Performance & Sales Insights (2 items)
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {project.images.slice(39, 41).map((item, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                          <div className="aspect-square bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-3 relative overflow-hidden">
                            {item.placeholder && (item.placeholder.includes('http') || item.placeholder.includes('.jpg')) ? (
                              /* Real Image Display */
                              <img 
                                src={item.placeholder.includes('http') ? item.placeholder : `/images/aigata-brand/${item.placeholder}`} 
                                alt={`Analytics - ${item.description || 'Performance Data'}`}
                                className="w-full h-full aigata-brand-placeholder-image"
                                style={{
                                  objectFit: 'contain',
                                  objectPosition: 'center',
                                  width: '100%',
                                  height: '100%',
                                  maxWidth: '100%',
                                  maxHeight: '100%'
                                }}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextElementSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            
                            {/* Fallback Placeholder Display */}
                            <div className={`text-center w-full h-full flex flex-col items-center justify-center ${item.placeholder && (item.placeholder.includes('http') || item.placeholder.includes('.jpg')) ? 'hidden' : 'flex'}`}>
                              <div className="w-16 h-16 bg-blue-200 rounded-lg flex items-center justify-center mb-2">
                                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="text-sm font-medium text-gray-700 leading-tight break-words max-w-full">
                                {item.placeholder}
                              </div>
                              {item.description && (
                                <div className="text-xs text-gray-500 mt-1 break-words max-w-full">
                                  {item.description}
                                </div>
                              )}
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
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">📱 100+ Social Media Posts Campaign</h3>
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
                          
                          {/* Image placeholder - Fully Responsive with Proper Aspect Ratio */}
                          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                            {post.placeholder.includes('http') || post.placeholder.includes('.jpg') ? (
                              /* Real Image Display */
                              <img 
                                src={post.placeholder.includes('http') ? post.placeholder : `/images/social-media/${post.placeholder}`} 
                                alt={`${post.business} social media post`}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                style={{
                                  objectFit: 'cover',
                                  objectPosition: 'center',
                                  width: '100%',
                                  height: '100%'
                                }}
                                onError={(e) => {
                                  // Fallback to placeholder display if image fails to load
                                  e.target.style.display = 'none';
                                  e.target.nextElementSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            
                            {/* Fallback Placeholder Display */}
                            <div className={`text-center p-4 w-full h-full flex items-center justify-center ${post.placeholder.includes('http') || post.placeholder.includes('.jpg') ? 'hidden' : 'flex'}`}>
                              <div>
                                <div className="text-gray-400 text-sm font-medium mb-3 break-words max-w-full">{post.placeholder}</div>
                                <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center mx-auto">
                                  <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <div className="text-xs text-gray-500 mt-2 font-medium">Upload Image</div>
                              </div>
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
                        <div className="text-2xl font-bold text-indigo-600">100+</div>
                        <div className="text-sm text-gray-600">Posts Created</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="text-2xl font-bold text-blue-600">8</div>
                        <div className="text-sm text-gray-600">Platforms Managed</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="text-2xl font-bold text-green-600">7</div>
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
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">🎨 32 Professional Graphic Design Pieces</h3>
                  <p className="text-sm text-gray-600 mb-6 text-center">
                    Multi-category portfolio spanning promotional materials, brand identity, and event marketing
                  </p>
                  
                  {/* Line 1: Ute Bison Ranch Graphics */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="text-2xl mr-2">🦬</span>
                      Ute Bison Ranch Promos & Marketing Materials (13 items)
                    </h4>
                    <div className="grid grid-cols-4 gap-4">
                      {project.images.slice(0, 13).map((item, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                          <div className="aspect-square bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-3 relative overflow-hidden">
                            {item.placeholder.includes('http') || item.placeholder.includes('.jpg') ? (
                              /* Real Image Display */
                              <img 
                                src={item.placeholder.includes('http') ? item.placeholder : `/images/graphic-design/${item.placeholder}`} 
                                alt={`${item.category} - ${item.type}`}
                                className="w-full h-full graphic-design-placeholder-image"
                                style={{
                                  objectFit: 'contain',
                                  objectPosition: 'center',
                                  width: '100%',
                                  height: '100%',
                                  maxWidth: '100%',
                                  maxHeight: '100%'
                                }}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextElementSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            
                            {/* Fallback Placeholder Display */}
                            <div className={`text-center w-full h-full flex flex-col items-center justify-center ${item.placeholder.includes('http') || item.placeholder.includes('.jpg') ? 'hidden' : 'flex'}`}>
                              <div className="w-16 h-16 bg-orange-200 rounded-lg flex items-center justify-center mb-2">
                                <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="text-sm font-medium text-gray-700 leading-tight break-words max-w-full">
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
                          <div className="aspect-square bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-3 relative overflow-hidden">
                            {item.placeholder.includes('http') || item.placeholder.includes('.jpg') ? (
                              /* Real Image Display */
                              <img 
                                src={item.placeholder.includes('http') ? item.placeholder : `/images/graphic-design/${item.placeholder}`} 
                                alt={`${item.category} - ${item.type}`}
                                className="w-full h-full graphic-design-placeholder-image"
                                style={{
                                  objectFit: 'contain',
                                  objectPosition: 'center',
                                  width: '100%',
                                  height: '100%',
                                  maxWidth: '100%',
                                  maxHeight: '100%'
                                }}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextElementSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            
                            {/* Fallback Placeholder Display */}
                            <div className={`text-center w-full h-full flex flex-col items-center justify-center ${item.placeholder.includes('http') || item.placeholder.includes('.jpg') ? 'hidden' : 'flex'}`}>
                              <div className="w-16 h-16 bg-purple-200 rounded-lg flex items-center justify-center mb-2">
                                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="text-sm font-medium text-gray-700 leading-tight break-words max-w-full">
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
                      Multi-Business Graphics: Plaza, Petroleum & Coffee House (11 items)
                    </h4>
                    <div className="grid grid-cols-4 gap-4">
                      {project.images.slice(17, 28).map((item, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                          <div className="aspect-square bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-3 relative overflow-hidden">
                            {item.placeholder.includes('http') || item.placeholder.includes('.jpg') ? (
                              /* Real Image Display */
                              <img 
                                src={item.placeholder.includes('http') ? item.placeholder : `/images/graphic-design/${item.placeholder}`} 
                                alt={`${item.category} - ${item.type}`}
                                className="w-full h-full graphic-design-placeholder-image"
                                style={{
                                  objectFit: 'contain',
                                  objectPosition: 'center',
                                  width: '100%',
                                  height: '100%',
                                  maxWidth: '100%',
                                  maxHeight: '100%'
                                }}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextElementSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            
                            {/* Fallback Placeholder Display */}
                            <div className={`text-center w-full h-full flex flex-col items-center justify-center ${item.placeholder.includes('http') || item.placeholder.includes('.jpg') ? 'hidden' : 'flex'}`}>
                              <div className="w-16 h-16 bg-green-200 rounded-lg flex items-center justify-center mb-2">
                                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="text-sm font-medium text-gray-700 leading-tight break-words max-w-full">
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
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {project.images.slice(28, 32).map((item, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                          <div className="aspect-square bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center p-3 relative overflow-hidden">
                            {item.placeholder.includes('http') || item.placeholder.includes('.jpg') ? (
                              /* Real Image Display */
                              <img 
                                src={item.placeholder.includes('http') ? item.placeholder : `/images/graphic-design/${item.placeholder}`} 
                                alt={`${item.category} - ${item.type}`}
                                className="w-full h-full graphic-design-placeholder-image"
                                style={{
                                  objectFit: 'contain',
                                  objectPosition: 'center',
                                  width: '100%',
                                  height: '100%',
                                  maxWidth: '100%',
                                  maxHeight: '100%'
                                }}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextElementSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            
                            {/* Fallback Placeholder Display */}
                            <div className={`text-center w-full h-full flex flex-col items-center justify-center ${item.placeholder.includes('http') || item.placeholder.includes('.jpg') ? 'hidden' : 'flex'}`}>
                              <div className="w-16 h-16 bg-yellow-200 rounded-lg flex items-center justify-center mb-2">
                                <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="text-sm font-medium text-gray-700 leading-tight break-words max-w-full">
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
                /* Regular image display - Full visibility, no cropping */
                <div className={`relative aspect-video max-w-4xl mx-auto bg-gray-100 rounded-xl overflow-hidden shadow-xl project-image-container`}>
                  <img 
                    src={project.images[currentImageIndex]} 
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                    style={{ 
                      objectFit: 'contain',
                      objectPosition: 'center',
                      maxWidth: '100%',
                      maxHeight: '100%'
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
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
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

          {/* Separate Physical Menu Section - Independent from main images */}
          {project.separatePhysicalMenuSection && (
            <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 border-4 border-transparent bg-clip-padding rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <h4 className="text-3xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4 flex items-center justify-center">
                  <span className="text-4xl mr-3">🍽️</span>
                  {project.separatePhysicalMenuSection.title}
                </h4>
                <p className="text-gray-700 text-lg max-w-4xl mx-auto leading-relaxed">
                  {project.separatePhysicalMenuSection.description}
                </p>
              </div>
              
              {/* Physical Menu Image - Portrait 300x500 max, Proper Scaling, Full Visibility */}
              <div className="mb-6">
                <div className="group relative overflow-hidden rounded-xl shadow-lg max-w-sm mx-auto">
                  <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 rounded-xl p-1">
                    <div className="bg-white rounded-lg overflow-hidden">
                      <div className="relative bg-gray-100 flex items-center justify-center p-3" style={{ maxHeight: '520px', minHeight: '200px' }}>
                        {project.separatePhysicalMenuSection.images[0].includes('.jpg') && !project.separatePhysicalMenuSection.images[0].startsWith('http') ? (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 p-4">
                            <div className="text-center">
                              <div className="text-sm font-medium mb-2">{project.separatePhysicalMenuSection.images[0]}</div>
                              <div className="w-16 h-24 bg-amber-200 rounded-lg flex items-center justify-center mb-2 mx-auto">
                                <svg className="w-8 h-12 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 0 002-2V5a2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="text-xs text-gray-400">Upload Portrait Menu (9000x14000px)</div>
                              <div className="text-xs text-gray-400 mt-1">Will be scaled to 300x500 max</div>
                            </div>
                          </div>
                        ) : (
                          <img 
                            src={project.separatePhysicalMenuSection.images[0]} 
                            alt="Physical Menu Design - Portrait 300x500"
                            className="physical-menu-compact"
                            style={{ 
                              objectFit: 'contain',
                              objectPosition: 'center',
                              maxWidth: '300px',
                              maxHeight: '500px',
                              width: 'auto',
                              height: 'auto',
                              display: 'block',
                              margin: '0 auto',
                              transition: 'transform 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                          />
                        )}
                      </div>
                      <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs px-2 py-1 rounded-full shadow-lg">
                        Menu (300x500)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Physical Menu Highlights */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h5 className="font-bold text-orange-800 mb-4 flex items-center">
                  <span className="text-2xl mr-2">✨</span>
                  Physical Menu Design Highlights
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.separatePhysicalMenuSection.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700 text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Project Details */}
          <div className="space-y-6">
            {!project.facebookReels && (
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed">{project.description}</p>
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
                
                {/* 6 TikTok Videos Grid - Embedded TikTok Videos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {project.combinedTikTokSection.videos.map((video, index) => (
                    <div key={video.id} className="group relative">
                      {/* Video Card with Indigenous-inspired Gradient Border */}
                      <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 rounded-2xl p-1 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                        <div className="bg-white rounded-xl overflow-hidden">
                          {/* Embedded TikTok Video */}
                          <div className="relative aspect-[9/16] overflow-hidden bg-gray-100">
                            {isTikTokUrl(video.url) ? (
                              <div className="w-full h-full">
                                <iframe
                                  src={`https://www.tiktok.com/embed/v2/${getTikTokId(video.url)}?lang=en-US`}
                                  width="100%"
                                  height="100%"
                                  frameBorder="0"
                                  allowFullScreen
                                  allow="encrypted-media"
                                  className="w-full h-full"
                                  title={video.title}
                                />
                              </div>
                            ) : (
                              // Fallback to thumbnail if URL issues
                              <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 flex flex-col items-center justify-center text-amber-700">
                                <span className="text-4xl mb-2">📱</span>
                                <span className="text-sm font-medium">TikTok Video #{index + 1}</span>
                                <button 
                                  onClick={() => window.open(video.url, '_blank')}
                                  className="mt-2 px-4 py-2 bg-amber-500 text-white rounded-full text-xs hover:bg-amber-600 transition"
                                >
                                  Open in TikTok
                                </button>
                              </div>
                            )}
                            
                            {/* Video Number Badge */}
                            <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm px-3 py-1 rounded-full shadow-lg z-10">
                              #{index + 1}
                            </div>
                            
                            {/* Content Type Badge */}
                            <div className={`absolute top-3 right-3 text-white font-semibold text-xs px-2 py-1 rounded-full shadow-lg z-10 ${
                              video.type.includes('organic') 
                                ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                                : 'bg-gradient-to-r from-orange-400 to-red-500'
                            }`}>
                              {video.type.includes('organic') ? '🌟 ORGANIC' : '🎯 AD'}
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

              </div>
            )}

            {/* Facebook Reels Section - Holiday Marketing Campaign */}
            {project.facebookReels && (
              <div className="mb-8">
                {/* Section Header with Facebook Branding */}
                <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 mb-6 border border-blue-100">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg px-6 py-2 rounded-full shadow-lg">
                      📱 {project.facebookReels.sectionTitle}
                    </div>
                  </div>
                  <p className="text-blue-600 text-center font-medium">
                    {project.facebookReels.videosSubtitle}
                  </p>
                </div>

                {/* 4 Facebook Reels Grid - Embedded Facebook Videos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {project.facebookReels.videos.map((video, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                      <div className="relative">
                        <div className="aspect-[9/16] bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center relative">
                          {/* Embedded Facebook Video */}
                          {isFacebookUrl(video.url) ? (
                            <iframe
                              src={getFacebookEmbedUrl(video.url)}
                              width="267"
                              height="476"
                              style={{border: "none", overflow: "hidden", maxWidth: "100%", height: "100%"}}
                              scrolling="no"
                              frameBorder="0"
                              allowFullScreen={true}
                              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                              className="rounded-lg"
                            ></iframe>
                          ) : (
                            <div className="text-center p-6">
                              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                              </div>
                              <span className="text-sm font-medium text-blue-700">Facebook Reel #{index + 1}</span>
                              <div className="mt-2">
                                <button
                                  onClick={() => window.open(video.url, '_blank')}
                                  className="text-blue-600 hover:text-blue-700 font-semibold text-sm underline"
                                >
                                  Open in Facebook
                                </button>
                              </div>
                            </div>
                          )}
                          
                          {/* Video Number Badge */}
                          <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-sm px-3 py-1 rounded-full shadow-lg z-10">
                            #{index + 1}
                          </div>
                          
                          {/* Holiday Badge */}
                          <div className={`absolute top-3 right-3 text-white font-semibold text-xs px-2 py-1 rounded-full shadow-lg z-10 ${
                            video.holiday === 'Christmas' 
                              ? 'bg-gradient-to-r from-red-500 to-green-600' 
                              : video.holiday === "Valentine's Day"
                              ? 'bg-gradient-to-r from-pink-500 to-red-500'
                              : 'bg-gradient-to-r from-purple-500 to-yellow-500'
                          }`}>
                            {video.holiday === 'Christmas' ? '🎄' : video.holiday === "Valentine's Day" ? '💝' : '🐰'} {video.holiday.toUpperCase()}
                          </div>
                        </div>
                        
                        {/* Video Info */}
                        <div className="p-4 space-y-3">
                          <h4 className="font-bold text-gray-800 text-lg leading-tight">{video.title}</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">{video.description}</p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                              {video.type.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                          
                          <button
                            onClick={() => window.open(video.url, '_blank')}
                            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm flex items-center justify-center space-x-2"
                          >
                            <span>📱</span>
                            <span>Watch on Facebook</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Campaign Performance Stats */}
                <div className="bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 rounded-xl p-6 mt-6">
                  <h5 className="font-bold text-blue-800 mb-4 text-center flex items-center justify-center">
                    <span className="text-2xl mr-2">📈</span>
                    Campaign Statistics
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">14K+</div>
                      <div className="text-sm text-gray-600 font-medium">Total Views</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">90%</div>
                      <div className="text-sm text-gray-600 font-medium">Engagement Rate</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">+55%</div>
                      <div className="text-sm text-gray-600 font-medium">Product Sales Increase</div>
                    </div>
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
                    {/* Quantified Results */}
                    {(project.impact.quantified_results || project.impact.quantified_metrics) && 
                     (project.impact.quantified_results || project.impact.quantified_metrics).length > 0 && (
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h5 className="font-semibold text-purple-700 mb-3 flex items-center">
                          <span className="text-lg mr-2">📈</span>
                          Quantified Results
                        </h5>
                        <ul className="space-y-2">
                          {(project.impact.quantified_results || project.impact.quantified_metrics).map((metric, index) => (
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

            {/* Photography Projects - Image Gallery */}
            {project.category === "Photography Projects" && project.images && project.images.length > 0 && (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-lg">
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center">
                    <span className="text-3xl mr-3">📸</span>
                    Photography Portfolio Gallery
                  </h4>
                  <p className="text-gray-600 text-lg">
                    Professional photography showcasing technical expertise and creative vision
                  </p>
                </div>
                
                {/* Image Grid - Responsive */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {project.images.map((image, index) => (
                    <div key={index} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 bg-white">
                      <div className="aspect-square bg-gray-200 flex items-center justify-center overflow-hidden">
                        {image.includes('http') || image.includes('.jpg') || image.includes('.png') ? (
                          <img 
                            src={image}
                            alt={`${project.title} - Image ${index + 1}`}
                            className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                            style={{ 
                              objectFit: 'contain',
                              objectPosition: 'center',
                              backgroundColor: '#f8f9fa'
                            }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 p-4">
                            <span className="text-4xl mb-2">📷</span>
                            <span className="text-xs font-medium text-center leading-tight">
                              {image}
                            </span>
                          </div>
                        )}
                        
                        {/* Image overlay with number */}
                        <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
                          #{index + 1}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Photography Stats */}
                <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
                  <h5 className="font-bold text-gray-800 mb-4 text-center text-lg">
                    📊 Photography Project Stats
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-600">{project.images.length}</div>
                      <div className="text-sm text-blue-700 font-medium">Total Images</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-600">{project.orientation}</div>
                      <div className="text-sm text-green-700 font-medium">Format Mix</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-purple-600">Pro</div>
                      <div className="text-sm text-purple-700 font-medium">Quality Level</div>
                    </div>
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
