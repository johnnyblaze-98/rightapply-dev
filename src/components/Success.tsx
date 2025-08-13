import React, { useState } from 'react';
import { Star, Quote, TrendingUp, Users, Award, ChevronLeft, ChevronRight } from 'lucide-react';

const Success = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Software Engineer",
      company: "Google",
      content: "RightApply transformed my career search completely. Within 2 weeks, I landed my dream role at Google with a 40% salary increase. The AI matching was incredibly precise!",
      rating: 5,
      timeToHire: "2 weeks"
    },
    {
      name: "Marcus Rodriguez",
      role: "Product Manager",
      company: "Meta",
      content: "The platform's ability to match me with roles that aligned perfectly with my skills and career goals was remarkable. Every opportunity presented was a perfect fit.",
      rating: 5,
      timeToHire: "3 weeks"
    },
    {
      name: "Emily Johnson",
      role: "Data Scientist",
      company: "Netflix",
      content: "The interview preparation and application optimization features were phenomenal. I felt completely confident and aced every technical round. Highly recommended!",
      rating: 5,
      timeToHire: "1 week"
    },
    {
      name: "David Kim",
      role: "DevOps Engineer",
      company: "Amazon",
      content: "From application to offer letter in just 10 days. The speed and efficiency of this platform is absolutely mind-blowing! Best career decision I ever made.",
      rating: 5,
      timeToHire: "10 days"
    }
  ];

  const stats = [
    { value: "95%", label: "Success Rate", icon: Award },
    { value: "2.5x", label: "Faster Hiring", icon: TrendingUp },
    { value: "10,000+", label: "Jobs Matched", icon: Users },
    { value: "4.9/5", label: "User Rating", icon: Star }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="success" className="py-24 section-bg-modern relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-dots-modern opacity-30"></div>
      
      {/* Modern gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-25/40 via-transparent to-orange-50/30"></div>

      <div className="container-modern relative z-10">
        <div className="text-center mb-20 scroll-reveal">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="modern-gradient-text animate-gradient">
              Success Stories
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed text-shadow-modern">
            Hear from <span className="text-orange-600 font-semibold"> professionals</span> who 
            <span className="text-orange-500 font-semibold"> transformed their careers</span> with 
            <span className="text-orange-700 font-semibold"> RightApply.ai</span>
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto scroll-reveal">
          <div className="relative">
            <div className="testimonial-card-modern p-8 shadow-orange-modern">
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-16 h-16 text-orange-500" />
              </div>
              
              <div className="relative z-10">
                {/* Rating */}
                <div className="flex items-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-orange-500 fill-current animate-pulse-modern" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  "{testimonials[currentTestimonial].content}"
                </p>
                
                {/* Profile */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center mr-4 ring-2 ring-orange-200 shadow-orange-modern">
                      <span className="text-white font-bold text-lg">
                        {testimonials[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 text-shadow-modern">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-orange-600 font-medium">
                        {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                      </p>
                    </div>
                  </div>
                  
                  {/* Navigation */}
                  <div className="flex space-x-2">
                    <button
                      onClick={prevTestimonial}
                      className="w-12 h-12 glass-card hover:shadow-orange-modern rounded-full flex items-center justify-center hover-lift-modern"
                    >
                      <ChevronLeft className="w-6 h-6 text-orange-600" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="w-12 h-12 glass-card hover:shadow-orange-modern rounded-full flex items-center justify-center hover-lift-modern"
                    >
                      <ChevronRight className="w-6 h-6 text-orange-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover-lift-modern ${
                    index === currentTestimonial ? 'bg-orange-500 shadow-orange-modern' : 'bg-orange-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Success;