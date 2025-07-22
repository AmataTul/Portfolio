import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { workHistory, education, contactInfo, tools } from '../data/mock';
import { 
  Mail, Phone, MapPin, Linkedin, Award, Users, TrendingUp, Calendar, 
  GraduationCap, Briefcase, Target, BarChart3, Zap, Palette, Megaphone 
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
      <section className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl animate-bounce"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-pink-400/30 rounded-full blur-lg animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-cyan-400/20 rounded-full blur-2xl animate-ping"></div>
          <div className="absolute bottom-40 right-10 w-28 h-28 bg-green-400/30 rounded-full blur-xl animate-bounce"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Professional Profile Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12">
            {/* Vibrant Profile Picture */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 via-pink-400 to-purple-500 p-1 shadow-2xl animate-pulse">
                <div className="w-full h-full rounded-full bg-white p-1">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 flex items-center justify-center">
                    <span className="text-4xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">AT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Colorful Professional Info */}
            <div className="flex-grow">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{contactInfo.name}</h1>
                  <p className="text-yellow-200 font-medium text-base md:text-lg mb-4 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">Creative Marketing Professional & Brand Strategist</p>
                  <div className="flex items-center text-cyan-200 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{contactInfo.location}</span>
                  </div>
                </div>
                
                {/* Colorful Professional Metrics */}
                <div className="flex space-x-8 mt-4 sm:mt-0">
                  <div className="text-center bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                    <div className="text-2xl font-bold text-yellow-300">80+</div>
                    <div className="text-sm text-purple-200">Campaigns</div>
                  </div>
                  <div className="text-center bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                    <div className="text-2xl font-bold text-pink-300">5+</div>
                    <div className="text-sm text-purple-200">Years</div>
                  </div>
                  <div className="text-center bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                    <div className="text-2xl font-bold text-cyan-300">300%</div>
                    <div className="text-sm text-purple-200">Growth</div>
                  </div>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="space-y-3 mb-6">
                <p className="text-white font-medium bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  🚀 Data-driven marketing coordinator specializing in performance marketing, conversion rate optimization, and growth marketing strategies
                </p>
                <p className="text-yellow-100 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  ✨ Expert in digital marketing campaigns, marketing analytics, and ROI-focused brand strategies for enterprise clients
                </p>
              </div>

              {/* Vibrant Action Buttons */}
              <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-4 sm:space-y-0">
                <button 
                  onClick={handleEmailClick}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 font-semibold py-3 px-6 md:px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-sm md:text-base"
                >
                  💼 I'm Available for Hire!
                </button>
                <a
                  href="/"
                  className="bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white font-semibold py-3 px-6 md:px-8 rounded-full transition-all duration-300 border-2 border-white/30 shadow-xl text-sm md:text-base"
                >
                  👈 Back to Work Gallery
                </a>
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-semibold py-3 px-6 md:px-8 rounded-full transition-all duration-300 border-2 border-white/30 shadow-xl text-sm md:text-base"
                >
                  🔗 LinkedIn Profile
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
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                  I'm a creative marketing professional actively seeking opportunities to join innovative teams where I can contribute my 5+ years of experience in social media marketing, brand strategy, and data-driven campaign optimization. My expertise spans performance marketing, content creation, and conversion optimization with proven results for diverse brands.
                </p>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  Passionate about transforming brands through creative storytelling, strategic social media campaigns, and measurable growth initiatives. Ready to bring fresh perspectives and proven expertise to drive your marketing objectives forward.
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

          {/* Strategic Achievements Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text mb-8 text-center">Strategic Business Achievement</h2>
            <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 shadow-2xl border-2 border-purple-200">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 shadow-xl">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Business Strategy Game Champion</h3>
                  <p className="text-lg text-purple-600 font-semibold">🏆 1st Place Winner Among 158 Students</p>
                  <p className="text-md text-blue-600 mt-2">🌍 Invited to Worldwide University Competition</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-2">29.4%</div>
                      <div className="text-sm text-gray-600">Return on Equity</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-2">$13.57</div>
                      <div className="text-sm text-gray-600">Earnings Per Share</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-pink-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-pink-600 mb-2">A+</div>
                      <div className="text-sm text-gray-600">Credit Rating</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-2">$1.2M+</div>
                      <div className="text-sm text-gray-600">Net Revenue</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-4 text-lg">Key Strategic Decisions & Impact</h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-4"></div>
                      <p className="text-gray-700">Corporate citizenship investments improved image rating from 77 to 94 (22% increase)</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2 mr-4"></div>
                      <p className="text-gray-700">Strategic production capacity expansion in Latin America to meet demand</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-2 h-2 bg-pink-500 rounded-full mt-2 mr-4"></div>
                      <p className="text-gray-700">Enhanced celebrity contract bidding to improve brand appeal and market position</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2 mr-4"></div>
                      <p className="text-gray-700">Maintained A+ credit rating for 4 consecutive years through strategic financial management</p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
                    <p className="text-green-700 font-semibold">
                      <strong>Result:</strong> Achieved highest revenue in industry through data-driven strategic decisions and comprehensive market analysis
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Looking to Hire Top Marketing Talent? 🎯</h2>
            <Card className="bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 shadow-2xl border-2 border-purple-200 max-w-4xl mx-auto">
              <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center justify-center md:justify-start group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mr-4 group-hover:from-purple-200 group-hover:to-pink-200 transition-colors">
                      <Mail className="text-purple-600" size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-500 mb-1">Ready to Join Your Team</p>
                      <a href={`mailto:${contactInfo.email}`} className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center md:justify-start group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-pink-100 to-orange-100 rounded-full flex items-center justify-center mr-4 group-hover:from-pink-200 group-hover:to-orange-200 transition-colors">
                      <Linkedin className="text-pink-600" size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-500 mb-1">Professional Network</p>
                      <a 
                        href={contactInfo.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-pink-600 transition-colors font-medium"
                      >
                        Connect on LinkedIn
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center md:justify-start group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mr-4 group-hover:from-blue-200 group-hover:to-cyan-200 transition-colors">
                      <Phone className="text-blue-600" size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-500 mb-1">Direct Contact</p>
                      <span className="text-gray-700 font-medium">{contactInfo.phone}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center md:justify-start group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-100 to-teal-100 rounded-full flex items-center justify-center mr-4 group-hover:from-green-200 group-hover:to-teal-200 transition-colors">
                      <MapPin className="text-green-600" size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-500 mb-1">Location</p>
                      <span className="text-gray-700 font-medium">{contactInfo.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t-2 border-gradient-to-r from-purple-200 to-pink-200">
                  <p className="text-gray-600 text-center mb-6">
                    I'm actively seeking opportunities to join a creative marketing team where I can contribute my expertise in 
                    <span className="font-semibold text-purple-600"> social media marketing, brand strategy,</span> and 
                    <span className="font-semibold text-pink-600"> data-driven campaign optimization.</span>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={handleEmailClick}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 md:px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl"
                    >
                      💼 Let's Discuss Opportunities
                    </button>
                    <a
                      href="/"
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-6 md:px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl"
                    >
                      👈 View My Portfolio
                    </a>
                  </div>
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