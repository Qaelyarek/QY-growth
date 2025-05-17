import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TextShimmerProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

export const TextShimmer: React.FC<TextShimmerProps> = ({ 
  children, 
  className = '', 
  duration = 1.5 
}) => {
  const shimmerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Force a repaint to ensure animation runs smoothly with widget
    if (shimmerRef.current) {
      const element = shimmerRef.current;
      requestAnimationFrame(() => {
        element.style.animationPlayState = 'running';
      });
    }
    
    return () => {
      if (shimmerRef.current) {
        shimmerRef.current.style.animationPlayState = 'paused';
      }
    };
  }, []);

  return (
    <motion.span
      ref={shimmerRef}
      className={`text-shimmer-effect relative inline-block z-10 ${className}`}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration,
        ease: "easeInOut"
      }}
      style={{
        background: 'linear-gradient(to right, var(--base-color), var(--base-gradient-color), var(--base-color))',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: `shimmer ${duration}s linear infinite`,
        willChange: 'background-position, opacity',
        isolation: 'isolate',
      }}
    >
      {children}
    </motion.span>
  );
};