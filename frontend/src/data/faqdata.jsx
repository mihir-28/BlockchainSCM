import { FaQuestion, FaWallet, FaBox, FaShieldAlt, FaCog } from 'react-icons/fa';
import React from 'react';

// FAQ Categories with icons
export const categories = [
  { id: 'general', name: 'General', icon: <FaQuestion /> },
  { id: 'wallet', name: 'Wallet & Connectivity', icon: <FaWallet /> },
  { id: 'products', name: 'Products & Tracking', icon: <FaBox /> },
  { id: 'security', name: 'Security & Privacy', icon: <FaShieldAlt /> },
  { id: 'technical', name: 'Technical', icon: <FaCog /> }
];

// Comprehensive FAQ data organized by category
export const faqData = {
  general: [
    {
      id: 'general-1',
      question: "What is NexChain?",
      answer: "NexChain is a blockchain-based supply chain management platform that provides end-to-end visibility, traceability, and security for your supply chain operations. Our solution leverages blockchain technology to create immutable records of product journeys from production to delivery."
    },
    {
      id: 'general-2',
      question: "How quickly do you respond to inquiries?",
      answer: "We typically respond to all inquiries within 24-48 business hours. For urgent matters, please indicate this in your subject line when contacting us through our support channels."
    },
    {
      id: 'general-3',
      question: "Do you offer technical support?",
      answer: "Yes, we provide technical support for all our blockchain solutions. Our support team is available Monday through Friday from 9 AM to 6 PM IST. Enterprise customers receive priority support with dedicated response times."
    },
    {
      id: 'general-4',
      question: "Can I schedule a demo of your platform?",
      answer: "Absolutely! Use the contact form to request a demo, and our sales team will coordinate a time that works for you. We offer both live guided demos and self-paced demo environments depending on your preference."
    }
  ],
  wallet: [
    {
      id: 'wallet-1',
      question: "How do I connect my MetaMask wallet?",
      answer: "To connect your MetaMask wallet, click on 'Connect Wallet' in the top navigation. When prompted, select MetaMask from the available options. You'll need to approve the connection request in your MetaMask extension. For mobile users, you can access the dashboard directly through WalletConnect integration."
    },
    {
      id: 'wallet-2',
      question: "What blockchain networks are supported?",
      answer: "Currently, our platform supports Ethereum Mainnet, Polygon, and Binance Smart Chain (BSC). We're working on adding support for additional networks in future updates. Make sure your wallet is configured to use one of these supported networks."
    },
    {
      id: 'wallet-3',
      question: "What are the gas fees for transactions?",
      answer: "Gas fees vary depending on the blockchain network you're using and current network congestion. Our platform displays estimated gas fees before you confirm any transaction. For enterprise users on our premium plans, we offer optimized batch transactions to reduce overall gas costs."
    },
    {
      id: 'wallet-4',
      question: "What if I don't have a cryptocurrency wallet?",
      answer: "You can still use many features of our platform without a cryptocurrency wallet. For enterprise users, we offer custodial wallet solutions and gas fee abstraction to simplify the onboarding process. Contact our sales team for more information on these options."
    }
  ],
  products: [
    {
      id: 'products-1',
      question: "How do I register a new product on the blockchain?",
      answer: "After logging in, navigate to the Dashboard and select 'Products' from the sidebar. Click on 'Register New Product' and fill in all required fields. Once submitted, the product information will be recorded on the blockchain. You'll receive a confirmation when the transaction is complete."
    },
    {
      id: 'products-2',
      question: "How can I verify product authenticity?",
      answer: "You can verify product authenticity by scanning the QR code on the product or packaging. This will take you to a verification page showing the complete history and origin of the product. Alternatively, you can enter the product ID in the verification section of our platform."
    },
    {
      id: 'products-3',
      question: "Can I track my product's journey in real-time?",
      answer: "Yes, our platform provides real-time tracking of products throughout the supply chain. Each time a product changes hands or location, the information is updated on the blockchain. You can view this information in the product's timeline view in your dashboard."
    },
    {
      id: 'products-4',
      question: "How do I update product information?",
      answer: "You can update product information by navigating to the product details page in your dashboard and clicking 'Edit Information'. Note that while some fields can be updated, the blockchain maintains a complete history of all changes for transparency and audit purposes."
    }
  ],
  security: [
    {
      id: 'security-1',
      question: "How secure is my supply chain data?",
      answer: "Your supply chain data is secured using military-grade encryption and stored on decentralized blockchain networks. Access to data is controlled through smart contracts with granular permissions. We never store private keys, and all sensitive operations require explicit user authorization."
    },
    {
      id: 'security-2',
      question: "Who can see my product data?",
      answer: "Only authorized users with explicit permissions can access your product data. Our platform uses role-based access control to ensure that each participant in the supply chain can only see the information relevant to their role. As the administrator, you have full control over these permissions."
    },
    {
      id: 'security-3',
      question: "Is my data backed up?",
      answer: "Yes, blockchain technology inherently provides data redundancy as information is stored across multiple nodes in the network. Additionally, we maintain secure backups of non-blockchain data following industry best practices for data protection and disaster recovery."
    },
    {
      id: 'security-4',
      question: "How do you handle data privacy compliance?",
      answer: "We are compliant with GDPR, CCPA, and other regional data protection regulations. We implement privacy by design principles, including data minimization, purpose limitation, and giving users control over their personal data. For detailed information, please refer to our Privacy Policy."
    }
  ],
  technical: [
    {
      id: 'technical-1',
      question: "Do you offer customized blockchain solutions?",
      answer: "Yes, we specialize in customized blockchain solutions tailored to your supply chain's specific needs and requirements. Our team can work with you to develop custom smart contracts, integrations with existing systems, and specialized tracking mechanisms for unique use cases."
    },
    {
      id: 'technical-2',
      question: "Can I integrate NexChain with my existing ERP system?",
      answer: "Yes, we provide APIs and integration tools to connect NexChain with popular ERP systems including SAP, Oracle, and Microsoft Dynamics. Our development team can work with you to create custom integrations for other systems as needed."
    },
    {
      id: 'technical-3',
      question: "What is the system uptime guarantee?",
      answer: "We guarantee 99.9% uptime for our platform services. While blockchain networks themselves may occasionally experience congestion, our infrastructure is designed with redundancy and failover mechanisms to ensure continuous availability of core services."
    },
    {
      id: 'technical-4',
      question: "How are smart contracts audited for security?",
      answer: "All our smart contracts undergo rigorous security audits by independent third-party security firms before deployment. We follow secure development practices and regularly update our contracts to address potential vulnerabilities as they are discovered in the wider blockchain ecosystem."
    }
  ]
};