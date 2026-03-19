import { Target, Users, Star, Rocket, Globe, Brain } from 'lucide-react';
import InfinityAnimation from '../animations/InfinityAnimation';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section id="home" className="relative min-h-screen section-bg-modern pt-32 pb-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-dots-modern opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-transparent to-indigo-50/30"></div>

      {/* Decorative Orbs */}
      <div className="absolute top-20 left-[10%] w-64 h-64 bg-teal-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative container-modern pt-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Column: Content */}
          <div className="text-left scroll-reveal">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-200 rounded-full px-4 py-1.5 mb-8 shadow-sm">
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse-modern"></div>
              <span className="text-teal-700 text-sm font-bold tracking-wide uppercase">AI × Human Career Strategy</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black mb-6 leading-[1.1] tracking-tight">
              <span className="block text-gray-900 mb-2 font-black tracking-tighter">AI-Powered <span className="text-teal-500">×</span> Human Expertise</span>
              <span className="block modern-gradient-text animate-gradient pb-2 font-black tracking-tight">Hybrid Job Assistance</span>
            </h1>

            <div className="flex items-center space-x-2 text-indigo-600 font-extrabold text-[9px] uppercase tracking-[0.25em] mb-8 bg-indigo-50/40 w-fit px-3 py-1.5 rounded-md border border-indigo-100/30">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
              <span>We Apply For You</span>
            </div>

            <p className="text-sm md:text-base text-gray-600 max-w-lg leading-relaxed mb-10 font-medium">
              We leverage <span className="text-teal-600 font-bold border-b-2 border-teal-100">advanced AI</span> Technology to perfect your Resume, while our <span className="text-indigo-600 font-bold border-b-2 border-indigo-100">expert strategists</span> handle your high-stakes applications with precision.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <button
                className="modern-button !py-3 !px-8 text-sm md:text-base flex items-center space-x-2 w-full sm:w-auto justify-center"
                onClick={() => navigate('/registration')}
              >
                <Rocket className="w-4 h-4 md:w-5 md:h-5" />
                <span>Get Started Now</span>
              </button>
              <button
                className="glass-card !bg-white/60 hover:!bg-white border border-gray-100 hover:border-teal-300 !py-3 !px-8 text-sm md:text-base font-bold text-gray-700 rounded-xl transition-all duration-300 w-full sm:w-auto flex items-center justify-center group"
              >
                <span>Watch Demo</span>
                <Globe className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform text-teal-600" />
              </button>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Brain, text: "AI Resume Scoring", color: "text-teal-600", bg: "bg-teal-50" },
                { icon: Users, text: "Expert Application", color: "text-indigo-600", bg: "bg-indigo-50" },
                { icon: Target, text: "Strategic Matching", color: "text-violet-600", bg: "bg-violet-50" }
              ].map((pill, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-full px-4 py-2 flex items-center shadow-sm border border-white hover-lift-modern cursor-default"
                >
                  <pill.icon className={`w-4 h-4 ${pill.color} mr-2`} />
                  <span className="text-gray-700 font-bold text-[11px] tracking-wide uppercase">{pill.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: AI Dashboard Visual */}
          <div className="relative lg:h-[600px] flex items-center justify-center scroll-reveal">
            {/* Central Dashboard Card */}
            <div className="relative w-full max-w-md aspect-square">
              {/* Outer Glowing Ring */}
              <div className="absolute inset-0 border-2 border-teal-500/5 rounded-full animate-[spin_25s_linear_infinite] pointer-events-none"></div>
              <div className="absolute inset-8 border border-indigo-500/5 rounded-full animate-[spin_20s_linear_infinite_reverse] pointer-events-none"></div>

              {/* Central Core */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
                <InfinityAnimation className="w-full h-full opacity-30 scale-125" />
              </div>

              {/* Floating Dashboard Elements */}
              {/* Card 1: Success Rate */}
              <div className="absolute top-10 left-0 glass-card p-4 rounded-2xl shadow-lg w-40 animate-float border-white/40">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-6 h-6 bg-teal-500 rounded-lg flex items-center justify-center">
                    <Star className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-[8px] font-black text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded-full uppercase tracking-widest">Live</span>
                </div>
                <p className="text-2xl font-black text-gray-900 leading-none mb-1">98%</p>
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">Success Score</p>
              </div>

              {/* Card 2: Applications Journey */}
              <div className="absolute top-1/2 -right-6 glass-card p-5 rounded-2xl shadow-lg w-56 animate-float-delayed border-white/40">
                <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-3">Journey</p>
                <div className="space-y-3">
                  {[
                    { label: 'AI Check', status: 'Done', color: 'teal' },
                    { label: 'Strategy', status: 'Done', color: 'indigo' },
                    { label: 'Applying', status: 'Active', color: 'orange' }
                  ].map((step, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full bg-${step.color}-500 ${step.status === 'Active' ? 'animate-pulse' : ''}`}></div>
                      <div className="flex-1">
                        <div className="flex justify-between text-[9px] font-bold uppercase tracking-tighter mb-1">
                          <span className="text-gray-900/60">{step.label}</span>
                          <span className={`text-${step.color}-600`}>{step.status}</span>
                        </div>
                        <div className="h-1 bg-gray-50 rounded-full overflow-hidden">
                          <div className={`h-full bg-${step.color}-500 ${step.status === 'Active' ? 'w-2/3' : 'w-full'}`}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 3: Global Matches */}
              <div className="absolute -bottom-6 left-12 glass-card p-4 rounded-2xl shadow-lg w-48 animate-float border-white/40">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">Matches</p>
                    <p className="text-lg font-black text-gray-900">1,240+</p>
                  </div>
                </div>
                <div className="flex -space-x-1.5">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border border-white bg-indigo-50 flex items-center justify-center text-[8px] font-bold text-indigo-600">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                  <div className="w-6 h-6 rounded-full border border-white bg-gray-900 flex items-center justify-center text-[8px] font-bold text-white">
                    +
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative Nodes */}
          <div className="absolute top-1/4 translate-x-[400px] w-2 h-2 bg-teal-400 rounded-full blur-[1px] hidden lg:block"></div>
          <div className="absolute top-3/4 translate-x-[-200px] w-3 h-3 bg-indigo-400 rounded-full blur-[2px] hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
