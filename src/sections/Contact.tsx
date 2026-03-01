import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, MapPin, Zap, Sparkles, User, Briefcase, ChevronRight } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    role: '',
    goals: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare WhatsApp message template
    const whatsappNumber = '919666534599';
    const message = `*New Career Consultation Request*
--------------------------------
*Name:* ${formState.name}
*Email:* ${formState.email}
*Role:* ${formState.role}
*Goals:* ${formState.goals}
--------------------------------
_Sent from RightApply.ai_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Simulate API call/loading then redirect
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Redirect to WhatsApp
      window.open(whatsappUrl, '_blank');

      setFormState({ name: '', email: '', role: '', goals: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1200);
  };

  return (
    <section
      id="contact"
      className="py-24 section-bg-modern relative overflow-hidden"
    >
      {/* Background Patterns */}
      <div className="absolute inset-0 pattern-grid-modern opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent"></div>

      {/* Decorative Blurs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-100/30 rounded-full blur-[120px]"></div>

      <div className="container-modern relative z-10">
        {/* Heading */}
        <div className="text-center mb-24 scroll-reveal">
          <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-200 rounded-full px-4 py-1.5 mb-6 shadow-sm">
            <MessageSquare className="w-4 h-4 text-teal-600" />
            <span className="text-teal-700 text-xs font-bold tracking-widest uppercase">Contact Us</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight text-gray-900">
            Ready to Start Your <br />
            <span className="modern-gradient-text animate-gradient pb-2">Career Revolution?</span>
          </h2>

          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed px-4">
            The fastest way to your next role starts with a single conversation. <span className="text-teal-600 font-bold">RightApply</span> combines AI intelligence with human execution.
          </p>
        </div>

        {/* Main Layout */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 items-stretch">

            {/* Contact Details Side */}
            <div className="lg:col-span-2 space-y-6 scroll-reveal flex flex-col">
              {/* Email Card */}
              <div className="modern-card card-hover-modern group !p-6 md:!p-8 flex-1">
                <div className="flex items-center space-x-4 md:space-x-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-teal-500 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform shadow-lg shadow-teal-500/20">
                    <Mail className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-1">Email Support</h4>
                    <p className="text-gray-500 text-xs md:text-sm mb-2">Typically replies in 2 hours</p>
                    <a href="mailto:hello@rightapply.ai" className="text-teal-600 font-black text-base md:text-lg hover:text-indigo-600 transition-colors">hello@rightapply.ai</a>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="modern-card card-hover-modern group !p-6 md:!p-8 flex-1" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center space-x-4 md:space-x-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-indigo-500 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:-rotate-6 transition-transform shadow-lg shadow-indigo-500/20">
                    <Phone className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">Call Our Experts</h4>
                    <p className="text-gray-500 text-sm mb-2">Mon - Fri: 9am - 6pm EST</p>
                    <div className="space-y-1">
                      <a href="tel:+13213235536" className="block text-gray-900 font-bold text-base hover:text-teal-600 transition-colors">+1 (945) 381-4899</a>
                      <a href="tel:+918977633636" className="block text-gray-900 font-bold text-base hover:text-teal-600 transition-colors">+91 8977633636</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="modern-card card-hover-modern group !p-6 md:!p-8 flex-1" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center space-x-4 md:space-x-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-violet-500 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-violet-500/20">
                    <MapPin className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">Our Headquarters</h4>
                    <p className="text-gray-500 text-sm mb-1 text-balance">Innovation Hub, Tech Park <br />Global City, DE 19808</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Side / Advanced Form */}
            <div className="md:col-span-2 lg:col-span-3 scroll-reveal" style={{ animationDelay: '0.3s' }}>
              <div className="modern-card !p-8 md:!p-10 relative overflow-hidden bg-white/90 backdrop-blur-xl h-full shadow-2xl border-teal-100/50">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black text-gray-900">Career Consultation</h3>
                      <p className="text-gray-500 font-bold text-sm tracking-tight">Free 15-minute strategy session with an expert</p>
                    </div>
                    <div className="hidden sm:flex w-12 h-12 bg-teal-50 rounded-full items-center justify-center">
                      <Zap className="w-6 h-6 text-teal-600 animate-pulse" />
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            required
                            placeholder="John"
                            className="form-input-modern w-full !pl-11 !py-3.5 !bg-gray-50/50"
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="email"
                            required
                            placeholder="john@example.com"
                            className="form-input-modern w-full !pl-11 !py-3.5 !bg-gray-50/50"
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Current Role / Target Role</label>
                      <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          required
                          placeholder="Senior Product Designer"
                          className="form-input-modern w-full !pl-11 !py-3.5 !bg-gray-50/50"
                          value={formState.role}
                          onChange={(e) => setFormState({ ...formState, role: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Your Career Goals</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Tell us about the roles or companies you're targeting..."
                        className="form-input-modern w-full !py-3.5 !px-5 !bg-gray-50/50 min-h-[100px] resize-none"
                        value={formState.goals}
                        onChange={(e) => setFormState({ ...formState, goals: e.target.value })}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || isSuccess}
                      className={`modern-button w-full !py-4 text-base font-bold flex items-center justify-center space-x-2 shadow-teal-modern transition-all duration-300 ${isSuccess ? '!bg-teal-500' : ''}`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : isSuccess ? (
                        <>
                          <Sparkles className="w-5 h-5 text-white" />
                          <span>Request Received!</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Consultation Request</span>
                          <ChevronRight className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      <Sparkles className="w-3 h-3 text-teal-400 inline mr-1" />
                      Our strategists respond within 24 hours
                    </p>
                  </form>
                </div>

                {/* Decorative background for the card */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-50 rounded-full blur-3xl opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
