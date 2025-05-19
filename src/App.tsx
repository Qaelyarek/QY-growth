import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Bot, Terminal, Mic } from 'lucide-react';
import ConsultationForm from './pages/ConsultationForm';
import Schedule from './pages/Schedule';
import { TypewriterLogo } from './components/ui/typewriter-logo';
import { PhoneCall } from './components/PhoneCall';
import qyLogo from '/assets/White-QY-logo.png';
import igLogo from '/assets/IG logo.png';
import xLogo from '/assets/X logo.png';

function Home() {
  return (
    <div className="min-h-screen text-white font-mono">
      <div className="hero-background">
        <spline-viewer url="https://prod.spline.design/JTqDqOQMs-u4Wghn/scene.splinecode"></spline-viewer>
      </div>

      <div className="content-wrapper">
        <nav className="nav-layer py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center space-x-2">
                <img src={qyLogo} alt="QY Growth Logo" className="h-8 w-auto" />
                <Terminal className="w-8 h-8 text-white" />
                <TypewriterLogo text="QY-Growth A.I. Systems..." />
              </a>
              <button 
                onClick={() => {
                  const voiceActivateEvent = new CustomEvent('activateVoiceAssistant');
                  document.dispatchEvent(voiceActivateEvent);
                }}
                className="relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#39FF14] via-blue-500 to-[#39FF14] opacity-75 group-hover:opacity-100 blur-xl transition-opacity duration-500 animate-pulse"></div>
                <div className="relative bg-[#39FF14] hover:bg-[#32CC11] text-black px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:shadow-[0_0_25px_rgba(57,255,20,0.5)]">
                  <Mic className="w-5 h-5" />
                  <span className="font-semibold">Speak to AI</span>
                </div>
              </button>
            </div>
          </div>
        </nav>

        <main className="content-layer">
          <div className="hero-section px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                Transform Your Business
              </h1>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 tracking-tight">
                With TRWAI
              </h2>
              <p className="text-xl text-gray-300 mb-12">
                Experience the future of AI-powered solutions with our cutting-edge automation, web design, and voice interface technology.
              </p>
              <div className="relative">
                <div className="absolute inset-0 bg-[#39FF14]/20 blur-3xl rounded-full"></div>
                <PhoneCall />
              </div>
              <p className="text-sm text-gray-400 mt-16">
                Trusted by innovative companies
              </p>
            </div>
          </div>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 py-4 px-4 sm:px-6 lg:px-8 border-t border-gray-800 bg-black/50 backdrop-blur-sm">
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
      </div>
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