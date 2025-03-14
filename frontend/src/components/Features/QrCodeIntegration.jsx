import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQrcode, FaMobileAlt, FaShieldAlt, FaExchangeAlt, FaHistory, FaCheck, FaTimes, FaBox, FaShip, FaWarehouse, FaStore, FaTruck } from 'react-icons/fa';
import userJourneysData from '../../data/qrCodeUserJourneys';

const QrCodeIntegration = () => {
  const [activeTab, setActiveTab] = useState('consumer');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [showJourney, setShowJourney] = useState(false);

  // Animation triggers for demo
  const handleScanStart = () => {
    setIsScanning(true);
    setScanComplete(false);

    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 2500);
  };

  // Reset demo
  const resetDemo = () => {
    setScanComplete(false);
    setShowJourney(false);
  };

  // Show product journey
  const handleViewJourney = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowJourney(true);
  };

  // Step animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  // Using imported data instead of defining it in the component
  const userJourneys = userJourneysData;

  // Journey data based on active tab
  const getJourneyData = () => {
    if (activeTab === 'consumer') {
      return [
        {
          date: "Feb 15, 2025",
          title: "Harvested",
          description: "Coffee beans harvested at La Esperanza Farm",
          icon: <FaBox />
        },
        {
          date: "Feb 22, 2025",
          title: "Processing",
          description: "Quality control and organic certification",
          icon: <FaWarehouse />
        },
        {
          date: "Mar 5, 2025",
          title: "Shipping",
          description: "Shipped from Colombia to distribution center",
          icon: <FaShip />
        },
        {
          date: "Mar 12, 2025",
          title: "Distribution",
          description: "Arrived at regional distribution center",
          icon: <FaTruck />
        },
        {
          date: "Mar 18, 2025",
          title: "Retail",
          description: "Delivered to Pacific Coffee Co. retail location",
          icon: <FaStore />
        }
      ];
    } else if (activeTab === 'business') {
      return [
        {
          date: "Mar 14, 2025 - 08:15",
          title: "Transfer Initiated",
          description: "Batch prepared for transfer at Miami Distribution Center",
          icon: <FaBox />
        },
        {
          date: "Mar 14, 2025 - 09:30",
          title: "Quality Check",
          description: "Pre-shipping inspection completed",
          icon: <FaCheck />
        },
        {
          date: "Mar 14, 2025 - 10:45",
          title: "In Transit",
          description: "Shipment departed via Premium Logistics",
          icon: <FaTruck />
        },
        {
          date: "Mar 14, 2025 - 17:30",
          title: "Arriving",
          description: "Shipment arrived at Northeast Regional Warehouse",
          icon: <FaWarehouse />
        }
      ];
    } else {
      return [
        {
          date: "Mar 8, 2025",
          title: "Raw Materials",
          description: "Green coffee beans registered in blockchain",
          icon: <FaBox />
        },
        {
          date: "Mar 9, 2025",
          title: "Quality Testing",
          description: "Bean quality and moisture testing completed",
          icon: <FaCheck />
        },
        {
          date: "Mar 10, 2025",
          title: "Production",
          description: "Roasting and packaging completed",
          icon: <FaWarehouse />
        },
        {
          date: "Mar 10, 2025",
          title: "Certification",
          description: "Organic certification verified and linked",
          icon: <FaShieldAlt />
        }
      ];
    }
  };

  return (
    <section id="qr-integration" className="py-24 bg-panel relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          {/* QR code pattern background */}
          <svg viewBox="0 0 100 100" width="100%" height="100%" className="absolute top-0 left-0">
            <defs>
              <pattern id="qr-grid" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
                <rect width="2" height="2" fill="currentColor" className="text-cta" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#qr-grid)" />
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
              <FaQrcode className="text-cta text-2xl" />
            </div>

            <h2 className="text-3xl md:text-4xl font-display font-bold text-cta mb-6">
              QR Code Integration
            </h2>

            <p className="text-text/80 max-w-2xl mx-auto">
              Seamlessly connect physical products to their digital identity on the blockchain
              using QR codes, enabling instant verification and complete supply chain transparency.
            </p>
          </motion.div>

          {/* Tabs for different use cases */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {Object.keys(userJourneys).map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); resetDemo(); }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                            ${activeTab === tab
                      ? 'bg-cta/20 text-cta border border-cta/40'
                      : 'bg-background/40 text-text/60 border border-cta/10 hover:bg-background/60'
                    }`}
                >
                  {userJourneys[tab].title}
                </button>
              ))}
            </div>

            {/* Active tab content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-background/30 backdrop-blur-sm border border-cta/10 rounded-xl p-6 md:p-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left side: Phone mockup with QR demo */}
                <div className="flex flex-col items-center justify-center">
                  <div className="relative max-w-xs mx-auto">
                    {/* Phone frame */}
                    <div className="relative z-10 bg-panel rounded-3xl border-4 border-background/80 shadow-xl w-64 h-auto aspect-[9/19] overflow-hidden">
                      {/* Phone screen content */}
                      <div className="relative bg-gradient-to-br from-background via-background/95 to-background/90 w-full h-full p-4 flex flex-col">
                        {/* App header */}
                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-cta/10">
                          <div className="text-cta font-medium text-sm flex items-center">
                            <FaShieldAlt className="mr-1" /> BlockchainSCM
                          </div>
                          <div className="text-text/50 text-xs">10:30</div>
                        </div>

                        {/* QR Scanner area */}
                        <div className="flex-grow flex flex-col items-center justify-center text-center">
                          {!scanComplete ? (
                            <>
                              <div className="relative w-48 h-48 mb-4 border-2 border-cta/30 rounded-lg overflow-hidden">
                                {/* Scan area with animated elements */}
                                <div className="absolute inset-0 bg-background/5 flex items-center justify-center">
                                  {!isScanning ? (
                                    <div className="text-text/40 flex flex-col items-center">
                                      <FaQrcode className="text-4xl mb-2" />
                                      <span className="text-xs">Position QR code in frame</span>
                                    </div>
                                  ) : (
                                    <div className="relative w-full h-full">
                                      {/* Scanning animation */}
                                      <div className="absolute inset-0 bg-cta/5"></div>
                                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-cta animate-scan-line"></div>
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="h-24 w-24 border-2 border-cta/60 rounded"></div>
                                      </div>
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="animate-pulse text-cta font-medium text-sm">Scanning...</div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={handleScanStart}
                                className="px-4 py-2 bg-cta/90 hover:bg-cta text-background rounded-full text-sm font-medium transition-colors"
                              >
                                Start Scanning
                              </button>
                            </>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3 }}
                              className="w-full"
                            >
                              {/* Results display */}
                              <div className="flex items-center justify-center mb-3">
                                <div className="h-8 w-8 bg-green-500/20 rounded-full flex items-center justify-center">
                                  <FaCheck className="text-green-500" />
                                </div>
                                <div className="ml-2 text-green-500 font-medium">Verified</div>
                              </div>

                              <div className="bg-panel/40 backdrop-blur-sm border border-cta/10 rounded-lg p-3 mb-3">
                                <h4 className="font-medium text-cta mb-3 text-sm">
                                  {userJourneys[activeTab].demoProduct.name}
                                </h4>
                                <div className="grid text-left gap-x-3 gap-y-2">
                                  {Object.entries(userJourneys[activeTab].demoProduct).map(([key, value], idx) => {
                                    if (key === 'name') return null;

                                    return (
                                      <div key={idx} className="flex flex-col">
                                        <span className="text-text/50 capitalize text-[8px] mb-0.5">{key}</span>
                                        <span className="text-text/90 text-[10px]">
                                          {Array.isArray(value) ? value.join(', ') : value}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              <div className="flex space-x-2">
                                <button
                                  className="flex-1 bg-cta/20 hover:bg-cta/30 text-cta text-xs py-2 rounded transition-colors flex items-center justify-center"
                                  onClick={handleViewJourney}
                                >
                                  <FaHistory className="mr-1" /> View Journey
                                </button>
                                <button
                                  onClick={resetDemo}
                                  className="flex-1 bg-background/50 hover:bg-background/70 text-text/70 text-xs py-2 rounded transition-colors"
                                >
                                  Scan Another
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* App navigation */}
                        <div className="flex justify-around pt-2 border-t border-cta/10">
                          <div className="text-cta">
                            <FaQrcode className="mx-auto text-sm" />
                            <span className="text-[10px] text-text/60">Scan</span>
                          </div>
                          <div className="text-text/40">
                            <FaHistory className="mx-auto text-sm" />
                            <span className="text-[10px]">History</span>
                          </div>
                          <div className="text-text/40">
                            <FaShieldAlt className="mx-auto text-sm" />
                            <span className="text-[10px]">Account</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Phone decorative elements */}
                    <div className="absolute top-[12%] left-[10%] w-[80%] h-[5%] bg-background/20 rounded-full z-20"></div>
                    <motion.div
                      className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-cta/30 to-cta/5 rounded-full blur-lg z-0"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    ></motion.div>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-text/60">
                      <FaMobileAlt className="inline-block mr-1" /> Scan with any QR-enabled device
                    </p>
                  </div>
                </div>

                {/* Right side: User journey steps */}
                <div>
                  <h3 className="text-xl font-display font-bold text-cta mb-2">
                    {userJourneys[activeTab].title}
                  </h3>
                  <p className="text-text/70 mb-6">
                    {userJourneys[activeTab].description}
                  </p>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-4"
                  >
                    {userJourneys[activeTab].steps.map((step, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="bg-background/40 backdrop-blur-sm border border-cta/10 rounded-lg p-4 flex"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cta/20 flex items-center justify-center text-cta mr-4">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium text-text mb-1">{step.title}</h4>
                          <p className="text-sm text-text/70">{step.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <div className="mt-6 pl-4 border-l-2 border-cta/20">
                    <h4 className="text-sm font-medium text-cta mb-2">Security Features</h4>
                    <ul className="text-xs text-text/70 space-y-1">
                      <li className="flex items-start">
                        <FaShieldAlt className="text-cta mr-2 mt-0.5 flex-shrink-0" />
                        <span>Tamper-proof QR codes with cryptographic signatures</span>
                      </li>
                      <li className="flex items-start">
                        <FaShieldAlt className="text-cta mr-2 mt-0.5 flex-shrink-0" />
                        <span>Real-time blockchain verification prevents counterfeit products</span>
                      </li>
                      <li className="flex items-start">
                        <FaShieldAlt className="text-cta mr-2 mt-0.5 flex-shrink-0" />
                        <span>Dynamic QR codes rotate for enhanced security</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Features grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            {[
              {
                title: "Instant Verification",
                description: "Scan a product's QR code to instantly verify its authenticity and origin on the blockchain.",
                icon: <FaQrcode className="text-cta" />
              },
              {
                title: "Complete Traceability",
                description: "Access the entire journey of a product from raw materials through production to retail.",
                icon: <FaHistory className="text-cta" />
              },
              {
                title: "Secure Transfers",
                description: "Transfer custody of products between supply chain partners with cryptographic security.",
                icon: <FaExchangeAlt className="text-cta" />
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-background/30 backdrop-blur-sm border border-cta/10 rounded-lg p-6
                            hover:border-cta/30 hover:shadow-lg hover:shadow-cta/5 transition-all duration-300"
              >
                <div className="bg-cta/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-display font-bold text-cta mb-3">{feature.title}</h3>

                <p className="text-text/80 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Technical Implementation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 bg-panel/30 border border-cta/10 rounded-lg p-6 md:p-8"
          >
            <h3 className="text-xl font-display font-bold text-cta mb-6">Technical Implementation</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-display font-medium text-cta/80 mb-4">
                  QR Code Structure
                </h4>
                <div className="space-y-3">
                  <p className="text-text/70 text-sm">
                    Each QR code contains a unique product identifier, blockchain reference, and cryptographic signature
                    that ensures authenticity and prevents counterfeiting.
                  </p>
                  <div className="bg-background/50 rounded-md p-4 font-mono text-sm text-text/70 overflow-x-auto">
                    <pre>{`{
  "productId": "CFE-ORG-001",
  "batchId": "B2025-03-12-001",
  "blockchainRef": "0xf7b8...b9c1",
  "timestamp": 1710256245,
  "signature": "0x2a7c...8f4d"
}`}</pre>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-display font-medium text-cta/80 mb-4">
                  Verification Process
                </h4>
                <ol className="space-y-2 text-text/70 text-sm list-decimal pl-4">
                  <li>
                    User scans QR code with mobile device
                  </li>
                  <li>
                    App extracts product ID and blockchain reference
                  </li>
                  <li>
                    Signature is verified against blockchain record
                  </li>
                  <li>
                    Product data and history are retrieved from blockchain
                  </li>
                  <li>
                    User receives verification result and product information
                  </li>
                </ol>
                <div className="mt-4 bg-cta/5 rounded-md p-3 text-xs text-text/70">
                  <div className="font-medium text-cta mb-1">Security Note:</div>
                  QR codes are generated with time-based signatures and can include location-specific data
                  for additional verification. Dynamic QR codes can also be implemented for high-value products.
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 text-center"
          >
            <a
              href="/demo"
              className="inline-flex items-center px-6 py-3 bg-cta/20 hover:bg-cta/30 text-cta border border-cta/30 
                        rounded-lg transition-all duration-300 font-medium"
            >
              <FaQrcode className="mr-2" />
              Request QR Integration Demo
            </a>
          </motion.div>
        </div>
      </div>

      {/* Journey Modal */}
      <AnimatePresence>
        {showJourney && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowJourney(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-panel border border-cta/20 rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-b border-cta/10 px-6 py-4 flex justify-between items-center sticky top-0 bg-panel z-15">
                <h3 className="text-lg font-display font-bold text-cta flex items-center">
                  <FaHistory className="mr-2" />
                  <span>Product Journey</span>
                </h3>
                <button
                  onClick={() => setShowJourney(false)}
                  className="text-text/50 hover:text-text transition-colors"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-4 pb-4 border-b border-cta/10">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full border border-cta/20 flex items-center justify-center mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-8 w-8 opacity-70 text-cta"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {activeTab === 'consumer' ? (
                          // Coffee cup icon for consumer product
                          <>
                            <path d="M17 8h1a4 4 0 110 8h-1" />
                            <path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" />
                            <line x1="6" y1="2" x2="6" y2="4" />
                            <line x1="10" y1="2" x2="10" y2="4" />
                            <line x1="14" y1="2" x2="14" y2="4" />
                          </>
                        ) : activeTab === 'business' ? (
                          // Box/package icon for business shipment
                          <>
                            <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
                            <path d="M12 12l8-4.5" />
                            <path d="M12 12v9" />
                            <path d="M12 12L4 7.5" />
                            <circle cx="12" cy="7" r="1" />
                          </>
                        ) : (
                          // Manufacturing icon for manufacturing
                          <>
                            <path d="M2 20h.01" />
                            <path d="M7 20v-4" />
                            <path d="M12 20v-8" />
                            <path d="M17 20v-6" />
                            <path d="M22 20V8" />
                            <path d="M2 8h20" />
                            <path d="M4 4h16a2 2 0 012 2v2H2V6a2 2 0 012-2z" />
                          </>
                        )}
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-text">
                        {userJourneys[activeTab].demoProduct.name}
                      </h4>
                      <p className="text-xs text-text/60">
                        Complete blockchain-verified history
                      </p>
                    </div>
                  </div>
                </div>

                {/* Journey Timeline */}
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-cta/20" aria-hidden="true"></div>

                  <div className="space-y-6 relative">
                    {getJourneyData().map((event, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative flex items-start"
                      >
                        <div className="flex items-center justify-center h-9 w-9 rounded-full bg-cta/10 border border-cta/30 text-cta z-10 relative">
                          {event.icon}
                        </div>
                        <div className="ml-4 bg-background/30 rounded-lg p-4 border border-cta/10 flex-grow">
                          <div className="text-xs text-text/60 mb-1">{event.date}</div>
                          <h4 className="text-sm font-medium text-cta">{event.title}</h4>
                          <p className="text-sm text-text/80 mt-1">{event.description}</p>

                          <div className="mt-2 flex">
                            <div className="text-[10px] bg-cta/5 text-text/60 px-2 py-0.5 rounded-full border border-cta/10">
                              Verified on blockchain
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-cta/10 flex justify-between">
                  <div className="text-xs text-text/60 flex items-center">
                    <FaShieldAlt className="mr-1" />
                    All events cryptographically verified
                  </div>
                  <button
                    onClick={() => setShowJourney(false)}
                    className="px-4 py-2 bg-cta/10 hover:bg-cta/20 text-cta text-sm rounded transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes scan-line {
          0% {
            top: 0%;
          }
          50% {
            top: 100%;
          }
          50.1% {
            top: 0%;
          }
          100% {
            top: 100%;
          }
        }
        
        .animate-scan-line {
          animation: scan-line 2s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default QrCodeIntegration;