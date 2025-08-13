import React, { useState, useEffect } from 'react';
import { ClipboardCheck, Twitter, Linkedin, Github, ArrowUp } from 'lucide-react';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="section-bg-modern border-t border-orange-200/50 relative overflow-hidden pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-dots-modern opacity-20"></div>

      {/* Modern gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-25/30 via-transparent to-orange-50/20"></div>

      <div className="container-modern px-4 sm:px-6 lg:px-8 pt-16 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16 mb-10">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 flex items-center justify-center">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="12" y="8" width="24" height="32" rx="3" fill="rgba(234, 88, 12, 0.1)" stroke="#EA580C" strokeWidth="2" />
                  <rect x="18" y="4" width="12" height="8" rx="2" fill="#EA580C" />
                  <rect x="20" y="6" width="8" height="4" rx="1" fill="white" />
                  <path d="M18 22L22 26L30 18" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <span className="text-2xl font-bold font-['Inter']" style={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
                  <span className="text-orange-600">Rightapply</span>
                  <span className="text-blue-500">.ai</span>
                </span>
                <p className="text-xs text-blue-500/70 font-medium tracking-wider">
                  Intelligent Job Search
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-md">
              Transforming careers through <span className="text-orange-600 font-semibold">intelligent job search</span> and{' '}
              <span className="text-orange-500 font-semibold">AI-powered career guidance</span>.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="glass-card p-3 rounded-xl hover-lift-modern">
                <Twitter className="w-5 h-5 text-orange-600" />
              </a>
              <a href="#" className="glass-card p-3 rounded-xl hover-lift-modern">
                <Linkedin className="w-5 h-5 text-orange-600" />
              </a>
              <a href="#" className="glass-card p-3 rounded-xl hover-lift-modern">
                <Github className="w-5 h-5 text-orange-600" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
<div className="md:col-start-4">
  <h4 className="text-xl font-bold text-gray-900 mb-6 text-shadow-modern">
    Quick Links
  </h4>
  <ul className="space-y-3">
    {[
      { name: 'Features', href: '#features' },
      { name: 'Success Stories', href: '#success' },
      { name: 'Companies', href: '#companies' },
    ].map((link) => (
      <li key={link.name}>
        <a
          href={link.href}
          className="text-gray-600 hover:text-orange-600 transition-colors duration-300 hover-lift-modern inline-block"
        >
          {link.name}
        </a>
      </li>
    ))}
  </ul>
</div>

          {/* Contact Info - Commented Out */}
          {/* 
          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-6 text-shadow-modern">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-orange-600 mr-3 flex-shrink-0" />
                <span className="text-gray-600">hello@rightapply.ai</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-orange-600 mr-3 flex-shrink-0" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
          */}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-orange-100 pt-6 flex justify-end">
          {/* Footer bottom content can go here */}
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-full shadow-orange-modern hover-lift-modern z-50 animate-glow-pulse transition-all duration-300 transform hover:scale-110"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
