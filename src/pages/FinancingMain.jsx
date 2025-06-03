import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../styles/Financing.css';

const FinancingMain = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('get-financing');
  
  const goToDashboard = () => {
    navigate('/dashboard');
  };
  
  const goToInvoice = () => {
    navigate('/invoice');
  };
  
  const goToBankDetails = () => {
    navigate('/bank-details');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'get-financing':
        return (
          <div>
            <h2>Get Invoice Financing</h2>
            <p>Convert your unpaid invoices into immediate cash flow.</p>
            <div className="no-invoices-box">
              <p><strong>⚠️ No Invoices Available</strong></p>
              <p>You don't have any eligible invoices for financing. Create an invoice first to unlock financing options.</p>
              <button className="create-invoice-btn" onClick={goToInvoice}>📄 Create an Invoice</button>
            </div>
          </div>
        );
      case 'instant-funding':
        return (
          <div>
            <h2>Instant Funding</h2>
            <p>Get your funds instantly once your invoices are verified.</p>
          </div>
        );
      case 'financing-options':
        return (
          <div>
            <h2>Financing Options</h2>
            <p>Explore various funding types available to you based on eligibility.</p>
          </div>
        );
      case 'tax-management':
        return (
          <div>
            <h2>Tax Management</h2>
            <p>Track taxes and automate tax report generation.</p>
          </div>
        );
      case 'ai-insights':
        return (
          <div>
            <h2>AI Insights</h2>
            <p>Get AI-powered insights on client payments and cash flow trends.</p>
          </div>
        );
      case 'payment-collection':
        return (
          <div>
            <h2>Payment Collection</h2>
            <p>Manage client payment reminders and due tracking in one place.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold text-blue-600">MASCONSIII</div>
        </div>

        <nav className="flex items-center space-x-8 text-sm font-medium text-gray-700">
          <a href="#" onClick={(e) => { e.preventDefault(); goToDashboard(); }}>Dashboard</a>
          <a href="#" onClick={(e) => { e.preventDefault(); goToInvoice(); }}>Invoices</a>
          <a href="#" className="text-blue-600">Financing</a>
          <a href="#">Analytics</a>
          <a href="#" onClick={(e) => { e.preventDefault(); goToBankDetails(); }}>Bank Details</a>
          <a href="#">Settings</a>
          <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
            <span>HARSH BHUTRA</span>
            <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">Pro</span>
            <img
              src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
              alt="avatar"
              className="w-5 h-5"
            />
          </div>
        </nav>
      </header>

      {/* Main */}
      <main className="px-8 py-6">
        <h1 className="text-2xl font-semibold text-gray-900">Financing & Payments</h1>
        <p className="text-sm text-gray-500 mb-4">
          Get instant financing on your invoices and streamline your payment collection process.
        </p>

      <div className="badges">
        <span>⚡ Up to 80% Advance</span>
        <span>📄 Fast Approval</span>
        <span>🔒 Secure Process</span>
      </div>

      <div className="role-box">
        🔒 This page is secured for verified businesses only. Your role: <strong>USER</strong>
      </div>

      <div className="financing-tabs">
        <button onClick={() => setActiveTab('get-financing')} className={activeTab === 'get-financing' ? 'active' : ''}>Get Financing</button>
        <button onClick={() => setActiveTab('instant-funding')} className={activeTab === 'instant-funding' ? 'active' : ''}>Instant Funding</button>
        <button onClick={() => setActiveTab('financing-options')} className={activeTab === 'financing-options' ? 'active' : ''}>Financing Options</button>
        <button onClick={() => setActiveTab('tax-management')} className={activeTab === 'tax-management' ? 'active' : ''}>Tax Management</button>
        <button onClick={() => setActiveTab('ai-insights')} className={activeTab === 'ai-insights' ? 'active' : ''}>AI Insights</button>
        <button onClick={() => setActiveTab('payment-collection')} className={activeTab === 'payment-collection' ? 'active' : ''}>Payment Collection</button>
      </div>

      <div className="financing-content">
        {renderTabContent()}
      </div>
      </main>
    </div>
  );
};

export default FinancingMain;
