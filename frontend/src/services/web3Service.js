import Web3 from 'web3';
import SupplyChainAgreementABI from '../contracts/SupplyChainAgreement.json';
import ProductTrackingABI from '../contracts/ProductTracking.json';
import AccessControlABI from '../contracts/AccessControl.json';
import contractAddresses from '../contracts/addresses.json';

let web3Instance;
let supplyChainAgreement;
let productTracking;
let accessControl;

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

const initContracts = () => {
  // Initialize contract instances if addresses are available
  if (CONTRACT_ADDRESSES.supplyChain) {
    supplyChainAgreement = new web3Instance.eth.Contract(
      SupplyChainAgreementABI.abi,
      CONTRACT_ADDRESSES.supplyChain
    );
  }

  if (CONTRACT_ADDRESSES.productTracking) {
    productTracking = new web3Instance.eth.Contract(
      ProductTrackingABI.abi,
      CONTRACT_ADDRESSES.productTracking
    );
  }

  if (CONTRACT_ADDRESSES.accessControl) {
    accessControl = new web3Instance.eth.Contract(
      AccessControlABI.abi,
      CONTRACT_ADDRESSES.accessControl
    );
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
export const createProduct = async (name, manufacturer, dataHash) => {
  try {
    const account = await getCurrentAccount();
    return await productTracking.methods
      .createProduct(name, manufacturer, dataHash)
      .send({ from: account });
  } catch (error) {
    console.error('Error creating product:', error);
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
export const getProductTrackingContract = () => productTracking;
export const getAccessControlContract = () => accessControl;

// Get the web3 instance
export const getWeb3 = () => web3Instance;

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
  grantRole,
  checkRole,
  getSupplyChainContract,
  getProductTrackingContract,
  getAccessControlContract,
  getWeb3
};