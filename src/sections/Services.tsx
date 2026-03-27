import React from 'react';
import { Code, Palette, Smartphone, Search, Shield, Zap, Globe, Database } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom web applications built with cutting-edge technologies and modern frameworks for optimal performance.",
      features: ["React & Next.js", "Node.js Backend", "API Integration", "Database Design"],
      gradient: "from-primary to-highlight"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Stunning user interfaces and seamless user experiences that captivate and convert your audience.",
      features: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
      gradient: "from-highlight to-secondary"
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
      features: ["iOS & Android", "React Native", "Flutter", "App Store Optimization"],
      gradient: "from-secondary to-primary"
    },
    {
      icon: Search,
      title: "SEO Optimization",
      description: "Boost your online visibility and drive organic traffic with our comprehensive SEO strategies.",
      features: ["Keyword Research", "On-page SEO", "Technical SEO", "Analytics"],
      gradient: "from-primary to-secondary"
    },
    {
      icon: Shield,
      title: "Security Solutions",
      description: "Protect your digital assets with robust security measures and best practices implementation.",
      features: ["SSL Certificates", "Data Encryption", "Security Audits", "Compliance"],
      gradient: "from-highlight to-primary"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Lightning-fast websites and applications optimized for speed, efficiency, and user satisfaction.",
      features: ["Speed Optimization", "Caching", "CDN Setup", "Monitoring"],
      gradient: "from-secondary to-highlight"
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 fire-grid relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-fire-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-highlight/10 rounded-full blur-3xl animate-fire-pulse delay-1000"></div>
      </div>
      
      {/* Floating heat waves */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-sunlight-beam"
            style={{
              top: `${10 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 scroll-animate">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-4">
              <Globe className="w-12 h-12 text-primary animate-spin-slow" />
              <Database className="w-8 h-8 text-highlight animate-ember-float" />
              <Code className="w-10 h-10 text-secondary animate-wiggle" />
            </div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="gradient-text">
              Our Services
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed">
            Comprehensive <span className="text-primary">digital solutions</span> tailored to 
            <span className="text-highlight"> elevate your business</span> and 
            <span className="text-secondary"> drive success</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className="flip-card scroll-animate"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flip-card-inner">
                  {/* Front of card */}
                  <div className="flip-card-front flame-card glow-border">
                    <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-primary/50 morph-shape`}>
                      <Icon className="w-10 h-10 text-white animate-flame-dance" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-300 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Back of card */}
                  <div className="flip-card-back bg-gradient-to-br from-primary/20 to-highlight/20 border border-primary/30 backdrop-blur-lg">
                    <h4 className="text-xl font-bold text-white mb-6">Key Features</h4>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-300">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3 animate-spark"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className="mt-6 fire-button text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 ripple">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;