import { Users, Target, TrendingUp, Brain, Rocket, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Benefits = () => {
  const navigate = useNavigate();
  const advantages = [
    {
      id: "ai-intelligence",
      icon: Brain,
      title: "AI Resume Optimization",
      description: "Our advanced AI technology analyzes thousands of job opportunities to find the perfect matches. Every resume is dynamically tailored to highlight what recruiters in that specific role are looking for.",
      stat: "95% Match Accuracy",
      gradient: "from-teal-500 to-indigo-600"
    },
    {
      id: "expert-support",
      icon: Users,
      title: "Human-Driven Applications",
      description: "Combine AI efficiency with human expertise. Our dedicated team manages your applications, ensuring they are submitted correctly and professionally.",
      stat: "100% Human Reviewed",
      gradient: "from-indigo-500 to-violet-600"
    },
    {
      id: "application-engine",
      icon: Rocket,
      title: "Strategic Job Targeting",
      description: "We identify and apply to high-value roles at scale, filtered for quality and relevance to your career goals.",
      stat: "1200+ Jobs Applied Yearly",
      gradient: "from-teal-400 to-emerald-600"
    },
    {
      id: "interview-guidance",
      icon: Target,
      title: "Interview Mastery",
      description: "Get personalized interview coaching and preparation support from our expert team. We help you build confidence and master common role-specific interview challenges.",
      stat: "98% Interview Success",
      gradient: "from-violet-500 to-purple-600"
    }
  ];

  return (
    <section id="benefits" className="py-24 section-bg-dark-modern relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pattern-dots-modern opacity-10"></div>
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]"></div>

      <div className="container-modern relative z-10">
        {/* Header */}
        <div className="text-center mb-24 scroll-reveal">
          <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8 backdrop-blur-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
            </span>
            <span className="text-teal-400 font-black text-xs tracking-widest uppercase">The RightApply Guarantee</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight text-white max-w-5xl mx-auto">
            Experience the <span className="modern-gradient-text animate-gradient pb-2">Strategic Advantage</span>
          </h2>

          <p className="text-lg md:text-xl text-indigo-100/70 max-w-4xl mx-auto leading-relaxed font-medium px-4">
            Discover why thousands of professionals choose RightApply to skip the line and land their perfect roles faster than ever before.
          </p>
        </div>

        {/* Advantage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {advantages.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                id={benefit.id}
                className="glass-card-dark !bg-white/5 border-white/10 hover:!bg-white/10 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 card-hover-modern group transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-6 sm:space-y-0 sm:space-x-8 mb-8 md:mb-10">
                  <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${benefit.gradient} rounded-2xl md:rounded-3xl flex items-center justify-center flex-shrink-0 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 feature-icon-modern`}>
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight group-hover:text-teal-400 transition-colors">
                      {benefit.title}
                    </h3>
                    <div className="flex items-center text-teal-400/80 font-bold text-sm tracking-wider uppercase">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      {benefit.stat}
                    </div>
                  </div>
                </div>

                <p className="text-lg md:text-xl text-indigo-100/60 leading-relaxed font-medium">
                  {benefit.description}
                </p>

                <div className="mt-10 flex items-center space-x-2 text-white/40 group-hover:text-teal-400 transition-colors cursor-pointer">
                  <span className="text-sm font-bold uppercase tracking-widest">Learn More</span>
                  <Globe className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <div className="scroll-reveal">
          <div className="glass-card border-none rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-indigo-50 opacity-100"></div>
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-teal-200/20 rounded-full blur-[80px] group-hover:scale-110 transition-transform duration-700"></div>

            <div className="relative z-10">
              <div className="flex justify-center mb-8">
                <div className="flex -space-x-2 md:-space-x-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 md:border-4 border-white overflow-hidden shadow-lg hover:-translate-y-2 transition-transform cursor-pointer">
                      <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="user" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
              <h3 className="text-2xl md:text-4xl font-black text-gray-900 mb-6">Join 10,000+ Pros Landing Better Jobs</h3>
              <p className="text-base md:text-lg text-gray-600 mb-10 font-medium max-w-2xl mx-auto">Our members average a 40% salary increase and 3x more interview callbacks within the first month.</p>
              <button
                className="modern-button !py-4 !px-8 md:!px-12 text-base md:text-lg shadow-teal-modern w-full sm:w-auto"
                onClick={() => navigate('/registration')}
              >
                Get Started Risk-Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;