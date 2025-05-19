import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Linkedin, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black/90 border-t border-white/10 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <Terminal className="h-8 w-8 text-[#39FF14]" />
              <span className="ml-2 text-xl font-bold">QY-Growth</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Revolutionizing business growth with intelligent AI solutions that drive revenue and optimize operations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#39FF14]">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#39FF14]">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#39FF14]">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white">Services</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="col-span-1">
            <h3 className="text-white font-medium mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services#lead-generation" className="text-gray-400 hover:text-white">AI Lead Generation</Link></li>
              <li><Link to="/services#sales-callers" className="text-gray-400 hover:text-white">AI Sales Callers</Link></li>
              <li><Link to="/services#business-assistants" className="text-gray-400 hover:text-white">AI Business Assistants</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-white font-medium mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail size={20} className="text-[#39FF14] mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400">contact@qygrowth.com</span>
              </li>
              <li className="flex items-start">
                <Phone size={20} className="text-[#39FF14] mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400">(555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <MapPin size={20} className="text-[#39FF14] mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400">123 AI Plaza, Suite 101<br />San Francisco, CA 94105</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} QY-Growth. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}