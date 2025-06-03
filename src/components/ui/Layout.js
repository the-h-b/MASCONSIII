// src/components/Layout.js

import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <main className="flex-grow p-6 bg-gray-100 overflow-y-auto">
        {children}
      </main>
      <aside className="flex-shrink-0">
        <Sidebar />
      </aside>
    </div>
  );
};

export default Layout;
