import React, { useEffect, useState } from 'react';
import { Search, Target, TrendingUp, Users, Briefcase, Star } from 'lucide-react';
import InfinityAnimation from './InfinityAnimation';

const Hero = () => {
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { value: "10,000+", label: "Dream Jobs Matched", icon: Briefcase },
    { value: "95%", label: "Success Rate", icon: Target },
    { value: "2.5x", label: "Faster Hiring", icon: TrendingUp },
    { value: "500+", label: "Top Companies", icon: Users }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen section-bg-modern pb-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-dots-modern opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-25/50 via-transparent to-orange-50/30"></div>

      <div className="relative container-modern pt-56 pb-60 z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Main Heading */}
          <h1
  className="text-4xl md:text-6xl font-bold mb-32 mt-16 scroll-reveal"
  style={{ lineHeight: 1.3 }}
>
  <span className="block text-gray-900 mb-4">AI Powered Job Search</span>
  <span className="block modern-gradient-text animate-gradient mb-8">
    Powered by Human Expertise
  </span>
</h1>


    {/* We Apply for You Caption */}
<div className="mb-20 scroll-reveal">
  <div className="flex flex-col items-center">
    <p className="text-2xl md:text-3xl font-bold text-orange-600 mb-2">
      We Apply for You
    </p>
    <p className="text-lg text-gray-700 max-w-xl text-center font-medium">
      Sit back and relax while we apply to hundreds of jobs tailored just for you.
    </p>
  </div>
</div>


          {/* Infinity Animation + Tagline */}
          <div className="mb-8 scroll-reveal flex flex-col items-center" style={{ animationDelay: '0.3s' }}>
            <div className="pt-8 mb-8 backdrop-blur-none relative">
              <InfinityAnimation />
            </div>

            <div className="text-center glass-card rounded-2xl p-6 shadow-orange-modern">
              <p className="text-3xl md:text-4xl font-bold modern-gradient-text animate-gradient mb-3 text-shadow-modern">
                Towards Infinity
              </p>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
                Limitless possibilities, endless opportunities, infinite potential
              </p>
            </div>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-6 justify-center scroll-reveal mt-12" style={{ animationDelay: '0.8s' }}>
            <a 
              href="#ai-intelligence" 
              className="glass-card rounded-full px-8 py-4 flex items-center shadow-orange-modern hover-lift-modern cursor-pointer transition-all duration-300 feature-pill-link"
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById('ai-intelligence');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  target.classList.add('highlight-section');
                  setTimeout(() => target.classList.remove('highlight-section'), 3000);
                }
              }}
            >
              <Target className="w-6 h-6 text-orange-600 mr-3" />
              <span className="text-gray-700 font-semibold">Optimized Resumes</span>
            </a>
            <a 
              href="#application-engine" 
              className="glass-card rounded-full px-8 py-4 flex items-center shadow-orange-modern hover-lift-modern cursor-pointer transition-all duration-300 feature-pill-link"
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById('application-engine');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  target.classList.add('highlight-section');
                  setTimeout(() => target.classList.remove('highlight-section'), 3000);
                }
              }}
            >
              <Search className="w-6 h-6 text-orange-500 mr-3" />
              <span className="text-gray-700 font-semibold">Daily Job Applications</span>
            </a>
            <a 
              href="#interview-guidance" 
              className="glass-card rounded-full px-8 py-4 flex items-center shadow-orange-modern hover-lift-modern cursor-pointer transition-all duration-300 feature-pill-link"
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById('interview-guidance');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  target.classList.add('highlight-section');
                  setTimeout(() => target.classList.remove('highlight-section'), 3000);
                }
              }}
            >
              <Users className="w-6 h-6 text-orange-700 mr-3" />
              <span className="text-gray-700 font-semibold">Interview Guidance</span>
            </a>
            <a 
              href="#expert-support" 
              className="glass-card rounded-full px-8 py-4 flex items-center shadow-orange-modern hover-lift-modern cursor-pointer transition-all duration-300 feature-pill-link"
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById('expert-support');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  target.classList.add('highlight-section');
                  setTimeout(() => target.classList.remove('highlight-section'), 3000);
                }
              }}
            >
              <Star className="w-6 h-6 text-orange-600 mr-3" />
              <span className="text-gray-700 font-semibold">Expert Support</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
