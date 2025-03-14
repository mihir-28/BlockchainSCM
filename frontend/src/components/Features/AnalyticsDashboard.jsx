import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaChartBar, FaChartLine, FaShieldAlt, FaCheckCircle,
  FaExclamationTriangle, FaBox, FaExchangeAlt
} from 'react-icons/fa';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AnalyticsDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Sample data for charts
  const transactionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Product Transactions',
        data: [65, 78, 86, 82, 91, 103, 110],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Verification Requests',
        data: [28, 48, 52, 63, 72, 87, 96],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.4,
        fill: true,
      }
    ],
  };

  const statusData = {
    labels: ['Confirmed', 'Pending', 'Failed'],
    datasets: [
      {
        data: [68, 25, 7],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // KPI metrics
  const kpiMetrics = [
    {
      title: "Active Products",
      value: "543",
      change: "+12%",
      isPositive: true,
      icon: <FaBox />,
      color: "text-emerald-500"
    },
    {
      title: "Success Rate",
      value: "98.7%",
      change: "+0.5%",
      isPositive: true,
      icon: <FaCheckCircle />,
      color: "text-green-500"
    },
    {
      title: "Failed Transactions",
      value: "17",
      change: "+5%",
      isPositive: false,
      icon: <FaExclamationTriangle />,
      color: "text-red-500"
    },
  ];

  // Chart options
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 10,
          usePointStyle: true,
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(75, 85, 99, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    maintainAspectRatio: false,
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          usePointStyle: true,
        }
      }
    },
    maintainAspectRatio: false,
  };

  // Simulate loading data
  const handleRefreshData = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1200);
  };

  return (
    <section id="analytics" className="py-24 bg-panel relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" className="text-cta" />
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
              <FaChartLine className="text-cta text-2xl" />
            </div>

            <h2 className="text-3xl md:text-4xl font-display font-bold text-cta mb-6">
              Analytics & Insights
            </h2>

            <p className="text-text/80 max-w-2xl mx-auto">
              Make data-driven decisions with real-time analytics across your entire supply chain,
              from production to delivery, all secured and verified by blockchain technology.
            </p>
          </motion.div>

          {/* Dashboard Preview */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-cta/10 rounded-lg blur-lg"></div>
            <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-cta/10 rounded-lg blur-lg"></div>

            {/* Dashboard Frame */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-background/30 backdrop-blur-sm border border-cta/10 rounded-2xl p-5 md:p-8 shadow-xl relative overflow-hidden"
            >
              {/* Dashboard Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-xl font-display font-bold text-cta mb-1">
                    Supply Chain Analytics
                  </h3>
                  <p className="text-text/60 text-sm">
                    Real-time blockchain-verified insights
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRefreshData}
                    className={`bg-background/30 border border-cta/10 rounded-lg p-2 text-cta/70 hover:text-cta transition-colors
                               ${isLoading ? 'animate-pulse' : ''}`}
                    disabled={isLoading}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {kpiMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="bg-background/30 backdrop-blur-sm rounded-lg border border-cta/10 p-4 hover:border-cta/30 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-text/60 text-xs">{metric.title}</p>
                        <h4 className="text-xl font-display font-bold mt-1 text-text">{metric.value}</h4>
                      </div>
                      <div className={`p-2 rounded-md ${metric.color.replace('text-', 'bg-').replace('500', '100')}`}>
                        <span className={metric.color}>{metric.icon}</span>
                      </div>
                    </div>
                    <div className={`flex items-center mt-2 ${metric.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                      <span className="text-xs font-medium">{metric.change}</span>
                      <svg
                        className="h-3 w-3 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={metric.isPositive ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"}
                        />
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Line Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-background/30 backdrop-blur-sm rounded-lg border border-cta/10 p-4 md:col-span-2"
                >
                  <h4 className="font-medium text-text mb-4 text-sm">Transaction Activity</h4>
                  <div className="h-48 md:h-56">
                    <Line options={lineChartOptions} data={transactionData} />
                  </div>
                </motion.div>

                {/* Doughnut Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-background/30 backdrop-blur-sm rounded-lg border border-cta/10 p-4"
                >
                  <h4 className="font-medium text-text mb-4 text-sm">Transaction Status</h4>
                  <div className="h-48 md:h-56 flex items-center justify-center">
                    <Doughnut options={pieChartOptions} data={statusData} />
                  </div>
                </motion.div>
              </div>

              {/* Dashboard Features List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 pt-6 border-t border-cta/10"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  {[
                    {
                      title: "Real-time Monitoring",
                      description: "Monitor supply chain events as they happen with live data feeds",
                      icon: <FaChartLine className="text-cta" />
                    },
                    {
                      title: "Compliance Tracking",
                      description: "Ensure regulatory compliance with automated verification tracking",
                      icon: <FaShieldAlt className="text-cta" />
                    },
                    {
                      title: "Custom Reports",
                      description: "Generate detailed reports with blockchain-verified data",
                      icon: <FaChartBar className="text-cta" />
                    }
                  ].map((feature, index) => (
                    <div key={index} className="flex flex-col items-center p-3">
                      <div className="bg-cta/10 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                        {feature.icon}
                      </div>
                      <h4 className="font-medium text-text text-sm mb-1">{feature.title}</h4>
                      <p className="text-text/60 text-xs">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Feature Overview */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-display font-bold text-cta mb-4">
                Data-Driven Decision Making
              </h3>
              <p className="text-text/80">
                Make informed decisions with comprehensive analytics that provide visibility across your
                entire supply chain. Track KPIs, monitor performance, and identify optimization opportunities
                with our intuitive dashboard.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "Supply chain visibility from source to consumer",
                  "Customizable KPIs and performance metrics",
                  "Predictive analytics for inventory optimization",
                  "Audit-ready compliance reporting"
                ].map((item, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-cta/20 flex items-center justify-center mr-3">
                      <div className="w-2 h-2 rounded-full bg-cta"></div>
                    </div>
                    <p className="text-text/70 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-display font-bold text-cta mb-4">
                Blockchain-Verified Insights
              </h3>
              <p className="text-text/80">
                Every data point in our analytics platform is secured and verified by blockchain technology,
                ensuring complete data integrity. Trust your insights with tamper-proof analytics that provide
                a single source of truth.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "Cryptographically secured data points",
                  "Immutable audit trail for all supply chain events",
                  "Real-time verification of data authenticity",
                  "Transparent sharing with supply chain partners"
                ].map((item, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-cta/20 flex items-center justify-center mr-3">
                      <div className="w-2 h-2 rounded-full bg-cta"></div>
                    </div>
                    <p className="text-text/70 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center"
          >
            <a
              href="/demo"
              className="inline-flex items-center px-6 py-3 bg-cta/20 hover:bg-cta/30 text-cta border border-cta/30 
                       rounded-lg transition-all duration-300 font-medium"
            >
              <FaChartLine className="mr-2" />
              Schedule Analytics Demo
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsDashboard;