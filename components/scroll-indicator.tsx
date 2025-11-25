'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  targetSection?: string;
  className?: string;
}

export function ScrollIndicator({ targetSection = '#about', className }: ScrollIndicatorProps) {
  const shouldReduceMotion = useReducedMotion();

  const handleClick = () => {
    const element = document.querySelector(targetSection);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (shouldReduceMotion) {
    return (
      <button
        onClick={handleClick}
        className={`flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer ${className}`}
        aria-label="Scroll to next section"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown className="h-5 w-5" />
      </button>
    );
  }

  return (
    <motion.button
      onClick={handleClick}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className={`flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer ${className}`}
      aria-label="Scroll to next section"
    >
      <span className="text-xs uppercase tracking-widest">Scroll</span>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <ChevronDown className="h-5 w-5" />
      </motion.div>
      <motion.div
        className="w-px h-12 bg-gradient-to-b from-foreground/50 to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        style={{ originY: 0 }}
      />
    </motion.button>
  );
}
