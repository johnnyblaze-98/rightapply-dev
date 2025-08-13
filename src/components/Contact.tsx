import React from 'react';
import { Mail, Phone } from 'lucide-react';

const Contact = () => (
  <section
    id="contact"
    className="py-24 section-bg-modern relative overflow-hidden bg-red-50"
  >
    {/* Debugging border applied above; remove `bg-red-50` when fixed */}

    {/* Background Pattern */}
    <div className="absolute inset-0 pattern-grid-modern opacity-30"></div>

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-orange-25/40 via-transparent to-orange-50/30"></div>

    <div className="container-modern relative z-10">
      {/* Heading */}
      <div className="text-center mb-20 scroll-reveal">
        <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          <span className="modern-gradient-text animate-gradient">
            Get Started Today
          </span>
        </h2>

        <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed text-shadow-modern">
          Ready to <span className="text-orange-600 font-semibold">transform your career</span>? 
          Let's discuss how <span className="text-orange-500 font-semibold"> RightApply</span> 
          can help you find your <span className="text-orange-700 font-semibold">perfect job match</span>.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="max-w-6xl mx-auto">
        <div className="max-w-4xl mx-auto scroll-reveal">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Email Card */}
            <div className="modern-card card-hover-modern group">
              <div className="text-center">
                <div className="feature-icon-modern w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 text-shadow-modern mb-3">
                  Email Us
                </h4>
                <p className="text-gray-600 mb-6 text-lg">
                  Get in touch via email for inquiries and support
                </p>
                <div className="glass-card px-6 py-3 rounded-full inline-block">
                  <a
                    href="mailto:hello@rightapply.ai"
                    className="text-orange-600 font-bold text-lg hover:text-orange-700 transition-colors duration-300"
                  >
                    hello@rightapply.ai
                  </a>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="modern-card card-hover-modern group">
              <div className="text-center">
                <div className="feature-icon-modern w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 text-shadow-modern mb-3">
                  Call Us
                </h4>
                <p className="text-gray-600 mb-6 text-lg">Speak directly with us</p>
                <div className="glass-card px-6 py-3 rounded-full inline-block">
                  <a href="tel:+13213239936" className="text-orange-600 font-bold text-lg hover:text-orange-700 transition-colors duration-300">
                    +1 (321) 323-5536
                  </a>
                </div>
                <div className="glass-card px-6 py-3 rounded-full inline-block">
                  <a href="tel:+918977633636" className="text-orange-600 font-bold text-lg hover:text-orange-700 transition-colors duration-300">
                    +91 (897) 763-3636
                  </a>
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
