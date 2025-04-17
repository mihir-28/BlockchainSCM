import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaBox,
  FaExchangeAlt,
  FaChartPie,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaHome,
  FaUserShield,
} from 'react-icons/fa';

const DashboardNav = ({ handleLogout }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const getMobileNavClasses = (path) => {
    return isActive(path)
      ? "bg-cta/10 border border-cta/30 text-cta rounded-lg px-4 py-3 text-sm font-medium flex items-center w-full"
      : "bg-background/50 border border-cta/10 text-text/70 hover:text-cta hover:border-cta/20 rounded-lg px-4 py-3 text-sm font-medium flex items-center w-full transition-all";
  };

  // Navigation items for cleaner rendering
  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: <FaTachometerAlt className="mr-2" /> },
    { path: '/dashboard/products', label: 'Products', icon: <FaBox className="mr-2" /> },
    { path: '/dashboard/transactions', label: 'Transactions', icon: <FaExchangeAlt className="mr-2" /> },
    { path: '/dashboard/analytics', label: 'Analytics', icon: <FaChartPie className="mr-2" /> },
    { path: '/dashboard/settings', label: 'Settings', icon: <FaCog className="mr-2" /> },
    { path: '/dashboard/profile', label: 'Profile', icon: <FaUserCircle className="mr-2" /> },
    { path: '/dashboard/roles', label: 'Roles', icon: <FaUserShield className="mr-2" /> },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Navigation - Hidden on small screens */}
      <div className="hidden md:flex flex-wrap gap-2 mb-6">
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

        {/* Actions at the end - Home and Logout */}
        <div className="ml-auto flex gap-2">
          <Link
            to="/"
            className="bg-background/50 border border-cta/30 text-cta hover:bg-cta/10 rounded-lg px-4 py-2 text-sm font-medium flex items-center transition-all"
          >
            <FaHome className="mr-2" /> Home
          </Link>

          <button
            onClick={handleLogout}
            className="bg-background/50 border border-red-500/30 text-red-500 hover:bg-red-500/10 rounded-lg px-4 py-2 text-sm font-medium flex items-center transition-all cursor-pointer"
          >
            <FaSignOutAlt className="mr-2" /> Log Out
          </button>
        </div>
      </div>

      {/* Mobile Navigation Bar - Visible only on small screens */}
      <div className="md:hidden mb-6">
        <div className="flex items-center justify-between">
          {/* Current page indicator */}
          <div className="text-text font-medium flex items-center">
            {navItems.find(item => isActive(item.path))?.icon}
            {navItems.find(item => isActive(item.path))?.label || 'Dashboard'}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg bg-background/50 border border-cta/20 text-cta"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="mt-4 bg-panel/30 backdrop-blur-sm border border-cta/10 rounded-lg p-3 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={getMobileNavClasses(item.path)}
                aria-current={isActive(item.path) ? "page" : undefined}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon} {item.label}
              </Link>
            ))}

            {/* Divider */}
            <div className="border-t border-cta/10 my-2"></div>

            {/* Home Button */}
            <Link
              to="/"
              className="bg-background/50 border border-cta/30 text-cta hover:bg-cta/10 rounded-lg px-4 py-3 text-sm font-medium flex items-center w-full transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaHome className="mr-2" /> Go to Home
            </Link>

            {/* Mobile Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-background/50 border border-red-500/30 text-red-500 hover:bg-red-500/10 rounded-lg px-4 py-3 text-sm font-medium flex items-center w-full transition-all cursor-pointer"
            >
              <FaSignOutAlt className="mr-2" /> Log Out
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardNav;