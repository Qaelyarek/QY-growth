import React, { useState } from 'react';
import { Terminal, Phone, Calendar, Clock, User, Check, Mic, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TypewriterLogo } from '../components/ui/typewriter-logo';
import { VoiceAssistant } from '../components/VoiceAssistant';
import { isElevenLabsConfigured } from '../lib/env';
import { toast } from 'react-hot-toast';
import qyLogo from '/assets/White-QY-logo.png';

export default function Schedule() {
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const activateVoiceAssistant = () => {
    // Check if ElevenLabs API key is set
    if (!isElevenLabsConfigured()) {
      toast.warning('ElevenLabs API key is not set. Voice will use browser capabilities instead.');
    }
    
    // Use our custom component
    setIsVoiceActive(true);
  };

  return (
    <div className="min-h-screen text-white font-mono">
      <div className="hero-background" style={{ opacity: 0.4 }}>
        <spline-viewer url="https://prod.spline.design/JTqDqOQMs-u4Wghn/scene.splinecode"></spline-viewer>
      </div>
      
      <nav className="fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-md border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="flex items-center space-x-2">
            <img src={qyLogo} alt="QY Growth Logo" className="h-8 w-auto" />
            <Terminal className="w-8 h-8 text-white" />
            <TypewriterLogo text="QY-Growth A.I. Systems..." />
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
        <div className="mb-8 text-center">
          <div className="inline-block bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-full px-4 py-1 mb-4">
            <span className="text-[#39FF14] text-sm font-semibold">AI Voice Assistant</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Talk With Our Voice AI Now
          </h1>
          <p className="text-gray-300 mt-3 max-w-2xl mx-auto">
            Experience our Voice AI technology firsthand - ask questions, get information, or schedule a demo call
          </p>
        </div>
        
        <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
          <div className="grid md:grid-cols-5">
            <div className="md:col-span-2 bg-black/50 p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-[#39FF14]" />
                Voice AI Features:
              </h2>
              
              <div className="space-y-4 mb-8">
                {[
                  { icon: <Calendar className="w-4 h-4 text-[#39FF14]" />, text: "Handles inbound & outbound calls" },
                  { icon: <User className="w-4 h-4 text-[#39FF14]" />, text: "Conducts natural conversations" },
                  { icon: <Check className="w-4 h-4 text-[#39FF14]" />, text: "Qualifies leads & books appointments" },
                  { icon: <Clock className="w-4 h-4 text-[#39FF14]" />, text: "Works 24/7 without fatigue" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <div className="mt-1 mr-3">{item.icon}</div>
                    <p className="text-gray-300">{item.text}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h3 className="font-semibold text-blue-400 mb-2">Try It Yourself:</h3>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• Ask about our Voice AI technology</li>
                  <li>• Request pricing information</li>
                  <li>• Schedule a demo for your business</li>
                  <li>• Learn about implementation timeframes</li>
                  <li>• Experience realistic voice conversations</li>
                </ul>
              </div>
              
              <div className="mt-8">
                <button
                  onClick={activateVoiceAssistant}
                  className="bg-[#39FF14] text-black px-6 py-4 w-full text-lg font-semibold rounded hover:bg-[#32CC11] transition-all flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(57,255,20,0.3)] pulsating-button"
                >
                  <Mic className="w-5 h-5" />
                  <span>Speak to Voice AI</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="md:col-span-3 p-8 flex flex-col justify-center items-center">
              <div className="text-center max-w-md">
                <div className="mb-8">
                  <Mic className="w-24 h-24 mx-auto text-[#39FF14] mb-6 opacity-75" />
                  <h2 className="text-2xl font-bold mb-4">Experience Our Premium Voice Technology</h2>
                  <p className="text-gray-300 mb-6">
                    Our Voice AI technology provides natural conversations across phone calls, SMS, and chat - using the same powerful AI brain in all channels.
                  </p>
                </div>
                
                <button
                  onClick={activateVoiceAssistant}
                  className="bg-[#39FF14] text-black px-8 py-5 w-full text-xl font-semibold rounded-lg hover:bg-[#32CC11] transition-all flex items-center justify-center space-x-3 shadow-[0_0_20px_rgba(57,255,20,0.4)] pulsating-button"
                >
                  <Mic className="w-6 h-6" />
                  <span>Activate Voice AI</span>
                </button>
                
                <p className="text-gray-400 text-sm mt-6">
                  Experience the same voice technology that's transforming business communications
                </p>
              </div>
              
              <div className="mt-16 w-full">
                <h3 className="text-lg font-semibold mb-4 text-center">Business Benefits:</h3>
                <div className="bg-black/30 border border-white/10 rounded-lg p-4">
                  <p className="text-gray-300">
                    "Our Voice AI technology provides businesses with 24/7 customer service, consistent sales messaging, and perfect call handling - all without the high costs of staffing a call center. The system gets smarter with every conversation."
                  </p>
                  <p className="text-right text-[#39FF14] text-sm mt-2">— QYGrowth Voice AI Team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-400">
            Our advanced voice technology can be customized for your specific business needs and voice requirements.
          </p>
        </div>
      </div>
      
      {isVoiceActive && <VoiceAssistant onClose={() => setIsVoiceActive(false)} />}
    </div>
  );
}