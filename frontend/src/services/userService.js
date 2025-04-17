import { doc, updateDoc, getDoc } from 'firebase/firestore';
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