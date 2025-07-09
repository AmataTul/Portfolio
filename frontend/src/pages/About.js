import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { workHistory, contactInfo } from '../data/mock';
import { Mail, Phone, MapPin, Linkedin, Award, Users, TrendingUp, Calendar } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Marketing
            <span className="block text-white/90">Coordinator</span>
          </h1>
          <p className="text-xl md:text-2xl text-red-100 mb-8 max-w-3xl mx-auto">
            A passionate marketing professional with 5+ years of experience creating impactful campaigns for leading brands
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Award className="text-red-200" size={20} />
              <span>Award-Winning Campaigns</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="text-red-200" size={20} />
              <span>50+ Brands Served</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="text-red-200" size={20} />
              <span>300% Avg. Engagement Increase</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Bio Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">About Me</h2>
            <div className="bg-white rounded-lg p-8 shadow-lg border border-red-100">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                I'm a results-driven marketing coordinator with a passion for creating compelling visual stories that resonate with audiences and drive business results. With over 5 years of experience in the industry, I've had the privilege of working with some of the world's most recognized brands.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                My expertise spans across multiple disciplines including social media marketing, event management, print and digital advertising, brand development, and video content creation. I believe that great marketing is about understanding your audience and crafting messages that not only capture attention but inspire action.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                When I'm not designing campaigns or managing events, you can find me exploring new creative trends, attending industry conferences, or mentoring young professionals in the marketing field.
              </p>
            </div>
          </div>

          {/* Work History */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Work Experience</h2>
            <div className="space-y-6">
              {workHistory.map((job, index) => (
                <Card key={index} className="bg-white border-red-100 hover:border-red-200 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-red-600 mb-1">{job.position}</h3>
                        <p className="text-gray-600 font-medium">{job.company}</p>
                      </div>
                      <Badge variant="outline" className="border-red-200 text-red-600 mt-2 md:mt-0">
                        <Calendar size={14} className="mr-1" />
                        {job.period}
                      </Badge>
                    </div>
                    <ul className="space-y-2">
                      {job.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="flex items-start">
                          <span className="text-red-500 mr-2 mt-1">•</span>
                          <span className="text-gray-700">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Core Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { skill: "Brand Strategy", level: "Expert" },
                { skill: "Social Media Marketing", level: "Expert" },
                { skill: "Event Management", level: "Advanced" },
                { skill: "Graphic Design", level: "Advanced" },
                { skill: "Video Production", level: "Intermediate" },
                { skill: "Print Advertising", level: "Advanced" },
                { skill: "Digital Marketing", level: "Expert" },
                { skill: "Campaign Management", level: "Expert" },
                { skill: "Content Creation", level: "Advanced" }
              ].map((item, index) => (
                <Card key={index} className="bg-white border-red-100 hover:border-red-200 transition-colors">
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.skill}</h3>
                    <Badge 
                      variant="secondary" 
                      className={`${
                        item.level === 'Expert' ? 'bg-red-100 text-red-800' :
                        item.level === 'Advanced' ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {item.level}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>
            <Card className="bg-white border-red-100 shadow-lg">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-center md:justify-start">
                    <Mail className="text-red-600 mr-3" size={20} />
                    <a href={`mailto:${contactInfo.email}`} className="text-gray-700 hover:text-red-600 transition-colors">
                      {contactInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <Linkedin className="text-red-600 mr-3" size={20} />
                    <a 
                      href={contactInfo.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-red-600 transition-colors"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <Phone className="text-red-600 mr-3" size={20} />
                    <span className="text-gray-700">{contactInfo.phone}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <MapPin className="text-red-600 mr-3" size={20} />
                    <span className="text-gray-700">{contactInfo.location}</span>
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