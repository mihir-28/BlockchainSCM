import React, { useState } from 'react';
import { FaCheck, FaTimes, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import * as productService from '../../services/productService';
import web3Service from '../../services/web3Service';

const ProductVerification = ({ productId }) => {
  const [verificationStatus, setVerificationStatus] = useState('idle'); // idle, loading, verified, partial, failed
  const [verificationData, setVerificationData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const verifyProduct = async () => {
    setVerificationStatus('loading');
    setErrorMessage(null);
    
    try {
      // Check if web3 is initialized first
      const isWeb3Ready = await web3Service.initWeb3();
      if (!isWeb3Ready) {
        throw new Error("Blockchain connection not available. Please connect your wallet.");
      }
      
      // Get product data
      const product = await productService.getProduct(productId);
      
      // If we get here, the blockchain data is available
      if (product) {
        // Validate product authenticity (this can be expanded based on your verification logic)
        const blockchainValid = product.onBlockchain === true;
        const certificatesValid = product.certificates && product.certificates.length > 0;
        
        if (blockchainValid && certificatesValid) {
          setVerificationStatus('verified');
        } else if (blockchainValid) {
          setVerificationStatus('partial');
        } else {
          setVerificationStatus('failed');
        }
        
        setVerificationData(product);
      } else {
        setVerificationStatus('failed');
        setErrorMessage("Product not found on blockchain");
      }
    } catch (error) {
      console.error("Error verifying product:", error);
      
      // Determine if this is a contract unavailable error
      if (error.message && error.message.includes("Contract is not available")) {
        setVerificationStatus('partial');
        setErrorMessage("Blockchain verification unavailable. Basic details verified only.");
        
        // Still try to get product from Firebase if available
        try {
          const offchainProduct = await productService.getProductFromDatabase(productId);
          if (offchainProduct) {
            setVerificationData(offchainProduct);
          }
        } catch (dbError) {
          console.error("Error getting product from database:", dbError);
        }
      } else {
        setVerificationStatus('failed');
        setErrorMessage(error.message || "Failed to verify product");
      }
    }
  };

  // Render verification status
  const renderVerificationStatus = () => {
    switch (verificationStatus) {
      case 'loading':
        return (
          <div className="flex items-center justify-center space-x-2 text-text/70">
            <FaSpinner className="animate-spin" />
            <span>Verifying product...</span>
          </div>
        );
      case 'verified':
        return (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-green-600">
            <div className="flex items-center space-x-2">
              <FaCheck className="text-green-500" />
              <span className="font-medium">Product Verified</span>
            </div>
            <p className="mt-2 text-sm">
              This product has been verified on the blockchain and all certificates are valid.
            </p>
          </div>
        );
      case 'partial':
        return (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 text-amber-600">
            <div className="flex items-center space-x-2">
              <FaExclamationTriangle className="text-amber-500" />
              <span className="font-medium">Partially Verified</span>
            </div>
            <p className="mt-2 text-sm">
              {errorMessage || "Some verification data is missing or could not be confirmed."}
            </p>
          </div>
        );
      case 'failed':
        return (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-600">
            <div className="flex items-center space-x-2">
              <FaTimes className="text-red-500" />
              <span className="font-medium">Verification Failed</span>
            </div>
            <p className="mt-2 text-sm">
              {errorMessage || "Could not verify this product. It may not be authentic."}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {verificationStatus === 'idle' ? (
        <button
          onClick={verifyProduct}
          className="w-full bg-cta/90 hover:bg-cta text-white py-2 px-4 rounded-lg transition-colors"
        >
          Verify Product Authenticity
        </button>
      ) : (
        <>
          {renderVerificationStatus()}
          
          {verificationStatus !== 'loading' && (
            <button
              onClick={verifyProduct}
              className="mt-4 text-cta hover:text-cta/80 text-sm underline"
            >
              Verify Again
            </button>
          )}
          
          {verificationData && (
            <div className="mt-4 bg-panel/50 border border-cta/10 rounded-lg p-4">
              <h3 className="font-medium text-text mb-3">Product Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text/60">ID:</span>
                  <span className="font-mono">{verificationData.id || productId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text/60">Name:</span>
                  <span>{verificationData.name || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text/60">Manufacturer:</span>
                  <span>{verificationData.manufacturer || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text/60">Production Date:</span>
                  <span>{verificationData.productionDate || "N/A"}</span>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductVerification;