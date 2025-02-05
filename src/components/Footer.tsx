import { Link } from 'react-router-dom';
import { Brain, ArrowRight } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Learning Styles',
      links: ['Visual', 'Auditory', 'Reading/Writing', 'Kinesthetic']
    },
    {
      title: 'Resources',
      links: ['Assessment', 'Strategies', 'Research']
    },
    {
      title: 'Company',
      links: ['About', 'Contact', 'Privacy']
    }
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center mb-6 group">
              <Brain className="h-8 w-8 text-indigo-400 transform group-hover:rotate-12 transition-transform duration-300" />
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                vidyagiri
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              Empowering learners through personalized education
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="md:col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-white/90">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      to={`/${link.toLowerCase()}`}
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Vidyagiri. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;