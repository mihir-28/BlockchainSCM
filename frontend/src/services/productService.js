import * as web3Service from './web3Service';
import * as firebaseService from './productFirebaseService';
import { getAuth } from 'firebase/auth';

// Helper to create a data hash from product details
export const createDataHash = (productData) => {
  const web3 = web3Service.getWeb3();
  // Create a deterministic JSON string by sorting keys
  const sortedData = JSON.stringify(productData, Object.keys(productData).sort());
  return web3.utils.sha3(sortedData);
};

// Create QR code data object with essential product info
export const createQRCodeData = (product) => {
  // Only include essential verification data to keep QR code simple
  return JSON.stringify({
    id: product.blockchainId,
    name: product.name,
    manufacturer: product.manufacturer,
    serialNumber: product.serialNumber,
    verificationUrl: `${window.location.origin}/verify/${product.blockchainId}`
  });
};

// Register a new product - stores on blockchain AND in Firebase
export const registerProduct = async (productData) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User not authenticated");
    }

    // Prepare off-chain data
    const offChainData = {
      name: productData.name,
      manufacturer: productData.manufacturer,
      description: productData.description,
      serialNumber: productData.serialNumber || `SN-${Date.now()}-${Math.floor(Math.random() * 90000 + 10000)}`,
      status: productData.status || 'Active',
      ownerId: user.uid,
      ownerName: user.displayName || user.email,
      ownerAddress: '', // Will be filled with blockchain address
      registrationDate: new Date().toISOString()
    };

    // Create hash of the off-chain data for on-chain verification
    const dataHash = createDataHash(offChainData);

    // 1. Store essential data on blockchain
    const blockchainResult = await web3Service.createProduct(
      productData.manufacturer,
      productData.origin,
      dataHash
    );

    // Extract product ID and owner address from blockchain result
    let productId;
    let ownerAddress;

    if (blockchainResult.events && blockchainResult.events.ProductCreated) {
      const eventValues = blockchainResult.events.ProductCreated.returnValues;
      productId = typeof eventValues.productId === 'bigint'
        ? eventValues.productId.toString()
        : eventValues.productId;
      ownerAddress = eventValues.owner;
    } else {
      throw new Error("Failed to get product ID from blockchain transaction");
    }

    // 2. Store complete data in Firebase
    const firebaseData = {
      ...offChainData,
      blockchainId: productId,
      origin: productData.origin,
      ownerAddress: ownerAddress,
      dataHash: dataHash,
      transactionHash: blockchainResult.transactionHash,
      blockNumber: blockchainResult.blockNumber ? blockchainResult.blockNumber.toString() : '',
      blockTimestamp: blockchainResult.blockTimestamp || Date.now()
    };

    const firebaseResult = await firebaseService.createProductInFirebase(firebaseData);

    return {
      ...firebaseResult,
      blockchainId: productId,
      transactionHash: blockchainResult.transactionHash
    };
  } catch (error) {
    console.error("Error registering product:", error);
    throw error;
  }
};

// Get product details - combines data from blockchain and Firebase
export const getProduct = async (blockchainId) => {
  try {
    // Get off-chain data from Firebase first
    const offChainData = await firebaseService.getProductByBlockchainId(blockchainId);
    
    if (!offChainData) {
      throw new Error(`No product found with ID ${blockchainId}`);
    }
    
    // Try to get on-chain data, but continue even if it fails
    let onChainData = null;
    let isVerified = false;
    
    try {
      // Get blockchain data
      onChainData = await web3Service.getProduct(blockchainId);
      
      // Verify data integrity by comparing hashes
      if (onChainData) {
        const calculatedHash = createDataHash({
          name: offChainData.name,
          manufacturer: offChainData.manufacturer,
          description: offChainData.description,
          serialNumber: offChainData.serialNumber,
          status: offChainData.status,
        });
        
        isVerified = calculatedHash === onChainData.dataHash;
      }
    } catch (blockchainError) {
      console.error("Blockchain data unavailable:", blockchainError);
      // Continue with just the Firebase data
    }
    
    // Return combined data, with fallbacks for missing blockchain data
    return {
      ...offChainData,
      onChain: onChainData || {
        // Provide default/placeholder values when blockchain data is unavailable
        id: blockchainId,
        manufacturer: offChainData.manufacturer,
        origin: offChainData.origin,
        owner: 'Blockchain data unavailable',
        createTime: '0',
        updateTime: '0',
        dataHash: 'Blockchain data unavailable'
      },
      isVerified: isVerified,
      blockchainDataAvailable: !!onChainData
    };
  } catch (error) {
    console.error("Error getting product:", error);
    throw error;
  }
};

// Transfer product ownership
export const transferProduct = async (blockchainId, toAddress) => {
  try {
    // 1. First transfer on blockchain
    const blockchainResult = await web3Service.transferProduct(blockchainId, toAddress);

    // 2. Then update in Firebase
    await firebaseService.updateProductByBlockchainId(blockchainId, {
      ownerAddress: toAddress,
      status: 'Transferred'
    });

    return blockchainResult;
  } catch (error) {
    console.error("Error transferring product:", error);
    throw error;
  }
};

// Update product data
export const updateProduct = async (blockchainId, updateData) => {
  try {
    // 1. Get current product from Firebase
    const currentProduct = await firebaseService.getProductByBlockchainId(blockchainId);

    if (!currentProduct) {
      throw new Error(`Product with blockchain ID ${blockchainId} not found`);
    }

    // 2. Create updated product data
    const updatedProduct = {
      ...currentProduct,
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    // Remove fields that shouldn't be part of the hash
    const { id, blockchainId: _, transactionHash, blockNumber, blockTimestamp, dataHash: __, ...hashData } = updatedProduct;

    // 3. Create new hash
    const newDataHash = createDataHash(hashData);

    // 4. Update hash on blockchain
    const blockchainResult = await web3Service.updateProductData(blockchainId, newDataHash);

    // 5. Update in Firebase
    await firebaseService.updateProductByBlockchainId(blockchainId, {
      ...updateData,
      dataHash: newDataHash
    });

    return {
      ...updatedProduct,
      dataHash: newDataHash,
      transactionHash: blockchainResult.transactionHash
    };
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};