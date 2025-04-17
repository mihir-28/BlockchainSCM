import { doc, updateDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Update a user's role in Firestore
 * @param {string} userId - The user's ID
 * @param {string} role - The role to assign
 * @returns {Promise} - Promise that resolves when the role is updated
 */
export const updateUserRole = async (userId, role) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { role });
    return true;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};

/**
 * Check if a user needs to complete their profile
 * (e.g., if they signed in with Google and don't have a role yet)
 * @param {string} userId - The user's ID
 * @returns {Promise<boolean>} - True if profile needs completion
 */
export const checkNeedsProfileCompletion = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      // Check if role is missing
      return !userData.role;
    }
    return true; // User doesn't exist in Firestore yet
  } catch (error) {
    console.error("Error checking profile completion:", error);
    return true; // Default to needing completion if there's an error
  }
};

/**
 * Gets a user by their wallet address
 * @param {string} walletAddress - The wallet address to look up
 * @returns {Promise<Object|null>} The user object if found, null otherwise
 */
export const getUserByWalletAddress = async (walletAddress) => {
  try {
    if (!walletAddress) {
      console.warn('Wallet address is null or undefined');
      return null;
    }

    // Normalize to lowercase for case-insensitive comparison
    const normalizedAddress = walletAddress.toLowerCase();
    
    // Query Firestore for users with this wallet address
    const usersCollection = collection(db, 'users');
    
    // Get all users and filter manually for case-insensitive comparison
    const allUsersSnapshot = await getDocs(usersCollection);
    
    let matchingUser = null;
    
    allUsersSnapshot.forEach(doc => {
      const userData = doc.data();
      
      // Check walletAddress field
      if (userData.walletAddress && 
          userData.walletAddress.toLowerCase() === normalizedAddress) {
        matchingUser = {
          id: doc.id,
          ...userData
        };
        return; // Break the forEach loop
      }
      
      // Also check wallet field if available
      if (userData.wallet && 
          userData.wallet.toLowerCase() === normalizedAddress) {
        matchingUser = {
          id: doc.id,
          ...userData
        };
        return; // Break the forEach loop
      }
    });
    
    if (matchingUser) {
      console.log('Found matching user for wallet address:', walletAddress);
      return matchingUser;
    }
    
    console.log('No user found with wallet address:', walletAddress);
    
    // Fallback to a default user role for this address
    return {
      id: 'unknown',
      role: 'Blockchain User',
      walletAddress: walletAddress
    };
  } catch (error) {
    console.error('Error fetching user by wallet address:', error);
    
    // Fallback to a default user role for this address
    return {
      id: 'unknown',
      role: 'Blockchain User',
      walletAddress: walletAddress
    };
  }
};