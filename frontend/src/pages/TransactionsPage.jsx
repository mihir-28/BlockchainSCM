import React, { useState, useEffect } from 'react';
import {
  FaExchangeAlt, FaSearch, FaFilter, FaSpinner, FaCheck,
  FaTimes, FaClock, FaFileDownload, FaHistory, FaChartBar,
  FaBoxOpen, FaTruckMoving, FaFileContract, FaStore, FaUserCheck,
  FaEthereum
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { CSVLink } from 'react-csv';
import transactionService from '../services/transactionService';
import web3Service from '../services/web3Service';

const TransactionsPage = () => {
  // STATE HOOKS
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    timeframe: 'all'
  });
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [view, setView] = useState('list'); // 'list' or 'grid'
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [blockExplorerUrl, setBlockExplorerUrl] = useState('https://etherscan.io');

  // Load transaction data
  useEffect(() => {
    const initBlockchain = async () => {
      try {
        // Connect to blockchain
        const connected = await web3Service.initWeb3();
        setIsConnected(connected);

        if (!connected) {
          throw new Error("Failed to connect to blockchain. Please check your wallet connection.");
        }

        // Get block explorer URL based on network
        const networkId = await web3Service.getWeb3().eth.net.getId();
        switch (networkId) {
          case 1:
            setBlockExplorerUrl('https://etherscan.io');
            break;
          case 3:
            setBlockExplorerUrl('https://ropsten.etherscan.io');
            break;
          case 4:
            setBlockExplorerUrl('https://rinkeby.etherscan.io');
            break;
          case 5:
            setBlockExplorerUrl('https://goerli.etherscan.io');
            break;
          case 42:
            setBlockExplorerUrl('https://kovan.etherscan.io');
            break;
          case 137:
            setBlockExplorerUrl('https://polygonscan.com');
            break;
          case 80001:
            setBlockExplorerUrl('https://mumbai.polygonscan.com');
            break;
          case 1337:
          case 5777:
            setBlockExplorerUrl('http://localhost:8545'); // Ganache
            break;
          default:
            setBlockExplorerUrl('https://etherscan.io');
        }

        // Fetch transactions
        loadTransactions();
      } catch (err) {
        console.error("Blockchain error:", err);
        setError(err.message);
        setIsLoading(false);

        // Fall back to mock data during development
        import('../data/transactionData').then(module => {
          const data = module.default;
          setTransactions(data);
          setFilteredTransactions(data);
          setIsLoading(false);
        });
      }
    };

    initBlockchain();
  }, []);

  // Load transactions with current filters
  const loadTransactions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await transactionService.fetchTransactions(filters);
      setTransactions(data);
      setFilteredTransactions(data);
    } catch (err) {
      console.error("Error loading transactions:", err);
      setError(`Failed to load transactions: ${err.message}`);

      // Fall back to mock data during development
      import('../data/transactionData').then(module => {
        const mockData = module.default;
        setTransactions(mockData);
        setFilteredTransactions(mockData);
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Apply filters and search
  useEffect(() => {
    let result = [...transactions];

    // Apply search term
    if (searchTerm) {
      result = result.filter(tx =>
        tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.user.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (filters.type !== 'all') {
      result = result.filter(tx => tx.type === filters.type);
    }

    // Apply status filter
    if (filters.status !== 'all') {
      result = result.filter(tx => tx.status === filters.status);
    }

    // Apply timeframe filter
    if (filters.timeframe !== 'all') {
      const now = new Date();
      let timeLimit;

      switch (filters.timeframe) {
        case '24h':
          timeLimit = new Date(now.setHours(now.getHours() - 24));
          break;
        case '7d':
          timeLimit = new Date(now.setDate(now.getDate() - 7));
          break;
        case '30d':
          timeLimit = new Date(now.setDate(now.getDate() - 30));
          break;
        default:
          timeLimit = null;
      }

      if (timeLimit) {
        result = result.filter(tx => new Date(tx.timestamp) >= timeLimit);
      }
    }

    setFilteredTransactions(result);
  }, [searchTerm, filters, transactions]);

  // Reset filters
  const resetFilters = () => {
    setFilters({
      type: 'all',
      status: 'all',
      timeframe: 'all'
    });
    setSearchTerm('');
  };

  // Get transaction type icon
  const getTransactionIcon = (type) => {
    switch (type) {
      case 'product':
        return <FaBoxOpen className="text-emerald-500" />;
      case 'shipment':
        return <FaTruckMoving className="text-blue-500" />;
      case 'certificate':
        return <FaFileContract className="text-purple-500" />;
      case 'verification':
        return <FaUserCheck className="text-amber-500" />;
      case 'sale':
        return <FaStore className="text-rose-500" />;
      default:
        return <FaExchangeAlt className="text-cta" />;
    }
  };

  // Handle transaction click
  const handleTransactionClick = async (tx) => {
    // Set selected transaction immediately with current data
    setSelectedTransaction(tx);

    // For real blockchain transactions, fetch more details but preserve description
    if (isConnected && tx.id) {
      try {
        const details = await transactionService.getTransactionDetails(tx.id);

        // Preserve the original description from the transaction list
        // This ensures we show the same description in both places
        setSelectedTransaction({
          ...details,
          description: tx.description || details.description
        });
      } catch (err) {
        console.error("Error fetching transaction details:", err);
        // Keep the existing transaction data if there's an error
      }
    }
  };

  // Close transaction details
  const closeTransactionDetails = () => {
    setSelectedTransaction(null);
  };

  // Render transaction status badge
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500 flex items-center"><FaCheck className="mr-1" /> Confirmed</span>;
      case 'pending':
        return <span className="px-2 py-1 rounded-full text-xs bg-amber-500/20 text-amber-500 flex items-center"><FaClock className="mr-1" /> Pending</span>;
      case 'failed':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-500 flex items-center"><FaTimes className="mr-1" /> Failed</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-500/20 text-gray-500 flex items-center">{status}</span>;
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Prepare CSV data for export
  const prepareExportData = () => {
    return filteredTransactions.map(tx => ({
      ID: tx.id,
      Type: tx.type,
      Description: tx.description,
      User: tx.user,
      UserRole: tx.userRole,
      Timestamp: new Date(tx.timestamp).toLocaleString(),
      Status: tx.status,
      BlockNumber: tx.blockNumber,
      GasUsed: tx.gasUsed,
      WalletAddress: tx.walletAddress
    }));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-text flex items-center">
            <FaExchangeAlt className="mr-3 text-cta" /> Blockchain Transactions
          </h1>
          <p className="text-text/60 text-sm mt-1">
            View and verify all transactions recorded on the blockchain
          </p>
        </div>

        {/* Connection status indicator */}
        <div className={`px-3 py-1.5 rounded-full text-sm flex items-center ${isConnected
          ? 'bg-green-500/20 text-green-400'
          : 'bg-red-500/20 text-red-400'
          }`}>
          <FaEthereum className="mr-1.5" />
          {isConnected ? 'Blockchain Connected' : 'Not Connected'}
        </div>

        <div className="flex items-center space-x-3">
          <CSVLink
            data={prepareExportData()}
            filename={"blockchain-transactions.csv"}
            className="bg-background/50 border border-cta/10 rounded-lg px-4 py-2 text-text/70 hover:text-text hover:border-cta/20 flex items-center transition-all"
          >
            <FaFileDownload className="mr-2 text-cta" /> Export
          </CSVLink>

          <div className="flex bg-background/50 border border-cta/10 rounded-lg overflow-hidden">
            <button
              onClick={() => setView('list')}
              className={`px-3 py-2 ${view === 'list' ? 'bg-cta/20 text-cta' : 'text-text/70 hover:text-text'} transition-all`}
            >
              <FaHistory />
            </button>
            <button
              onClick={() => setView('grid')}
              className={`px-3 py-2 ${view === 'grid' ? 'bg-cta/20 text-cta' : 'text-text/70 hover:text-text'} transition-all`}
            >
              <FaChartBar />
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-text/30" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 border border-cta/20 rounded-lg bg-background/50 text-text focus:ring-1 focus:ring-cta/50 focus:border-cta/50 placeholder-text/50"
              placeholder="Search transactions by ID, description or user..."
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className="w-full md:w-auto px-4 py-3 bg-cta/20 hover:bg-cta/30 text-cta rounded-lg flex items-center justify-center transition-colors"
            >
              <FaFilter className="mr-2" /> Filters
            </button>

            {isFilterMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-panel border border-cta/20 rounded-lg shadow-xl z-20">
                <div className="px-4 py-3 border-b border-cta/10">
                  <h3 className="font-medium text-cta">Filter Transactions</h3>
                </div>

                <div className="p-4 space-y-4">
                  {/* Transaction type filter */}
                  <div>
                    <label className="block text-sm font-medium text-text/70 mb-1">Transaction Type</label>
                    <select
                      value={filters.type}
                      onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                      className="w-full p-2 bg-background rounded border border-cta/20 text-text/80"
                    >
                      <option value="all">All Types</option>
                      <option value="product">Product Registration</option>
                      <option value="shipment">Shipment</option>
                      <option value="certificate">Certification</option>
                      <option value="verification">Verification</option>
                      <option value="sale">Sale</option>
                    </select>
                  </div>

                  {/* Status filter */}
                  <div>
                    <label className="block text-sm font-medium text-text/70 mb-1">Status</label>
                    <select
                      value={filters.status}
                      onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                      className="w-full p-2 bg-background rounded border border-cta/20 text-text/80"
                    >
                      <option value="all">All Statuses</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>

                  {/* Timeframe filter */}
                  <div>
                    <label className="block text-sm font-medium text-text/70 mb-1">Timeframe</label>
                    <select
                      value={filters.timeframe}
                      onChange={(e) => setFilters({ ...filters, timeframe: e.target.value })}
                      className="w-full p-2 bg-background rounded border border-cta/20 text-text/80"
                    >
                      <option value="all">All Time</option>
                      <option value="24h">Last 24 Hours</option>
                      <option value="7d">Last 7 Days</option>
                      <option value="30d">Last 30 Days</option>
                    </select>
                  </div>

                  {/* Filter actions */}
                  <div className="flex justify-between pt-2">
                    <button
                      onClick={resetFilters}
                      className="text-cta/80 hover:text-cta text-sm"
                    >
                      Reset All
                    </button>
                    <button
                      onClick={() => {
                        setIsFilterMenuOpen(false);
                        loadTransactions();
                      }}
                      className="bg-cta px-3 py-1 rounded text-sm text-white"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Active filter tags */}
        {(filters.type !== 'all' || filters.status !== 'all' || filters.timeframe !== 'all') && (
          <div className="flex flex-wrap gap-2 mt-3">
            {filters.type !== 'all' && (
              <div className="bg-cta/10 text-cta px-3 py-1 rounded-full text-xs flex items-center">
                Type: {filters.type}
                <button
                  className="ml-2 hover:text-cta/70"
                  onClick={() => {
                    const newFilters = { ...filters, type: 'all' };
                    setFilters(newFilters);
                    loadTransactions(newFilters);
                  }}
                >
                  ×
                </button>
              </div>
            )}
            {filters.status !== 'all' && (
              <div className="bg-cta/10 text-cta px-3 py-1 rounded-full text-xs flex items-center">
                Status: {filters.status}
                <button
                  className="ml-2 hover:text-cta/70"
                  onClick={() => {
                    const newFilters = { ...filters, status: 'all' };
                    setFilters(newFilters);
                    loadTransactions(newFilters);
                  }}
                >
                  ×
                </button>
              </div>
            )}
            {filters.timeframe !== 'all' && (
              <div className="bg-cta/10 text-cta px-3 py-1 rounded-full text-xs flex items-center">
                Time: {
                  filters.timeframe === '24h' ? 'Last 24 Hours' :
                    filters.timeframe === '7d' ? 'Last 7 Days' :
                      'Last 30 Days'
                }
                <button
                  className="ml-2 hover:text-cta/70"
                  onClick={() => {
                    const newFilters = { ...filters, timeframe: 'all' };
                    setFilters(newFilters);
                    loadTransactions(newFilters);
                  }}
                >
                  ×
                </button>
              </div>
            )}
            <button
              className="text-cta/70 hover:text-cta text-xs underline"
              onClick={() => {
                resetFilters();
                loadTransactions({ type: 'all', status: 'all', timeframe: 'all' });
              }}
            >
              Clear all
            </button>
          </div>
        )}

        {/* Results counter */}
        <div className="mt-4 text-sm text-text/60">
          {filteredTransactions.length} {filteredTransactions.length === 1 ? 'transaction' : 'transactions'} found
        </div>
      </div>

      {/* Transaction Display */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-12 relative"
      >
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="flex flex-col items-center">
              <FaSpinner className="animate-spin text-cta text-3xl mb-4" />
              <p className="text-text/70">Loading blockchain transactions...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-panel/30 border border-red-500/20 rounded-lg p-8 text-center">
            <FaTimes className="mx-auto text-4xl text-red-500 mb-4" />
            <h3 className="text-xl font-display font-medium text-text mb-2">Error Loading Transactions</h3>
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => loadTransactions(filters)}
              className="px-4 py-2 bg-cta/10 hover:bg-cta/20 text-cta rounded-md transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="bg-panel/30 border border-cta/10 rounded-lg p-8 text-center">
            <FaSearch className="mx-auto text-4xl text-text/30 mb-4" />
            <h3 className="text-xl font-display font-medium text-text mb-2">No transactions found</h3>
            <p className="text-text/60 mb-4">Try adjusting your search criteria or filters</p>
            <button
              onClick={() => {
                resetFilters();
                loadTransactions({ type: 'all', status: 'all', timeframe: 'all' });
              }}
              className="px-4 py-2 bg-cta/10 hover:bg-cta/20 text-cta rounded-md transition-colors"
            >
              Reset all filters
            </button>
          </div>
        ) : view === 'list' ? (
          <div className="bg-panel border border-cta/10 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-cta/10">
                <thead className="bg-panel/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text/70 uppercase tracking-wider">
                      Transaction
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text/70 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text/70 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text/70 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text/70 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-text/70 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-background/10 divide-y divide-cta/10">
                  {filteredTransactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className="hover:bg-cta/5 transition-colors cursor-pointer"
                      onClick={() => handleTransactionClick(tx)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-panel/50 flex items-center justify-center">
                            {getTransactionIcon(tx.type)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-text">
                              #{tx.id.substring(0, 8)}...
                            </div>
                            <div className="text-xs text-text/50 capitalize">
                              {tx.type === 'product' && tx.data && tx.data.name
                                ? tx.data.name
                                : tx.type}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-text/80">{tx.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-text/80 flex items-center">
                          <div className="w-6 h-6 rounded-full bg-panel/70 flex items-center justify-center text-xs mr-2">
                            {tx.user.charAt(0).toUpperCase()}
                          </div>
                          <div className="max-w-[120px] truncate">
                            {tx.user}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-text/80">{formatDate(tx.timestamp)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderStatusBadge(tx.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button
                          className="text-cta hover:text-cta/70 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTransactionClick(tx);
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          // Grid View
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTransactions.map((tx) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-panel border border-cta/10 rounded-lg p-5 hover:border-cta/30 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => handleTransactionClick(tx)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-panel/50 flex items-center justify-center mr-3">
                      {getTransactionIcon(tx.type)}
                    </div>
                    <div>
                      <div className="font-medium text-text capitalize">
                        {tx.type === 'product' && tx.data && tx.data.name
                          ? tx.data.name
                          : tx.type}
                      </div>
                      <div className="text-xs text-text/50">#{tx.id.substring(0, 8)}...</div>
                    </div>
                  </div>
                  <div>{renderStatusBadge(tx.status)}</div>
                </div>
                <p className="text-sm text-text/80 mb-4 line-clamp-2">{tx.description}</p>
                <div className="border-t border-cta/10 pt-4">
                  <div className="flex justify-between text-xs text-text/60">
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-panel/70 flex items-center justify-center mr-1 text-[10px]">
                        {tx.user.charAt(0).toUpperCase()}
                      </div>
                      <span className="max-w-[120px] truncate">{tx.user}</span>
                    </div>
                    <div>{formatDate(tx.timestamp)}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Transaction details modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-panel border border-cta/20 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b border-cta/10 px-6 py-4 flex justify-between items-center sticky top-0 bg-panel z-10">
              <h3 className="text-lg font-display font-bold text-cta flex items-center">
                {getTransactionIcon(selectedTransaction.type)}
                <span className="ml-2">Transaction Details</span>
              </h3>
              <button
                onClick={closeTransactionDetails}
                className="text-text/50 hover:text-text transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              {/* Transaction header */}
              <div className="mb-6 pb-6 border-b border-cta/10">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div>
                    <div className="text-sm text-text/60">Transaction ID</div>
                    <div className="text-text font-mono break-all">{selectedTransaction.id}</div>
                  </div>
                  <div>{renderStatusBadge(selectedTransaction.status)}</div>
                </div>
              </div>

              {/* Transaction details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-text/70 text-sm uppercase tracking-wider mb-4">Transaction Information</h4>

                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-text/60 mb-1">Type</div>
                      <div className="text-text capitalize">{selectedTransaction.type}</div>
                    </div>

                    {selectedTransaction.type === 'product' && selectedTransaction.data && selectedTransaction.data.name && (
                      <div>
                        <div className="text-xs text-text/60 mb-1">Product Name</div>
                        <div className="text-text font-medium">{selectedTransaction.data.name}</div>
                      </div>
                    )}

                    <div>
                      <div className="text-xs text-text/60 mb-1">Description</div>
                      <div className="text-text">{selectedTransaction.description}</div>
                    </div>

                    <div>
                      <div className="text-xs text-text/60 mb-1">Timestamp</div>
                      <div className="text-text">{formatDate(selectedTransaction.timestamp)}</div>
                    </div>

                    <div>
                      <div className="text-xs text-text/60 mb-1">Block Number</div>
                      <div className="text-text font-mono">{selectedTransaction.blockNumber}</div>
                    </div>

                    <div>
                      <div className="text-xs text-text/60 mb-1">Gas Used</div>
                      <div className="text-text">{selectedTransaction.gasUsed}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-text/70 text-sm uppercase tracking-wider mb-4">User Information</h4>

                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-text/60 mb-1">Initiated By</div>
                      <div className="text-text flex items-center">
                        <div className="w-6 h-6 rounded-full bg-panel/70 flex items-center justify-center text-xs mr-2">
                          {selectedTransaction.user.charAt(0).toUpperCase()}
                        </div>
                        <div className="truncate">
                          {selectedTransaction.user}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-text/60 mb-1">Role</div>
                      <div className="text-text">{selectedTransaction.userRole}</div>
                    </div>

                    <div>
                      <div className="text-xs text-text/60 mb-1">Wallet Address</div>
                      <div className="text-text font-mono break-all">{selectedTransaction.walletAddress}</div>
                    </div>
                  </div>

                  <h4 className="text-text/70 text-sm uppercase tracking-wider mt-6 mb-4">Security Information</h4>

                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-text/60 mb-1">Authentication Method</div>
                      <div className="text-text flex items-center">
                        <FaUserCheck className="text-cta mr-2" />
                        {selectedTransaction.authMethod}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-text/60 mb-1">Verified</div>
                      <div className="text-text">
                        {selectedTransaction.verified ? (
                          <span className="flex items-center text-green-500">
                            <FaCheck className="mr-1" /> Yes
                          </span>
                        ) : (
                          <span className="flex items-center text-red-500">
                            <FaTimes className="mr-1" /> No
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transaction data */}
              <div className="mt-6 pt-6 border-t border-cta/10">
                <h4 className="text-text/70 text-sm uppercase tracking-wider mb-4">Transaction Data</h4>

                <div className="bg-background/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <pre className="whitespace-pre-wrap break-all text-text/80">
                    {JSON.stringify(selectedTransaction.data, null, 2)}
                  </pre>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 pt-6 border-t border-cta/10 flex justify-between">
                <button
                  onClick={closeTransactionDetails}
                  className="px-4 py-2 border border-cta/20 text-text/70 hover:text-text hover:border-cta/40 rounded transition-colors"
                >
                  Close
                </button>

                <a
                  href={`${blockExplorerUrl}/tx/${selectedTransaction.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-cta/20 hover:bg-cta/30 text-cta rounded flex items-center transition-colors"
                >
                  View on Explorer <FaExchangeAlt className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;