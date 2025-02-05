
import { Eye, Headphones, BookOpen, Activity } from 'lucide-react';
import { LearningCard } from './LearningCard';

export const LearningStylesSection = () => {
  const learningStyles = [
    {
      icon: <Eye />,
      title: "Visual",
      description: "Learn through diagrams, charts, and spatial arrangements",
      color: "indigo"
    },
    {
      icon: <Headphones className="h-8 w-8 text-purple-600" />,
      title: "Auditory",
      description: "Process information through listening and discussion",
      color: "purple"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-pink-600" />,
      title: "Reading/Writing",
      description: "Prefer written words and text-based input/output",
      color: "pink"
    },
    {
      icon: <Activity className="h-8 w-8 text-rose-600" />,
      title: "Kinesthetic",
      description: "Learn through experience and hands-on practice",
      color: "rose"
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Four Dimensions of Learning
          </h2>
          <p className="text-xl text-gray-600">
            Everyone has a unique way of processing information. Discover yours.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {learningStyles.map((style, index) => (
            <div 
              key={style.title} 
              className="animate-on-scroll" 
              style={{ animationDelay: `${0.2 * (index + 1)}s` }}
            >
              <LearningCard {...style} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningStylesSection;