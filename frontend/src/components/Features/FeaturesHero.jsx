import React from 'react';
import { motion } from 'framer-motion';
import { FaDatabase, FaShieldAlt, FaQrcode, FaFileContract, FaChartLine, FaCubes } from 'react-icons/fa';
import NetworkAnimation from '../Common/NetworkAnimation';

const FeaturesHero = () => {
  // Feature highlights to be displayed in the animated grid
  const featureHighlights = [
    {
      icon: <FaCubes />,
      title: "Product Tracking",
      description: "End-to-end visibility across the entire supply chain"
    },
    {
      icon: <FaFileContract />,
      title: "Smart Contracts",
      description: "Automated transactions and agreements with no intermediaries"
    },
    {
      icon: <FaShieldAlt />,
      title: "Access Control",
      description: "Role-based permissions for secure data management"
    },
    {
      icon: <FaDatabase />,
      title: "Transaction Logs",
      description: "Permanent, tamper-proof record of all activities"
    },
    {
      icon: <FaQrcode />,
      title: "QR Integration",
      description: "Instant product verification and information access"
    },
    {
      icon: <FaChartLine />,
      title: "Analytics Dashboard",
      description: "Real-time insights and data visualization"
    }
  ];

  return (
    <div className="relative min-h-[75vh] flex items-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <NetworkAnimation opacity={0.15} zIndex={0} />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-cta/5 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-cta/10 rounded-full filter blur-3xl"></div>

        {/* Tech-inspired grid lines */}
        <div className="absolute inset-0 opacity-15">
          <div className="h-px bg-cta/20 absolute top-1/3 left-0 right-0"></div>
          <div className="h-px bg-cta/20 absolute top-2/3 left-0 right-0"></div>
          <div className="w-px bg-cta/20 absolute left-1/3 top-0 bottom-0"></div>
          <div className="w-px bg-cta/20 absolute left-2/3 top-0 bottom-0"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          {/* Hero content */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-cta/20 text-cta px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            >
              Blockchain-Powered Features
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-cta mb-6 leading-tight"
            >
              Transform Your Supply Chain
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-text/80 max-w-3xl mx-auto mb-8"
            >
              Our comprehensive suite of blockchain-powered features delivers unprecedented
              transparency, security, and efficiency to your entire supply chain ecosystem.
            </motion.p>
          </div>

          {/* Feature highlights grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featureHighlights.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="bg-panel/30 backdrop-blur-sm border border-cta/10 rounded-lg p-6
                          hover:border-cta/30 hover:bg-panel/40 transition-all duration-300 group"
              >
                <div className="flex items-start">
                  <div className="bg-cta/10 rounded-lg p-3 text-cta group-hover:bg-cta/20 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-display font-bold text-cta text-lg mb-1">{feature.title}</h3>
                    <p className="text-sm text-text/80">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Animated scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 flex justify-center"
          >
            <div className="animate-bounce bg-cta/20 p-2 w-10 h-10 ring-1 ring-cta/30 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-cta" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </motion.div>

          {/* Feature section navigator */}
          <div className="mt-16 pt-8 border-t border-cta/10">
            <p className="text-center text-text/60 mb-6">Explore Our Features</p>

            <div className="flex flex-wrap justify-center gap-4">
              {featureHighlights.map((feature, index) => (
                <a
                  key={index}
                  href={`#${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-4 py-2 bg-panel/30 hover:bg-panel/50 text-sm text-text/80 hover:text-cta rounded-full border border-cta/10 hover:border-cta/30 transition-all duration-300 flex items-center"
                >
                  <span className="mr-2 text-xs">{feature.icon}</span>
                  {feature.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative tech element */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-r from-cta/0 via-cta/20 to-cta/0 opacity-30"></div>
    </div>
  );
};

export default FeaturesHero;