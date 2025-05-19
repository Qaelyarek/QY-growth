import React from 'react';
import { motion } from 'framer-motion';

interface CallVisualizationProps {
  isActive: boolean;
  volume: number;
}

export const CallVisualization: React.FC<CallVisualizationProps> = ({ isActive, volume }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Ripple effect */}
      {isActive && [...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-white/20"
          initial={{ width: '100%', height: '100%', opacity: 0 }}
          animate={{
            width: ['100%', '150%'],
            height: ['100%', '150%'],
            opacity: [0.5, 0],
            scale: [1, 1.5]
          }}
          transition={{
            duration: 2,
            delay: i * 0.4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Volume indicator */}
      <motion.div
        className="absolute inset-0 bg-white/5 rounded-full backdrop-blur-sm"
        animate={{
          scale: 1 + volume * 0.3,
        }}
        transition={{
          duration: 0.2,
        }}
      />
    </div>
  );
};