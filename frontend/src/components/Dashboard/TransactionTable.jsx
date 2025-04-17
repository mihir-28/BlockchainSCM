import React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TransactionTable = ({ transactions }) => {
  const navigate = useNavigate();
  
  // Function to render status indicator
  const renderStatus = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return (
          <span className="flex items-center text-green-400">
            <FaCheckCircle className="mr-1" />
            <span>Confirmed</span>
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center text-yellow-400">
            <FaClock className="mr-1" />
            <span>Pending</span>
          </span>
        );
      case 'failed':
        return (
          <span className="flex items-center text-red-400">
            <FaExclamationTriangle className="mr-1" />
            <span>Failed</span>
          </span>
        );
      default:
        return <span>{status}</span>;
    }
  };
  
  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      month: 'short',
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const getProductName = (tx) => {
    // Check several possible locations for product data
    if (tx.type === 'product') {
      // Direct property access
      if (tx.productName) return tx.productName;
      
      // Check if product name is in data object
      if (tx.data) {
        if (tx.data.name) return tx.data.name;
        if (tx.data.productName) return tx.data.productName;
        if (tx.data.productId) return tx.data.productId; // Often used as name in blockchain
        if (tx.data.product && tx.data.product.name) return tx.data.product.name;
        // Check for nested product details (common pattern in transactionData.jsx)
        if (tx.data.productDetails && tx.data.productDetails.name) return tx.data.productDetails.name;
      }
      
      // Check if in nested productData
      if (tx.productData && tx.productData.name) return tx.productData.name;
    } else if (tx.type === 'certificate') {
      // For certificate transactions, often reference a product
      if (tx.data && tx.data.productId) return `Certificate: ${tx.data.productId}`;
    } else if (tx.type === 'verification') {
      // Verification transactions also reference products
      if (tx.data && tx.data.productDetails && tx.data.productDetails.name) 
        return tx.data.productDetails.name;
      if (tx.data && tx.data.productId) return `Product: ${tx.data.productId}`;
    }
    
    // Fallback to type with capitalized first letter
    return tx.type.charAt(0).toUpperCase() + tx.type.slice(1);
  };

  const getProductDescription = (tx) => {
    // If we already have a description, return it
    if (tx.description) return tx.description;
    
    if (tx.type === 'product') {
      // Check data object
      if (tx.data) {
        if (tx.data.description) return tx.data.description;
        if (tx.data.notes) return tx.data.notes;
        if (tx.data.product && tx.data.product.description) return tx.data.product.description;
        
        // Build description from available data
        const details = [];
        if (tx.data.batchNumber) details.push(`Batch: ${tx.data.batchNumber}`);
        if (tx.data.quantity) details.push(`Quantity: ${tx.data.quantity}`);
        if (tx.data.origin && typeof tx.data.origin === 'object') {
          const origin = [];
          if (tx.data.origin.farm) origin.push(tx.data.origin.farm);
          if (tx.data.origin.region) origin.push(tx.data.origin.region);
          if (tx.data.origin.country) origin.push(tx.data.origin.country);
          if (origin.length > 0) details.push(`Origin: ${origin.join(', ')}`);
        } else if (tx.data.origin) {
          details.push(`Origin: ${tx.data.origin}`);
        }
        
        if (details.length > 0) return details.join(' | ');
      }
      
      // Check productData
      if (tx.productData && tx.productData.description) return tx.productData.description;
    } else if (tx.type === 'certificate' || tx.type === 'verification') {
      // For certificate/verification transactions
      if (tx.data) {
        if (tx.data.notes) return tx.data.notes;
        if (tx.data.results) {
          const results = [];
          for (const [key, value] of Object.entries(tx.data.results)) {
            results.push(`${key}: ${value}`);
          }
          if (results.length > 0) return results.join(' | ');
        }
      }
    } else if (tx.type === 'shipment') {
      // For shipment transactions
      if (tx.data) {
        const shipmentInfo = [];
        if (tx.data.origin) shipmentInfo.push(`From: ${tx.data.origin}`);
        if (tx.data.destination) shipmentInfo.push(`To: ${tx.data.destination}`);
        if (tx.data.status) shipmentInfo.push(`Status: ${tx.data.status}`);
        if (shipmentInfo.length > 0) return shipmentInfo.join(' | ');
      }
    }
    
    // Fallback
    return tx.description || `${tx.type} transaction`;
  };

  // Navigate to transaction details page
  const handleViewTransaction = (txId) => {
    navigate(`/dashboard/transactions?txid=${txId}`);
  };

  return (
    <div className="overflow-x-auto bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl shadow-sm">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-cta/10">
            <th className="pl-6 pr-2 py-3 text-left text-xs font-medium text-text/60 uppercase tracking-wider">
              Type
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-text/60 uppercase tracking-wider">
              Name
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-text/60 uppercase tracking-wider">
              Description
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-text/60 uppercase tracking-wider">
              Status
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-text/60 uppercase tracking-wider">
              Timestamp
            </th>
            <th className="pl-6 pr-2 py-3 text-left text-xs font-medium text-text/60 uppercase tracking-wider">
              Block
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="6" className="px-6 py-8 text-center text-text/60">
                No transactions found
              </td>
            </tr>
          ) : (
            transactions.map((transaction, index) => (
              <tr 
                key={transaction.id} 
                className={`
                  ${index % 2 === 0 ? 'bg-background/10' : 'bg-transparent'}
                  ${index === transactions.length - 1 ? '' : 'border-b border-cta/5'}
                  hover:bg-cta/5 cursor-pointer transition-colors
                `}
                onClick={() => handleViewTransaction(transaction.id)}
              >
                <td className="pl-6 pr-2 py-3 whitespace-nowrap text-sm text-text capitalize">
                  {transaction.type}
                </td>
                <td className="px-2 py-3 text-sm text-text font-medium whitespace-nowrap">
                  {getProductName(transaction)}
                </td>
                <td className="px-2 py-3 text-sm text-text line-clamp-3">
                  {getProductDescription(transaction)}
                </td>
                <td className="px-2 py-3 whitespace-nowrap text-sm">
                  {renderStatus(transaction.status)}
                </td>
                <td className="px-2 py-3 whitespace-nowrap text-sm text-text/80">
                  {formatDate(transaction.timestamp)}
                </td>
                <td className="pl-6 pr-2 py-3 whitespace-nowrap text-sm text-cta/80">
                  {transaction.blockNumber}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;