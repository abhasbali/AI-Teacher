import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "High School Principal",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    quote: "EduAssist AI has revolutionized how we create and deliver content. Our teachers save hours of preparation time.",
    rating: 5
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    role: "Computer Science Teacher",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    quote: "The automated grading system is incredibly accurate and has reduced my workload significantly.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Mathematics Department Head",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    quote: "The analytics provided by EduAssist AI have given us unprecedented insights into student performance.",
    rating: 5
  }
];

export function TestimonialSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Create an extended array for infinite scrolling effect
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];
  const totalSlides = testimonials.length;

  const slideVariants = {
    enter: {
      x: '100%',
      opacity: 0
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: '-100%',
      opacity: 0
    }
  };

  const wrapperVariants = {
    initial: {
      x: 0
    },
    animate: {
      x: `-${(activeIndex % totalSlides) * 100}%`
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        setActiveIndex((prev) => (prev + 1) % extendedTestimonials.length);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [isAnimating, extendedTestimonials.length]);

  // Reset to beginning when reaching end
  useEffect(() => {
    if (activeIndex >= totalSlides * 2) {
      setTimeout(() => {
        setIsAnimating(true);
        setActiveIndex(activeIndex % totalSlides);
        setTimeout(() => setIsAnimating(false), 50);
      }, 500);
    }
  }, [activeIndex, totalSlides]);

  return (
    <div className="relative max-w-5xl mx-auto overflow-hidden">
      <motion.div
        className="flex transition-transform duration-500 ease-in-out"
        variants={wrapperVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5 }}
      >
        {extendedTestimonials.map((testimonial, index) => (
          <motion.div
            key={`${testimonial.id}-${index}`}
            className="w-full flex-shrink-0 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-500/20">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-5 h-5 fill-cyan-500 text-cyan-500"
                      />
                    ))}
                  </div>
                  <blockquote className="text-xl text-slate-200 italic mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="text-white font-semibold">
                    {testimonial.name}
                  </div>
                  <div className="text-slate-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setActiveIndex(index);
              }
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex % totalSlides
                ? 'bg-cyan-500 w-8'
                : 'bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-cyan-500/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
} 