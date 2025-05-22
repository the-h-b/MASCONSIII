import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpotlightCard from "../pages/SpotlightCard";
// import { cn } from "../lib/utils";

const kycOptions = [
  {
    id: "video",
    title: "Video KYC (V-CIP)",
    time: "24 to 48 hours avg. verification time",
    steps: [
      "Original Aadhaar Photocopy",
      "Original PAN Photocopy",
      "Original GST Certificate",
      "Original Udyam Certificate",
    ],
    nextPath: "/entity-detail1",
  },
  {
    id: "digilocker",
    title: "Digilocker",
    recommended: true,
    time: "Recommended",
    steps: [
      "Provide access to Aadhaar",
      "No Digilocker Account Required",
      "No Digilocker App Needed",
      "No Physical Documents Required",
      "Needed photograph",
    ],
    nextPath: "/entity-detail1",
  },
  {
    id: "upload",
    title: "Document Upload",
    time: "24 hours avg. verification time",
    steps: [
      "Address Proof (Aadhaar/Driving Licence/Voter Id/Passport Photocopy)",
      "Original Photograph",
    ],
    nextPath: "/entity-detail1",
  },
];

const EntityDetails = () => {
  const [selected, setSelected] = useState("digilocker");
  const navigate = useNavigate();

  const handleCardSelect = (optionId) => {
    setSelected(optionId);
  };

  const handleCardClick = (option) => {
    setSelected(option.id);
    // Small delay to show the selection before navigating
    setTimeout(() => {
      navigate(option.nextPath);
    }, 300);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Main Content */}
      <div className="flex-1 p-10">
        <button 
          className="text-blue-600 text-sm mb-6"
          onClick={() => navigate('/SelectGST2')}
        >
          &lt; Back
        </button>
        <h2 className="text-2xl font-semibold mb-2">KYC Verification</h2>
        <p className="text-gray-600 mb-6">Please select your preferred KYC verification method</p>

        <h3 className="text-lg font-medium mb-4">Select your KYC Option</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kycOptions.map((option) => (
            <SpotlightCard
              key={option.id}
              className={`cursor-pointer bg-white transition border ${
                selected === option.id ? "border-blue-500 shadow-lg" : "border-gray-200"
              }`}
              spotlightColor="hsla(244, 50.20%, 45.70%, 0.97)"
            >
              <div
                className="relative h-full"
                onClick={() => handleCardClick(option)}
              >
                {option.recommended && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md">
                    Recommended
                  </span>
                )}
                <h4 className="text-blue-900 font-semibold text-lg mb-2">
                  {option.title}
                </h4>
                <p className="text-blue-500 text-sm mb-3">{option.time}</p>
                <ul className="text-sm text-gray-700 list-disc list-inside space-y-1 mb-4">
                  {option.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>
                <div className="text-center">
                  <button
                    className={`w-full py-2 text-sm rounded-md font-semibold ${
                      selected === option.id
                        ? "bg-blue-600 text-white"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {selected === option.id ? "Continue with this option" : "Select this option"}
                  </button>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* Sidebar on the right */}
      <div className="w-72 min-h-screen bg-gradient-to-b from-[#0072ff] to-[#00c6ff] text-white flex flex-col justify-between p-8">
        <div>
          {/* Logo */}
          <h2 className="text-3xl font-extrabold mb-6 tracking-wide">MASCONSIII</h2>

          {/* Subtitle */}
          <p className="text-white text-lg font-medium mb-10 opacity-80">Quick & Easy Steps</p>

          {/* Steps */}
          <div className="space-y-8">
            {/* Step 1 - Completed */}
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full font-bold text-center flex items-center justify-center shadow-md
                bg-white text-blue-700">
                1
              </div>
              <span className="ml-4 text-white text-base font-semibold">
                Basic Details
              </span>
            </div>


            {/* Step 2 - Current */}
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full font-bold text-center flex items-center justify-center shadow-md
                bg-white text-blue-700">
                2
              </div>
              <span className="ml-4 text-white text-base font-semibold">
                KYC Verification
              </span>
            </div>

            {/* Step 4 */}
            <div className="flex items-center opacity-70">
              <div className="w-8 h-8 rounded-full font-bold text-center flex items-center justify-center shadow-md
                border-2 border-white text-white">
                3
              </div>
              <span className="ml-4 text-white text-base">
                Bank Details
              </span>
            </div>
            
            {/* Step 5 */}
            <div className="flex items-center opacity-70">
              <div className="w-8 h-8 rounded-full font-bold text-center flex items-center justify-center shadow-md
                border-2 border-white text-white">
                4
              </div>
              <span className="ml-4 text-white text-base">
                E-Sign
              </span>
            </div>
          </div>
        </div>

        {/* Footer Next Button
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-md flex items-center justify-between mt-6">
          <div className="flex items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
              <path d="M12 2L3 6V12C3 17.5 7.5 22 12 22C16.5 22 21 17.5 21 12V6L12 2Z"/>
              <path d="M9 12L11 14L15 10"/>
            </svg>
            <p className="text-green-700 text-sm">
              Your information is as safe with us as a bank. Your data is 256-bit encrypted and we follow ISO 27001 protocols to ensure your data stays safe.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => selected && handleCardClick(kycOptions.find(opt => opt.id === selected))}
              className={cn(
                "bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded",
                !selected && "opacity-60 cursor-not-allowed"
              )}
              disabled={!selected}
            >
              Next
            </button>
            <span className="text-gray-400 text-sm">or</span>
            <span className="text-blue-500 text-sm">Press enter</span>
          </div>
        </div> */}

        {/* Information Box */}
        <div className="mt-10 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
          <h4 className="text-white font-semibold mb-2">Why KYC is important?</h4>
          <p className="text-white/80 text-sm">
            KYC helps us verify your identity and comply with regulatory requirements. 
            Choosing the right KYC option ensures a smooth onboarding experience.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-10 text-white text-sm opacity-70">
          <p>© {new Date().getFullYear()} MASCONSIII. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default EntityDetails;
