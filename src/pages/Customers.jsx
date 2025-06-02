import React from 'react';
import AdminLayout from '../components/AdminLayout';

const Customers = () => {
  return (
    <AdminLayout title="Customers">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Customers Management</h2>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-gray-700">
          This is a placeholder for the Customers Management page. The actual implementation will include a customer database, search functionality, and tools for managing customer information and accounts.
        </p>
      </div>
    </AdminLayout>
  );
};

export default Customers;