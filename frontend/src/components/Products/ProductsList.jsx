import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ProductsList = ({ products = [] }) => {
  const navigate = useNavigate();

  const handleRowClick = (productId) => {
    navigate(`/dashboard/products/${productId}`);
  };
  
  if (products.length === 0) {
    return null; // Let the parent component handle empty state
  }
  
  return (
    <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-background/40 border-b border-cta/10">
              <th className="py-3 px-4 text-left text-xs font-medium text-text/60 uppercase tracking-wider">ID</th>
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
                key={product.id} 
                onClick={() => handleRowClick(product.id)} 
                className="hover:bg-background/20 cursor-pointer transition-colors"
              >
                <td className="py-3 px-4 whitespace-nowrap text-sm text-text">{product.id}</td>
                <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-text">{product.name}</td>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-text/80">{product.manufacturer}</td>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-text/80">{product.origin}</td>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-text/80">{product.registrationDate}</td>
                <td className="py-3 px-4 whitespace-nowrap text-sm">
                  {product.status?.toLowerCase() === 'active' ? (
                    <span className="flex items-center text-green-400">
                      <FaCheckCircle className="mr-1" /> Active
                    </span>
                  ) : (
                    <span className="flex items-center text-red-400">
                      <FaTimesCircle className="mr-1" /> Inactive
                    </span>
                  )}
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