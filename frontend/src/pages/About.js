import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { workHistory, education, contactInfo, tools } from '../data/mock';
import { 
  Mail, Phone, MapPin, Linkedin, Award, Users, TrendingUp, Calendar, 
  GraduationCap, Code, Briefcase, Target, BarChart3, Zap 
} from 'lucide-react';

const About = () => {
  const toolCategories = {
    "Analytics & Data Intelligence": ["Google Analytics", "Adobe Analytics", "Looker Studio", "SQL", "Tableau", "Hotjar"],
    "Digital Marketing & Advertising": ["Google Ads", "Meta Ads Manager", "HubSpot", "Semrush", "MailChimp"],
    "Creative & Design": ["Adobe Photoshop", "Adobe Illustrator", "Canva", "CapCut", "Figma"],
    "Project Management & Operations": ["WordPress", "Trello", "Jira", "Miro", "Notion"]
  };

  const handleEmailClick = () => {
    const subject = "Marketing Strategy Collaboration Opportunity";
    const body = "Hi Amata,\n\nI found your marketing portfolio and I'm impressed with your performance marketing expertise and data-driven approach. I'd love to discuss potential collaboration opportunities.\n\nBest regards,";
    window.location.href = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Optimized Hero Section */}
      <section className="bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Professional Profile Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12">
            {/* Professional Profile Picture */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white via-red-100 to-white p-1 shadow-2xl">
                <div className="w-full h-full rounded-full bg-white p-1">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center">
                    <span className="text-4xl font-black text-red-600">AT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Info */}
            <div className="flex-grow">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{contactInfo.name}</h1>
                  <p className="text-red-100 font-medium text-lg mb-4">Performance Marketing Strategist & Digital Marketing Specialist</p>
                  <div className="flex items-center text-red-200 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{contactInfo.location}</span>
                  </div>
                </div>
                
                {/* Professional Metrics */}
                <div className="flex space-x-8 mt-4 sm:mt-0">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">80+</div>
                    <div className="text-sm text-red-200">Campaigns</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">5+</div>
                    <div className="text-sm text-red-200">Years</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">300%</div>
                    <div className="text-sm text-red-200">Growth</div>
                  </div>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="space-y-3 mb-6">
                <p className="text-white font-medium">
                  Data-driven marketing coordinator specializing in performance marketing, conversion rate optimization, and growth marketing strategies
                </p>
                <p className="text-red-100">
                  Expert in digital marketing campaigns, marketing analytics, and ROI-focused brand strategies for enterprise clients
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button 
                  onClick={handleEmailClick}
                  className="bg-white text-red-600 hover:bg-red-50 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Contact for Marketing Strategy
                </button>
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-800/50 hover:bg-red-800/70 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 border border-red-400"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Experience & Skills */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Professional Summary */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Marketing Strategy Expertise</h2>
            <Card className="bg-white shadow-lg border-0">
              <CardContent className="p-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Results-driven marketing coordinator with 5+ years of experience in performance marketing, digital marketing strategy, and data-driven campaign optimization. Proven track record of delivering measurable ROI through strategic marketing initiatives, conversion rate optimization, and customer acquisition campaigns.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Expertise in marketing analytics, growth marketing, brand marketing coordination, and cross-channel marketing automation for Fortune 500 companies and emerging brands.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Education Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Marketing Education & Credentials</h2>
            <Card className="bg-white shadow-lg border-0">
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
                      <strong>Specialized Coursework:</strong> Digital Marketing Strategy, Consumer Behavior Analysis, Marketing Analytics, 
                      Business Intelligence, Data-Driven Marketing, Project Management, Marketing Research & Analysis
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Professional Experience */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Digital Marketing Career Experience</h2>
            <div className="space-y-6">
              {workHistory.map((job, index) => (
                <Card key={index} className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                      <div className="mb-4 lg:mb-0">
                        <h3 className="text-xl font-bold text-red-600 mb-2">{job.position}</h3>
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

          {/* Marketing Tools & Technologies */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text mb-8 text-center">Marketing Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(toolCategories).map(([category, categoryTools], index) => {
                const gradients = [
                  'from-pink-500 to-rose-500',
                  'from-purple-500 to-indigo-500', 
                  'from-blue-500 to-cyan-500',
                  'from-green-500 to-teal-500'
                ];
                const iconBgs = [
                  'bg-gradient-to-r from-pink-100 to-rose-100',
                  'bg-gradient-to-r from-purple-100 to-indigo-100',
                  'bg-gradient-to-r from-blue-100 to-cyan-100', 
                  'bg-gradient-to-r from-green-100 to-teal-100'
                ];
                const textColors = [
                  'text-pink-600',
                  'text-purple-600',
                  'text-blue-600',
                  'text-green-600'
                ];
                
                return (
                  <Card key={category} className={`bg-gradient-to-br ${gradients[index]} shadow-2xl border-0 transform hover:scale-105 transition-all duration-300`}>
                    <CardContent className="p-6 bg-white/90 backdrop-blur-sm rounded-lg m-1">
                      <div className="flex items-center mb-4">
                        <div className={`flex-shrink-0 w-12 h-12 ${iconBgs[index]} rounded-xl flex items-center justify-center mr-4 shadow-lg`}>
                          {index === 0 && <BarChart3 className={`w-6 h-6 ${textColors[index]}`} />}
                          {index === 1 && <Megaphone className={`w-6 h-6 ${textColors[index]}`} />}
                          {index === 2 && <Palette className={`w-6 h-6 ${textColors[index]}`} />}
                          {index === 3 && <Briefcase className={`w-6 h-6 ${textColors[index]}`} />}
                        </div>
                        <h3 className={`text-lg font-bold ${textColors[index]}`}>{category}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {categoryTools.map((tool, toolIndex) => (
                          <Badge 
                            key={toolIndex} 
                            variant="secondary" 
                            className={`${iconBgs[index]} ${textColors[index]} hover:shadow-md transition-all duration-200 border-0 font-medium`}
                          >
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Marketing Strategy Consultation</h2>
            <Card className="bg-white shadow-lg border-0 max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center justify-center md:justify-start group">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-red-200 transition-colors">
                      <Mail className="text-red-600" size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-500 mb-1">Email for Marketing Projects</p>
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
                      <p className="text-sm text-gray-500 mb-1">Professional Network</p>
                      <a 
                        href={contactInfo.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                      >
                        Marketing Strategy LinkedIn
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center md:justify-start group">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-red-200 transition-colors">
                      <Phone className="text-red-600" size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-500 mb-1">Direct Contact</p>
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
                
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-gray-600 text-center mb-6">
                    Ready to collaborate on performance marketing campaigns and data-driven growth strategies? 
                    Let's discuss how strategic marketing coordination can drive measurable results for your brand.
                  </p>
                  <button
                    onClick={handleEmailClick}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Start Marketing Strategy Discussion
                  </button>
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