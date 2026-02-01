import { useState, useCallback, ChangeEvent, FormEvent, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Upload, Sparkles, Brain, Target,
  TrendingUp, Zap, ArrowRight
} from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  targetRole: string;
  targetIndustry: string;
  experienceLevel: string;
  keySkills: string;
  additionalInfo: string;
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string;
}

const ResumeAIForm = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    targetRole: '',
    targetIndustry: '',
    experienceLevel: '',
    keySkills: '',
    additionalInfo: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const { [name]: removed, ...rest } = prev;
        return rest;
      });
    }
  }, [errors]);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type.includes('document'))) {
      setUploadedFile(file);
      setErrors(prev => {
        const { resume: removed, ...rest } = prev;
        return rest;
      });
    } else {
      setErrors(prev => ({ ...prev, resume: 'Please upload a PDF or Word document' }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    const required: (keyof FormData)[] = ['fullName', 'email', 'targetRole', 'experienceLevel'];

    required.forEach(field => {
      if (!formData[field]?.trim()) {
        newErrors[field] = 'This field is required';
      }
    });

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!uploadedFile) {
      newErrors.resume = 'Please upload your current resume';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      navigate('/resume-ai/results', {
        state: {
          formData,
          fileName: uploadedFile?.name
        }
      });
    } catch (error) {
      alert('Processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const FormField = memo(({ label, name, type = 'text', required = false, options = null, placeholder = '', className = '' }: {
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    options?: string[] | null;
    placeholder?: string;
    className?: string;
  }) => (
    <div className={className}>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {options ? (
        <select
          name={name}
          value={formData[name] || ''}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition ${errors[name] ? 'border-red-500' : 'border-gray-200'
            }`}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          name={name}
          value={formData[name] || ''}
          onChange={handleInputChange}
          placeholder={placeholder}
          rows={4}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition resize-none ${errors[name] ? 'border-red-500' : 'border-gray-200'
            }`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name] || ''}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition ${errors[name] ? 'border-red-500' : 'border-gray-200'
            }`}
        />
      )}
      {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
    </div>
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-100 relative overflow-hidden py-10 md:py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(20,184,166,0.15)_1px,transparent_0)] bg-[length:20px_20px]" />

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-24 md:w-32 h-24 md:h-32 bg-teal-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 md:w-40 h-32 md:h-40 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />

      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="h-10 md:h-16 w-48 md:w-64 flex items-center justify-center group hover:scale-105 transition-all duration-300">
              <img src="/logo.png" alt="RightApply Logo" className="h-full w-auto object-contain" onError={(e) => {
                e.currentTarget.style.display = 'none';
                const svg = `
                  <div class="flex items-center space-x-3">
                    <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="md:w-12 md:h-12">
                      <rect x="12" y="8" width="24" height="32" rx="3" fill="rgba(20, 184, 166, 0.1)" stroke="#14b8a6" strokeWidth="2"/>
                      <rect x="18" y="4" width="12" height="8" rx="2" fill="#14b8a6"/>
                      <rect x="20" y="6" width="8" height="4" rx="1" fill="white"/>
                      <path d="M18 22L22 26L30 18" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span class="text-xl md:text-2xl font-bold text-teal-600">Rightapply.ai</span>
                  </div>
                `;
                e.currentTarget.parentElement!.insertAdjacentHTML('beforeend', svg);
              }} />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            AI Resume Optimizer
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Transform your resume with <span className="text-teal-600 font-semibold">AI-powered optimization</span>.
            Get personalized recommendations to <span className="text-blue-500 font-semibold">maximize your job search success</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-teal-100 shadow-sm shadow-teal-500/5">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
              <Brain className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">AI Analysis</h3>
            <p className="text-gray-600 text-sm">Advanced AI analyzes your resume against industry standards</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-blue-100 shadow-sm shadow-blue-500/5">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Targeted Optimization</h3>
            <p className="text-gray-600 text-sm">Customized recommendations for your target role</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-indigo-100 shadow-sm shadow-indigo-500/5">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Higher Success Rate</h3>
            <p className="text-gray-600 text-sm">Increase your interview chances by up to 3x</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Resume Upload Section */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mr-3">
                <Upload className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">Upload Your Resume</h3>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-teal-400 transition-colors">
              <input
                type="file"
                id="resume-upload"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-600" />
                </div>
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  {uploadedFile ? uploadedFile.name : 'Click to upload your resume'}
                </p>
                <p className="text-gray-500">PDF, DOC, or DOCX files only</p>
              </label>
            </div>
            {errors.resume && <p className="text-red-500 text-sm mt-2">{errors.resume}</p>}
          </div>

          {/* Personal Information */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-3">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">Personal Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Full Name" name="fullName" required placeholder="Enter your full name" />
              <FormField label="Email Address" name="email" type="email" required placeholder="your.email@example.com" />
              <FormField label="Phone Number" name="phone" type="tel" placeholder="+1 (555) 123-4567" />
              <FormField label="Target Role" name="targetRole" required placeholder="e.g., Senior Software Engineer" />
            </div>
          </div>

          {/* Job Preferences */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">Job Preferences</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Target Industry"
                name="targetIndustry"
                placeholder="e.g., Technology, Healthcare, Finance"
              />
              <FormField
                label="Experience Level"
                name="experienceLevel"
                required
                options={['Entry Level (0-2 years)', 'Mid Level (3-5 years)', 'Senior Level (6-10 years)', 'Executive Level (10+ years)']}
              />
              <FormField
                label="Key Skills"
                name="keySkills"
                placeholder="e.g., Python, React, Project Management"
                className="md:col-span-2"
              />
              <FormField
                label="Additional Information"
                name="additionalInfo"
                type="textarea"
                placeholder="Any specific requirements or preferences for your resume optimization..."
                className="md:col-span-2"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={isProcessing}
              className="inline-flex items-center justify-center space-x-3 text-lg md:text-xl font-bold py-4 px-8 md:px-12 bg-gradient-to-r from-teal-500 to-indigo-600 text-white rounded-xl hover:from-teal-600 hover:to-indigo-700 hover:shadow-2xl hover:shadow-indigo-500/25 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
                  <span>Optimizing Resume...</span>
                </>
              ) : (
                <>
                  <Zap className="w-6 h-6" />
                  <span>Optimize My Resume</span>
                  <ArrowRight className="w-6 h-6" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumeAIForm;