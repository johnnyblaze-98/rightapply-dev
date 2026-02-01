import React, { useEffect, useState } from 'react';
import { Search, Target, TrendingUp, Users, Briefcase, Star, Rocket, Shield, Globe } from 'lucide-react';
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
    <section id="home" className="relative min-h-screen section-bg-modern pt-32 pb-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-dots-modern opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-transparent to-indigo-50/30"></div>

      {/* Decorative Orbs */}
      <div className="absolute top-20 left-[10%] w-64 h-64 bg-teal-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative container-modern pt-20 z-10 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-200 rounded-full px-4 py-1.5 mb-8 scroll-reveal shadow-sm">
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse-modern"></div>
            <span className="text-teal-700 text-sm font-bold tracking-wide uppercase">AI-Powered Career Transformation</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-8 scroll-reveal leading-[1.1] tracking-tight">
            <span className="block text-gray-900 mb-2">AI-Powered Resume Optimization.</span>
            <span className="block modern-gradient-text animate-gradient pb-2">Human-Driven Job Applications.</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12 scroll-reveal font-medium px-4">
            We optimize your resume using <span className="text-teal-600 font-bold">advanced AI</span>, while our experts handle the <span className="text-indigo-600 font-bold">applications for you</span>.
            Sit back and let us do the hard work.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16 scroll-reveal">
            <button
              className="modern-button !py-4 md:!py-5 !px-8 md:!px-12 text-base md:text-lg flex items-center space-x-3 w-full sm:w-auto justify-center"
              onClick={() => window.location.href = '/registration'}
            >
              <Rocket className="w-5 h-5 md:w-6 md:h-6" />
              <span>Start My Career Journey</span>
            </button>
            <button
              className="glass-card !bg-white/60 hover:!bg-white border-2 border-teal-100 hover:border-teal-300 !py-4 md:!py-5 !px-8 md:!px-12 text-base md:text-lg font-bold text-teal-700 rounded-2xl transition-all duration-300 w-full sm:w-auto flex items-center justify-center"
            >
              <span>How it Works</span>
            </button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-4 justify-center scroll-reveal mb-20">
            {[
              { icon: Target, text: "AI Resume Optimization", color: "text-teal-600", bg: "bg-teal-50" },
              { icon: Globe, text: "Human-Driven Applications", color: "text-indigo-600", bg: "bg-indigo-50" },
              { icon: Shield, text: "Expert Support", color: "text-violet-600", bg: "bg-violet-50" },
              { icon: Star, text: "Interview Coaching", color: "text-emerald-600", bg: "bg-emerald-50" }
            ].map((pill, idx) => (
              <div
                key={idx}
                className={`glass-card rounded-full px-4 md:px-6 py-2 md:py-3 flex items-center shadow-sm border border-white hover-lift-modern cursor-default transition-all duration-500`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <pill.icon className={`w-5 h-5 ${pill.color} mr-3`} />
                <span className="text-gray-700 font-bold text-sm tracking-wide">{pill.text}</span>
              </div>
            ))}
          </div>

          {/* Trust Caption */}
          <div className="scroll-reveal pt-8 border-t border-teal-100/50 max-w-2xl mx-auto">
            <p className="text-gray-500 font-medium mb-6">Trusted by professionals from leading companies</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
              {/* Placeholders for logos if needed, otherwise infinity animation handles it */}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Floating Cards - Hidden on mobile/tablet */}
      <div className="hidden lg:block absolute top-[40%] right-[5%] xl:right-[8%] w-56 xl:w-64 scroll-reveal">
        <div className="glass-card p-6 rounded-3xl shadow-teal-modern border-teal-100/50 animate-float">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Success Rate</p>
              <p className="text-2xl font-black text-gray-900 leading-none">95%</p>
            </div>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-teal-500 rounded-full animate-shimmer" style={{ width: '95%' }}></div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block absolute top-[55%] left-[5%] xl:left-[8%] w-56 xl:w-64 scroll-reveal">
        <div className="glass-card p-6 rounded-3xl shadow-teal-modern border-teal-100/50 animate-float" style={{ animationDelay: '1s' }}>
          <div className="flex items-center space-x-4 mb-2">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-teal-${100 * i} flex items-center justify-center overflow-hidden`}>
                  <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-white bg-teal-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">+</div>
          </div>
          <p className="text-sm font-bold text-gray-700">10k+ Careers Transformed</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
