import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useOutletContext } from 'react-router-dom';
import { FaPlus, FaFilter, FaSearch, FaEthereum, FaSpinner } from 'react-icons/fa';
import ProductRegistrationForm from '../components/Products/ProductRegistrationForm';
import ProductsList from '../components/Products/ProductsList';
import ProductDetails from '../components/Products/ProductDetails';
import web3Service from '../services/web3Service';

const ProductsPage = () => {
  // Get currentUser from the outlet context
  const { currentUser } = useOutletContext() || {};
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    origin: '',
    dateFrom: '',
  });
  const [filterOpen, setFilterOpen] = useState(false);

  // Blockchain related states
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [blockchainProducts, setBlockchainProducts] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Connect to blockchain and load products
  useEffect(() => {
    const initBlockchain = async () => {
      setIsLoading(true);
      try {
        // Initialize blockchain connection with more thorough checks
        const connected = await web3Service.initWeb3();
        const web3Instance = web3Service.getWeb3();
        const account = await web3Service.getCurrentAccount();
        
        // Only consider connected if we have all three: connection, web3 instance, and account
        const fullyConnected = connected && !!web3Instance && !!account;
        setIsConnected(fullyConnected);

        if (fullyConnected) {
          // Fetch all products from the blockchain
          await loadBlockchainProducts();
        } else {
          setError("Failed to connect to blockchain. Please check if MetaMask is installed and unlocked.");
        }
      } catch (err) {
        console.error("Blockchain initialization error:", err);
        setError(`Blockchain error: ${err.message}`);
        setIsConnected(false);
      } finally {
        setIsLoading(false);
      }
    };

    initBlockchain();
  }, []);

  // Helper to load blockchain products
  const loadBlockchainProducts = async () => {
    try {
      // Get all products from the blockchain
      const productContract = web3Service.getProductTrackingContract();
      if (!productContract) {
        throw new Error("Product tracking contract not initialized");
      }

      const productCount = await productContract.methods.productCount().call();
      const products = [];

      // Fetch each product
      for (let i = 1; i <= productCount; i++) {
        const product = await web3Service.getProduct(i);

        // Format product data
        products.push({
          id: formatBigInt(product.id),
          name: product.name,
          manufacturer: product.manufacturer,
          owner: product.owner,
          origin: product.origin,
          registrationDate: new Date(Number(formatBigInt(product.createTime)) * 1000).toLocaleDateString(),
          status: "Active", // Default status
          createTime: formatBigInt(product.createTime),
          updateTime: formatBigInt(product.updateTime),
          dataHash: product.dataHash
        });
      }

      setBlockchainProducts(products);
    } catch (err) {
      console.error("Error loading blockchain products:", err);
      setError(`Failed to load products: ${err.message}`);
      setBlockchainProducts([]);
    }
  };

  // Helper function to format BigInt values
  const formatBigInt = (value) => {
    if (typeof value === 'bigint') {
      return value.toString();
    }
    return value;
  };

  // Get unique origins for the filter dropdown
  const uniqueOrigins = [...new Set(blockchainProducts.map(product => product.origin))];

  // Function to handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  // Function to reset all filters
  const resetFilters = () => {
    setFilters({
      status: '',
      origin: '',
      dateFrom: '',
    });
    setSearchTerm('');
  };

  // Filter products based on search term and filters
  const filteredProducts = blockchainProducts.filter(product => {
    // Apply search filter
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      if (
        !product.name.toLowerCase().includes(lowercasedSearch) &&
        !product.id.toString().includes(lowercasedSearch) &&
        !product.manufacturer.toLowerCase().includes(lowercasedSearch)
      ) {
        return false;
      }
    }

    // Apply status filter
    if (filters.status && product.status.toLowerCase() !== filters.status.toLowerCase()) {
      return false;
    }

    // Apply origin filter
    if (filters.origin && product.origin !== filters.origin) {
      return false;
    }

    // Apply date filter
    if (filters.dateFrom) {
      const filterDate = new Date(filters.dateFrom);
      const productDate = new Date(product.registrationDate);
      if (productDate < filterDate) {
        return false;
      }
    }

    return true;
  });

  // Set up blockchain event listeners for product updates
  useEffect(() => {
    const setupEventListeners = () => {
      try {
        const productContract = web3Service.getProductTrackingContract();
        if (!productContract || !isConnected) return () => { };

        // Verify events exist before subscribing
        if (!productContract.events || !productContract.events.ProductCreated) {
          console.error("ProductCreated event not found in contract");
          return () => { };
        }

        // Listen for ProductCreated events
        const createdSubscription = productContract.events.ProductCreated({})
          .on('data', (event) => {
            console.log("New product created:", event);
            // Reload products when a new one is created
            loadBlockchainProducts();
          })
          .on('error', (error) => {
            console.error("Error in ProductCreated event:", error);
          });

        // Verify ProductTransferred event exists before subscribing
        let transferredSubscription = null;
        if (productContract.events.ProductTransferred) {
          transferredSubscription = productContract.events.ProductTransferred({})
            .on('data', (event) => {
              console.log("Product transferred:", event);
              // Reload products when ownership changes
              loadBlockchainProducts();
            })
            .on('error', (error) => {
              console.error("Error in ProductTransferred event:", error);
            });
        } else {
          console.warn("ProductTransferred event not found in contract");
        }

        // Return cleanup function
        return () => {
          try {
            if (createdSubscription && createdSubscription.removeAllListeners) {
              createdSubscription.removeAllListeners();
            }
            if (transferredSubscription && transferredSubscription.removeAllListeners) {
              transferredSubscription.removeAllListeners();
            }
          } catch (err) {
            console.error("Error cleaning up event listeners:", err);
          }
        };
      } catch (error) {
        console.error("Failed to set up event listeners:", error);
        return () => { };
      }
    };

    let cleanup = () => { };
    if (isConnected) {
      cleanup = setupEventListeners() || (() => { });
    }
    return cleanup;
  }, [isConnected]);

  return (
    <Routes>
      <Route path="/" element={
        <div className="space-y-6">
          <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-5 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold text-text">Product Management</h2>
                <p className="text-text/60 text-sm">Register and manage your products on the blockchain</p>
              </div>

              {/* Update breakpoints to match parent (md instead of sm) */}
              <div className="flex flex-col md:flex-row w-full md:w-auto items-center gap-3">
                <div className={`w-full md:w-auto px-3 py-1.5 rounded-full text-sm flex items-center justify-center ${
                  isConnected && web3Service.getWeb3() && web3Service.getCurrentAccount()
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  <FaEthereum className="mr-1" />
                  {isConnected && web3Service.getWeb3() && web3Service.getCurrentAccount()
                    ? 'Blockchain Connected'
                    : 'Not Connected'}
                </div>

                <button
                  onClick={() => navigate('/dashboard/products/new')}
                  className={`w-full md:w-auto bg-cta hover:bg-cta/90 text-background font-medium rounded-lg px-4 py-2.5 flex items-center justify-center transition-colors ${
                    !isConnected && 'opacity-50 cursor-not-allowed'
                  }`}
                  disabled={!isConnected}
                >
                  <FaPlus className="mr-2" /> Register New Product
                </button>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-5 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-background/50 border border-cta/10 rounded-lg py-2 pl-10 pr-4 text-text focus:outline-none focus:ring-1 focus:ring-cta/30"
                />
                <FaSearch className="absolute left-3 top-3 text-text/50" />
              </div>
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="bg-background/50 border border-cta/10 rounded-lg px-4 py-2 text-text flex items-center hover:border-cta/30 transition-all"
              >
                <FaFilter className="mr-2 text-cta" /> Filters
              </button>
            </div>

            {filterOpen && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-text/70 text-sm mb-1">Status</label>
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="w-full bg-background/50 border border-cta/10 rounded-lg py-2 px-3 text-text focus:outline-none focus:ring-1 focus:ring-cta/30"
                  >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-text/70 text-sm mb-1">Origin</label>
                  <select
                    name="origin"
                    value={filters.origin}
                    onChange={handleFilterChange}
                    className="w-full bg-background/50 border border-cta/10 rounded-lg py-2 px-3 text-text focus:outline-none focus:ring-1 focus:ring-cta/30"
                  >
                    <option value="">All Origins</option>
                    {uniqueOrigins.map(origin => (
                      <option key={origin} value={origin}>{origin}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-text/70 text-sm mb-1">Date From</label>
                  <input
                    type="date"
                    name="dateFrom"
                    value={filters.dateFrom}
                    onChange={handleFilterChange}
                    className="w-full bg-background/50 border border-cta/10 rounded-lg py-2 px-3 text-text focus:outline-none focus:ring-1 focus:ring-cta/30"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={resetFilters}
                    className="w-full bg-background/50 border border-cta/10 rounded-lg px-4 py-2 text-text/80 hover:text-text transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Loading state */}
          {isLoading ? (
            <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-12 flex justify-center items-center">
              <div className="flex flex-col items-center">
                <FaSpinner className="text-cta text-3xl animate-spin mb-4" />
                <p className="text-text/60">Loading blockchain products...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-panel/40 backdrop-blur-sm border border-red-500/20 rounded-xl p-8 text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-cta/10 text-cta border border-cta/20 rounded-lg hover:bg-cta/20 transition-colors"
              >
                Retry Connection
              </button>
            </div>
          ) : (
            <>
              {/* Products List with filtered results */}
              <ProductsList products={filteredProducts} searchTerm={searchTerm} filters={filters} />

              {/* Show message when no products match filters */}
              {filteredProducts.length === 0 && (
                <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-8 text-center mt-6">
                  <p className="text-text/60">
                    {blockchainProducts.length === 0
                      ? "No products found on the blockchain. Register your first product to get started."
                      : "No products match your search criteria"}
                  </p>
                  {blockchainProducts.length > 0 && (
                    <button
                      onClick={resetFilters}
                      className="mt-4 px-4 py-2 bg-cta/10 text-cta border border-cta/20 rounded-lg hover:bg-cta/20 transition-colors"
                    >
                      Reset Filters
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      } />
      <Route path="/new" element={<ProductRegistrationForm currentUser={currentUser} />} />
      <Route path="/:productId" element={<ProductDetails />} />
    </Routes>
  );
};

export default ProductsPage;