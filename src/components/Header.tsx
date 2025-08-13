import React, { useState, useEffect } from 'react';
import { Menu, X, ClipboardCheck, Briefcase, Users, TrendingUp, MessageSquare, Target, Brain, Award } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home', icon: Brain },
    { name: 'Contact', href: '#contact', icon: MessageSquare },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'glass-card shadow-orange-modern border-b border-orange-100/50' 
          : 'bg-transparent'
      }`}>
        <div className="container-modern py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 flex items-center justify-center group-hover:scale-105 transition-all duration-300">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Clipboard background */}
                    <rect x="12" y="8" width="24" height="32" rx="3" fill="rgba(234, 88, 12, 0.1)" stroke="#EA580C" strokeWidth="2"/>
                    {/* Clipboard clip */}
                    <rect x="18" y="4" width="12" height="8" rx="2" fill="#EA580C"/>
                    <rect x="20" y="6" width="8" height="4" rx="1" fill="white"/>
                    {/* Checkmark */}
                    <path d="M18 22L22 26L30 18" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full animate-pulse-modern shadow-sm"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-['Inter']" style={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
                  <span className="text-orange-500">Rightapply</span><span className="text-blue-500">.ai</span>
                </span>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a 
                    key={item.name}
                    href={item.href} 
                    className="group flex items-center text-gray-700 hover:text-orange-600 transition-all duration-300 font-medium relative hover-lift-modern"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Icon className="w-4 h-4 mr-2 group-hover:text-orange-500 transition-all duration-300" />
                    {item.name}
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 group-hover:w-full transition-all duration-300"></div>
                  </a>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-xl shadow-orange-modern hover-lift-modern"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-modern" onClick={() => setIsMenuOpen(false)} />
          <div className="relative glass-card m-4 mt-20 rounded-2xl p-8 shadow-orange-modern">
            <nav className="flex flex-col space-y-6">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a 
                    key={item.name}
                    href={item.href} 
                    className="flex items-center text-gray-700 hover:text-orange-600 transition-all duration-300 font-medium text-lg hover-lift-modern"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-6 h-6 mr-4" />
                    {item.name}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;