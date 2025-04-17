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
        const contractsInitialized = await initContracts();
        
        return contractsInitialized;
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
      const contractsInitialized = await initContracts();
      return contractsInitialized;
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

// Update the initContracts function
const initContracts = async () => {
  try {
    // Log network ID to ensure we're using the right network
    const currentNetworkId = await web3Instance.eth.net.getId();
    console.log("Connected to network ID:", currentNetworkId);
    
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
    const productContract = await getProductTrackingContract();
    if (!productContract) {
      throw new Error('Contract is not available');
    }
    
    const accounts = await web3Instance.eth.getAccounts();
    if (!accounts || accounts.length === 0) {
      throw new Error('No connected accounts found');
    }
    
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
    const productContract = await getProductTrackingContract();
    if (!productContract) {
      throw new Error('Contract is not available');
    }
    
    const accounts = await web3Instance.eth.getAccounts();
    if (!accounts || accounts.length === 0) {
      throw new Error('No connected accounts found');
    }
    
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
    // Get the contract instance using the async function
    const productContract = await getProductTrackingContract();
    if (!productContract) {
      throw new Error('Contract is not available');
    }
    
    // Get the current account
    const accounts = await web3Instance.eth.getAccounts();
    if (!accounts || accounts.length === 0) {
      throw new Error('No connected accounts found');
    }
    
    // Call the method with proper error handling
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
    const productContract = await getProductTrackingContract();
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

export const revokeRole = async (account, role) => {
  try {
    const currentAccount = await getCurrentAccount();
    if (!currentAccount) throw new Error("No wallet connected");
    
    const roleHash = web3Instance.utils.keccak256(role);
    return await accessControl.methods
      .revokeRole(account, roleHash)
      .send({ from: currentAccount });
  } catch (error) {
    console.error('Error revoking role:', error);
    throw error;
  }
};

// Get the contract owner (deployer)
export const getContractOwner = async () => {
  try {
    const accessControlContract = await getAccessControlContract();
    if (!accessControlContract) {
      throw new Error("Access control contract not initialized");
    }
    
    return await accessControlContract.methods.admin().call();
  } catch (error) {
    console.error("Error getting contract owner:", error);
    throw error;
  }
};

// Setup initial admin (only works for contract deployer)
export const setupInitialAdmin = async () => {
  try {
    const account = await getCurrentAccount();
    if (!account) {
      throw new Error("No wallet connected");
    }
    
    const accessControlContract = await getAccessControlContract();
    if (!accessControlContract) {
      throw new Error("Access control contract not initialized");
    }
    
    // Get contract owner
    const owner = await accessControlContract.methods.admin().call();
    
    // Only the contract owner can do this
    if (owner.toLowerCase() !== account.toLowerCase()) {
      throw new Error("Only the contract deployer can set up the first admin");
    }
    
    // Grant ADMIN_ROLE to the current account
    const ADMIN_ROLE = web3Instance.utils.keccak256("ADMIN_ROLE");
    await accessControlContract.methods
      .grantRole(account, ADMIN_ROLE)
      .send({ from: account });
    
    // Store admin status in localStorage for persistence
    localStorage.setItem('userRoles', JSON.stringify(['ADMIN_ROLE']));
    
    return true;
  } catch (error) {
    console.error("Error setting up admin:", error);
    throw error;
  }
};

// Add this helper function to check if the role exists in local storage
// This helps with page refreshes
export const hasLocalRole = (role) => {
  try {
    const storedRoles = localStorage.getItem('userRoles');
    if (!storedRoles) return false;
    
    const roles = JSON.parse(storedRoles);
    return roles.includes(role);
  } catch (error) {
    console.error("Error checking local roles:", error);
    return false;
  }
};

// Helper functions
export const getSupplyChainContract = () => supplyChainAgreement;

// Fix for the contract initialization function
export const getProductTrackingContract = async () => {
  try {
    // Make sure web3 is initialized before proceeding
    if (!web3Instance) {
      const initialized = await initWeb3();
      if (!initialized) {
        throw new Error('Web3 is not initialized');
      }
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
    throw error;
  }
};

export const getAccessControlContract = () => accessControl;

export const isValidAddress = (address) => {
  return web3Instance && web3Instance.utils.isAddress(address);
};

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
  revokeRole,
  getContractOwner,
  setupInitialAdmin,
  hasLocalRole,
  getSupplyChainContract,
  getProductTrackingContract,
  getAccessControlContract,
  getProductContract,
  getShipmentContract,
  isValidAddress
};