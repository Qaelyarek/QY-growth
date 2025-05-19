import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Terminal className="h-8 w-8 text-[#39FF14]" />
              <span className="ml-2 text-xl font-bold">QY-Growth</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <NavLink to="/" active={isActive('/')}>Home</NavLink>
              <NavLink to="/about" active={isActive('/about')}>About</NavLink>
              <NavLink to="/services" active={isActive('/services')}>Services</NavLink>
              <NavLink to="/contact" active={isActive('/contact')}>Contact</NavLink>
              <button className="px-4 py-2 rounded-md bg-[#39FF14] text-black font-medium hover:bg-[#32CC11] transition-colors">
                Book Demo
              </button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-black/95 border-b border-white/10"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to="/" active={isActive('/')}>Home</MobileNavLink>
            <MobileNavLink to="/about" active={isActive('/about')}>About</MobileNavLink>
            <MobileNavLink to="/services" active={isActive('/services')}>Services</MobileNavLink>
            <MobileNavLink to="/contact" active={isActive('/contact')}>Contact</MobileNavLink>
            <div className="pt-2">
              <button className="w-full px-4 py-2 rounded-md bg-[#39FF14] text-black font-medium hover:bg-[#32CC11] transition-colors">
                Book Demo
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

function NavLink({ to, active, children }: NavLinkProps) {
  return (
    <Link 
      to={to} 
      className={`relative px-3 py-2 font-medium transition-colors ${
        active 
          ? 'text-[#39FF14]' 
          : 'text-gray-300 hover:text-white'
      }`}
    >
      {children}
      {active && (
        <motion.div 
          layoutId="navbar-indicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#39FF14]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </Link>
  );
}

function MobileNavLink({ to, active, children }: NavLinkProps) {
  return (
    <Link 
      to={to} 
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        active 
          ? 'bg-gray-900 text-[#39FF14]' 
          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
      }`}
    >
      {children}
    </Link>
  );
}