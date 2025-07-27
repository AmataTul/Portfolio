import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { workHistory, education, contactInfo, tools } from '../data/mock';
import { 
  Mail, Phone, MapPin, Linkedin, Award, Users, TrendingUp, Calendar, 
  GraduationCap, Briefcase, Target, BarChart3, Zap, Palette, Megaphone, Trophy 
} from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  const toolCategories = {
    "Analytics & Data Intelligence": ["Google Analytics", "Adobe Analytics", "Looker Studio", "SQL", "Tableau", "Hotjar"],
    "Digital Marketing & Advertising": ["Google Ads", "Meta Ads Manager", "HubSpot", "Semrush", "MailChimp"],
    "Creative & Design": ["Adobe Photoshop", "Adobe Illustrator", "Canva", "CapCut", "Figma"],
    "Project Management & Operations": ["WordPress", "Trello", "Jira", "Miro", "Notion"],
    "SEO & Research": ["SEMrush", "Ahrefs", "Google Search Console", "Keyword Planner", "Screaming Frog", "Moz"]
  };

  const handleEmailClick = () => {
    const subject = "Marketing Strategy Collaboration Opportunity";
    const body = "Hi Amata,\n\nI found your marketing portfolio and I'm impressed with your performance marketing expertise and data-driven approach. I'd love to discuss potential collaboration opportunities.\n\nBest regards,";
    window.location.href = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleBackToWork = () => {
    navigate('/', { replace: true });
    // Smooth scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
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

            {/* Professional Info */}
            <div className="flex-grow">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div className="mb-4 sm:mb-0">
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{contactInfo.name}</h1>
                  <div className="relative mb-4">
                    <div className="group relative inline-block">
                      {/* Main Cloud Bubble */}
                      <div className="relative bg-gradient-to-br from-white/25 via-white/20 to-white/15 backdrop-blur-md border border-white/30 rounded-3xl px-6 py-4 shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                        {/* Animated Background Orbs */}
                        <div className="absolute inset-0 rounded-3xl overflow-hidden">
                          <div className="absolute top-2 left-4 w-8 h-8 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-sm animate-pulse"></div>
                          <div className="absolute bottom-3 right-6 w-6 h-6 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-sm animate-bounce"></div>
                          <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-sm animate-ping"></div>
                        </div>
                        
                        {/* Text Content */}
                        <p className="relative z-10 text-yellow-100 font-medium text-base leading-relaxed">
                          <span className="font-semibold text-white">Creative Marketing Professional</span> blending data insights with creative solutions. 
                          <span className="block mt-2 text-sm">
                            Strong focus on project management, CRM optimization & problem-solving. 
                            <span className="text-cyan-200 font-medium">Adaptable • Collaborative • Challenge-Ready</span>
                          </span>
                        </p>
                        
                        {/* Floating Elements */}
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-70 animate-bounce"></div>
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60 animate-pulse"></div>
                      </div>
                      
                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                    </div>
                  </div>
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

              {/* Industry Experience - Smaller */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-6">
                <h4 className="text-cyan-200 font-medium mb-2 text-sm">Industries:</h4>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-yellow-400/20 text-yellow-200 px-2 py-1 rounded-full text-xs">Retail</span>
                  <span className="bg-pink-400/20 text-pink-200 px-2 py-1 rounded-full text-xs">Food & Beverage</span>
                  <span className="bg-green-400/20 text-green-200 px-2 py-1 rounded-full text-xs">Oil & Gas</span>
                  <span className="bg-purple-400/20 text-purple-200 px-2 py-1 rounded-full text-xs">Entertainment</span>
                  <span className="bg-blue-400/20 text-blue-200 px-2 py-1 rounded-full text-xs">Restaurant</span>
                  <span className="bg-orange-400/20 text-orange-200 px-2 py-1 rounded-full text-xs">Agriculture</span>
                </div>
              </div>

              {/* Vibrant Action Buttons */}
              <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-4 sm:space-y-0">
                <button 
                  onClick={handleEmailClick}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 font-semibold py-3 px-6 md:px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-sm md:text-base"
                >
                  💼 I'm Available for Hire!
                </button>
                <button
                  onClick={handleBackToWork}
                  className="bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white font-semibold py-3 px-6 md:px-8 rounded-full transition-all duration-300 border-2 border-white/30 shadow-xl text-sm md:text-base"
                >
                  👈 Back to Work Gallery
                </button>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Creative Marketing Professional & Data Analytics Expert</h2>
            <Card className="bg-white shadow-lg border-0">
              <CardContent className="p-8">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6 border-l-4 border-blue-500">
                  <p className="text-lg md:text-xl text-gray-800 font-semibold leading-relaxed mb-4">
                    Creative Marketing Professional & Data Analytics Expert
                  </p>
                  <p className="text-lg md:text-xl text-blue-800 leading-relaxed mb-4">
                    I bring a unique blend of creative marketing expertise and data-driven insights that deliver measurable results across all marketing channels. With a background in Information Systems (Data Analytics) and a minor in Marketing, I develop innovative strategies that drive brand growth, optimize customer engagement, and maximize ROI.
                  </p>
                  <p className="text-lg md:text-xl text-purple-800 font-medium leading-relaxed">
                    My experience spans multiple industries, equipping me with the skills to adapt quickly and implement tailored marketing solutions in any market. Hiring me means investing in a versatile professional who thrives in dynamic environments and is ready to tackle challenges with innovative, data-backed strategies.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Core Expertise Column 1 */}
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-bold text-blue-800 mb-2 flex items-center">
                        <span className="text-xl mr-2">📊</span>
                        Data Analytics & Business Intelligence
                      </h4>
                      <p className="text-gray-700 text-sm mb-2">Proficiency in Google Analytics, Tableau, Power BI, and SQL to analyze customer data and campaign performance.</p>
                      <p className="text-gray-700 text-sm">Data-driven decision-making, predictive analytics, and ROI measurement.</p>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-bold text-green-800 mb-2 flex items-center">
                        <span className="text-xl mr-2">🔍</span>
                        SEO & SEM Expertise
                      </h4>
                      <p className="text-gray-700 text-sm mb-2">Advanced knowledge of SEO strategies, including on-page, off-page, and technical SEO.</p>
                      <p className="text-gray-700 text-sm">Experience with Google Ads and Bing Ads, managing PPC campaigns, and retargeting strategies.</p>
                    </div>
                    
                    <div className="bg-pink-50 rounded-lg p-4">
                      <h4 className="font-bold text-pink-800 mb-2 flex items-center">
                        <span className="text-xl mr-2">📱</span>
                        Social Media Marketing
                      </h4>
                      <p className="text-gray-700 text-sm mb-2">Expertise in social media platforms (Instagram, TikTok, LinkedIn, etc.) and creating high-engagement content.</p>
                      <p className="text-gray-700 text-sm">Advanced social media ads management and influencer marketing.</p>
                    </div>
                    
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-bold text-purple-800 mb-2 flex items-center">
                        <span className="text-xl mr-2">📧</span>
                        Email Marketing & Automation
                      </h4>
                      <p className="text-gray-700 text-sm mb-2">Experience with Mailchimp, HubSpot, ActiveCampaign to create automated email campaigns.</p>
                      <p className="text-gray-700 text-sm">A/B testing and segmentation for better targeting and engagement.</p>
                    </div>
                    
                    <div className="bg-orange-50 rounded-lg p-4">
                      <h4 className="font-bold text-orange-800 mb-2 flex items-center">
                        <span className="text-xl mr-2">✍️</span>
                        Content Creation & Strategy
                      </h4>
                      <p className="text-gray-700 text-sm mb-2">Develop and execute content strategies across various platforms (blogs, video, podcasts).</p>
                      <p className="text-gray-700 text-sm">Strong skills in copywriting and visual storytelling.</p>
                    </div>
                  </div>
                  
                  {/* Core Expertise Column 2 */}
                  <div className="space-y-4">
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <h4 className="font-bold text-indigo-800 mb-2 flex items-center">
                        <span className="text-xl mr-2">🎨</span>
                        UX/UI Design Knowledge
                      </h4>
                      <p className="text-gray-700 text-sm mb-2">Understanding of UX and UI principles for better web design and conversions.</p>
                      <p className="text-gray-700 text-sm">Familiarity with Figma, Adobe XD, and Sketch.</p>
                    </div>
                    
                    <div className="bg-teal-50 rounded-lg p-4">
                      <h4 className="font-bold text-teal-800 mb-2 flex items-center">
                        <span className="text-xl mr-2">🤖</span>
                        AI & Automation
                      </h4>
                      <p className="text-gray-700 text-sm mb-2">Knowledge of AI-enhanced marketing through chatbots, personalization tools, and AI-driven analytics.</p>
                      <p className="text-gray-700 text-sm">Using GPT-4, HubSpot AI, and ChatGPT for content creation and workflow automation.</p>
                    </div>
                    
                    <div className="bg-red-50 rounded-lg p-4">
                      <h4 className="font-bold text-red-800 mb-2 flex items-center">
                        <span className="text-xl mr-2">🎬</span>
                        Video Marketing & Live Streaming
                      </h4>
                      <p className="text-gray-700 text-sm mb-2">Creating short-form and long-form video content for TikTok, YouTube, and Instagram.</p>
                      <p className="text-gray-700 text-sm">Proficiency with Adobe Premiere Pro and Final Cut Pro.</p>
                    </div>
                    
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
                        <span className="text-xl mr-2">🛒</span>
                        E-commerce Optimization
                      </h4>
                      <p className="text-gray-700 text-sm mb-2">Expertise in optimizing e-commerce websites (Shopify, WooCommerce), CRO, and customer journey mapping.</p>
                      <p className="text-gray-700 text-sm">Conversion rate optimization and sales funnel development.</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-bold text-gray-800 mb-2 flex items-center">
                        <span className="text-xl mr-2">🤝</span>
                        Influencer Marketing & Brand Partnerships
                      </h4>
                      <p className="text-gray-700 text-sm mb-2">Identifying and collaborating with influencers to expand brand reach.</p>
                      <p className="text-gray-700 text-sm">Managing brand partnerships and co-marketing campaigns.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Marketing Tools & Technologies */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text mb-8 text-center">Marketing Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(toolCategories).map(([category, categoryTools], index) => {
                const gradients = [
                  'from-pink-500 to-rose-500',
                  'from-purple-500 to-indigo-500', 
                  'from-blue-500 to-cyan-500',
                  'from-green-500 to-teal-500',
                  'from-orange-500 to-red-500'
                ];
                const iconBgs = [
                  'bg-gradient-to-r from-pink-100 to-rose-100',
                  'bg-gradient-to-r from-purple-100 to-indigo-100',
                  'bg-gradient-to-r from-blue-100 to-cyan-100', 
                  'bg-gradient-to-r from-green-100 to-teal-100',
                  'bg-gradient-to-r from-orange-100 to-red-100'
                ];
                const textColors = [
                  'text-pink-600',
                  'text-purple-600',
                  'text-blue-600',
                  'text-green-600',
                  'text-orange-600'
                ];
                
                return (
                  <Card key={category} className={`bg-gradient-to-br ${gradients[index % gradients.length]} shadow-2xl border-0 transform hover:scale-105 transition-all duration-300 ${index === 4 ? 'md:col-span-2' : ''}`}>
                    <CardContent className="p-6 bg-white/90 backdrop-blur-sm rounded-lg m-1">
                      <div className="flex items-center mb-4">
                        <div className={`flex-shrink-0 w-12 h-12 ${iconBgs[index % iconBgs.length]} rounded-xl flex items-center justify-center mr-4 shadow-lg`}>
                          {index === 0 && <BarChart3 className={`w-6 h-6 ${textColors[index % textColors.length]}`} />}
                          {index === 1 && <Megaphone className={`w-6 h-6 ${textColors[index % textColors.length]}`} />}
                          {index === 2 && <Palette className={`w-6 h-6 ${textColors[index % textColors.length]}`} />}
                          {index === 3 && <Briefcase className={`w-6 h-6 ${textColors[index % textColors.length]}`} />}
                          {index === 4 && <Target className={`w-6 h-6 ${textColors[index % textColors.length]}`} />}
                        </div>
                        <h3 className={`text-lg font-bold ${textColors[index % textColors.length]}`}>{category}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {categoryTools.map((tool, toolIndex) => (
                          <Badge 
                            key={toolIndex} 
                            variant="secondary" 
                            className={`${iconBgs[index % iconBgs.length]} ${textColors[index % textColors.length]} hover:shadow-md transition-all duration-200 border-0 font-medium`}
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

          {/* Education & Career Journey */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text mb-8 text-center">Academic Foundation & Career Journey</h2>
            
            {/* Education Highlight */}
            <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 shadow-2xl border-2 border-purple-200 mb-8">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-6 shadow-xl">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{education.degree}</h3>
                    <p className="text-lg text-purple-600 font-semibold">{education.minor}</p>
                    <p className="text-md text-blue-600 mt-1">{education.university} • {education.honor} • {education.period}</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Academic Achievements & Scholarships</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                      <p className="text-sm font-semibold text-yellow-800">🏆 Julie Ann Cook's Data Ninja Scholarship</p>
                      <p className="text-xs text-yellow-700">First remote recipient - Extremely competitive</p>
                    </div>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                      <p className="text-sm font-semibold text-blue-800">🎓 Direct Admit Business Scholarship</p>
                      <p className="text-xs text-blue-700">Top 10% high school class</p>
                    </div>
                    <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                      <p className="text-sm font-semibold text-green-800">💰 Hansen Differential Tuition Scholarship</p>
                      <p className="text-xs text-green-700">Faculty endorsed selection</p>
                    </div>
                    <div className="bg-pink-50 border-l-4 border-pink-400 p-4 rounded">
                      <p className="text-sm font-semibold text-pink-800">🎨 3rd Place Digital Media Arts Festival</p>
                      <p className="text-xs text-pink-700">Creative excellence recognition</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Experience - More Visual and Engaging */}
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Professional Marketing Experience</h3>
            <div className="space-y-8">
              {workHistory.map((job, index) => (
                <Card key={index} className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-6 text-white">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="mb-4 lg:mb-0">
                          <h4 className="text-xl font-bold mb-2">{job.position}</h4>
                          <p className="text-lg font-semibold text-yellow-200">{job.company}</p>
                          <p className="text-sm text-purple-100">{job.location}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge className="bg-white/20 text-white border-white/30">
                            <Calendar size={14} className="mr-2" />
                            {job.period}
                          </Badge>
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {job.achievements.map((achievement, achievementIndex) => (
                          <div key={achievementIndex} className="flex items-start bg-gray-50 p-4 rounded-lg">
                            <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mt-1 mr-3">
                              <span className="text-white text-xs font-bold">{achievementIndex + 1}</span>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">{achievement}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Professional Accomplishments */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Professional Accomplishments</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {/* Business Strategy Game Achievement */}
              <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <BarChart3 className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-blue-600 mb-1">Business Strategy Game Champion</h3>
                      <p className="text-sm text-gray-600">Utah State University • April 2022</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <Badge className="bg-blue-100 text-blue-800 text-xs">1ST PLACE (158 STUDENTS)</Badge>
                    <Badge className="bg-purple-100 text-purple-800 text-xs">WORLDWIDE COMPETITION INVITE</Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">
                    Achieved 1st place in semester-long business simulation. Served as consultant to my team and teams from other industries. 
                    Demonstrated exceptional strategic thinking and financial management skills.
                  </p>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">29.4%</div>
                      <div className="text-xs text-gray-600">ROE</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">$13.57</div>
                      <div className="text-xs text-gray-600">EPS</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-pink-600">A+</div>
                      <div className="text-xs text-gray-600">Credit</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">$1.2M+</div>
                      <div className="text-xs text-gray-600">Revenue</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                    <button
                      onClick={handleBackToWork}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-6 md:px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl"
                    >
                      👈 View My Portfolio
                    </button>
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