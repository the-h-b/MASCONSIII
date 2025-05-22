import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";

const BankDetails = () => {
  const navigate = useNavigate();
  const [correspondenceSource, setCorrespondenceSource] = useState("");
  const [selectedGstin, setSelectedGstin] = useState("");

  const handleNext = () => {
    // Add validation here if needed
    navigate("/e-sign"); // Assuming the next page is e-sign
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Main Content */}
      <div className="flex-1 p-10">
        <button 
          className="text-blue-600 text-sm mb-6"
          onClick={() => navigate('/entity-detail2')}
        >
          &lt; Back
        </button>
        <h2 className="text-2xl font-semibold mb-1">Bank Details</h2>
        <p className="text-sm text-gray-500 mb-6">Please Enter Your Bank Details</p>

      {/* Trade and Legal Name */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Trade Name</label>
          <input
            type="text"
            value="CHESA INC"
            readOnly
            className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Legal Name</label>
          <input
            type="text"
            value="Anju Lilaramani"
            readOnly
            className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2"
          />
        </div>
      </div>

      {/* GSTIN and Constitution */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">GSTIN *</label>
          <input
            type="text"
            value="29ABFPL3748N1Z1"
            readOnly
            className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Constitution *</label>
          <input
            type="text"
            value="PROPRIETORSHIP"
            readOnly
            className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2"
          />
        </div>
      </div>

      {/* File Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload PDF copy of GST Certificate *
        </label>
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
          <svg
            className="w-8 h-8 text-blue-500 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12"
            />
          </svg>
          <p className="text-sm text-gray-500 mb-2">
            Choose a file or drag & drop it here <br />
            JPEG, PNG, and PDF formats, up to 10MB
          </p>
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" id="gst-upload" />
          <label
            htmlFor="gst-upload"
            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Browse File
          </label>
        </div>
      </div>

      {/* Registered Address */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Registered Address</h3>
        <div className="grid grid-cols-3 gap-4">
          <input placeholder="Registered Address line 1 *" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
          <input placeholder="Registered Address line 2 *" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
          <input placeholder="Pincode *" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" value="560071" readOnly />
          <input placeholder="City *" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
          <input placeholder="District *" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
          <input placeholder="State *" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>

        <div className="mt-4">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox mr-2" />
            <span className="text-sm text-gray-700">Correspondence Address (Same as Registered Address)</span>
          </label>
        </div>

        {/* Radio Buttons */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From where do you want to fetch your Correspondence Address? *
          </label>
          <div className="flex items-center space-x-6">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="source"
                value="udyam"
                checked={correspondenceSource === "udyam"}
                onChange={() => setCorrespondenceSource("udyam")}
                className="form-radio text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">UDYAM</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="source"
                value="gstin"
                checked={correspondenceSource === "gstin"}
                onChange={() => setCorrespondenceSource("gstin")}
                className="form-radio text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">GSTIN</span>
            </label>
          </div>
        </div>

        {/* GSTIN Selector */}
        <div className="mt-4 w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select GSTIN Number</label>
          <select
            value={selectedGstin}
            onChange={(e) => setSelectedGstin(e.target.value)}
            className="block w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="">Select</option>
            <option value="29ABFPL3748N1Z1">29ABFPL3748N1Z1</option>
            {/* Add more options dynamically as needed */}
          </select>
        </div>
      </div>

      {/* Footer Next Button */}
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
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
          >
            Next
          </button>
          <span className="text-gray-400 text-sm">or</span>
          <span className="text-blue-500 text-sm">Press enter</span>
        </div>
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

            {/* Step 2 - Completed */}
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full font-bold text-center flex items-center justify-center shadow-md
                bg-white text-blue-700">
                2
              </div>
              <span className="ml-4 text-white text-base font-semibold">
                Entity Details (1/2)
              </span>
            </div>

            {/* Step 3 - Completed */}
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full font-bold text-center flex items-center justify-center shadow-md
                bg-white text-blue-700">
                3
              </div>
              <span className="ml-4 text-white text-base font-semibold">
                Entity Details (2/2)
              </span>
            </div>
            
            {/* Step 4 - Current */}
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full font-bold text-center flex items-center justify-center shadow-md
                bg-white text-blue-700">
                4
              </div>
              <span className="ml-4 text-white text-base font-semibold">
                Bank Details
              </span>
            </div>

            {/* Step 5 */}
            <div className="flex items-center opacity-70">
              <div className="w-8 h-8 rounded-full font-bold text-center flex items-center justify-center shadow-md
                border-2 border-white text-white">
                5
              </div>
              <span className="ml-4 text-white text-base">
                E-Sign
              </span>
            </div>
          </div>
        </div>

        {/* Information Box */}
        <div className="mt-10 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
          <h4 className="text-white font-semibold mb-2">Why Bank Details matter?</h4>
          <p className="text-white/80 text-sm">
            Providing your bank details allows for seamless financial transactions and ensures you receive payments promptly. This information is securely stored and used only for business purposes.
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

export default BankDetails;
