import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface VoiceVisualizationProps {
  isActive: boolean;
  volume?: number;
}

export const VoiceVisualization: React.FC<VoiceVisualizationProps> = ({ 
  isActive,
  volume = 0.5
}) => {
  const bars = 12;
  const maxHeight = 40;

  return (
    <div className="flex items-center justify-center gap-1 h-12">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-[#39FF14] rounded-full"
          initial={{ height: 4 }}
          animate={{
            height: isActive ? Math.max(4, maxHeight * Math.sin((i / bars) * Math.PI) * volume) : 4,
            opacity: isActive ? 0.8 : 0.3
          }}
          transition={{
            duration: 0.2,
            repeat: isActive ? Infinity : 0,
            repeatType: "reverse",
            delay: i * 0.05
          }}
        />
      ))}
    </div>
  );
};