import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import {
  FaChartLine,
  FaChartBar,
  FaChartPie,
  FaCalendarAlt,
  FaDownload,
  FaFilter,
  FaSyncAlt,
  FaBox,
  FaCheckCircle,
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown,
  FaExchangeAlt,
  FaTruck,
  FaUserShield,
  FaFileInvoiceDollar
} from 'react-icons/fa';

// Import chart components
import LineChart from '../components/Dashboard/LineChart';
import PieChart from '../components/Dashboard/PieChart';
import KPICard from '../components/Dashboard/KPICard';

const AnalyticsPage = () => {
  // State
  const [timeframe, setTimeframe] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  
  // Get context from outlet (DashboardLayout)
  const { currentUser } = useOutletContext();
  
  // Chart data state
  const [transactionActivity, setTransactionActivity] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [5, 12, 8, 14, 10, 16, 12]
  });
  
  const [statusDistribution, setStatusDistribution] = useState({
    labels: ['Completed', 'In Transit', 'Pending', 'Failed'],
    values: [65, 20, 12, 3]
  });
  
  const [productDistribution, setProductDistribution] = useState({
    labels: ['Raw Materials', 'Manufacturing', 'Distribution', 'Retail', 'Consumer'],
    values: [15, 30, 25, 20, 10]
  });
  
  const [complianceMetrics, setComplianceMetrics] = useState({
    labels: ['Compliant', 'Minor Issues', 'Major Issues', 'Critical'],
    values: [85, 10, 4, 1]
  });
  
  // Simulated metrics
  const metrics = [
    {
      id: 'active_products',
      title: 'Active Products',
      value: '543',
      change: '+12%',
      isPositive: true,
      icon: <FaBox className="text-xl" />
    },
    {
      id: 'transactions',
      title: 'Total Transactions',
      value: '1,287',
      change: '+8%',
      isPositive: true,
      icon: <FaExchangeAlt className="text-xl" />
    },
    {
      id: 'success_rate',
      title: 'Success Rate',
      value: '98.7%',
      change: '+0.5%',
      isPositive: true,
      icon: <FaCheckCircle className="text-xl" />
    },
    {
      id: 'failures',
      title: 'Failed Transactions',
      value: '17',
      change: '+5%',
      isPositive: false,
      icon: <FaExclamationTriangle className="text-xl" />
    }
  ];
  
  // Supply chain health metrics
  const healthMetrics = [
    {
      title: 'Avg. Delivery Time',
      value: '3.2 days',
      change: '-0.5 days',
      isPositive: true
    },
    {
      title: 'Verification Rate',
      value: '99.2%',
      change: '+1.2%',
      isPositive: true
    },
    {
      title: 'Partner Compliance',
      value: '94%',
      change: '+2%',
      isPositive: true
    },
    {
      title: 'Cost Efficiency',
      value: '87%',
      change: '-1%',
      isPositive: false
    }
  ];
  
  // Effect to simulate data loading when timeframe changes
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        // Generate random data based on timeframe
        let labels = [];
        let values = [];
        
        switch (timeframe) {
          case '24h':
            labels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'];
            values = Array(7).fill().map(() => Math.floor(Math.random() * 20) + 5);
            break;
          case '7d':
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            values = Array(7).fill().map(() => Math.floor(Math.random() * 15) + 5);
            break;
          case '30d':
            labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            values = Array(4).fill().map(() => Math.floor(Math.random() * 50) + 20);
            break;
          default:
            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
            values = Array(6).fill().map(() => Math.floor(Math.random() * 100) + 50);
        }
        
        setTransactionActivity({
          labels,
          values
        });
        
        // Update other metrics with random variations
        setStatusDistribution({
          labels: ['Completed', 'In Transit', 'Pending', 'Failed'],
          values: [
            65 + Math.floor(Math.random() * 10),
            20 + Math.floor(Math.random() * 5),
            12 + Math.floor(Math.random() * 5),
            3 + Math.floor(Math.random() * 2)
          ]
        });
        
        setIsLoading(false);
        setInitialDataLoaded(true);  // Mark initial data as loaded
      }, 800);
    };
    
    loadData();
  }, [timeframe]);
  
  const handleTimeframeChange = (e) => {
    setTimeframe(e.target.value);
  };
  
  const handleRefresh = () => {
    // Trigger data reload with current timeframe
    const currentTimeframe = timeframe;
    setTimeframe('');
    setTimeout(() => setTimeframe(currentTimeframe), 50);
  };
  
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-cta">Supply Chain Analytics</h1>
          <p className="text-text/60 text-sm">Real-time blockchain-verified insights across your supply chain</p>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <select
              value={timeframe}
              onChange={handleTimeframeChange}
              className="appearance-none bg-background border border-cta/20 rounded-lg text-sm px-4 py-2 pr-8 text-text focus:outline-none focus:ring-1 focus:ring-cta/30"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="all">All Time</option>
            </select>
            <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cta/60 pointer-events-none text-xs" />
          </div>
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 bg-background border border-cta/20 rounded-lg text-cta/80 hover:text-cta hover:border-cta/40 transition-colors"
            title="Filter data"
          >
            <FaFilter />
          </button>
          
          <button 
            onClick={handleRefresh}
            className={`p-2 bg-background border border-cta/20 rounded-lg text-cta/80 hover:text-cta hover:border-cta/40 transition-colors ${isLoading ? 'animate-pulse' : ''}`}
            title="Refresh data"
            disabled={isLoading}
          >
            <FaSyncAlt className={isLoading ? 'animate-spin' : ''} />
          </button>
          
          <button 
            className="p-2 bg-background border border-cta/20 rounded-lg text-cta/80 hover:text-cta hover:border-cta/40 transition-colors"
            title="Export data"
          >
            <FaDownload />
          </button>
        </div>
      </div>
      
      {/* Filters panel - conditionally rendered */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-panel/30 backdrop-blur-sm border border-cta/10 rounded-lg p-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-text/60 text-sm mb-1">Product Category</label>
              <select className="w-full p-2 bg-background rounded border border-cta/20 text-text/80">
                <option value="all">All Categories</option>
                <option value="raw">Raw Materials</option>
                <option value="manf">Manufacturing</option>
                <option value="dist">Distribution</option>
                <option value="retail">Retail</option>
              </select>
            </div>
            
            <div>
              <label className="block text-text/60 text-sm mb-1">Transaction Status</label>
              <select className="w-full p-2 bg-background rounded border border-cta/20 text-text/80">
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            
            <div>
              <label className="block text-text/60 text-sm mb-1">Partner</label>
              <select className="w-full p-2 bg-background rounded border border-cta/20 text-text/80">
                <option value="all">All Partners</option>
                <option value="supplier">Suppliers</option>
                <option value="manf">Manufacturers</option>
                <option value="dist">Distributors</option>
                <option value="retail">Retailers</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <button className="px-3 py-1 bg-cta text-background text-sm rounded hover:bg-cta/90">
              Apply Filters
            </button>
          </div>
        </motion.div>
      )}
      
      {/* KPI metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <KPICard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            isPositive={metric.isPositive}
            icon={metric.icon}
          />
        ))}
      </div>
      
      {/* Conditionally render charts only when data is loaded */}
      {initialDataLoaded ? (
        <>
          {/* Charts - first row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Transaction activity chart - takes up 2 columns */}
            <div className="lg:col-span-2 bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-text font-medium flex items-center">
                  <FaChartLine className="text-cta mr-2" /> Transaction Activity
                </h3>
                <div className="text-text/60 text-xs bg-cta/10 px-2 py-1 rounded-full">
                  {timeframe === '24h' ? 'Last 24 Hours' : 
                   timeframe === '7d' ? 'Last 7 Days' : 
                   timeframe === '30d' ? 'Last 30 Days' : 'All Time'}
                </div>
              </div>
              <LineChart data={transactionActivity} height="300px" />
            </div>
            
            {/* Status distribution - takes up 1 column */}
            <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-text font-medium flex items-center">
                  <FaChartPie className="text-cta mr-2" /> Transaction Status
                </h3>
              </div>
              <PieChart data={statusDistribution} height="300px" />
            </div>
          </div>
          
          {/* Supply Chain Health Section */}
          <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-5 shadow-sm">
            <h3 className="text-text font-medium mb-6 flex items-center">
              <FaUserShield className="text-cta mr-2" /> Supply Chain Health Metrics
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {healthMetrics.map((metric, index) => (
                <div 
                  key={index}
                  className="bg-background/50 rounded-lg border border-cta/10 p-4 hover:border-cta/30 transition-all"
                >
                  <p className="text-text/60 text-sm">{metric.title}</p>
                  <h4 className="text-xl font-display font-bold mt-1 text-text">{metric.value}</h4>
                  <div className={`flex items-center mt-2 ${metric.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    <span className="text-xs font-medium">{metric.change}</span>
                    {metric.isPositive ? 
                      <FaArrowUp className="ml-1 text-xs" /> : 
                      <FaArrowDown className="ml-1 text-xs" />
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Charts - second row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Distribution */}
            <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-text font-medium flex items-center">
                  <FaBox className="text-cta mr-2" /> Product Distribution
                </h3>
              </div>
              <PieChart data={productDistribution} height="300px" />
            </div>
            
            {/* Compliance Distribution */}
            <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-text font-medium flex items-center">
                  <FaFileInvoiceDollar className="text-cta mr-2" /> Compliance Metrics
                </h3>
              </div>
              <PieChart data={complianceMetrics} height="300px" />
            </div>
          </div>
          
          {/* Transportation & Logistics Section */}
          <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-text font-medium flex items-center">
                <FaTruck className="text-cta mr-2" /> Transportation & Logistics
              </h3>
              <button className="text-cta text-xs">View Details</button>
            </div>
            
            {/* Transportation metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-background/50 rounded-lg border border-cta/10 p-4 flex items-center">
                <div className="w-12 h-12 rounded-lg bg-cta/10 flex items-center justify-center mr-4">
                  <FaTruck className="text-cta" />
                </div>
                <div>
                  <p className="text-text/60 text-sm">Avg. Transit Time</p>
                  <h4 className="text-xl font-display font-bold text-text">32h 15m</h4>
                </div>
              </div>
              
              <div className="bg-background/50 rounded-lg border border-cta/10 p-4 flex items-center">
                <div className="w-12 h-12 rounded-lg bg-cta/10 flex items-center justify-center mr-4">
                  <FaExchangeAlt className="text-cta" />
                </div>
                <div>
                  <p className="text-text/60 text-sm">Handoffs</p>
                  <h4 className="text-xl font-display font-bold text-text">5.3 avg</h4>
                </div>
              </div>
              
              <div className="bg-background/50 rounded-lg border border-cta/10 p-4 flex items-center">
                <div className="w-12 h-12 rounded-lg bg-cta/10 flex items-center justify-center mr-4">
                  <FaCheckCircle className="text-cta" />
                </div>
                <div>
                  <p className="text-text/60 text-sm">On-time Delivery</p>
                  <h4 className="text-xl font-display font-bold text-text">94.8%</h4>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center py-20">
          <div className="flex flex-col items-center">
            <FaSyncAlt className="animate-spin text-cta text-2xl mb-3" />
            <p className="text-text">Loading analytics data...</p>
          </div>
        </div>
      )}
      
      {/* Info footer */}
      <div className="text-center text-text/60 text-xs pt-4">
        <p>All data is verified and secured by blockchain technology.<br/>Last updated {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default AnalyticsPage;