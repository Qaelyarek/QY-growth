import React, { useState, useEffect } from 'react';
import Vapi from '@vapi-ai/web';
import { Phone, PhoneOff, Wand2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { env } from '../lib/env';
import { StarBorder } from './ui/star-border';

const vapi = new Vapi(env.VAPI_PUBLIC_KEY);

export function PhoneCall() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [volume, setVolume] = useState(0);
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    vapi.on('call-start', () => {
      setIsCallActive(true);
      setIsInitializing(false);
      toast.success('AI voice agent connected!');
    });

    vapi.on('call-end', () => {
      setIsCallActive(false);
      toast.info('Call ended');
    });

    vapi.on('volume-level', (level) => {
      setVolume(level);
    });

    vapi.on('error', (error) => {
      console.error('Vapi error:', error);
      toast.error('Call error occurred');
      setIsCallActive(false);
      setIsInitializing(false);
    });

    return () => {
      if (isCallActive) {
        vapi.stop();
      }
    };
  }, [isCallActive]);

  const startCall = async () => {
    try {
      setIsInitializing(true);
      await vapi.start(env.VAPI_ASSISTANT_ID);
    } catch (error) {
      console.error('Failed to start call:', error);
      toast.error('Failed to start call');
      setIsInitializing(false);
    }
  };

  const endCall = () => {
    vapi.stop();
  };

  const toggleCall = () => {
    if (isCallActive) {
      endCall();
    } else {
      startCall();
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Voice visualization */}
      <AnimatePresence>
        {isCallActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -top-32 w-72 h-72 rounded-full border border-white/10 flex items-center justify-center"
          >
            <div className="relative">
              {/* Ripple effect */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-[#39FF14]/20"
                  initial={{ width: 200, height: 200, opacity: 0, x: -100, y: -100 }}
                  animate={{
                    width: [200, 300],
                    height: [200, 300],
                    opacity: [0.5, 0],
                    x: [-100, -150],
                    y: [-100, -150],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}

              {/* Dynamic wave patterns based on volume */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex gap-1 h-6">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-[#39FF14]"
                      initial={{ height: 4 }}
                      animate={{
                        height: isCallActive ? 
                          Math.max(4, 40 * Math.sin((i / 12) * Math.PI) * volume) : 4,
                        opacity: isCallActive ? 0.7 : 0.3
                      }}
                      transition={{
                        duration: 0.2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.05
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Volume indicator */}
              <motion.div
                className="absolute inset-0 bg-[#39FF14]/5 rounded-full backdrop-blur-sm"
                animate={{
                  scale: 1 + volume * 0.3,
                }}
                transition={{
                  duration: 0.2,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main call button with StarBorder */}
      <StarBorder 
        variant={isCallActive ? "active" : "default"} 
        size="lg" 
        className={`
          rounded-full
          ${isCallActive 
            ? 'shadow-glow-white' 
            : 'shadow-glow-green'
          }
        `}
      >
        <motion.button
          onClick={toggleCall}
          disabled={isInitializing}
          className={`
            relative z-10 px-10 py-4 text-lg font-bold
            rounded-full transition-all duration-300
            inline-flex items-center space-x-3
            ${isCallActive 
              ? 'bg-black text-white hover:bg-black/80' 
              : isInitializing
                ? 'bg-gray-800 text-gray-400 cursor-wait'
                : 'bg-[#39FF14] text-black hover:bg-[#32CC11]'
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isCallActive ? (
            <PhoneOff className="w-6 h-6" />
          ) : isInitializing ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Wand2 className="w-6 h-6" />
            </motion.div>
          ) : (
            <Phone className="w-6 h-6" />
          )}
          <span>
            {isCallActive 
              ? 'End Call' 
              : isInitializing
                ? 'Connecting...'
                : 'Talk to AI Agent'
            }
          </span>
        </motion.button>
      </StarBorder>

      {/* Status text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 text-gray-400 text-sm"
      >
        {isCallActive 
          ? 'Call in progress - Speak naturally with our AI' 
          : isInitializing
            ? 'Establishing secure connection to AI voice system...'
            : 'Experience our AI voice technology with a click'}
      </motion.p>

      {isCallActive && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 bg-black/40 backdrop-blur-sm rounded-lg border border-[#39FF14]/20 max-w-md text-center"
        >
          <p className="text-[#39FF14] text-sm font-mono mb-2">LIVE VOICE AGENT</p>
          <p className="text-white text-sm">
            Our AI is listening and responding in real-time using advanced natural language processing technology.
          </p>
        </motion.div>
      )}
    </div>
  );
}