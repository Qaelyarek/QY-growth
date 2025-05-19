import React, { useState, useEffect } from 'react';
import Vapi from '@vapi-ai/web';
import { Phone, PhoneOff } from 'lucide-react';
import { toast } from 'react-hot-toast';

const vapi = new Vapi('59daf631-d47d-4697-8ad5-ba84ec36eaa7');

export function PhoneCall() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    vapi.on('call-start', () => {
      setIsCallActive(true);
      toast.success('Call connected!');
    });

    vapi.on('call-end', () => {
      setIsCallActive(false);
      toast.info('Call ended');
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
    <button
      onClick={toggleCall}
      className={`
        ${isCallActive 
          ? 'bg-red-500 hover:bg-red-600' 
          : 'bg-[#39FF14] hover:bg-[#32CC11]'
        }
        text-black px-8 py-4 text-lg font-semibold 
        transition-all inline-flex items-center space-x-2 
        rounded shadow-[0_0_15px_rgba(57,255,20,0.3)] 
        pulsating-button
      `}
    >
      {isCallActive ? (
        <>
          <PhoneOff className="w-6 h-6" />
          <span>End Call</span>
        </>
      ) : (
        <>
          <Phone className="w-6 h-6" />
          <span>Call AI Agent</span>
        </>
      )}
    </button>
  );
}