import { getCurrentAccount, getWeb3, checkRole, hasLocalRole } from './web3Service';

// Role definitions
export const ROLES = {
  MANUFACTURER: 'MANUFACTURER_ROLE',
  DISTRIBUTOR: 'DISTRIBUTOR_ROLE',
  RETAILER: 'RETAILER_ROLE',
  CONSUMER: 'CONSUMER_ROLE',
  ADMIN: 'ADMIN_ROLE'
};

// Check if current user has a specific role
export const hasRole = async (role) => {
  try {
    // First check localStorage for faster response on refreshes
    if (hasLocalRole(role)) {
      return true;
    }
    
    const account = await getCurrentAccount();
    if (!account) return false;
    
    return await checkRole(account, role);
  } catch (error) {
    console.error('Error checking role:', error);
    return false;
  }
};

// Get all roles for the current user
export const getUserRoles = async () => {
  try {
    // First check localStorage
    const storedRoles = localStorage.getItem('userRoles');
    if (storedRoles) {
      return JSON.parse(storedRoles);
    }
    
    const account = await getCurrentAccount();
    if (!account) return [];
    
    const userRoles = [];
    
    for (const [key, value] of Object.entries(ROLES)) {
      if (await checkRole(account, value)) {
        userRoles.push(key);
      }
    }
    
    // Store in localStorage for future checks
    if (userRoles.length > 0) {
      localStorage.setItem('userRoles', JSON.stringify(userRoles));
    }
    
    return userRoles;
  } catch (error) {
    console.error('Error getting user roles:', error);
    return [];
  }
};