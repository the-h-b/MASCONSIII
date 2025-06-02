import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userRole = localStorage.getItem('userRole');
  const location = useLocation();

  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If a specific role is required and user doesn't have it, redirect
  if (requiredRole && userRole !== requiredRole) {
    // Redirect admin to admin dashboard
    if (userRole === 'admin') {
      return <Navigate to="/admin-dashboard" replace />;
    }
    // Redirect user to user dashboard
    return <Navigate to="/basic-details" replace />;
  }

  // If all checks pass, render the children
  return children;
};

export default ProtectedRoute;