import React, { useState, useEffect } from 'react';
import web3Service from '../../services/web3Service';

const BlockchainTest = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Product state
  const [productName, setProductName] = useState('Test Product');
  const [manufacturer, setManufacturer] = useState('Test Manufacturer');
  const [productId, setProductId] = useState(null);
  const [productInfo, setProductInfo] = useState(null);
  
  // Connect to blockchain on component mount
  useEffect(() => {
    const connectToBlockchain = async () => {
      try {
        const connected = await web3Service.initWeb3();
        setIsConnected(connected);
        
        if (connected) {
          const currentAccount = await web3Service.getCurrentAccount();
          setAccount(currentAccount);
        }
      } catch (err) {
        console.error('Error connecting to blockchain:', err);
        setError('Failed to connect to blockchain: ' + err.message);
      }
    };
    
    connectToBlockchain();
  }, []);
  
  // Helper function to convert BigInt to string for display
  const formatBigInt = (value) => {
    if (typeof value === 'bigint') {
      return value.toString();
    }
    return value;
  };
  
  // Create a new product
  const handleCreateProduct = async () => {
    setLoading(true);
    setError('');
    try {
      // Get web3 instance first
      const web3 = web3Service.getWeb3();
      
      // Create a simple data hash
      const dataHash = web3.utils.sha3(JSON.stringify({
        name: productName,
        manufacturer: manufacturer,
        timestamp: Date.now()
      }));
      
      const result = await web3Service.createProduct(
        productName,
        manufacturer,
        dataHash
      );
      
      console.log('Product created:', result);
      if (result.events && result.events.ProductCreated) {
        const newProductId = result.events.ProductCreated.returnValues.productId;
        setProductId(formatBigInt(newProductId));
        
        // Fetch the created product
        const productDetails = await web3Service.getProduct(newProductId);
        
        // Convert BigInt values to strings before storing in state
        const formattedProduct = {
          id: formatBigInt(productDetails.id),
          name: productDetails.name,
          manufacturer: productDetails.manufacturer,
          owner: productDetails.owner,
          createTime: formatBigInt(productDetails.createTime),
          updateTime: formatBigInt(productDetails.updateTime),
          dataHash: productDetails.dataHash
        };
        
        setProductInfo(formattedProduct);
      }
    } catch (err) {
      console.error('Error creating product:', err);
      setError('Failed to create product: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-panel/30 backdrop-blur-sm rounded-lg border border-cta/20 mt-10">
      <h2 className="text-2xl font-display font-bold text-cta mb-4">Blockchain Integration Test</h2>
      
      {/* Connection Status */}
      <div className="mb-4">
        <div className="text-text/80 mb-1">Connection Status:</div>
        <div className={`font-medium ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </div>
      </div>
      
      {/* Account */}
      {account && (
        <div className="mb-4">
          <div className="text-text/80 mb-1">Connected Account:</div>
          <div className="font-mono text-sm text-text break-all">{account}</div>
        </div>
      )}
      
      {/* Create Product Form */}
      <div className="mb-6 p-4 bg-background/20 rounded-lg">
        <h3 className="text-lg font-medium text-text mb-3">Create Product</h3>
        
        <div className="mb-3">
          <label className="block text-text/70 mb-1 text-sm">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full px-3 py-2 bg-background/50 border border-cta/20 rounded-md focus:outline-none focus:border-cta/50"
          />
        </div>
        
        <div className="mb-3">
          <label className="block text-text/70 mb-1 text-sm">Manufacturer</label>
          <input
            type="text"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            className="w-full px-3 py-2 bg-background/50 border border-cta/20 rounded-md focus:outline-none focus:border-cta/50"
          />
        </div>
        
        <button
          onClick={handleCreateProduct}
          disabled={loading || !isConnected}
          className={`w-full px-4 py-2 ${
            isConnected 
              ? 'bg-cta/20 hover:bg-cta/30 text-cta' 
              : 'bg-gray-400/20 text-gray-400'
          } border ${
            isConnected ? 'border-cta/30' : 'border-gray-400/30'
          } rounded-lg transition-all duration-300 flex justify-center items-center font-medium`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Register Product on Blockchain'
          )}
        </button>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
          {error}
        </div>
      )}
      
      {/* Product Result */}
      {productInfo && (
        <div className="p-4 bg-cta/10 border border-cta/20 rounded-lg mb-4">
          <h3 className="text-lg font-medium text-cta mb-3">Product Created!</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-text/70">Product ID:</span>
              <span className="ml-2 text-text font-mono">{productInfo.id}</span>
            </div>
            <div>
              <span className="text-text/70">Name:</span>
              <span className="ml-2 text-text">{productInfo.name}</span>
            </div>
            <div>
              <span className="text-text/70">Manufacturer:</span>
              <span className="ml-2 text-text">{productInfo.manufacturer}</span>
            </div>
            <div>
              <span className="text-text/70">Owner:</span>
              <span className="ml-2 text-text font-mono">{productInfo.owner}</span>
            </div>
            <div>
              <span className="text-text/70">Create Time:</span>
              <span className="ml-2 text-text">{new Date(productInfo.createTime * 1000).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockchainTest;