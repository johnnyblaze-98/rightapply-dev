import React from 'react';

const InfinityAnimation = () => {
  return (
    <div className="relative w-full h-36 flex items-center justify-center overflow-hidden">
      <div className="relative">
        <svg viewBox="0 0 200 100" className="infinity-svg">
          <defs>
            <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>

            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blurred" />
              <feMerge>
                <feMergeNode in="blurred" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Infinity path */}
          <path
            id="infinityPath"
            d="M30,50
               C30,20 70,20 100,50
               C130,80 170,80 170,50
               C170,20 130,20 100,50
               C70,80 30,80 30,50 Z"
            fill="none"
            stroke="url(#infinityGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            className="infinity-path"
          />

          {/* Dots flowing along path */}
          {[0, 0.6, 1.2, 1.8].map((delay, index) => (
            <circle
              key={index}
              r="3.5"
              fill="#f97316"
              stroke="none"
              className="flowing-dot"
              style={{ animationDelay: `${delay}s` }}
            >
              <animateMotion dur="3s" repeatCount="indefinite">
                <mpath href="#infinityPath" />
              </animateMotion>
            </circle>
          ))}
        </svg>

        {/* Background glow - now fully transparent */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-28 bg-transparent rounded-full"></div>
        </div>
      </div>

      <style jsx>{`
        .infinity-svg {
          width: 220px;
          height: 100px;
          background-color: transparent;
          border: none;
          outline: none;
          display: block;
        }

        .infinity-path {
          stroke-dasharray: 520;
          stroke-dashoffset: 520;
          animation: drawInfinity 5s ease-in-out infinite;
        }

        .flowing-dot {
          opacity: 0;
          animation: dotFade 3s ease-in-out infinite;
        }

        @keyframes drawInfinity {
          0% {
            stroke-dashoffset: 520;
            opacity: 0.2;
          }
          50% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
          100% {
            stroke-dashoffset: -520;
            opacity: 0.2;
          }
        }

        @keyframes dotFade {
          0%,
          100% {
            opacity: 0;
          }
          25%,
          75% {
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .infinity-svg {
            width: 160px;
            height: 80px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .infinity-path,
          .flowing-dot {
            animation: none;
          }
          .infinity-path {
            stroke-dasharray: none;
            stroke-dashoffset: 0;
          }
          .flowing-dot {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default InfinityAnimation;
