import React from 'react';
import { Users, Award, Clock, Target, Lightbulb, Rocket, Shield, Zap } from 'lucide-react';

const About = () => {
  const timelineItems = [
    {
      year: '2018',
      title: 'Company Founded',
      description: 'Started with a vision to revolutionize web development',
      icon: Rocket
    },
    {
      year: '2019',
      title: 'First Major Client',
      description: 'Delivered our first enterprise-level solution',
      icon: Target
    },
    {
      year: '2020',
      title: 'Team Expansion',
      description: 'Grew to a team of 25+ talented developers',
      icon: Users
    },
    {
      year: '2021',
      title: 'Innovation Award',
      description: 'Recognized for outstanding web innovation',
      icon: Award
    },
    {
      year: '2022',
      title: 'Global Reach',
      description: 'Expanded services to international markets',
      icon: Lightbulb
    },
    {
      year: '2023',
      title: 'AI Integration',
      description: 'Pioneered AI-powered web solutions',
      icon: Zap
    }
  ];

  const stats = [
    { number: '500+', label: 'Projects Completed', icon: Target },
    { number: '150+', label: 'Happy Clients', icon: Users },
    { number: '5+', label: 'Years Experience', icon: Clock },
    { number: '99%', label: 'Success Rate', icon: Award }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 fire-grid relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-fire-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-highlight/5 rounded-full blur-3xl animate-fire-pulse delay-1000"></div>
      </div>

      {/* Floating embers */}
      <div className="floating-embers">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="ember"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 scroll-animate">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-4">
              <Shield className="w-12 h-12 text-primary animate-spin-slow" />
              <Lightbulb className="w-8 h-8 text-highlight animate-ember-float" />
              <Users className="w-10 h-10 text-secondary animate-wiggle" />
            </div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="gradient-text">
              About Our Journey
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed">
            We are <span className="text-primary">passionate creators</span> dedicated to 
            <span className="text-highlight"> transforming ideas</span> into 
            <span className="text-secondary"> extraordinary digital experiences</span>
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className="text-center flame-card rounded-2xl p-6 hover:scale-105 transition-all duration-500 glow-border tilt-card scroll-animate"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-highlight rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/50 morph-shape">
                  <Icon className="w-8 h-8 text-white animate-flame-dance" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Interactive Timeline */}
        <div className="max-w-4xl mx-auto scroll-animate">
          <h3 className="text-3xl font-bold text-center mb-12 gradient-text">Our Timeline</h3>
          <div className="timeline">
            {timelineItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index}
                  className="timeline-item scroll-animate"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flame-card rounded-2xl p-6 hover:scale-105 transition-all duration-500 glow-border tilt-card">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-highlight rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-primary/50">
                        <Icon className="w-6 h-6 text-white animate-flame-dance" />
                      </div>
                      <div className="text-2xl font-bold text-primary">{item.year}</div>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="text-center mt-20 scroll-animate">
          <div className="max-w-4xl mx-auto flame-card rounded-3xl p-12 glow-border">
            <h3 className="text-3xl font-bold mb-6 gradient-text">Our Mission</h3>
            <p className="text-xl text-gray-300 leading-relaxed">
              To <span className="text-primary">ignite digital transformation</span> by creating 
              <span className="text-highlight"> innovative web solutions</span> that not only meet but 
              <span className="text-secondary"> exceed expectations</span>, helping businesses thrive in the digital age.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;