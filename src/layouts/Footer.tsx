import { useState, useEffect } from 'react';
import { Twitter, Linkedin, Facebook, Instagram, ArrowUp, ShieldCheck, Heart } from 'lucide-react';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Benefits', href: '#benefits' },
      { name: 'Companies', href: '#companies' },
      { name: 'FAQ', href: '#faq' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Success Stories', href: '/success' },
      { name: 'Contact', href: '#contact' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      // { name: 'www.rightapply.ai', href: '#' }
    ]
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/rightapply-ai/' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/rightapply_ai' },
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/p/Rightapplay-Ai-61587536570024/' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/rightapply.ai/' }
  ];

  return (
    <footer className="bg-gray-900 border-t border-white/5 relative overflow-hidden pt-24 pb-12">
      {/* Background Decor */}
      <div className="absolute inset-0 pattern-dots-modern opacity-[0.03]"></div>
      <div className="absolute top-0 right-[-5%] w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[100px]"></div>

      <div className="container-modern px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-16 mb-20">

          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center group cursor-pointer mb-8" onClick={scrollToTop}>
              <div className="h-12 md:h-16 w-48 md:w-64 flex items-center justify-start group-hover:scale-105 transition-all duration-300">
                <img src="/logo.png" alt="RightApply Logo" className="h-full w-auto object-contain" onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const svg = `
                    <div class="flex items-center space-x-4 text-white">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="md:w-14 md:h-14">
                        <rect x="12" y="8" width="24" height="32" rx="3" fill="rgba(20, 184, 166, 0.15)" stroke="#14b8a6" strokeWidth="2.5" />
                        <rect x="18" y="4" width="12" height="8" rx="2" fill="#14b8a6" />
                        <rect x="20" y="6" width="8" height="4" rx="1" fill="white" />
                        <path d="M18 22L22 26L30 18" stroke="#6366f1" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span class="text-2xl md:text-3xl font-black">Rightapply.ai</span>
                    </div>
                  `;
                  e.currentTarget.parentElement!.insertAdjacentHTML('beforeend', svg);
                }} />
              </div>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed mb-10 font-medium max-w-sm">
              We empower professionals with <span className="text-white font-bold">AI-optimized resumes</span> and <span className="text-white font-bold">human-managed job applications</span>.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 mb-4 lg:mb-0">
              {socialLinks.map(({ icon: Icon, href, name }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="w-10 h-10 md:w-12 md:h-12 bg-white/5 hover:bg-teal-500/20 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/10 hover:border-teal-400/50 transition-all duration-300 group"
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-teal-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-1 lg:col-span-4 grid grid-cols-2 gap-12">
            <div>
              <h4 className="text-white font-black uppercase text-sm tracking-[0.2em] mb-8">Product</h4>
              <ul className="space-y-4">
                {footerLinks.product.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-400 hover:text-teal-400 font-bold transition-all duration-300 flex items-center group">
                      <span className="w-0 group-hover:w-2 h-[1px] bg-teal-400 mr-0 group-hover:mr-2 transition-all"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black uppercase text-xs md:text-sm tracking-[0.2em] mb-6 md:mb-8">Company</h4>
              <ul className="space-y-4">
                {footerLinks.company.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-400 hover:text-teal-400 font-bold transition-all duration-300 flex items-center group text-sm md:text-base">
                      <span className="w-0 group-hover:w-2 h-[1px] bg-teal-400 mr-0 group-hover:mr-2 transition-all"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter section hidden as requested */}
            {/* 
            <div className="col-span-2 md:col-span-2 lg:col-span-1">
              <h4 className="text-white font-black uppercase text-xs md:text-sm tracking-[0.2em] mb-6 md:mb-8">Newsletter</h4>
              <p className="text-gray-500 text-sm mb-6 font-medium">Get the latest career tips and AI shifts delivered to you.</p>
              <div className="relative">
                <input
                  type="email"
                  placeholder="name@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 md:py-4 px-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-teal-500/50 transition-colors"
                />
                <button className="absolute right-2 top-2 bottom-2 bg-teal-500 hover:bg-teal-600 text-white font-black px-3 md:px-4 rounded-xl transition-all shadow-lg shadow-teal-500/20 active:scale-95 text-xs md:text-sm">
                  JOIN
                </button>
              </div>
            </div> 
            */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-6">
            <p className="text-gray-600 text-sm font-bold">&copy; 2026 Right apply-Ai private limited</p>
            <div className="flex space-x-4">
              {footerLinks.legal.map(link => (
                <a key={link.name} href={link.href} className="text-gray-600 hover:text-teal-400 text-xs font-black uppercase tracking-tighter transition-colors">
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-6 text-gray-600 font-bold text-sm">
            <div className="flex items-center">
              <ShieldCheck className="w-4 h-4 mr-2 text-teal-800" />
              <span>SSL Encrypted</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-2 text-indigo-800" />
              <span>Built for Careers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Buttons Container */}
      <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 flex flex-col items-center space-y-4 z-50">
        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="bg-gradient-to-br from-teal-500 to-indigo-600 text-white p-4 md:p-5 rounded-2xl md:rounded-[1.5rem] shadow-2xl shadow-teal-500/40 hover-lift-modern animate-glow-pulse border border-white/20 active:scale-90 transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 md:w-6 md:h-6 stroke-[3px]" />
          </button>
        )}

        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/19453814899?text=Hi%2C%20I%20just%20explored%20RightApply.ai%20and%20I%27m%20interested%20in%20your%20career%20services.%20Could%20you%20please%20provide%20more%20details%3F"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-4 md:p-5 rounded-2xl md:rounded-[1.5rem] shadow-2xl shadow-green-500/40 hover-lift-modern border border-white/20 active:scale-90 transition-all duration-300 flex items-center justify-center group"
          aria-label="Contact on WhatsApp"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 md:w-7 md:h-7 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          <span className="absolute right-full mr-4 bg-gray-900/90 text-white px-3 py-1.5 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none backdrop-blur-md border border-white/10 hidden md:block">
            Chat with us
          </span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
