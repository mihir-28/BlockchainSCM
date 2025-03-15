import { createContext, useContext, useState, useEffect } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth, db } from "../services/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(email, password, userData) {
    // Create user with email and password
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Store additional user data in Firestore
    await setDoc(doc(db, "users", credential.user.uid), {
      ...userData,
      email,
      createdAt: new Date().toISOString(),
      role: "user" // Default role
    });
    
    return credential;
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

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Check if this is a new user by looking for existing document
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      // If user doesn't exist in Firestore yet, create a new user document
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          displayName: user.displayName || '',
          email: user.email,
          photoURL: user.photoURL || '',
          creationTime: new Date().toISOString(),
          lastLoginTime: new Date().toISOString(),
          role: 'user',
          company: '',  // You might want to collect this information later
          phone: user.phoneNumber || ''
        });
      } else {
        // Update last login time for existing users
        await setDoc(doc(db, "users", user.uid), {
          lastLoginTime: new Date().toISOString()
        }, { merge: true });
      }
      
    return result;
  } catch (error) {
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
    if (!currentUser) return;
    
    try {
      await updateDoc(doc(db, "users", currentUser.uid), {
        walletAddress: walletAddress,
        lastUpdated: new Date().toISOString()
      });
      
      // Update local user object
      setCurrentUser(prevUser => ({
        ...prevUser,
        profile: {
          ...prevUser.profile,
          walletAddress
        }
      }));
      
      return true;
    } catch (error) {
      console.error("Error updating wallet address:", error);
      return false;
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const profile = await getUserProfile(user.uid);
        setCurrentUser({ ...user, profile });
      } else {
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
    updateUserWallet,
    addAuthNavigation // Add this new function
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}