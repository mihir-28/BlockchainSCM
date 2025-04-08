import React from 'react';
import { motion } from 'framer-motion';
import NetworkAnimation from '../components/Common/NetworkAnimation';
import { Link } from 'react-router-dom';

const TermsPage = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Last updated date
  const lastUpdated = "March 15, 2025";

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background elements */}
      <NetworkAnimation opacity={0.1} zIndex={0} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-96 w-96 rounded-full bg-cta/5 blur-3xl absolute -top-48 -left-48"></div>
        <div className="h-96 w-96 rounded-full bg-cta/5 blur-3xl absolute -bottom-48 -right-48"></div>
      </div>

      <div className="container mx-auto px-6 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-cta mb-6">Terms of Service</h1>
          <p className="text-text/80 max-w-3xl mx-auto">
            Please read these terms carefully before using our blockchain supply chain management platform.
          </p>
          <p className="text-text/60 mt-4">Last Updated: {lastUpdated}</p>
        </motion.div>

        <div className="bg-panel/20 backdrop-blur-sm rounded-xl border border-cta/20 p-6 md:p-8 shadow-lg mb-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-cta prose-p:text-text/80"
          >
            {/* Introduction */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-display font-bold text-cta mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to NexChain ("Company", "we", "our", "us"). These Terms of Service ("Terms", "ToS") govern your use of our blockchain-based supply chain management platform accessible at nexchain.com and any related mobile applications (collectively, the "Service").
              </p>
              <p className="mb-4">
                By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Service.
              </p>
            </motion.div>

            {/* Definitions */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-display font-bold text-cta mb-4 mt-8">2. Definitions</h2>
              <p className="mb-2">For the purposes of these Terms of Service:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-text/80">
                <li><strong className="text-text">Platform</strong>: Refers to the blockchain-based supply chain management system operated by NexChain.</li>
                <li><strong className="text-text">Blockchain</strong>: A distributed ledger technology that records transactions across multiple computers.</li>
                <li><strong className="text-text">Smart Contract</strong>: Self-executing contracts with the terms directly written into code.</li>
                <li><strong className="text-text">User</strong>: Any individual or entity that accesses or uses our Service.</li>
                <li><strong className="text-text">Account</strong>: A registered profile on our Platform associated with a specific User.</li>
                <li><strong className="text-text">Transaction</strong>: Any record, transfer, or modification of data on the Platform.</li>
              </ul>
            </motion.div>

            {/* Account Terms */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-display font-bold text-cta mb-4 mt-8">3. Account Terms</h2>
              <p className="mb-2">To access and use the Service, you must:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-text/80">
                <li>Be at least 18 years of age</li>
                <li>Complete the registration process and provide accurate information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Promptly notify us of any unauthorized access to your account</li>
                <li>Be responsible for all activities that occur under your account</li>
              </ul>
              <p className="mb-4">
                We reserve the right to suspend or terminate accounts that violate these Terms or engage in fraudulent or harmful activities.
              </p>
            </motion.div>

            {/* Blockchain Specific Terms */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-display font-bold text-cta mb-4 mt-8">4. Blockchain Specific Terms</h2>
              <p className="mb-4">
                Our Service utilizes blockchain technology to provide transparent, immutable records of supply chain transactions. By using the Service, you acknowledge and agree to the following:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-text/80">
                <li>Blockchain transactions are immutable and cannot be deleted once recorded</li>
                <li>Smart contracts will automatically execute when predetermined conditions are met</li>
                <li>Transaction fees may apply for certain blockchain operations</li>
                <li>You are responsible for the accuracy of data you submit to the blockchain</li>
                <li>We cannot reverse or modify blockchain transactions once confirmed</li>
                <li>Blockchain networks may experience delays or congestion outside our control</li>
              </ul>
            </motion.div>

            {/* Data Privacy */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-display font-bold text-cta mb-4 mt-8">5. Data Privacy and Security</h2>
              <p className="mb-4">
                Your use of our Service is also governed by our <Link to="/privacy" className="text-cta hover:text-cta/80 transition-colors">Privacy Policy</Link>, which explains how we collect, use, and protect your data.
              </p>
              <p className="mb-4">
                You understand that while blockchain technology provides enhanced security, no system is completely secure. We implement industry-standard security measures but cannot guarantee absolute security.
              </p>
              <p className="mb-4">
                Some data stored on the blockchain may be publicly accessible. You are responsible for ensuring that you do not submit sensitive personal information that should not be publicly visible.
              </p>
            </motion.div>

            {/* Intellectual Property */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-display font-bold text-cta mb-4 mt-8">6. Intellectual Property</h2>
              <p className="mb-4">
                The Service, including its software, features, and content (excluding User Content), is owned by the Company and protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p className="mb-4">
                You retain ownership of the data you upload to the Platform. By uploading data, you grant us a worldwide, non-exclusive license to use, store, and process this data for the purpose of providing and improving the Service.
              </p>
              <p className="mb-4">
                Our platform may incorporate open-source software components, each subject to their respective licenses.
              </p>
            </motion.div>

            {/* Limitations of Liability */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-display font-bold text-cta mb-4 mt-8">7. Limitations of Liability</h2>
              <p className="mb-4">
                To the maximum extent permitted by law, the Company and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-text/80">
                <li>Your use or inability to use the Service</li>
                <li>Blockchain network disruptions or failures</li>
                <li>Smart contract execution errors or vulnerabilities</li>
                <li>Unauthorized access to your account or data</li>
                <li>Actions of third parties or other users</li>
                <li>Loss of profits, revenue, or business opportunities</li>
              </ul>
              <p className="mb-4">
                Our total liability for any claim arising out of these Terms shall not exceed the amount you paid to us in the 12 months preceding the claim.
              </p>
            </motion.div>

            {/* Service Modifications */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-display font-bold text-cta mb-4 mt-8">8. Service Modifications</h2>
              <p className="mb-4">
                We reserve the right to modify, suspend, or discontinue any part of the Service at any time. We will make reasonable efforts to provide notice before implementing significant changes.
              </p>
              <p className="mb-4">
                We may update these Terms from time to time. The current version will always be posted on our website. By continuing to use the Service after changes become effective, you agree to be bound by the revised Terms.
              </p>
            </motion.div>

            {/* Governing Law */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-display font-bold text-cta mb-4 mt-8">9. Governing Law</h2>
              <p className="mb-4">
                These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
              </p>
              <p className="mb-4">
                Any disputes arising from these Terms or the Service shall be resolved through arbitration in accordance with the rules of [Arbitration Association] before seeking legal recourse in courts.
              </p>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-display font-bold text-cta mb-4 mt-8">10. Contact Information</h2>
              <p className="mb-4">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="bg-background/40 p-4 rounded-lg border border-cta/10">
                <p className="mb-1">NexChain - Legal & Compliance</p>
                <p className="mb-1">Mumbai, Maharashtra, India - 421202</p>
                <p className="mb-1">Email: <a href="mailto:mihirnagda28@gmail.com" className="text-cta hover:text-cta/80 transition-colors">mihirnagda28@gmail.com</a></p>
                <p>Phone: <a href="tel:+919137461112" className="text-cta hover:text-cta/80 transition-colors">+91 91374 61112</a></p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Additional navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            to="/policy"
            className="px-6 py-3 bg-background/40 hover:bg-background/60 text-text/80 rounded-lg border border-cta/10 transition-all duration-300"
          >
            Privacy Policy
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 bg-cta/20 hover:bg-cta/30 text-cta border border-cta/30 rounded-lg transition-all duration-300"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsPage;