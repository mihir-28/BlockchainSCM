import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaCalendarAlt, FaFileAlt, FaEnvelope, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import NetworkAnimation from '../Common/NetworkAnimation';

const AboutCTA = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };

  const faqs = [
    {
      question: "How long does implementation typically take?",
      answer: "Implementation timelines vary based on your existing systems and complexity, but most clients are up and running within 4-6 weeks. Our phased approach allows you to start seeing benefits quickly while we gradually expand functionality."
    },
    {
      question: "Is this solution suitable for small to medium enterprises?",
      answer: "Absolutely! We offer scalable solutions tailored to businesses of all sizes. For SMEs, we provide streamlined implementation options that focus on core features with the ability to expand as your business grows."
    },
    {
      question: "How does the system integrate with our existing software?",
      answer: "Our platform features robust APIs and pre-built connectors for common ERP, WMS, and CRM systems. For custom integrations, our technical team works directly with your IT department to ensure seamless data flow between systems."
    },
    {
      question: "What kind of ROI can we expect?",
      answer: "Most clients see ROI within 6-12 months of full implementation. Key metrics include reduced fraud costs (avg. 85% reduction), improved inventory accuracy (up to 99%), faster payment cycles, and reduced administrative overhead for compliance and documentation."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <NetworkAnimation opacity={0.1} color="20, 184, 166" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-cta/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cta/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-panel/80 to-panel backdrop-blur-lg rounded-2xl overflow-hidden border border-cta/20 shadow-xl shadow-cta/5"
          >
            <div className="p-2">
              <div className="bg-background/40 backdrop-blur rounded-xl p-8 md:p-12">
                <div className="text-center mb-12">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="inline-block bg-cta/20 text-cta px-4 py-1.5 rounded-full text-sm font-medium mb-4"
                  >
                    Ready to Transform Your Supply Chain?
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-3xl md:text-4xl font-display font-bold text-cta mb-4"
                  >
                    Start Your Blockchain Journey Today
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-text/80 max-w-2xl mx-auto"
                  >
                    Implement our blockchain solution to gain unprecedented security, transparency, and efficiency in your supply chain operations.
                  </motion.p>
                </div>

                {/* Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      icon: <FaRocket />,
                      title: "Request Demo",
                      description: "See our platform in action with a personalized demo",
                      link: "/request-demo",
                      color: "from-cta/30 to-cta/10",
                      delay: 0.1
                    },
                    {
                      icon: <FaCalendarAlt />,
                      title: "Schedule Consultation",
                      description: "Discuss your specific needs with our experts",
                      link: "/consultation",
                      color: "from-cta/25 to-cta/5",
                      delay: 0.2
                    },
                    {
                      icon: <FaFileAlt />,
                      title: "Download Whitepaper",
                      description: "Explore the technical details of our solution",
                      link: "/whitepaper",
                      color: "from-cta/20 to-cta/5",
                      delay: 0.3
                    },
                    {
                      icon: <FaEnvelope />,
                      title: "Contact Sales",
                      description: "Get pricing and implementation information",
                      link: "/contact",
                      color: "from-cta/15 to-cta/5",
                      delay: 0.4
                    }
                  ].map((card, index) => (
                    // Updated card component with enhanced hover effects
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: card.delay + 0.3 }}
                      className={`bg-gradient-to-br ${card.color} backdrop-blur rounded-lg p-6 border border-cta/10
                                  hover:bg-cta/10 hover:border-cta/30 hover:shadow-lg transition-all duration-300 group`}
                    >
                      <div className="flex flex-col h-full">
                        {/* Updated icon container with more reliable hover effect */}
                        <div 
                          className="bg-background/30 w-12 h-12 rounded-full flex items-center justify-center text-cta mb-4
                                     border border-transparent transition-all duration-300
                                     group-hover:bg-background/50 group-hover:text-background group-hover:border-background/20">
                          {card.icon}
                        </div>

                        <h3 className="text-xl font-display font-bold text-cta mb-2">{card.title}</h3>

                        <p className="text-text/80 text-sm mb-4 flex-grow">
                          {card.description}
                        </p>

                        <a
                          href={card.link}
                          className="inline-flex items-center text-cta font-medium text-sm"
                        >
                          Get Started
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20"
          >
            <div className="text-center mb-10">
              <h3 className="text-2xl font-display font-bold text-cta mb-4">Frequently Asked Questions</h3>
              <p className="text-text/80 max-w-2xl mx-auto">
                Common questions about implementing our blockchain solution for supply chain management
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="bg-panel/30 backdrop-blur-sm border border-cta/10 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none"
                  >
                    <span className="font-display font-medium text-text">{faq.question}</span>
                    <span className="text-cta ml-4">
                      {expandedFaq === index ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{ height: expandedFaq === index ? "auto" : 0, opacity: expandedFaq === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-text/80">
                      {faq.answer}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Final CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 text-center"
            >
              <p className="text-text/80 mb-6">Still have questions about our blockchain supply chain solution?</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-cta text-background font-medium rounded-lg hover:bg-cta/90 transition-colors duration-300"
                >
                  Contact Our Team
                </a>
                <a
                  href="/resources"
                  className="inline-flex items-center justify-center px-6 py-3 bg-background/20 text-text border border-cta/20 font-medium rounded-lg hover:bg-cta/10 transition-colors duration-300"
                >
                  Browse Resources
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Partners Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20"
          >
            <div className="text-center mb-8">
              <h4 className="text-lg font-display font-medium text-text/70">Trusted by Industry Leaders</h4>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {[1, 2, 3, 4, 5].map((partner) => (
                <div key={partner} className="flex items-center justify-center h-12">
                  <div className="w-24 h-8 bg-gradient-to-r from-panel/70 to-panel/30 rounded-md opacity-70 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;