import React from 'react';
import { motion } from 'framer-motion';
import {
  FaReact,
  FaNodeJs,
  FaEthereum,
  FaDatabase,
  FaServer,
  FaCode,
  FaLayerGroup,
  FaShieldAlt,
  FaNetworkWired, // Added as replacement for SiGanache
  FaTools,
  FaCubes
} from 'react-icons/fa';
import { SiTailwindcss, SiSolidity, SiMongodb, SiExpress } from 'react-icons/si';

const Stack = () => {
  // Define all the technology stacks
  const techStacks = [
    {
      id: "frontend",
      title: "Frontend",
      icon: <FaReact className="text-4xl text-cta" />,
      description: "Modern, responsive interface built with React",
      technologies: [
        {
          name: "React (Vite)",
          icon: <FaReact />,
          description: "Fast, efficient component library for building user interfaces"
        },
        {
          name: "Tailwind CSS",
          icon: <SiTailwindcss />,
          description: "Utility-first CSS framework for rapid UI development"
        },
        {
          name: "Web3.js",
          icon: <FaEthereum />,
          description: "Library for interacting with Ethereum blockchain"
        }
      ]
    },
    {
      id: "blockchain",
      title: "Blockchain",
      icon: <FaEthereum className="text-4xl text-cta" />,
      description: "Decentralized, secure ledger technology",
      technologies: [
        {
          name: "Ethereum",
          icon: <FaEthereum />,
          description: "Open-source blockchain platform with smart contract functionality"
        },
        {
          name: "Solidity",
          icon: <SiSolidity />,
          description: "Object-oriented programming language for Ethereum smart contracts"
        },
        {
          name: "Truffle",
          icon: <FaTools />,
          description: "Development framework for Ethereum DApps"
        },
        {
          name: "Ganache",
          icon: <FaNetworkWired />, // Replaced SiGanache with FaNetworkWired
          description: "Personal blockchain for Ethereum development"
        }
      ]
    },
    {
      id: "backend",
      title: "Backend",
      icon: <FaServer className="text-4xl text-cta" />,
      description: "Robust API services and application logic",
      technologies: [
        {
          name: "Node.js",
          icon: <FaNodeJs />,
          description: "JavaScript runtime built on Chrome's V8 engine"
        },
        {
          name: "Express.js",
          icon: <SiExpress />,
          description: "Fast, unopinionated web framework for Node.js"
        },
        {
          name: "MongoDB",
          icon: <SiMongodb />,
          description: "NoSQL database for modern applications"
        },
        {
          name: "RESTful API",
          icon: <FaCode />,
          description: "Standardized architecture for API development"
        }
      ]
    },
    {
      id: "security",
      title: "Security",
      icon: <FaShieldAlt className="text-4xl text-cta" />,
      description: "Multi-layered security protocols and validation",
      technologies: [
        {
          name: "MetaMask Integration",
          icon: <FaEthereum />,
          description: "Secure wallet connection and transaction signing"
        },
        {
          name: "JWT Authentication",
          icon: <FaShieldAlt />,
          description: "Secure token-based user authentication"
        },
        {
          name: "Role-based Access",
          icon: <FaLayerGroup />,
          description: "Granular permission controls for different user types"
        },
        {
          name: "Data Encryption",
          icon: <FaDatabase />,
          description: "End-to-end encryption of sensitive information"
        }
      ]
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 bg-panel relative overflow-hidden">
      {/* Abstract tech background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 50 33 L 66 50 L 50 66 L 50 100" stroke="currentColor" strokeWidth="1" fill="none" />
              <path d="M 0 50 L 33 50 L 50 66 L 66 50 L 100 50" stroke="currentColor" strokeWidth="1" fill="none" />
              <circle cx="50" cy="50" r="3" fill="currentColor" />
              <circle cx="50" cy="0" r="2" fill="currentColor" />
              <circle cx="50" cy="100" r="2" fill="currentColor" />
              <circle cx="0" cy="50" r="2" fill="currentColor" />
              <circle cx="100" cy="50" r="2" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)" style={{ color: '#66fcf1' }} />
        </svg>
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
            Technology Stack
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cta/0 via-cta to-cta/0"></span>
          </h2>
          <p className="text-text/80 max-w-2xl mx-auto">
            Our platform is built with cutting-edge technologies for performance, security, and scalability
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {techStacks.map((stack) => (
            <motion.div
              key={stack.id}
              variants={itemVariants}
              className="bg-background/30 backdrop-blur-sm rounded-lg border border-cta/10 overflow-hidden 
                        transition-all duration-300 hover:border-cta/30 hover:shadow-lg hover:shadow-cta/5 relative"
            >
              <div className="p-6">
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-cta/10 flex items-center justify-center mb-4">
                    {stack.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold text-cta">{stack.title}</h3>
                  <p className="text-text/70 text-sm mt-1">{stack.description}</p>
                </div>

                <div className="space-y-3 mt-6">
                  {stack.technologies.map((tech, index) => (
                    <div
                      key={`${stack.id}-${index}`}
                      className="flex items-center p-2 rounded-lg hover:bg-cta/5 transition-colors duration-200"
                    >
                      <div className="w-8 h-8 flex-shrink-0 rounded-full bg-panel/50 flex items-center justify-center text-cta">
                        {tech.icon}
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-semibold text-text">{tech.name}</h4>
                        <p className="text-xs text-text/60">{tech.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative corner element */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute transform rotate-45 bg-cta/10 text-cta w-24 h-3 -top-1 right-[-5px]"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-text/80 mb-6">
            Interested in the technical details of our implementation?
          </p>
          <a
            href="/documentation"
            className="inline-flex items-center px-6 py-3 bg-cta/20 hover:bg-cta/30 
                    text-cta rounded-lg border border-cta/20 transition-all duration-300"
          >
            <FaCode className="mr-2" />
            View Technical Documentation
          </a>
        </motion.div>

        {/* Tech metrics */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { metric: "99.9%", label: "Uptime" },
            { metric: "<2s", label: "Transaction Time" },
            { metric: "50+", label: "Smart Contracts" },
            { metric: "24/7", label: "Support" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 * index }}
              className="bg-background/20 backdrop-blur-sm rounded-lg border border-cta/10 p-4 text-center"
            >
              <div className="text-2xl md:text-3xl font-bold text-cta mb-1">{item.metric}</div>
              <div className="text-text/60 text-sm">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stack;