import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { cn } from '../lib/utils';
import Layout from '../components/ui/Layout';

const SelectGST = () => {
  const [gst, setGst] = useState('');
  const [exempt, setExempt] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (exempt) {
      navigate('/select-gst2');
    } else if (gst) {
      navigate('/select-gst2');
    } else {
      alert('Please select a GST option or check exemption');
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bank Details - GST Selection</h1>
        <p className="text-gray-600 mb-8 text-lg">Select your GST registration or apply for exemption.</p>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-start space-x-3 mb-6">
              <div className="flex h-6 items-center">
                <Checkbox 
                  id="exempt" 
                  checked={exempt} 
                  onCheckedChange={() => {
                    setExempt(!exempt);
                    if (!exempt) setGst('');
                  }}
                />
              </div>
              <div className="leading-none">
                <label htmlFor="exempt" className="text-base font-medium text-gray-900 cursor-pointer">
                  I want to be exempted from GST
                </label>
                <p className="text-sm text-gray-500 mt-1">
                  Select this option if your business is exempt from GST registration.
                </p>
              </div>
            </div>

            <div className={cn("space-y-4", exempt && "opacity-50 pointer-events-none")}>
              <h3 className="font-medium text-gray-900">Available GST Registrations</h3>
              
              <div className={cn(
                "border border-gray-200 rounded-lg p-4 flex items-center",
                gst === "29AAFLJ7132KZF" && "border-blue-500 bg-blue-50"
              )}>
                <div className="flex h-5 items-center mr-3">
                  <input
                    id="gst-1"
                    name="gst"
                    type="radio"
                    value="29AAFLJ7132KZF"
                    checked={gst === "29AAFLJ7132KZF"}
                    onChange={(e) => setGst(e.target.value)}
                    disabled={exempt}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <label htmlFor="gst-1" className="flex flex-col cursor-pointer flex-grow">
                  <span className="font-medium text-gray-900">29AAFLJ7132KZF</span>
                  <span className="text-sm text-gray-500">Bengaluru Urban, Karnataka</span>
                </label>
                {gst === "29AAFLJ7132KZF" && (
                  <div className="flex-shrink-0 text-blue-600">
                    <Check className="h-5 w-5" />
                  </div>
                )}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
                <p className="text-sm">
                  If you don't see your GST registration here, you can upload GST proof in the next step.
                </p>
              </div>
            </div>
          </div>

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
                onClick={handleSubmit}
                className={cn(
                  "bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded",
                  (!exempt && !gst) && "opacity-60 cursor-not-allowed"
                )}
                disabled={!exempt && !gst}
              >
                Next
              </button>
              <span className="text-gray-400 text-sm">or</span>
              <span className="text-blue-500 text-sm">Press enter</span>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <Button
              type="button"
              onClick={() => navigate('/basic-details1')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-2 rounded-lg text-base shadow-sm transition-colors duration-200 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SelectGST;
