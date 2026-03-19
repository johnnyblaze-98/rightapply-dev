import { Brain, Target, Zap, Users, TrendingUp, Network, Sparkles } from 'lucide-react';

const Features = () => {
  const mainFeatures = [
    {
      icon: Network,
      title: "Network Intelligence",
      description: "Leverage your professional network and discover hidden opportunities through AI-powered connection analysis. We identify who is hiring in your extended circle.",
      stats: "3x More Referrals",
      color: "teal"
    },
    {
      icon: Brain,
      title: "AI Resume Optimization",
      description: "Our AI understands the context of your experience beyond keywords. We present your achievements in a way that resonates with specific industry recruiters.",
      stats: "92% Recruiter Interest",
      color: "indigo"
    },
    {
      icon: Zap,
      title: "Human-Led Applications",
      description: "Strategic applications submitted by our experts at optimal times. We handle the process from profile matching to final submission with a human touch.",
      stats: "2000+ Apps / Month",
      color: "violet"
    }
  ];

  const useCases = [
    {
      icon: Users,
      title: "New Graduates",
      description: "Launch your career with entry-level opportunities tailored to your degree and internships.",
      gradient: "from-teal-400 to-teal-600"
    },
    {
      icon: TrendingUp,
      title: "Career Changers",
      description: "Transition to new industries seamlessly by highlighting your transferable skills through AI analysis.",
      gradient: "from-indigo-400 to-indigo-600"
    },
    {
      icon: Target,
      title: "Senior Professionals",
      description: "Find executive and leadership opportunities that match your specialized expertise and goals.",
      gradient: "from-violet-400 to-violet-600"
    }
  ];

  return (
    <section id="features" className="py-24 section-bg-modern relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-grid-modern opacity-20"></div>

      {/* Gradient Blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl"></div>

      <div className="container-modern relative z-10">
        <div className="text-center mb-20 scroll-reveal">
          <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-100 rounded-full px-4 py-1.5 mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span className="text-teal-700 text-xs font-bold tracking-wider uppercase">Advanced Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
            AI That Works <span className="modern-gradient-text animate-gradient">Smart for You</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
            Our platform combines cutting-edge AI with proven job search strategies to give you a strategic advantage in the market.
          </p>
        </div>

        {/* Main Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-24">
          {mainFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="modern-card card-hover-modern group !p-10"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 bg-${feature.color}-500 rounded-2xl flex items-center justify-center mb-8 feature-icon-modern group-hover:rotate-6 transition-transform shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-8">
                  {feature.description}
                </p>

                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                  <span className={`text-sm font-black uppercase tracking-widest text-${feature.color}-600 bg-${feature.color}-50 px-3 py-1 rounded-lg`}>
                    {feature.stats}
                  </span>
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`w-6 h-6 rounded-full border-2 border-white bg-${feature.color}-${100 * i}`}></div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Career Stages / Use Cases */}
        <div className="scroll-reveal">
          <div className="bg-gradient-to-br from-gray-900 to-indigo-950 rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full pattern-dots-modern opacity-10"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-8 leading-tight text-center lg:text-left">
                  Tailored for Every <br />
                  <span className="text-teal-400">Career Milestone</span>
                </h3>
                <p className="text-lg md:text-xl text-indigo-100/70 mb-10 leading-relaxed font-medium text-center lg:text-left">
                  Whether you're just starting out or leading a Fortune 500 organization, RightApply scales to meet your specific career ambitions.
                </p>
                <div className="flex justify-center lg:justify-start">
                  <button
                    className="bg-white hover:bg-teal-50 text-gray-900 font-bold py-4 px-10 rounded-2xl transition-all duration-300 flex items-center space-x-3 shadow-xl hover:-translate-y-1"
                    onClick={() => window.location.href = '/registration'}
                  >
                    <span>Build My Career Plan</span>
                    <TrendingUp className="w-5 h-5 text-teal-600" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {useCases.map((useCase, idx) => {
                  const Icon = useCase.icon;
                  return (
                    <div key={idx} className="glass-card-dark bg-white/5 border-white/10 hover:bg-white/10 p-6 rounded-3xl flex items-center space-x-6 transition-all duration-300 group hover:-translate-x-2">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${useCase.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1">{useCase.title}</h4>
                        <p className="text-indigo-100/60 text-sm leading-relaxed">{useCase.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;