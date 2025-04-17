import React, { useState, useEffect } from 'react';
import { FaUserShield, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminSetup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDevelopment, setIsDevelopment] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we're in development mode
    const isDevEnvironment = process.env.NODE_ENV === 'development';
    setIsDevelopment(isDevEnvironment);

    // Redirect if not in development mode
    if (!isDevEnvironment) {
      navigate('/dashboard');
    }
  }, [navigate]);

  // Grant admin role directly in database
  const handleSetupAdmin = async () => {
    if (!currentUser) {
      toast.error("You must be logged in to set up admin access");
      return;
    }

    setIsLoading(true);
    try {
      // Update user's role in Firestore
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        role: 'ADMIN_ROLE'
      });

      toast.success("Admin role granted successfully! Refreshing page in 3 seconds...");

      // Navigate to role management page after 2 seconds instead of reloading
      setTimeout(() => {
        navigate('/dashboard/roles');
      }, 3000);
    } catch (error) {
      console.error("Error setting up admin:", error);
      toast.error(`Failed to grant admin role: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // If not in development mode, don't render this component
  if (!isDevelopment) {
    return null;
  }

  return (
    // Full-page centered container
    <div className="fixed inset-0 flex items-center justify-center p-6 bg-background/50 backdrop-blur-sm z-50">
      {/* Modal container */}
      <div className="bg-panel/90 backdrop-blur-sm rounded-xl border border-cta/20 p-6 max-w-lg w-full shadow-2xl">
        <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-4 mb-6">
          <div className="flex items-center text-yellow-500 font-medium mb-2">
            <FaExclamationTriangle className="mr-2" /> Development Mode Only
          </div>
          <p className="text-yellow-200/70 text-sm">
            This admin setup page is only available in development mode and will not be accessible in production.
          </p>
        </div>

        <h2 className="text-xl font-bold text-text mb-4 flex items-center">
          <FaUserShield className="mr-2 text-cta" /> Admin Setup
        </h2>

        <p className="text-text/70 mb-6">
          This will grant admin privileges to your account.
          <strong className="block mt-2">Only use this for development purposes.</strong>
        </p>

        <button
          onClick={handleSetupAdmin}
          disabled={isLoading || !currentUser}
          className="px-4 py-2 bg-cta hover:bg-cta/90 text-background rounded-lg flex items-center justify-center disabled:opacity-50 w-full"
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin mr-2" /> Processing...
            </>
          ) : (
            <>
              <FaUserShield className="mr-2" /> Setup Admin Access
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AdminSetup;