import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";

const EntityDetail1 = () => {
  const navigate = useNavigate();
  const [buyerList, setBuyerList] = useState([{ gstin: "", name: "" }]);

  const handleBuyerChange = (index, field, value) => {
    const updatedBuyers = [...buyerList];
    updatedBuyers[index][field] = value;
    setBuyerList(updatedBuyers);
  };

  const handleAddBuyer = () => {
    setBuyerList([...buyerList, { gstin: "", name: "" }]);
  };

  const handleNext = () => {
    // Add validation here if needed
    navigate("/entity-detail2");
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Main Content */}
      <div className="flex-1 p-10">
        <button 
          className="text-blue-600 text-sm mb-6"
          onClick={() => navigate('/select-gst2')}
        >
          &lt; Back
        </button>
        <h2 className="text-2xl font-semibold mb-1">Entity Details</h2>
        <p className="text-sm text-gray-500 mb-6">Please Enter Entity Details</p>

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

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload PDF copy of GST Certificate *
        </label>
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
          <p className="text-sm text-gray-500 mb-2">
            Choose a file or drag & drop it here (JPEG, PNG, PDF - max 10MB)
          </p>
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" id="file-upload" />
          <label htmlFor="file-upload" className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Browse File
          </label>
        </div>
      </div>

      {/* Register Address */}
      <div className="mb-6 border border-gray-200 rounded-xl p-4">
        <h3 className="text-lg font-semibold mb-4">Register Address</h3>
        <div className="grid grid-cols-3 gap-4">
          <input placeholder="Registered Address line 1 *" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
          <input placeholder="Registered Address line 2 *" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
          <input placeholder="Pincode *" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
          <input placeholder="City *" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
          <input placeholder="District *" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
          <input placeholder="State *" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>

        <div className="mt-4">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox mr-2" defaultChecked />
            <span className="text-sm text-gray-700">Correspondence Address (Same as Registered)</span>
          </label>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <input placeholder="MSME Category *" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
          <input placeholder="Date of Classification *" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
          <input placeholder="Date of Incorporation *" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
      </div>

      {/* Buyer Details */}
      <div className="mb-6 border border-gray-200 rounded-xl p-4">
        <h3 className="text-lg font-semibold mb-4">Buyer Details</h3>
        {buyerList.map((buyer, index) => (
          <div key={index} className="grid grid-cols-2 gap-4 mb-2">
            <input
              placeholder="Buyer GSTIN"
              value={buyer.gstin}
              onChange={(e) => handleBuyerChange(index, "gstin", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
            <input
              placeholder="Buyer Name"
              value={buyer.name}
              onChange={(e) => handleBuyerChange(index, "name", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
        ))}
        <button onClick={handleAddBuyer} className="mt-2 text-blue-600 text-sm">+ Add</button>
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

            {/* Step 2 - Current */}
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full font-bold text-center flex items-center justify-center shadow-md
                bg-white text-blue-700">
                2
              </div>
              <span className="ml-4 text-white text-base font-semibold">
                Entity Details 
              </span>
            </div>

            {/* Step 4 */}
            <div className="flex items-center opacity-70">
              <div className="w-8 h-8 rounded-full font-bold text-center flex items-center justify-center shadow-md
                border-2 border-white text-white">
                4
              </div>
              <span className="ml-4 text-white text-base">
                Bank Details
              </span>
            </div>
            
            {/* Step 5
            <div className="flex items-center opacity-70">
              <div className="w-8 h-8 rounded-full font-bold text-center flex items-center justify-center shadow-md
                border-2 border-white text-white">
                5
              </div>
              <span className="ml-4 text-white text-base">
                E-Sign
              </span>
            </div> */}
          </div>
        </div>

        {/* Information Box */}
        <div className="mt-10 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
          <h4 className="text-white font-semibold mb-2">Why Entity Details matter?</h4>
          <p className="text-white/80 text-sm">
            Accurate entity details help us create the right financial profile for your business.
            This ensures all transactions are properly recorded and compliant with regulations.
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

export default EntityDetail1;
