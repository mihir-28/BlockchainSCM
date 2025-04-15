import Web3 from 'web3';
import SupplyChainAgreementABI from '../contracts/SupplyChainAgreement.json';
import ProductTrackingABI from '../contracts/ProductTracking.json';
import AccessControlABI from '../contracts/AccessControl.json';
import contractAddresses from '../contracts/addresses.json';

let web3Instance;
let supplyChainAgreement;
let productTracking;
let accessControl;
let productContract;
let shipmentContract;

// Get contract addresses from the addresses.json file
const CONTRACT_ADDRESSES = {
  supplyChain: contractAddresses.SupplyChainAgreement,
  productTracking: contractAddresses.ProductTracking,
  accessControl: contractAddresses.AccessControl,
};

export const initWeb3 = async () => {
  // Check if we've already initialized web3
  if (web3Instance) {
    return true;
  }
  
  // Check if MetaMask is installed
  if (window.ethereum) {
    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      web3Instance = new Web3(window.ethereum);

      // Initialize contract instances
      initContracts();

      return true;
    } catch (error) {
      console.error('User denied account access', error);
      return false;
    }
  }
  // If no injected web3 instance is detected, fall back to Ganache
  else {
    web3Instance = new Web3('http://localhost:7545');
    initContracts();
    console.log('Using local web3 provider');
    return true;
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

// Get current account
export const getCurrentAccount = async () => {
  const accounts = await web3Instance.eth.getAccounts();
  return accounts[0];
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
export const createProduct = async (name, manufacturer, origin, description, dataHash) => {
  try {
    const productContract = getProductTrackingContract();
    const accounts = await web3Instance.eth.getAccounts();
    
    const result = await productContract.methods
      .createProduct(name, manufacturer, origin, description, dataHash)
      .send({ from: accounts[0] });
      
    return result;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const transferProduct = async (to, productId) => {
  try {
    const account = await getCurrentAccount();
    return await productTracking.methods
      .transferProduct(to, productId)
      .send({ from: account });
  } catch (error) {
    console.error('Error transferring product:', error);
    throw error;
  }
};

export const getProduct = async (productId) => {
  try {
    return await productTracking.methods
      .getProduct(productId)
      .call();
  } catch (error) {
    console.error('Error getting product:', error);
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

// Add these logging features to help debug
export const getProductTrackingContract = () => {
  if (!productTracking) {
    console.error("ProductTracking contract not initialized");
    return null;
  }
  
  // Log available events to help debug
  const events = Object.keys(productTracking.events || {});
  console.log("Available events in ProductTracking contract:", events);
  
  return productTracking;
};

export const getAccessControlContract = () => accessControl;

// Get the web3 instance
export const getWeb3 = () => web3Instance;

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
  getCurrentAccount,
  createShipment,
  startShipment,
  confirmDelivery,
  completeTransaction,
  getShipment,
  createProduct,
  transferProduct,
  getProduct,
  getAllProducts,
  grantRole,
  checkRole,
  getSupplyChainContract,
  getProductTrackingContract,
  getAccessControlContract,
  getWeb3,
  getProductContract,
  getShipmentContract
};