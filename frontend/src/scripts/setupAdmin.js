import Web3 from 'web3';
import AccessControlABI from '../contracts/AccessControl.json';

const setupAdmin = async () => {
  try {
    // Connect to Web3
    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    const accounts = await web3.eth.getAccounts();
    const yourAddress = accounts[0]; // Your connected MetaMask account
    
    // Load the contract
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = AccessControlABI.networks[networkId];
    const accessControl = new web3.eth.Contract(
      AccessControlABI.abi,
      deployedNetwork && deployedNetwork.address
    );
    
    // Check if the contract recognizes an admin
    const currentAdmin = await accessControl.methods.admin().call();
    console.log("Current admin is:", currentAdmin);
    
    // Grant yourself admin role (will only work if called by existing admin)
    const ADMIN_ROLE = web3.utils.keccak256("ADMIN_ROLE");
    await accessControl.methods.grantRole(yourAddress, ADMIN_ROLE).send({ from: yourAddress });
    
    console.log(`Admin role granted to ${yourAddress}`);
    return true;
  } catch (error) {
    console.error("Error setting up admin:", error);
    return false;
  }
};

export default setupAdmin;