import { useEffect, useState } from 'react';

const Loader = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // Keep loader on screen for 1.8s for the full sequence
        const timer = setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
                onLoadingComplete();
            }, 600);
        }, 1800);

        return () => clearTimeout(timer);
    }, [onLoadingComplete]);

    return (
        <div className={`fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isFading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'}`}>

            {/* Dynamic background mesh */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-teal-100/50 blur-[120px] rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-indigo-100/50 blur-[120px] rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDAsIDAsIDAsIDAuMDUpIiAvPgo8L3N2Zz4=')] opacity-50"></div>
            </div>

            {/* Core Animation Container */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Orbital Ring System */}
                <div className="relative w-40 h-40 flex items-center justify-center">
                    {/* Outer dashed ring */}
                    <svg className="absolute inset-0 w-full h-full animate-[spin_8s_linear_infinite]" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(20, 184, 166, 0.4)" strokeWidth="1" strokeDasharray="4 8" />
                    </svg>

                    {/* Inner continuous ring */}
                    <svg className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] animate-[spin_4s_ease-in-out_infinite_alternate]" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1" />
                        <circle cx="50" cy="4" r="3" fill="#14b8a6" className="animate-pulse drop-shadow-md" />
                        <circle cx="50" cy="96" r="3" fill="#6366f1" className="animate-pulse drop-shadow-md" />
                    </svg>

                    {/* Central geometric core */}
                    <div className="relative w-16 h-16 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-tr from-teal-400 to-indigo-500 rounded-2xl rotate-45 animate-[spin_4s_cubic-bezier(0.4,0,0.2,1)_infinite] opacity-20 blur-xl"></div>
                        <div className="absolute inset-0 bg-white shadow-xl shadow-teal-500/10 rounded-2xl rotate-45 border border-indigo-50/50 flex items-center justify-center overflow-hidden z-10 hover:rotate-90 transition-transform duration-1000">
                            <div className="w-full h-full bg-gradient-to-tr from-teal-50 to-indigo-50 opacity-50"></div>
                        </div>

                        {/* Inner diamond */}
                        <div className="relative z-20 w-6 h-6 border-[3px] border-teal-500 rounded-sm rotate-45 animate-[ping_2s_ease-in-out_infinite]"></div>
                        <div className="absolute z-20 w-3 h-3 bg-indigo-500 rounded-sm shadow-inner shadow-white/50 animate-[pulse_1s_ease-in-out_infinite]"></div>
                    </div>
                </div>

                {/* Loading typography */}
                <div className="mt-12 overflow-hidden h-8">
                    <div className="animate-[fade-in-up_1s_ease-out] flex items-center space-x-3">
                        <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-teal-400"></div>
                        <span className="text-gray-800 text-xs font-black tracking-[0.5em] uppercase" style={{ textShadow: '0 2px 10px rgba(20,184,166,0.2)' }}>
                            Preparing
                        </span>
                        <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-indigo-400"></div>
                    </div>
                </div>

                {/* Progress line */}
                <div className="mt-6 w-56 h-[1px] bg-gray-200 overflow-hidden relative">
                    <div className="absolute top-0 left-0 bottom-0 w-1/4 bg-gradient-to-r from-transparent via-teal-500 to-transparent animate-[shimmer_1.5s_infinite_linear]"></div>
                    <div className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-teal-500 to-indigo-500 animate-[progress_1.8s_ease-in-out_forwards]"></div>
                </div>
            </div>

            <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes progress {
          0% { width: 0%; }
          40% { width: 45%; }
          75% { width: 85%; }
          100% { width: 100%; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-200%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
        </div>
    );
};

export default Loader;
