import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaEye } from 'react-icons/fa';

const ProductsList = ({ products }) => {
  const navigate = useNavigate();
  
  // Log available products to help debug
  console.log("Available products:", products); 
  
  // Render status indicator
  const renderStatus = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return (
          <span className="flex items-center text-green-400">
            <FaCheckCircle className="mr-1" />
            <span>Active</span>
          </span>
        );
      case 'inactive':
        return (
          <span className="flex items-center text-red-400">
            <FaTimesCircle className="mr-1" />
            <span>Inactive</span>
          </span>
        );
      default:
        return <span>{status}</span>;
    }
  };
  
  // Handle click on a product row - ensure we're using the correct ID format
  const handleProductClick = (productId) => {
    console.log("Navigating to product:", productId);
    navigate(`/dashboard/products/${productId}`);
  };
  
  // If there are no products
  if (products.length === 0) {
    return (
      <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-6 text-center">
        <p className="text-text/60">No products found. Register your first product to get started.</p>
      </div>
    );
  }
  
  // Render products table
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
              <th className="py-3 px-4 text-left text-xs font-medium text-text/60 uppercase tracking-wider">Date Added</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-text/60 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cta/5">
            {products.map((product) => (
              <tr 
                key={product.id} 
                onClick={() => handleProductClick(product.id)}
                className="hover:bg-cta/5 cursor-pointer transition-colors"
              >
                <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-cta">{product.id}</td>
                <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-text">{product.name}</td>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-text/80">{product.manufacturer}</td>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-text/80">{product.origin}</td>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-text/80">{product.registrationDate}</td>
                <td className="py-3 px-4 whitespace-nowrap text-sm">
                  {product.status === 'Active' ? (
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