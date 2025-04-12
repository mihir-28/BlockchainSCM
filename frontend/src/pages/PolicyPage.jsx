import React from 'react';
import { motion } from 'framer-motion';
import NetworkAnimation from '../components/Common/NetworkAnimation';
import { Link } from 'react-router-dom';

const PolicyPage = () => {
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
          <h1 className="text-4xl md:text-5xl font-display font-bold text-cta mb-6">Privacy Policy</h1>
          <p className="text-text/80 max-w-3xl mx-auto">
            This policy describes how NexChain collects, uses, and protects your information when using our blockchain supply chain management platform.
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
                NexChain ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our blockchain-based supply chain management platform.
              </p>
              <p className="mb-4">
                We understand the importance of privacy in a blockchain environment and have designed our practices to balance transparency with appropriate privacy controls. By using our Service, you consent to the data practices described in this policy.
              </p>
            </motion.div>

            {/* Information We Collect */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-display font-bold text-cta mb-4 mt-8">2. Information We Collect</h2>
              <p className="mb-2">We collect the following types of information:</p>

              <h3 className="text-xl font-display font-bold text-cta/90 mb-2 mt-4">2.1 Personal Information</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-text/80">
                <li><strong className="text-text">Account Information:</strong> Name, email address, company details, and role/position.</li>
                <li><strong className="text-text">Profile Information:</strong> Profile picture, biography, and professional credentials.</li>
                <li><strong className="text-text">Contact Information:</strong> Phone number, address, and other contact details.</li>
                <li><strong className="text-text">Payment Information:</strong> Payment method details, billing address, and transaction history.</li>
              </ul>

              <h3 className="text-xl font-display font-bold text-cta/90 mb-2 mt-4">2.2 Supply Chain Data</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-text/80">
                <li><strong className="text-text">Product Information:</strong> Product details, specifications, origin, and manufacturing data.</li>
                <li><strong className="text-text">Transaction Data:</strong> Records of supply chain movements, transfers, and status changes.</li>
                <li><strong className="text-text">Compliance Documentation:</strong> Certificates, audit results, and regulatory documentation.</li>
                <li><strong className="text-text">Logistics Data:</strong> Shipping routes, delivery timestamps, and transport conditions.</li>
              </ul>

              <h3 className="text-xl font-display font-bold text-cta/90 mb-2 mt-4">2.3 Technical Data</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-text/80">
                <li><strong className="text-text">Device Information:</strong> IP address, browser type, operating system, and device identifiers.</li>
                <li><strong className="text-text">Usage Data:</strong> Time spent on the platform, features used, and interaction patterns.</li>
                <li><strong className="text-text">Blockchain Identifiers:</strong> Public keys and transaction identifiers.</li>
                <li><strong className="text-text">Cookies and Similar Technologies:</strong> Data collected through cookies, pixel tags, and similar technologies.</li>
              </ul>
            </motion.div>

            {/* Blockchain Data Specifics */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-display font-bold text-cta mb-4 mt-8">3. Blockchain Data Considerations</h2>
              <p className="mb-4">
                Our service leverages blockchain technology, which has unique privacy implications. Please note the following:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-text/80">
                <li><strong className="text-text">Immutability:</strong> Data recorded on the blockchain cannot be deleted or modified. Consider carefully what information you choose to record.</li>
                <li><strong className="text-text">Transparency:</strong> Depending on the blockchain configuration, certain data may be visible to other participants in the network.</li>
                <li><strong className="text-text">Pseudonymity:</strong> While blockchain transactions are linked to cryptographic identifiers rather than directly to personal identities, correlation attacks may potentially de-anonymize transaction patterns.</li>
                <li><strong className="text-text">Off-Chain Storage:</strong> Sensitive personal data is stored off-chain with appropriate protections, with only references or hash values stored on the blockchain.</li>
              </ul>
            </motion.div>

            {/* How We Use Your Information */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-display font-bold text-cta mb-4 mt-8">4. How We Use Your Information</h2>
              <p className="mb-2">We use the collected information for the following purposes:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-text/80">
                <li>To provide, maintain, and improve our platform services</li>
                <li>To process transactions and manage supply chain records</li>
                <li>To verify identity and authenticate users on the platform</li>
                <li>To enable traceability and transparency in supply chains</li>
                <li>To facilitate communication between supply chain partners</li>
                <li>To generate analytics and insights about supply chain operations</li>
                <li>To send notifications, updates, and support messages</li>
                <li>To prevent fraud and ensure platform security</li>
                <li>To comply with legal obligations and enforce our terms</li>
              </ul>
            </motion.div>

            {/* Data Sharing */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-display font-bold text-cta mb-4 mt-8">5. Sharing Your Information</h2>
              <p className="mb-4">
                We may share your information with the following categories of recipients:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-text/80">
                <li><strong className="text-text">Supply Chain Partners:</strong> Information relevant to supply chain transactions may be shared with authorized partners in your supply network.</li>
                <li><strong className="text-text">Service Providers:</strong> We engage trusted third parties to perform functions and provide services to us, such as cloud hosting, data analytics, payment processing, and customer support.</li>
                <li><strong className="text-text">Blockchain Network:</strong> Transaction data is recorded on the blockchain and shared according to the network's consensus protocol.</li>
                <li><strong className="text-text">Legal Requirements:</strong> We may disclose information if required by law, regulation, legal process, or governmental request.</li>
                <li><strong className="text-text">Business Transfers:</strong> In connection with a merger, acquisition, reorganization, or sale of assets, user information may be transferred as a business asset.</li>
              </ul>
              <p className="mb-4">
                We do not sell your personal information to third parties for marketing purposes.
              </p>
            </motion.div>

            {/* Data Security */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-display font-bold text-cta mb-4 mt-8">6. Data Security</h2>
              <p className="mb-4">
                We implement appropriate technical and organizational measures to protect your information, including:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-text/80">
                <li>Encryption of sensitive data both in transit and at rest</li>
                <li>Multi-factor authentication for account access</li>
                <li>Regular security assessments and penetration testing</li>
                <li>Access controls limiting data access to authorized personnel</li>
                <li>Blockchain security measures including consensus mechanisms and cryptographic validation</li>
                <li>Regular security training for our team members</li>
              </ul>
              <p className="mb-4">
                While we strive to use commercially acceptable means to protect your information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.
              </p>
            </motion.div>

            {/* Your Rights and Choices */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-display font-bold text-cta mb-4 mt-8">7. Your Rights and Choices</h2>
              <p className="mb-2">You have certain rights regarding your personal information, including:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-text/80">
                <li><strong className="text-text">Access:</strong> You can request copies of your personal information that we hold.</li>
                <li><strong className="text-text">Correction:</strong> You may request that we correct inaccurate information about you.</li>
                <li><strong className="text-text">Deletion:</strong> You may request deletion of certain personal information (subject to blockchain immutability limitations).</li>
                <li><strong className="text-text">Objection:</strong> You may object to our processing of your information based on our legitimate interests.</li>
                <li><strong className="text-text">Restriction:</strong> You may request that we restrict processing of your personal information.</li>
                <li><strong className="text-text">Portability:</strong> You may request a machine-readable copy of your information to transfer to another service.</li>
                <li><strong className="text-text">Consent Withdrawal:</strong> You may withdraw consent at any time where we rely on consent to process your information.</li>
              </ul>
              <p className="mb-4">
                Please note that due to the immutable nature of blockchain technology, it may not be possible to completely delete all information once it has been recorded on the blockchain. However, we can delete personal information from our off-chain systems.
              </p>
            </motion.div>

            {/* Cookies and Tracking */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-display font-bold text-cta mb-4 mt-8">8. Cookies and Tracking Technologies</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to collect information about your browsing activities and to remember your preferences. These technologies help us provide a better user experience, analyze our service usage, and deliver targeted content.
              </p>
              <p className="mb-4">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
              </p>
            </motion.div>

            {/* International Data Transfers */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-display font-bold text-cta mb-4 mt-8">9. International Data Transfers</h2>
              <p className="mb-4">
                We operate globally and may transfer your information to locations outside your country of residence, including countries that may have different data protection rules. We ensure appropriate safeguards are in place to protect your information and comply with applicable regulations.
              </p>
              <p className="mb-4">
                When we transfer personal data from the European Economic Area, we implement standard contractual clauses approved by the European Commission and other appropriate safeguards.
              </p>
            </motion.div>

            {/* Children's Privacy */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-display font-bold text-cta mb-4 mt-8">10. Children's Privacy</h2>
              <p className="mb-4">
                Our Service is not intended for children under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us, and we will take appropriate steps to remove that information.
              </p>
            </motion.div>

            {/* Changes to This Privacy Policy */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-display font-bold text-cta mb-4 mt-8">11. Changes to This Privacy Policy</h2>
              <p className="mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
              <p className="mb-4">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-display font-bold text-cta mb-4 mt-8">12. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact our Data Protection Officer at:
              </p>
              <div className="bg-background/40 p-4 rounded-lg border border-cta/10">
                <p className="mb-1">NexChain - Data Protection</p>
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
            to="/terms-of-service"
            className="px-6 py-3 bg-background/40 hover:bg-background/60 text-text/80 rounded-lg border border-cta/10 transition-all duration-300"
          >
            Terms of Service
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

export default PolicyPage;