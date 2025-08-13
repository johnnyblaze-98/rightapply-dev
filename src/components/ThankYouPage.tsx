import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Target, Users, Brain, Sparkles } from 'lucide-react';

const ThankYouPage = () => {
  const location = useLocation();
  const [name, setName] = useState('there');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const nameParam = searchParams.get('name');
    setName(nameParam || 'there');
  }, [location.search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-orange-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-200/20 rounded-full blur-2xl animate-pulse"></div>

      <div className="container mx-auto px-4 py-12 relative z-10 max-w-3xl">
        {/* Success Header */}
        <div className="text-center mb-12">
          {/* Success Icon */}
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            {/* Sparkle effects */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-400 rounded-full animate-ping opacity-75"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-75"></div>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 flex items-center justify-center">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="12" y="8" width="24" height="32" rx="3" fill="rgba(234, 88, 12, 0.1)" stroke="#EA580C" strokeWidth="2"/>
                <rect x="18" y="4" width="12" height="8" rx="2" fill="#EA580C"/>
                <rect x="20" y="6" width="8" height="4" rx="1" fill="white"/>
                <path d="M18 22L22 26L30 18" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <span className="text-2xl font-bold">
                <span className="text-orange-600">Rightapply</span>
                <span className="text-blue-500">.ai</span>
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome aboard, {name}! 🎉
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Thank you for joining <span className="text-orange-600 font-semibold">Rightapply.ai</span>. 
            We're excited to help you discover your <span className="text-blue-500 font-semibold">perfect career match</span>.
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Your Journey Starts Now
          </h2>
          
          <div className="space-y-6">
            {/* Benefit 1 */}
            <div className="flex items-start space-x-4 p-6 bg-white/60 rounded-2xl border border-orange-100">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">AI-aligned resume guidance</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get personalized recommendations to optimize your resume for each application. 
                  Our AI analyzes job requirements and tailors your profile to match perfectly.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="flex items-start space-x-4 p-6 bg-white/60 rounded-2xl border border-blue-100">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Target className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Targeted job recommendations</h3>
                <p className="text-gray-600 leading-relaxed">
                  Receive curated job opportunities that match your skills, experience, and career goals. 
                  No more sifting through irrelevant listings.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="flex items-start space-x-4 p-6 bg-white/60 rounded-2xl border border-indigo-100">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Interview prep nudges</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get timely reminders and resources to help you ace your interviews. 
                  Practice questions, company insights, and confidence-building tips.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-orange-500 animate-pulse" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">What Happens Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 font-bold text-lg">1</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Profile Analysis</h4>
              <p className="text-sm text-gray-600">We'll analyze your background and preferences</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold text-lg">2</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Job Matching</h4>
              <p className="text-sm text-gray-600">Our AI will find the best opportunities for you</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold text-lg">3</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Get Hired</h4>
              <p className="text-sm text-gray-600">Land your dream job with our support</p>
            </div>
          </div>
          <p className="text-gray-600 mb-8">
            We'll be in touch soon with your personalized job recommendations and next steps.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <a
            href="/"
            className="inline-flex items-center justify-center space-x-3 text-lg font-bold py-4 px-8 bg-gradient-to-r from-orange-500 to-blue-600 text-white rounded-xl hover:from-orange-600 hover:to-blue-700 hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Back to Home</span>
          </a>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-lg">
            Ready to transform your career? Your journey to the perfect job starts now! 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;