import React from 'react';
import { PhoneCall } from './components/PhoneCall';
import { Terminal, ArrowUpRight } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Services from './pages/Services';

function HomePage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      
      {/* Radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.1)_0%,transparent_100%)] opacity-40" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-6 flex items-center justify-center">
          <Terminal className="w-12 h-12 text-[#39FF14] mr-3" />
          <h1 className="text-4xl sm:text-6xl font-bold">QY-Growth</h1>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400">
          Revolutionizing Business Growth with AI
        </h2>
        
        <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/10 mb-12 max-w-2xl mx-auto">
          <p className="text-xl text-gray-300 mb-4">
            Experience our advanced AI voice system designed to transform customer engagement and drive business growth.
          </p>
          <div className="flex items-center justify-center text-[#39FF14] text-sm font-mono">
            <span className="inline-block animate-pulse mr-2">●</span>
            <span>AI-POWERED VOICE TECHNOLOGY</span>
          </div>
        </div>

        <div className="relative flex flex-col items-center">
          <div className="absolute -z-10 w-64 h-64 bg-[#39FF14]/5 rounded-full blur-3xl"></div>
          <PhoneCall />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center">
                <Terminal className="w-8 h-8 text-[#39FF14] mr-2" />
                <img src="/assets/White-QY-logo.png" alt="QY-Growth Logo" className="h-8" />
              </Link>
              
              <div className="flex items-center space-x-6">
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                  Services
                </Link>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </nav>
        
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </div>
        
        <footer className="bg-black/70 border-t border-white/10 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
            <div className="flex items-center justify-center gap-4 text-sm mb-4">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>•</span>
              <Link to="/services" className="hover:text-white transition-colors">
                Services
              </Link>
              <span>•</span>
              <Link to="#" className="hover:text-white transition-colors">
                About
              </Link>
              <span>•</span>
              <Link to="#" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
            <p className="text-sm">© {new Date().getFullYear()} QY-Growth. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;