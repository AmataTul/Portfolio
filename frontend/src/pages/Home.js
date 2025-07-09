import React, { useState, useEffect } from 'react';
import { portfolioProjects, categories } from '../data/mock';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import BrandMarquee from '../components/BrandMarquee';
import CategoryTabs from '../components/CategoryTabs';
import { Input } from '../components/ui/input';
import { Search, Filter, Sparkles, TrendingUp, Award, Users, Zap } from 'lucide-react';

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
      return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';
    }
    return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent)]"></div>
          <div className="absolute inset-0 bg-pattern"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-8 py-4 mb-12 shadow-xl">
              <Zap className="w-6 h-6 mr-3 text-red-200" />
              <span className="text-lg font-semibold">Creative Marketing Professional</span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black mb-12 tracking-tighter leading-none">
              <span className="block bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
                BOLD
              </span>
              <span className="block text-white/95 -mt-6">
                CREATIVE
              </span>
              <span className="block text-red-200 -mt-6 text-5xl md:text-6xl font-bold">
                STRATEGY
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl mb-16 text-red-100 max-w-5xl mx-auto leading-relaxed font-light">
              Transforming brands through <span className="font-semibold text-white">data-driven creative strategies</span> and 
              compelling visual storytelling that drives <span className="font-semibold text-white">measurable results</span> for industry leaders
            </p>
            
            {/* Enhanced Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl mb-6 group-hover:bg-white/30 transition-colors duration-300">
                  <Award className="w-10 h-10 text-red-200" />
                </div>
                <div className="text-5xl font-black mb-3">80+</div>
                <div className="text-red-200 text-lg font-medium">Successful Campaigns</div>
              </div>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl mb-6 group-hover:bg-white/30 transition-colors duration-300">
                  <Users className="w-10 h-10 text-red-200" />
                </div>
                <div className="text-5xl font-black mb-3">5+</div>
                <div className="text-red-200 text-lg font-medium">Years Experience</div>
              </div>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl mb-6 group-hover:bg-white/30 transition-colors duration-300">
                  <TrendingUp className="w-10 h-10 text-red-200" />
                </div>
                <div className="text-5xl font-black mb-3">300%</div>
                <div className="text-red-200 text-lg font-medium">Avg. Engagement Increase</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Marquee */}
      <BrandMarquee />

      {/* Portfolio Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight">
              FEATURED WORK
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto font-light">
              A curated showcase of creative campaigns and strategic initiatives that delivered 
              <span className="font-semibold text-red-600"> exceptional results</span> for leading brands
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-20 space-y-12">
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-16 pr-6 py-4 bg-white border-2 border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-2xl text-lg shadow-lg"
              />
            </div>
            
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 bg-white border-2 border-gray-300 rounded-3xl p-3 shadow-xl">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="text-sm font-semibold transition-all duration-300 data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-red-50 rounded-2xl py-4 px-6 whitespace-nowrap"
                  >
                    {category === 'All' ? 'ALL' : category.toUpperCase()}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <div className="mb-20">
              <h3 className="text-3xl font-black text-gray-900 mb-12 flex items-center">
                <Sparkles className="w-8 h-8 mr-3 text-red-600" />
                FEATURED PROJECTS
              </h3>
              <div className={`grid ${getGridClass(featuredProjects)} gap-8`}>
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
              <h3 className="text-3xl font-black text-gray-900 mb-12">
                ALL PROJECTS
              </h3>
              <div className={`grid ${getGridClass(regularProjects)} gap-6`}>
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
              <h3 className="text-3xl font-bold text-gray-900 mb-4">No projects found</h3>
              <p className="text-gray-600 text-xl">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative bg-gradient-to-r from-red-600 via-red-500 to-red-700 text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-pattern"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tight">
            READY TO TRANSFORM YOUR BRAND?
          </h2>
          <p className="text-2xl text-red-100 mb-12 max-w-3xl mx-auto font-light">
            Let's collaborate to create <span className="font-semibold text-white">impactful campaigns</span> that 
            drive results and elevate your brand presence
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="mailto:amata.marketing@example.com"
              className="inline-flex items-center justify-center px-12 py-5 bg-white text-red-600 rounded-full font-bold text-lg hover:bg-red-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105"
            >
              LET'S CONNECT
            </a>
            <a
              href="/about"
              className="inline-flex items-center justify-center px-12 py-5 border-3 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-red-600 transition-all duration-300 hover:scale-105"
            >
              LEARN MORE
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