import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Mail, Linkedin, Menu, X } from 'lucide-react';
import { contactInfo } from '../data/mock';
import { useState } from 'react';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent hover:from-red-700 hover:to-red-600 transition-all duration-300">
            {contactInfo.name} Portfolio
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-all duration-300 relative ${
                location.pathname === '/' 
                  ? 'text-red-600' 
                  : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Work
              {location.pathname === '/' && (
                <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-red-600 transition-all duration-300"></span>
              )}
            </Link>
            <Link 
              to="/about" 
              className={`font-medium transition-all duration-300 relative ${
                location.pathname === '/about' 
                  ? 'text-red-600' 
                  : 'text-gray-700 hover:text-red-600'
              }`}
            >
              About
              {location.pathname === '/about' && (
                <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-red-600 transition-all duration-300"></span>
              )}
            </Link>
          </nav>
          
          {/* Contact Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href={`mailto:${contactInfo.email}`}
              className="p-2 text-gray-600 hover:text-red-600 transition-colors duration-300 hover:bg-red-50 rounded-full"
            >
              <Mail size={20} />
            </a>
            <a 
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-red-600 transition-colors duration-300 hover:bg-red-50 rounded-full"
            >
              <Linkedin size={20} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-red-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <nav className="space-y-4">
              <Link 
                to="/" 
                className={`block font-medium transition-colors ${
                  location.pathname === '/' 
                    ? 'text-red-600' 
                    : 'text-gray-700 hover:text-red-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Work
              </Link>
              <Link 
                to="/about" 
                className={`block font-medium transition-colors ${
                  location.pathname === '/about' 
                    ? 'text-red-600' 
                    : 'text-gray-700 hover:text-red-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <div className="flex space-x-4 pt-4">
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
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;