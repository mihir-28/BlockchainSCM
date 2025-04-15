import { db } from './firebase';
import { collection, addDoc, getDoc, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const productsCollection = 'products';

// Create a new product in Firebase
export const createProductInFirebase = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, productsCollection), {
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return { id: docRef.id, ...productData };
  } catch (error) {
    console.error("Error adding product to Firebase:", error);
    throw error;
  }
};

// Get a product by its blockchain ID
export const getProductByBlockchainId = async (blockchainId) => {
  try {
    const q = query(
      collection(db, productsCollection),
      where("blockchainId", "==", blockchainId)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }

    // Return the first matching document
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error("Error getting product from Firebase:", error);
    throw error;
  }
};

// Get a product by Firebase document ID
export const getProductById = async (id) => {
  try {
    const docRef = doc(db, productsCollection, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting product from Firebase:", error);
    throw error;
  }
};

// Update a product in Firebase
export const updateProductInFirebase = async (id, updateData) => {
  try {
    const docRef = doc(db, productsCollection, id);

    await updateDoc(docRef, {
      ...updateData,
      updatedAt: new Date().toISOString()
    });

    return true;
  } catch (error) {
    console.error("Error updating product in Firebase:", error);
    throw error;
  }
};

// Update a product by blockchain ID
export const updateProductByBlockchainId = async (blockchainId, updateData) => {
  try {
    // First get the Firebase document ID
    const product = await getProductByBlockchainId(blockchainId);
    if (!product) {
      throw new Error(`Product with blockchain ID ${blockchainId} not found`);
    }

    return updateProductInFirebase(product.id, updateData);
  } catch (error) {
    console.error("Error updating product in Firebase:", error);
    throw error;
  }
};

// Get all products for the current user
export const getUserProducts = async () => {
  try {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const q = query(
      collection(db, productsCollection),
      where("ownerId", "==", userId)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting user products from Firebase:", error);
    throw error;
  }
};