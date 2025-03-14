import { FaRoute, FaClipboardCheck, FaChartBar, FaShieldAlt, FaExchangeAlt, FaUserShield } from 'react-icons/fa';

const features = [
  {
      icon: <FaRoute className="text-4xl text-cta" />,
      title: "Product Tracking",
      description: "Track products in real-time throughout the entire supply chain with immutable blockchain records."
  },
  {
      icon: <FaClipboardCheck className="text-4xl text-cta" />,
      title: "Transaction Logging",
      description: "Secure, transparent logging of all transactions and handoffs between supply chain partners."
  },
  {
      icon: <FaChartBar className="text-4xl text-cta" />,
      title: "Real-Time Analytics",
      description: "Comprehensive analytics dashboard providing insights into supply chain performance."
  },
  {
      icon: <FaShieldAlt className="text-4xl text-cta" />,
      title: "Enhanced Security",
      description: "Military-grade encryption and decentralized storage protecting your supply chain data."
  },
  {
      icon: <FaExchangeAlt className="text-4xl text-cta" />,
      title: "Smart Contracts",
      description: "Automated execution of agreements when predefined conditions are met, reducing delays."
  },
  {
      icon: <FaUserShield className="text-4xl text-cta" />,
      title: "Access Control",
      description: "Granular permissions ensuring partners only access the information they need."
  },
];

export default features;