import React from 'react';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  // Determine active step based on current path
  const isStep1Active = path === '/';
  const isStep2Active = path === '/entity-details';
  const isStep3Active = path === '/gst-selection' || path === '/select-gst2'; 
  const isStep4Active = false; // E-Sign - not implemented yet

  return (
    <div className="w-72 min-h-screen bg-gradient-to-b from-[#0072ff] to-[#00c6ff] text-white flex flex-col justify-between p-8">
      <div>
        {/* Logo */}
        <h2 className="text-3xl font-extrabold mb-6 tracking-wide">MASCONSIII</h2>

        {/* Subtitle */}
        <p className="text-white text-lg font-medium mb-10 opacity-80">Quick & Easy Steps</p>

        {/* Steps */}
        <div className="space-y-8">
          {/* Step 1 */}
          <div className={`flex items-center ${!isStep1Active && 'opacity-70'}`}>
            <div className={`w-8 h-8 rounded-full font-bold text-center flex items-center justify-center shadow-md
              ${isStep1Active 
                ? 'bg-white text-blue-700' 
                : 'border-2 border-white text-white'}`}>
              1
            </div>
            <span className={`ml-4 text-white text-base ${isStep1Active && 'font-semibold'}`}>
              Basic Details
            </span>
          </div>

          {/* Step 2 */}
          <div className={`flex items-center ${!isStep2Active && 'opacity-70'}`}>
            <div className={`w-8 h-8 rounded-full font-bold text-center flex items-center justify-center shadow-md
              ${isStep2Active 
                ? 'bg-white text-blue-700' 
                : 'border-2 border-white text-white'}`}>
              2
            </div>
            <span className={`ml-4 text-white text-base ${isStep2Active && 'font-semibold'}`}>
              Entity Details
            </span>
          </div>

          {/* Step 3 */}
          <div className={`flex items-center ${!isStep3Active && 'opacity-70'}`}>
            <div className={`w-8 h-8 rounded-full font-bold text-center flex items-center justify-center shadow-md
              ${isStep3Active 
                ? 'bg-white text-blue-700' 
                : 'border-2 border-white text-white'}`}>
              3
            </div>
            <span className={`ml-4 text-white text-base ${isStep3Active && 'font-semibold'}`}>
              Bank Details
            </span>
          </div>

          {/* Step 4 */}
          <div className={`flex items-center ${!isStep4Active && 'opacity-70'}`}>
            <div className={`w-8 h-8 rounded-full font-bold text-center flex items-center justify-center shadow-md
              ${isStep4Active 
                ? 'bg-white text-blue-700' 
                : 'border-2 border-white text-white'}`}>
              4
            </div>
            <span className={`ml-4 text-white text-base ${isStep4Active && 'font-semibold'}`}>
              E-Sign
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 text-white text-sm opacity-70">
        <p>© {new Date().getFullYear()} MASCONSIII. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Sidebar;
