import React from 'react';
import { Brain, Target, Zap, Shield, Users, TrendingUp, Search, Briefcase } from 'lucide-react';

const Features = () => {
  const features = [
   {
      icon: Users,
      title: "Network Intelligence",
      description: "Leverage your professional network and discover hidden opportunities through AI-powered connection analysis.",
      stats: "3x More Referrals",
      color: "blue-500"
    }
  ];

  return (
    <section id="features" className="pb-24 section-bg-modern relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-grid-modern opacity-40"></div>
      
      {/* Modern gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-25/30 via-transparent to-orange-50/20"></div>

      <div className="container-modern relative z-10">
        <div className="text-center mb-20 scroll-reveal">
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="modern-card card-hover-modern scroll-reveal w-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-8">
                  <div className="flex-shrink-0">
                  <div className="feature-icon-modern w-20 h-20 flex items-center justify-center">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 text-shadow-modern">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="relative h-2 bg-orange-100/50 rounded-full overflow-hidden flex-1 mr-4">
                        <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full animate-shimmer" style={{ width: '85%' }}></div>
                      </div>
                      
                      <div className="glass-card px-3 py-1 rounded-full">
                        <span className="text-sm font-bold text-orange-600">
                          {feature.stats}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Use Cases */}
        <div className="mt-20 scroll-reveal">
          <div className="gradient-orange-modern rounded-3xl p-12 max-w-4xl mx-auto text-white shadow-orange-modern">
            <h3 className="text-3xl font-bold text-center mb-12 text-shadow-modern">Perfect For Every Career Stage</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-modern rounded-2xl flex items-center justify-center mx-auto mb-4 hover-lift-modern">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2">New Graduates</h4>
                <p className="text-orange-100">Launch your career with entry-level opportunities</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-modern rounded-2xl flex items-center justify-center mx-auto mb-4 hover-lift-modern">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2">Career Changers</h4>
                <p className="text-orange-100">Transition to new industries and roles seamlessly</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-modern rounded-2xl flex items-center justify-center mx-auto mb-4 hover-lift-modern">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2">Senior Professionals</h4>
                <p className="text-orange-100">Find executive and leadership opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;