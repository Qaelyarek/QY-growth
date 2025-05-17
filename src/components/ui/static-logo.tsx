import React from 'react';
import { cn } from '../../lib/utils';

interface StaticLogoProps {
  text?: string;
  className?: string;
}

export const StaticLogo: React.FC<StaticLogoProps> = ({ 
  text = 'QYGrowth', 
  className = '' 
}) => {
  return (
    <div 
      className={cn(
        "static-logo-container relative font-semibold text-xl",
        className
      )}
    >
      {/* Base layer for the text */}
      <span className="static-logo-base">{text}</span>
      
      {/* Glow layer that sits on top */}
      <span className="static-logo-glow absolute inset-0">{text}</span>
    </div>
  );
};