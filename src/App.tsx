import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Bot, Terminal, Phone, MessageSquare, Headphones, ChevronRight, Shield, Clock, Zap, Layers } from 'lucide-react';
import ConsultationForm from './pages/ConsultationForm';
import Schedule from './pages/Schedule';
import { TypewriterLogo } from './components/ui/typewriter-logo';
import { BackgroundPaths } from './components/ui/background-paths';
import { PhoneCall } from './components/PhoneCall';
import { toast } from 'react-hot-toast';
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
              </div>
            </div>
          </div>
        </nav>

        <main className="content-layer">
          <div className="hero-section px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto bg-black/30 backdrop-blur-sm p-8 rounded-lg">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                Experience Our AI Voice Agent
              </h1>
              <p className="text-xl text-blue-200 mb-8 bg-black/20">
                Talk directly with our advanced AI voice technology - natural conversations powered by cutting-edge AI
              </p>
              <div className="relative">
                <div className="absolute inset-0 bg-[#39FF14]/20 blur-3xl rounded-full"></div>
                <PhoneCall />
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-black/50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 tracking-tight">Voice AI Capabilities</h2>
                <p className="text-blue-400">Discover what our AI voice technology can do for your business</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: <Bot className="w-8 h-8" />,
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