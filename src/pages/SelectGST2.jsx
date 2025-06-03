import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SelectGST2 = () => {
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (!isLoggedIn) {
      navigate('/');
    } else if (userRole === 'admin') {
      navigate('/admin-dashboard');
    }
  }, [navigate]);
  
  const handleSignOut = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };
  return (
    <div className="flex min-h-screen bg-gray-50">
      {}
      <div className="flex-1 p-10">
        <div className="flex justify-between mb-6">
          <button 
            onClick={() => navigate('/gst-selection')} 
            className="text-blue-600 text-sm hover:text-blue-800"
          >
            &lt; Back
          </button>
          {/* <button 
            onClick={handleSignOut} 
            className="text-red-600 text-sm hover:text-red-800"
          >
            Sign Out
          </button> */}
        </div>
        <h2 className="text-2xl font-semibold mb-2">Select GST</h2>
        <p className="text-gray-600 mb-6">Please select your primary place of Business.</p>

        {/* Toggle */}
        <div className="flex items-center mb-6">
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 relative"></div>
            <span className="ml-3 text-sm text-gray-700">
              Please confirm if you want to be exempted from GST
            </span>
          </label>
        </div>

        {/* File Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload GST Exempt Certificate <span className="text-red-500">*</span>
          </label>
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 bg-white text-center">
            <div className="text-blue-500 text-3xl mb-2">+</div>
            <p className="text-gray-600 text-sm">Choose a file or drag & drop it here</p>
            <p className="text-gray-400 text-xs mb-2">JPEG, PNG, and PDF formats, up to 10MB</p>
            <button className="px-4 py-2 border rounded text-blue-600 border-blue-600 text-sm">Browse File</button>
          </div>
        </div>

        {/* GST Dropdown */}
        <div className="mb-6">
          <select className="w-full border border-gray-300 rounded px-4 py-3 text-sm focus:ring-blue-500 focus:border-blue-500">
            <option>29AAFCL1713K1ZF - Bengaluru Urban, Karnataka, 562149</option>
          </select>
        </div>

        {/* Bottom Info */}
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-md flex items-center justify-between">
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
              onClick={() => navigate('/entity-detail')} 
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
            >
              Next
            </button>
            <span className="text-gray-400 text-sm">or</span>
            <span className="text-blue-500 text-sm">Press enter</span>
          </div>
        </div>
      </div>
      
      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-b from-[#0072ff] to-[#00c6ff] text-white p-8 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-extrabold mb-6 tracking-wide">MASCONSIII</h2>
          <p className="text-white text-lg font-medium mb-10 opacity-80">Quick & Easy Steps</p>
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full font-bold text-center flex items-center justify-center shadow-md bg-white text-blue-700 ">
                1
              </div>
              <span className="ml-4 text-white text-base font-semibold">
                Basic Details
              </span>
            </div>
            
            {/* Step 2 */}
            <div className="flex items-center opacity-70">
              <div className="w-8 h-8 rounded-full font-bold text-center flex items-center justify-center shadow-md border-2 border-white text-white">
                2
              </div>
              <span className="ml-4 text-white text-base">
                KYC Verification
              </span>
            </div>
            
            {/* Step 3 */}
            <div className="flex items-center opacity-70">
              <div className="w-8 h-8 rounded-full font-bold text-center flex items-center justify-center shadow-md border-2 border-white text-white">
                3
              </div>
              <span className="ml-4 text-white text-base">
                Entity Details
              </span>
            </div>
            
            {/* Step 4 */}
            <div className="flex items-center opacity-70">
              <div className="w-8 h-8 rounded-full font-bold text-center flex items-center justify-center shadow-md border-2 border-white text-white">
                4
              </div>
              <span className="ml-4 text-white text-base">
                Bank Details
              </span>
            </div>
            
            {/* Step 5
            <div className="flex items-center opacity-70">
              <div className="w-8 h-8 rounded-full font-bold text-center flex items-center justify-center shadow-md border-2 border-white text-white">
                5
              </div>
              <span className="ml-4 text-white text-base">
                E-Sign
              </span>
            </div> */}
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-10 text-white text-sm opacity-70">
          <p>© {new Date().getFullYear()} MASCONSIII. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default SelectGST2;
