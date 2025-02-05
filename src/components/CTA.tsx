import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 bottom-0 bg-gradient-to-r from-indigo-600 via-purple-700 to-indigo-800 opacity-90">
        <div className="absolute inset-x-0 top-0 bottom-0 bg-grid-white/[0.1] bg-[size:16px_16px]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
        <div className="animate-fadeInUp">
          <Sparkles className="h-16 w-16 text-white/90 mx-auto mb-8 animate-spin" />
          <h2 className="text-5xl font-extrabold text-white mb-6 leading-tight tracking-wide">
            Ready to Transform Your Learning Journey?
          </h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Take our comprehensive VARK assessment and get personalized learning strategies that are tailored to your unique needs.
          </p>
          <Link to="https://mycollege.vpt.edu.in/vark/">
  <button className="px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transform transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50">
    Take Free Assessment
    <ArrowRight className="ml-2 inline-block transition-transform group-hover:translate-x-2" />
  </button>
</Link>
        </div>
      </div>
    </div>
  );
};

export default CTA;