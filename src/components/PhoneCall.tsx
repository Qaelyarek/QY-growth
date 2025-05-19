import React, { useState, useEffect } from 'react';
import Vapi from '@vapi-ai/web';
import { Phone, PhoneOff } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const vapi = new Vapi('59daf631-d47d-4697-8ad5-ba84ec36eaa7');

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
      await vapi.start('d7f2e641-d690-412d-b8b0-db973ff0d937');
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
    <div className="relative">
      <AnimatePresence>
        {isCallActive && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -inset-4 bg-gradient-to-r from-[#39FF14]/20 to-blue-500/20 blur-xl rounded-full"
            style={{
              transform: `scale(${1 + volume * 0.5})`,
            }}
          />
        )}
      </AnimatePresence>
      
      <motion.button
        onClick={toggleCall}
        className={`
          relative z-10
          ${isCallActive 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-[#39FF14] hover:bg-[#32CC11]'
          }
          text-black px-8 py-4 text-lg font-semibold 
          transition-all inline-flex items-center space-x-2 
          rounded shadow-[0_0_15px_rgba(57,255,20,0.3)]
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isCallActive ? {
          boxShadow: [
            '0 0 15px rgba(57,255,20,0.3)',
            '0 0 30px rgba(57,255,20,0.5)',
            '0 0 15px rgba(57,255,20,0.3)'
          ]
        } : {}}
        transition={{ duration: 1, repeat: isCallActive ? Infinity : 0 }}
      >
        <motion.div
          animate={isCallActive ? {
            rotate: [0, 15, -15, 0]
          } : {}}
          transition={{ duration: 0.5, repeat: isCallActive ? Infinity : 0 }}
        >
          {isCallActive ? (
            <PhoneOff className="w-6 h-6" />
          ) : (
            <Phone className="w-6 h-6" />
          )}
        </motion.div>
        <span>{isCallActive ? 'End Call' : 'Call AI Agent'}</span>
      </motion.button>
    </div>
  );
}