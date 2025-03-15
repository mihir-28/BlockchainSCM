import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import DashboardNav from '../components/Dashboard/DashboardNav';
import OverviewPage from '../components/Dashboard/OverviewPage';
import ProductsPage from './ProductsPage';
import { kpiData, recentTransactions } from '../data/mockData';

const DashboardPage = () => {
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
      setIsLoading(true);
      
      // Check if MetaMask is available
      const { ethereum } = window;
      if (!ethereum) {
        navigate('/wallet-connection');
        return;
      }
      
      // Check if a wallet is connected
      try {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length === 0) {
          navigate('/wallet-connection');
          return;
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      } finally {
        // Successful auth check - show dashboard
        setIsLoading(false);
      }
    };
    
    checkWalletConnection();
  }, [navigate]);
  
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
        
        <Routes>
          {/* Main Dashboard Route */}
          <Route path="/" element={
            <OverviewPage 
              kpiData={kpiData} 
              recentTransactions={recentTransactions} 
              currentUser={currentUser} 
            />
          } />
          
          {/* Products Routes */}
          <Route path="/products/*" element={<ProductsPage />} />
          
          {/* Other Routes */}
          <Route path="/transactions" element={<div className="p-6 bg-panel/30 border border-cta/10 rounded-lg text-center">Transactions page coming soon</div>} />
          <Route path="/analytics" element={<div className="p-6 bg-panel/30 border border-cta/10 rounded-lg text-center">Analytics page coming soon</div>} />
          <Route path="/settings" element={<div className="p-6 bg-panel/30 border border-cta/10 rounded-lg text-center">Settings page coming soon</div>} />
          <Route path="/profile" element={<div className="p-6 bg-panel/30 border border-cta/10 rounded-lg text-center">Profile page coming soon</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardPage;