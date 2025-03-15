import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaBox,
  FaExchangeAlt,
  FaChartPie,
  FaCog,
  FaSignOutAlt,
  FaUserCircle
} from 'react-icons/fa';

const DashboardNav = ({ handleLogout }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Helper function to determine if a nav item is active
  const isActive = (path) => {
    if (path === '/dashboard' && (currentPath === '/dashboard' || currentPath === '/dashboard/')) {
      return true;
    }
    if (path !== '/dashboard' && currentPath.startsWith(path)) {
      return true;
    }
    return false;
  };
  
  // Function to generate appropriate class names based on active state
  const getNavClasses = (path) => {
    return isActive(path) 
      ? "bg-cta/10 border border-cta/30 text-cta rounded-lg px-4 py-2 text-sm font-medium flex items-center" 
      : "bg-background/50 border border-cta/10 text-text/70 hover:text-cta hover:border-cta/20 rounded-lg px-4 py-2 text-sm font-medium flex items-center transition-all";
  };
  
  // Navigation items for cleaner rendering
  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: <FaTachometerAlt className="mr-2" /> },
    { path: '/dashboard/products', label: 'Products', icon: <FaBox className="mr-2" /> },
    { path: '/dashboard/transactions', label: 'Transactions', icon: <FaExchangeAlt className="mr-2" /> },
    { path: '/dashboard/analytics', label: 'Analytics', icon: <FaChartPie className="mr-2" /> },
    { path: '/dashboard/settings', label: 'Settings', icon: <FaCog className="mr-2" /> },
    { path: '/dashboard/profile', label: 'Profile', icon: <FaUserCircle className="mr-2" /> },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {/* Map through navigation items */}
      {navItems.map((item) => (
        <Link 
          key={item.path}
          to={item.path}
          className={getNavClasses(item.path)}
          aria-current={isActive(item.path) ? "page" : undefined}
        >
          {item.icon} {item.label}
        </Link>
      ))}
      
      {/* Logout Button - Always at the end */}
      <button 
        onClick={handleLogout}
        className="ml-auto bg-background/50 border border-red-500/30 text-red-500 hover:bg-red-500/10 rounded-lg px-4 py-2 text-sm font-medium flex items-center transition-all"
      >
        <FaSignOutAlt className="mr-2" /> Log Out
      </button>
    </div>
  );
};

export default DashboardNav;