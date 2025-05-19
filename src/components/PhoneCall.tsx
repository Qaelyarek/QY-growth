import React, { useState, useEffect } from 'react';
import Vapi from '@vapi-ai/web';
import { Phone, PhoneOff } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { env } from '../lib/env';
import { CallVisualization } from './ui/call-visualization';

const vapi = new Vapi(env.VAPI_PUBLIC_KEY);

export function PhoneCall() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    vapi.on('call-start', () => {
      setIsCallActive(true);
      toast.success('Call connected!');
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
    });

    return () => {
      if (isCallActive) {
        vapi.stop();
      }
    };
  }, []);

  const startCall = async () => {
    try {
      await vapi.start(env.VAPI_ASSISTANT_ID);
    } catch (error) {
      console.error('Failed to start call:', error);
      toast.error('Failed to start call');
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
          >
            <CallVisualization isActive={isCallActive} volume={volume} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main call button */}
      <motion.button
        onClick={toggleCall}
        className={`
          relative z-10 px-8 py-4 text-lg font-semibold
          rounded-full transition-all duration-300
          inline-flex items-center space-x-3
          border-2
          ${isCallActive 
            ? 'bg-black border-white/50 text-white hover:border-white' 
            : 'bg-white border-black text-black hover:bg-black hover:text-white'
          }
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isCallActive ? (
          <PhoneOff className="w-6 h-6" />
        ) : (
          <Phone className="w-6 h-6" />
        )}
        <span>
          {isCallActive ? 'End Call' : 'Call AI Agent'}
        </span>
      </motion.button>

      {/* Status text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 text-gray-400 text-sm"
      >
        {isCallActive 
          ? 'Call in progress - Speak naturally with our AI' 
          : 'Click to start a conversation with our AI Agent'}
      </motion.p>
    </div>
  );
}