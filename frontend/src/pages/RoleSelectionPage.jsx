import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBriefcase, FaArrowRight, FaSpinner } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { updateUserRole } from '../services/userService';
import { toast } from 'react-toastify';

const RoleSelectionPage = () => {
  const [selectedRole, setSelectedRole] = useState('CONSUMER_ROLE');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser, updateUserData } = useAuth();
  const navigate = useNavigate();
  
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Update user's role in Firestore
      await updateUserRole(currentUser.uid, selectedRole);
      
      // Update local context
      await updateUserData({ role: selectedRole });
      
      toast.success('Role selected successfully!');
      
      // Redirect to wallet connection
      navigate('/wallet-connection');
    } catch (error) {
      console.error('Error setting role:', error);
      toast.error('Failed to set role. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const roles = [
    { id: 'CONSUMER_ROLE', name: 'Consumer', description: 'End-user who purchases and consumes products' },
    { id: 'RETAILER_ROLE', name: 'Retailer', description: 'Sells products directly to consumers' },
    { id: 'DISTRIBUTOR_ROLE', name: 'Distributor', description: 'Distributes products to retailers' },
    { id: 'MANUFACTURER_ROLE', name: 'Manufacturer', description: 'Creates and produces original products' }
  ];

  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-panel/30 backdrop-blur-sm rounded-xl border border-cta/20 p-8 shadow-xl"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cta/10 mb-4">
                <FaBriefcase className="text-cta text-2xl" />
              </div>
              <h1 className="text-3xl font-display font-bold text-cta mb-2">Select Your Role</h1>
              <p className="text-text/70">Choose your primary role in the supply chain network</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 mb-8">
                {roles.map((role) => (
                  <div 
                    key={role.id}
                    onClick={() => handleRoleSelect(role.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedRole === role.id 
                        ? 'border-cta bg-cta/10' 
                        : 'border-cta/20 bg-background/40 hover:bg-background/60'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedRole === role.id ? 'border-cta' : 'border-cta/40'
                      }`}>
                        {selectedRole === role.id && (
                          <div className="w-3 h-3 rounded-full bg-cta"></div>
                        )}
                      </div>
                      <div className="ml-3">
                        <h3 className={`font-medium ${
                          selectedRole === role.id ? 'text-cta' : 'text-text'
                        }`}>{role.name}</h3>
                        <p className="text-sm text-text/70">{role.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting || !selectedRole}
                className="w-full py-3 px-4 bg-cta hover:bg-cta/90 text-background font-bold rounded-lg
                         transition-colors flex justify-center items-center"
              >
                {isSubmitting ? (
                  <FaSpinner className="animate-spin h-5 w-5" />
                ) : (
                  <>
                    Continue <FaArrowRight className="ml-2" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;