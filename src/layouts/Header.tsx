import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, TrendingUp, MessageSquare, Target, Brain, Award, HelpCircle } from 'lucide-react';

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

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navItems = [
    { name: 'Home', href: isHomePage ? '#home' : '/#home', icon: Brain },
    { name: 'Features', href: isHomePage ? '#features' : '/#features', icon: Target },
    { name: 'Benefits', href: isHomePage ? '#benefits' : '/#benefits', icon: Award },
    { name: 'FAQ', href: isHomePage ? '#faq' : '/#faq', icon: HelpCircle },
    { name: 'Contact', href: isHomePage ? '#contact' : '/#contact', icon: MessageSquare },
  ];


  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? 'glass-card shadow-teal-modern border-b border-teal-100/50'
        : 'bg-transparent'
        }`}>
        <div className="container-modern py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center group cursor-pointer">
              <div className="relative">
                <div className="h-10 md:h-12 w-32 md:w-48 flex items-center justify-start group-hover:scale-105 transition-all duration-300">
                  <img src="/logo.png" alt="RightApply Logo" className="h-full w-auto object-contain" onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const svg = `
                      <div class="flex items-center space-x-3">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="12" y="8" width="24" height="32" rx="3" fill="rgba(20, 184, 166, 0.1)" stroke="#14b8a6" strokeWidth="2" />
                          <rect x="18" y="4" width="12" height="8" rx="2" fill="#14b8a6" />
                          <rect x="20" y="6" width="8" height="4" rx="1" fill="white" />
                          <path d="M18 22L22 26L30 18" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span class="text-2xl font-bold text-teal-600">Rightapply.ai</span>
                      </div>
                    `;
                    e.currentTarget.parentElement!.insertAdjacentHTML('beforeend', svg);
                  }} />
                </div>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group flex items-center text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium relative"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Icon className="w-4 h-4 mr-2 group-hover:text-teal-500 transition-all duration-300 group-hover:rotate-12" />
                    {item.name}
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-indigo-600 group-hover:w-full transition-all duration-300"></div>
                  </a>
                );
              })}

              <Link
                to="/registration"
                className="modern-button !py-2.5 !px-6 !text-sm flex items-center space-x-2"
              >
                <span>Get Started</span>
                <TrendingUp className="w-4 h-4" />
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden bg-gradient-to-r from-teal-500 to-indigo-600 text-white p-2.5 rounded-xl shadow-teal-modern hover-lift-modern"
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
          <div className="absolute inset-0 bg-black/40 backdrop-blur-modern" onClick={() => setIsMenuOpen(false)} />
          <div className="relative glass-card m-4 mt-20 rounded-2xl p-8 shadow-teal-modern border-teal-100/50">
            <nav className="flex flex-col space-y-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center mr-4">
                      <Icon className="w-6 h-6 text-teal-600" />
                    </div>
                    {item.name}
                  </a>
                );
              })}
              <Link
                to="/registration"
                className="modern-button w-full flex items-center justify-center space-x-2 py-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Get Started</span>
                <TrendingUp className="w-5 h-5" />
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
