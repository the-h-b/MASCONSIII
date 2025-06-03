import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout = ({ children, title }) => {
  return (
    <div className="flex min-h-screen bg-gray-100 font-inter">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Top Bar */}
        <AdminHeader title={title} />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;