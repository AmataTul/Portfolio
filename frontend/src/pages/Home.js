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
      <section className="relative min-h-screen bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white/20 rotate-45 blur-lg animate-pulse"></div>
          <div className="absolute bottom-40 left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-20 right-40 w-28 h-28 bg-white/15 rotate-12 blur-lg animate-pulse"></div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          {/* Professional Badge */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-lg rounded-full px-8 py-4 border border-white/30 shadow-2xl">
              <span className="text-lg font-semibold tracking-wide">PERFORMANCE MARKETING STRATEGIST</span>
            </div>
          </div>

          {/* Main Content Layout */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Marketing Message */}
            <div className="text-left">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-none tracking-tight">
                <span className="block text-white">DRIVE</span>
                <span className="block text-red-200 -mt-4">RESULTS.</span>
                <span className="block text-white/90 -mt-4 text-3xl sm:text-4xl md:text-5xl font-bold">
                  NOT JUST CAMPAIGNS.
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-red-100 mb-12 leading-relaxed max-w-2xl">
                Digital marketing specialist transforming brands into <span className="font-bold text-white">revenue generators</span> through 
                data-driven marketing strategies, conversion rate optimization, and <span className="font-bold text-white">measurable ROI</span> for industry leaders.
              </p>

              {/* Call-to-Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 mb-16">
                <button
                  onClick={handleEmailClick}
                  className="group inline-flex items-center justify-center px-10 py-5 bg-white text-red-600 rounded-full font-bold text-lg hover:bg-red-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105"
                >
                  START MARKETING STRATEGY
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="/about"
                  className="inline-flex items-center justify-center px-10 py-5 border-3 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-red-600 transition-all duration-300 hover:scale-105"
                >
                  VIEW MARKETING EXPERTISE
                </a>
              </div>
            </div>

            {/* Right Column - Performance Metrics */}
            <div className="lg:justify-self-end">
              <div className="grid grid-cols-1 gap-8 max-w-md">
                {/* Performance Marketing Metrics */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div>
                      <div className="text-4xl font-black text-white mb-1">80+</div>
                      <div className="text-red-200 font-medium">Marketing Campaigns</div>
                    </div>
                  </div>
                  <p className="text-red-100 text-sm">Performance marketing campaigns delivering exceptional ROI across diverse industries</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
                      <span className="text-2xl">📈</span>
                    </div>
                    <div>
                      <div className="text-4xl font-black text-white mb-1">300%</div>
                      <div className="text-red-200 font-medium">Growth Rate</div>
                    </div>
                  </div>
                  <p className="text-red-100 text-sm">Proven conversion rate optimization and customer acquisition growth</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <div>
                      <div className="text-4xl font-black text-white mb-1">5+</div>
                      <div className="text-red-200 font-medium">Years Experience</div>
                    </div>
                  </div>
                  <p className="text-red-100 text-sm">Leading digital marketing innovation and growth marketing strategies</p>
                </div>
              </div>
            </div>
          </div>

          {/* SEO Keywords Banner */}
          <div className="text-center mt-20">
            <div className="inline-flex items-center bg-black/20 backdrop-blur-sm rounded-full px-8 py-3 border border-white/30">
              <span className="text-lg font-medium text-red-100">
                DATA-DRIVEN MARKETING • CONVERSION OPTIMIZATION • GROWTH MARKETING SPECIALIST
              </span>
            </div>
          </div>
        </div>

        {/* Professional Wave Transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 200" className="w-full h-auto">
            <path
              fill="#f9fafb"
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
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Professional Portfolio Grid */}
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No marketing campaigns found</h3>
              <p className="text-gray-600">Try adjusting your search terms or category filter to find relevant marketing projects</p>
            </div>
          )}
        </div>
      </section>

      {/* Marketing Strategy CTA */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Scale Your Marketing Results?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Partner with a performance marketing specialist who delivers data-driven strategies, 
            conversion optimization, and measurable growth for your brand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleEmailClick}
              className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Discuss Marketing Strategy
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <a
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-all duration-300"
            >
              View Marketing Experience
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