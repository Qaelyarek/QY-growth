import React, { useState } from 'react';
import { Terminal, ArrowRight, Phone, Calendar, MessageSquare, ShieldCheck, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TypewriterLogo } from '../components/ui/typewriter-logo';
import { VoiceAssistant } from '../components/VoiceAssistant';
import { isElevenLabsConfigured } from '../lib/env';
import { toast } from 'react-hot-toast';
import qyLogo from '/assets/White-QY-logo.png';

export default function ConsultationForm() {
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
        <div className="mb-10 text-center">
          <div className="inline-block bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-full px-4 py-1 mb-4">
            <span className="text-[#39FF14] text-sm font-semibold">AI Voice Agent</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">
            Experience Our Voice AI Technology
          </h1>
          <p className="text-gray-300 mt-3 max-w-2xl mx-auto">
            Speak directly with our advanced AI Voice Agent to learn about our services or book a demonstration
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-white/10 order-2 md:order-1">
            <h2 className="text-xl font-bold mb-6 text-[#39FF14]">Voice AI Solutions:</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="mt-1 mr-4 bg-[#39FF14]/10 p-2 rounded-lg">
                  <Phone className="w-6 h-6 text-[#39FF14]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Inbound & Outbound Calls</h3>
                  <p className="text-gray-300 text-sm mt-1">Our voice AI handles incoming calls and makes outbound calls with natural-sounding voice that maintains context across conversations.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 mr-4 bg-[#39FF14]/10 p-2 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-[#39FF14]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">SMS & Chat Integration</h3>
                  <p className="text-gray-300 text-sm mt-1">The same AI brain powers SMS conversations and website chat, creating a seamless customer experience across all communication channels.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 mr-4 bg-[#39FF14]/10 p-2 rounded-lg">
                  <Calendar className="w-6 h-6 text-[#39FF14]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Scheduling & Follow-ups</h3>
                  <p className="text-gray-300 text-sm mt-1">Our voice AI can automatically book appointments, send reminders, and handle follow-up communications without human intervention.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 mr-4 bg-[#39FF14]/10 p-2 rounded-lg">
                  <ShieldCheck className="w-6 h-6 text-[#39FF14]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">24/7 Availability</h3>
                  <p className="text-gray-300 text-sm mt-1">Never miss a customer inquiry with round-the-clock voice AI that maintains consistent quality and brand voice at all hours.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-blue-400 mb-2">Voice AI Implementation:</h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• Quick setup with your existing phone system</li>
                <li>• Custom voice and personality options</li>
                <li>• Knowledge base integration</li>
                <li>• CRM and calendar connectivity</li>
                <li>• Continuous learning and improvement</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-white/10 order-1 md:order-2">
            <div className="text-center bg-black/40 p-8 rounded-lg border border-[#39FF14]/20 shadow-[0_0_20px_rgba(57,255,20,0.1)]">
              <Mic className="w-20 h-20 mx-auto text-[#39FF14] mb-6" />
              
              <h2 className="text-2xl font-bold mb-4">Speak with Our Voice AI</h2>
              <p className="text-gray-300 mb-8">
                Experience our advanced voice technology firsthand by starting a conversation now
              </p>
              
              <button 
                onClick={activateVoiceAssistant}
                className="bg-[#39FF14] text-black px-6 py-4 text-lg font-semibold rounded hover:bg-[#32CC11] transition-all flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(57,255,20,0.3)] pulsating-button w-full"
              >
                <Mic className="w-5 h-5" />
                <span>Start Voice Conversation</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="text-center mt-6">
                <p className="text-gray-400 text-sm">
                  Ask about our voice technology, pricing, or implementation details through a natural conversation.
                </p>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-semibold text-white mb-3">Common Voice AI Applications:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/30 border border-white/5 p-3 rounded-lg text-center">
                  <span className="text-sm text-gray-300">Customer Service</span>
                </div>
                <div className="bg-black/30 border border-white/5 p-3 rounded-lg text-center">
                  <span className="text-sm text-gray-300">Lead Qualification</span>
                </div>
                <div className="bg-black/30 border border-white/5 p-3 rounded-lg text-center">
                  <span className="text-sm text-gray-300">Appointment Booking</span>
                </div>
                <div className="bg-black/30 border border-white/5 p-3 rounded-lg text-center">
                  <span className="text-sm text-gray-300">Outbound Sales</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-black/20 rounded-lg">
                <p className="text-gray-400 text-sm italic">
                  "The voice AI technology you're experiencing now can be customized for your specific business needs and integrated with your existing systems."
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <button 
            onClick={activateVoiceAssistant}
            className="bg-[#39FF14] text-black px-8 py-4 text-lg font-semibold rounded hover:bg-[#32CC11] transition-all inline-flex items-center space-x-2 shadow-[0_0_15px_rgba(57,255,20,0.3)] pulsating-button"
          >
            <Mic className="w-5 h-5" />
            <span>Try Our Voice AI Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-sm text-gray-400 mt-4">
            Experience the future of business communication with our premium voice technology.
          </p>
        </div>
      </div>
      
      {isVoiceActive && <VoiceAssistant onClose={() => setIsVoiceActive(false)} />}
    </div>
  );
}