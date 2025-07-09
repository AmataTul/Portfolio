import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { workHistory, education, contactInfo, tools } from '../data/mock';
import { Mail, Phone, MapPin, Linkedin, Award, Users, TrendingUp, Calendar, GraduationCap, Code, Briefcase } from 'lucide-react';

const About = () => {
  const toolCategories = {
    "Analytics & Data": ["Google Analytics", "Adobe Analytics", "Looker Studio", "SQL", "Tableau", "Hotjar"],
    "Marketing & Advertising": ["Google Ads", "Meta Ads Manager", "HubSpot", "Semrush", "MailChimp"],
    "Design & Creative": ["Adobe Photoshop", "Adobe Illustrator", "Canva", "CapCut", "Figma"],
    "Project Management": ["WordPress", "Trello", "Jira", "Miro", "Notion"]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Briefcase className="w-5 h-5 mr-2 text-red-200" />
              <span className="text-sm font-medium">Marketing Professional</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-8 tracking-tight">
              <span className="block bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">
                {contactInfo.name}
              </span>
              <span className="block text-white/95 text-3xl md:text-4xl font-normal -mt-2">
                Marketing Coordinator
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-red-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              A data-driven marketing professional with expertise in creative strategy, brand development, 
              and performance optimization for leading brands
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                  <Award className="w-8 h-8 text-red-200" />
                </div>
                <div className="text-3xl font-bold mb-2">5+</div>
                <div className="text-red-200">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                  <Users className="w-8 h-8 text-red-200" />
                </div>
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-red-200">Campaigns Delivered</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                  <TrendingUp className="w-8 h-8 text-red-200" />
                </div>
                <div className="text-3xl font-bold mb-2">14+</div>
                <div className="text-red-200">Social Media Accounts Managed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Bio Section */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Me</h2>
            <Card className="bg-white shadow-xl border-0 overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-gray-700 leading-relaxed mb-6">
                    I'm a results-driven marketing coordinator with a passion for creating compelling campaigns that drive measurable business results. With over 5 years of experience across diverse industries, I've had the privilege of working with Fortune 500 companies and emerging brands alike.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    My expertise spans the complete marketing spectrum - from strategic planning and brand development to creative execution and performance analysis. I believe in the power of data-driven decision making combined with creative storytelling to build brands that resonate with audiences and drive action.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    When I'm not crafting campaigns or analyzing performance metrics, you'll find me exploring the latest marketing trends, experimenting with new creative tools, or mentoring aspiring marketing professionals in the industry.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Education Section */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Education</h2>
            <Card className="bg-white shadow-xl border-0 overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mr-6">
                    <GraduationCap className="w-8 h-8 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{education.degree}</h3>
                    <p className="text-lg text-red-600 font-medium">{education.minor}</p>
                  </div>
                </div>
                <div className="ml-22">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xl font-semibold text-gray-700">{education.university}</p>
                    <div className="flex items-center space-x-4">
                      <Badge className="bg-red-100 text-red-800 text-sm font-medium">
                        {education.honor}
                      </Badge>
                      <Badge variant="outline" className="border-red-200 text-red-600">
                        <Calendar size={14} className="mr-1" />
                        {education.period}
                      </Badge>
                    </div>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700 text-sm">
                      <strong>Relevant Coursework:</strong> Digital Marketing, Consumer Behavior, Business Analytics, 
                      Information Systems, Project Management, Data Analysis, Marketing Research
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Work History */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Professional Experience</h2>
            <div className="space-y-8">
              {workHistory.map((job, index) => (
                <Card key={index} className="bg-white shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                      <div className="mb-4 lg:mb-0">
                        <h3 className="text-2xl font-bold text-red-600 mb-2">{job.position}</h3>
                        <p className="text-lg text-gray-700 font-semibold">{job.company}</p>
                        <p className="text-sm text-gray-500">{job.location}</p>
                      </div>
                      <Badge variant="outline" className="border-red-200 text-red-600 self-start lg:self-center">
                        <Calendar size={14} className="mr-1" />
                        {job.period}
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      {job.achievements.map((achievement, achievementIndex) => (
                        <div key={achievementIndex} className="flex items-start">
                          <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2 mr-4"></div>
                          <p className="text-gray-700 leading-relaxed">{achievement}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Tools & Technologies */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Tools & Technologies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(toolCategories).map(([category, categoryTools]) => (
                <Card key={category} className="bg-white shadow-xl border-0 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                        <Code className="w-5 h-5 text-red-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {categoryTools.map((tool, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                        >
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Let's Connect</h2>
            <Card className="bg-white shadow-xl border-0 overflow-hidden max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-center md:justify-start group">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-red-200 transition-colors">
                      <Mail className="text-red-600" size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      <a href={`mailto:${contactInfo.email}`} className="text-gray-700 hover:text-red-600 transition-colors font-medium">
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center md:justify-start group">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-red-200 transition-colors">
                      <Linkedin className="text-red-600" size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-500 mb-1">LinkedIn</p>
                      <a 
                        href={contactInfo.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                      >
                        Connect with me
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center md:justify-start group">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-red-200 transition-colors">
                      <Phone className="text-red-600" size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-500 mb-1">Phone</p>
                      <span className="text-gray-700 font-medium">{contactInfo.phone}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center md:justify-start group">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-red-200 transition-colors">
                      <MapPin className="text-red-600" size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-500 mb-1">Location</p>
                      <span className="text-gray-700 font-medium">{contactInfo.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-gray-600 text-center">
                    Ready to collaborate on your next marketing campaign? Let's discuss how we can drive results together.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;