import React from 'react';

const AdminHeader = ({ title }) => {
  // Get current date range for display
  const getCurrentDateRange = () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    const formatDate = (date) => {
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    };
    
    return `${formatDate(startOfMonth)} - ${formatDate(endOfMonth)}`;
  };

  return (
    <header className="bg-white shadow-lg p-4 flex justify-between items-center rounded-bl-xl">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-800">Mascons Admin - {title || 'Super Admin'}</h1>
        <span className="ml-4 text-gray-500 text-sm">{getCurrentDateRange()}</span>
      </div>
      <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center transition duration-200 ease-in-out hover:scale-105">
        Quick Links
        <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </header>
  );
};

export default AdminHeader;