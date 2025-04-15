import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExchangeAlt,
  FaExclamationTriangle,
  FaUndo
} from 'react-icons/fa';
import { ImCheckboxChecked } from "react-icons/im";

const ProductsList = ({ products = [] }) => {
  const navigate = useNavigate();

  const handleRowClick = (productId) => {
    // Navigate using the blockchain ID (not Firebase ID)
    navigate(`/dashboard/products/${productId}`);
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return 'N/A';

    try {
      const date = new Date(dateValue);

      // Check if date is valid
      if (isNaN(date.getTime())) return 'N/A';

      // Format: April 15, 2025, 7:21 PM
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return 'N/A';
    }
  };

  if (products.length === 0) {
    return (
      <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-6 text-center">
        <p className="text-text/70">No products found.</p>
      </div>
    );
  }

  return (
    <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-background/40 border-b border-cta/10">
              <th className="py-3 px-4 text-left text-xs font-medium text-text/60 uppercase tracking-wider">Blockchain ID</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-text/60 uppercase tracking-wider">Name</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-text/60 uppercase tracking-wider">Manufacturer</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-text/60 uppercase tracking-wider">Origin</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-text/60 uppercase tracking-wider">Registration Date</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-text/60 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cta/10">
            {products.map((product) => (
              <tr
                key={product.blockchainId || product.id}
                onClick={() => handleRowClick(product.blockchainId || product.id)}
                className="hover:bg-background/20 cursor-pointer transition-colors"
              >
                <td className="py-3 px-4 whitespace-nowrap text-sm font-mono text-text">
                  {product.blockchainId || (product.onChain && product.onChain.id) || product.id || 'N/A'}
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-text">
                  {product.name || 'Unnamed Product'}
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-text/80">
                  {product.manufacturer || 'N/A'}
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-text/80">
                  {product.origin || 'N/A'}
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-text/80">
                  {formatDate(product.registrationDate ||
                    (product.onChain && product.onChain.createTime ?
                      Number(product.onChain.createTime) * 1000 : null))}
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-sm">
                  {(() => {
                    // Status configuration: icon, color, and label
                    const statusConfig = {
                      'active': { icon: <FaCheckCircle className="mr-1" />, color: 'text-green-400', label: 'Active' },
                      'inactive': { icon: <FaTimesCircle className="mr-1" />, color: 'text-red-400', label: 'Inactive' },
                      'in-transit': { icon: <FaExchangeAlt className="mr-1" />, color: 'text-blue-400', label: 'In Transit' },
                      'delivered': { icon: <ImCheckboxChecked className="mr-1" />, color: 'text-teal-400', label: 'Delivered' },
                      'damaged': { icon: <FaExclamationTriangle className="mr-1" />, color: 'text-orange-400', label: 'Damaged' },
                      'recalled': { icon: <FaUndo className="mr-1" />, color: 'text-purple-400', label: 'Recalled' }
                    };

                    // Normalize status to lowercase and handle hyphens
                    const normalizedStatus = (product.status || 'inactive').toLowerCase().replace(/\s+/g, '-');

                    // Get configuration or use inactive as fallback
                    const config = statusConfig[normalizedStatus] || statusConfig.inactive;

                    return (
                      <span className={`flex items-center ${config.color}`}>
                        {config.icon} {config.label}
                      </span>
                    );
                  })()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsList;