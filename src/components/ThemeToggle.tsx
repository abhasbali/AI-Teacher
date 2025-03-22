import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      className={`relative rounded-full p-2 w-16 h-8 flex items-center ${
        isDark ? 'bg-slate-700' : 'bg-cyan-200'
      }`}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`absolute left-1 w-6 h-6 rounded-full flex items-center justify-center ${
          isDark ? 'bg-slate-900' : 'bg-white'
        }`}
        animate={{ x: isDark ? 32 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-cyan-400" />
        ) : (
          <Sun className="w-4 h-4 text-yellow-500" />
        )}
      </motion.div>
    </motion.button>
  );
} 