import React, { useState, useEffect } from 'react';
import { portfolioProjects, categories, contactInfo } from '../data/mock';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import BrandMarquee from '../components/BrandMarquee';
import StoriesBar from '../components/StoriesBar';
import ProfessionalFilter from '../components/ProfessionalFilter';
import { ArrowRight, Target } from 'lucide-react';

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

  // Get grid class based on project orientation - Instagram style
  const getGridClass = (projects) => {
    if (activeCategory === 'Social Media Content & Campaigns') {
      return 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7'; // More columns for vertical content
    }
    return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'; // Instagram-style grid
  };

  const handleEmailClick = () => {
    const subject = "Let's Collaborate - Marketing Opportunity";
    const body = "Hi Amata,\n\nI came across your portfolio and I'm impressed with your marketing expertise. I'd love to discuss a potential collaboration opportunity.\n\nBest regards,";
    window.location.href = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Optimized Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 text-white overflow-hidden">
        {/* Vibrant Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/40 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-pink-400/50 rotate-45 blur-lg animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-40 h-40 bg-cyan-400/30 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-40 w-28 h-28 bg-green-400/40 rotate-12 blur-lg animate-ping"></div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          {/* Colorful Professional Badge */}
          <div className="flex justify-center mb-8 md:mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-yellow-400/30 to-pink-400/30 backdrop-blur-lg rounded-full px-6 md:px-8 py-3 md:py-4 border-2 border-white/30 shadow-2xl animate-pulse">
              <span className="text-base md:text-lg font-bold tracking-wide text-yellow-100">🎨 CREATIVE MARKETING PROFESSIONAL</span>
            </div>
          </div>

          {/* Main Content Layout */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Vibrant Marketing Message */}
            <div className="text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 md:mb-8 leading-none tracking-tight">
                <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">DRIVE</span>
                <span className="block bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent -mt-2 md:-mt-4">RESULTS.</span>
                <span className="block text-white/95 -mt-2 md:-mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                  NOT JUST CAMPAIGNS.
                </span>
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl text-yellow-100 mb-8 md:mb-12 leading-relaxed max-w-2xl">
                Creative marketing professional transforming brands into <span className="font-bold text-yellow-300 bg-white/20 px-2 py-1 rounded">💰 revenue generators</span> through 
                data-driven strategies, social media mastery, and <span className="font-bold text-cyan-300 bg-white/20 px-2 py-1 rounded">📈 measurable ROI</span> for industry leaders.
              </p>

              {/* Vibrant Call-to-Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-12 md:mb-16">
                <button
                  onClick={() => {
                    document.querySelector('.portfolio-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group inline-flex items-center justify-center px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-bold text-base md:text-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105"
                >
                  🎯 VIEW MY PORTFOLIO
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="/about"
                  className="inline-flex items-center justify-center px-8 md:px-10 py-4 md:py-5 border-3 border-white text-white rounded-full font-bold text-base md:text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 hover:scale-105 bg-white/10 backdrop-blur-sm"
                >
                  ✨ VIEW MY EXPERIENCE
                </a>
              </div>
            </div>

            {/* Right Column - Colorful Performance Metrics */}
            <div className="lg:justify-self-end">
              <div className="grid grid-cols-1 gap-8 max-w-md">
                {/* Vibrant Performance Marketing Metrics */}
                <div className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/20 shadow-2xl hover:from-yellow-400/30 hover:to-orange-500/30 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div>
                      <div className="text-4xl font-black text-yellow-200 mb-1">80+</div>
                      <div className="text-orange-200 font-medium">Marketing Campaigns</div>
                    </div>
                  </div>
                  <p className="text-yellow-100 text-sm bg-white/10 backdrop-blur-sm p-3 rounded-lg">Performance marketing campaigns delivering exceptional ROI across diverse industries</p>
                </div>

                <div className="bg-gradient-to-br from-pink-400/20 to-purple-500/20 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/20 shadow-2xl hover:from-pink-400/30 hover:to-purple-500/30 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <span className="text-2xl">📈</span>
                    </div>
                    <div>
                      <div className="text-4xl font-black text-pink-200 mb-1">300%</div>
                      <div className="text-purple-200 font-medium">Growth Rate</div>
                    </div>
                  </div>
                  <p className="text-pink-100 text-sm bg-white/10 backdrop-blur-sm p-3 rounded-lg">Proven conversion rate optimization and customer acquisition growth</p>
                </div>

                <div className="bg-gradient-to-br from-cyan-400/20 to-blue-500/20 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/20 shadow-2xl hover:from-cyan-400/30 hover:to-blue-500/30 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <div>
                      <div className="text-4xl font-black text-cyan-200 mb-1">5+</div>
                      <div className="text-blue-200 font-medium">Years Experience</div>
                    </div>
                  </div>
                  <p className="text-cyan-100 text-sm bg-white/10 backdrop-blur-sm p-3 rounded-lg">Leading digital marketing innovation and growth marketing strategies</p>
                </div>
              </div>
            </div>
          </div>

          {/* Vibrant SEO Keywords Banner */}
          <div className="text-center mt-20">
            <div className="inline-flex items-center bg-gradient-to-r from-green-400/30 to-teal-400/30 backdrop-blur-sm rounded-full px-8 py-3 border-2 border-white/30 animate-bounce">
              <span className="text-lg font-medium text-green-100">
                💡 DATA-DRIVEN MARKETING • 🚀 CONVERSION OPTIMIZATION • 📊 GROWTH MARKETING SPECIALIST
              </span>
            </div>
          </div>
        </div>

        {/* Colorful Wave Transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 200" className="w-full h-auto">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f9fafb" />
                <stop offset="50%" stopColor="#fef3c7" />
                <stop offset="100%" stopColor="#f9fafb" />
              </linearGradient>
            </defs>
            <path
              fill="url(#waveGradient)"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Brand Marquee */}
      <BrandMarquee />

      {/* Professional Category Navigation */}
      <StoriesBar 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />

      {/* Professional Filter System */}
      <ProfessionalFilter 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categories={categories}
      />

      {/* Marketing Portfolio Grid */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 py-12 portfolio-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Social Media Style Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-4">
              📱 My Creative Portfolio
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Swipe through my latest campaigns & creative projects! 
              <span className="font-semibold text-purple-600"> ✨ Like what you see?</span>
            </p>
          </div>

          {/* TikTok/Social Media Style Grid */}
          <div className={`grid gap-4 ${getGridClass(filteredProjects)}`}>
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={handleProjectClick}
              />
            ))}
          </div>

          {/* No Results Message */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-24">
              <div className="text-gray-400 mb-8">
                <Target size={80} className="mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No creative projects found</h3>
              <p className="text-gray-600">Try adjusting your search terms or category filter to discover more amazing work</p>
            </div>
          )}
        </div>
      </section>

      {/* Job-Seeking CTA */}
      <section className="bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 py-16 px-4 sm:px-6 lg:px-8 border-t-2 border-gradient-to-r from-purple-300 to-pink-300">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Ready to Add Creative Power to Your Team? 🚀
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            I'm actively seeking opportunities to join a dynamic marketing team where I can contribute my 
            <span className="font-semibold text-purple-600"> creative expertise, data-driven approach,</span> and 
            <span className="font-semibold text-pink-600"> proven results</span> to drive your brand forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleEmailClick}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              💼 Let's Connect - I'm Available!
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <a
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-all duration-300"
            >
              📄 View My Full Experience
            </a>
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