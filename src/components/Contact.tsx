import { Mail, Phone, MessageSquare, MapPin, Send, Zap, Sparkles } from 'lucide-react';

const Contact = () => (
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
        <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-100 rounded-full px-4 py-1.5 mb-6 shadow-sm">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 items-start">

          {/* Contact Details Side */}
          <div className="lg:col-span-2 space-y-6 scroll-reveal">
            {/* Email Card */}
            <div className="modern-card card-hover-modern group !p-6 md:!p-8">
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
            <div className="modern-card card-hover-modern group !p-6 md:!p-8" style={{ animationDelay: '0.1s' }}>
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
            <div className="modern-card card-hover-modern group !p-6 md:!p-8" style={{ animationDelay: '0.2s' }}>
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

          {/* Contact Form Side / Large CTA Side */}
          <div className="md:col-span-2 lg:col-span-3 scroll-reveal" style={{ animationDelay: '0.3s' }}>
            <div className="modern-card !p-8 md:!p-12 relative overflow-hidden bg-white/80 backdrop-blur-md h-full flex flex-col justify-center shadow-xl border-teal-100">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Zap className="w-32 h-32 text-teal-600" />
              </div>

              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-6">Stop Searching. <br />Start <span className="text-teal-600 underline underline-offset-8 decoration-indigo-200 decoration-wavy">Applying</span>.</h3>
              <p className="text-lg lg:text-xl text-gray-600 mb-10 leading-relaxed font-medium">
                Join thousands of professionals who have secured roles at companies like Google, Netflix, and Amazon using our high-speed engine.
              </p>

              <div className="space-y-4">
                <button
                  className="modern-button w-full !py-4 md:!py-6 text-lg md:!text-xl shadow-teal-modern hover:scale-[1.02] transform transition-all duration-300 flex items-center justify-center space-x-4"
                  onClick={() => window.location.href = '/registration'}
                >
                  <Send className="w-5 h-5 md:w-6 md:h-6" />
                  <span>Get Free Career Consultation</span>
                </button>
                <p className="text-center text-gray-400 text-sm font-bold tracking-tight flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-teal-400 mr-2" />
                  No credit card required to start
                </p>
              </div>

              <div className="mt-12 pt-12 border-t border-gray-100 grid grid-cols-2 gap-8">
                <div>
                  <p className="text-3xl font-black text-teal-600 leading-none mb-1">98%</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Satisfaction</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-indigo-600 leading-none mb-1">24h</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Setup Time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
