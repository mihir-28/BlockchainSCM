import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaFileContract,
  FaHandshake,
  FaChartLine,
  FaShieldAlt,
  FaClock,
  FaMoneyBillWave,
  FaCheckCircle,
  FaCode
} from 'react-icons/fa';

const SmartContracts = () => {
  const [activeTab, setActiveTab] = useState('automation');

  // Sample smart contract code for display
  const sampleContract = 
    `
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract SupplyChainAgreement {
        enum Status { Created, InTransit, Delivered, Completed }
        
        struct Shipment {
            address sender;
            address receiver;
            uint256 productId;
            uint256 value;
            uint256 deliveryDeadline;
            Status status;
            bool isPaid;
        }
        
        mapping(uint256 => Shipment) public shipments;
        uint256 public shipmentCount;
        
        event ShipmentCreated(uint256 shipmentId, address sender, address receiver);
        event ShipmentInTransit(uint256 shipmentId, uint256 timestamp);
        event ShipmentDelivered(uint256 shipmentId, uint256 timestamp);
        event ShipmentCompleted(uint256 shipmentId, uint256 timestamp);
        event PaymentReleased(uint256 shipmentId, uint256 amount);
        
        function createShipment(
            address _receiver,
            uint256 _productId,
            uint256 _deliveryDeadline
        ) public payable returns (uint256) {
            shipmentCount++;
            
            shipments[shipmentCount] = Shipment({
                sender: msg.sender,
                receiver: _receiver,
                productId: _productId,
                value: msg.value,
                deliveryDeadline: _deliveryDeadline,
                status: Status.Created,
                isPaid: false
            });
            
            emit ShipmentCreated(shipmentCount, msg.sender, _receiver);
            return shipmentCount;
        }
        
        function startShipment(uint256 _shipmentId) public {
            Shipment storage shipment = shipments[_shipmentId];
            require(msg.sender == shipment.sender, "Only sender can start shipment");
            require(shipment.status == Status.Created, "Shipment already started");
            
            shipment.status = Status.InTransit;
            emit ShipmentInTransit(_shipmentId, block.timestamp);
        }
        
        function confirmDelivery(uint256 _shipmentId) public {
            Shipment storage shipment = shipments[_shipmentId];
            require(msg.sender == shipment.receiver, "Only receiver can confirm");
            require(shipment.status == Status.InTransit, "Shipment not in transit");
            
            shipment.status = Status.Delivered;
            emit ShipmentDelivered(_shipmentId, block.timestamp);
        }
        
        function completeTransaction(uint256 _shipmentId) public {
            Shipment storage shipment = shipments[_shipmentId];
            require(shipment.status == Status.Delivered, "Delivery not confirmed");
            require(!shipment.isPaid, "Payment already released");
            
            shipment.status = Status.Completed;
            shipment.isPaid = true;
            
            payable(shipment.sender).transfer(shipment.value);
            
            emit PaymentReleased(_shipmentId, shipment.value);
            emit ShipmentCompleted(_shipmentId, block.timestamp);
        }
        
        function refundLateShipment(uint256 _shipmentId) public {
            Shipment storage shipment = shipments[_shipmentId];
            require(msg.sender == shipment.receiver, "Only receiver can refund");
            require(shipment.status == Status.InTransit, "Shipment not in transit");
            require(block.timestamp > shipment.deliveryDeadline, "Deadline not passed");
            
            shipment.status = Status.Completed;
            shipment.isPaid = true;
            
            payable(shipment.receiver).transfer(shipment.value);
            
            emit PaymentReleased(_shipmentId, shipment.value);
            emit ShipmentCompleted(_shipmentId, block.timestamp);
        }
    }`;

  const tabs = [
    {
      id: 'automation',
      label: 'Automation',
      icon: <FaChartLine />,
      title: 'Automated Transactions & Agreements',
      description: 'Smart contracts eliminate intermediaries by automating transactions and enforcing agreements when predefined conditions are met.',
      benefits: [
        'Reduce payment cycles from 30+ days to minutes',
        'Eliminate costly manual verification processes',
        'Increase operational efficiency by 35-40%',
        'Remove reliance on third-party clearinghouses'
      ],
      image: 'automation-flow.svg'
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: <FaMoneyBillWave />,
      title: 'Secure & Automated Payments',
      description: 'Ensure timely, secure payments with escrow-like functionality that automatically releases funds when conditions are verified.',
      benefits: [
        'Eliminate payment disputes with transparent verification',
        'Secure funds in escrow until delivery is confirmed',
        'Automatic payments based on fulfillment of conditions',
        'Reduce accounting and reconciliation workloads'
      ],
      image: 'payment-flow.svg'
    },
    {
      id: 'compliance',
      label: 'Compliance',
      icon: <FaShieldAlt />,
      title: 'Automated Compliance & Governance',
      description: 'Encode regulatory requirements and governance rules directly into smart contracts to ensure automatic compliance.',
      benefits: [
        'Ensure adherence to legal and regulatory requirements',
        'Automatic documentation for compliance audits',
        'Reduce compliance staffing needs by up to 30%',
        'Minimize risk of non-compliance penalties'
      ],
      image: 'compliance-flow.svg'
    }
  ];

  return (
    <section id="smart-contracts" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Code pattern background */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full overflow-hidden">
            {Array(20).fill(0).map((_, i) => (
              <div key={i} className="text-xs text-cta font-mono whitespace-nowrap overflow-hidden" style={{ opacity: 1 - (i * 0.05) }}>
                {`function transfer(address _to, uint256 _value) public returns (bool success) { require(balances[msg.sender] >= _value); balances[msg.sender] -= _value; balances[_to] += _value; emit Transfer(msg.sender, _to, _value); return true; }`}
              </div>
            ))}
          </div>
        </div>

        {/* Glowing accent */}
        <div className="h-96 w-96 rounded-full bg-cta/5 blur-3xl absolute top-1/4 -right-48"></div>
        <div className="h-64 w-64 rounded-full bg-cta/5 blur-3xl absolute bottom-1/4 -left-32"></div>
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
              <FaFileContract className="text-cta text-2xl" />
            </div>

            <h2 className="text-3xl md:text-4xl font-display font-bold text-cta mb-6">
              Smart Contracts for Automation
            </h2>

            <p className="text-text/80 max-w-2xl mx-auto">
              Self-executing agreements with terms directly written into code, eliminating
              intermediaries and automating complex business processes.
            </p>
          </motion.div>

          {/* Smart contract diagram */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-20"
          >
            <div className="bg-panel/30 backdrop-blur-sm border border-cta/20 rounded-lg p-6 md:p-8">
              <h3 className="text-xl font-display font-bold text-cta mb-6">How Smart Contracts Work</h3>

              {/* Smart contract workflow diagram */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  { step: 1, title: "Contract Creation", icon: <FaFileContract />, description: "Smart contract with terms, conditions, and logic is deployed to the blockchain" },
                  { step: 2, title: "Event Trigger", icon: <FaClock />, description: "Predefined condition is met (e.g., product delivered, deadline reached)" },
                  { step: 3, title: "Verification", icon: <FaShieldAlt />, description: "Contract validates the condition using oracle data or blockchain records" },
                  { step: 4, title: "Execution", icon: <FaCode />, description: "Contract automatically executes according to its programmed instructions" },
                  { step: 5, title: "Settlement", icon: <FaHandshake />, description: "Funds transfer, ownership update, or relevant actions occur without any intermediaries" }
                ].map((item) => (
                  <div key={item.step} className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-cta/10 flex items-center justify-center text-cta mb-3">
                      {item.icon}
                    </div>

                    <h4 className="font-display font-bold text-text mb-1">{item.title}</h4>

                    <p className="text-sm text-text/70">{item.description}</p>

                    {/* Connector line (except for the last item) */}
                    {item.step < 5 && (
                      <div className="hidden md:block absolute right-0 top-1/2 w-4 h-px bg-cta/30"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tab navigation for different smart contract use cases */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2.5 rounded-full transition-all duration-300
                            ${activeTab === tab.id
                      ? 'bg-cta text-background font-medium'
                      : 'bg-panel/30 text-text/70 hover:bg-panel/50'}`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="mb-16">
              {tabs.map((tab) => (
                <motion.div
                  key={tab.id}
                  initial={false}
                  animate={{
                    opacity: activeTab === tab.id ? 1 : 0,
                    display: activeTab === tab.id ? 'block' : 'none'
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-display font-bold text-cta mb-4">
                        {tab.title}
                      </h3>

                      <p className="text-text/80 mb-6">
                        {tab.description}
                      </p>

                      <div className="bg-panel/30 backdrop-blur-sm border border-cta/10 rounded-lg p-5">
                        <h4 className="text-lg font-display font-medium text-text mb-4">Key Benefits</h4>

                        <ul className="space-y-3">
                          {tab.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-green-400 mr-2 mt-1">
                                <FaCheckCircle />
                              </span>
                              <span className="text-text/80">
                                {benefit}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-panel/20 backdrop-blur-sm rounded-lg border border-cta/10 p-6 flex items-center justify-center">
                      {/* Placeholder for tab-specific illustrations */}
                      {tab.id === 'automation' && (
                        <div className="w-full">
                          <div className="flex flex-col items-center">
                            <div className="relative w-full max-w-sm">
                              {/* Smart contract automation visualization */}
                              <div className="border-2 border-cta/30 rounded-lg p-4 bg-background/30 mb-8 relative">
                                <div className="text-sm text-text/80 font-mono mb-2">Smart Contract:</div>
                                <div className="flex items-center justify-between mb-2 text-sm text-text">
                                  <span>IF delivery_confirmed == true</span>
                                  <span className="text-cta">→</span>
                                  <span>release_payment()</span>
                                </div>
                                <div className="flex items-center justify-between mb-2 text-sm text-text">
                                  <span>IF deadline_passed == true</span>
                                  <span className="text-cta">→</span>
                                  <span>issue_penalty()</span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-text">
                                  <span>IF quality_verified == true</span>
                                  <span className="text-cta">→</span>
                                  <span>update_status()</span>
                                </div>

                                <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-0 h-0 
                                              border-l-8 border-l-transparent border-r-8 border-r-transparent 
                                              border-t-8 border-t-cta/30"></div>
                              </div>

                              <div className="grid grid-cols-3 gap-2">
                                <div className="border border-cta/20 rounded-lg p-3 bg-background/20 text-center">
                                  <div className="w-8 h-8 rounded-full bg-cta/10 flex items-center justify-center text-cta mx-auto mb-2">
                                    <FaHandshake className="text-sm" />
                                  </div>
                                  <div className="text-xs text-text/80">Payment Released</div>
                                </div>

                                <div className="border border-cta/20 rounded-lg p-3 bg-background/20 text-center">
                                  <div className="w-8 h-8 rounded-full bg-cta/10 flex items-center justify-center text-cta mx-auto mb-2">
                                    <FaMoneyBillWave className="text-sm" />
                                  </div>
                                  <div className="text-xs text-text/80">Penalty Applied</div>
                                </div>

                                <div className="border border-cta/20 rounded-lg p-3 bg-background/20 text-center">
                                  <div className="w-8 h-8 rounded-full bg-cta/10 flex items-center justify-center text-cta mx-auto mb-2">
                                    <FaCheckCircle className="text-sm" />
                                  </div>
                                  <div className="text-xs text-text/80">Status Updated</div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 text-sm text-text/60 max-w-sm text-center">
                              Smart contracts automatically execute actions when predefined conditions are met,
                              eliminating delays and human intervention
                            </div>
                          </div>
                        </div>
                      )}

                      {tab.id === 'payments' && (
                        <div className="w-full">
                          <div className="flex flex-col items-center">
                            <div className="w-full max-w-sm">
                              {/* Payment flow visualization */}
                              <div className="relative mb-12">
                                <div className="border border-cta/20 rounded-lg p-4 bg-background/30 mb-6">
                                  <div className="flex items-center mb-3">
                                    <div className="w-8 h-8 rounded-full bg-panel/60 flex items-center justify-center text-cta mr-3">
                                      <span className="text-sm">B</span>
                                    </div>
                                    <div className="text-sm text-text">Buyer</div>
                                    <div className="ml-auto text-xs bg-green-400/20 text-green-400 px-2 py-0.5 rounded">
                                      Funds Deposited
                                    </div>
                                  </div>
                                  <div className="text-xs text-text/70 bg-panel/40 p-2 rounded">
                                    500 ETH locked in smart contract escrow
                                  </div>
                                </div>

                                <div className="absolute left-1/2 transform -translate-x-1/2 h-8 w-px bg-cta/30"></div>

                                <div className="border-2 border-cta rounded-lg p-3 bg-cta/5 mb-6">
                                  <div className="text-sm text-cta font-medium text-center">
                                    Smart Contract Verifies:
                                  </div>
                                  <div className="flex items-center justify-center gap-2 mt-2">
                                    <div className="flex items-center text-xs text-text/80 bg-background/30 px-2 py-1 rounded">
                                      <FaCheckCircle className="text-green-400 mr-1" />
                                      <span>Goods Delivered</span>
                                    </div>
                                    <div className="flex items-center text-xs text-text/80 bg-background/30 px-2 py-1 rounded">
                                      <FaCheckCircle className="text-green-400 mr-1" />
                                      <span>Quality Verified</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="absolute left-1/2 transform -translate-x-1/2 h-8 w-px bg-cta/30"></div>

                                <div className="border border-cta/20 rounded-lg p-4 bg-background/30">
                                  <div className="flex items-center mb-3">
                                    <div className="w-8 h-8 rounded-full bg-panel/60 flex items-center justify-center text-cta mr-3">
                                      <span className="text-sm">S</span>
                                    </div>
                                    <div className="text-sm text-text">Supplier</div>
                                    <div className="ml-auto text-xs bg-green-400/20 text-green-400 px-2 py-0.5 rounded">
                                      Payment Received
                                    </div>
                                  </div>
                                  <div className="text-xs text-text/70 bg-panel/40 p-2 rounded">
                                    500 ETH automatically transferred to supplier
                                  </div>
                                </div>
                              </div>

                              <div className="text-sm text-text/60 text-center">
                                Smart contracts hold funds in escrow until delivery conditions are met,
                                then automatically transfer payment to the supplier
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {tab.id === 'compliance' && (
                        <div className="w-full">
                          <div className="flex flex-col items-center">
                            <div className="w-full max-w-sm">
                              {/* Compliance visualization */}
                              <div className="relative mb-8">
                                <div className="border-2 border-cta/30 rounded-lg p-4 bg-background/30 mb-6">
                                  <div className="text-sm text-text/80 font-medium mb-3 text-center">Compliance Requirements</div>
                                  <div className="space-y-2">
                                    <div className="flex items-center text-xs text-text p-2 bg-panel/40 rounded">
                                      <FaShieldAlt className="text-cta mr-2" />
                                      <span>Temperature must remain between 2-8°C</span>
                                    </div>
                                    <div className="flex items-center text-xs text-text p-2 bg-panel/40 rounded">
                                      <FaShieldAlt className="text-cta mr-2" />
                                      <span>Requires FDA certification</span>
                                    </div>
                                    <div className="flex items-center text-xs text-text p-2 bg-panel/40 rounded">
                                      <FaShieldAlt className="text-cta mr-2" />
                                      <span>Must be delivered within 72 hours</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="absolute left-1/2 transform -translate-x-1/2 h-6 flex items-center justify-center">
                                  <FaCode className="text-cta" />
                                </div>

                                <div className="border-2 border-cta rounded-lg p-4 bg-cta/5 mb-6">
                                  <div className="text-sm text-text/90 font-mono mb-2 text-center">
                                    Smart Contract Validates:
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs text-text">
                                      <span>IoT temperature data</span>
                                      <span className="bg-green-400/20 text-green-400 px-2 py-0.5 rounded">VALID</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-text">
                                      <span>Certification hash</span>
                                      <span className="bg-green-400/20 text-green-400 px-2 py-0.5 rounded">VALID</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-text">
                                      <span>Delivery timestamp</span>
                                      <span className="bg-green-400/20 text-green-400 px-2 py-0.5 rounded">VALID</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                  <div className="border border-cta/20 rounded-lg p-3 bg-background/20 text-center">
                                    <div className="text-green-400 mb-1">
                                      <FaCheckCircle className="inline" />
                                    </div>
                                    <div className="text-xs text-text/80">Shipment Approved</div>
                                  </div>

                                  <div className="border border-cta/20 rounded-lg p-3 bg-background/20 text-center">
                                    <div className="text-cta mb-1">
                                      <FaFileContract className="inline" />
                                    </div>
                                    <div className="text-xs text-text/80">Compliance Documented</div>
                                  </div>
                                </div>
                              </div>

                              <div className="text-sm text-text/60 text-center">
                                Smart contracts automatically verify and document compliance with regulatory
                                and contractual requirements, creating an immutable audit trail
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Smart contract code sample */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div className="bg-panel/30 backdrop-blur-sm rounded-lg border border-cta/20 overflow-hidden">
              <div className="border-b border-cta/10 px-6 py-4 flex items-center justify-between">
                <h3 className="text-lg font-display font-medium text-cta">SupplyChainAgreement.sol</h3>
                <div className="flex items-center">
                  <div className="text-xs text-text/60 bg-cta/10 px-3 py-1 rounded-full">
                    Solidity v0.8.0+
                  </div>
                </div>
              </div>

              <div className="overflow-auto p-6 bg-[#1e1e2e]" style={{ maxHeight: '400px' }}>
                <pre className="text-sm font-mono text-text/90 whitespace-pre leading-relaxed">
                  {sampleContract}
                </pre>
              </div>

              <div className="px-6 py-4 bg-panel/50 border-t border-cta/10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="text-sm text-text/70">
                    This smart contract handles shipment tracking, delivery confirmation, and automated payments.
                  </div>
                  <a
                    href="/documentation"
                    className="inline-flex items-center text-cta text-sm hover:text-cta/80 mt-3 md:mt-0"
                  >
                    <FaCode className="mr-2" />
                    View Full Documentation
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            {[
              { value: "90%", label: "Reduction in payment disputes", icon: <FaHandshake /> },
              { value: "40%", label: "Lower operational costs", icon: <FaChartLine /> },
              { value: "3x", label: "Faster transaction settlement", icon: <FaClock /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="bg-background/20 backdrop-blur-sm border border-cta/10 rounded-lg p-6 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cta/10 mb-4 text-cta">
                  {stat.icon}
                </div>
                <div className="text-3xl font-display font-bold text-cta mb-1">{stat.value}</div>
                <div className="text-text/80 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <a
              href="/demo"
              className="inline-flex items-center px-6 py-3 bg-cta/20 hover:bg-cta/30 text-cta border border-cta/30 
                        rounded-lg transition-all duration-300 font-medium"
            >
              <FaFileContract className="mr-2" />
              Request Smart Contract Demo
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SmartContracts;