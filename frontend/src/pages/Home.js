import React, { useState, useEffect } from 'react';
import { portfolioProjects, categories, contactInfo } from '../data/mock';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import BrandMarquee from '../components/BrandMarquee';
import StoriesBar from '../components/StoriesBar';
import ProfessionalFilter from '../components/ProfessionalFilter';
import { ArrowRight, Target, Sparkles, Zap, TrendingUp, Users, Play } from 'lucide-react';

const Home = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(portfolioProjects);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for interactive elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let filtered = portfolioProjects;
    
    // Filter by category
    if (activeCategory !== 'All') {
      filtered = filtered.filter(project => project.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProjects(filtered);
  }, [activeCategory, searchTerm]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const featuredProjects = filteredProjects.filter(project => project.featured);
  const regularProjects = filteredProjects.filter(project => !project.featured);

  // Get grid class based on project orientation - Instagram style
  const getGridClass = (projects) => {
    if (activeCategory === 'Social Media Content & Campaigns') {
      return 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7'; // More columns for vertical content
    }
    return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'; // Default grid
  };

  const handleEmailClick = () => {
    const subject = "Performance Marketing Partnership - Let's Drive Results!";
    const body = "Hi Amata,\n\nI found your portfolio and I'm impressed with your data-driven marketing approach and campaign results. I'd love to discuss how we can work together to achieve similar success for our brand.\n\nBest regards,";
    window.location.href = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Interactive Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-pink-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
            transition: 'all 0.3s ease-out'
          }}
        ></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-400/30 rounded-full blur-lg animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-cyan-400/20 rounded-full blur-2xl animate-ping"></div>
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-green-400/30 rounded-full blur-xl animate-bounce"></div>
      </div>

      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Floating Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
          <div className="absolute top-20 right-20 w-3 h-3 bg-pink-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-10 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-5 h-5 bg-green-400 rounded-full animate-ping"></div>
          <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-purple-300 rounded-full animate-bounce"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Enhanced Left Column */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mr-4 animate-pulse">
                  <Target className="w-8 h-8 text-yellow-300" />
                </div>
                <h1 className="text-4xl md:text-5xl xl:text-6xl font-black">
                  <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
                    DRIVE RESULTS.
                  </span>
                </h1>
              </div>
              
              <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold mb-6 text-white">
                NOT JUST CAMPAIGNS.
              </h2>
              
              <p className="text-xl md:text-2xl text-yellow-200 mb-8 font-medium">
                Performance marketing that delivers measurable growth for Fortune companies
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={handleEmailClick}
                  className="group bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
                >
                  <span className="flex items-center justify-center">
                    <Zap className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                    LET'S DRIVE RESULTS
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                
                <button className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 border-2 border-white/30 hover:border-white/50">
                  <span className="flex items-center justify-center">
                    <Play className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                    WATCH SUCCESS STORIES
                  </span>
                </button>
              </div>
            </div>

            {/* Enhanced Right Column - Animated Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/30 transition-all duration-300 transform hover:scale-105 group">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-3 group-hover:animate-bounce">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-yellow-300 mb-2 group-hover:animate-pulse">80+</div>
                <div className="text-sm text-purple-200">Campaigns Launched</div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/30 transition-all duration-300 transform hover:scale-105 group">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-r from-pink-400 to-purple-500 rounded-full p-3 group-hover:animate-bounce">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-pink-300 mb-2 group-hover:animate-pulse">5+</div>
                <div className="text-sm text-purple-200">Years Experience</div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/30 transition-all duration-300 transform hover:scale-105 group">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full p-3 group-hover:animate-bounce">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-cyan-300 mb-2 group-hover:animate-pulse">300%</div>
                <div className="text-sm text-purple-200">Average Growth</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Brand Marquee */}
      <div className="relative">
        <BrandMarquee />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-transparent to-gray-50 pointer-events-none"></div>
      </div>

      {/* Enhanced Project Gallery */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-3 mr-4 animate-pulse">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black">
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  PORTFOLIO
                </span>
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover data-driven marketing campaigns that deliver measurable results and drive business growth
            </p>
          </div>

          {/* Enhanced StoriesBar */}
          <div className="mb-12">
            <StoriesBar 
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {/* Enhanced Project Grid */}
          <div className="space-y-12">
            {featuredProjects.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    Featured Projects
                  </span>
                </h3>
                <div className={`grid gap-4 ${getGridClass(featuredProjects)}`}>
                  {featuredProjects.map((project) => (
                    <div
                      key={project.id}
                      className="transform hover:scale-105 transition-all duration-300 hover:shadow-xl group"
                    >
                      <ProjectCard
                        project={project}
                        onClick={() => handleProjectClick(project)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {regularProjects.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                    All Projects
                  </span>
                </h3>
                <div className={`grid gap-4 ${getGridClass(regularProjects)}`}>
                  {regularProjects.map((project) => (
                    <div
                      key={project.id}
                      className="transform hover:scale-105 transition-all duration-300 hover:shadow-xl group"
                    >
                      <ProjectCard
                        project={project}
                        onClick={() => handleProjectClick(project)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Call-to-Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-3xl p-8 md:p-12 shadow-2xl transform hover:scale-105 transition-all duration-300">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Marketing Strategy?
              </h3>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Let's create campaigns that don't just look good—they deliver measurable results and drive real business growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleEmailClick}
                  className="group bg-white text-purple-600 hover:bg-purple-50 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  <span className="flex items-center justify-center">
                    <Zap className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                    START YOUR SUCCESS STORY
                  </span>
                </button>
                <button className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 border-2 border-white/30 hover:border-white/50">
                  <span className="flex items-center justify-center">
                    <Play className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                    VIEW SUCCESS METRICS
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Home;