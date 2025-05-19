import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Bot, Terminal, ArrowRight, Phone, MessageSquare, Headphones, ChevronRight, Mic, Shield, Clock, Zap, Layers } from 'lucide-react';
import ConsultationForm from './pages/ConsultationForm';
import Schedule from './pages/Schedule';
import { TypewriterLogo } from './components/ui/typewriter-logo';
import { BackgroundPaths } from './components/ui/background-paths';
import { VoiceAssistant } from './components/VoiceAssistant';
import { PhoneCall } from './components/PhoneCall';
import { toast } from 'react-hot-toast';
import { isElevenLabsConfigured } from './lib/env';
import qyLogo from '/assets/White-QY-logo.png';
import igLogo from '/assets/IG logo.png';
import xLogo from '/assets/X logo.png';

function Home() {
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const activateVoiceAssistant = () => {
    if (!isElevenLabsConfigured()) {
      toast.warning('ElevenLabs API key is not set. Voice will use browser capabilities instead.');
    }
    setIsVoiceActive(true);
  };

  useEffect(() => {
    const handleActivateVoice = () => {
      activateVoiceAssistant();
    };
    
    document.addEventListener('activateVoiceAssistant', handleActivateVoice);
    
    return () => {
      document.removeEventListener('activateVoiceAssistant', handleActivateVoice);
    };
  }, []);

  return (
    <div className="min-h-screen text-white font-mono">
      <div className="hero-background">
        <spline-viewer url="https://prod.spline.design/JTqDqOQMs-u4Wghn/scene.splinecode"></spline-viewer>
      </div>

      <div className="content-wrapper">
        <nav className="nav-layer py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 w-full">
              <div className="flex items-center justify-between">
                <a href="/" className="flex items-center space-x-2">
                  <img src={qyLogo} alt="QY Growth Logo" className="h-8 w-auto" />
                  <Terminal className="w-8 h-8 text-white" />
                  <TypewriterLogo text="QY-Growth A.I. Systems..." />
                </a>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="text-blue-400 text-sm bg-gray-900/50 px-3 py-1.5 rounded-full text-center">
                  AI VOICE AGENT TESTING
                </span>
                <button 
                  onClick={activateVoiceAssistant}
                  className="border border-[#39FF14]/30 hover:border-[#39FF14] hover:bg-[#39FF14]/10 px-4 py-2 transition-all hover-underline w-full sm:w-auto text-center pulsating-button flex items-center justify-center gap-2"
                >
                  <Mic className="w-5 h-5 text-[#39FF14]" />
                  <span>Speak to AI Now</span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="content-layer">
          <div className="hero-section px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto bg-black/30 backdrop-blur-sm p-8 rounded-lg">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                Test Our Voice-Powered AI System
              </h1>
              <p className="text-xl text-blue-200 mb-8 bg-black/20">
                Experience our premium AI voice technology for inbound calls, outbound calls, SMS, and chat
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <PhoneCall />
                <button
                  onClick={activateVoiceAssistant}
                  className="bg-[#39FF14] text-black px-8 py-4 text-lg font-semibold hover:bg-[#32CC11] transition-all inline-flex items-center space-x-2 rounded shadow-[0_0_10px_rgba(57,255,20,0.5)] pulsating-button"
                >
                  <Mic className="w-6 h-6" />
                  <span>Try Voice AI Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 tracking-tight">AI Voice Solutions</h2>
                <p className="text-blue-400">Interact with our voice technology and experience the future of business communication</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Phone className="w-8 h-8" />,
                    title: 'Inbound Voice AI',
                    description: 'Our AI-powered voice system answers calls 24/7, understands customer inquiries, and provides immediate assistance without human intervention.',
                    feature: 'Features: 24/7 Response | Natural Voice | Call Routing'
                  },
                  {
                    icon: <Headphones className="w-8 h-8" />,
                    title: 'Outbound Voice AI',
                    description: 'Proactive voice campaigns that initiate personalized calls, follow up with leads, and deliver your sales message with perfect consistency.',
                    feature: 'Features: Campaign Management | Lead Qualification | Appointment Setting'
                  },
                  {
                    icon: <MessageSquare className="w-8 h-8" />,
                    title: 'Multi-Channel AI',
                    description: 'Our voice technology extends to SMS and chat, creating a unified communication experience that remembers context across all channels.',
                    feature: 'Features: SMS | Website Chat | Email Follow-ups'
                  }
                ].map((feature, index) => (
                  <div key={index} className="card-gradient p-6 rounded-lg">
                    <div className="card-content">
                      <div className="mb-4 flex justify-center">{feature.icon}</div>
                      <h3 className="text-xl font-semibold mb-2 tracking-tight">{feature.title}</h3>
                      <p className="text-gray-300 mb-4">{feature.description}</p>
                      <span className="text-emerald-400 text-sm">{feature.feature}</span>
                      <div className="mt-6">
                        <button
                          onClick={activateVoiceAssistant}
                          className="inline-flex items-center text-[#39FF14] hover:text-[#32CC11] transition-all"
                        >
                          <Mic className="w-4 h-4 mr-1" />
                          <span>Try this feature</span>
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-black/50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 tracking-tight">Try Our Voice AI Now</h2>
                <p className="text-emerald-400">Simple 3-step process to experience our AI voice technology</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    step: '01',
                    title: 'Activate Voice AI',
                    description: 'Click any "Speak to AI" button on this page to activate our voice assistant instantly.',
                  },
                  {
                    step: '02',
                    title: 'Start Speaking',
                    description: 'When prompted, speak naturally about your business needs or ask questions about our voice technology.',
                  },
                  {
                    step: '03',
                    title: 'Get Voice Responses',
                    description: 'Experience our natural-sounding AI voice responses and see how this technology can transform your business.',
                  }
                ].map((step, index) => (
                  <div key={index} className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/10 relative overflow-hidden group">
                    <div className="absolute -top-2 -left-2 w-16 h-16 bg-[#39FF14] text-black flex items-center justify-center text-2xl font-bold rounded-br-lg z-10">
                      {step.step}
                    </div>
                    <div className="pt-10">
                      <h3 className="text-xl font-semibold mb-3 tracking-tight">{step.title}</h3>
                      <p className="text-gray-300 mb-4">{step.description}</p>
                      {index === 0 && (
                        <button
                          onClick={activateVoiceAssistant}
                          className="inline-flex items-center text-[#39FF14] hover:text-[#32CC11] transition-all text-sm"
                        >
                          <Mic className="w-4 h-4 mr-1" />
                          <span>Activate now</span>
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-[#39FF14] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 tracking-tight">Voice AI Capabilities</h2>
                <p className="text-blue-400 mb-8">Discover what our AI voice technology can do for your business</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: <Mic className="w-8 h-8" />,
                    title: 'Natural Conversations',
                    description: 'Our voice technology speaks naturally with accurate language comprehension, proper cadence, and context awareness.',
                  },
                  {
                    icon: <Layers className="w-8 h-8" />,
                    title: 'Multi-Turn Dialogue',
                    description: 'Maintains conversation history, remembers previous answers, and handles complex multi-turn dialogues.',
                  },
                  {
                    icon: <Shield className="w-8 h-8" />,
                    title: 'Custom Voice Identity',
                    description: 'Personalize the voice, tone, and personality to perfectly match your brand identity and customer expectations.',
                  },
                  {
                    icon: <Zap className="w-8 h-8" />,
                    title: 'Seamless Integration',
                    description: 'Integrates with your existing phone system, website, CRM, calendars, and business tools for complete automation.',
                  }
                ].map((feature, index) => (
                  <div key={index} className="animated-card p-6 rounded-lg">
                    <div className="card-content">
                      <div className="mb-4 flex justify-center">{feature.icon}</div>
                      <h3 className="text-xl font-semibold mb-2 tracking-tight">{feature.title}</h3>
                      <p className="text-gray-200">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-7xl mx-auto text-center">
              <div className="mb-8">
                <span className="inline-block bg-[#39FF14]/10 border border-[#39FF14]/30 px-4 py-2 rounded-full text-sm font-semibold mb-4 text-[#39FF14]">
                  PREMIUM AI TECHNOLOGY
                </span>
                <h2 className="text-3xl font-bold mb-4 tracking-tight">Experience Our Voice AI Technology Today</h2>
                <p className="text-amber-400 mb-2">Speak directly with our AI to see how it can transform your business communication</p>
              </div>
              <p className="text-gray-300 mb-12 max-w-2xl mx-auto">
                Our voice AI technology can handle inbound calls, make outbound calls, send SMS messages, and chat with customers on your website - 
                all with the same natural conversation capabilities you're experiencing now.
              </p>
              <div className="glow-effect inline-block">
                <button
                  onClick={activateVoiceAssistant}
                  className="bg-[#39FF14] text-black px-8 py-4 text-lg font-semibold hover:bg-[#32CC11] transition-all flex items-center space-x-2 rounded shadow-[0_0_15px_rgba(57,255,20,0.5)] pulsating-button"
                >
                  <Mic className="w-6 h-6" />
                  <span>Speak to Voice AI Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </section>

          <section className="py-12 px-4 sm:px-6 lg:px-8 relative z-10 bg-black">
            <BackgroundPaths 
              title="Try Our Voice AI Technology" 
              subtitle="Speak with our voice assistant to experience how it can transform your business communications and customer interactions."
              buttonText="Speak to AI Now"
              footerText="The same technology can power your phone system, SMS, and chat"
            />
          </section>

          <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
            <div className="max-w-7xl mx-auto flex justify-center space-x-6">
              <a 
                href="https://www.instagram.com/s/aGlnaGxpZ2h0OjE3ODQ4MDIxMzA4NDEwNTcx?story_media_id=3573087260050460820&igsh=eDR5Z2t0bms4ZHo="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img 
                  src={igLogo}
                  alt="Follow us on Instagram" 
                  className="w-8 h-8"
                />
              </a>
              <a 
                href="https://x.com/QYgrowth"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img 
                  src={xLogo}
                  alt="Follow us on X" 
                  className="w-8 h-8"
                />
              </a>
            </div>
          </footer>
        </main>
      </div>

      {isVoiceActive && <VoiceAssistant onClose={() => setIsVoiceActive(false)} />}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/consultation" element={<ConsultationForm />} />
      <Route path="/schedule" element={<Schedule />} />
    </Routes>
  );
}

export default App;