import React from 'react';
import { motion } from 'framer-motion';
import { FaChevronRight, FaShieldAlt, FaCheckCircle, FaQuestionCircle } from 'react-icons/fa';

const FeaturesCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-panel to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cta/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-64 h-64 bg-cta/5 rounded-full blur-2xl"></div>

        {/* Blockchain-inspired pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="blockchain-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 10L50 30L30 50L10 30L30 10Z" fill="none" stroke="currentColor" strokeWidth="1" className="text-cta" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blockchain-grid)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-cta mb-6">
              Ready to Transform Your Supply Chain?
            </h2>
            <p className="text-text/80 text-lg max-w-3xl mx-auto">
              Join industry leaders who have already embraced blockchain technology to create
              transparent, secure, and efficient supply chains. The future of supply chain
              management starts now.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-background/50 backdrop-blur-sm border border-cta/10 rounded-2xl p-8 md:p-10 shadow-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-cta mb-4">
                  Start Your Blockchain Journey
                </h3>
                <p className="text-text/80 mb-6">
                  Whether you're new to blockchain or ready to implement, our team will guide you through
                  every step of integrating our solution into your existing supply chain.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Free initial consultation and needs assessment",
                    "Customized implementation roadmap",
                    "Dedicated support team and comprehensive training",
                    "Seamless integration with existing systems"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start">
                      <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <p className="text-text/80">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="/demo"
                    className="px-6 py-3 bg-cta hover:bg-cta/90 text-background rounded-lg font-medium transition-colors flex items-center"
                  >
                    Request Demo <FaChevronRight className="ml-2" />
                  </a>
                  <a
                    href="/contact"
                    className="px-6 py-3 bg-transparent border border-cta/30 text-cta hover:bg-cta/10 rounded-lg font-medium transition-colors"
                  >
                    Contact Sales
                  </a>
                </div>
              </div>

              <div className="border-t pt-6 md:border-t-0 md:border-l md:pl-12 md:pt-0">
                <h4 className="font-display font-bold text-text mb-6">Common Questions</h4>

                <div className="space-y-4">
                  {[
                    {
                      q: "How quickly can we implement the solution?",
                      a: "Most clients achieve basic implementation in 4-6 weeks, with full integration in 2-3 months."
                    },
                    {
                      q: "Do we need blockchain expertise?",
                      a: "No. Our platform handles all the blockchain complexity, allowing you to focus on your business."
                    },
                    {
                      q: "Is it compatible with our existing systems?",
                      a: "Yes. We offer flexible APIs and integration options for all major ERP and supply chain systems."
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-background/30 rounded-lg p-4">
                      <div className="flex items-start">
                        <FaQuestionCircle className="text-cta mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium text-text mb-1">{item.q}</h5>
                          <p className="text-text/70 text-sm">{item.a}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-center md:justify-start">
                  <FaShieldAlt className="text-cta mr-2" />
                  <span className="text-text/70 text-sm">Enterprise-grade security and compliance</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-text/60 mb-4">Trusted by industry leaders worldwide</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {['Company 1', 'Company 2', 'Company 3', 'Company 4', 'Company 5'].map((company, i) => (
                <div key={i} className="opacity-50 hover:opacity-80 transition-opacity">
                  <div className="h-8 flex items-center justify-center">
                    {/* Replace with actual company logos */}
                    <div className="text-text/80 font-medium">{company}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesCTA;