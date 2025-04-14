import React, { useState, useEffect } from 'react';
import web3Service from '../../services/web3Service';

const BlockchainDebugger = () => {
  const [debugInfo, setDebugInfo] = useState({
    web3Connected: false,
    currentAccount: '',
    networkId: '',
    networkName: '',
    gasPrice: '',
    balance: '',
    balanceInr: '',
    contracts: {
      productTracking: {
        address: '',
        events: [],
        methods: []
      },
      supplyChainAgreement: {
        address: '',
        events: [],
        methods: []
      },
      accessControl: {
        address: '',
        events: [],
        methods: []
      }
    },
    productCount: 0,
    lastBlock: null,
    contractVersions: {},
    web3Instance: null
  });

  const [error, setError] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isCircleMode, setIsCircleMode] = useState(false);

  // Helper function to safely handle BigInt values
  const safeStringify = (value) => {
    if (typeof value === 'bigint') {
      return value.toString();
    }
    return value;
  };

  const getNetworkName = (id) => {
    // Convert id to string to ensure compatibility with any BigInt values
    const idStr = String(id);
    const networks = {
      '1': 'Ethereum Mainnet',
      '3': 'Ropsten Testnet',
      '4': 'Rinkeby Testnet',
      '5': 'Goerli Testnet',
      '42': 'Kovan Testnet',
      '56': 'Binance Smart Chain',
      '97': 'BSC Testnet',
      '137': 'Polygon Mainnet',
      '80001': 'Polygon Mumbai',
      '31337': 'Hardhat Local',
      '1337': 'Ganache Local'
    };
    return networks[idStr] || `Unknown Network (${idStr})`;
  };

  const requestAccounts = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        return true;
      }
    } catch (error) {
      console.error("Failed to request accounts:", error);
      setError(`Failed to connect wallet: ${error.message}`);
    }
    return false;
  };

  const loadDebugInfo = async () => {
    try {
      setError(null);

      // Force connect wallet if needed
      if (window.ethereum && !debugInfo.currentAccount) {
        await requestAccounts();
      }

      // Initialize web3 and check if it exists
      let web3;
      let connected = false;

      try {
        // Try to get existing web3 instance first
        web3 = web3Service.getWeb3();

        // If we got a web3 instance without initializing, we're already connected
        if (web3) {
          connected = true;
        } else {
          // Initialize web3 if not already connected
          connected = await web3Service.initWeb3();
          web3 = web3Service.getWeb3();
        }
      } catch (initErr) {
        console.error("Error initializing web3:", initErr);
        setError(`Web3 initialization error: ${initErr.message}`);
      }

      // Update basic connection status even if we fail later
      setDebugInfo(prev => ({ ...prev, web3Connected: !!web3 }));

      // Exit if no web3 instance available
      if (!web3) {
        setError("No Web3 instance available. Please make sure MetaMask is connected.");
        return;
      }

      try {
        // Get current account
        const accounts = await web3.eth.getAccounts();
        const currentAccount = accounts[0];

        // Get network ID
        const networkId = await web3.eth.net.getId();
        // Convert any BigInt to string for safe comparison
        const networkIdStr = safeStringify(networkId);
        const networkName = getNetworkName(networkIdStr);

        // Get gas price
        const gasPrice = await web3.eth.getGasPrice();
        const gasPriceGwei = web3.utils.fromWei(gasPrice, 'gwei');

        // Get account balance
        let balance = '0';
        let balanceInr = '0';
        if (currentAccount) {
          balance = await web3.eth.getBalance(currentAccount);
          balance = web3.utils.fromWei(balance, 'ether');

          // Fetch ETH to INR conversion rate using CoinGecko API
          try {
            // Fetch real-time ETH price from CoinGecko API
            const response = await fetch(
              'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr'
            );
            const data = await response.json();

            if (data && data.ethereum && data.ethereum.inr) {
              const ethInrRate = data.ethereum.inr;
              balanceInr = (parseFloat(balance) * ethInrRate).toFixed(2);
            } else {
              throw new Error("Invalid response from CoinGecko API");
            }
          } catch (convErr) {
            console.warn("Failed to get ETH/INR conversion from CoinGecko:", convErr);

            // Fallback to estimated value if API fails
            try {
              // Fallback estimation (update this periodically if needed)
              const estimatedEthInrRate = 180000;
              balanceInr = (parseFloat(balance) * estimatedEthInrRate).toFixed(2);
              console.info("Using fallback ETH/INR estimation");
            } catch (fallbackErr) {
              console.error("Fallback conversion also failed:", fallbackErr);
              balanceInr = "N/A";
            }
          }
        }

        // Get latest block
        const lastBlock = await web3.eth.getBlock('latest');

        // Get contract instances - Handle missing methods gracefully
        let productContract = null;
        let supplyContract = null;
        let accessContract = null;

        if (web3Service.getProductTrackingContract) {
          try {
            productContract = web3Service.getProductTrackingContract();
          } catch (err) {
            console.warn("getProductTrackingContract failed:", err);
          }
        }

        // First try the Agreement contract, then fall back to just SupplyChain if needed
        if (web3Service.getSupplyChainAgreementContract) {
          try {
            supplyContract = web3Service.getSupplyChainAgreementContract();
          } catch (err) {
            console.warn("getSupplyChainAgreementContract failed:", err);
          }
        }

        // Fallback to getSupplyChainContract if it exists and the first attempt failed
        if (!supplyContract && web3Service.getSupplyChainContract) {
          try {
            supplyContract = web3Service.getSupplyChainContract();
          } catch (err) {
            console.warn("getSupplyChainContract failed:", err);
          }
        }

        if (web3Service.getAccessControlContract) {
          try {
            accessContract = web3Service.getAccessControlContract();
          } catch (err) {
            console.warn("getAccessControlContract failed:", err);
          }
        }

        // Try to get product count, safely handling any BigInt
        let productCount = 0;
        if (productContract && productContract.methods && productContract.methods.productCount) {
          try {
            const rawCount = await productContract.methods.productCount().call();
            productCount = safeStringify(rawCount);
          } catch (err) {
            console.error("Failed to get product count:", err);
          }
        }

        // Get addresses from imported JSON
        let addresses = {};
        let contractVersions = {};

        try {
          // Try to load contract addresses
          try {
            const addressModule = await import('../../contracts/addresses.json')
              .catch(() => ({ default: {} }));
            addresses = addressModule.default;
          } catch (err) {
            console.warn("Could not find addresses.json:", err);
            addresses = {};
          }

          // Try to get contract versions safely
          try {
            if (productContract && productContract.methods && productContract.methods.version) {
              const version = await productContract.methods.version().call();
              contractVersions.productTracking = safeStringify(version);
            }

            if (supplyContract && supplyContract.methods && supplyContract.methods.version) {
              const version = await supplyContract.methods.version().call();
              contractVersions.supplyChain = safeStringify(version);
            }

            if (accessContract && accessContract.methods && accessContract.methods.version) {
              const version = await accessContract.methods.version().call();
              contractVersions.accessControl = safeStringify(version);
            }
          } catch (verErr) {
            console.warn("Error getting contract versions:", verErr);
          }
        } catch (err) {
          console.warn("Error processing contract data:", err);
        }

        // Get contract methods
        const getContractMethods = (contract) => {
          if (!contract || !contract.methods) return [];
          return Object.keys(contract.methods)
            .filter(key => !key.includes('('))
            .sort();
        };

        // Safe-format the lastBlock data
        let formattedLastBlock = null;
        if (lastBlock) {
          formattedLastBlock = {
            number: safeStringify(lastBlock.number),
            timestamp: lastBlock.timestamp
              ? new Date(Number(safeStringify(lastBlock.timestamp)) * 1000).toLocaleTimeString()
              : 'Unknown',
            gasUsed: safeStringify(lastBlock.gasUsed)
          };
        }

        // Update debug info
        setDebugInfo({
          web3Connected: !!web3 && !!currentAccount,
          currentAccount: currentAccount || '',
          networkId: networkIdStr,
          networkName,
          gasPrice: `${parseFloat(gasPriceGwei).toFixed(2)} Gwei`,
          balance: `${parseFloat(balance).toFixed(4)} ETH`,
          balanceInr: `₹${balanceInr}`,
          web3Instance: !!web3,
          contracts: {
            productTracking: {
              address: addresses.ProductTracking || 'Not found',
              events: productContract ? Object.keys(productContract.events || {}) : [],
              methods: getContractMethods(productContract),
              initialized: !!productContract
            },
            supplyChainAgreement: {
              address: addresses.SupplyChainAgreement || addresses.SupplyChain || 'Not found',
              events: supplyContract ? Object.keys(supplyContract.events || {}) : [],
              methods: getContractMethods(supplyContract),
              initialized: !!supplyContract
            },
            accessControl: {
              address: addresses.AccessControl || 'Not found',
              events: accessContract ? Object.keys(accessContract.events || {}) : [],
              methods: getContractMethods(accessContract),
              initialized: !!accessContract
            }
          },
          productCount,
          lastBlock: formattedLastBlock,
          contractVersions
        });
      } catch (dataErr) {
        console.error("Error fetching blockchain data:", dataErr);
        setError(`Error fetching blockchain data: ${dataErr.message}`);
      }
    } catch (err) {
      console.error("Debug info error:", err);
      setError(`General error: ${err.message}`);
    }

    setLastRefresh(new Date());
  };

  useEffect(() => {
    // Load debug info on component mount
    loadDebugInfo();

    // Set up timer to refresh every 30 seconds
    const refreshTimer = setInterval(loadDebugInfo, 30000);

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => {
        console.log('Account changed, refreshing...');
        loadDebugInfo();
      });

      window.ethereum.on('chainChanged', () => {
        console.log('Network changed, refreshing...');
        loadDebugInfo();
      });
    }

    return () => {
      clearInterval(refreshTimer);
      // Remove listeners on unmount
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', loadDebugInfo);
        window.ethereum.removeListener('chainChanged', loadDebugInfo);
      }
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isCircleMode ? (
        // Circle mode - just a dot showing connection status
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer bg-gray-800/90 shadow-lg"
          onClick={() => setIsCircleMode(false)}
        >
          <span className={`w-4 h-4 rounded-full ${debugInfo.web3Connected ? 'bg-green-500' : 'bg-red-500'}`}></span>
        </div>
      ) : (
        // Original rectangle mode
        <div
          className={`bg-gray-800/90 text-white p-3 rounded-lg shadow-lg ${isCollapsed ? 'w-auto' : 'w-[400px]'}`}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium flex items-center">
              <span className={`w-2 h-2 rounded-full mr-2 ${debugInfo.web3Connected ? 'bg-green-500' : 'bg-red-500'}`}></span>
              Blockchain Debugger
            </h3>
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-xs px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
              >
                {isCollapsed ? 'Expand' : 'Collapse'}
              </button>
              <button
                onClick={() => setIsCircleMode(true)}
                className="text-gray-400 hover:text-white"
                title="Minimize to dot"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {!isCollapsed && (
            <div className="text-xs space-y-3 overflow-auto max-h-[500px] mt-2">
              {error && (
                <div className="p-2 bg-red-900/50 border border-red-700 rounded text-red-300">
                  {error}
                </div>
              )}

              {/* Connection details indicator */}
              <div className="bg-gray-900/50 border border-gray-700 rounded p-2 text-center">
                <div>
                  <span className={debugInfo.web3Instance ? 'text-green-400' : 'text-red-400'}>
                    Web3: {debugInfo.web3Instance ? 'Available' : 'Not Available'}
                  </span>
                  {' • '}
                  <span className={debugInfo.currentAccount ? 'text-green-400' : 'text-orange-400'}>
                    Wallet: {debugInfo.currentAccount ? 'Connected' : 'Not Connected'}
                  </span>
                </div>
                <div className="text-gray-400 text-[10px] mt-1">
                  Last refreshed: {lastRefresh.toLocaleTimeString()}
                </div>
              </div>

              {/* Connect button for easy wallet connection */}
              {!debugInfo.currentAccount && (
                <button
                  onClick={async () => {
                    const connected = await requestAccounts();
                    if (connected) {
                      loadDebugInfo();
                    }
                  }}
                  className="w-full py-2 bg-green-700 hover:bg-green-600 rounded text-center"
                >
                  Connect Wallet
                </button>
              )}

              {/* Tabs */}
              <div className="flex border-b border-gray-700 mb-3">
                <button
                  className={`py-1 px-3 -mb-px ${activeTab === 'overview'
                    ? 'border-b-2 border-cta text-cta'
                    : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button
                  className={`py-1 px-3 -mb-px ${activeTab === 'contracts'
                    ? 'border-b-2 border-cta text-cta'
                    : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setActiveTab('contracts')}
                >
                  Contracts
                </button>
                <button
                  className={`py-1 px-3 -mb-px ${activeTab === 'network'
                    ? 'border-b-2 border-cta text-cta'
                    : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setActiveTab('network')}
                >
                  Network
                </button>
              </div>

              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <>
                  <div className="p-2 bg-gray-900/50 border border-gray-700 rounded">
                    <div className="flex justify-between">
                      <span>Connected:</span>
                      <span className={debugInfo.web3Connected ? 'text-green-400' : 'text-red-400'}>
                        {debugInfo.web3Connected ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Network:</span>
                      <span>{debugInfo.networkName}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Account:</span>
                      <span className="font-mono">{debugInfo.currentAccount
                        ? `${debugInfo.currentAccount?.substring(0, 6)}...${debugInfo.currentAccount?.substring(debugInfo.currentAccount.length - 4)}`
                        : 'Not connected'}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Balance:</span>
                      <span>{debugInfo.balance}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Value in INR:</span>
                      <span>{debugInfo.balanceInr}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Gas Price:</span>
                      <span>{debugInfo.gasPrice}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Product Count:</span>
                      <span>{debugInfo.productCount}</span>
                    </div>
                  </div>

                  <div className="p-2 bg-gray-900/50 border border-gray-700 rounded">
                    <h4 className="font-medium mb-1">Contract Status</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>ProductTracking:</span>
                        <span className={debugInfo.contracts.productTracking.initialized ? 'text-green-400' : 'text-red-400'}>
                          {debugInfo.contracts.productTracking.initialized ? 'Ready' : 'Not Initialized'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>SupplyChain:</span>
                        <span className={debugInfo.contracts.supplyChainAgreement.initialized ? 'text-green-400' : 'text-red-400'}>
                          {debugInfo.contracts.supplyChainAgreement.initialized ? 'Ready' : 'Not Initialized'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>AccessControl:</span>
                        <span className={debugInfo.contracts.accessControl.initialized ? 'text-green-400' : 'text-red-400'}>
                          {debugInfo.contracts.accessControl.initialized ? 'Ready' : 'Not Initialized'}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Contracts Tab */}
              {activeTab === 'contracts' && (
                <div className="space-y-3">
                  <div className="p-2 bg-gray-900/50 border border-gray-700 rounded">
                    <h4 className="font-medium mb-2">ProductTracking Contract</h4>
                    <div className="mb-1">
                      <span className="text-gray-400">Address: </span>
                      <span className="font-mono text-[10px] break-all">{debugInfo.contracts.productTracking.address}</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-400">Version: </span>
                      <span>{debugInfo.contractVersions.productTracking || 'Unknown'}</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-400">Available Events:</span>
                      <ul className="ml-4 mt-1 list-disc">
                        {debugInfo.contracts.productTracking.events.length > 0 ? (
                          debugInfo.contracts.productTracking.events.map(event => (
                            <li key={event} className="break-all pr-2 text-[10px] mb-1">
                              {event}
                            </li>
                          ))
                        ) : (
                          <li className="text-red-400">No events found</li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <span className="text-gray-400">Available Methods:</span>
                      <ul className="ml-4 mt-1 list-disc">
                        {debugInfo.contracts.productTracking.methods.length > 0 ? (
                          debugInfo.contracts.productTracking.methods.map(method => (
                            <li key={method} className="break-all pr-2 text-[10px] mb-1">
                              {method}
                            </li>
                          ))
                        ) : (
                          <li className="text-red-400">No methods found</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="p-2 bg-gray-900/50 border border-gray-700 rounded">
                    <h4 className="font-medium mb-2">SupplyChain Contract</h4>
                    <div className="mb-1">
                      <span className="text-gray-400">Address: </span>
                      <span className="font-mono text-[10px] break-all">{debugInfo.contracts.supplyChainAgreement.address}</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-400">Version: </span>
                      <span>{debugInfo.contractVersions.supplyChain || 'Unknown'}</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-400">Available Events:</span>
                      <ul className="ml-4 mt-1 list-disc">
                        {debugInfo.contracts.supplyChainAgreement.events.length > 0 ? (
                          debugInfo.contracts.supplyChainAgreement.events.map(event => (
                            <li key={event} className="break-all pr-2 text-[10px] mb-1">
                              {event}
                            </li>
                          ))
                        ) : (
                          <li className="text-red-400">No events found</li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <span className="text-gray-400">Available Methods:</span>
                      <ul className="ml-4 mt-1 list-disc">
                        {debugInfo.contracts.supplyChainAgreement.methods.length > 0 ? (
                          debugInfo.contracts.supplyChainAgreement.methods.map(method => (
                            <li key={method} className="break-all pr-2 text-[10px] mb-1">
                              {method}
                            </li>
                          ))
                        ) : (
                          <li className="text-red-400">No methods found</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="p-2 bg-gray-900/50 border border-gray-700 rounded">
                    <h4 className="font-medium mb-2">AccessControl Contract</h4>
                    <div className="mb-1">
                      <span className="text-gray-400">Address: </span>
                      <span className="font-mono text-[10px] break-all">{debugInfo.contracts.accessControl.address}</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-400">Version: </span>
                      <span>{debugInfo.contractVersions.accessControl || 'Unknown'}</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-400">Available Events:</span>
                      <ul className="ml-4 mt-1 list-disc">
                        {debugInfo.contracts.accessControl.events.length > 0 ? (
                          debugInfo.contracts.accessControl.events.map(event => (
                            <li key={event} className="break-all pr-2 text-[10px] mb-1">
                              {event}
                            </li>
                          ))
                        ) : (
                          <li className="text-red-400">No events found</li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <span className="text-gray-400">Available Methods:</span>
                      <ul className="ml-4 mt-1 list-disc">
                        {debugInfo.contracts.accessControl.methods.length > 0 ? (
                          debugInfo.contracts.accessControl.methods.map(method => (
                            <li key={method} className="break-all pr-2 text-[10px] mb-1">{method}</li>
                          ))
                        ) : (
                          <li className="text-red-400">No methods found</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Network Tab */}
              {activeTab === 'network' && (
                <div className="space-y-3">
                  <div className="p-2 bg-gray-900/50 border border-gray-700 rounded">
                    <h4 className="font-medium mb-2">Network Information</h4>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span>{debugInfo.networkName}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-gray-400">ID:</span>
                      <span>{debugInfo.networkId}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-gray-400">Gas Price:</span>
                      <span>{debugInfo.gasPrice}</span>
                    </div>
                  </div>

                  <div className="p-2 bg-gray-900/50 border border-gray-700 rounded">
                    <h4 className="font-medium mb-2">Latest Block</h4>
                    {debugInfo.lastBlock ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Number:</span>
                          <span>{debugInfo.lastBlock.number}</span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-gray-400">Time:</span>
                          <span>{debugInfo.lastBlock.timestamp}</span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-gray-400">Gas Used:</span>
                          <span>{debugInfo.lastBlock.gasUsed}</span>
                        </div>
                      </>
                    ) : (
                      <span className="text-red-400">Block data not available</span>
                    )}
                  </div>

                  <div className="p-2 bg-gray-900/50 border border-gray-700 rounded">
                    <h4 className="font-medium mb-2">Connection Details</h4>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Provider:</span>
                      <span>{window.ethereum?.isMetaMask ? 'MetaMask' : 'Unknown'}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-gray-400">Connection Type:</span>
                      <span>{window.ethereum?.isMetaMask ? 'Injected Web3' : 'Unknown'}</span>
                    </div>
                    {window.ethereum?.chainId && (
                      <div className="flex justify-between mt-1">
                        <span className="text-gray-400">Chain ID (Hex):</span>
                        <span>{window.ethereum.chainId}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <button
                  onClick={loadDebugInfo}
                  className="flex-1 py-1 bg-blue-700 hover:bg-blue-600 rounded text-center"
                >
                  Refresh Data
                </button>
                <button
                  onClick={async () => {
                    try {
                      if (!window.ethereum) {
                        alert("MetaMask not detected! Please install MetaMask extension.");
                        return;
                      }

                      // Request account access first
                      await requestAccounts();

                      // The chainId for local networks (Ganache/Hardhat)
                      const localChainId = '0x539'; // Hex for 1337 (Ganache)

                      await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: localChainId }],
                      }).catch(async (switchError) => {
                        // If the chain hasn't been added, add it
                        if (switchError.code === 4902) {
                          await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [{
                              chainId: localChainId,
                              chainName: 'Localhost 8545',
                              nativeCurrency: {
                                name: 'Ethereum',
                                symbol: 'ETH',
                                decimals: 18
                              },
                              rpcUrls: ['http://localhost:8545/'],
                              blockExplorerUrls: null
                            }]
                          });
                        } else {
                          throw switchError;
                        }
                      });

                      // Refresh after network switch
                      setTimeout(loadDebugInfo, 1000);

                      alert("Switched to local blockchain network. If you're running a local blockchain, make sure it's active on port 8545.");
                    } catch (err) {
                      console.error('Failed to switch network', err);
                      alert(`Failed to switch network: ${err.message}`);
                    }
                  }}
                  className="flex-1 py-1 bg-purple-700 hover:bg-purple-600 rounded text-center"
                >
                  Switch to Local
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlockchainDebugger;