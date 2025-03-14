import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaTachometerAlt, 
  FaBox, 
  FaExchangeAlt, 
  FaChartPie, 
  FaUserShield, 
  FaCog,
  FaBell,
  FaSearch,
  FaClipboardList,
  FaCheckCircle,
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown,
  FaSignOutAlt,
  FaUserCircle
} from 'react-icons/fa';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Mock data for the dashboard
const recentTransactions = [
  { id: 'TX9802342', type: 'Product Registration', status: 'Confirmed', timestamp: '2023-06-15 14:32:45', hash: '0x7fe2...93a1' },
  { id: 'TX9802341', type: 'Ownership Transfer', status: 'Pending', timestamp: '2023-06-15 13:45:22', hash: '0x8ad1...76c2' },
  { id: 'TX9802340', type: 'Verification Request', status: 'Confirmed', timestamp: '2023-06-15 11:20:18', hash: '0x6fc3...12d4' },
  { id: 'TX9802339', type: 'Product Update', status: 'Failed', timestamp: '2023-06-15 09:15:31', hash: '0x5ab2...89e7' },
];

const kpiData = [
  { title: 'Active Products', value: '143', change: '+12%', isPositive: true, icon: <FaBox className="text-xl" /> },
  { title: 'Transactions Today', value: '27', change: '+5%', isPositive: true, icon: <FaExchangeAlt className="text-xl" /> },
  { title: 'Success Rate', value: '98.2%', change: '-0.5%', isPositive: false, icon: <FaCheckCircle className="text-xl" /> },
  { title: 'Failed Transactions', value: '3', change: '+2', isPositive: false, icon: <FaExclamationTriangle className="text-xl" /> }
];

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileMenu && !event.target.closest('.profile-menu-container')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Dashboard Header */}
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
              <button className="bg-background/50 border border-cta/10 rounded-lg p-1.5 text-cta/70 hover:text-cta hover:border-cta/20 transition-all">
                <FaBell />
              </button>
              
              {/* Profile Menu */}
              <div className="relative profile-menu-container">
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
      
      <div className="container mx-auto px-4 pt-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Link to="/dashboard" className="bg-cta/10 border border-cta/30 text-cta rounded-lg px-4 py-2 text-sm font-medium flex items-center">
            <FaTachometerAlt className="mr-2" /> Overview
          </Link>
          <Link to="/dashboard/products" className="bg-background/50 border border-cta/10 text-text/70 hover:text-cta hover:border-cta/20 rounded-lg px-4 py-2 text-sm font-medium flex items-center transition-all">
            <FaBox className="mr-2" /> Products
          </Link>
          <Link to="/dashboard/transactions" className="bg-background/50 border border-cta/10 text-text/70 hover:text-cta hover:border-cta/20 rounded-lg px-4 py-2 text-sm font-medium flex items-center transition-all">
            <FaExchangeAlt className="mr-2" /> Transactions
          </Link>
          <Link to="/dashboard/analytics" className="bg-background/50 border border-cta/10 text-text/70 hover:text-cta hover:border-cta/20 rounded-lg px-4 py-2 text-sm font-medium flex items-center transition-all">
            <FaChartPie className="mr-2" /> Analytics
          </Link>
          <Link to="/dashboard/settings" className="bg-background/50 border border-cta/10 text-text/70 hover:text-cta hover:border-cta/20 rounded-lg px-4 py-2 text-sm font-medium flex items-center transition-all">
            <FaCog className="mr-2" /> Settings
          </Link>
          {/* Logout Button - Alternative position if you want it in the tabs */}
          <button 
            onClick={handleLogout}
            className="ml-auto bg-background/50 border border-red-500/30 text-red-500 hover:bg-red-500/10 rounded-lg px-4 py-2 text-sm font-medium flex items-center transition-all"
          >
            <FaSignOutAlt className="mr-2" /> Log Out
          </button>
        </div>
        
        <Routes>
          <Route path="/" element={<DashboardOverview isLoading={isLoading} kpiData={kpiData} recentTransactions={recentTransactions} />} />
          <Route path="/products" element={<div className="p-6 bg-panel/30 border border-cta/10 rounded-lg text-center">Products page coming soon</div>} />
          <Route path="/transactions" element={<div className="p-6 bg-panel/30 border border-cta/10 rounded-lg text-center">Transactions page coming soon</div>} />
          <Route path="/analytics" element={<div className="p-6 bg-panel/30 border border-cta/10 rounded-lg text-center">Analytics page coming soon</div>} />
          <Route path="/settings" element={<div className="p-6 bg-panel/30 border border-cta/10 rounded-lg text-center">Settings page coming soon</div>} />
          <Route path="/profile" element={<div className="p-6 bg-panel/30 border border-cta/10 rounded-lg text-center">Profile page coming soon</div>} />
        </Routes>
      </div>
    </div>
  );
};

// Dashboard Overview Component
const DashboardOverview = ({ isLoading, kpiData, recentTransactions }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cta"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-panel/30 backdrop-blur-sm border border-cta/10 rounded-lg p-6 hover:border-cta/30 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="bg-cta/10 p-3 rounded-lg">
                {kpi.icon}
              </div>
              <div className={`flex items-center ${kpi.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                <span className="text-xs font-medium">{kpi.change}</span>
                {kpi.isPositive ? <FaArrowUp className="ml-1 text-xs" /> : <FaArrowDown className="ml-1 text-xs" />}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-text/60 text-sm">{kpi.title}</p>
              <h4 className="text-2xl font-display font-bold mt-1 text-text">{kpi.value}</h4>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-panel/30 backdrop-blur-sm border border-cta/10 rounded-lg overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-cta/10">
          <h3 className="text-lg font-display font-bold text-cta flex items-center">
            <FaClipboardList className="mr-2" /> Recent Transactions
          </h3>
          <Link to="/dashboard/transactions" className="text-xs text-cta hover:text-cta/80 transition-all">
            View All
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-cta/10">
            <thead className="bg-panel/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text/60 tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text/60 tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text/60 tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text/60 tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text/60 tracking-wider">Hash</th>
              </tr>
            </thead>
            <tbody className="bg-background/20 divide-y divide-cta/5">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-cta/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text">{transaction.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text/70">{transaction.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${transaction.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                        transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text/70">{transaction.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-cta font-mono">{transaction.hash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Coming Soon Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="bg-panel/30 backdrop-blur-sm border border-cta/10 rounded-lg p-6"
      >
        <div className="text-center py-8">
          <div className="bg-cta/10 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUserShield className="text-cta text-3xl" />
          </div>
          <h3 className="text-xl font-display font-bold text-cta mb-2">Role-Based Dashboard</h3>
          <p className="text-text/70 max-w-md mx-auto">
            Custom dashboard views for manufacturers, suppliers, distributors, and customers coming soon.
            Stay tuned for updates.
          </p>
          <button className="mt-6 bg-cta/10 hover:bg-cta/20 text-cta border border-cta/30 rounded-lg px-4 py-2 transition-all">
            Request Early Access
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;