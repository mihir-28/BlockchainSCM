import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaSpinner, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import web3Service from '../services/web3Service';

// Helper function for formatting
const formatBigInt = (value) => {
  if (typeof value === 'bigint') {
    return value.toString();
  }
  return value;
};

const VerifyProductPage = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id');
  const dataHash = searchParams.get('hash');
  
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);
  
  // Ethereum block explorer URL
  const blockExplorerUrl = 'https://etherscan.io'; // Change if using a different network

  useEffect(() => {
    const verifyProduct = async () => {
      setLoading(true);
      
      if (!productId || !dataHash) {
        setError("Invalid verification parameters");
        setLoading(false);
        return;
      }
      
      try {
        // Initialize blockchain connection
        await web3Service.initWeb3();
        
        // Fetch product from blockchain
        const productData = await web3Service.getProduct(productId);
        
        if (!productData) {
          setError("Product not found on blockchain");
          setLoading(false);
          return;
        }
        
        // Format blockchain data
        const formattedProduct = {
          id: formatBigInt(productData.id),
          name: productData.name,
          manufacturer: productData.manufacturer,
          owner: productData.owner,
          createTime: formatBigInt(productData.createTime),
          updateTime: formatBigInt(productData.updateTime),
          dataHash: productData.dataHash,
          registrationDate: new Date(Number(formatBigInt(productData.createTime)) * 1000).toLocaleDateString(),
        };
        
        // Verify data hash matches
        const isVerified = formattedProduct.dataHash === dataHash;
        
        setProduct(formattedProduct);
        setVerified(isVerified);
      } catch (err) {
        console.error('Error verifying product:', err);
        setError('Failed to verify product on blockchain');
      } finally {
        setLoading(false);
      }
    };
    
    verifyProduct();
  }, [productId, dataHash]);
  
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-12 max-w-md w-full flex flex-col items-center">
          <FaSpinner className="text-cta text-3xl animate-spin mb-4" />
          <h1 className="text-xl font-semibold text-text mb-2">Verifying Product</h1>
          <p className="text-text/60 text-center">Checking blockchain data...</p>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-panel/40 backdrop-blur-sm border border-red-500/20 rounded-xl p-8 max-w-md w-full">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-red-500/20 rounded-full p-3">
              <FaTimesCircle className="text-red-500 text-3xl" />
            </div>
          </div>
          <h1 className="text-xl font-semibold text-text text-center mb-2">Verification Failed</h1>
          <p className="text-text/60 text-center mb-6">{error}</p>
          <div className="flex justify-center">
            <Link 
              to="/"
              className="px-6 py-2 bg-background/50 hover:bg-background text-text border border-cta/20 rounded-lg flex items-center"
            >
              <FaArrowLeft className="mr-2" /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Product found but verification failed
  if (product && !verified) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-panel/40 backdrop-blur-sm border border-red-500/20 rounded-xl p-8 max-w-md w-full">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-red-500/20 rounded-full p-3">
              <FaTimesCircle className="text-red-500 text-3xl" />
            </div>
          </div>
          <h1 className="text-xl font-semibold text-text text-center mb-2">Product Data Mismatch</h1>
          <p className="text-text/60 text-center mb-6">
            The product exists on blockchain but the verification data doesn't match. 
            This could indicate the product has been tampered with.
          </p>
          
          <div className="bg-background/40 rounded-lg p-4 mb-6">
            <div className="mb-2">
              <p className="text-text/60 text-sm">Product ID</p>
              <p className="text-text">{product.id}</p>
            </div>
            <div>
              <p className="text-text/60 text-sm">Product Name</p>
              <p className="text-text">{product.name}</p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Link 
              to="/"
              className="px-6 py-2 bg-background/50 hover:bg-background text-text border border-cta/20 rounded-lg flex items-center"
            >
              <FaArrowLeft className="mr-2" /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Successful verification
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-cta/20 rounded-full p-3">
            <FaCheckCircle className="text-cta text-3xl" />
          </div>
        </div>
        <h1 className="text-xl font-semibold text-text text-center mb-2">Product Verified</h1>
        <p className="text-text/60 text-center mb-6">
          This product has been verified on the blockchain and is authentic.
        </p>
        
        <div className="bg-background/40 rounded-lg p-5 mb-6">
          <div className="grid grid-cols-1 gap-y-4">
            <div>
              <p className="text-text/60 text-sm">Product ID</p>
              <p className="text-text">{product.id}</p>
            </div>
            <div>
              <p className="text-text/60 text-sm">Product Name</p>
              <p className="text-text">{product.name}</p>
            </div>
            <div>
              <p className="text-text/60 text-sm">Manufacturer</p>
              <p className="text-text">{product.manufacturer}</p>
            </div>
            <div>
              <p className="text-text/60 text-sm">Registration Date</p>
              <p className="text-text">{product.registrationDate}</p>
            </div>
            <div>
              <p className="text-text/60 text-sm">Current Owner</p>
              <p className="text-text font-mono text-sm break-all">
                {product.owner}
                <a 
                  href={`${blockExplorerUrl}/address/${product.owner}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-2 text-cta hover:text-cta/80 inline-flex items-center"
                >
                  <FaExternalLinkAlt className="text-xs" />
                </a>
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Link 
            to="/"
            className="px-6 py-2 bg-background/50 hover:bg-background text-text border border-cta/20 rounded-lg flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyProductPage;