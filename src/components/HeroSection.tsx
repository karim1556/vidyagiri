import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from "react-router-dom";


gsap.registerPlugin(ScrollTrigger);

const HeroSection = React.forwardRef<HTMLDivElement>((props, ref) => {
  const heroSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1500",
      title: "Discover Your Unique Learning Style",
      subtitle: "Unlock your full potential with vidyagiri methodology.",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500",
        title: "Empower Your Learning Journey",
        subtitle: "Personalized strategies tailored for you.",
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1500",
        title: "Transform Your Study Habits",
        subtitle: "Achieve excellence through innovative techniques.",
      }
    // Add other slides as needed
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const localRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  useEffect(() => {
    if (localRef.current) {
      gsap.fromTo(
        localRef.current.querySelectorAll('.hero-animate'),
        { 
          opacity: 0, 
          y: 100, 
          rotationX: 30, 
          perspective: 1000,
          filter: 'blur(10px)'
        },
        { 
          opacity: 1, 
          y: 0, 
          rotationX: 0,
          filter: 'blur(0px)',
          duration: 1.5, 
          ease: 'power4.out',
          stagger: 0.25,
          scrollTrigger: {
            trigger: localRef.current,
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }, []);

  return (
    <div ref={localRef} className="relative h-[700px] overflow-hidden mt-20">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 transform ${
            index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-110"
          }`}
        >
          <img 
            src={slide.image} 
            alt="" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
        </div>
      ))}

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
        <h1 className="text-6xl font-bold text-white mb-8 hero-animate max-w-4xl leading-tight">
          {heroSlides[currentSlide].title}
        </h1>
        <p className="text-2xl text-white/90 mb-12 hero-animate max-w-2xl">
          {heroSlides[currentSlide].subtitle}
        </p>
        <Link to="https://mycollege.vpt.edu.in/vark/">
        <button className="px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:shadow-xl hover:scale-105 transform transition-all duration-300 group hero-animate">
          Take Free Assessment
          <ArrowRight className="ml-2 inline-block transition-transform group-hover:translate-x-2" />
        </button>
        </Link>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-white w-8" 
                : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;