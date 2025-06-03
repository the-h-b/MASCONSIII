import React from 'react';
import AdminLayout from '../components/AdminLayout';

const Program = () => {
  return (
    <AdminLayout title="Program Management">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Program Management</h2>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-gray-700">
          This is a placeholder for the Program Management page. The actual implementation will include interfaces for creating and managing card programs, including features, limits, and configurations.
        </p>
      </div>
    </AdminLayout>
  );
};

export default Program;