import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Award, Brain, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { TestimonialSlider } from '../components/TestimonialSlider';

const CircuitBoardBackground = () => {
  return (
    <motion.div
      className="fixed inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Deep Space Background Layer - This will be consistent throughout */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(13, 15, 34, 1) 0%, rgba(2, 8, 20, 1) 100%)',
        }}
      />

      {/* Enhanced Circuit Pattern Layer */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(2, 8, 20, 0.9), rgba(2, 8, 20, 0.9)),
            repeating-linear-gradient(
              0deg,
              rgba(6, 182, 212, 0.1) 0px,
              rgba(6, 182, 212, 0.1) 1px,
              transparent 1px,
              transparent 25px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(6, 182, 212, 0.1) 0px,
              rgba(6, 182, 212, 0.1) 1px,
              transparent 1px,
              transparent 25px
            )
          `,
          backgroundSize: '100% 100%, 25px 25px, 25px 25px'
        }}
      />

      {/* Moving Circuit Lines */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: Math.random() * 300 + 100 + 'px',
            height: '1px',
            background: `linear-gradient(90deg, 
              transparent,
              rgba(6, 182, 212, ${Math.random() * 0.4 + 0.1}),
              rgba(59, 130, 246, ${Math.random() * 0.4 + 0.1}),
              transparent
            )`,
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            transform: `rotate(${Math.random() * 360}deg)`,
            boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)',
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [1, 1.2, 1],
            x: ['-20px', '20px', '-20px'],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Enhanced Circuit Nodes */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={`node-${i}`}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            background: Math.random() > 0.5 ? '#06b6d4' : '#3b82f6',
            boxShadow: `0 0 ${Math.random() * 10 + 5}px ${Math.random() > 0.5 ? '#06b6d4' : '#3b82f6'}`,
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
            boxShadow: [
              `0 0 5px ${Math.random() > 0.5 ? '#06b6d4' : '#3b82f6'}`,
              `0 0 20px ${Math.random() > 0.5 ? '#06b6d4' : '#3b82f6'}`,
              `0 0 5px ${Math.random() > 0.5 ? '#06b6d4' : '#3b82f6'}`
            ],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Floating Tech Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: `rgba(${Math.random() > 0.5 ? '6, 182, 212' : '59, 130, 246'}, 0.5)`,
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 0.8, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Modified Gradient Overlay for better consistency */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(6, 182, 212, 0.05) 0%, transparent 25%),
            radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 25%),
            radial-gradient(circle at 50% 50%, transparent 0%, rgba(2, 8, 20, 0.3) 100%)
          `,
        }}
      />

      {/* Subtle Scan Lines */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(255, 255, 255, 0.03) 0px,
              rgba(255, 255, 255, 0.03) 1px,
              transparent 1px,
              transparent 2px
            )
          `,
          backgroundSize: '100% 2px',
        }}
      />
    </motion.div>
  );
};

export function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Smart Content Generation",
      description: "AI-powered lesson plans and study materials tailored to each student's needs."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Student Performance Tracking",
      description: "Real-time analytics and insights into student progress and engagement."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Automated Grading",
      description: "Instant feedback and grading powered by advanced AI algorithms."
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Personalized Learning",
      description: "Adaptive learning paths that evolve with student progress."
    }
  ];

  const pricingPlans = [
    {
      name: "Basic",
      price: "Free",
      description: "Perfect for individual teachers",
      features: [
        "Up to 30 students",
        "Basic content generation",
        "Performance tracking",
        "Email support"
      ]
    },
    {
      name: "Pro",
      price: "$49/month",
      description: "Ideal for departments",
      features: [
        "Up to 150 students",
        "Advanced AI content generation",
        "Detailed analytics",
        "Priority support",
        "Custom assessments",
        "Automated grading"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For entire institutions",
      features: [
        "Unlimited students",
        "Custom integrations",
        "24/7 dedicated support",
        "Advanced security features",
        "Custom reporting",
        "API access"
      ]
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <CircuitBoardBackground />
      
      {/* Add Header */}
      <Header />

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative min-h-screen">
          {/* Hero Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center relative max-w-4xl mx-auto pt-20"
            >
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 text-shadow-lg">
                Transform Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 block mt-2">
                  Teaching Experience
                </span>
              </h1>
              <p className="text-xl text-slate-200 mb-12 max-w-2xl mx-auto text-shadow">
                Harness the power of AI to create engaging content, track student progress,
                and automate grading - all in one platform.
              </p>
              <div className="flex items-center justify-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/dashboard')}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-full
                    font-semibold text-lg flex items-center gap-2 hover:shadow-lg
                    hover:shadow-cyan-500/30 transition-all duration-300"
                >
                  Enter Dashboard
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = 'http://localhost:8080'}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-full
                    font-semibold text-lg flex items-center gap-2 hover:shadow-lg
                    hover:shadow-indigo-500/30 transition-all duration-300"
                >
                  Login as Student
                  <Users className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Replace the div with background color with this */}
        <div className="relative">
          {/* About Section */}
          <div id="about" className="relative py-24">
            <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h2 className="text-4xl font-bold text-white mb-8">
                  Why Choose Our Platform?
                </h2>
                <p className="text-xl text-slate-300">
                  Built by educators for educators, our AI-powered platform revolutionizes
                  the teaching experience by automating routine tasks and providing
                  data-driven insights for better student outcomes.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Features Section */}
          <div id="features" className="relative py-24 bg-slate-900/40">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/15
                      transition-all duration-300 border border-white/10 flex flex-col items-center text-center"
                  >
                    <div className="bg-gradient-to-br from-indigo-500 to-cyan-500 w-16 h-16 rounded-lg
                      flex items-center justify-center mb-6 text-white">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div id="testimonials" className="relative py-24">
            <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-white mb-6">
                  What Educators Say
                </h2>
                <p className="text-xl text-slate-300">
                  Hear from teachers and administrators who have transformed their teaching experience
                </p>
              </motion.div>
              
              <TestimonialSlider />
            </div>
          </div>

          {/* Pricing Section */}
          <div id="pricing" className="relative py-24 bg-slate-900/40">
            <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-white mb-6">
                  Choose Your Plan
                </h2>
                <p className="text-xl text-slate-300">
                  Flexible pricing options to meet your needs
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricingPlans.map((plan, index) => (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`
                      rounded-2xl p-8 border
                      ${plan.highlighted 
                        ? 'bg-gradient-to-br from-indigo-600 to-cyan-600 border-transparent' 
                        : 'bg-white/10 border-white/10'}
                    `}
                  >
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <div className="text-3xl font-bold text-white mb-4">
                      {plan.price}
                    </div>
                    <p className="text-slate-300 mb-6">
                      {plan.description}
                    </p>
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-slate-300">
                          <Check className="w-5 h-5 mr-2 text-emerald-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`
                        w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300
                        ${plan.highlighted
                          ? 'bg-white text-indigo-600 hover:bg-slate-100'
                          : 'bg-white/10 text-white hover:bg-white/20'}
                      `}
                    >
                      Get Started
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Technology Section */}
          <div id="technology" className="relative py-24">
            <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
              >
                <div>
                  <h2 className="text-4xl font-bold text-white mb-6">
                    Powered by Advanced AI Technology
                  </h2>
                  <p className="text-slate-300 mb-6">
                    Our platform leverages the latest advancements in artificial intelligence
                    and machine learning to provide:
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start text-slate-300">
                      <Check className="w-5 h-5 mr-2 mt-1 text-emerald-400" />
                      <span>Natural Language Processing for intelligent content generation and grading</span>
                    </li>
                    <li className="flex items-start text-slate-300">
                      <Check className="w-5 h-5 mr-2 mt-1 text-emerald-400" />
                      <span>Machine Learning algorithms that adapt to each student's learning pace</span>
                    </li>
                    <li className="flex items-start text-slate-300">
                      <Check className="w-5 h-5 mr-2 mt-1 text-emerald-400" />
                      <span>Real-time analytics and predictive modeling for student success</span>
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl p-1"
                  >
                    <div className="bg-slate-900 rounded-xl p-8">
                      <pre className="text-slate-300 text-sm">
                        <code>{`// Example AI Integration
const generateContent = async (topic) => {
  const ai = new AITeacher();
  const content = await ai.generate({
    subject: topic,
    difficulty: "adaptive",
    format: "interactive"
  });
  return content;
};`}</code>
                      </pre>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="relative py-24 bg-slate-900/40">
            <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-4xl font-bold text-white mb-2"
                  >
                    100+
                  </motion.div>
                  <p className="text-slate-400">Active Students</p>
                </div>
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="text-4xl font-bold text-white mb-2"
                  >
                    500+
                  </motion.div>
                  <p className="text-slate-400">Lessons Generated</p>
                </div>
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="text-4xl font-bold text-white mb-2"
                  >
                    24/7
                  </motion.div>
                  <p className="text-slate-400">AI Support</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="relative border-t border-white/10 py-8">
            <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center text-slate-400">
                <p>© 2024 AI Teaching Assistant. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

// Add these styles to your global CSS file
const globalStyles = `
  .text-shadow {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .text-shadow-lg {
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  }
`; 