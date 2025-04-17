import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaLock, FaArrowLeft, FaHome } from 'react-icons/fa';

const Unauthorized = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full bg-panel/20 backdrop-blur-sm rounded-xl border border-cta/20 p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full flex items-center justify-center bg-red-100 text-red-500">
            <FaLock size={32} />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-text mb-2">Access Denied</h1>
        
        <p className="text-text/70 mb-6">
          You don't have permission to access this resource. This area requires specific role permissions.
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center px-4 py-2 border border-cta/20 rounded hover:bg-panel/30 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Go Back
          </button>
          
          <Link
            to="/dashboard"
            className="flex items-center justify-center px-4 py-2 bg-cta text-background rounded hover:bg-cta/90 transition-colors"
          >
            <FaHome className="mr-2" /> Dashboard
          </Link>
        </div>
        
        <div className="mt-8 text-sm text-text/50">
          If you believe you should have access to this page, please contact your administrator.
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;