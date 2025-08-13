import React from 'react';
import { CheckCircle, Star, Users, Award, Clock, Target, Zap, FileText, Search, UserCheck, Shield, Briefcase, TrendingUp, Brain, Lightbulb, Rocket } from 'lucide-react';

const Benefits = () => {
  return (
    <section id="benefits" className="py-24 section-bg-dark-modern relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-dots-modern opacity-20"></div>
      {/* Modern gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/10 via-transparent to-orange-800/5"></div>

      <div className="container-modern relative z-10">
        {/* Why Choose Us Section */}
        <div className="mb-24 scroll-reveal">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-modern"></div>
                <span className="text-green-400 font-semibold text-sm tracking-wider">WHY CHOOSE US?</span>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight text-white text-shadow-modern">
              Experience the RightApply Advantage
            </h2>
            
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Discover what sets us apart and why thousands of professionals trust us with their career transformation journey.
            </p>
          </div>

          {/* Advantage Cards as rows */}
          <div className="flex flex-col gap-8 mb-16">
            {/* Card 1 */}
            <div id="ai-intelligence" className="glass-card-dark rounded-2xl p-8 card-hover-modern">
              <div className="feature-icon-modern w-16 h-16 flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-shadow-modern">AI-Powered Resume optimization</h3>
              <p className="text-gray-300 leading-relaxed">
                Our advanced AI technology analyzes thousands of job opportunities to find the perfect matches for your unique profile and career aspirations by tailoring resume for each job.
              </p>
              <div className="mt-6 flex items-center text-orange-400">
                <TrendingUp className="w-5 h-5 mr-2" />
                <span className="font-semibold">95% Match Accuracy</span>
              </div>
            </div>

            {/* Card 2 */}
            <div id="expert-support" className="glass-card-dark rounded-2xl p-8 card-hover-modern">
              <div className="feature-icon-modern w-16 h-16 flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-shadow-modern">Expert Human Support</h3>
              <p className="text-gray-300 leading-relaxed">
                Combine AI efficiency with human expertise. Our career specialists provide personalized guidance and support throughout your job search journey.
              </p>
              <div className="mt-6 flex items-center text-orange-400">
                <Award className="w-5 h-5 mr-2" />
                <span className="font-semibold">24/7 Support Available</span>
              </div>
            </div>

            {/* Card 3 */}
            <div id="application-engine" className="glass-card-dark rounded-2xl p-8 card-hover-modern">
              <div className="feature-icon-modern w-16 h-16 flex items-center justify-center mb-6">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-shadow-modern">
                High-Volume Applications
              </h3>
              <p className="text-gray-300 leading-relaxed">
                We submit strategic applications at scale while maintaining quality and personalization. We handle the volume so you can focus on preparing for interviews.
              </p>
              <div className="mt-6 flex items-center text-orange-400">
                <TrendingUp className="w-5 h-5 mr-2" />
                <span className="font-semibold">1200+ Job Applications</span>
              </div>
            </div>

            {/* Card 4 */}
            <div id="interview-guidance" className="glass-card-dark rounded-2xl p-8 card-hover-modern">
              <div className="feature-icon-modern w-16 h-16 flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-shadow-modern">
                Interview Guidance
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Get personalized interview coaching and preparation support from our expert career specialists to help you ace every interview with confidence.
              </p>
              <div className="mt-6 flex items-center text-orange-400">
                <Award className="w-5 h-5 mr-2" />
                <span className="font-semibold">98% Interview Success</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;