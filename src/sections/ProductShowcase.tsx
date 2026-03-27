import React, { useState } from 'react';
import { Monitor, Smartphone, Tablet, BarChart3, TrendingUp, Activity, Zap, Eye } from 'lucide-react';

const ProductShowcase = () => {
  const [activeDemo, setActiveDemo] = useState('dashboard');

  const demos = {
    dashboard: {
      title: 'AI Dashboard',
      description: 'Comprehensive analytics dashboard with real-time insights',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      features: ['Real-time Analytics', 'Custom Widgets', 'Data Visualization', 'Export Reports']
    },
    mobile: {
      title: 'Mobile Analytics',
      description: 'Access your data insights anywhere with our mobile app',
      image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      features: ['Mobile Optimized', 'Push Notifications', 'Offline Access', 'Touch Interface']
    },
    reports: {
      title: 'Smart Reports',
      description: 'AI-generated reports with actionable insights',
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      features: ['Auto Generation', 'Custom Templates', 'Scheduled Delivery', 'Interactive Charts']
    }
  };

  return (
    <section id="product" className="py-24 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 ai-grid relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-ai-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-ai-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 scroll-reveal">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-4">
              <Monitor className="w-12 h-12 text-primary animate-neural-network" />
              <Eye className="w-8 h-8 text-secondary animate-ai-pulse" />
              <BarChart3 className="w-10 h-10 text-ai-blue animate-data-flow" />
            </div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="ai-text">
              Product Showcase
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed">
            Experience our <span className="text-primary">cutting-edge interface</span> designed for 
            <span className="text-secondary"> maximum productivity</span> and 
            <span className="text-ai-blue"> seamless user experience</span>
          </p>
        </div>

        {/* Demo Selection */}
        <div className="flex justify-center mb-12 scroll-reveal">
          <div className="glass-card rounded-2xl p-2 flex space-x-2">
            <button
              onClick={() => setActiveDemo('dashboard')}
              className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeDemo === 'dashboard' 
                  ? 'ai-button text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Monitor className="w-5 h-5 mr-2" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveDemo('mobile')}
              className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeDemo === 'mobile' 
                  ? 'ai-button text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-5 h-5 mr-2" />
              Mobile
            </button>
            <button
              onClick={() => setActiveDemo('reports')}
              className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeDemo === 'reports' 
                  ? 'ai-button text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              Reports
            </button>
          </div>
        </div>

        {/* 3D Mockup Display */}
        <div className="max-w-6xl mx-auto scroll-reveal">
          <div className="relative">
            {/* Main showcase */}
            <div className="glass-card rounded-3xl p-8 mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Product Info */}
                <div>
                  <h3 className="text-4xl font-bold mb-6 ai-text">
                    {demos[activeDemo].title}
                  </h3>
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    {demos[activeDemo].description}
                  </p>
                  
                  {/* Features List */}
                  <div className="space-y-4 mb-8">
                    {demos[activeDemo].features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-4 animate-ai-pulse"></div>
                        <span className="text-gray-300 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="ai-button px-8 py-4 rounded-xl font-bold flex items-center interactive-hover micro-interaction">
                    <Zap className="w-5 h-5 mr-2" />
                    Try Live Demo
                  </button>
                </div>
                
                {/* 3D Mockup */}
                <div className="relative">
                  <div className="floating-3d">
                    <div className="glass-card rounded-2xl p-4 shadow-2xl">
                      <img 
                        src={demos[activeDemo].image}
                        alt={demos[activeDemo].title}
                        className="w-full h-80 object-cover rounded-xl"
                      />
                      
                      {/* Overlay UI Elements */}
                      <div className="absolute inset-4 rounded-xl bg-gradient-to-t from-black/50 to-transparent pointer-events-none">
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex space-x-2">
                              <div className="w-3 h-3 bg-primary rounded-full animate-ai-pulse"></div>
                              <div className="w-3 h-3 bg-secondary rounded-full animate-ai-pulse delay-200"></div>
                              <div className="w-3 h-3 bg-ai-blue rounded-full animate-ai-pulse delay-400"></div>
                            </div>
                            <div className="text-xs text-white/80">Live Data</div>
                          </div>
                          
                          {/* Data visualization bars */}
                          <div className="flex items-end space-x-1 h-8">
                            {[...Array(12)].map((_, i) => (
                              <div
                                key={i}
                                className="bg-primary/60 rounded-sm animate-ai-pulse"
                                style={{
                                  width: '6px',
                                  height: `${Math.random() * 100}%`,
                                  animationDelay: `${i * 0.1}s`,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating UI elements */}
                  <div className="absolute -top-4 -right-4 glass-card rounded-xl p-3 floating-3d">
                    <TrendingUp className="w-6 h-6 text-primary animate-neural-network" />
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 glass-card rounded-xl p-3 floating-3d">
                    <Activity className="w-6 h-6 text-secondary animate-data-flow" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Real-time Demo Capabilities */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card rounded-2xl p-6 text-center interactive-hover">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 floating-3d">
                  <Monitor className="w-8 h-8 text-white animate-ai-pulse" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Multi-Device</h4>
                <p className="text-gray-400">Seamless experience across all devices</p>
              </div>
              
              <div className="glass-card rounded-2xl p-6 text-center interactive-hover">
                <div className="w-16 h-16 bg-gradient-to-br from-ai-blue to-ai-purple rounded-2xl flex items-center justify-center mx-auto mb-4 floating-3d">
                  <Zap className="w-8 h-8 text-white animate-neural-network" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Real-time</h4>
                <p className="text-gray-400">Live data updates and instant insights</p>
              </div>
              
              <div className="glass-card rounded-2xl p-6 text-center interactive-hover">
                <div className="w-16 h-16 bg-gradient-to-br from-ai-purple to-ai-pink rounded-2xl flex items-center justify-center mx-auto mb-4 floating-3d">
                  <Eye className="w-8 h-8 text-white animate-data-flow" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Intuitive</h4>
                <p className="text-gray-400">User-friendly interface design</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;