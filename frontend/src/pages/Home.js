import React, { useState, useEffect } from 'react';
import { portfolioProjects, categories, contactInfo } from '../data/mock';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import BrandMarquee from '../components/BrandMarquee';
import CategoryTabs from '../components/CategoryTabs';
import { Input } from '../components/ui/input';
import { Search, Filter, Sparkles, TrendingUp, Award, Users, Zap, ArrowRight, Target, Rocket } from 'lucide-react';

const Home = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(portfolioProjects);

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

  // Get grid class based on project orientation
  const getGridClass = (projects) => {
    if (activeCategory === 'Social Media Content & Campaigns') {
      return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6';
    }
    return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
  };

  const handleEmailClick = () => {
    const subject = "Let's Collaborate - Marketing Opportunity";
    const body = "Hi Amata,\n\nI came across your portfolio and I'm impressed with your marketing expertise. I'd love to discuss a potential collaboration opportunity.\n\nBest regards,";
    window.location.href = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Modern Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white overflow-hidden">
        {/* Floating Geometric Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white/20 rotate-45 blur-lg animate-pulse"></div>
          <div className="absolute bottom-40 left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-20 right-40 w-28 h-28 bg-white/15 rotate-12 blur-lg animate-pulse"></div>
        </div>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          {/* Professional Badge */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-lg rounded-full px-8 py-4 border border-white/30 shadow-2xl">
              <Rocket className="w-6 h-6 mr-3 text-red-200" />
              <span className="text-lg font-semibold tracking-wide">PERFORMANCE MARKETING STRATEGIST</span>
            </div>
          </div>

          {/* Split Layout */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="text-left lg:text-left">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-none tracking-tight">
                <span className="block text-white">DRIVE</span>
                <span className="block text-red-200 -mt-4">RESULTS.</span>
                <span className="block text-white/90 -mt-4 text-3xl sm:text-4xl md:text-5xl font-bold">
                  NOT JUST CAMPAIGNS.
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-red-100 mb-12 leading-relaxed max-w-2xl">
                I transform brands into <span className="font-bold text-white">revenue generators</span> through 
                data-driven strategies that deliver <span className="font-bold text-white">measurable ROI</span> and 
                sustainable growth for industry leaders.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 mb-16">
                <button
                  onClick={handleEmailClick}
                  className="group inline-flex items-center justify-center px-10 py-5 bg-white text-red-600 rounded-full font-bold text-lg hover:bg-red-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105"
                >
                  LET'S DRIVE RESULTS
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="/about"
                  className="inline-flex items-center justify-center px-10 py-5 border-3 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-red-600 transition-all duration-300 hover:scale-105"
                >
                  VIEW MY IMPACT
                </a>
              </div>
            </div>

            {/* Right Column - Stats Cards */}
            <div className="lg:justify-self-end">
              <div className="grid grid-cols-1 gap-8 max-w-md">
                {/* Performance Metrics Cards */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
                      <Target className="w-8 h-8 text-red-200" />
                    </div>
                    <div>
                      <div className="text-4xl font-black text-white mb-1">80+</div>
                      <div className="text-red-200 font-medium">High-Impact Campaigns</div>
                    </div>
                  </div>
                  <p className="text-red-100 text-sm">Delivered exceptional ROI across diverse industries</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
                      <TrendingUp className="w-8 h-8 text-red-200" />
                    </div>
                    <div>
                      <div className="text-4xl font-black text-white mb-1">300%</div>
                      <div className="text-red-200 font-medium">Average Growth Rate</div>
                    </div>
                  </div>
                  <p className="text-red-100 text-sm">Proven track record of exponential growth</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
                      <Award className="w-8 h-8 text-red-200" />
                    </div>
                    <div>
                      <div className="text-4xl font-black text-white mb-1">5+</div>
                      <div className="text-red-200 font-medium">Years Dominating</div>
                    </div>
                  </div>
                  <p className="text-red-100 text-sm">Leading marketing innovation and strategy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Tagline */}
          <div className="text-center mt-20">
            <div className="inline-flex items-center bg-black/20 backdrop-blur-sm rounded-full px-8 py-3 border border-white/30">
              <span className="text-lg font-medium text-red-100">
                TRUSTED BY INDUSTRY LEADERS • DATA-DRIVEN RESULTS • GROWTH FOCUSED
              </span>
            </div>
          </div>
        </div>

        {/* Modern Wave Transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 200" className="w-full h-auto">
            <path
              fill="white"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Brand Marquee */}
      <BrandMarquee />

      {/* Portfolio Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 md:mb-8 tracking-tight">
              CAMPAIGN SHOWCASE
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto font-light px-4">
              Strategic campaigns that don't just look good — they 
              <span className="font-semibold text-red-600"> drive measurable business growth</span> and ROI
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-16 space-y-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border-2 border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-full text-base shadow-lg"
              />
            </div>
            
            <CategoryTabs 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory} 
            />
          </div>

          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-8 flex items-center">
                <Sparkles className="w-6 h-6 mr-3 text-red-600" />
                AWARD-WINNING CAMPAIGNS
              </h3>
              <div className={`grid ${getGridClass(featuredProjects)} gap-4 md:gap-6`}>
                {featuredProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onClick={handleProjectClick}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Regular Projects */}
          {regularProjects.length > 0 && (
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">
                COMPLETE PORTFOLIO
              </h3>
              <div className={`grid ${getGridClass(regularProjects)} gap-4 md:gap-6`}>
                {regularProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onClick={handleProjectClick}
                  />
                ))}
              </div>
            </div>
          )}

          {/* No results message */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-24">
              <div className="text-gray-400 mb-8">
                <Filter size={80} className="mx-auto" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">No campaigns found</h3>
              <p className="text-gray-600 text-xl">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="relative bg-gradient-to-r from-red-600 via-red-500 to-red-700 text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/30 rounded-full blur-2xl animate-float"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center px-4">
          <div className="mb-8">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-lg rounded-full px-6 py-3 border border-white/30 mb-8">
              <Zap className="w-5 h-5 mr-2 text-red-200" />
              <span className="text-sm font-semibold tracking-wider">READY TO SCALE YOUR BRAND?</span>
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 tracking-tight leading-tight">
            LET'S BUILD YOUR
            <span className="block text-red-200">GROWTH ENGINE</span>
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl text-red-100 mb-8 md:mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Partner with a <span className="font-semibold text-white">performance marketing strategist</span> who 
            turns creative campaigns into <span className="font-semibold text-white">revenue machines</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <button
              onClick={handleEmailClick}
              className="group inline-flex items-center justify-center px-8 md:px-12 py-4 md:py-5 bg-white text-red-600 rounded-full font-bold text-base md:text-lg hover:bg-red-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105"
            >
              START THE CONVERSATION
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="/about"
              className="inline-flex items-center justify-center px-8 md:px-12 py-4 md:py-5 border-2 md:border-3 border-white text-white rounded-full font-bold text-base md:text-lg hover:bg-white hover:text-red-600 transition-all duration-300 hover:scale-105"
            >
              EXPLORE MY EXPERTISE
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">ROI-FOCUSED</div>
              <div className="text-red-200 text-sm">Every campaign optimized for performance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">DATA-DRIVEN</div>
              <div className="text-red-200 text-sm">Insights that inform every decision</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">GROWTH-MINDED</div>
              <div className="text-red-200 text-sm">Strategies built for scalable success</div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Home;