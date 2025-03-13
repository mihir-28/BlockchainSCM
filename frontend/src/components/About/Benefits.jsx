import React from 'react';
import { motion } from 'framer-motion';
import {
  FaShieldAlt,
  FaSearch,
  FaFileInvoiceDollar,
  FaUserShield,
  FaChartLine,
  FaTrafficLight,
  FaHandshake,
  FaGlobeAmericas
} from 'react-icons/fa';

const Benefits = () => {
  const benefits = [
    {
      id: "immutability",
      title: "Immutable Records",
      icon: <FaShieldAlt className="text-cta" />,
      description: "Once data is recorded on the blockchain, it cannot be altered or deleted, ensuring a reliable history of transactions.",
      color: "from-cta/20 to-cta/5"
    },
    {
      id: "transparency",
      title: "Complete Transparency",
      icon: <FaSearch className="text-cta" />,
      description: "All authorized participants can view the entire history of a product, ensuring total visibility across the supply chain.",
      color: "from-cta/20 to-cta/5"
    },
    {
      id: "efficiency",
      title: "Operational Efficiency",
      icon: <FaChartLine className="text-cta" />,
      description: "Smart contracts automate verification and payment processes, reducing delays and eliminating manual paperwork.",
      color: "from-cta/20 to-cta/5"
    },
    {
      id: "fraud",
      title: "Fraud Prevention",
      icon: <FaUserShield className="text-cta" />,
      description: "Cryptographic security makes it virtually impossible to introduce counterfeit products into the legitimate supply chain.",
      color: "from-cta/20 to-cta/5"
    },
    {
      id: "compliance",
      title: "Simplified Compliance",
      icon: <FaFileInvoiceDollar className="text-cta" />,
      description: "Automated tracking helps ensure regulatory compliance with easy access to required documentation and certifications.",
      color: "from-cta/20 to-cta/5"
    },
    {
      id: "realtime",
      title: "Real-time Tracking",
      icon: <FaTrafficLight className="text-cta" />,
      description: "Monitor shipments in real-time, allowing for better logistics planning and proactive problem resolution.",
      color: "from-cta/20 to-cta/5"
    },
    {
      id: "trust",
      title: "Enhanced Trust",
      icon: <FaHandshake className="text-cta" />,
      description: "Build stronger relationships with partners and customers through verifiable proof of product origin and handling.",
      color: "from-cta/20 to-cta/5"
    },
    {
      id: "sustainability",
      title: "Sustainability Tracking",
      icon: <FaGlobeAmericas className="text-cta" />,
      description: "Verify and prove ethical sourcing and environmental compliance throughout the entire supply chain.",
      color: "from-cta/20 to-cta/5"
    }
  ];

  const cardVariants = {
    offscreen: {
      opacity: 0,
      y: 50
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.2,
        duration: 0.8
      }
    }
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-96 w-96 rounded-full bg-cta/5 blur-3xl absolute -top-48 -right-48"></div>
        <div className="h-96 w-96 rounded-full bg-cta/5 blur-3xl absolute -bottom-48 -left-48"></div>

        {/* Animated dots grid */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="absolute left-0 right-0 h-px bg-cta/20" style={{ top: `${(i + 1) * 8}%` }}></div>
          ))}
          {[...Array(12)].map((_, i) => (
            <div key={i} className="absolute top-0 bottom-0 w-px bg-cta/20" style={{ left: `${(i + 1) * 8}%` }}></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="inline-block text-3xl md:text-4xl font-display font-bold text-cta mb-6 relative">
            Why Blockchain for Supply Chain?
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cta/0 via-cta to-cta/0"></span>
          </h2>
          <p className="text-text/80 max-w-2xl mx-auto">
            Blockchain technology transforms supply chains with unprecedented security, visibility, and efficiency
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.1 }}
              whileHover={{ scale: 1.03 }}
              transition={{
                type: "spring",
                stiffness: 200,
                delay: index * 0.05
              }}
              className={`bg-gradient-to-br ${benefit.color} backdrop-blur-sm border border-cta/10 rounded-lg p-6
                          hover:shadow-lg hover:shadow-cta/5 hover:border-cta/30 transition-all duration-300`}
            >
              <div className="flex flex-col h-full">
                <div className="bg-background/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>

                <h3 className="text-xl font-display font-bold text-cta mb-3">{benefit.title}</h3>

                <p className="text-text/90 text-sm flex-grow">
                  {benefit.description}
                </p>

                <div className="mt-4 pt-4 border-t border-cta/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text/60">Industry Impact:</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-4 rounded-sm ${i < 4 ? 'bg-cta/80' : 'bg-cta/30'} ml-0.5`}
                          style={{ height: `${(i + 1) * 3 + 5}px` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Case Study Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 bg-panel/30 backdrop-blur-md rounded-xl border border-cta/20 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="lg:col-span-2 relative bg-cta/10 flex items-center justify-center p-8">
              <div className="relative">
                {/* Blockchain 3D visualization */}
                <div className="grid grid-cols-3 gap-3 transform rotate-12">
                  {[...Array(9)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -8, 0],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                        delay: i * 0.2
                      }}
                      className="w-16 h-16 bg-panel/50 border border-cta/30 rounded flex items-center justify-center backdrop-blur-sm"
                    >
                      <div className="w-6 h-6 bg-cta/20 rounded"></div>
                    </motion.div>
                  ))}
                </div>

                {/* Connecting lines */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg width="100%" height="100%" className="opacity-30">
                    <line x1="25%" y1="25%" x2="75%" y2="25%" stroke="#66fcf1" strokeWidth="1" />
                    <line x1="25%" y1="25%" x2="25%" y2="75%" stroke="#66fcf1" strokeWidth="1" />
                    <line x1="25%" y1="75%" x2="75%" y2="75%" stroke="#66fcf1" strokeWidth="1" />
                    <line x1="75%" y1="25%" x2="75%" y2="75%" stroke="#66fcf1" strokeWidth="1" />
                    <line x1="50%" y1="25%" x2="50%" y2="75%" stroke="#66fcf1" strokeWidth="1" />
                    <line x1="25%" y1="50%" x2="75%" y2="50%" stroke="#66fcf1" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 p-8 lg:p-12 flex flex-col justify-center">
              <div className="inline-block bg-cta/20 text-cta text-xs px-3 py-1 rounded-full mb-4">
                Case Study
              </div>
              <h3 className="text-2xl font-display font-bold text-cta mb-4">
                Global Electronics Manufacturer Reduces Counterfeit Parts by 97%
              </h3>
              <p className="text-text/80 mb-6">
                A leading electronics manufacturer implemented our blockchain solution to track component sourcing and
                verify authenticity. Within 6 months, they virtually eliminated counterfeit parts in their supply chain
                and reduced quality control costs by 22%.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-background/20 rounded p-3 text-center">
                  <div className="text-cta text-xl font-bold">97%</div>
                  <div className="text-xs text-text/70">Counterfeits Reduced</div>
                </div>
                <div className="bg-background/20 rounded p-3 text-center">
                  <div className="text-cta text-xl font-bold">22%</div>
                  <div className="text-xs text-text/70">QC Cost Savings</div>
                </div>
                <div className="bg-background/20 rounded p-3 text-center">
                  <div className="text-cta text-xl font-bold">3.5x</div>
                  <div className="text-xs text-text/70">ROI in First Year</div>
                </div>
              </div>
              <a href="/case-studies" className="text-cta hover:text-cta/80 flex items-center text-sm font-medium transition-colors duration-300">
                View detailed case study
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center relative"
        >
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-6xl text-cta/20 font-serif">
            "
          </div>
          <blockquote className="text-xl md:text-2xl italic text-text/90 max-w-4xl mx-auto px-8">
            Blockchain has transformed our supply chain from an operational challenge into a strategic advantage.
            We've drastically reduced disputes, increased customer trust, and gained unprecedented visibility.
          </blockquote>
          <div className="mt-6 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-cta/10 flex items-center justify-center mr-3">
              <span className="text-cta">JD</span>
            </div>
            <div className="text-left">
              <div className="text-text">Jane Doe</div>
              <div className="text-text/60 text-sm">Supply Chain Director, Fortune 500 Company</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;