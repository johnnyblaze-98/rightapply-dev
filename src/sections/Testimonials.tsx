import React from 'react';
import { Star, Quote, User, Briefcase, TrendingUp } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Software Engineer",
      company: "Google",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "Humanoids.ai transformed my career trajectory completely. Within 2 weeks, I landed my dream role at Google with a 40% salary increase!",
      rating: 5,
      highlight: "40% Salary Increase"
    },
    {
      name: "Marcus Rodriguez",
      role: "Product Manager",
      company: "Meta",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "The AI matching was incredibly precise. Every opportunity presented was perfectly aligned with my skills and career goals.",
      rating: 5,
      highlight: "Perfect Match"
    },
    {
      name: "Emily Johnson",
      role: "Data Scientist",
      company: "Netflix",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "The interview preparation was phenomenal. I felt completely confident and aced every technical round. Highly recommended!",
      rating: 5,
      highlight: "100% Success Rate"
    },
    {
      name: "David Kim",
      role: "DevOps Engineer",
      company: "Amazon",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "From application to offer letter in just 10 days. The speed and efficiency of this platform is absolutely mind-blowing!",
      rating: 5,
      highlight: "10 Days to Offer"
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-red-900/10 via-gray-900 to-orange-900/20 fire-grid relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-fire-500/5 rounded-full blur-3xl animate-fire-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-ember-500/5 rounded-full blur-3xl animate-fire-pulse delay-1000"></div>
      </div>

      {/* Heat waves */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-fire-500/20 to-transparent animate-sunlight-beam"
            style={{
              top: `${15 + i * 15}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6 animate-fade-in">
            <div className="flex items-center space-x-4">
              <Quote className="w-12 h-12 text-fire-500 animate-wiggle" />
              <Star className="w-8 h-8 text-ember-500 animate-spark" />
              <TrendingUp className="w-10 h-10 text-sunlight-500 animate-ember-float" />
            </div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-slide-up">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fire-500 via-ember-500 to-sunlight-500 animate-shimmer bg-[length:200%_100%] fire-text">
              Success Stories
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Hear from <span className="text-fire-500">thousands of professionals</span> who 
            <span className="text-ember-500"> ignited their careers</span> with 
            <span className="text-sunlight-500"> Humanoids.ai</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="group flame-card rounded-3xl p-8 hover:scale-105 transition-all duration-500 relative overflow-hidden glow-border animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <Quote className="w-16 h-16 text-fire-500" />
              </div>
              
              <div className="relative z-10">
                {/* Rating */}
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-sunlight-500 fill-current animate-spark" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                  <span className="ml-3 px-3 py-1 bg-gradient-to-r from-fire-500 to-ember-500 text-white text-sm font-bold rounded-full">
                    {testimonial.highlight}
                  </span>
                </div>
                
                {/* Content */}
                <p className="text-lg text-gray-300 leading-relaxed mb-8 group-hover:text-gray-200 transition-colors duration-300">
                  "{testimonial.content}"
                </p>
                
                {/* Profile */}
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 ring-2 ring-fire-500/30 group-hover:ring-fire-500/60 transition-all duration-300">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-fire-500 group-hover:to-ember-500 transition-all duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-fire-400 font-medium flex items-center">
                      <Briefcase className="w-4 h-4 mr-2" />
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Floating sparks */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-fire-500 rounded-full opacity-0 group-hover:opacity-100 animate-spark"
                    style={{
                      top: `${20 + i * 30}%`,
                      right: `${10 + i * 25}%`,
                      animationDelay: `${i * 0.4}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;