import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import LoadingSpinner from '../Common/LoadingSpinner';

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [hasPermission, setHasPermission] = useState(null);
  const [isCheckingPermission, setIsCheckingPermission] = useState(false);
  
  // Check if user is authenticated
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // If no specific roles are required, just render children (auth-only route)
  if (requiredRoles.length === 0) {
    return children;
  }
  
  // Check permissions from Firestore database
  useEffect(() => {
    const checkDatabaseRole = async () => {
      if (!currentUser) return;
      
      setIsCheckingPermission(true);
      
      try {
        // Get user document from Firestore
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const userData = userSnap.data();
          const userRole = userData.role;
          
          // Check if user's role is in the required roles array
          // Note: Convert DB roles format to match the required format
          const formattedRole = userRole?.replace('_ROLE', '');
          
          // Allow access if user has any of the required roles
          let roleMatched = false;
          
          for (const role of requiredRoles) {
            // Compare with both formats (with and without _ROLE suffix)
            if (
              formattedRole === role || 
              userRole === role || 
              formattedRole === role.replace('_ROLE', '') ||
              userRole === `${role}_ROLE`
            ) {
              roleMatched = true;
              break;
            }
          }
          
          // Special case for ADMIN - always has access
          if (userRole === 'ADMIN_ROLE' || formattedRole === 'ADMIN') {
            roleMatched = true;
          }
          
          setHasPermission(roleMatched);
        } else {
          // User document doesn't exist
          setHasPermission(false);
        }
      } catch (error) {
        console.error('Error checking permissions:', error);
        setHasPermission(false);
      } finally {
        setIsCheckingPermission(false);
      }
    };
    
    checkDatabaseRole();
  }, [currentUser, requiredRoles]);
  
  // Show loading while checking permissions
  if (isCheckingPermission) {
    return <LoadingSpinner message="Verifying permissions..." />;
  }
  
  // If permission check is complete and user doesn't have permission, redirect to unauthorized
  if (hasPermission === false) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
  
  // User has required permissions
  return children;
};

export default ProtectedRoute;