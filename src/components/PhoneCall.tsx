import React, { useState, useEffect } from 'react';
import Vapi from '@vapi-ai/web';
import { Phone, PhoneOff } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { env } from '../lib/env';

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
      {/* Floating phone animation when not in call */}
      <AnimatePresence>
        {!isCallActive && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [-10, 0, -10] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-16"
          >
            <motion.div
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-[#39FF14]/10 p-4 rounded-full backdrop-blur-sm"
            >
              <Phone className="w-8 h-8 text-[#39FF14]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call activity visualization */}
      <AnimatePresence>
        {isCallActive && (
          <>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -inset-8 bg-gradient-to-r from-[#39FF14]/20 to-blue-500/20 blur-xl rounded-full"
              style={{
                transform: `scale(${1 + volume * 0.5})`,
              }}
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -inset-4 bg-red-500/20 blur-lg rounded-full"
            />
          </>
        )}
      </AnimatePresence>

      {/* Main call button */}
      <motion.button
        onClick={toggleCall}
        className={`
          relative z-10 px-8 py-4 text-lg font-semibold
          rounded-full transition-colors duration-300
          inline-flex items-center space-x-3
          ${isCallActive 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-[#39FF14] hover:bg-[#32CC11] text-black'
          }
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isCallActive ? {
          boxShadow: [
            '0 0 20px rgba(239,68,68,0.3)',
            '0 0 40px rgba(239,68,68,0.5)',
            '0 0 20px rgba(239,68,68,0.3)'
          ]
        } : {
          boxShadow: [
            '0 0 20px rgba(57,255,20,0.3)',
            '0 0 40px rgba(57,255,20,0.5)',
            '0 0 20px rgba(57,255,20,0.3)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          animate={!isCallActive ? {
            rotate: [0, 15, -15, 0]
          } : {}}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
        >
          {isCallActive ? (
            <PhoneOff className="w-6 h-6" />
          ) : (
            <Phone className="w-6 h-6" />
          )}
        </motion.div>
        <span className="font-semibold">
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