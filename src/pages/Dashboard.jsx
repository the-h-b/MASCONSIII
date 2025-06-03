import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  
  const goToBankDetails = () => {
    navigate("/bank-details");
  };
  
  const goToInvoice = () => {
    navigate("/invoice");
  };
  
  const goToFinancing = () => {
    navigate("/financing");
  };
  
  const goToPaymentMethods = () => {
    navigate("/payment-methods");
  };
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold text-blue-600">MASCONSIII</div>
        </div>

        <nav className="flex items-center space-x-8 text-sm font-medium text-gray-700">
          <a href="#" className="text-blue-600">Dashboard</a>
          <a href="#" onClick={(e) => { e.preventDefault(); goToInvoice(); }}>Invoices</a>
          <a href="#" onClick={(e) => { e.preventDefault(); goToFinancing(); }}>Financing</a>
          <a href="#" onClick={(e) => { e.preventDefault(); goToPaymentMethods(); }}>Payment Methods</a>
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
        <h1 className="text-2xl font-semibold text-gray-900">Welcome, HARSH</h1>
        <p className="text-sm text-gray-500 mb-4">
          Manage your invoices, track payments, and access financing options all in one dashboard.
        </p>

        {/* Alert */}
        <div className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded mb-6">
          <p className="font-medium">Complete your business profile</p>
          <p className="text-sm">Please update your business details to create professional invoices.</p>
          <div className="flex space-x-3 mt-2">
            <button className="bg-white border border-yellow-400 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-50">
              Update Business Details
            </button>
            <button 
              onClick={goToBankDetails}
              className="bg-white border border-yellow-400 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-50">
              Update Bank Details
            </button>
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow border cursor-pointer hover:shadow-md" onClick={goToInvoice}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Total Invoices</p>
                <p className="text-xl font-bold text-gray-900">0</p>
                <p className="text-xs text-green-600 mt-1">+0% from last month</p>
              </div>
              <div className="text-blue-500 text-xl">📋</div>
            </div>
          </div>
          <SummaryCard title="Pending Payment" amount="₹0" sub="Across 0 invoices" />
          <SummaryCard title="Financing Available" amount="₹0" sub="Based on eligible invoices" />
          <SummaryCard title="Total Received" amount="₹0" sub="Current financial year" />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white border rounded-lg p-4 flex space-x-4 items-start shadow-sm hover:shadow-md cursor-pointer" onClick={goToInvoice}>
              <div className="text-2xl">📄</div>
              <div>
                <h3 className="text-sm font-semibold">Invoice Management</h3>
                <p className="text-sm text-gray-600">Create, edit, and manage all your invoices in one place.</p>
                <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                  Create Invoice
                </button>
              </div>
            </div>
            <ActionCard
              title="Instant Financing"
              description="Get instant advance of up to 100% on your eligible invoices."
              icon="⚡"
            />
            <div className="bg-white border rounded-lg p-4 flex space-x-4 items-start shadow-sm hover:shadow-md cursor-pointer" onClick={goToPaymentMethods}>
              <div className="text-2xl">💳</div>
              <div>
                <h3 className="text-sm font-semibold">Payment Collection</h3>
                <p className="text-sm text-gray-600">Track payments and manage your payment methods.</p>
                <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                  Manage Payment Methods
                </button>
              </div>
            </div>
            <div className="bg-white border rounded-lg p-4 flex space-x-4 items-start shadow-sm hover:shadow-md cursor-pointer" onClick={goToBankDetails}>
              <div className="text-2xl">🏦</div>
              <div>
                <h3 className="text-sm font-semibold">Bank Details</h3>
                <p className="text-sm text-gray-600">Manage your bank account information for payments.</p>
                <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                Manage Bank Details
              </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const SummaryCard = ({ title, amount, sub }) => (
  <div className="bg-white rounded-lg p-4 shadow border">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-bold text-gray-900">{amount}</p>
        <p className="text-xs text-green-600 mt-1">+0% from last month</p>
      </div>
      <div className="text-blue-500 text-xl">📋</div>
    </div>
  </div>
);

const ActionCard = ({ title, description, icon }) => (
  <div className="bg-white border rounded-lg p-4 flex space-x-4 items-start shadow-sm">
    <div className="text-2xl">{icon}</div>
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export default Dashboard;
