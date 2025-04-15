import React from 'react';
import { FaBox, FaExchangeAlt, FaCheckCircle, FaExclamationTriangle, 
  FaPlus, FaHistory, FaShieldAlt } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import MetricCard from './MetricCard';
import LineChart from './LineChart';
import PieChart from './PieChart';
import WelcomeCard from './WelcomeCard';
import QuickActionCard from './QuickActionCard';
import TransactionTable from './TransactionTable';

// Sample data for charts
const transactionData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  values: [5, 12, 8, 14, 10, 16, 12]
};

const distributionData = {
  labels: ['Raw Materials', 'Manufacturing', 'Distribution', 'Retail', 'Consumer'],
  values: [15, 30, 25, 20, 10]
};

const OverviewPage = ({ kpiData, recentTransactions }) => {
  const { currentUser } = useOutletContext();

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
          <button className="text-cta text-sm hover:text-cta/80">
            See All
          </button>
        </div>
        <TransactionTable transactions={recentTransactions} />
      </div>
    </div>
  );
};

export default OverviewPage;