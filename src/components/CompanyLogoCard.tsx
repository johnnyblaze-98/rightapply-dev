import React, { useState } from 'react';

interface CompanyLogoCardProps {
  company: {
    name: string;
    logo: string;
  };
  index: number;
}

const CompanyLogoCard: React.FC<CompanyLogoCardProps> = ({ company, index }) => {
  const [logoError, setLogoError] = useState(false);

  return (
    <div 
      key={index}
      className="flex-shrink-0 w-48 h-36 mx-8 holographic-card rounded-2xl p-6 hover:scale-110 transition-all duration-500 flex items-center justify-center group relative overflow-hidden"
    >
      {/* Animated border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer bg-[length:200%_100%]" style={{ padding: '2px' }}>
        <div className="w-full h-full bg-cyber-dark/90 rounded-2xl"></div>
      </div>
      
      {/* Scanning effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-data-stream rounded-2xl"></div>
      
      <div className="w-full h-full flex items-center justify-center relative z-10">
        {!logoError ? (
          <img 
            src={company.logo} 
            alt={`${company.name} logo`}
            className="max-w-full max-h-full object-contain filter group-hover:brightness-125 group-hover:drop-shadow-lg transition-all duration-500 group-hover:scale-110"
            style={{
              filter: 'brightness(1.2) contrast(1.1) drop-shadow(0 0 10px rgba(0, 212, 255, 0.3))',
            }}
            onError={() => setLogoError(true)}
          />
        ) : (
          <div className="w-20 h-20 bg-gradient-to-br from-neon-blue to-neon-purple rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-500 shadow-2xl shadow-neon-blue/50 relative z-10">
            {company.name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue rounded-full opacity-0 group-hover:opacity-100 animate-float"
            style={{
              top: `${20 + i * 30}%`,
              left: `${10 + i * 30}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CompanyLogoCard;