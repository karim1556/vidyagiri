import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface BenefitItemProps {
  text: string;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ text }) => {
  return (
    <div className="flex items-center space-x-4 group p-4 rounded-lg hover:bg-white/50 transition-all duration-300">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-50 transition-all duration-300" />
        <CheckCircle2 className="h-8 w-8 text-indigo-600 relative transform group-hover:scale-110 transition-transform duration-300" />
      </div>
      <span className="text-xl text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
        {text}
      </span>
    </div>
  );
};

const Benefits = () => {
  return (
    <div className="py-32 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600"
              alt="Learning Benefits"
              className="relative rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-all duration-500"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8">
              Why Understanding VARK Matters
            </h2>
            <div className="space-y-6">
              {[
                'Optimize your learning efficiency',
                'Develop personalized study strategies',
                'Enhance information retention',
                'Boost academic performance'
              ].map((benefit) => (
                <BenefitItem key={benefit} text={benefit} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;