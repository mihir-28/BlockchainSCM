import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaWallet, 
  FaBell, 
  FaUserCircle, 
  FaCog, 
  FaSignOutAlt 
} from 'react-icons/fa';

const DashboardHeader = ({ currentUser, showProfileMenu, setShowProfileMenu, menuRef, handleLogout }) => {
  // Helper function to format wallet address
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="bg-panel shadow-sm border-b border-cta/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold text-cta">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-background/50 border border-cta/10 rounded-lg py-1.5 pl-8 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-cta/30 w-48"
              />
              <FaSearch className="absolute left-2.5 top-2.5 text-text/50 text-xs" />
            </div>
            <div className="bg-background/50 border border-cta/10 rounded-lg px-3 py-1.5 text-xs text-text/70 flex items-center">
              <FaWallet className="mr-2 text-cta" />
              {currentUser?.profile?.walletAddress ? 
                formatAddress(currentUser.profile.walletAddress) : 
                'Wallet not connected'}
            </div>
            <button className="bg-background/50 border border-cta/10 rounded-lg p-1.5 text-cta/70 hover:text-cta hover:border-cta/20 transition-all">
              <FaBell />
            </button>
            
            {/* Profile Menu */}
            <div 
              className="relative profile-menu-container"
              ref={menuRef}
            >
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)} 
                className="h-9 w-9 rounded-full bg-cta/20 text-cta flex items-center justify-center hover:bg-cta/30 transition-all"
              >
                {currentUser?.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt="Profile" 
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <span className="font-medium">
                    {currentUser?.displayName?.substring(0, 2) || 
                     currentUser?.email?.substring(0, 2)?.toUpperCase() || "MN"}
                  </span>
                )}
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-panel/90 backdrop-blur-sm rounded-lg border border-cta/20 shadow-lg z-10 py-1">
                  <div className="px-4 py-2 border-b border-cta/10">
                    <p className="text-sm font-medium text-text">{currentUser?.displayName || "User"}</p>
                    <p className="text-xs text-text/60 truncate">{currentUser?.email}</p>
                  </div>
                  <Link 
                    to="/dashboard/profile" 
                    className="px-4 py-2 text-sm text-text/80 hover:bg-cta/10 hover:text-cta flex items-center"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <FaUserCircle className="mr-2" /> My Profile
                  </Link>
                  <Link 
                    to="/dashboard/settings" 
                    className="px-4 py-2 text-sm text-text/80 hover:bg-cta/10 hover:text-cta flex items-center"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <FaCog className="mr-2" /> Settings
                  </Link>
                  <div className="border-t border-cta/10 my-1"></div>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 flex items-center"
                  >
                    <FaSignOutAlt className="mr-2" /> Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;