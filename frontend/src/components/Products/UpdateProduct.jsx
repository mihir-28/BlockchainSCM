import React, { useState } from 'react';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import * as productService from '../../services/productService';
import { showSuccessToast, showErrorToast, showStatusUpdateSuccessToast } from '../../services/toastService';

const UpdateProduct = ({ product, onUpdateComplete, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    status: product.status
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Track if status has changed
  const statusChanged = formData.status !== product.status;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    setIsSubmitting(true);
    
    try {
      await productService.updateProduct(product.blockchainId, formData);
      
      // Show appropriate toast notifications
      if (statusChanged) {
        showStatusUpdateSuccessToast(formData.status);
      } else {
        showSuccessToast('Product information updated successfully');
      }
      
      setSuccess(true);
      if (onUpdateComplete) {
        // Close the modal immediately since we have toast notification
        onUpdateComplete();
      }
    } catch (err) {
      console.error('Error updating product:', err);
      setError(err.message || 'Failed to update product. Please try again.');
      showErrorToast(err.message || 'Failed to update product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-text mb-4 flex items-center">
        <FaEdit className="text-cta mr-2" /> Update Product Information
      </h2>
      
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-500 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-text/90 mb-1 text-sm">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-background border border-cta/20 rounded-lg"
            disabled={isSubmitting}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="status" className="block text-text/90 mb-1 text-sm">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-background border border-cta/20 rounded-lg"
            disabled={isSubmitting}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="In-Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Damaged">Damaged</option>
            <option value="Recalled">Recalled</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-text/90 mb-1 text-sm">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 bg-background border border-cta/20 rounded-lg"
            disabled={isSubmitting}
          ></textarea>
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
                Updating...
              </>
            ) : (
              <>
                <FaSave className="mr-2" /> Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;