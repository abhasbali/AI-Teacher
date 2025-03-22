import React from 'react';
import { motion } from 'framer-motion';

const CircuitBoardBackground = () => {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      style={{
        y: scrollY * 0.2 // Subtle parallax effect
      }}
    >
      {/* ... rest of the background code ... */}
    </motion.div>
  );
};

export default CircuitBoardBackground; 