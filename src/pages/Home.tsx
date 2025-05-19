import React from 'react';
import { Terminal } from 'lucide-react';
import { PhoneCall } from '../components/PhoneCall';
import AnimatedTextCycle from '../components/ui/animated-text-cycle';

export default function Home() {
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
          <AnimatedTextCycle 
            words={[
              "Revolutionizing Business",
              "Enhancing Customer Engagement",
              "Transforming Sales Operations",
              "Automating Repetitive Tasks"
            ]}
            interval={4000}
            className="text-white"
          /> with AI
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