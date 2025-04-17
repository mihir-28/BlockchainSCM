import React, { useState } from 'react';
import {
  FaExclamationTriangle, FaCheck, FaSpinner, FaClock,
  FaRocket, FaCode, FaCubes, FaServer, FaMobileAlt, FaTasks,
  FaShieldAlt, FaBug, FaChevronDown, FaChevronUp
} from 'react-icons/fa';

const DevStatus = () => {
  // State to track which items are expanded on mobile
  const [expandedItems, setExpandedItems] = useState({});

  // Toggle function for expanding/collapsing items
  const toggleItem = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Project development status data with more details
  const developmentPhases = [
    {
      id: 1,
      title: "Project Planning",
      description: "Requirements gathering and project scope definition",
      status: "completed",
      date: "January 2025",
      details: [
        "Business requirements documentation",
        "User stories & use case analysis",
        "Technology stack selection",
        "Development roadmap creation"
      ],
      icon: <FaTasks className="text-green-500" />
    },
    {
      id: 2,
      title: "Architecture Design",
      description: "Design system architecture and smart contract structure",
      status: "completed",
      date: "February 2025",
      details: [
        "Smart contract architecture design",
        "Database schema modeling",
        "API endpoints planning",
        "Security architecture planning"
      ],
      icon: <FaServer className="text-green-500" />
    },
    {
      id: 3,
      title: "Frontend Development",
      description: "UI/UX implementation and frontend user flows",
      status: "completed",
      date: "March 2025",
      details: [
        "Core UI component development",
        "User authentication flows",
        "Dashboard & analytics interfaces",
        "Product tracking visualization",
        "Responsive design implementation"
      ],
      icon: <FaCode className="text-green-500" />
    },
    {
      id: 4,
      title: "Blockchain Integration",
      description: "Smart contract integration and wallet connectivity",
      status: "completed",
      date: "April 2025",
      details: [
        "Smart contract deployment",
        "Wallet connection implementation",
        "Transaction signing & verification",
        "Chain data indexing & caching",
        "Gas optimization"
      ],
      icon: <FaCubes className="text-green-500" />
      // icon: <FaSpinner className="text-amber-500 animate-spin-slow" />
    },
    {
      id: 5,
      title: "Testing & Deployment",
      description: "QA testing, security audits and deployment",
      status: "in-progress",
      date: "May 2025",
      details: [
        "Automated testing suite implementation",
        "Smart contract security audits",
        "Performance optimization",
        "CI/CD pipeline setup",
        "Testnet deployment & validation"
      ],
      // icon: <FaBug className="text-blue-400" />
      icon: <FaSpinner className="text-amber-500 animate-spin-slow" />

    },
    {
      id: 6,
      title: "Security Audits & Scaling",
      description: "Advanced security measures and performance optimizations",
      status: "planned",
      date: "July 2025",
      details: [
        "Penetration testing",
        "Third-party security audit",
        "Distributed system scaling",
        "Performance benchmarking",
        "Disaster recovery planning"
      ],
      icon: <FaShieldAlt className="text-blue-400" />
    },
    {
      id: 7,
      title: "Mobile App Development",
      description: "Native mobile application with blockchain integration",
      status: "planned",
      date: "October 2025",
      details: [
        "React Native implementation",
        "Mobile wallet integration",
        "QR code scanning functionality",
        "Push notifications",
        "Offline capabilities"
      ],
      icon: <FaMobileAlt className="text-blue-400" />
    }
  ];

  // Features status data with granular tracking
  const featuresStatus = [
    { name: "Product Tracking", status: "completed", completion: 1.0 },
    { name: "Smart Contracts", status: "completed", completion: 0.5 },
    { name: "Transaction Logging", status: "completed", completion: 1.0 },
    { name: "QR Code Integration", status: "completed", completion: 1.0 },
    { name: "Access Control", status: "in-progress", completion: 0.8 },
    { name: "Analytics Dashboard", status: "planned", completion: 0.0 },
    { name: "Supply Chain Visualization", status: "planned", completion: 0.0 },
    { name: "Real-time Notifications", status: "planned", completion: 0.0 },
    { name: "Multi-signature Approval", status: "planned", completion: 0.0 },
    { name: "Mobile Wallet Support", status: "planned", completion: 0.0 }
  ];

  // Helper function to render status icon
  const renderStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheck className="text-green-500" />;
      case 'in-progress':
        return <FaSpinner className="text-amber-500 animate-spin-slow" />;
      case 'planned':
        return <FaClock className="text-blue-400" />;
      default:
        return null;
    }
  };

  // Calculate progress percentage using individual completion values
  const totalFeatures = featuresStatus.length;
  const progressValue = featuresStatus.reduce((sum, feature) => sum + feature.completion, 0);
  const progressPercentage = Math.round((progressValue / totalFeatures) * 100);

  return (
    <section className="py-8 md:py-16 relative overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90 z-0"></div>

      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 right-0 bottom-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}
        ></div>
      </div>

      {/* Floating elements - Hide most on mobile for better performance */}
      <div className="hidden md:block">
        {/* Floating blockchain elements - First layer (closer to background) */}
        <div className="absolute top-20 left-10 w-16 h-16 rounded-lg border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float opacity-40 z-0"></div>
        <div className="absolute bottom-40 right-20 w-20 h-20 rounded-lg border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float-delay opacity-40 z-0"></div>
        <div className="absolute top-1/2 right-10 w-12 h-12 rounded-lg border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float-slow opacity-40 z-0"></div>
        <div className="absolute top-40 left-1/4 w-10 h-10 rounded-full border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float-slow opacity-40 z-0"></div>
        <div className="absolute bottom-60 left-20 w-14 h-14 rounded-lg border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float opacity-40 z-0"></div>
        <div className="absolute top-32 right-1/4 w-8 h-8 rounded-full border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float-delay opacity-40 z-0"></div>
        <div className="absolute bottom-20 right-1/3 w-12 h-12 rounded-full border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float-extra-slow opacity-40 z-0"></div>
        <div className="absolute top-3/4 left-1/3 w-16 h-16 rounded-lg border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float-extra-delay opacity-40 z-0"></div>

        {/* Floating blockchain elements - Second layer (middle) */}
        <div className="absolute top-1/2 left-16 w-9 h-9 rounded-lg border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float-delay opacity-35 z-0"></div>
        <div className="absolute top-2/5 left-1/5 w-11 h-11 rounded-full border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float-slow-reverse opacity-40 z-0"></div>
        <div className="absolute top-3/5 left-24 w-7 h-7 rounded-full border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float opacity-30 z-0"></div>
        <div className="absolute bottom-2/5 left-36 w-13 h-13 rounded-lg border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float-extra-delay-reverse opacity-25 z-0"></div>
        <div className="absolute top-52 left-1/6 w-10 h-10 rounded-lg border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float-slow-reverse opacity-30 z-0"></div>
        <div className="absolute bottom-80 right-1/6 w-12 h-12 rounded-lg border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float-delay-reverse opacity-30 z-0"></div>
        <div className="absolute top-1/4 right-1/5 w-8 h-8 rounded-full border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float-slow-extra opacity-30 z-0"></div>
        <div className="absolute bottom-1/4 left-10 w-14 h-14 rounded-full border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float-extra-delay-reverse opacity-30 z-0"></div>
        <div className="absolute top-2/3 right-14 w-10 h-10 rounded-full border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float-reverse opacity-30 z-0"></div>
        <div className="absolute top-1/3 left-60 w-10 h-10 rounded-lg border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float-delay-extra opacity-25 z-0"></div>
        <div className="absolute top-64 left-48 w-6 h-6 rounded-full border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float-extra-slow opacity-30 z-0"></div>

        {/* Floating blockchain elements - Third layer (foreground) */}
        <div className="absolute top-96 left-1/2 w-6 h-6 rounded-full border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float-slow-extra opacity-20 z-0"></div>
        <div className="absolute bottom-32 right-1/4 w-8 h-8 rounded-full border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float-delay-extra opacity-20 z-0"></div>
        <div className="absolute top-80 left-20 w-5 h-5 rounded-full border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float-extra-slow-reverse opacity-20 z-0"></div>
        <div className="absolute bottom-64 right-28 w-7 h-7 rounded-lg border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float-slow-reverse opacity-20 z-0"></div>
        <div className="absolute top-72 left-32 w-4 h-4 rounded-full border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float-slow opacity-15 z-0"></div>
        <div className="absolute bottom-1/3 left-1/8 w-5 h-5 rounded-lg border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float-delay-reverse opacity-18 z-0"></div>
      </div>

      {/* Mobile optimized floating elements - only show a few for performance */}
      <div className="md:hidden">
        <div className="absolute top-20 left-10 w-10 h-10 rounded-lg border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float opacity-30 z-0"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 rounded-lg border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float-delay opacity-30 z-0"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 rounded-full border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float-slow opacity-30 z-0"></div>
        <div className="absolute bottom-20 right-1/5 w-6 h-6 rounded-full border border-cta/20 bg-cta/5 backdrop-blur-sm 
                                    animate-float-reverse opacity-30 z-0"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-cta/0 via-cta/30 to-cta/0"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Development Notice Banner */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-8 md:mb-12 flex flex-col sm:flex-row items-start max-w-4xl mx-auto backdrop-blur-sm">
          <div className="mr-4 mb-3 sm:mb-0 mt-1 text-amber-500 flex-shrink-0">
            <FaExclamationTriangle size={24} />
          </div>
          <div>
            <h3 className="text-amber-500 font-display font-bold text-lg mb-2">Development in Progress</h3>
            <p className="text-text/80 text-justify">
              <span className="font-bold">
                <span className="text-cta">Nex</span><span className="text-white">Chain</span>
              </span> - A Blockchain-based Supply Chain Management Platform is currently under active development.
              Some features might be incomplete or not fully functional. We appreciate your understanding
              and welcome feedback as we continue to improve the platform.
            </p>
          </div>
        </div>

        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-cta mb-4">Development Roadmap</h2>
          <p className="text-text/80 max-w-3xl mx-auto">
            Follow our progress as we build a next-generation blockchain solution for supply chain management
          </p>
        </div>

        {/* Development Progress Bar */}
        <div className="max-w-3xl mx-auto mb-10 md:mb-16 px-2 sm:px-0">
          <div className="flex justify-between items-center mb-2">
            <span className="text-text font-medium text-sm sm:text-base">Project Completion</span>
            <span className="text-cta font-display font-bold">{progressPercentage}%</span>
          </div>
          <div className="h-3 sm:h-4 bg-panel/50 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-cta/80 to-cta rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-text/60 mt-1">
            <span className="flex flex-col items-center">
              <span className="h-4 w-0.5 bg-green-500 mb-1"></span>
              <span>Research & Planning</span>
            </span>
            <span className="flex flex-col items-center">
              <span className="h-4 w-0.5 bg-amber-500 mb-1"></span>
              <span>Development</span>
            </span>
            <span className="flex-col items-center hidden sm:flex">
              <span className="h-4 w-0.5 bg-blue-400 mb-1"></span>
              <span>Testing</span>
            </span>
            <span className="flex flex-col items-center">
              <span className="h-4 w-0.5 bg-cta mb-1"></span>
              <span>Production</span>
            </span>
          </div>
        </div>

        {/* Development Timeline - Mobile Responsive with Collapsible Items */}
        <div className="relative mb-10 md:mb-16">
          {/* Timeline line - Hide on very small screens */}
          <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-cta/20"></div>

          <div className="space-y-4 md:space-y-12 relative">
            {developmentPhases.map((phase, index) => (
              <div
                key={phase.id}
                className={`flex flex-col sm:flex-row ${index % 2 === 0 && 'sm:flex-row-reverse'}`}
              >
                {/* Mobile collapsible header - only visible on small screens */}
                <div
                  className="sm:hidden flex items-center justify-between mb-2 p-3 bg-panel/30 backdrop-blur-sm rounded-lg border 
                            cursor-pointer transition-colors hover:bg-panel/40 
                            border-cta/10 hover:border-cta/30"
                  onClick={() => toggleItem(phase.id)}
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3
                      ${phase.status === 'completed' ? 'bg-green-500' :
                        phase.status === 'in-progress' ? 'bg-amber-500' : 'bg-blue-400'}`}>
                      <span className="text-background text-xs font-bold">{phase.id}</span>
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-cta">{phase.title}</h3>
                      <p className="text-xs text-text/70">{phase.date}</p>
                    </div>
                  </div>
                  <div>
                    {expandedItems[phase.id] ?
                      <FaChevronUp className="text-cta" /> :
                      <FaChevronDown className="text-cta" />
                    }
                  </div>
                </div>

                {/* Mobile content - collapsible */}
                <div className={`sm:hidden transition-all duration-300 ease-in-out overflow-hidden 
                              ${expandedItems[phase.id] ? 'max-h-[500px] opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                  <div className={`
                    bg-panel/30 backdrop-blur-sm rounded-lg p-4 border transition-all
                    ${phase.status === 'completed' ? 'border-green-500/30' :
                      phase.status === 'in-progress' ? 'border-amber-500/30' : 'border-cta/10'}
                  `}>
                    <p className="text-text/80 text-sm mb-3">{phase.description}</p>

                    {/* Detailed list */}
                    <ul className="space-y-1 mt-4 border-t border-cta/10 pt-3">
                      {phase.details.map((detail, idx) => (
                        <li key={idx} className="text-sm text-text/70 flex items-start">
                          <span className="mr-2 mt-1 text-xs">
                            {phase.status === 'completed' ?
                              <FaCheck className="text-green-500" /> :
                              phase.status === 'in-progress' ?
                                <span className="inline-block w-2 h-2 rounded-full bg-amber-500"></span> :
                                <span className="inline-block w-2 h-2 rounded-full bg-blue-400"></span>
                            }
                          </span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Desktop layout - always visible on larger screens */}
                <div className="hidden sm:block w-full sm:w-1/2 px-0 sm:px-8">
                  <div className={`
                    bg-panel/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 border transition-all hover:shadow-lg hover:border-cta/30
                    ${phase.status === 'completed' ? 'border-green-500/30' :
                      phase.status === 'in-progress' ? 'border-amber-500/30' : 'border-cta/10'}
                  `}>
                    {/* Title only visible on larger screens */}
                    <div className="flex items-center mb-3">
                      <div className="mr-3 text-xl">
                        {phase.icon}
                      </div>
                      <h3 className="font-display font-bold text-cta">{phase.title}</h3>
                    </div>
                    <p className="text-text/80 text-sm mb-3">{phase.description}</p>

                    {/* Detailed list */}
                    <ul className="space-y-1 mt-4 border-t border-cta/10 pt-3">
                      {phase.details.map((detail, idx) => (
                        <li key={idx} className="text-sm text-text/70 flex items-start">
                          <span className="mr-2 mt-1 text-xs">
                            {phase.status === 'completed' ?
                              <FaCheck className="text-green-500" /> :
                              phase.status === 'in-progress' ?
                                <span className="inline-block w-2 h-2 rounded-full bg-amber-500"></span> :
                                <span className="inline-block w-2 h-2 rounded-full bg-blue-400"></span>
                            }
                          </span>
                          {detail}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 text-xs font-medium inline-block px-3 py-1 rounded-full bg-cta/10 text-cta">
                      {phase.date}
                    </div>
                  </div>
                </div>

                {/* Timeline node - only visible on larger screens */}
                <div className="hidden sm:flex absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full items-center justify-center z-10 bg-background">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center
                    ${phase.status === 'completed' ? 'bg-green-500' :
                      phase.status === 'in-progress' ? 'bg-amber-500' : 'bg-blue-400'}`}>
                    <span className="text-background text-xs font-bold">{phase.id}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Status Table - Mobile Responsive */}
        <div className="max-w-3xl mx-auto px-2 sm:px-0">
          <h3 className="text-xl sm:text-2xl font-display font-bold text-cta mb-6 text-center">Features Status</h3>

          <div className="bg-panel/30 backdrop-blur-sm rounded-lg border border-cta/10 overflow-hidden hover:border-cta/30 transition-all">
            {/* Table header */}
            <div className="grid grid-cols-3 sm:grid-cols-5 p-3 sm:p-4 border-b border-cta/10 bg-panel/50">
              <div className="col-span-2 sm:col-span-3 font-medium text-text text-sm sm:text-base">Feature</div>
              <div className="col-span-1 font-medium text-text text-center text-sm sm:text-base">Status</div>
              <div className="hidden sm:block sm:col-span-1 font-medium text-text text-center">Availability</div>
            </div>

            {/* Table rows */}
            {featuresStatus.map((feature, index) => (
              <div
                key={index}
                className={`grid grid-cols-3 sm:grid-cols-5 p-3 sm:p-4 ${index % 2 === 0 ? 'bg-background/30' : 'bg-panel/10'} hover:bg-cta/5 transition-colors`}
              >
                <div className="col-span-2 sm:col-span-3 text-text/90 text-sm sm:text-base">{feature.name}</div>
                <div className="col-span-1 flex justify-center items-center">
                  {renderStatusIcon(feature.status)}
                </div>
                <div className="hidden sm:block sm:col-span-1 text-center text-xs">
                  <span className={`px-2 py-1 rounded-full 
                    ${feature.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                      feature.status === 'in-progress' ? 'bg-amber-500/10 text-amber-500' :
                        'bg-blue-400/10 text-blue-400'}`}
                  >
                    {feature.status === 'completed' ? 'Available' :
                      feature.status === 'in-progress' ? 'In Development' : 'Coming Soon'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-10 md:mt-16">
          <a href="https://github.com/mihir-28/nexchain" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-cta hover:bg-cta/90 text-background font-medium rounded-lg transition-all transform hover:scale-105 text-sm sm:text-base">
            <FaRocket className="mr-2" />
            Join our development journey
          </a>
        </div>
      </div>

      {/* Define animations */}
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float 8s ease-in-out 1s infinite;
        }
        
        .animate-float-slow {
          animation: float 10s ease-in-out 2s infinite;
        }
        
        .animate-float-extra-slow {
          animation: float 12s ease-in-out 1.5s infinite;
        }
        
        .animate-float-extra-delay {
          animation: float 9s ease-in-out 2.5s infinite;
        }
        
        /* Additional animations with reverse direction */
        .animate-float-reverse {
          animation: float-reverse 7s ease-in-out infinite;
        }
        
        .animate-float-delay-reverse {
          animation: float-reverse 9s ease-in-out 1.2s infinite;
        }
        
        .animate-float-slow-reverse {
          animation: float-reverse 11s ease-in-out 2.3s infinite;
        }
        
        .animate-float-extra-slow-reverse {
          animation: float-reverse 13s ease-in-out 1.7s infinite;
        }
        
        .animate-float-slow-extra {
          animation: float 14s ease-in-out 0.5s infinite;
        }
        
        .animate-float-delay-extra {
          animation: float 15s ease-in-out 1.8s infinite;
        }
        
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        
        @keyframes float-reverse {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(20px) rotate(-5deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
      `}</style>
    </section>
  );
};

export default DevStatus;