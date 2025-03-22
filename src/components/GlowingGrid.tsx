import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function GlowingGrid() {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);
  
  // Create a 6x6 grid
  const gridSize = 6;
  const cells = Array.from({ length: gridSize * gridSize }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="grid grid-cols-6 gap-4 p-4 pointer-events-auto"
          style={{ perspective: '1000px' }}
        >
          {cells.map((i) => (
            <motion.div
              key={i}
              className="w-16 h-16 rounded-lg bg-white/5 backdrop-blur-sm 
                border border-white/10 cursor-pointer transition-colors duration-200"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotateX: hoveredCell === i ? 10 : 0,
                rotateY: hoveredCell === i ? 10 : 0,
              }}
              transition={{ 
                duration: 0.3,
                delay: i * 0.02 
              }}
              onHoverStart={() => setHoveredCell(i)}
              onHoverEnd={() => setHoveredCell(null)}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-lg"
                animate={{
                  boxShadow: hoveredCell === i
                    ? '0 0 20px rgba(6, 182, 212, 0.5), inset 0 0 20px rgba(6, 182, 212, 0.5)'
                    : '0 0 0px rgba(6, 182, 212, 0), inset 0 0 0px rgba(6, 182, 212, 0)',
                  backgroundColor: hoveredCell === i
                    ? 'rgba(6, 182, 212, 0.1)'
                    : 'rgba(6, 182, 212, 0)',
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Inner Grid Lines */}
              <div className="absolute inset-0 grid grid-cols-2 gap-[1px] opacity-50">
                <div className="bg-white/5" />
                <div className="bg-white/5" />
                <div className="bg-white/5" />
                <div className="bg-white/5" />
              </div>

              {/* Animated Dots */}
              {hoveredCell === i && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="w-1 h-1 bg-cyan-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 