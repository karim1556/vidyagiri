import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface LearningCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

export const LearningCard = ({ icon, title, description, color }: LearningCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      const element = cardRef.current;
      
      const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        gsap.to(element, {
          duration: 0.5,
          rotateX: rotateX,
          rotateY: rotateY,
          scale: 1.05,
          ease: 'power2.out'
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          duration: 0.5,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          ease: 'power2.out'
        });
      };

      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`group h-full p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300
        border-t-4 border-${color}-500 transform perspective-1000 flex flex-col`}
    >
      <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
        {React.cloneElement(icon as React.ReactElement, {
          className: `h-12 w-12 text-${color}-600`
        })}
      </div>
      <h3 className={`text-2xl font-semibold text-${color}-900 mb-4 flex-shrink-0`}>{title}</h3>
      <p className="text-gray-600 leading-relaxed flex-grow">{description}</p>
      {/* <div className={`mt-6 w-0 group-hover:w-full h-0.5 bg-${color}-500 transition-all duration-300 flex-shrink-0`} /> */}
    </div>
  );
};

export default LearningCard;