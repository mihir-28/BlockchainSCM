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
    console.log(`Updating Firebase document ID: ${id} with data:`, updateData);
    
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: new Date().toISOString()
    });
    
    console.log('Firebase document updated successfully');
    // Verify the update by getting the updated document
    const updatedDoc = await getDoc(docRef);
    console.log('Updated document data:', updatedDoc.data());
    
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
    console.log(`FIREBASE: Looking for product with blockchain ID: ${blockchainId}`);
    const product = await getProductByBlockchainId(blockchainId);
    
    if (!product) {
      console.error(`FIREBASE: Product with blockchain ID ${blockchainId} not found in Firebase`);
      throw new Error(`Product with blockchain ID ${blockchainId} not found`);
    }
    
    console.log(`FIREBASE: Found product in Firebase with ID ${product.id}`);
    console.log(`FIREBASE: Current ownerAddress: ${product.ownerAddress}`);
    console.log(`FIREBASE: Will update to: ${updateData.ownerAddress}`);
    
    // Store before value
    const beforeOwner = product.ownerAddress;
    
    // Update the document
    const result = await updateProductInFirebase(product.id, updateData);
    
    // Verify the update
    const updatedProduct = await getProductByBlockchainId(blockchainId);
    console.log(`FIREBASE: After update, ownerAddress is: ${updatedProduct.ownerAddress}`);
    console.log(`FIREBASE: Update successful: ${beforeOwner !== updatedProduct.ownerAddress}`);
    
    return result;
  } catch (error) {
    console.error("FIREBASE: Error updating product in Firebase:", error);
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