import React from 'react';
import { FaBook, FaHeadset, FaTicketAlt, FaShieldAlt, FaBox, FaFileContract, FaChartLine } from 'react-icons/fa';
// Common support categories
export const supportCategories = [
  {
    title: "Documentation",
    icon: <FaBook className="text-2xl text-cta" />,
    description: "Comprehensive guides on how to use our platform",
    link: "/docs"
  },
  {
    title: "Contact Support",
    icon: <FaHeadset className="text-2xl text-cta" />,
    description: "Get direct assistance from our support team",
    link: "/contact"
  },
  {
    title: "Submit Ticket",
    icon: <FaTicketAlt className="text-2xl text-cta" />,
    description: "Create a support ticket for technical issues",
    link: "/support/ticket"
  }
];
// Knowledge base articles
export const knowledgeBaseArticles = [
  {
    title: "Setting Up Your First Supply Chain",
    category: "Getting Started",
    readTime: "5 min read"
  },
  {
    title: "Understanding Smart Contract Automations",
    category: "Advanced Features",
    readTime: "8 min read"
  },
  {
    title: "Configuring Access Control for Partners",
    category: "Security",
    readTime: "6 min read"
  },
  {
    title: "Analyzing Supply Chain Performance Metrics",
    category: "Analytics",
    readTime: "7 min read"
  }
];

// Quick Start Guides - Replaces Knowledge Base
export const quickStartGuides = [
  {
    id: "guide-1",
    title: "Connect Your Wallet",
    icon: <FaShieldAlt className="text-xl text-cta" />,
    category: "Getting Started",
    steps: [
      "Navigate to the top right of the dashboard and click 'Connect Wallet'",
      "Choose your preferred wallet provider (MetaMask, WalletConnect, etc.)",
      "Approve the connection request in your wallet",
      "Once connected, your wallet address will display in the header"
    ],
    tip: "For best performance, make sure you're on the Polygon network to minimize gas fees."
  },
  {
    id: "guide-2",
    title: "Create Your First Product",
    icon: <FaBox className="text-xl text-cta" />,
    category: "Product Management",
    steps: [
      "From the dashboard, select 'Products' in the sidebar",
      "Click the '+ New Product' button in the top right",
      "Fill in all required fields including product name, SKU, and description",
      "Add any product images and specifications as needed",
      "Click 'Register on Blockchain' to finalize"
    ],
    tip: "Add detailed product attributes to make tracking and verification more effective."
  },
  {
    id: "guide-3",
    title: "Create Smart Contracts",
    icon: <FaFileContract className="text-xl text-cta" />,
    category: "Advanced",
    steps: [
      "Navigate to 'Smart Contracts' from the main menu",
      "Select 'New Contract' from the options provided",
      "Choose from our template library or create a custom contract",
      "Configure contract parameters such as parties involved and conditions",
      "Preview the contract and deploy to the blockchain when ready"
    ],
    tip: "Start with our templates instead of creating contracts from scratch to ensure security best practices."
  },
  {
    id: "guide-4",
    title: "View Analytics Dashboard",
    icon: <FaChartLine className="text-xl text-cta" />,
    category: "Analytics",
    steps: [
      "Click on 'Analytics' in the main navigation",
      "Select the date range you want to analyze",
      "Choose metrics to display from the available options",
      "Toggle between different visualization types using the chart controls",
      "Export or share reports using the options in the top right"
    ],
    tip: "Set up regular analytics reports to be automatically emailed to key stakeholders."
  }
];