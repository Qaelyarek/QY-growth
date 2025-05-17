import React, { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

interface TypewriterLogoProps {
  text?: string;
  className?: string;
  typingDelay?: number;
  pauseDelay?: number;
  cursorBlinkRate?: number;
}

export const TypewriterLogo: React.FC<TypewriterLogoProps> = ({
  text = 'QY-Growth A.I. Systems...',
  className = '',
  typingDelay = 200,
  pauseDelay = 2000,
  cursorBlinkRate = 700
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const textElement = textRef.current;
    const cursorElement = cursorRef.current;
    
    if (!textElement || !cursorElement) return;
    
    let currentIndex = 0;
    let isDeleting = false;
    let timeoutId: number;

    const type = () => {
      // Get the current text to display
      const currentText = isDeleting 
        ? text.substring(0, currentIndex - 1)
        : text.substring(0, currentIndex + 1);
      
      // Update the text content
      textElement.textContent = currentText;
      
      // Update the index
      if (isDeleting) {
        currentIndex--;
      } else {
        currentIndex++;
      }
      
      // Determine what to do next based on current state
      if (!isDeleting && currentIndex === text.length) {
        // Text is complete, pause before deleting
        isDeleting = false;
        timeoutId = window.setTimeout(type, pauseDelay);
      } else if (isDeleting && currentIndex === 0) {
        // Text is fully deleted, start typing again
        isDeleting = false;
        timeoutId = window.setTimeout(type, typingDelay);
      } else {
        // Continue typing or deleting
        timeoutId = window.setTimeout(type, typingDelay);
      }
    };
    
    // Start the typing animation
    timeoutId = window.setTimeout(type, typingDelay);
    
    // Setup cursor blinking
    const cursorInterval = setInterval(() => {
      if (cursorElement) {
        cursorElement.style.opacity = cursorElement.style.opacity === '0' ? '1' : '0';
      }
    }, cursorBlinkRate);
    
    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      clearInterval(cursorInterval);
    };
  }, [text, typingDelay, pauseDelay, cursorBlinkRate]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "typewriter-logo-container relative font-semibold text-xl inline-flex items-center",
        className
      )}
    >
      <span 
        ref={textRef}
        className="typewriter-text whitespace-nowrap text-white"
      ></span>
      <span 
        ref={cursorRef}
        className="typewriter-cursor text-[#39FF14] ml-0.5"
      >|</span>
    </div>
  );
};