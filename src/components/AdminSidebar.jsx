import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSignOut } from '../utils/auth';

const AdminSidebar = () => {
  const location = useLocation();
  const handleSignOut = useSignOut();
  
  // Helper to determine if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 bg-blue-900 text-white flex flex-col p-4 shadow-2xl rounded-r-xl">
      <div className="flex items-center mb-8">
        {/* Masccons Logo */}
        <span className="text-3xl font-extrabold text-white">Masccons</span>
      </div>
      <nav className="flex-1">
        <ul>
          <li className="mb-2">
            <Link 
              to="/admin-dashboard" 
              className={`flex items-center p-3 rounded-lg ${isActive('/admin-dashboard') ? 'bg-blue-800' : 'hover:bg-blue-800'} text-white transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md`}
            >
              {/* Dashboard Icon SVG */}
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="/master-bin" 
              className={`flex items-center p-3 rounded-lg ${isActive('/master-bin') ? 'bg-blue-800' : 'hover:bg-blue-800'} transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md`}
            >
              {/* Master BIN Icon SVG */}
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Master BIN
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="/master-clients" 
              className={`flex items-center p-3 rounded-lg ${isActive('/master-clients') ? 'bg-blue-800' : 'hover:bg-blue-800'} transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md`}
            >
              {/* Master Clients Icon SVG */}
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Master Clients
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="/bin-setup" 
              className={`flex items-center p-3 rounded-lg ${isActive('/bin-setup') ? 'bg-blue-800' : 'hover:bg-blue-800'} transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md`}
            >
              {/* BIN Setup Icon SVG */}
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM13 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zM13 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" />
              </svg>
              BIN Setup
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="/embosser-logo" 
              className={`flex items-center p-3 rounded-lg ${isActive('/embosser-logo') ? 'bg-blue-800' : 'hover:bg-blue-800'} transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md`}
            >
              {/* Embosser Logo Icon SVG */}
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-4 4 4 4-4V5h-2v4l-2-2-4 4zm-2 6a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Embosser Logo
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="/program" 
              className={`flex items-center p-3 rounded-lg ${isActive('/program') ? 'bg-blue-800' : 'hover:bg-blue-800'} transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md`}
            >
              {/* Program Icon SVG */}
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              Program
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="/clients" 
              className={`flex items-center p-3 rounded-lg ${isActive('/clients') ? 'bg-blue-800' : 'hover:bg-blue-800'} transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md`}
            >
              {/* Clients Icon SVG */}
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zm-6 9a3 3 0 100-6 3 3 0 000 6zm7-6a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Clients
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="/client-prefund" 
              className={`flex items-center p-3 rounded-lg ${isActive('/client-prefund') ? 'bg-blue-800' : 'hover:bg-blue-800'} transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md`}
            >
              {/* Client Prefund Icon SVG */}
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Client Prefund
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="/customers" 
              className={`flex items-center p-3 rounded-lg ${isActive('/customers') ? 'bg-blue-800' : 'hover:bg-blue-800'} transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md`}
            >
              {/* Customers Icon SVG */}
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Customers
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="/cards" 
              className={`flex items-center p-3 rounded-lg ${isActive('/cards') ? 'bg-blue-800' : 'hover:bg-blue-800'} transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md`}
            >
              {/* Cards Icon SVG */}
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Cards
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="/fraud-management" 
              className={`flex items-center p-3 rounded-lg ${isActive('/fraud-management') ? 'bg-blue-800' : 'hover:bg-blue-800'} transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md`}
            >
              {/* Fraud Management Icon SVG */}
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Fraud Management
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="/loyalty-management" 
              className={`flex items-center p-3 rounded-lg ${isActive('/loyalty-management') ? 'bg-blue-800' : 'hover:bg-blue-800'} transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md`}
            >
              {/* Loyalty Management Icon SVG */}
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v16a1 1 0 01-2 0V2a1 1 0 011-1.046zM14.5 4.046A1 1 0 0115 5v14a1 1 0 01-2 0V5a1 1 0 011-1.046zM7.5 7.046A1 1 0 018 8v11a1 1 0 01-2 0V8a1 1 0 011-1.046z" clipRule="evenodd" />
              </svg>
              Loyalty Management
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="/bulk-uploads" 
              className={`flex items-center p-3 rounded-lg ${isActive('/bulk-uploads') ? 'bg-blue-800' : 'hover:bg-blue-800'} transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md`}
            >
              {/* Bulk Uploads Icon SVG */}
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Bulk Uploads
            </Link>
          </li>
        </ul>
      </nav>
      {/* Profile, Settings, Logout at the bottom */}
      <div className="mt-auto pt-4 border-t border-blue-800">
        <ul>
          <li className="mb-2">
            <Link 
              to="/profile" 
              className={`flex items-center p-3 rounded-lg ${isActive('/profile') ? 'bg-blue-800' : 'hover:bg-blue-800'} transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md`}
            >
              {/* Profile Icon SVG */}
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Profile
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="/settings" 
              className={`flex items-center p-3 rounded-lg ${isActive('/settings') ? 'bg-blue-800' : 'hover:bg-blue-800'} transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md`}
            >
              {/* Settings Icon SVG */}
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.16-1.47-1.16-1.85 0L8.5 7.28a1 1 0 01-.78.78L3.17 9.51c-1.16.38-1.16 1.47 0 1.85l4.55 1.55a1 1 0 01.78.78l1.55 4.55c.38 1.16 1.47 1.16 1.85 0l1.55-4.55a1 1 0 01.78-.78l4.55-1.55c1.16-.38 1.16-1.47 0-1.85l-4.55-1.55a1 1 0 01-.78-.78L11.49 3.17z" clipRule="evenodd" />
              </svg>
              Settings
            </Link>
          </li>
          <li>
            <button
              onClick={handleSignOut}
              className="flex items-center p-3 rounded-lg hover:bg-blue-800 w-full text-left transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md"
            >
              {/* Logout Icon SVG */}
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;