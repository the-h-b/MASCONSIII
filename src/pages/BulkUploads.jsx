import React from 'react';
import AdminLayout from '../components/AdminLayout';

const BulkUploads = () => {
  return (
    <AdminLayout title="Bulk Uploads">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Bulk Uploads</h2>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-gray-700">
          This is a placeholder for the Bulk Uploads page. The actual implementation will include interfaces for uploading and processing bulk data, such as customer information, card issuance requests, and transaction data.
        </p>
      </div>
    </AdminLayout>
  );
};

export default BulkUploads;