import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaExchangeAlt,
  FaSearch,
  FaFilter,
  FaSpinner,
  FaCheck,
  FaTimes,
  FaArrowRight,
  FaClock,
  FaUserShield,
  FaFileContract,
  FaBoxOpen,
  FaTruckMoving,
  FaStore,
  FaUserCheck
} from 'react-icons/fa';

const TransactionLogs = () => {
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

  // Load sample transaction data
  useEffect(() => {
    // In a real application, this would be an API call
    import('../../data/transactionData').then(module => {
      const data = module.default;
      setTransactions(data);
      setFilteredTransactions(data);
      setIsLoading(false);
    });
  }, []);

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
  const handleTransactionClick = (tx) => {
    setSelectedTransaction(tx);
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

  return (
    <section id="transaction-logs" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg width="100%" height="100%" viewBox="0 0 800 800">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cta" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Data flow lines */}
            <g className="text-cta/30" strokeWidth="1">
              <path d="M100,200 Q400,50 700,300" stroke="currentColor" fill="none" />
              <path d="M100,400 Q400,250 700,500" stroke="currentColor" fill="none" />
              <path d="M100,600 Q400,450 700,700" stroke="currentColor" fill="none" />

              <circle cx="100" cy="200" r="5" fill="currentColor" />
              <circle cx="100" cy="400" r="5" fill="currentColor" />
              <circle cx="100" cy="600" r="5" fill="currentColor" />

              <circle cx="700" cy="300" r="5" fill="currentColor" />
              <circle cx="700" cy="500" r="5" fill="currentColor" />
              <circle cx="700" cy="700" r="5" fill="currentColor" />
            </g>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cta/10 mb-6">
              <FaExchangeAlt className="text-cta text-2xl" />
            </div>

            <h2 className="text-3xl md:text-4xl font-display font-bold text-cta mb-6">
              Immutable Transaction Logs
            </h2>

            <p className="text-text/80 max-w-2xl mx-auto">
              Every action in the supply chain is recorded on the blockchain, creating an
              immutable audit trail that ensures accountability and transparency across
              all participants.
            </p>
          </motion.div>

          {/* Search and filter controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-text/30" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-cta/20 rounded-lg bg-panel/30 text-text focus:ring-1 focus:ring-cta/50 focus:border-cta/50 placeholder-text/50"
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
                          onClick={() => setIsFilterMenuOpen(false)}
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
                      onClick={() => setFilters({ ...filters, type: 'all' })}
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
                      onClick={() => setFilters({ ...filters, status: 'all' })}
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
                      onClick={() => setFilters({ ...filters, timeframe: 'all' })}
                    >
                      ×
                    </button>
                  </div>
                )}
                <button
                  className="text-cta/70 hover:text-cta text-xs underline"
                  onClick={resetFilters}
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Results counter */}
            <div className="mt-4 text-sm text-text/60">
              {filteredTransactions.length} {filteredTransactions.length === 1 ? 'transaction' : 'transactions'} found
            </div>
          </motion.div>

          {/* Transaction list */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 relative"
          >
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="flex flex-col items-center">
                  <FaSpinner className="animate-spin text-cta text-3xl mb-4" />
                  <p className="text-text/70">Loading transactions...</p>
                </div>
              </div>
            ) : filteredTransactions.length === 0 ? (
              <div className="bg-panel/30 border border-cta/10 rounded-lg p-8 text-center">
                <FaSearch className="mx-auto text-4xl text-text/30 mb-4" />
                <h3 className="text-xl font-display font-medium text-text mb-2">No transactions found</h3>
                <p className="text-text/60 mb-4">Try adjusting your search criteria or filters</p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-cta/10 hover:bg-cta/20 text-cta rounded-md transition-colors"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="bg-panel/30 border border-cta/10 rounded-lg overflow-hidden">
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
                                  {tx.type}
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
                              {tx.user}
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
                            {selectedTransaction.user}
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
                            <FaUserShield className="text-cta mr-2" />
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
                      href={`https://etherscan.io/tx/${selectedTransaction.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-cta/20 hover:bg-cta/30 text-cta rounded flex items-center transition-colors"
                    >
                      View on Explorer <FaArrowRight className="ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Key features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Immutable Records",
                description: "Every transaction is permanently recorded on the blockchain and cannot be altered, ensuring data integrity.",
                icon: <svg className="w-8 h-8 text-cta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              },
              {
                title: "Complete Transparency",
                description: "All participants can access and verify the transaction history, creating trust across the supply chain.",
                icon: <svg className="w-8 h-8 text-cta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              },
              {
                title: "Real-time Updates",
                description: "Immediate access to transaction data as it's recorded, allowing for quick responses to supply chain events.",
                icon: <svg className="w-8 h-8 text-cta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-background/30 backdrop-blur-sm border border-cta/10 rounded-lg p-6
                                          hover:border-cta/30 hover:shadow-lg hover:shadow-cta/5 transition-all duration-300"
              >
                <div className="bg-cta/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-display font-bold text-cta mb-3">{feature.title}</h3>

                <p className="text-text/80 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 text-center"
          >
            <a
              href="/explorer"
              className="inline-flex items-center px-6 py-3 bg-cta/20 hover:bg-cta/30 text-cta border border-cta/30 
                                        rounded-lg transition-all duration-300 font-medium"
            >
              <FaExchangeAlt className="mr-2" />
              Explore All Transactions
            </a>
          </motion.div>

          {/* Technical details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20 bg-panel/30 border border-cta/10 rounded-lg p-6 md:p-8"
          >
            <h3 className="text-xl font-display font-bold text-cta mb-6">Technical Implementation</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-display font-medium text-cta/80 mb-4">
                  Blockchain Storage Structure
                </h4>
                <div className="space-y-3">
                  <p className="text-text/70 text-sm">
                    Each transaction in the supply chain is stored as an immutable record on the blockchain,
                    with cryptographic linking between related events to maintain data integrity.
                  </p>
                  <div className="bg-background/50 rounded-md p-4 font-mono text-sm text-text/70 overflow-x-auto">
                    <pre>{`struct Transaction {
                  bytes32 id;
                  address initiator;
                  uint256 timestamp;
                  bytes32 dataHash;
                  TransactionType txType;
                  bytes signature;
                }`}</pre>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-display font-medium text-cta/80 mb-4">
                  Verification & Consensus
                </h4>
                <ul className="space-y-2 text-text/70 text-sm">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-cta mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Transactions require signatures from authorized participants</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-cta mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Multi-sig requirements for critical supply chain operations</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-cta mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Optimized proof-of-authority consensus for supply chain networks</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-cta mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Merkle-tree based validation for grouped transactions</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TransactionLogs;