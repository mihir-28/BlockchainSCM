import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Navigate } from 'react-router-dom';
import { FaWallet, FaExclamationTriangle, FaArrowRight, FaShieldAlt, FaEthereum } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import NetworkAnimation from '../components/Common/NetworkAnimation';

const WalletConnectionPage = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(true);
  
  const navigate = useNavigate();
  const { currentUser, updateUserWallet } = useAuth();

  // Redirect if user is not logged in
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    // Check if MetaMask is installed
    const { ethereum } = window;
    if (!ethereum) {
      setIsMetaMaskInstalled(false);
      setError("MetaMask not detected. Please install MetaMask extension to continue.");
      return;
    }

    // Check if wallet is already connected
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      
      if (accounts.length !== 0) {
        setIsConnected(true);
        setWalletAddress(accounts[0]);
        // Store wallet address in user profile
        await updateUserWallet(accounts[0]);
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  };

  const connectWallet = async () => {
    setError('');
    setIsConnecting(true);
    
    try {
      const { ethereum } = window;
      if (!ethereum) {
        setError("MetaMask not detected. Please install MetaMask extension to continue.");
        return;
      }

      // Request account access
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      
      // Get the first account
      const account = accounts[0];
      setIsConnected(true);
      setWalletAddress(account);
      
      // Store wallet address in user profile
      await updateUserWallet(account);

      // Redirect to dashboard after successful connection
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      if (error.code === 4001) {
        // User rejected the request
        setError("Connection rejected. Please approve the connection request in MetaMask.");
      } else {
        setError("Failed to connect wallet. Please try again.");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      {/* Animated background */}
      <NetworkAnimation opacity={0.15} zIndex={0} />
      
      <div className="container mx-auto px-6">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-panel/30 backdrop-blur-sm rounded-xl border border-cta/20 p-8 shadow-xl"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cta/10 mb-4">
                <FaWallet className="text-cta text-2xl" />
              </div>
              <h1 className="text-3xl font-display font-bold text-cta mb-2">Connect Your Wallet</h1>
              <p className="text-text/70 max-w-md mx-auto">
                Connect your blockchain wallet to access and verify transactions on our supply chain platform
              </p>
            </div>
            
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-500 px-4 py-3 rounded-lg text-sm mb-6 flex items-start">
                <FaExclamationTriangle className="mt-0.5 mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {isConnected ? (
              <div className="bg-green-500/20 border border-green-500/30 text-green-500 px-4 py-4 rounded-lg mb-6">
                <div className="flex items-center justify-center mb-2">
                  <FaShieldAlt className="mr-2" />
                  <span className="font-medium">Wallet Connected Successfully</span>
                </div>
                <p className="text-sm text-center">Address: {formatAddress(walletAddress)}</p>
              </div>
            ) : (
              <div className="space-y-6 mb-6">
                <div className="bg-background/30 rounded-lg p-4 border border-cta/10">
                  <h3 className="font-medium text-text mb-2 flex items-center">
                    <FaEthereum className="mr-2 text-orange-500" /> Connect with MetaMask
                  </h3>
                  <p className="text-text/70 text-sm mb-4">
                    MetaMask is a secure wallet that allows you to interact with our blockchain supply chain platform
                  </p>
                  
                  {!isMetaMaskInstalled && (
                    <div className="mb-4">
                      <a 
                        href="https://metamask.io/download.html" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-cta hover:text-cta/80 text-sm flex items-center"
                      >
                        Install MetaMask <FaArrowRight className="ml-1 text-xs" />
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="text-sm text-text/70">
                  <div className="flex items-start mb-2">
                    <div className="bg-cta/10 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</div>
                    <p>Make sure you have MetaMask installed in your browser</p>
                  </div>
                  <div className="flex items-start mb-2">
                    <div className="bg-cta/10 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</div>
                    <p>Click the button below to connect your wallet</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-cta/10 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</div>
                    <p>Approve the connection request in MetaMask</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-center">
              {isConnected ? (
                <button
                  onClick={goToDashboard}
                  className="px-6 py-3 bg-cta hover:bg-cta/90 text-background font-medium rounded-lg transition-colors flex items-center"
                >
                  Continue to Dashboard <FaArrowRight className="ml-2" />
                </button>
              ) : (
                <button
                  onClick={connectWallet}
                  disabled={isConnecting || !isMetaMaskInstalled}
                  className={`px-6 py-3 ${isMetaMaskInstalled ? 'bg-cta hover:bg-cta/90' : 'bg-gray-400 cursor-not-allowed'} 
                             text-background font-medium rounded-lg transition-colors flex items-center`}
                >
                  {isConnecting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Connecting...
                    </>
                  ) : (
                    <>
                      <FaEthereum className="mr-2" />
                      Connect MetaMask Wallet
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnectionPage;