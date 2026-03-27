import { Building2, Award, Globe, Zap } from 'lucide-react';
import ScrollingTrain from '../animations/ScrollingTrain';

const Companies = () => {
  const stats = [
    { value: "500+", label: "Target Companies", icon: Building2, color: "teal" },
    { value: "Fortune 500", label: "Top Networks", icon: Award, color: "indigo" },
    { value: "Global", label: "Opportunities", icon: Globe, color: "emerald" },
    { value: "1200+", label: "Monthy Applications", icon: Zap, color: "violet" }
  ];

  return (
    <section id="companies" className="py-24 section-bg-modern relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pattern-dots-modern opacity-20"></div>

      <div className="container-modern relative z-10">
        <div className="text-center mb-24 scroll-reveal">
          <div className="flex justify-center mb-8 space-x-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            <Building2 className="w-12 h-12 text-teal-600" />
            <Award className="w-12 h-12 text-indigo-600" />
            <Globe className="w-12 h-12 text-emerald-600" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Our Experts Connect You to <br />
            <span className="modern-gradient-text animate-gradient">Industry Leaders</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-medium px-4">
            Our automated engine targets premium career opportunities across global markets and top-tier organizations.
          </p>
        </div>

        {/* Dynamic Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24 scroll-reveal">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="glass-card hover:bg-white border-white/50 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] text-center shadow-sm hover:shadow-teal-modern transition-all duration-500 hover-lift-modern group"
              >
                <div className={`w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 bg-${stat.color}-50 rounded-lg md:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 md:w-6 md:h-6 text-${stat.color}-600`} />
                </div>
                <div className="text-2xl md:text-3xl font-black text-gray-900 mb-1 leading-none">{stat.value}</div>
                <div className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Scrolling Train Component Styling Wrapper */}
        <div className="scroll-reveal bg-white/40 p-6 md:p-12 rounded-[2rem] md:rounded-[3.5rem] border-2 border-white/60 shadow-xl backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-white/80 to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-white/80 to-transparent z-10"></div>

          <div className="mb-8 md:mb-10 text-center">
            <span className="text-gray-400 font-bold text-xs uppercase tracking-[0.3em]">Land roles at top-tier firms like these</span>
          </div>

          <ScrollingTrain />
        </div>
      </div>
    </section>
  );
};

export default Companies;
