import React, { useState, useEffect } from 'react';
import { FaBox, FaExchangeAlt, FaCheckCircle, FaExclamationTriangle, 
  FaPlus, FaHistory, FaShieldAlt, FaSpinner } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import MetricCard from './MetricCard';
import LineChart from './LineChart';
import PieChart from './PieChart';
import WelcomeCard from './WelcomeCard';
import QuickActionCard from './QuickActionCard';
import TransactionTable from './TransactionTable';
import transactionService from '../../services/transactionService';
import web3Service from '../../services/web3Service';

// Sample data for charts
const transactionData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  values: [5, 12, 8, 14, 10, 16, 12]
};

const distributionData = {
  labels: ['Raw Materials', 'Manufacturing', 'Distribution', 'Retail', 'Consumer'],
  values: [15, 30, 25, 20, 10]
};

const OverviewPage = ({ kpiData }) => {
  const { currentUser } = useOutletContext();
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initBlockchain = async () => {
      try {
        // Initialize web3 if not already initialized
        const connected = await web3Service.initWeb3();
        
        if (!connected) {
          throw new Error("Failed to connect to blockchain. Please check your wallet connection.");
        }
        
        // Fetch recent transactions
        loadRecentTransactions();
      } catch (err) {
        console.error("Blockchain initialization error:", err);
        setError(err.message);
        setIsLoading(false);
        
        // Fall back to mock data during development
        import('../../data/transactionData').then(module => {
          const mockData = module.default;
          setRecentTransactions(mockData.slice(0, 5));
          setIsLoading(false);
        }).catch(error => {
          console.error("Error loading mock data:", error);
        });
      }
    };
    
    initBlockchain();
  }, []);
  
  const loadRecentTransactions = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const transactions = await transactionService.fetchRecentTransactions(5);
      setRecentTransactions(transactions);
    } catch (err) {
      console.error("Error loading transactions:", err);
      setError(`Failed to load transactions: ${err.message}`);
      
      // Fall back to mock data during development
      import('../../data/transactionData').then(module => {
        const mockData = module.default;
        setRecentTransactions(mockData.slice(0, 5));
      }).catch(error => {
        console.error("Error loading mock data:", error);
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <WelcomeCard user={currentUser} />
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((item, index) => (
          <MetricCard
            key={index}
            title={item.title}
            value={item.value}
            change={item.change}
            isPositive={item.isPositive}
            icon={item.icon || <FaBox className="text-xl" />}
          />
        ))}
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickActionCard
          title="Register New Product"
          description="Add a new product to the blockchain supply chain"
          icon={<FaPlus className="text-cta text-xl" />}
          linkTo="/dashboard/products/new"
          linkText="Add Product"
        />
        
        <QuickActionCard
          title="View Transaction History"
          description="See all your blockchain transactions"
          icon={<FaHistory className="text-cta text-xl" />}
          linkTo="/dashboard/transactions"
          linkText="View Transactions"
          bgClass="bg-cta/10"
        />
        
        <QuickActionCard
          title="Verify Products"
          description="Scan and verify product authenticity"
          icon={<FaShieldAlt className="text-cta text-xl" />}
          linkTo="/dashboard/verify"
          linkText="Verify Products"
          bgClass="bg-cta/15"
        />
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-5 shadow-sm">
          <h3 className="text-text font-medium mb-4">Transaction Activity</h3>
          <LineChart data={transactionData} />
        </div>
        
        <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-5 shadow-sm">
          <h3 className="text-text font-medium mb-4">Supply Chain Distribution</h3>
          <PieChart data={distributionData} />
        </div>
      </div>
      
     
      {/* Recent Transactions */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-text font-medium">Recent Transactions</h3>
          <button 
            onClick={() => window.location.href = '/dashboard/transactions'} 
            className="text-cta text-sm hover:text-cta/80"
          >
            See All
          </button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-8">
            <FaSpinner className="animate-spin text-cta mr-2" />
            <span className="text-text/70">Loading transactions...</span>
          </div>
        ) : error ? (
          <div className="bg-panel/40 backdrop-blur-sm border border-red-500/20 rounded-xl p-4 text-center">
            <FaExclamationTriangle className="text-red-500 mx-auto mb-2" />
            <p className="text-red-500 text-sm">{error}</p>
            <button 
              onClick={loadRecentTransactions}
              className="mt-2 px-3 py-1 bg-cta/10 text-cta text-sm rounded hover:bg-cta/20"
            >
              Retry
            </button>
          </div>
        ) : (
          <TransactionTable transactions={recentTransactions} />
        )}
      </div>
    </div>
  );
};

export default OverviewPage;