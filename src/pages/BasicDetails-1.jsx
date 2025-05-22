import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { cn } from '../lib/utils';
import Layout from '../components/ui/Layout';

const BasicDetails1 = () => {
  const [email, setEmail] = useState('');
  const [udyam, setUdyam] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (email && udyam) {
      navigate('/gst-selection');
    } else {
      alert('Please fill all required fields.');
    }
  };
  return (
    <Layout>
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Basic Details</h1>
        <p className="text-gray-600 mb-8 text-lg">Please provide additional information about your business entity.</p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800">
            You're applying on behalf of <span className="font-semibold">Shivam Chaudhary</span> (Sole Proprietor)
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="business@example.com"
              required
            />
            <p className="text-sm text-gray-500 mt-2">
              We'll use this email for all communications related to your account.
            </p>
          </div>

          <div>
            <label htmlFor="udyam" className="block text-base font-medium text-gray-700 mb-1">
              Udyam Registration Number <span className="text-red-500">*</span>
            </label>
            <Input
              id="udyam"
              type="text"
              value={udyam}
              onChange={(e) => setUdyam(e.target.value)}
              placeholder="e.g. UDYAM-UP-00-0123456"
              required
            />
            <p className="text-sm text-gray-500 mt-2">
              Enter your Udyam Registration Number issued by the Ministry of MSME.
            </p>
          </div>

          <div>
            <label htmlFor="pan-upload" className="block text-base font-medium text-gray-700 mb-1">
              Upload Proprietor PAN <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="pan-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Upload a file</span>
                    <input id="pan-upload" name="pan-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="address-upload" className="block text-base font-medium text-gray-700 mb-1">
              Upload Address Proof <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="address-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Upload a file</span>
                    <input id="address-upload" name="address-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            <p className="font-medium">GST Number(s) are not linked with the PAN.</p>
            <p>Please upload any GST proof in the next step.</p>
          </div>

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
                onClick={handleNext}
                className={cn(
                  "bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded",
                  (!email || !udyam) && "opacity-60 cursor-not-allowed"
                )}
                disabled={!email || !udyam}
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
              onClick={() => navigate('/')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-2 rounded-lg text-base shadow-sm transition-colors duration-200 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default BasicDetails1;
