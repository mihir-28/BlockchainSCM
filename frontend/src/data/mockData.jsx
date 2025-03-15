import React from 'react';
import { FaBox, FaExchangeAlt, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

// Mock data for dashboard
export const recentTransactions = [
  { id: 'TX9802342', type: 'Product Registration', status: 'Confirmed', timestamp: '2023-06-15 14:32:45', hash: '0x7fe2...93a1' },
  { id: 'TX9802341', type: 'Ownership Transfer', status: 'Pending', timestamp: '2023-06-15 13:45:22', hash: '0x8ad1...76c2' },
  { id: 'TX9802340', type: 'Verification Request', status: 'Confirmed', timestamp: '2023-06-15 11:20:18', hash: '0x6fc3...12d4' },
  { id: 'TX9802339', type: 'Product Update', status: 'Failed', timestamp: '2023-06-15 09:15:31', hash: '0x5ab2...89e7' },
];

export const kpiData = [
  { title: 'Active Products', value: '143', change: '+12%', isPositive: true, icon: <FaBox className="text-xl" /> },
  { title: 'Transactions Today', value: '27', change: '+5%', isPositive: true, icon: <FaExchangeAlt className="text-xl" /> },
  { title: 'Success Rate', value: '98.2%', change: '-0.5%', isPositive: false, icon: <FaCheckCircle className="text-xl" /> },
  { title: 'Failed Transactions', value: '3', change: '+2', isPositive: false, icon: <FaExclamationTriangle className="text-xl" /> }
];

// Sample products data
export const products = [
  {
    id: 'PRD001',
    name: 'Organic Coffee Beans',
    manufacturer: 'Coffee Producers Inc.',
    origin: 'Colombia',
    registrationDate: '2023-05-15',
    status: 'Active',
    transactionHash: '0x7c8b5d29cb3fa8ec13a47454681b3c8b12b141a56c9a1e5f77d6c37c17300803',
    manufactureDate: '2023-04-10',
  },
  {
    id: 'PRD002',
    name: 'Premium Tea Leaves',
    manufacturer: 'Darjeeling Tea Estates',
    origin: 'India',
    registrationDate: '2023-05-22',
    status: 'Active',
    transactionHash: '0x9a7d3e5f8c21b4d6a2e7f9c0b1d2a3e4f5c6b7a8d9e0f1c2b3a4d5e6f7a8c9b0d1',
    manufactureDate: '2023-05-01',
  },
  {
    id: 'PRD003',
    name: 'Organic Cacao Nibs',
    manufacturer: 'Peruvian Cacao Collective',
    origin: 'Peru',
    registrationDate: '2023-06-05',
    status: 'Active',
    transactionHash: '0xe3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4',
    manufactureDate: '2023-05-20',
  },
  {
    id: 'PRD004',
    name: 'Himalayan Pink Salt',
    manufacturer: 'Mountain Minerals Ltd.',
    origin: 'Nepal',
    registrationDate: '2023-06-10',
    status: 'Active',
    transactionHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3',
    manufactureDate: '2023-06-01',
  },
  {
    id: 'PRD005',
    name: 'Premium Olive Oil',
    manufacturer: 'Mediterranean Farms',
    origin: 'Spain',
    registrationDate: '2023-06-12',
    status: 'Inactive',
    transactionHash: '0xd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5',
    manufactureDate: '2023-06-05',
  }
];

export default { kpiData, recentTransactions, products };