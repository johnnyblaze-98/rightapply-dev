import React from 'react';
import './ScrollingTrain.css';

interface Company {
  name: string;
  logo: string;
}

const companies: Company[] = [
  { name: "Rocket Mortgage", logo: "https://1000logos.net/wp-content/uploads/2025/08/Rocket-Mortgage-Logo.png" },
  { name: "PayPal", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1280px-PayPal.svg.png" },
  { name: "Rivian", logo: "https://cdn.worldvectorlogo.com/logos/rivian-wordmark-1.svg" },
  { name: "Walmart", logo: "https://www.clipartmax.com/png/middle/118-1183097_walmart-logo-png-image-purepng-free-transparent-cc0-walmart-logo.png" },
  { name: "Amazon", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1j7Wu8mxJBRvqD-CECJf_Sxk_2qRbBTktGQ&s" },
  { name: "BigCommerce", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Bc-logo-dark.svg/1280px-Bc-logo-dark.svg.png" },
  { name: "Amex", logo: "https://www.logo.wine/a/logo/American_Express/American_Express-Logo.wine.svg" },
  { name: "Discover", logo: "https://1000logos.net/wp-content/uploads/2021/05/Discover-logo.png" },
  { name: "Stratacache", logo: "https://europe2025.advertisingweek.com/images/userfiles/images/partners/uploads/999-stratacache.png" },
  { name: "Verizon", logo: "https://1000logos.net/wp-content/uploads/2017/06/Verizon-Logo.jpg" },
  { name: "Sony", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdp8Zmo9HSSLpUoze9tSb2yOvJ5gaC6Bb7xQ&s" },
  { name: "Geotab", logo: "https://www.theclimatepledge.com/content/dam/amazonclimatepledge/signatory-logos/Geotab.png" },
  { name: "CVS Pharmacy", logo: "https://www.logo.wine/a/logo/CVS_Pharmacy/CVS_Pharmacy-Logo.wine.svg" },
];

interface CompanyLogoCardProps {
  company: Company;
  index: number;
}

const CompanyLogoCard: React.FC<CompanyLogoCardProps> = ({ company, index }) => {
  return (
    <div
      key={`${company.name}-${index}`}
      className="flex-shrink-0 w-32 h-28 mx-3 bg-white shadow rounded-lg p-3 flex flex-col items-center justify-center group hover:scale-105 transition-all duration-300"
    >
      <div className="flex-1 flex items-center justify-center mb-1">
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          className="max-w-[60px] max-h-[35px] object-contain group-hover:scale-110 transition-transform duration-300"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
      <p className="text-gray-600 text-xs font-medium text-center truncate w-full">
        {company.name}
      </p>
    </div>
  );
};

const ScrollingTrain: React.FC = () => {
  return (
    <div className="relative overflow-hidden py-4">
      {/* Left and right gradient overlays (no blur) */}
      <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-white via-white/70 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-white via-white/70 to-transparent z-10 pointer-events-none" />

      <div className="flex animate-scroll whitespace-nowrap space-x-4 px-6">
        {[...companies, ...companies].map((company, index) => (
          <CompanyLogoCard key={index} company={company} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ScrollingTrain;
