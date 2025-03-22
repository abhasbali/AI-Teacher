import React from 'react';
import { motion } from 'framer-motion';

export function Logo() {
  return (
    <motion.div 
      className="flex items-center gap-2 select-none"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* AI Brain Icon */}
      <motion.div
        className="relative w-10 h-10"
        whileHover={{ scale: 1.05 }}
      >
        {/* Outer Circle */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Inner Circle */}
        <motion.div 
          className="absolute inset-1 rounded-full bg-slate-900 flex items-center justify-center"
        >
          {/* Neural Network Lines */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-[1px] bg-gradient-to-r from-cyan-500 to-blue-500"
              style={{
                transform: `rotate(${i * 60}deg)`,
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
          
          {/* Pulsing Center Point */}
          <motion.div
            className="w-2 h-2 rounded-full bg-cyan-500"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>
      </motion.div>

      {/* Text */}
      <motion.div 
        className="flex flex-col"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.span 
          className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          EduAssist
        </motion.span>
        <motion.span 
          className="text-sm text-slate-400 -mt-1"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          AI Teaching Assistant
        </motion.span>
      </motion.div>

      {/* Floating Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-cyan-500/30"
          style={{
            left: `${Math.random() * 40}px`,
            top: `${Math.random() * 40}px`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.div>
  );
} 