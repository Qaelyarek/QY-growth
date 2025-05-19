import React from 'react';
import { PhoneCall } from './components/PhoneCall';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Toaster position="top-right" />
      
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-4">
        {/* Background gradient effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-[#39FF14]/20 rounded-full blur-[120px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Experience Our AI Voice Agent
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Talk directly with our advanced AI system to learn about our services and how we can help grow your business
          </p>

          <PhoneCall />
        </div>
      </div>
    </div>
  );
}

export default App;