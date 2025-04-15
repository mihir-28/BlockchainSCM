import web3Service from './web3Service';

/**
 * Safely converts BigInt values to strings to prevent mixing errors
 * @param {any} value - Value that might be a BigInt
 * @returns {any} - Safe value for use in UI
 */
const safeBigIntToString = (value) => {
  if (typeof value === 'bigint') {
    return value.toString();
  } else if (typeof value === 'object' && value !== null) {
    if (Array.isArray(value)) {
      return value.map(item => safeBigIntToString(item));
    } else {
      const result = {};
      for (const key in value) {
        result[key] = safeBigIntToString(value[key]);
      }
      return result;
    }
  }
  return value;
};

/**
 * Extracts a meaningful description from transaction data
 * @param {string} type - Transaction type
 * @param {Object} data - Transaction data from blockchain
 * @returns {string} - Human-readable description
 */
const extractDescription = (type, data) => {
  if (!data) return `${type || 'Blockchain'} transaction`;
  
  switch (type) {
    case 'product':
      // Use the actual product description if available
      if (data.description) {
        return data.description;
      }
      
      // Fall back to using name/productId
      if (data.name) {
        return `Product: ${data.name}`;
      }
      
      if (data.productId) {
        return `Product ID: ${data.productId}`;
      }
      
      return 'Product registration';
      
    case 'shipment':
      if (data.description) {
        return data.description;
      }
      
      if (data.shipmentId) {
        let desc = `Shipment ID: ${data.shipmentId}`;
        if (data.destination) {
          desc += ` to ${data.destination}`;
        }
        return desc;
      }
      
      return 'Shipment transaction';
      
    default:
      // Use existing description if available
      if (data.description) {
        return data.description;
      }
      
      // Look for common fields that might contain meaningful info
      for (const field of ['name', 'title', 'label', 'productName', 'info', 'details']) {
        if (data[field]) {
          return data[field];
        }
      }
      
      return `${type || 'Blockchain'} transaction`;
  }
};

/**
 * Fetches transaction data from the blockchain
 * @param {Object} filters - Transaction filters
 * @returns {Promise<Array>} Array of transaction objects
 */
export const fetchTransactions = async (filters = {}) => {
  try {
    const web3 = web3Service.getWeb3();
    if (!web3) {
      throw new Error("Web3 not initialized");
    }

    // Get current account
    const account = await web3Service.getCurrentAccount();
    if (!account) {
      throw new Error("No account connected");
    }

    // Fetch latest block number
    const latestBlock = await web3.eth.getBlockNumber();
    
    // Determine from which block to start (based on timeframe filter)
    let fromBlock = 0;
    if (filters.timeframe) {
      const blocksPerDay = 5760; // Approximate blocks per day (may vary by blockchain)
      switch (filters.timeframe) {
        case '24h':
          fromBlock = Math.max(0, latestBlock - blocksPerDay);
          break;
        case '7d':
          fromBlock = Math.max(0, latestBlock - (blocksPerDay * 7));
          break;
        case '30d':
          fromBlock = Math.max(0, latestBlock - (blocksPerDay * 30));
          break;
        default:
          fromBlock = 0;
      }
    }

    // Get product contract
    const productContract = web3Service.getProductContract();
    
    // Array to hold all transactions
    let transactions = [];

    // Fetch product-related events
    if (!filters.type || filters.type === 'all' || filters.type === 'product') {
      const productEvents = await productContract.getPastEvents('ProductCreated', {
        fromBlock,
        toBlock: 'latest'
      });

      const productTransactions = await Promise.all(productEvents.map(async (event) => {
        const block = await web3.eth.getBlock(event.blockNumber);
        const tx = await web3.eth.getTransaction(event.transactionHash);
        
        // Get transaction receipt for gas used
        const receipt = await web3.eth.getTransactionReceipt(event.transactionHash);
        
        // Safely convert any BigInt to string in event values
        const safeReturnValues = safeBigIntToString(event.returnValues);
        
        // Get the product ID from the event
        const productId = safeReturnValues.productId;
        
        // Fetch the complete product data from the blockchain to get the description
        let productData = safeReturnValues;
        try {
          if (productId && web3Service.getProduct) {
            // Call the getProduct method from your web3Service to get full product data
            const fullProductData = await web3Service.getProduct(productId);
            if (fullProductData) {
              productData = safeBigIntToString(fullProductData);
            }
          }
        } catch (error) {
          console.warn("Could not fetch full product data:", error);
        }
        
        // The actual product description from blockchain data
        let description = 'Product registration';
        if (productData.description) {
          description = productData.description;
        } else if (productData.name) {
          description = `Product: ${productData.name}`;
        }
        
        return {
          id: event.transactionHash,
          type: 'product',
          description,
          user: tx.from,
          userRole: 'Product Manager',
          walletAddress: tx.from,
          timestamp: new Date(Number(block.timestamp) * 1000).toISOString(),
          status: 'confirmed',
          blockNumber: String(event.blockNumber),
          gasUsed: String(receipt.gasUsed),
          authMethod: 'Wallet Signature',
          verified: true,
          data: productData
        };
      }));
      
      transactions = [...transactions, ...productTransactions];
    }

    // Check if shipment contract exists and fetch shipment events
    if (web3Service.getShipmentContract && (!filters.type || filters.type === 'all' || filters.type === 'shipment')) {
      try {
        const shipmentContract = web3Service.getShipmentContract();
        if (shipmentContract) {
          const shipmentEvents = await shipmentContract.getPastEvents('ShipmentCreated', {
            fromBlock,
            toBlock: 'latest'
          });
  
          const shipmentTransactions = await Promise.all(shipmentEvents.map(async (event) => {
            const block = await web3.eth.getBlock(event.blockNumber);
            const tx = await web3.eth.getTransaction(event.transactionHash);
            const receipt = await web3.eth.getTransactionReceipt(event.transactionHash);
            
            // Safely convert any BigInt to string
            const safeReturnValues = safeBigIntToString(event.returnValues);
            
            // Extract meaningful description from shipment data
            const description = extractDescription('shipment', safeReturnValues);
            
            return {
              id: event.transactionHash,
              type: 'shipment',
              description,
              user: tx.from,
              userRole: 'Logistics Manager',
              walletAddress: tx.from,
              timestamp: new Date(Number(block.timestamp) * 1000).toISOString(),
              status: 'confirmed',
              blockNumber: String(event.blockNumber),
              gasUsed: String(receipt.gasUsed),
              authMethod: 'Wallet Signature',
              verified: true,
              data: safeReturnValues
            };
          }));
          
          transactions = [...transactions, ...shipmentTransactions];
        }
      } catch (error) {
        console.warn("No shipment contract available:", error);
      }
    }

    // Filter based on status if needed
    if (filters.status && filters.status !== 'all') {
      transactions = transactions.filter(tx => tx.status === filters.status);
    }

    // Sort transactions by timestamp (newest first)
    transactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    return transactions;
  } catch (error) {
    console.error("Error fetching blockchain transactions:", error);
    throw error;
  }
};

/**
 * Get transaction details for a specific transaction hash
 * @param {string} txHash - Transaction hash
 * @returns {Promise<Object>} Transaction details
 */
export const getTransactionDetails = async (txHash) => {
  try {
    const web3 = web3Service.getWeb3();
    if (!web3) {
      throw new Error("Web3 not initialized");
    }
    
    // Get transaction details
    const tx = await web3.eth.getTransaction(txHash);
    if (!tx) {
      throw new Error("Transaction not found");
    }
    
    // Get transaction receipt
    const receipt = await web3.eth.getTransactionReceipt(txHash);
    
    // Get block details to get timestamp
    const block = await web3.eth.getBlock(tx.blockNumber);
    
    // Determine transaction type from recipient contract
    let type = 'unknown';
    let description = 'Blockchain transaction';
    let data = {};
    
    const productContract = web3Service.getProductTrackingContract();
    const supplyChainContract = web3Service.getSupplyChainContract();
    
    // Check if transaction is to product contract
    if (productContract && tx.to && productContract._address && 
        tx.to.toLowerCase() === productContract._address.toLowerCase()) {
      type = 'product';
      
      // Try to get full product data
      try {
        // Get logs from this transaction to find event data
        const logs = receipt.logs.filter(log => 
          log.address.toLowerCase() === productContract._address.toLowerCase()
        );
        
        if (logs.length > 0) {
          // Decode logs using contract ABI
          const events = await productContract.getPastEvents('allEvents', {
            fromBlock: tx.blockNumber,
            toBlock: tx.blockNumber
          });
          
          // Find event for this transaction
          const event = events.find(e => e.transactionHash === txHash);
          
          if (event) {
            data = safeBigIntToString(event.returnValues);
            
            // If this is a product creation event, try to get full product data
            if (event.event === 'ProductCreated' && data.productId) {
              try {
                const productData = await web3Service.getProduct(data.productId);
                if (productData) {
                  // Merge product data while keeping event data
                  data = { 
                    ...safeBigIntToString(productData),
                    ...data
                  };
                  // Use product description for transaction description
                  if (productData.description) {
                    description = productData.description;
                  }
                }
              } catch (err) {
                console.warn("Could not get full product data:", err);
              }
            }
          }
        }
      } catch (err) {
        console.warn("Error getting detailed product data:", err);
      }
    } else if (supplyChainContract && tx.to && supplyChainContract._address && 
               tx.to.toLowerCase() === supplyChainContract._address.toLowerCase()) {
      type = 'shipment';
      description = 'Supply chain transaction';
      
      // Similar logic for shipment data could be added here
    }
    
    // If we couldn't get specialized data, just provide the transaction basics
    if (Object.keys(data).length === 0) {
      data = {
        from: tx.from,
        to: tx.to,
        value: web3.utils.fromWei(String(tx.value), 'ether'),
        gas: String(tx.gas),
        gasUsed: String(receipt.gasUsed),
        input: tx.input
      };
    }
    
    return {
      id: txHash,
      type,
      description,
      user: tx.from,
      userRole: 'Blockchain User',
      walletAddress: tx.from,
      timestamp: new Date(Number(block.timestamp) * 1000).toISOString(),
      status: receipt.status ? 'confirmed' : 'failed',
      blockNumber: String(tx.blockNumber),
      gasUsed: String(receipt.gasUsed),
      authMethod: 'Wallet Signature',
      verified: true,
      data
    };
  } catch (error) {
    console.error("Error fetching transaction details:", error);
    throw error;
  }
};

/**
 * Fetches recent transactions from the blockchain
 * @param {number} limit - Maximum number of transactions to return
 * @returns {Promise<Array>} Array of recent transaction objects
 */
export const fetchRecentTransactions = async (limit = 5) => {
  try {
    // Use the existing fetchTransactions function but add a limit
    const allTransactions = await fetchTransactions();
    
    // Sort by timestamp (newest first) and limit the results
    return allTransactions
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  } catch (error) {
    console.error("Error fetching recent transactions:", error);
    throw error;
  }
};

// Update the default export
export default {
  fetchTransactions,
  getTransactionDetails,
  fetchRecentTransactions
};