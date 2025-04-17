import { useState, useEffect } from 'react';
import { hasRole, getUserRoles, ROLES } from '../services/accessControlService';

export const useAccessControl = () => {
  const [userRoles, setUserRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadRoles = async () => {
      try {
        const roles = await getUserRoles();
        setUserRoles(roles);
      } catch (error) {
        console.error('Error loading user roles:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadRoles();
  }, []);
  
  const checkPermission = async (requiredRole) => {
    return await hasRole(ROLES[requiredRole]);
  };
  
  const hasPermission = (requiredRole) => {
    return userRoles.includes(requiredRole);
  };
  
  return {
    userRoles,
    isLoading,
    checkPermission,
    hasPermission,
    isAdmin: userRoles.includes('ADMIN'),
    isManufacturer: userRoles.includes('MANUFACTURER'),
    isDistributor: userRoles.includes('DISTRIBUTOR'),
    isRetailer: userRoles.includes('RETAILER'),
    isConsumer: userRoles.includes('CONSUMER')
  };
};