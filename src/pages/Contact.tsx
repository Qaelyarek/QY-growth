import React from 'react';
import ContactForm from '../components/ContactForm';
import { MessageSquare } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      
      {/* Radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.1)_0%,transparent_100%)] opacity-40" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <MessageSquare className="w-10 h-10 text-[#39FF14] mr-3" />
            <h1 className="text-4xl font-bold">Get in Touch</h1>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/10 mb-12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">
              Ready to transform your business with AI?
            </h2>
            <p className="text-xl text-gray-300 mb-4">
              Fill out the form below and our team will help you identify the perfect AI solution for your needs.
            </p>
            <div className="flex items-center justify-center text-[#39FF14] text-sm font-mono">
              <span className="inline-block animate-pulse mr-2">●</span>
              <span>24-HOUR RESPONSE GUARANTEED</span>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}