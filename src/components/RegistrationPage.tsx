// RegistrationPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Mail, Briefcase, GraduationCap, Globe, FileText,
  CheckCircle, ArrowRight, Building, Award, Target, Users,
  PlusCircle, Trash2, CheckCircle2, ShieldCheck, Sparkles,
  Linkedin, Twitter, Github
} from 'lucide-react';

/* ---------- Shared (hoisted) UI components to prevent remount/focus loss ---------- */
const FormSection = React.memo(function FormSection({ title, icon: Icon, children, color = 'orange' }) {
  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 md:p-8 mb-8">
      <div className="flex items-center mb-5">
        <div className={`w-10 h-10 ${colorClasses[color] || colorClasses.orange} rounded-xl flex items-center justify-center mr-3`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">{children}</div>
    </div>
  );
});

const FormField = React.memo(function FormField({
  label, name, type = 'text', required = false, options = null, placeholder = '', className = '',
  value, error, onChange,
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {options ? (
        <select
          name={name}
          value={value ?? ''}
          onChange={onChange}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition ${error ? 'border-red-500' : 'border-gray-200'}`}
        >
          <option value="">Select {label}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          name={name}
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition resize-none ${error ? 'border-red-500' : 'border-gray-200'}`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition ${error ? 'border-red-500' : 'border-gray-200'}`}
        />
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

/* ---------- Constants ---------- */
// Tailwind-safe color classes
const colorClasses = {
  orange: 'bg-gradient-to-br from-orange-500 to-orange-600',
  blue: 'bg-gradient-to-br from-blue-500 to-blue-600',
  indigo: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
  green: 'bg-gradient-to-br from-green-500 to-green-600',
  purple: 'bg-gradient-to-br from-purple-500 to-purple-600',
  teal: 'bg-gradient-to-br from-teal-500 to-teal-600',
  pink: 'bg-gradient-to-br from-pink-500 to-pink-600',
  gray: 'bg-gradient-to-br from-gray-500 to-gray-600',
};

const SECTORS = [
  'Technology & Software – Google, Microsoft, Apple',
  'Healthcare & Pharmaceuticals – Pfizer, Johnson & Johnson, UnitedHealth Group',
  'Banking & Financial Services – JPMorgan Chase, Bank of America, Goldman Sachs',
  'Retail & E-commerce – Amazon, Walmart, Target',
  'Manufacturing & Industrial – General Motors, Boeing, 3M',
  'Energy (Oil, Gas, Renewables) – ExxonMobil, Chevron, NextEra Energy',
  'Telecommunications – AT&T, Verizon, T-Mobile',
  'Education & EdTech – Coursera, Chegg, Khan Academy',
  'Transportation & Logistics – FedEx, UPS, Tesla',
  'Media & Entertainment – Netflix, Disney, Warner Bros.',
];

const VISA_OPTIONS = [
  'F-1 Visa', 'F-1 OPT', 'F-1 STEM OPT', 'OPT EAD', 'H-1B Visa', 'H-4 EAD Visa',
  'GC (Green Card - Permanent Residency)', 'GC EAD', 'U.S. Citizenship',
];

/* ---------- Page ---------- */
const RegistrationPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // API configuration
  const API_BASE = import.meta.env.VITE_API_BASE;

  const [formData, setFormData] = useState({
    // Personal Information
    preferredName: '',
    dateOfBirth: '',
    linkedinUrl: '',

    // Contact Information
    resumeEmail: '',
    resumePhone: '',
    resumeEmailPassword: '',
    personalPhone: '',
    fullAddress: '',

    // Work Experience
    sectors: [],
    clients: [{ clientName: '', role: '', startDate: '', endDate: '', clientAddress: '' }], // start with 1

    // Education Summary
    mastersUniversityField: '',
    mastersGraduatedCompleted: '',
    bachelorsUniversityField: '',
    bachelorsGraduatedCompleted: '',

    // Visa Details & Availability
    currentVisaStatus: '',
    arrivalDateUSA: '',

    // Certifications & Achievements
    certificationsAchievements: '',
    preferredMarketingRole: '',

    // Consent & Signature
    consentApply: false,
    consentEmailAccess: false,
    legalName: '',
    signedDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // Compact chip selector, max 3
  const handleSectorToggle = (sector) => {
    setFormData(prev => {
      const set = new Set(prev.sectors);
      if (set.has(sector)) set.delete(sector);
      else if (set.size < 3) set.add(sector);
      return { ...prev, sectors: Array.from(set) };
    });
    if (errors['sectors']) setErrors(prev => ({ ...prev, sectors: '' }));
  };

  // Clients (start with 1, up to 3)
  const addClient = () => {
    setFormData(prev => {
      if (prev.clients.length >= 3) return prev;
      return {
        ...prev,
        clients: [...prev.clients, { clientName: '', role: '', startDate: '', endDate: '', clientAddress: '' }],
      };
    });
  };

  const removeClient = (index) => {
    setFormData(prev => ({ ...prev, clients: prev.clients.filter((_, i) => i !== index) }));
  };

  const handleClientChange = (index, field, value) => {
    setFormData(prev => {
      const clients = [...prev.clients];
      clients[index] = { ...clients[index], [field]: value };
      return { ...prev, clients };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const required = [
      'preferredName', 'resumeEmail', 'resumePhone', 'resumeEmailPassword',
      'personalPhone', 'fullAddress', 'currentVisaStatus', 'legalName', 'signedDate',
    ];
    required.forEach(f => {
      const v = formData[f];
      if (typeof v === 'string' ? !v.trim() : v === undefined) newErrors[f] = 'This field is required';
    });

    if (formData.resumeEmail && !/^\S+@\S+\.\S+$/.test(formData.resumeEmail)) newErrors.resumeEmail = 'Enter a valid email';
    const phoneRx = /^\+?[\d\s\-\(\)]{10,}$/;
    if (formData.resumePhone && !phoneRx.test(formData.resumePhone)) newErrors.resumePhone = 'Enter a valid phone';
    if (formData.personalPhone && !phoneRx.test(formData.personalPhone)) newErrors.personalPhone = 'Enter a valid phone';
    if (formData.linkedinUrl && !formData.linkedinUrl.includes('linkedin.com')) newErrors.linkedinUrl = 'Enter a valid LinkedIn URL';

    if (formData.sectors.length === 0) newErrors.sectors = 'Select up to 3 sectors (at least 1)';
    if (!formData.consentApply) newErrors.consentApply = 'You must confirm to proceed';
    if (!formData.consentEmailAccess) newErrors.consentEmailAccess = 'You must confirm to proceed';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Sanitize payload by removing empty values
  const sanitizePayload = (data) => {
    const sanitized = { ...data };
    Object.keys(sanitized).forEach(key => {
      if (sanitized[key] === '' || (Array.isArray(sanitized[key]) && sanitized[key].length === 0)) {
        delete sanitized[key];
      }
    });
    return sanitized;
  };

  // Fetch with timeout and proper CORS handling
  const postWithTimeout = async (url, options = {}, ms = 15000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), ms);
    
    const defaultOptions = {
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers
      },
      ...options,
      signal: controller.signal
    };
    
    try {
      return await fetch(url, defaultOptions);
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - please check your internet connection and try again');
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (!API_BASE) {
        // For demo purposes, simulate successful submission
        console.log('Demo mode: Registration data would be submitted:', sanitizePayload(formData));
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
        
        // Clear sensitive data from form
        setFormData(prev => ({ ...prev, resumeEmailPassword: '' }));
        
        navigate(`/registration/thank-you?name=${encodeURIComponent(formData.preferredName)}`);
        return;
      }

      const payload = sanitizePayload(formData);
      console.log('Submitting to:', `${API_BASE}/registrations`);
      console.log('Payload:', payload);
      
      const response = await postWithTimeout(`${API_BASE}/registrations`, {
        method: 'POST',
        headers: {
          'Idempotency-Key': crypto?.randomUUID?.() || String(Date.now())
        },
        body: JSON.stringify(payload),
      }, 15000);

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        let errorMessage = `Request failed with status ${response.status}`;
        try {
          const errorBody = await response.text();
          console.log('Error response body:', errorBody);
          const parsedError = JSON.parse(errorBody);
          errorMessage = parsedError?.error || errorMessage;
        } catch (e) {
          console.log('Could not parse error response:', e);
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Registration saved:', data);

      // Clear sensitive data from form
      setFormData(prev => ({ ...prev, resumeEmailPassword: '' }));
      
      navigate(`/registration/thank-you?name=${encodeURIComponent(formData.preferredName)}`);
    } catch (error) {
      console.error('Registration error:', error);
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage = 'Network error - please check your internet connection and try again.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.15)_1px,transparent_0)] bg-[length:20px_20px]" />
      <div className="absolute top-20 left-20 w-32 h-32 bg-orange-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />

      <div className="container mx-auto px-4 py-12 relative z-10 max-w-5xl">
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

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Registration Form
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Please complete the registration form below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <FormSection title="Personal Information" icon={User} color="orange">
            <FormField
              label="Preferred Name on Resume"
              name="preferredName"
              required
              value={formData.preferredName}
              error={errors.preferredName}
              onChange={handleInputChange}
            />
            <FormField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              error={errors.dateOfBirth}
              onChange={handleInputChange}
            />
            <FormField
              label="LinkedIn Profile"
              name="linkedinUrl"
              placeholder="https://linkedin.com/in/yourprofile"
              className="md:col-span-2"
              value={formData.linkedinUrl}
              error={errors.linkedinUrl}
              onChange={handleInputChange}
            />
          </FormSection>

          {/* Contact Information */}
          <FormSection title="Contact Information" icon={Mail} color="blue">
            <FormField
              label="Email Address for Resume"
              name="resumeEmail"
              type="email"
              required
              value={formData.resumeEmail}
              error={errors.resumeEmail}
              onChange={handleInputChange}
            />
            <FormField
              label="Phone Number for Resume"
              name="resumePhone"
              type="tel"
              required
              value={formData.resumePhone}
              error={errors.resumePhone}
              onChange={handleInputChange}
            />
            <FormField
              label="Resume Email Password [please remove 2 factor Authentication]"
              name="resumeEmailPassword"
              type="password"
              required
              placeholder="Enter the password used for resume email"
              className="md:col-span-2"
              value={formData.resumeEmailPassword}
              error={errors.resumeEmailPassword}
              onChange={handleInputChange}
            />
            <div className="md:col-span-2">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Security Notice</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>Your email password will be securely stored using AWS Secrets Manager and encrypted at rest. Please ensure you have disabled two-factor authentication for this email account to allow automated job applications.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <FormField
              label="Personal Phone Number"
              name="personalPhone"
              type="tel"
              required
              value={formData.personalPhone}
              error={errors.personalPhone}
              onChange={handleInputChange}
            />
            <FormField
              label="Full current address"
              name="fullAddress"
              type="textarea"
              required
              className="md:col-span-2"
              value={formData.fullAddress}
              error={errors.fullAddress}
              onChange={handleInputChange}
            />
          </FormSection>

          {/* Work Experience (compact chips + dynamic clients) */}
          <FormSection title="Work Experience" icon={Briefcase} color="indigo">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700 font-semibold">
                  Select up to <span className="text-orange-600">3</span> sectors
                </p>
                <span className="text-xs text-gray-500">{formData.sectors.length}/3 selected</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SECTORS.map((sec) => {
                  const active = formData.sectors.includes(sec);
                  return (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => handleSectorToggle(sec)}
                      className={`inline-flex items-center gap-1 px-3 py-2 rounded-full border text-sm transition
                        ${active ? 'bg-blue-50 border-blue-500 text-blue-700'
                                 : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300'}`}
                      aria-pressed={active}
                    >
                      {active && <CheckCircle2 className="w-4 h-4" />}
                      <span className="whitespace-pre-wrap text-left">{sec}</span>
                    </button>
                  );
                })}
              </div>
              {errors['sectors'] && <p className="text-red-500 text-sm">{errors['sectors']}</p>}
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base md:text-lg font-bold text-gray-800">Client Details</h4>
                <button
                  type="button"
                  onClick={addClient}
                  disabled={formData.clients.length >= 3}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-sm font-semibold disabled:opacity-50"
                  title="Add another client (max 3)"
                >
                  <PlusCircle className="w-4 h-4" />
                  Add client
                </button>
              </div>

              {formData.clients.map((c, idx) => (
                <div key={idx} className="border-2 border-gray-100 rounded-xl p-4 md:p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-100">
                        <Building className="w-5 h-5 text-gray-700" />
                      </div>
                      <span className="text-sm md:text-base font-semibold text-gray-800">{idx + 1}. Client</span>
                    </div>
                    {formData.clients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeClient(idx)}
                        className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                        title="Remove this client"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Client</label>
                      <input
                        type="text"
                        value={c.clientName}
                        onChange={(e) => handleClientChange(idx, 'clientName', e.target.value)}
                        placeholder="Client name"
                        className="w-full px-3 py-2 text-sm border-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 border-gray-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Role</label>
                      <input
                        type="text"
                        value={c.role}
                        onChange={(e) => handleClientChange(idx, 'role', e.target.value)}
                        placeholder="Your role"
                        className="w-full px-3 py-2 text-sm border-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 border-gray-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Start Date</label>
                      <input
                        type="date"
                        value={c.startDate}
                        onChange={(e) => handleClientChange(idx, 'startDate', e.target.value)}
                        className="w-full px-3 py-2 text-sm border-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 border-gray-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">End Date</label>
                      <input
                        type="date"
                        value={c.endDate}
                        onChange={(e) => handleClientChange(idx, 'endDate', e.target.value)}
                        className="w-full px-3 py-2 text-sm border-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 border-gray-200"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Client Address</label>
                      <input
                        type="text"
                        value={c.clientAddress}
                        onChange={(e) => handleClientChange(idx, 'clientAddress', e.target.value)}
                        placeholder="Street, City, State, ZIP"
                        className="w-full px-3 py-2 text-sm border-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 border-gray-200"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FormSection>

          {/* Education Summary */}
          <FormSection title="Education Summary" icon={GraduationCap} color="green">
            <FormField
              label="Masters University & Field of Study"
              name="mastersUniversityField"
              placeholder="e.g., University of X — MS in Data Science"
              value={formData.mastersUniversityField}
              error={errors.mastersUniversityField}
              onChange={handleInputChange}
            />
            <FormField
              label="Graduated/Completed"
              name="mastersGraduatedCompleted"
              placeholder="e.g., May 2024 / Completed"
              value={formData.mastersGraduatedCompleted}
              error={errors.mastersGraduatedCompleted}
              onChange={handleInputChange}
            />
            <FormField
              label="Bachelors University & Field of Study"
              name="bachelorsUniversityField"
              placeholder="e.g., ABC University — B.Tech in CSE"
              value={formData.bachelorsUniversityField}
              error={errors.bachelorsUniversityField}
              onChange={handleInputChange}
            />
            <FormField
              label="Graduated/Completed"
              name="bachelorsGraduatedCompleted"
              placeholder="e.g., May 2020 / Graduated"
              value={formData.bachelorsGraduatedCompleted}
              error={errors.bachelorsGraduatedCompleted}
              onChange={handleInputChange}
            />
          </FormSection>

          {/* Visa Details & Availability */}
          <FormSection title="Visa Details & Availability Information" icon={Globe} color="teal">
            <FormField
              label="Current Visa Status"
              name="currentVisaStatus"
              required
              options={VISA_OPTIONS}
              value={formData.currentVisaStatus}
              error={errors.currentVisaStatus}
              onChange={handleInputChange}
            />
            <FormField
              label="Date of Arrival in the USA"
              name="arrivalDateUSA"
              type="date"
              value={formData.arrivalDateUSA}
              error={errors.arrivalDateUSA}
              onChange={handleInputChange}
            />
          </FormSection>

          {/* Certifications & Achievements */}
          <FormSection title="Certifications & Achievements" icon={Award} color="purple">
            <FormField
              label="Mention any relevant certifications you have"
              name="certificationsAchievements"
              type="textarea"
              className="md:col-span-2"
              value={formData.certificationsAchievements}
              error={errors.certificationsAchievements}
              onChange={handleInputChange}
            />
            <FormField
              label="Preferred Role for Marketing (only one role)"
              name="preferredMarketingRole"
              placeholder="e.g., Data Engineer"
              className="md:col-span-2"
              value={formData.preferredMarketingRole}
              error={errors.preferredMarketingRole}
              onChange={handleInputChange}
            />
          </FormSection>

          {/* Consent & Signature */}
          <FormSection title="Consent & Signature" icon={FileText} color="pink">
            <div className="md:col-span-2 space-y-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="consentApply"
                  checked={formData.consentApply}
                  onChange={handleInputChange}
                  className="mt-1"
                />
                <span className="text-sm text-gray-700">
                  I confirm that all the information I have provided is true and accurate to the best of my knowledge. You have my full consent to apply for jobs on my behalf. I also authorize you to access and use my email account, using the credentials I have provided, for the sole purpose of managing job applications and handling career-related communications, including checking and sending emails when necessary.
                </span>
              </label>
              {errors['consentApply'] && <p className="text-red-500 text-sm">{errors['consentApply']}</p>}
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="consentEmailAccess"
                  checked={formData.consentEmailAccess}
                  onChange={handleInputChange}
                  className="mt-1"
                />
                <span className="text-sm text-gray-700">
                  I further confirm that I have entered my email password correctly and have disabled two-factor authentication to ensure smooth access for job application purposes.
                </span>
              </label>
              {errors['consentEmailAccess'] && <p className="text-red-500 text-sm">{errors['consentEmailAccess']}</p>}
            </div>

            <FormField
              label="Your Legal Name"
              name="legalName"
              required
              value={formData.legalName}
              error={errors.legalName}
              onChange={handleInputChange}
            />
            <FormField
              label="Signed Date"
              name="signedDate"
              type="date"
              required
              value={formData.signedDate}
              error={errors.signedDate}
              onChange={handleInputChange}
            />
          </FormSection>

          {/* Submit */}
          <div className="text-center pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center space-x-3 text-xl font-bold py-4 px-12 bg-gradient-to-r from-orange-500 to-blue-600 text-white rounded-xl hover:from-orange-600 hover:to-blue-700 hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-6 h-6" />
                  <span>Submit</span>
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

export default RegistrationPage;