import React, { useState, useEffect } from 'react';
import { portfolioProjects, categories } from '../data/mock';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import BrandMarquee from '../components/BrandMarquee';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Search, Filter, Sparkles, TrendingUp, Award, Users } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Sparkles className="w-5 h-5 mr-2 text-red-200" />
              <span className="text-sm font-medium">Creative Marketing Professional</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight">
              <span className="block bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">
                Creative
              </span>
              <span className="block text-white/95 -mt-4">
                Strategy
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-red-100 max-w-4xl mx-auto leading-relaxed">
              Transforming brands through data-driven creative strategies and compelling visual storytelling 
              that drives measurable results for industry leaders
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                  <Award className="w-8 h-8 text-red-200" />
                </div>
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-red-200">Successful Campaigns</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                  <Users className="w-8 h-8 text-red-200" />
                </div>
                <div className="text-3xl font-bold mb-2">3</div>
                <div className="text-red-200">Fortune 500 Clients</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                  <TrendingUp className="w-8 h-8 text-red-200" />
                </div>
                <div className="text-3xl font-bold mb-2">300%</div>
                <div className="text-red-200">Avg. Engagement Increase</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Marquee */}
      <BrandMarquee />

      {/* Portfolio Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A showcase of creative campaigns and strategic initiatives that delivered exceptional results for leading brands
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-16 space-y-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border-2 border-gray-200 focus:border-red-400 focus:ring-red-400 rounded-full text-lg"
              />
            </div>
            
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 bg-white border-2 border-gray-200 rounded-2xl p-2 shadow-lg">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="text-sm font-medium transition-all duration-300 data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-red-50 rounded-xl py-3 px-4 whitespace-nowrap"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-red-600" />
                Featured Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                All Projects
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
            <div className="text-center py-20">
              <div className="text-gray-400 mb-6">
                <Filter size={64} className="mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600 text-lg">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Brand?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Let's collaborate to create impactful campaigns that drive results and elevate your brand presence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:amata.marketing@example.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-600 rounded-full font-semibold hover:bg-red-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get In Touch
            </a>
            <a
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-red-600 transition-all duration-300"
            >
              Learn More
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