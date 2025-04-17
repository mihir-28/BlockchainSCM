import { createContext, useContext, useState, useEffect } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  updatePassword as firebaseUpdatePassword, // Renamed to avoid naming conflict
  EmailAuthProvider,
  reauthenticateWithCredential
} from "firebase/auth";
import { auth, db } from "../services/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// Keep the original Firebase user object and a separate profile state
export function AuthProvider({ children }) {
  // Split these into separate states
  const [firebaseUser, setFirebaseUser] = useState(null); // Raw Firebase user object
  const [profile, setProfile] = useState(null); // User profile data
  const [currentUser, setCurrentUser] = useState(null); // Combined user data
  const [loading, setLoading] = useState(true);

  // Modify your signup function to handle role assignment
  async function signup(email, password, userData) {
    try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Set display name if provided
      if (userData.displayName) {
        await updateProfile(user, { displayName: userData.displayName });
      }
      
      // Store the selected role
      const userRole = userData.role || 'CONSUMER_ROLE'; // Default to CONSUMER if not specified
      
      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        ...userData,
        role: userRole,
        createdAt: new Date().toISOString()
      });
      
      // Connect to the blockchain and assign the role if wallet is connected
      const { ethereum } = window;
      if (ethereum) {
        try {
          const accounts = await ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            const userWalletAddress = accounts[0];
            
            // Update Firestore with wallet address
            await updateDoc(doc(db, "users", user.uid), {
              walletAddress: userWalletAddress
            });
            
            // Call web3Service to assign role
            const web3Service = await import('../services/web3Service');
            await web3Service.initWeb3();
            
            // Grant the selected role
            if (userRole && userRole !== 'ADMIN_ROLE') { // Prevent self-assignment of admin
              await web3Service.grantRole(userWalletAddress, userRole);
            }
          }
        } catch (error) {
          console.error("Error assigning blockchain role:", error);
          // Continue without failing - role can be assigned later
        }
      }
      
      return user;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  // Update your signInWithGoogle function in AuthContext.jsx
  async function signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const isNewUser = result._tokenResponse.isNewUser;
      
      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (!userDoc.exists() || isNewUser) {
        // Create new user entry if they don't exist
        await setDoc(doc(db, "users", user.uid), {
          displayName: user.displayName || '',
          email: user.email,
          photoURL: user.photoURL,
          creationTime: new Date().toISOString(),
          lastLoginTime: new Date().toISOString(),
          // Don't set role yet - will be set in the role selection page
        });
        
        // Flag to redirect to role selection
        sessionStorage.setItem('needsRoleSelection', 'true');
      } else {
        // Existing user - check if they have a role
        const userData = userDoc.data();
        if (!userData.role) {
          sessionStorage.setItem('needsRoleSelection', 'true');
        }
        
        // Update last login time
        await updateDoc(doc(db, "users", user.uid), {
          lastLoginTime: new Date().toISOString()
        });
      }
      
      return user;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  }

  // Load user profile data from Firestore
  async function getUserProfile(userId) {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  }

  // Update user's wallet address in Firestore
  async function updateUserWallet(walletAddress) {
    if (!firebaseUser) return;
    
    try {
      await updateDoc(doc(db, "users", firebaseUser.uid), {
        walletAddress: walletAddress,
        lastUpdated: new Date().toISOString()
      });
      
      // Update local profile state
      setProfile(prevProfile => ({
        ...prevProfile,
        walletAddress
      }));
      
      // Update combined user state
      setCurrentUser({
        ...firebaseUser,
        profile: {
          ...profile,
          walletAddress
        }
      });
      
      return true;
    } catch (error) {
      console.error("Error updating wallet address:", error);
      return false;
    }
  }

  // Update user profile data in Firestore
  async function updateUserProfile(profileData) {
    if (!firebaseUser) return;
    
    try {
      // Update display name in Firebase Auth - using the raw firebaseUser
      if (profileData.displayName) {
        await updateProfile(firebaseUser, {
          displayName: profileData.displayName
        });
      }
      
      // Update profile data in Firestore
      await updateDoc(doc(db, "users", firebaseUser.uid), {
        ...profileData,
        lastUpdated: new Date().toISOString()
      });
      
      // Update local profile state
      const updatedProfile = profile ? 
        { ...profile, ...profileData } : 
        profileData;
      
      setProfile(updatedProfile);
      
      // Update combined user state
      setCurrentUser({
        ...firebaseUser,
        displayName: profileData.displayName || firebaseUser.displayName,
        profile: updatedProfile
      });
      
      return true;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  }

  // Update user password in Firebase Auth
  async function updatePassword(currentPassword, newPassword) {
    if (!firebaseUser) {
      throw new Error("No user is logged in");
    }
    
    try {
      // Create a credential with the user's email and current password
      const credential = EmailAuthProvider.credential(
        firebaseUser.email,
        currentPassword
      );
      
      // Reauthenticate user with the credential
      await reauthenticateWithCredential(firebaseUser, credential);
      
      // Update the password
      await firebaseUpdatePassword(firebaseUser, newPassword);
      
      // Store the password change timestamp in Firestore
      const passwordLastChanged = new Date().toISOString();
      await updateDoc(doc(db, "users", firebaseUser.uid), {
        passwordLastChanged
      });
      
      // If you have separate profile state, update it
      if (profile) {
        setProfile({
          ...profile,
          passwordLastChanged
        });
      }
      
      return true;
    } catch (error) {
      console.error("Error updating password:", error);
      
      // Provide more user-friendly error messages
      if (error.code === 'auth/wrong-password') {
        throw new Error('Current password is incorrect.');
      } else if (error.code === 'auth/requires-recent-login') {
        throw new Error('For security reasons, please log out and log back in before changing your password.');
      }
      
      throw error;
    }
  }

  // Add this new function to your AuthContext
  function addAuthNavigation(navigate) {
    // This function is called when auth state changes and can trigger navigation
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, you can navigate somewhere
        // Leave this empty as we'll handle navigation in the login/signup components
      }
    });
    
    return unsubscribe;
  }

  // Add this to your AuthContext provider
  const updateUserData = async (userData) => {
    try {
      if (!currentUser) return false;
      
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, userData);
      return true;
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Store the raw Firebase user
        setFirebaseUser(user);
        
        // Get the user profile separately
        const userProfile = await getUserProfile(user.uid);
        setProfile(userProfile);
        
        // Set the combined state for convenience in components
        setCurrentUser({ ...user, profile: userProfile });
      } else {
        setFirebaseUser(null);
        setProfile(null);
        setCurrentUser(null);
      }
      setLoading(false);
    });
    
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    signInWithGoogle,
    getUserProfile,
    updateUserWallet,
    updateUserProfile,
    updatePassword,
    addAuthNavigation,
    updateUserData // Add this line
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}