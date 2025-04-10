import React, { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { 
  FaUserCircle, 
  FaWallet, 
  FaEnvelope, 
  FaBuilding, 
  FaPhone, 
  FaShieldAlt, 
  FaEdit, 
  FaSave, 
  FaKey, 
  FaClipboard,
  FaCheck,
  FaExclamationTriangle,
  FaEthereum
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { currentUser } = useOutletContext();
  const { updateUserProfile, updatePassword } = useAuth();
  
  // State for profile data
  const [profileData, setProfileData] = useState({
    displayName: currentUser?.displayName || '',
    company: currentUser?.profile?.company || '',
    phone: currentUser?.profile?.phone || '',
    walletAddress: currentUser?.profile?.walletAddress || '',
    role: currentUser?.profile?.role || 'User'
  });
  
  // Edit states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Success/Error messages
  const [profileUpdateStatus, setProfileUpdateStatus] = useState(null);
  const [passwordUpdateStatus, setPasswordUpdateStatus] = useState(null);
  const [walletCopied, setWalletCopied] = useState(false);
  
  // Wallet balance states
  const [walletBalance, setWalletBalance] = useState(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [showBalance, setShowBalance] = useState(false);

  // ETH price states
  const [ethPrice, setEthPrice] = useState({ usd: null, inr: null });
  const [isPriceLoading, setIsPriceLoading] = useState(false);
  
  // Update profile data when user info changes
  useEffect(() => {
    if (currentUser) {
      setProfileData({
        displayName: currentUser.displayName || '',
        company: currentUser?.profile?.company || '',
        phone: currentUser?.profile?.phone || '',
        walletAddress: currentUser?.profile?.walletAddress || '',
        role: currentUser?.profile?.role || 'User'
      });
    }
  }, [currentUser]);
  
  // Reset status messages after delay
  useEffect(() => {
    if (profileUpdateStatus) {
      const timer = setTimeout(() => {
        setProfileUpdateStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [profileUpdateStatus]);
  
  useEffect(() => {
    if (passwordUpdateStatus) {
      const timer = setTimeout(() => {
        setPasswordUpdateStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [passwordUpdateStatus]);
  
  useEffect(() => {
    if (walletCopied) {
      const timer = setTimeout(() => {
        setWalletCopied(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [walletCopied]);

  // Load showBalance setting from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setShowBalance(!!parsedSettings.showBalance);
      } catch (error) {
        console.error("Error parsing saved settings:", error);
      }
    }
  }, []);

  // Fetch balance when wallet address changes or when showBalance setting changes
  useEffect(() => {
    if (showBalance && profileData.walletAddress) {
      fetchWalletBalance();
    }
  }, [profileData.walletAddress, showBalance]);

  // Add this useEffect to fetch prices when the component loads
  useEffect(() => {
    if (showBalance && profileData.walletAddress) {
      fetchEthPrice();
    }
  }, [showBalance, profileData.walletAddress]);

  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };
  
  // Handle password form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };
  
  // Save profile changes
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({
        displayName: profileData.displayName,
        company: profileData.company,
        phone: profileData.phone
      });
      
      setProfileUpdateStatus({ 
        success: true, 
        message: 'Profile updated successfully!' 
      });
      setIsEditingProfile(false);
    } catch (error) {
      setProfileUpdateStatus({ 
        success: false, 
        message: error.message || 'Failed to update profile. Please try again.' 
      });
    }
  };
  
  // Save password changes
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordUpdateStatus({
        success: false,
        message: 'New passwords do not match.'
      });
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setPasswordUpdateStatus({
        success: false,
        message: 'Password must be at least 8 characters.'
      });
      return;
    }
    
    try {
      await updatePassword(passwordData.currentPassword, passwordData.newPassword);
      setPasswordUpdateStatus({
        success: true,
        message: 'Password updated successfully!'
      });
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setPasswordUpdateStatus({
        success: false,
        message: error.message || 'Failed to update password. Please try again.'
      });
    }
  };
  
  // Copy wallet address to clipboard
  const copyWalletAddress = () => {
    if (profileData.walletAddress) {
      navigator.clipboard.writeText(profileData.walletAddress);
      setWalletCopied(true);
    }
  };
  
  // Format wallet address for display
  const formatWalletAddress = (address) => {
    if (!address || address.length < 10) return 'Not connected';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Format password last changed date
  const formatPasswordDate = () => {
    const lastChanged = currentUser?.profile?.passwordLastChanged;
    if (!lastChanged) return "Never changed";
    
    return new Date(lastChanged).toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Fix for join date to ensure consistent UTC display
  const formatJoinDate = () => {
    const creationTime = currentUser?.metadata?.creationTime;
    if (!creationTime) return 'Unknown';
    
    const creationDate = new Date(creationTime);
    
    // Option 1: Display in UTC time to match database exactly
    return creationDate.toLocaleDateString(undefined, {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: 'UTC' // This forces display in UTC regardless of local timezone
    });
  };

  // Function to fetch wallet balance from Sepolia
  const fetchWalletBalance = async () => {
    if (!profileData.walletAddress) return;
    
    setIsLoadingBalance(true);
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.error("MetaMask not available");
        return;
      }
      
      // Request to switch to Sepolia network
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xAA36A7' }], // Sepolia chainId
        });
      } catch (switchError) {
        // This error code indicates that the chain hasn't been added to MetaMask
        if (switchError.code === 4902) {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0xAA36A7',
              chainName: 'Sepolia Test Network',
              nativeCurrency: {
                name: 'Sepolia ETH',
                symbol: 'ETH',
                decimals: 18
              },
              rpcUrls: ['https://sepolia.infura.io/v3/'],
              blockExplorerUrls: ['https://sepolia.etherscan.io']
            }]
          });
        } else {
          console.error("Error switching to Sepolia:", switchError);
          return;
        }
      }

      // Get balance
      const balanceHex = await ethereum.request({
        method: 'eth_getBalance',
        params: [profileData.walletAddress, 'latest']
      });
      
      // Convert from wei to ETH (1 ETH = 10^18 wei)
      const balanceWei = parseInt(balanceHex, 16);
      const balanceETH = balanceWei / 1e18;
      
      setWalletBalance(balanceETH.toFixed(4));
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
    } finally {
      setIsLoadingBalance(false);
    }

    // After successfully fetching balance, also fetch current prices
    try {
      await fetchEthPrice();
    } catch (error) {
      console.error("Error updating ETH prices:", error);
    }
  };

  // Add this function with your other functions
  const fetchEthPrice = async () => {
    setIsPriceLoading(true);
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,inr'
      );
      const data = await response.json();
      
      if (data && data.ethereum) {
        setEthPrice({
          usd: data.ethereum.usd,
          inr: data.ethereum.inr
        });
      }
    } catch (error) {
      console.error("Error fetching ETH price:", error);
    } finally {
      setIsPriceLoading(false);
    }
  };

  const joinDate = formatJoinDate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-2xl font-display font-bold text-text flex items-center">
          <FaUserCircle className="mr-3 text-cta" /> Profile Settings
        </h1>
        <div className="mt-2 md:mt-0">
          <span className="bg-cta/10 text-cta px-3 py-1 rounded-full text-xs flex items-center">
            <FaShieldAlt className="mr-1" />
            {profileData.role}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-display font-medium text-text">Personal Information</h2>
              
              {!isEditingProfile ? (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="bg-background/50 border border-cta/10 rounded-lg px-3 py-1.5 text-text/70 hover:text-cta hover:border-cta/20 flex items-center transition-all text-sm"
                >
                  <FaEdit className="mr-2" /> Edit Profile
                </button>
              ) : (
                <button
                  onClick={() => setIsEditingProfile(false)}
                  className="bg-background/50 border border-red-500/20 rounded-lg px-3 py-1.5 text-red-500/70 hover:text-red-500 hover:border-red-500/30 flex items-center transition-all text-sm"
                >
                  Cancel
                </button>
              )}
            </div>
            
            {profileUpdateStatus && (
              <div className={`mb-6 p-3 rounded-lg text-sm ${
                profileUpdateStatus.success 
                  ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                  : 'bg-red-500/10 text-red-500 border border-red-500/20'
              }`}>
                {profileUpdateStatus.message}
              </div>
            )}
            
            <form onSubmit={handleProfileSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="displayName" className="block text-text/90 mb-1 text-sm">Full Name</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -mt-2.5 text-text/50">
                      <FaUserCircle />
                    </div>
                    <input
                      type="text"
                      id="displayName"
                      name="displayName"
                      value={profileData.displayName}
                      onChange={handleProfileChange}
                      disabled={!isEditingProfile}
                      className={`w-full px-10 py-3 bg-background/60 border border-cta/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 transition-all ${!isEditingProfile ? 'opacity-70' : ''}`}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-text/90 mb-1 text-sm">Email Address</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -mt-2.5 text-text/50">
                      <FaEnvelope />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={currentUser?.email || ''}
                      disabled
                      className="w-full px-10 py-3 bg-background/60 border border-cta/10 rounded-lg opacity-70"
                    />
                  </div>
                  <p className="text-xs text-text/50 mt-1">Email cannot be changed</p>
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-text/90 mb-1 text-sm">Company</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -mt-2.5 text-text/50">
                      <FaBuilding />
                    </div>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={profileData.company}
                      onChange={handleProfileChange}
                      disabled={!isEditingProfile}
                      className={`w-full px-10 py-3 bg-background/60 border border-cta/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 transition-all ${!isEditingProfile ? 'opacity-70' : ''}`}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-text/90 mb-1 text-sm">Phone Number</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -mt-2.5 text-text/50">
                      <FaPhone />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      disabled={!isEditingProfile}
                      className={`w-full px-10 py-3 bg-background/60 border border-cta/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 transition-all ${!isEditingProfile ? 'opacity-70' : ''}`}
                    />
                  </div>
                </div>
              </div>
              
              {isEditingProfile && (
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-cta/20 hover:bg-cta/30 text-cta border border-cta/30 rounded-lg transition-all flex items-center"
                  >
                    <FaSave className="mr-2" /> Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
          
          {/* Password section */}
          <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-6 shadow-sm mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-display font-medium text-text">Password Settings</h2>
              
              {!isChangingPassword ? (
                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="bg-background/50 border border-cta/10 rounded-lg px-3 py-1.5 text-text/70 hover:text-cta hover:border-cta/20 flex items-center transition-all text-sm"
                >
                  <FaKey className="mr-2" /> Change Password
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsChangingPassword(false);
                    setPasswordData({
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: ''
                    });
                  }}
                  className="bg-background/50 border border-red-500/20 rounded-lg px-3 py-1.5 text-red-500/70 hover:text-red-500 hover:border-red-500/30 flex items-center transition-all text-sm"
                >
                  Cancel
                </button>
              )}
            </div>
            
            {passwordUpdateStatus && (
              <div className={`mb-6 p-3 rounded-lg text-sm ${
                passwordUpdateStatus.success 
                  ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                  : 'bg-red-500/10 text-red-500 border border-red-500/20'
              }`}>
                {passwordUpdateStatus.message}
              </div>
            )}
            
            {isChangingPassword ? (
              <form onSubmit={handlePasswordSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-text/90 mb-1 text-sm">Current Password</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -mt-2.5 text-text/50">
                        <FaKey />
                      </div>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        required
                        className="w-full px-10 py-3 bg-background/60 border border-cta/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="newPassword" className="block text-text/90 mb-1 text-sm">New Password</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -mt-2.5 text-text/50">
                        <FaKey />
                      </div>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        required
                        className="w-full px-10 py-3 bg-background/60 border border-cta/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-text/90 mb-1 text-sm">Confirm New Password</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -mt-2.5 text-text/50">
                        <FaKey />
                      </div>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                        className="w-full px-10 py-3 bg-background/60 border border-cta/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-cta/20 hover:bg-cta/30 text-cta border border-cta/30 rounded-lg transition-all flex items-center"
                    >
                      <FaSave className="mr-2" /> Update Password
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="bg-background/30 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-cta/10 flex items-center justify-center mr-4">
                    <FaKey className="text-cta" />
                  </div>
                  <div>
                    <h3 className="text-text font-medium">Password</h3>
                    <p className="text-text/60 text-sm">Last changed: {formatPasswordDate()}</p>
                  </div>
                </div>
                <div className="text-text/50">••••••••</div>
              </div>
            )}
            
            <div className="mt-4 text-xs text-text/50">
              <FaExclamationTriangle className="inline mr-1" />
              In some cases for security reasons, you will be asked to log in again after changing your password.
            </div>
          </div>
        </motion.div>
        
        {/* Sidebar with Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Account Summary */}
          <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-6 shadow-sm mb-6">
            <div className="flex items-center mb-6">
              <div className="h-16 w-16 rounded-full bg-cta/10 flex items-center justify-center mr-4">
                {currentUser?.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt={profileData.displayName || 'User'} 
                    className="h-14 w-14 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="text-cta text-3xl" />
                )}
              </div>
              <div>
                <h2 className="font-medium text-text">{profileData.displayName || 'User'}</h2>
                <p className="text-text/60 text-sm">{currentUser?.email}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-background/30 rounded-lg p-3">
                <p className="text-xs text-text/50 mb-1">Member Since</p>
                <p className="text-text/80">{joinDate}</p>
              </div>
              
              <div className="bg-background/30 rounded-lg p-3">
                <p className="text-xs text-text/50 mb-1">Account Type</p>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <p className="text-text/80">{profileData.role}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Wallet Information */}
          <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-display font-medium text-text mb-4">Blockchain Wallet</h2>
            
            <div className="bg-background/30 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 rounded-full bg-cta/10 flex items-center justify-center mr-3">
                  <FaWallet className="text-cta" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text">Connected Wallet</h3>
                  <p className={`text-xs ${profileData.walletAddress ? 'text-green-500' : 'text-amber-500'}`}>
                    {profileData.walletAddress ? 'Connected' : 'Not Connected'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t border-cta/10 pt-3">
                <div className="truncate max-w-[180px]">
                  <p className="text-xs text-text/50 mb-1">Address</p>
                  <p className="font-mono text-text/80 truncate">
                    {formatWalletAddress(profileData.walletAddress)}
                  </p>
                </div>
                {profileData.walletAddress && (
                  <button
                    onClick={copyWalletAddress}
                    className="bg-background/40 border border-cta/10 rounded-lg px-2 py-1 text-text/70 hover:text-cta hover:border-cta/20 transition-all text-xs flex items-center"
                  >
                    {walletCopied ? (
                      <>
                        <FaCheck className="mr-1" /> Copied
                      </>
                    ) : (
                      <>
                        <FaClipboard className="mr-1" /> Copy
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Show balance section */}
              {showBalance && profileData.walletAddress && (
                <div className="mt-3 border-t border-cta/10 pt-3">
                  <p className="text-xs text-text/50 mb-1">Sepolia ETH Balance</p>
                  <div className="flex items-center">
                    <FaEthereum className="text-cta mr-2" />
                    {isLoadingBalance ? (
                      <div className="flex items-center">
                        <svg className="animate-spin h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-text/50 text-xs">Loading...</span>
                      </div>
                    ) : (
                      <div className="font-mono text-text/80">
                        {walletBalance} ETH
                      </div>
                    )}
                  </div>
                  
                  {/* Currency conversions */}
                  {!isLoadingBalance && walletBalance && ethPrice.usd && (
                    <div className="mt-2 text-xs border-t border-cta/10 pt-2">
                      <div className="flex justify-between text-text/70 mb-1">
                        <span>USD Value:</span>
                        <span className="font-mono">
                          ${(parseFloat(walletBalance) * ethPrice.usd).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-text/70">
                        <span>INR Value:</span>
                        <span className="font-mono">
                          ₹{(parseFloat(walletBalance) * ethPrice.inr).toFixed(2)}
                        </span>
                      </div>
                      <div className="text-text/40 text-xxs mt-1 flex items-center">
                        <span className={`h-1.5 w-1.5 rounded-full ${isPriceLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'} mr-1`}></span>
                        {isPriceLoading ? 'Updating rates...' : 'Live exchange rates via CoinGecko'}
                      </div>
                      <div className="text-xxs text-text/40 mt-1">
                        Rates updated: {new Date().toLocaleTimeString()}
                      </div>
                      <div className="text-xxs text-text/40 mt-1">
                        *Values may differ from wallet apps due to different price sources
                      </div>
                    </div>
                  )}
                  
                  <button 
                    onClick={fetchWalletBalance}
                    className="mt-2 text-xs text-cta hover:text-cta/80 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh Balance & Rates
                  </button>
                </div>
              )}

              {/* Not showing balance but wallet is connected */}
              {!showBalance && profileData.walletAddress && (
                <div className="mt-3 border-t border-cta/10 pt-3">
                  <p className="text-xs text-text/50 mb-1">Wallet Balance</p>
                  <div className="flex items-center justify-between">
                    <span className="text-text/60">Hidden</span>
                    <Link 
                      to="/dashboard/settings?tab=wallet" 
                      className="text-xs text-cta hover:text-cta/80"
                    >
                      Show Balance
                    </Link>
                  </div>
                </div>
              )}
              
              {!profileData.walletAddress && (
                <div className="mt-3 text-sm text-center">
                  <a 
                    href="/wallet-connection"
                    className="text-cta hover:text-cta/80 flex items-center justify-center"
                  >
                    <FaWallet className="mr-1" />
                    Connect Wallet
                  </a>
                </div>
              )}
            </div>
            
            <div className="mt-4 text-xs text-text/50">
              Your wallet is used to sign blockchain transactions and verify your identity on the supply chain.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;