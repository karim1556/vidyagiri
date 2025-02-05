import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Menu, X } from 'lucide-react';

interface NavProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const Nav: React.FC<NavProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const navItems = [
    { name: 'Learning Styles', path: '/learning-styles' },
    { name: 'Assessment', path: '/assessment' },
    { name: 'Resources', path: '/resources' },
    { name: 'About', path: '/about' }
  ];

  return (
    <nav className="backdrop-blur-md bg-white/80 shadow-lg fixed w-full z-50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center group">
            <Brain className="h-8 w-8 text-indigo-600 transform group-hover:rotate-12 transition-transform duration-300" />
            <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              VIDYAGIRI
            </span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path}
                className="relative text-gray-700 hover:text-indigo-600 transition-colors duration-300 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"/>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              to="https://mycollege.vpt.edu.in/vark/" 
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transform transition-all duration-300"
            >
              Take Assessment
            </Link>
            <button 
              className="md:hidden" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full backdrop-blur-md bg-white/90 shadow-xl md:hidden animate-slide-down">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              to={item.path}
              className="block px-6 py-4 hover:bg-indigo-50 transition-colors duration-300 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Nav;