import React, { useState } from 'react';
import { FaExchangeAlt, FaCheck, FaTimes } from 'react-icons/fa';
import * as productService from '../../services/productService';

const TransferOwnership = ({ product, onTransferComplete, onCancel }) => {
  const [toAddress, setToAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleTransfer = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    if (!toAddress) {
      setError('Recipient address is required');
      return;
    }

    if (!toAddress.startsWith('0x') || toAddress.length !== 42) {
      setError('Invalid Ethereum address format');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await productService.transferProduct(product.blockchainId, toAddress);
      setSuccess(true);
      setToAddress('');
      if (onTransferComplete) {
        setTimeout(() => onTransferComplete(), 1500);
      }
    } catch (err) {
      console.error('Error transferring product:', err);
      setError(err.message || 'Failed to transfer ownership. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-text mb-4 flex items-center">
        <FaExchangeAlt className="text-cta mr-2" /> Transfer Ownership
      </h2>
      
      {success ? (
        <div className="bg-green-500/20 border border-green-500/30 text-green-500 p-4 rounded-lg flex items-center">
          <FaCheck className="mr-2" /> Product ownership successfully transferred
        </div>
      ) : (
        <form onSubmit={handleTransfer}>
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-500 p-4 rounded-lg mb-4">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="toAddress" className="block text-text/90 mb-1 text-sm">
              Recipient Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="toAddress"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-3 bg-background border border-cta/20 rounded-lg"
              disabled={isSubmitting}
            />
            <p className="text-text/60 text-xs mt-1">
              The Ethereum address of the new owner
            </p>
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-4 py-2 bg-panel/50 hover:bg-panel/70 text-text/80 rounded-lg flex items-center"
            >
              <FaTimes className="mr-2" /> Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-cta/20 hover:bg-cta/30 text-cta rounded-lg flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <FaExchangeAlt className="mr-2" /> Transfer Ownership
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TransferOwnership;