import React from 'react';
import { PhoneCall } from './components/PhoneCall';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Toaster position="top-right" />
      
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-4">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-radial-gradient opacity-40" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
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