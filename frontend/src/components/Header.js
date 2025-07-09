import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Mail, Linkedin } from 'lucide-react';
import { contactInfo } from '../data/mock';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-red-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-red-600 hover:text-red-700 transition-colors">
            Portfolio
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'text-red-600 border-b-2 border-red-600' 
                  : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Work
            </Link>
            <Link 
              to="/about" 
              className={`font-medium transition-colors ${
                location.pathname === '/about' 
                  ? 'text-red-600 border-b-2 border-red-600' 
                  : 'text-gray-700 hover:text-red-600'
              }`}
            >
              About
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <a 
              href={`mailto:${contactInfo.email}`}
              className="p-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <Mail size={20} />
            </a>
            <a 
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;