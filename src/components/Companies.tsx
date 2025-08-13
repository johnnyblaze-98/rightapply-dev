import React from 'react';
import { Building2, Users, TrendingUp, Award } from 'lucide-react';
import ScrollingTrain from './ScrollingTrain';

const Companies = () => {
  const stats = [
    { value: "500+", label: "Partner Companies", icon: Building2 },
    { value: "50,000+", label: "Active Jobs", icon: TrendingUp },
    { value: "Fortune 500", label: "Companies", icon: Award },
    { value: "Global", label: "Opportunities", icon: Users }
  ];

  return (
    <section id="companies" className="py-24 section-bg-modern relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-dots-modern opacity-25"></div>
      
      {/* Modern gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-25/30 via-transparent to-orange-50/20"></div>
      
      <div className="container-modern relative z-10">
        <div className="text-center mb-20 scroll-reveal">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-4">
              <Building2 className="w-12 h-12 text-orange-600" />
              <Award className="w-8 h-8 text-orange-500" />
              <TrendingUp className="w-10 h-10 text-orange-700" />
            </div>
          </div>
        
        </div>

        {/* Scrolling Train Component */}
        <div className="scroll-reveal">
          <ScrollingTrain />
        </div>
      </div>
    </section>
  );
};

export default Companies;