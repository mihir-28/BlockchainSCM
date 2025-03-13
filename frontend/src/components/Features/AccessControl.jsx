import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaShieldAlt,
  FaUsers,
  FaUserCog,
  FaUserLock,
  FaUserCheck,
  FaIndustry,
  FaTruck,
  FaStore,
  FaUser
} from 'react-icons/fa';

const AccessControl = () => {
  const [activeRole, setActiveRole] = useState('manufacturer');

  const roles = [
    {
      id: 'manufacturer',
      title: 'Manufacturer',
      icon: <FaIndustry />,
      color: 'from-blue-500/20 to-blue-500/5',
      textColor: 'text-blue-400',
      borderColor: 'border-blue-500/30',
      description: 'Creates and registers new products on the blockchain'
    },
    {
      id: 'distributor',
      title: 'Distributor',
      icon: <FaTruck />,
      color: 'from-purple-500/20 to-purple-500/5',
      textColor: 'text-purple-400',
      borderColor: 'border-purple-500/30',
      description: 'Manages product transportation and distribution logistics'
    },
    {
      id: 'retailer',
      title: 'Retailer',
      icon: <FaStore />,
      color: 'from-emerald-500/20 to-emerald-500/5',
      textColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/30',
      description: 'Sells products to end customers and verifies authenticity'
    },
    {
      id: 'consumer',
      title: 'Consumer',
      icon: <FaUser />,
      color: 'from-amber-500/20 to-amber-500/5',
      textColor: 'text-amber-400',
      borderColor: 'border-amber-500/30',
      description: 'Purchases and verifies product information'
    },
    {
      id: 'admin',
      title: 'Admin',
      icon: <FaUserCog />,
      color: 'from-rose-500/20 to-rose-500/5',
      textColor: 'text-rose-400',
      borderColor: 'border-rose-500/30',
      description: 'Manages system settings and user permissions'
    }
  ];

  const permissionMatrix = {
    manufacturer: {
      title: 'Manufacturer Permissions',
      description: 'Complete control over product creation and initial registration',
      capabilities: [
        { action: 'Create product records', access: 'Full' },
        { action: 'Register batch information', access: 'Full' },
        { action: 'Update product specifications', access: 'Full' },
        { action: 'Transfer product ownership', access: 'Full' },
        { action: 'View production analytics', access: 'Full' },
        { action: 'View distribution chain', access: 'Partial' },
        { action: 'Access consumer information', access: 'None' },
        { action: 'Modify retail information', access: 'None' }
      ],
      keyFeatures: [
        'Digital product passport creation',
        'Materials and components tracking',
        'Production batch management',
        'Quality control verification'
      ],
      securityMeasures: [
        'Multi-signature transaction approval',
        'Hardware-secured private keys',
        'Audit logs for all product modifications',
        'Time-stamped blockchain records'
      ]
    },
    distributor: {
      title: 'Distributor Permissions',
      description: 'Logistics and transportation management across the supply chain',
      capabilities: [
        { action: 'Create product records', access: 'None' },
        { action: 'Register batch information', access: 'Partial' },
        { action: 'Update product specifications', access: 'None' },
        { action: 'Transfer product ownership', access: 'Full' },
        { action: 'View production analytics', access: 'Partial' },
        { action: 'View distribution chain', access: 'Full' },
        { action: 'Access consumer information', access: 'None' },
        { action: 'Modify retail information', access: 'None' }
      ],
      keyFeatures: [
        'Real-time shipment tracking',
        'Transfer of custody documentation',
        'Condition monitoring during transport',
        'Logistics planning and optimization'
      ],
      securityMeasures: [
        'Location-verified transactions',
        'Environmental condition validation',
        'Automated breach reporting',
        'Secure transfer acknowledgment'
      ]
    },
    retailer: {
      title: 'Retailer Permissions',
      description: 'Product sales and consumer-facing verification',
      capabilities: [
        { action: 'Create product records', access: 'None' },
        { action: 'Register batch information', access: 'None' },
        { action: 'Update product specifications', access: 'None' },
        { action: 'Transfer product ownership', access: 'Partial' },
        { action: 'View production analytics', access: 'Partial' },
        { action: 'View distribution chain', access: 'Partial' },
        { action: 'Access consumer information', access: 'Full' },
        { action: 'Modify retail information', access: 'Full' }
      ],
      keyFeatures: [
        'Product authenticity verification',
        'Customer registration management',
        'Warranty activation processing',
        'Return and recall handling'
      ],
      securityMeasures: [
        'Point-of-sale verification',
        'Customer identity protection',
        'QR code authentication',
        'Secure sales records'
      ]
    },
    consumer: {
      title: 'Consumer Permissions',
      description: 'Product verification and history access',
      capabilities: [
        { action: 'Create product records', access: 'None' },
        { action: 'Register batch information', access: 'None' },
        { action: 'Update product specifications', access: 'None' },
        { action: 'Transfer product ownership', access: 'None' },
        { action: 'View production analytics', access: 'None' },
        { action: 'View distribution chain', access: 'Partial' },
        { action: 'Access consumer information', access: 'Self Only' },
        { action: 'Modify retail information', access: 'None' }
      ],
      keyFeatures: [
        'Product authenticity verification',
        'Origin and journey visualization',
        'Warranty registration',
        'Ethical sourcing confirmation'
      ],
      securityMeasures: [
        'Read-only blockchain access',
        'Privacy-preserving verification',
        'Simplified authentication flow',
        'Selective information disclosure'
      ]
    },
    admin: {
      title: 'Admin Permissions',
      description: 'System management and security oversight',
      capabilities: [
        { action: 'Create product records', access: 'Full' },
        { action: 'Register batch information', access: 'Full' },
        { action: 'Update product specifications', access: 'Full' },
        { action: 'Transfer product ownership', access: 'Full' },
        { action: 'View production analytics', access: 'Full' },
        { action: 'View distribution chain', access: 'Full' },
        { action: 'Access consumer information', access: 'Full' },
        { action: 'Modify retail information', access: 'Full' }
      ],
      keyFeatures: [
        'User permission management',
        'System configuration control',
        'Security policy enforcement',
        'Compliance reporting'
      ],
      securityMeasures: [
        'Multi-factor authentication',
        'Action logging and audit trails',
        'Privileged access management',
        'Blockchain governance controls'
      ]
    }
  };

  const getAccessColor = (access) => {
    switch (access) {
      case 'Full':
        return 'bg-green-500/20 text-green-400';
      case 'Partial':
        return 'bg-amber-500/20 text-amber-400';
      case 'Self Only':
        return 'bg-blue-500/20 text-blue-400';
      case 'None':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  // Animation variants
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

  return (
    <section id="access-control" className="py-24 bg-panel relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full opacity-5">
          <svg viewBox="0 0 400 400" width="100%" height="100%" className="absolute top-0 left-0">
            <defs>
              <pattern id="circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="currentColor" className="text-cta" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circles)" />

            {/* Connectivity lines */}
            <g className="text-cta/20">
              <path d="M100,100 L300,300" stroke="currentColor" strokeWidth="1" />
              <path d="M100,300 L300,100" stroke="currentColor" strokeWidth="1" />
              <path d="M200,50 L200,350" stroke="currentColor" strokeWidth="1" />
              <path d="M50,200 L350,200" stroke="currentColor" strokeWidth="1" />

              <circle cx="100" cy="100" r="5" fill="currentColor" />
              <circle cx="300" cy="300" r="5" fill="currentColor" />
              <circle cx="100" cy="300" r="5" fill="currentColor" />
              <circle cx="300" cy="100" r="5" fill="currentColor" />
              <circle cx="200" cy="200" r="8" fill="currentColor" />
            </g>
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
              <FaShieldAlt className="text-cta text-2xl" />
            </div>

            <h2 className="text-3xl md:text-4xl font-display font-bold text-cta mb-6">
              Role-Based Access Control
            </h2>

            <p className="text-text/80 max-w-2xl mx-auto">
              Our blockchain platform implements a sophisticated role-based access control system,
              ensuring that each participant can only access and modify information appropriate
              for their role in the supply chain.
            </p>
          </motion.div>

          {/* Role selection */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-xl font-display font-bold text-cta mb-6 text-center">
              Supply Chain Roles & Permissions
            </h3>

            <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {roles.map((role, index) => (
                <motion.button
                  key={role.id}
                  variants={itemVariants}
                  onClick={() => setActiveRole(role.id)}
                  className={`bg-gradient-to-br ${role.color} backdrop-blur-sm border rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg
                            ${activeRole === role.id ? `${role.borderColor} border-2 shadow-lg` : 'border-cta/10'}`}
                >
                  <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3 
                                 ${activeRole === role.id ? role.textColor : 'text-text/70'} 
                                 ${activeRole === role.id ? 'bg-background/50' : 'bg-background/30'}`}>
                    {role.icon}
                  </div>

                  <h4 className={`font-display font-bold ${activeRole === role.id ? role.textColor : 'text-text'}`}>
                    {role.title}
                  </h4>

                  <p className="text-xs text-text/70 mt-1">
                    {role.description}
                  </p>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Active role permissions */}
          {roles.map((role) => (
            <motion.div
              key={role.id}
              initial={false}
              animate={{
                opacity: activeRole === role.id ? 1 : 0,
                height: activeRole === role.id ? 'auto' : 0,
                display: activeRole === role.id ? 'block' : 'none'
              }}
              transition={{ duration: 0.5 }}
              className={`bg-background/30 backdrop-blur-md rounded-xl border overflow-hidden
                        ${activeRole === role.id ? role.borderColor : 'border-cta/10'}`}
            >
              <div className={`bg-gradient-to-r ${role.color} p-6`}>
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full ${role.textColor} bg-background/40 flex items-center justify-center mr-4`}>
                    {role.icon}
                  </div>

                  <div>
                    <h3 className={`text-xl font-display font-bold ${role.textColor}`}>
                      {permissionMatrix[role.id].title}
                    </h3>
                    <p className="text-text/80 text-sm">
                      {permissionMatrix[role.id].description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Access Capabilities */}
                  <div>
                    <h4 className="text-cta font-display font-bold text-lg mb-4 flex items-center">
                      <FaUserLock className="mr-2" /> Access Capabilities
                    </h4>

                    <div className="bg-panel/30 rounded-lg overflow-hidden">
                      <div className="grid grid-cols-5 bg-panel/50 px-4 py-2 border-b border-cta/10">
                        <div className="col-span-3 text-sm font-medium text-text/80">Action</div>
                        <div className="col-span-2 text-sm font-medium text-text/80">Access Level</div>
                      </div>

                      {permissionMatrix[role.id].capabilities.map((capability, index) => (
                        <div
                          key={index}
                          className={`grid grid-cols-5 px-4 py-3 text-sm ${index % 2 === 0 ? 'bg-background/20' : ''}`}
                        >
                          <div className="col-span-3 text-text">{capability.action}</div>
                          <div className="col-span-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${getAccessColor(capability.access)}`}>
                              {capability.access}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Key Features */}
                    <div>
                      <h4 className="text-cta font-display font-bold text-lg mb-4 flex items-center">
                        <FaUserCheck className="mr-2" /> Key Features
                      </h4>

                      <ul className="bg-panel/30 rounded-lg p-4 space-y-2">
                        {permissionMatrix[role.id].keyFeatures.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="w-5 h-5 text-cta mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-text/90 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Security Measures */}
                    <div>
                      <h4 className="text-cta font-display font-bold text-lg mb-4 flex items-center">
                        <FaShieldAlt className="mr-2" /> Security Measures
                      </h4>

                      <ul className="bg-panel/30 rounded-lg p-4 space-y-2">
                        {permissionMatrix[role.id].securityMeasures.map((measure, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="w-5 h-5 text-cta mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span className="text-text/90 text-sm">{measure}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Role-based visualization */}
                {/* Make it better later */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-8 p-6 bg-gradient-to-br from-cta/10 to-transparent border border-cta/10 rounded-lg"
                >
                  <h4 className="text-cta font-display font-bold text-lg mb-4 flex items-center">
                    <FaUsers className="mr-2" /> Role Access Visualization
                  </h4>

                  <div className="aspect-video bg-panel/20 rounded-lg border border-cta/10 p-4 flex items-center justify-center overflow-hidden">
                    <div className="relative w-full max-w-xl h-64">
                      {/* Central node - Access Control System */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cta/40 to-cta/20 border-2 border-cta/70 
                                      flex items-center justify-center text-cta shadow-lg shadow-cta/10 relative">
                          <div className="absolute w-full h-full rounded-full animate-ping-slow opacity-60 
                                       bg-cta/20 border border-cta/40"></div>
                          <div className="absolute w-32 h-32 rounded-full border border-dashed border-cta/20 
                                       animate-spin-slow"></div>
                          <div className="absolute w-40 h-40 rounded-full border border-dashed border-cta/10 
                                       animate-spin-slow-reverse"></div>
                          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <div className="text-center mt-2">
                          <div className="text-cta font-medium">Access Control</div>
                          <div className="text-text/50 text-xs">Smart Contract</div>
                        </div>
                      </div>

                      {/* Orbit path */}
                      <div className="absolute top-1/2 left-1/2 w-[280px] h-[280px] -translate-x-1/2 -translate-y-1/2 
                                    rounded-full border border-cta/10"></div>

                      {/* Connecting nodes */}
                      {roles.map((r, index) => {
                        // Calculate position in a circle
                        const angle = (index * (2 * Math.PI)) / roles.length;
                        const radius = 140;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;

                        const isActive = r.id === activeRole;

                        // Calculate data flow particles
                        const particles = isActive ? 3 : 0;

                        return (
                          <div key={r.id}>
                            {/* Connection line */}
                            <div
                              className={`absolute top-1/2 left-1/2 h-[2px] origin-left ${isActive ? `bg-gradient-to-r from-cta/80 via-${r.textColor.replace('text-', '')}/70 to-${r.textColor.replace('text-', '')}/50`
                                : 'bg-text/10'
                                }`}
                              style={{
                                width: `${radius}px`,
                                transform: `translate(-50%, -50%) rotate(${angle}rad)`
                              }}
                            >
                              {/* Animated data flow particles */}
                              {isActive && Array.from({ length: particles }).map((_, i) => (
                                <div
                                  key={i}
                                  className={`absolute top-1/2 h-1 w-1 rounded-full ${r.textColor} -translate-y-1/2
                                            animate-flow-particle shadow-sm shadow-cta/50`}
                                  style={{
                                    left: `${15 + i * 30}%`,
                                    animationDelay: `${i * 0.8}s`,
                                    animationDuration: '3s'
                                  }}
                                ></div>
                              ))}
                            </div>

                            {/* Role node */}
                            <div
                              className={`absolute w-16 h-16 transition-all duration-500
                                        ${isActive
                                  ? `${r.textColor} shadow-lg shadow-${r.textColor.replace('text-', '')}/20`
                                  : 'text-text/50'}`}
                              style={{
                                top: `calc(50% + ${y}px)`,
                                left: `calc(50% + ${x}px)`,
                                transform: 'translate(-50%, -50%)'
                              }}
                            >
                              <div className={`w-full h-full rounded-full flex flex-col items-center justify-center
                                            ${isActive
                                  ? `bg-gradient-to-br ${r.color} border-2 ${r.borderColor}`
                                  : 'bg-background/30 border border-text/20'}`}
                              >
                                <div className={`text-2xl ${isActive ? '' : 'opacity-60'}`}>{r.icon}</div>
                              </div>

                              <div className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap
                                            text-xs font-medium ${isActive ? r.textColor : 'text-text/40'}`}>
                                {r.title}
                              </div>

                              {/* Permission halo - only visible for active role */}
                              {isActive && (
                                <>
                                  <div className={`absolute inset-0 rounded-full border ${r.borderColor} 
                                                animate-ping-slow opacity-60`}></div>
                                  <div className="absolute -inset-2 rounded-full border border-dashed border-cta/20"></div>
                                </>
                              )}

                              {/* Small permission indicators */}
                              {isActive && (
                                <div className="absolute -inset-10 pointer-events-none">
                                  {permissionMatrix[r.id].capabilities
                                    .filter(cap => cap.access !== 'None')
                                    .slice(0, 4) // Limit to prevent overcrowding
                                    .map((cap, i) => {
                                      // Position in mini-orbit around role node
                                      const miniAngle = (i * (2 * Math.PI)) / 4;
                                      const miniRadius = 30;
                                      const miniX = Math.cos(miniAngle) * miniRadius;
                                      const miniY = Math.sin(miniAngle) * miniRadius;

                                      let bgColor = 'bg-gray-500/20';
                                      if (cap.access === 'Full') bgColor = 'bg-green-500/20';
                                      if (cap.access === 'Partial') bgColor = 'bg-amber-500/20';
                                      if (cap.access === 'Self Only') bgColor = 'bg-blue-500/20';

                                      return (
                                        <div
                                          key={i}
                                          className={`absolute w-4 h-4 ${bgColor} rounded-full border border-cta/20
                                                    flex items-center justify-center text-[8px] text-cta/80`}
                                          style={{
                                            top: `calc(50% + ${miniY}px)`,
                                            left: `calc(50% + ${miniX}px)`,
                                            transform: 'translate(-50%, -50%)'
                                          }}
                                        >
                                          {cap.access[0]}
                                        </div>
                                      );
                                    })}
                                </div>
                              )}
                            </div>

                            {/* Permission metrics bar - only for active role */}
                            {isActive && (
                              <div
                                className="absolute h-[60px] w-[100px] bg-background/40 backdrop-blur-sm
                                          rounded border border-cta/10 flex flex-col justify-center px-2"
                                style={{
                                  top: `calc(50% + ${y}px)`,
                                  left: `calc(50% + ${x}px)`,
                                  transform: `translate(${x > 0 ? '20px' : '-120px'}, ${y > 0 ? '30px' : '-90px'})`,
                                }}
                              >
                                <div className="text-[10px] text-text/60 mb-1">Permission Level</div>
                                <div className="h-1 bg-background/50 rounded overflow-hidden">
                                  <div
                                    className={`h-full ${r.id === 'admin'
                                      ? 'bg-gradient-to-r from-green-500 to-green-400'
                                      : r.id === 'consumer'
                                        ? 'bg-gradient-to-r from-red-500 to-red-400 w-[25%]'
                                        : 'bg-gradient-to-r from-amber-500 to-amber-400 w-[60%]'
                                      }`}
                                  ></div>
                                </div>
                                <div className="flex justify-between text-[9px] mt-1">
                                  <span>None</span>
                                  <span>Partial</span>
                                  <span>Full</span>
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                  <div className="text-[10px] text-text/60">Security</div>
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <div
                                        key={i}
                                        className={`w-1.5 h-1.5 rounded-full mx-0.5 ${i < (r.id === 'admin' ? 5 : r.id === 'consumer' ? 2 : 3)
                                          ? 'bg-cta'
                                          : 'bg-background/30'
                                          }`}
                                      ></div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* Access controller indicators */}
                      <div className="absolute top-0 left-0 w-full flex justify-center">
                        <div className="bg-background/30 backdrop-blur-sm border border-cta/20 rounded px-3 py-1
                                      flex items-center text-xs text-text/70">
                          <svg className="w-3 h-3 text-cta mr-1" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z"></path>
                          </svg>
                          <span>Blockchain-secured role verification</span>
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full ml-2 
                                         animate-pulse"></span>
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                        <div className="grid grid-cols-3 gap-3 bg-background/30 backdrop-blur-sm
                                      border border-cta/10 rounded px-3 py-1 text-[10px] text-text/70">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-green-400 mr-1"></div>
                            <span>Full Access</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-amber-400 mr-1"></div>
                            <span>Partial Access</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-red-400 mr-1"></div>
                            <span>No Access</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                title: "Data Security",
                description: "Control who can access, modify, or view sensitive information throughout the supply chain.",
                icon: <FaShieldAlt className="text-cta" />
              },
              {
                title: "Compliance Management",
                description: "Enforce regulatory requirements by controlling data access based on authorization levels.",
                icon: <FaUserCheck className="text-cta" />
              },
              {
                title: "Simplified Onboarding",
                description: "Add new partners with predefined roles and permissions for immediate secure participation.",
                icon: <FaUsers className="text-cta" />
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-background/30 backdrop-blur-sm border border-cta/10 rounded-lg p-6
                          hover:border-cta/30 hover:shadow-lg hover:shadow-cta/5 transition-all duration-300"
              >
                <div className="bg-cta/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>

                <h3 className="text-xl font-display font-bold text-cta mb-3">{benefit.title}</h3>

                <p className="text-text/80 text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
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
              <FaShieldAlt className="mr-2" />
              Schedule Security Consultation
            </a>
          </motion.div>
        </div>
      </div>
      {/* Add these animations to your CSS or tailwind config */}
      <style jsx>
        {`
          @keyframes ping-slow {
            0% {
              transform: scale(1);
              opacity: 0.8;
            }
            70% {
              transform: scale(1.1);
              opacity: 0.2;
            }
            100% {
              transform: scale(1);
              opacity: 0.8;
            }
          }
          @keyframes spin-slow {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          @keyframes spin-slow-reverse {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(-360deg);
            }
          }
          @keyframes flow-particle {
            0% {
              left: 0%;
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              left: 100%;
              opacity: 0;
            }
          }
          .animate-ping-slow {
            animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
          .animate-spin-slow {
            animation: spin-slow 12s linear infinite;
          }
          .animate-spin-slow-reverse {
            animation: spin-slow-reverse 20s linear infinite;
          }
          .animate-flow-particle {
            animation: flow-particle 3s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default AccessControl;