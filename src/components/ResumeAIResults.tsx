import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  CheckCircle, Download, ArrowLeft, Star, TrendingUp, 
  FileText, Zap, Target, Award, Brain, Sparkles 
} from 'lucide-react';

const ResumeAIResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, fileName } = location.state || {};

  if (!formData) {
    navigate('/resume-ai');
    return null;
  }

  const improvements = [
    {
      category: "Keywords & ATS Optimization",
      score: 92,
      improvements: [
        "Added 15 industry-specific keywords",
        "Optimized for ATS scanning systems",
        "Improved keyword density by 40%"
      ]
    },
    {
      category: "Content Structure",
      score: 88,
      improvements: [
        "Reorganized sections for better flow",
        "Enhanced bullet point formatting",
        "Improved readability score"
      ]
    },
    {
      category: "Impact & Achievements",
      score: 95,
      improvements: [
        "Quantified 8 key achievements",
        "Added measurable results",
        "Strengthened action verbs"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.15)_1px,transparent_0)] bg-[length:20px_20px]" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-orange-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />

      <div className="container mx-auto px-4 py-12 relative z-10 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 flex items-center justify-center">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="12" y="8" width="24" height="32" rx="3" fill="rgba(234, 88, 12, 0.1)" stroke="#EA580C" strokeWidth="2"/>
                <rect x="18" y="4" width="12" height="8" rx="2" fill="#EA580C"/>
                <rect x="20" y="6" width="8" height="4" rx="1" fill="white"/>
                <path d="M18 22L22 26L30 18" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-2xl font-bold">
              <span className="text-orange-600">Rightapply</span>
              <span className="text-blue-500">.ai</span>
            </span>
          </div>

          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Resume Optimization Complete!
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your resume has been <span className="text-orange-600 font-semibold">AI-optimized</span> for 
            <span className="text-blue-500 font-semibold"> {formData.targetRole}</span> positions.
          </p>
        </div>

        {/* Overall Score */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="2"
                  strokeDasharray="92, 100"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-orange-600">92%</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Optimization Score</h3>
            <p className="text-gray-600">Your resume is now highly optimized for ATS systems and recruiters</p>
          </div>
        </div>

        {/* Improvements Breakdown */}
        <div className="space-y-6 mb-8">
          {improvements.map((item, index) => (
            <div key={index} className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-bold text-gray-800">{item.category}</h4>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  <span className="text-orange-600 font-bold">{item.score}%</span>
                </div>
              </div>
              <ul className="space-y-2">
                {item.improvements.map((improvement, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    {improvement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Download Section */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8 text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Download className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Download Your Optimized Resume</h3>
          <p className="text-gray-600 mb-6">
            Your resume has been optimized with industry keywords, improved formatting, and enhanced content structure.
          </p>
          <button className="inline-flex items-center justify-center space-x-3 text-lg font-bold py-4 px-8 bg-gradient-to-r from-orange-500 to-blue-600 text-white rounded-xl hover:from-orange-600 hover:to-blue-700 hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300">
            <Download className="w-6 h-6" />
            <span>Download Optimized Resume</span>
          </button>
        </div>

        {/* Next Steps */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">What's Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Apply Strategically</h4>
              <p className="text-sm text-gray-600">Use your optimized resume to apply for targeted positions</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Interview Prep</h4>
              <p className="text-sm text-gray-600">Prepare for interviews based on your enhanced profile</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Track Progress</h4>
              <p className="text-sm text-gray-600">Monitor your application success rate</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/resume-ai')}
            className="inline-flex items-center justify-center space-x-3 text-lg font-bold py-4 px-8 bg-white text-gray-700 rounded-xl border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-300"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Optimize Another Resume</span>
          </button>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center space-x-3 text-lg font-bold py-4 px-8 bg-gradient-to-r from-orange-500 to-blue-600 text-white rounded-xl hover:from-orange-600 hover:to-blue-700 hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300"
          >
            <Sparkles className="w-6 h-6" />
            <span>Explore More Services</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeAIResults;