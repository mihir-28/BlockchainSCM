import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import DashboardNav from '../components/Dashboard/DashboardNav';
import { recentTransactions, kpiData } from '../data/mockData'; // Import mock data
import { isMobileDevice } from '../utils/deviceDetection';
import BlockchainDebugger from '../components/Debug/BlockchainDebugger'; // Import the BlockchainDebugger component

const DashboardLayout = () => {
  // STATE HOOKS
  const [isLoading, setIsLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // CONTEXT HOOKS
  const { currentUser, logout } = useAuth();
  
  // REF HOOKS
  const menuRef = useRef(null);
  
  // NAVIGATION HOOKS
  const navigate = useNavigate();
  
  // EFFECT HOOKS
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (!currentUser) {
        navigate('/login');
        return;
      }
      
      // Check if on mobile device
      if (isMobileDevice()) {
        // Skip wallet connection check for mobile users
        setIsLoading(false);
        return;
      }
      
      const { ethereum } = window;
      if (!ethereum) {
        navigate('/wallet-connection');
        return;
      }
      
      try {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length === 0) {
          navigate('/wallet-connection');
          return;
        }
        
        // All checks passed
        setIsLoading(false);
      } catch (error) {
        console.error("Error checking wallet connection:", error);
        navigate('/wallet-connection');
      }
    };
    
    checkWalletConnection();
  }, [currentUser, navigate]);

  // Handle outside click to close profile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);
  
  // HANDLERS
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-background">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cta"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Dashboard Header */}
      <DashboardHeader 
        currentUser={currentUser} 
        showProfileMenu={showProfileMenu}
        setShowProfileMenu={setShowProfileMenu}
        menuRef={menuRef}
        handleLogout={handleLogout}
      />
      
      <div className="container mx-auto px-4 pt-6">
        {/* Navigation Tabs */}
        <DashboardNav handleLogout={handleLogout} />
        
        {/* Pass the data to child routes via context */}
        <Outlet context={{ 
          currentUser, 
          kpiData, 
          recentTransactions
        }} />
        <BlockchainDebugger />
      </div>
    </div>
  );
};

export default DashboardLayout;