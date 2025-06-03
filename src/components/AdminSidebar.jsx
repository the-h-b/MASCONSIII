import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSignOut } from '../utils/auth';

const AdminSidebar = () => {
  const location = useLocation();
  const handleSignOut = useSignOut();
  
  
  return (
    <div className="w-64 bg-blue-900 text-white flex flex-col p-4 shadow-2xl rounded-r-xl">
      <div className="flex items-center mb-8">
        {/* Masccons Logo */}
        <span className="text-3xl font-extrabold text-white">Mascons</span>
      </div>
      <nav className="flex-1">
        <ul>
          {/* Dashboard */}
          <li className="mb-2">
            <Link 
              to="/admin-dashboard" 
              className={`flex items-center p-3 rounded-lg ${location.pathname === '/admin-dashboard' ? 'bg-blue-800' : 'hover:bg-white-800'} text-white transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md`}
            >
              {/* Dashboard Icon SVG */}
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Dashboard
            </Link>
          </li>

          
          {/* Step 1: Program Management */}
          <li className="mb-2">
            <Link 
              to="/programs" 
              className={`flex items-center p-3 rounded-lg ${location.pathname === '/programs' ? 'bg-blue-800' : 'hover:bg-blue-800'} text-white transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md`}
            >
              {/* Program Management Icon SVG */}
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              Program Management
            </Link>
          </li>
          
          {/* Step 2: Anchor Management */}
          <li className="mb-2">
            <Link 
              to="/anchors" 
              className={`flex items-center p-3 rounded-lg ${location.pathname === '/anchors' ? 'bg-blue-800' : 'hover:bg-blue-800'} text-white transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md`}
            >
              {/* Anchor Management Icon SVG */}
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h6v4H7V5zm2 5h2v2H9v-2z" clipRule="evenodd" />
              </svg>
              Anchor Management
            </Link>
          </li>
          
          {/* Step 3: Lender Management */}
          <li className="mb-2">
            <Link 
              to="/lenders" 
              className={`flex items-center p-3 rounded-lg ${location.pathname === '/lenders' ? 'bg-blue-800' : 'hover:bg-blue-800'} text-white transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md`}
            >
              {/* Lender Management Icon SVG */}
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Lender Management
            </Link>
          </li>
          
          {/* Step 4: Client Management */}
          <li className="mb-2">
            <Link 
              to="/financing-clients" 
              className={`flex items-center p-3 rounded-lg ${location.pathname === '/financing-clients' ? 'bg-blue-800' : 'hover:bg-blue-800'} text-white transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md`}
            >
              {/* Client Management Icon SVG */}
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zm-6 9a3 3 0 100-6 3 3 0 000 6zm7-6a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Client Management
            </Link>
          </li>
          
          {/* Step 5: Admin Controls */}
          <li className="mb-2">
            <Link 
              to="/admin-tools" 
              className={`flex items-center p-3 rounded-lg ${location.pathname === '/admin-tools' ? 'bg-blue-800' : 'hover:bg-blue-800'} text-white transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md`}
            >
              {/* Admin Controls Icon SVG */}
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.16-1.47-1.16-1.85 0L8.5 7.28a1 1 0 01-.78.78L3.17 9.51c-1.16.38-1.16 1.47 0 1.85l4.55 1.55a1 1 0 01.78.78l1.55 4.55c.38 1.16 1.47 1.16 1.85 0l1.55-4.55a1 1 0 01.78-.78l4.55-1.55c1.16-.38 1.16-1.47 0-1.85l-4.55-1.55a1 1 0 01-.78-.78L11.49 3.17z" clipRule="evenodd" />
              </svg>
              Admin Controls
            </Link>
          </li>
          
          {/* Original pages to keep */}
          <li className="mt-6 mb-2">
            <div className="px-3 text-xs uppercase font-semibold text-white">
              Card Management
            </div>
          </li>
          
          <li className="mb-2">
            <Link 
              to="/cards" 
              className={`flex items-center p-3 rounded-lg ${location.pathname === '/cards' ? 'bg-blue-800' : 'hover:bg-blue-800'} text-white transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md`}
            >
              {/* Cards Icon SVG */}
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Cards
            </Link>
          </li>
          
          {/* Other system features */}
          <li className="mt-6 mb-2">
            <div className="px-3 text-xs uppercase font-semibold text-white">
              System
            </div>
          </li>
          
          <li className="mb-2">
            <Link 
              to="/settings" 
              className={`flex items-center p-3 rounded-lg ${location.pathname === '/settings' ? 'bg-blue-800' : 'hover:bg-blue-800'} text-white transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md`}
            >
              {/* Settings Icon SVG */}
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.16-1.47-1.16-1.85 0L8.5 7.28a1 1 0 01-.78.78L3.17 9.51c-1.16.38-1.16 1.47 0 1.85l4.55 1.55a1 1 0 01.78.78l1.55 4.55c.38 1.16 1.47 1.16 1.85 0l1.55-4.55a1 1 0 01.78-.78l4.55-1.55c1.16-.38 1.16-1.47 0-1.85l-4.55-1.55a1 1 0 01-.78-.78L11.49 3.17z" clipRule="evenodd" />
              </svg>
              Settings
            </Link>
          </li>
          
          <li className="mb-2">
            <Link 
              to="/profile" 
              className={`flex items-center p-3 rounded-lg ${location.pathname === '/profile' ? 'bg-blue-800' : 'hover:bg-blue-800'} text-white transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md`}
            >
              {/* Profile Icon SVG */}
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Profile
            </Link>
          </li>
        </ul>
      </nav>
      {/* Logout at the bottom */}
      <div className="mt-auto pt-4 border-t border-blue-800">
        <ul>
          <li>
            <button
              onClick={handleSignOut}
              className="flex items-center p-3 rounded-lg hover:bg-blue-800 w-full text-left text-white transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md"
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