// RegistrationPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Mail, Briefcase, GraduationCap, Globe, FileText,
  CheckCircle, ArrowRight, Building, Award, Target, Users,
  PlusCircle, Trash2, CheckCircle2, ShieldCheck, Sparkles,
  Linkedin, Twitter, Github
} from 'lucide-react';
import './RegistrationPage.css';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import CustomCursor from '../../layouts/CustomCursor';

/* ---------- Shared (hoisted) UI components to prevent remount/focus loss ---------- */
const FormSection = React.memo(function FormSection({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  return (
    <div className="registration-glass-card">
      <div className="flex items-center mb-6 border-b border-white/10 pb-4">
        <div className="section-icon-wrapper mr-4">
          <Icon className="w-6 h-6 text-teal-400" />
        </div>
        <h3 className="text-xl md:text-2xl registration-heading">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">{children}</div>
    </div>
  );
});

const FormField = React.memo(function FormField({
  label, name, type = 'text', required = false, options = null, placeholder = '', className = '',
  value, error, onChange,
}: {
  label: string; name: string; type?: string; required?: boolean; options?: string[] | null; placeholder?: string;
  className?: string; value?: any; error?: string; onChange?: (e: any) => void;
}) {
  return (
    <div className={className}>
      <label className="registration-label">
        {label} {required && <span className="text-teal-400">*</span>}
      </label>

      {options ? (
        <select
          name={name}
          value={value ?? ''}
          onChange={onChange}
          className={`registration-input ${error ? 'border-red-500' : ''}`}
        >
          <option value="" className="text-gray-800">Select {label}</option>
          {options.map((o) => <option key={o} value={o} className="text-gray-800">{o}</option>)}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          name={name}
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
          className={`registration-input resize-none ${error ? 'border-red-500' : ''}`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
          className={`registration-input ${error ? 'border-red-500' : ''}`}
        />
      )}

      {error && <p className="text-red-500 text-sm mt-1.5 flex items-center font-medium"><span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></span>{error}</p>}
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
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // Compact chip selector, max 3
  const handleSectorToggle = (sector: string) => {
    setFormData(prev => {
      const set = new Set(prev.sectors);
      if (set.has(sector as never)) set.delete(sector as never);
      else if (set.size < 3) set.add(sector as never);
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

  const removeClient = (index: number) => {
    setFormData(prev => ({ ...prev, clients: prev.clients.filter((_, i) => i !== index) }));
  };

  const handleClientChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const clients = [...prev.clients];
      (clients[index] as any)[field] = value;
      return { ...prev, clients };
    });
  };

  const validateForm = () => {
    const newErrors: any = {};
    const required = [
      'preferredName', 'resumeEmail', 'resumePhone', 'resumeEmailPassword',
      'personalPhone', 'fullAddress', 'currentVisaStatus', 'legalName', 'signedDate',
    ];
    required.forEach(field => {
      const f = field as keyof typeof formData;
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
  const sanitizePayload = (data: any) => {
    const sanitized = { ...data };
    Object.keys(sanitized).forEach(key => {
      if (sanitized[key] === '' || (Array.isArray(sanitized[key]) && sanitized[key].length === 0)) {
        delete sanitized[key];
      }
    });
    return sanitized;
  };

  // Fetch with timeout and proper CORS handling
  const postWithTimeout = async (url: string, options: any = {}, ms = 15000) => {
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
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - please check your internet connection and try again');
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
          'Idempotency-Key': (crypto as any)?.randomUUID?.() || String(Date.now())
        },
        body: JSON.stringify(payload),
      }, 15000);

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries((response.headers as any).entries()));

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
    } catch (error: any) {
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
    <>
      <CustomCursor />
      <Header />
      <div className="registration-page">
        {/* Background */}
        <div className="registration-bg-pattern" />
        <div className="registration-glow-top-left" />
        <div className="registration-glow-bottom-right" />

        <div className="container mx-auto px-4 py-12 relative z-10 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-10">
              <div className="h-14 md:h-16 transition-all duration-300">
                <img src="/logo.png" alt="RightApply Logo" className="h-full w-auto object-contain" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl mb-4 registration-gradient-text tracking-tight">
              Start Your AI-Optimized, Human-Driven Journey
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Complete the form below to let our AI perfect your resume and our experts handle your applications.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <FormSection title="Personal Information" icon={User}>
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
            <FormSection title="Contact Information" icon={Mail}>
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
                <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5 shadow-sm shadow-teal-500/5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-white p-2 rounded-xl shadow-sm border border-teal-50">
                      <ShieldCheck className="h-6 w-6 text-teal-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-base font-bold text-gray-900 leading-tight">Security Notice</h3>
                      <div className="mt-1.5 text-sm text-gray-600 leading-relaxed">
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

            {/* Work Experience */}
            <FormSection title="Work Experience" icon={Briefcase}>
              <div className="md:col-span-2 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">
                    Select up to <span className="text-teal-600">3</span> sectors
                  </p>
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">{formData.sectors.length}/3 selected</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SECTORS.map((sec) => {
                    const active = formData.sectors.includes(sec as never);
                    return (
                      <button
                        key={sec}
                        type="button"
                        onClick={() => handleSectorToggle(sec)}
                        className={`sector-chip ${active ? 'active' : ''}`}
                        aria-pressed={active}
                      >
                        {active && <CheckCircle2 className="w-4 h-4 mr-1 inline" />}
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
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm font-semibold text-white/80 disabled:opacity-50 transition-colors"
                    title="Add another client (max 3)"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Add client
                  </button>
                </div>

                {formData.clients.map((c, idx) => (
                  <div key={idx} className="border border-gray-200 bg-gray-50/30 rounded-2xl p-4 md:p-6 transition-all hover:bg-white hover:shadow-lg hover:shadow-teal-500/5 hover:border-teal-100 group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-teal-50 border border-teal-100 group-hover:bg-teal-600 group-hover:text-white transition-all">
                          <Building className="w-5 h-5 text-teal-600 group-hover:text-white" />
                        </div>
                        <span className="text-sm md:text-base font-bold text-gray-900 tracking-tight">{idx + 1}. Client Experience</span>
                      </div>
                      {formData.clients.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeClient(idx)}
                          className="p-2.5 rounded-xl hover:bg-red-50 text-red-400 hover:text-red-500 transition-all border border-transparent hover:border-red-100"
                          title="Remove this client"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Client</label>
                        <input
                          type="text"
                          value={c.clientName}
                          onChange={(e) => handleClientChange(idx, 'clientName', e.target.value)}
                          placeholder="Client name"
                          className="registration-input"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Role</label>
                        <input
                          type="text"
                          value={c.role}
                          onChange={(e) => handleClientChange(idx, 'role', e.target.value)}
                          placeholder="Your role"
                          className="registration-input"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Start Date</label>
                        <input
                          type="date"
                          value={c.startDate}
                          onChange={(e) => handleClientChange(idx, 'startDate', e.target.value)}
                          className="registration-input"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">End Date</label>
                        <input
                          type="date"
                          value={c.endDate}
                          onChange={(e) => handleClientChange(idx, 'endDate', e.target.value)}
                          className="registration-input"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Client Address</label>
                        <input
                          type="text"
                          value={c.clientAddress}
                          onChange={(e) => handleClientChange(idx, 'clientAddress', e.target.value)}
                          placeholder="Street, City, State, ZIP"
                          className="registration-input"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </FormSection>

            {/* Education Summary */}
            <FormSection title="Education Summary" icon={GraduationCap}>
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
            <FormSection title="Visa Details & Availability Information" icon={Globe}>
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
            <FormSection title="Certifications & Achievements" icon={Award}>
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
            <FormSection title="Consent & Signature" icon={FileText}>
              <div className="md:col-span-2 space-y-4">
                <label className="flex items-start gap-4 p-4 rounded-2xl consent-label transition-all cursor-pointer group">
                  <input
                    type="checkbox"
                    name="consentApply"
                    checked={formData.consentApply}
                    onChange={handleInputChange}
                    className="registration-checkbox mt-1"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors leading-relaxed font-medium">
                    I confirm that all the information I have provided is true and accurate to the best of my knowledge. You have my full consent to apply for jobs on my behalf. I also authorize you to access and use my email account, using the credentials I have provided, for the sole purpose of managing job applications and handling career-related communications, including checking and sending emails when necessary.
                  </span>
                </label>
                {errors['consentApply'] && <p className="text-red-500 text-sm font-medium mt-1 flex items-center"><span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></span>{errors['consentApply']}</p>}
                <label className="flex items-start gap-4 p-4 rounded-2xl consent-label transition-all cursor-pointer group">
                  <input
                    type="checkbox"
                    name="consentEmailAccess"
                    checked={formData.consentEmailAccess}
                    onChange={handleInputChange}
                    className="registration-checkbox mt-1"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors leading-relaxed font-medium">
                    I further confirm that I have entered my email password correctly and have disabled two-factor authentication to ensure smooth access for job application purposes.
                  </span>
                </label>
                {errors['consentEmailAccess'] && <p className="text-red-500 text-sm font-medium mt-1 flex items-center"><span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></span>{errors['consentEmailAccess']}</p>}
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
                className="registration-submit-btn inline-flex items-center justify-center space-x-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    <span>Submit for Expert Review</span>
                    <ArrowRight className="w-6 h-6" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegistrationPage;
