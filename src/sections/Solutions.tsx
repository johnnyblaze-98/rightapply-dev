import React from 'react';
import { BarChart3, Users, Cog, Shield, TrendingUp, Zap, Brain, Target } from 'lucide-react';

const Solutions = () => {
  const solutions = [
    {
      icon: BarChart3,
      title: "Business Intelligence",
      description: "Transform raw data into actionable insights with advanced analytics and visualization tools that drive strategic decision-making.",
      features: ["Real-time Dashboards", "Custom Reports", "Predictive Analytics", "Data Mining"],
      gradient: "from-primary to-secondary",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
    },
    {
      icon: Users,
      title: "Customer Intelligence",
      description: "Understand customer behavior patterns and preferences to deliver personalized experiences and improve satisfaction.",
      features: ["Behavior Analysis", "Segmentation", "Personalization", "Churn Prediction"],
      gradient: "from-ai-blue to-ai-purple",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
    },
    {
      icon: Cog,
      title: "Process Automation",
      description: "Streamline operations with intelligent automation that reduces costs, eliminates errors, and accelerates workflows.",
      features: ["Workflow Automation", "Document Processing", "Quality Control", "Resource Optimization"],
      gradient: "from-ai-purple to-ai-pink",
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Proactively identify and mitigate risks with AI-powered threat detection and compliance monitoring systems.",
      features: ["Fraud Detection", "Compliance Monitoring", "Risk Assessment", "Security Analytics"],
      gradient: "from-secondary to-primary",
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
    }
  ];

  return (
    <section id="solutions" className="py-24 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 ai-grid relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-ai-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-ai-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 scroll-reveal">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-4">
              <Brain className="w-12 h-12 text-primary animate-neural-network" />
              <Target className="w-8 h-8 text-secondary animate-ai-pulse" />
              <Zap className="w-10 h-10 text-ai-blue animate-data-flow" />
            </div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="ai-text">
              AI Solutions
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed">
            Comprehensive <span className="text-primary">AI-powered solutions</span> designed to 
            <span className="text-secondary"> optimize operations</span> and drive 
            <span className="text-ai-blue"> sustainable growth</span> across industries
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div 
                key={index}
                className="glass-card rounded-3xl overflow-hidden interactive-hover scroll-reveal"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Floating Icon */}
                  <div className="absolute top-6 right-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${solution.gradient} rounded-2xl flex items-center justify-center floating-3d shadow-2xl`}>
                      <Icon className="w-8 h-8 text-white animate-neural-network" />
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-white mb-4 ai-text">
                    {solution.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                    {solution.description}
                  </p>
                  
                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {solution.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3 animate-ai-pulse"></div>
                        <span className="text-gray-300 text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Interactive Progress Bar */}
                  <div className="relative h-2 bg-black/20 rounded-full overflow-hidden">
                    <div className={`data-stream h-full bg-gradient-to-r ${solution.gradient.replace('from-', 'from-').replace('to-', 'to-')}/60`}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Industry Applications */}
        <div className="mt-20 scroll-reveal">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold ai-text mb-4">Industry Applications</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our AI solutions are trusted by leading organizations across various industries
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Healthcare", icon: Shield },
              { name: "Finance", icon: TrendingUp },
              { name: "Manufacturing", icon: Cog },
              { name: "Retail", icon: Users }
            ].map((industry, index) => {
              const Icon = industry.icon;
              return (
                <div key={index} className="glass-card rounded-2xl p-6 text-center interactive-hover">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4 floating-3d">
                    <Icon className="w-6 h-6 text-white animate-ai-pulse" />
                  </div>
                  <h4 className="text-white font-semibold">{industry.name}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;