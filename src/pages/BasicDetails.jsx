import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import { cn } from '../lib/utils';
import Layout from '../components/ui/Layout';

const BasicDetails = () => {
  const [pan, setPan] = useState('');
  const [mobile, setMobile] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { pan, mobile, isConfirmed });
    navigate('/basic-details1');
  };

  return (
    <Layout>
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Basic Details</h1>
        <p className="text-gray-600 mb-8 text-lg">Let's start with entering a few basic details about your business.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="pan" className="block text-base font-medium text-gray-700 mb-1">
              Business PAN <span className="text-red-500">*</span>
            </label>
            <Input
              id="pan"
              type="text"
              value={pan}
              onChange={(e) => setPan(e.target.value.toUpperCase())}
              placeholder="ABCTY1234D"
              required
            />
            <p className="text-sm text-gray-500 mt-2">
              Please enter the PAN of your business. We will use this to fetch business name, linked GSTINs, and address details.
            </p>
          </div>

          <div>
            <label htmlFor="mobile" className="block text-base font-medium text-gray-700 mb-1">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <Input
              id="mobile"
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="888 888 8888"
              required
            />
            <p className="text-sm text-gray-500 mt-2">
              Please enter a valid mobile number. OTP will be shared on this number for verification.
            </p>
          </div>

          <div className="flex items-start pt-2">
            <div className="flex items-center h-5">
              <Checkbox id="confirm" checked={isConfirmed} onCheckedChange={setIsConfirmed} required />
            </div>
            <div className="ml-3 text-sm text-gray-700">
              <label htmlFor="confirm" className="font-medium">
                I do hereby confirm that:
              </label>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>I am not a Politically Exposed Person.</li>
                <li>
                  I have read and understood the{' '}
                  <a href="/documents/master-agreement" className="text-blue-600 hover:underline">Master Agreement</a>,{' '}
                  <a href="/documents/terms-of-use" className="text-blue-600 hover:underline">terms of use</a>, &{' '}
                  <a href="/documents/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a> and by continuing with registration, I agree to accept and abide by the same.
                </li>
                <li>
                  I authorize MASCONSIII to use my PAN to authenticate and verify my identity and to fetch entity details from the GSTIN System for the purpose of availing the TReDS Services for operations of account.
                </li>
                <li>
                  By submitting the above details, I override my NDNC registration and authorize MASCONSIII or its representative to contact me through SMS/Call/Email/WhatsApp for any assistance and this will not cause any inconvenience to me.
                </li>
              </ul>
            </div>
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
              <Button
                type="submit"
                className={cn(
                  "bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded",
                  !isConfirmed && "opacity-60 cursor-not-allowed"
                )}
                disabled={!isConfirmed}
              >
                Next
              </Button>
              <span className="text-gray-400 text-sm">or</span>
              <span className="text-blue-500 text-sm">Press enter</span>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default BasicDetails;
