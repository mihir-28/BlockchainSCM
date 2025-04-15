import Web3 from 'web3';
import SupplyChainAgreementABI from '../contracts/SupplyChainAgreement.json';
import ProductTrackingABI from '../contracts/ProductTracking.json';
import AccessControlABI from '../contracts/AccessControl.json';
import contractAddresses from '../contracts/addresses.json';

let web3Instance = null;
let networkId = null;
let accounts = [];

let supplyChainAgreement;
let productTracking;
let accessControl;
let productContract;
let shipmentContract;

// Contract addresses should be defined based on your deployment
const CONTRACT_ADDRESSES = {
  supplyChain: contractAddresses.SupplyChainAgreement,
  productTracking: contractAddresses.ProductTracking,
  accessControl: contractAddresses.AccessControl,
};

// Initialize Web3
export const initWeb3 = async () => {
  try {
    // Check if Web3 is already initialized
    if (web3Instance) {
      return true;
    }
    
    // Modern dapp browsers
    if (window.ethereum) {
      web3Instance = new Web3(window.ethereum);
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Get network ID
        networkId = await web3Instance.eth.net.getId();
        console.log("Connected to network ID:", networkId);
        
        // Get accounts
        accounts = await web3Instance.eth.getAccounts();
        
        // Initialize contract instances
        initContracts();

        return true;
      } catch (error) {
        console.error("User denied account access:", error);
        return false;
      }
    }
    // Legacy dapp browsers
    else if (window.web3) {
      web3Instance = new Web3(window.web3.currentProvider);
      networkId = await web3Instance.eth.net.getId();
      accounts = await web3Instance.eth.getAccounts();
      initContracts();
      return true;
    }
    // Non-dapp browsers
    else {
      console.log('Non-Ethereum browser detected. Consider using MetaMask!');
      return false;
    }
  } catch (error) {
    console.error("Error initializing Web3:", error);
    return false;
  }
};

// Also update the initContracts function to add error handling
const initContracts = () => {
  try {
    // Log network ID to ensure we're using the right network
    web3Instance.eth.net.getId().then(networkId => {
      console.log("Connected to network ID:", networkId);
    });
    
    // Verify contract ABIs
    if (!SupplyChainAgreementABI.abi) {
      console.error("SupplyChainAgreement ABI is invalid");
      return false;
    }
    
    if (!ProductTrackingABI.abi) {
      console.error("ProductTracking ABI is invalid");
      return false;
    }
    
    if (!AccessControlABI.abi) {
      console.error("AccessControl ABI is invalid");
      return false;
    }
    
    // Initialize contract instances with better error handling
    supplyChainAgreement = new web3Instance.eth.Contract(
      SupplyChainAgreementABI.abi,
      CONTRACT_ADDRESSES.supplyChain
    );
    
    productTracking = new web3Instance.eth.Contract(
      ProductTrackingABI.abi,
      CONTRACT_ADDRESSES.productTracking
    );
    
    accessControl = new web3Instance.eth.Contract(
      AccessControlABI.abi,
      CONTRACT_ADDRESSES.accessControl
    );
    
    console.log("Contracts initialized:", {
      supplyChainAddress: CONTRACT_ADDRESSES.supplyChain,
      productTrackingAddress: CONTRACT_ADDRESSES.productTracking,
      accessControlAddress: CONTRACT_ADDRESSES.accessControl
    });
    
    return true;
  } catch (error) {
    console.error("Error initializing contracts:", error);
    return false;
  }
};

// Get Web3 instance
export const getWeb3 = () => {
  return web3Instance;
};

// Get current account
export const getCurrentAccount = async () => {
  try {
    if (!web3Instance) {
      return null;
    }
    
    const accts = await web3Instance.eth.getAccounts();
    return accts[0];
  } catch (error) {
    console.error("Error getting accounts:", error);
    return null;
  }
};

// Supply Chain Agreement methods
export const createShipment = async (receiver, productId, deliveryDeadline, value) => {
  try {
    const account = await getCurrentAccount();
    return await supplyChainAgreement.methods
      .createShipment(receiver, productId, deliveryDeadline)
      .send({ from: account, value: web3Instance.utils.toWei(value.toString(), 'ether') });
  } catch (error) {
    console.error('Error creating shipment:', error);
    throw error;
  }
};

export const startShipment = async (shipmentId) => {
  try {
    const account = await getCurrentAccount();
    return await supplyChainAgreement.methods
      .startShipment(shipmentId)
      .send({ from: account });
  } catch (error) {
    console.error('Error starting shipment:', error);
    throw error;
  }
};

export const confirmDelivery = async (shipmentId) => {
  try {
    const account = await getCurrentAccount();
    return await supplyChainAgreement.methods
      .confirmDelivery(shipmentId)
      .send({ from: account });
  } catch (error) {
    console.error('Error confirming delivery:', error);
    throw error;
  }
};

export const completeTransaction = async (shipmentId) => {
  try {
    const account = await getCurrentAccount();
    return await supplyChainAgreement.methods
      .completeTransaction(shipmentId)
      .send({ from: account });
  } catch (error) {
    console.error('Error completing transaction:', error);
    throw error;
  }
};

export const getShipment = async (shipmentId) => {
  try {
    return await supplyChainAgreement.methods
      .getShipment(shipmentId)
      .call();
  } catch (error) {
    console.error('Error getting shipment:', error);
    throw error;
  }
};

// Product Tracking methods
export const createProduct = async (manufacturer, origin, dataHash) => {
  try {
    const productContract = getProductTrackingContract();
    const accounts = await web3Instance.eth.getAccounts();
    
    const result = await productContract.methods
      .createProduct(manufacturer, origin, dataHash)
      .send({ from: accounts[0] });
    
    return result;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const transferProduct = async (productId, to) => {
  try {
    const productContract = getProductTrackingContract();
    const accounts = await web3Instance.eth.getAccounts();
    
    const result = await productContract.methods
      .transferProduct(productId, to)
      .send({ from: accounts[0] });
    
    return result;
  } catch (error) {
    console.error("Error transferring product:", error);
    throw error;
  }
};

export const updateProductData = async (productId, newDataHash) => {
  try {
    const productContract = getProductTrackingContract();
    const accounts = await web3Instance.eth.getAccounts();
    
    const result = await productContract.methods
      .updateProductData(productId, newDataHash)
      .send({ from: accounts[0] });
    
    return result;
  } catch (error) {
    console.error("Error updating product data:", error);
    throw error;
  }
};

export const getProduct = async (productId) => {
  try {
    const productContract = getProductTrackingContract();
    if (!productContract) {
      throw new Error('Contract is not available');
    }
    
    return await productContract.methods.getProduct(productId).call();
  } catch (error) {
    console.error("Error getting product:", error);
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const productCount = await productTracking.methods.productCount().call();
    const products = [];
    
    for (let i = 1; i <= parseInt(productCount); i++) {
      const product = await getProduct(i);
      products.push({
        id: formatBigInt(product.id),
        name: product.name,
        manufacturer: product.manufacturer,
        owner: product.owner,
        createTime: formatBigInt(product.createTime),
        updateTime: formatBigInt(product.updateTime),
        dataHash: product.dataHash
      });
    }
    
    return products;
  } catch (error) {
    console.error('Error getting all products:', error);
    throw error;
  }
};

// Access Control methods
export const grantRole = async (account, role) => {
  try {
    const currentAccount = await getCurrentAccount();
    const roleHash = web3Instance.utils.keccak256(role);
    return await accessControl.methods
      .grantRole(account, roleHash)
      .send({ from: currentAccount });
  } catch (error) {
    console.error('Error granting role:', error);
    throw error;
  }
};

export const checkRole = async (account, role) => {
  try {
    const roleHash = web3Instance.utils.keccak256(role);
    return await accessControl.methods
      .hasUserRole(account, roleHash)
      .call();
  } catch (error) {
    console.error('Error checking role:', error);
    throw error;
  }
};

// Helper functions
export const getSupplyChainContract = () => supplyChainAgreement;

// Fix for the contract initialization function
export const getProductTrackingContract = () => {
  try {
    if (!web3Instance) {
      console.warn("Web3 is not initialized");
      return null;
    }
    
    // Check if ABI is properly imported and structured
    if (!ProductTrackingABI) {
      console.error("ProductTracking ABI is not defined");
      return null;
    }
    
    // If ProductTrackingABI is a compiled contract JSON (from truffle/hardhat),
    // we need to extract the actual ABI
    const abi = ProductTrackingABI.abi ? ProductTrackingABI.abi : ProductTrackingABI;
    
    // Make sure we have a contract address
    if (!CONTRACT_ADDRESSES.productTracking) {
      console.error("ProductTracking address is not defined");
      return null;
    }
    
    // Now create the contract instance
    return new web3Instance.eth.Contract(
      abi,
      CONTRACT_ADDRESSES.productTracking
    );
  } catch (error) {
    console.error("Error creating contract instance:", error);
    return null;
  }
};

export const getAccessControlContract = () => accessControl;


/**
 * Gets the product contract instance
 * @returns {Object} The product contract instance
 */
const getProductContract = () => {
  if (!web3Instance) {
    console.error("Web3 not initialized");
    return null;
  }
  
  if (!productContract) {
    try {
      // Update this with your actual contract ABI and address
      const contractABI = ProductTrackingABI.abi;
      const contractAddress = CONTRACT_ADDRESSES.productTracking;
      
      productContract = new web3Instance.eth.Contract(
        contractABI,
        contractAddress
      );
    } catch (error) {
      console.error("Error initializing product contract:", error);
      return null;
    }
  }
  
  return productContract;
};

/**
 * Gets the shipment contract instance if available
 * @returns {Object} The shipment contract instance
 */
const getShipmentContract = () => {
  if (!web3Instance) {
    console.error("Web3 not initialized");
    return null;
  }
  
  if (!shipmentContract) {
    try {
      // Update this with your actual contract ABI and address
      // If you don't have a separate shipment contract yet, this might throw an error
      const contractABI = SupplyChainAgreementABI.abi;
      const contractAddress = CONTRACT_ADDRESSES.supplyChain;
      
      if (!contractABI || !contractAddress) {
        throw new Error("Shipment contract data not available");
      }
      
      shipmentContract = new web3Instance.eth.Contract(
        contractABI,
        contractAddress
      );
    } catch (error) {
      console.warn("Shipment contract not available:", error);
      return null;
    }
  }
  
  return shipmentContract;
};

// Export all functions
export default {
  initWeb3,
  getWeb3,
  getCurrentAccount,
  createShipment,
  startShipment,
  confirmDelivery,
  completeTransaction,
  getShipment,
  createProduct,
  transferProduct,
  updateProductData,
  getProduct,
  getAllProducts,
  grantRole,
  checkRole,
  getSupplyChainContract,
  getProductTrackingContract,
  getAccessControlContract,
  getProductContract,
  getShipmentContract
};