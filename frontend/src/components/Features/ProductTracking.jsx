import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCubes, FaBarcode, FaMapMarkedAlt, FaHistory, FaBoxOpen, FaTruck } from 'react-icons/fa';

const ProductTracking = () => {
  // State for the active product journey step
  const [activeStep, setActiveStep] = useState(1);

  // Timeline steps for product journey visualization
  const journeySteps = [
    {
      id: 1,
      title: "Manufacturing",
      location: "Factory, Shanghai",
      date: "Jan 15, 2023",
      icon: <FaBoxOpen />,
      description: "Product manufactured and initial blockchain registration",
      details: [
        "Unique product ID generated: 0x8a721cf...",
        "Material sources verified and logged",
        "Quality control inspection passed: 100%",
        "Digital certificate of origin created"
      ]
    },
    {
      id: 2,
      title: "Distribution",
      location: "Distribution Center, Hong Kong",
      date: "Jan 22, 2023",
      icon: <FaTruck />,
      description: "Product shipped to regional distribution center",
      details: [
        "Ownership transferred to logistics provider",
        "Temperature conditions maintained: 68-72°F",
        "Customs documentation verified and logged",
        "Batch number linked to blockchain record"
      ]
    },
    {
      id: 3,
      title: "Wholesaler",
      location: "Wholesale Warehouse, Singapore",
      date: "Feb 03, 2023",
      icon: <FaBarcode />,
      description: "Product received and verified by wholesaler",
      details: [
        "Blockchain verification scan completed",
        "Quality assessment: No damage reported",
        "Inventory system updated automatically",
        "Smart contract payment triggered"
      ]
    },
    {
      id: 4,
      title: "Retailer",
      location: "Retail Store, Sydney",
      date: "Feb 12, 2023",
      icon: <FaMapMarkedAlt />,
      description: "Product delivered to retail location",
      details: [
        "Retailer verification scan completed",
        "Product displayed in premium section",
        "Digital authenticity certificate linked",
        "Real-time inventory update on blockchain"
      ]
    },
    {
      id: 5,
      title: "Consumer",
      location: "Customer Purchase",
      date: "Feb 18, 2023",
      icon: <FaHistory />,
      description: "Product purchased by end customer",
      details: [
        "Customer accesses full product journey via QR",
        "Warranty registration automatically processed",
        "Carbon footprint data provided",
        "Customer feedback loop initiated"
      ]
    }
  ];

  return (
    <section id="product-tracking" className="py-24 bg-panel relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-96 w-96 rounded-full bg-cta/5 blur-3xl absolute -top-48 -left-48"></div>
        <div className="h-96 w-96 rounded-full bg-cta/5 blur-3xl absolute -bottom-48 -right-48"></div>

        {/* Grid pattern */}
        <svg width="100%" height="100%" className="absolute inset-0 opacity-10">
          <pattern id="product-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" style={{ color: '#66fcf1' }} />
          </pattern>
          <rect width="100%" height="100%" fill="url(#product-grid)" />
        </svg>
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
              <FaCubes className="text-cta text-2xl" />
            </div>

            <h2 className="text-3xl md:text-4xl font-display font-bold text-cta mb-6">
              Decentralized Product Tracking
            </h2>

            <p className="text-text/80 max-w-2xl mx-auto">
              Follow every step of your product's journey with immutable blockchain records,
              providing unprecedented transparency and verification capabilities.
            </p>
          </motion.div>

          {/* Main feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: "Unique Digital Identity",
                description: "Every product receives a blockchain-secured digital identity that cannot be duplicated or tampered with.",
                icon: <FaBarcode className="text-cta" />
              },
              {
                title: "Real-time Location Updates",
                description: "Track product movement with GPS integration and instant blockchain verification at each checkpoint.",
                icon: <FaMapMarkedAlt className="text-cta" />
              },
              {
                title: "Complete Chain of Custody",
                description: "View the entire history of ownership and handling from manufacturing to final delivery.",
                icon: <FaHistory className="text-cta" />
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
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
          </div>

          {/* Product journey visualization */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-background/20 backdrop-blur-md rounded-xl border border-cta/20 overflow-hidden p-6 md:p-8"
          >
            <h3 className="text-xl md:text-2xl font-display font-bold text-cta mb-8 text-center">
              Complete Product Journey Visualization
            </h3>

            {/* Timeline navigator */}
            <div className="relative mb-12">
              {/* Timeline bar */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-panel/50 transform -translate-y-1/2"></div>

              {/* Active progress indicator */}
              <div
                className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-cta to-cta/50 transform -translate-y-1/2 transition-all duration-500"
                style={{ width: `${(activeStep / (journeySteps.length - 1)) * 100}%` }}
              ></div>

              {/* Step indicators */}
              <div className="relative flex justify-between">
                {journeySteps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center relative z-10 transition-all duration-300 
                              ${activeStep >= step.id ? 'bg-cta border-cta text-background' : 'bg-panel/70 border-cta/30 text-text'}`}
                  >
                    {step.icon}

                    {/* Step title tooltip */}
                    <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap
                                   text-xs ${activeStep === step.id ? 'text-cta font-medium' : 'text-text/70'}`}>
                      {step.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Active step details */}
            {journeySteps.map((step) => (
              <motion.div
                key={step.id}
                initial={false}
                animate={{
                  opacity: activeStep === step.id ? 1 : 0,
                  height: activeStep === step.id ? 'auto' : 0,
                  display: activeStep === step.id ? 'block' : 'none'
                }}
                transition={{ duration: 0.5 }}
                className="bg-panel/30 rounded-lg border border-cta/10 p-6 mb-4"
              >
                <div className="flex flex-col md:flex-row md:items-center mb-6">
                  <div className="flex-shrink-0 mb-4 md:mb-0">
                    <div className="bg-cta/10 w-16 h-16 rounded-full flex items-center justify-center text-cta text-2xl">
                      {step.icon}
                    </div>
                  </div>

                  <div className="md:ml-6">
                    <h4 className="text-xl font-display font-bold text-cta">{step.title}</h4>

                    <div className="flex flex-col md:flex-row md:items-center mt-2">
                      <div className="flex items-center text-text/70 text-sm mb-2 md:mb-0">
                        <FaMapMarkedAlt className="mr-1" />
                        <span>{step.location}</span>
                      </div>

                      <div className="md:ml-6 flex items-center text-text/70 text-sm">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{step.date}</span>
                      </div>
                    </div>

                    <p className="mt-3 text-text">{step.description}</p>
                  </div>
                </div>

                <div className="bg-background/30 rounded-lg p-4">
                  <h5 className="text-sm font-medium text-cta mb-3">Blockchain Verification Details</h5>

                  <ul className="space-y-2">
                    {step.details.map((detail, index) => (
                      <li key={index} className="text-sm text-text/80 flex items-start">
                        <svg className="w-4 h-4 text-cta mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 pt-4 border-t border-text/10">
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-text/60">Validated by 12 network nodes</div>

                      <div className="text-xs text-cta">
                        <span className="flex items-center">
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                          Verified on Blockchain
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="mt-6 flex justify-center">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                  className="px-4 py-2 bg-background/30 hover:bg-cta/10 text-text border border-cta/20 rounded-lg transition-colors duration-300
                            disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={activeStep === 1}
                >
                  Previous Step
                </button>

                <button
                  onClick={() => setActiveStep(Math.min(journeySteps.length, activeStep + 1))}
                  className="px-4 py-2 bg-cta/20 hover:bg-cta/30 text-cta border border-cta/30 rounded-lg transition-colors duration-300
                            disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={activeStep === journeySteps.length}
                >
                  Next Step
                </button>
              </div>
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20"
          >
            <h3 className="text-xl md:text-2xl font-display font-bold text-cta mb-8 text-center">
              Benefits of Blockchain Product Tracking
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  title: "Counterfeit Prevention",
                  value: "100%",
                  description: "Eliminate fake products with verified blockchain records"
                },
                {
                  title: "Supply Chain Visibility",
                  value: "End-to-End",
                  description: "Complete transparency from origin to delivery"
                },
                {
                  title: "Process Efficiency",
                  value: "+35%",
                  description: "Improved operational efficiency through automation"
                },
                {
                  title: "Customer Trust",
                  value: "+68%",
                  description: "Increased consumer confidence in product authenticity"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="bg-background/20 backdrop-blur-sm border border-cta/10 rounded-lg p-5 text-center"
                >
                  <div className="text-cta text-2xl md:text-3xl font-bold mb-1">{benefit.value}</div>
                  <div className="text-text font-medium mb-2">{benefit.title}</div>
                  <div className="text-text/70 text-sm">{benefit.description}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Case study / quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 bg-cta/5 rounded-xl p-8 border border-cta/20"
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-panel/50 flex items-center justify-center">
                  <span className="text-cta text-xl font-bold">AC</span>
                </div>
              </div>

              <div className="md:w-3/4 md:pl-8">
                <blockquote className="text-text/90">
                  <span className="text-3xl text-cta leading-none">"</span>
                  Since implementing blockchain product tracking, we've reduced product verification time by 96% and entirely
                  eliminated counterfeit returns. Our customers now scan the QR code to verify authenticity before purchase,
                  significantly boosting our brand trust and loyalty.
                  <span className="text-3xl text-cta leading-none">"</span>
                </blockquote>

                <div className="mt-4">
                  <div className="font-medium text-text">Alex Chen</div>
                  <div className="text-text/70 text-sm">Supply Chain Director, LuxGoods International</div>
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
              <FaCubes className="mr-2" />
              See Product Tracking Demo
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductTracking;