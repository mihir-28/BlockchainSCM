import React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaClock } from 'react-icons/fa';

const TransactionTable = ({ transactions }) => {
  // Function to render status indicator
  const renderStatus = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return (
          <span className="flex items-center text-green-400">
            <FaCheckCircle className="mr-1" />
            <span>Confirmed</span>
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center text-yellow-400">
            <FaClock className="mr-1" />
            <span>Pending</span>
          </span>
        );
      case 'failed':
        return (
          <span className="flex items-center text-red-400">
            <FaExclamationTriangle className="mr-1" />
            <span>Failed</span>
          </span>
        );
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="overflow-x-auto bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl shadow-sm">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-cta/10">
            <th className="pl-6 pr-2 py-3 text-left text-xs font-medium text-text/60 uppercase tracking-wider">
              ID
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-text/60 uppercase tracking-wider">
              Type
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-text/60 uppercase tracking-wider">
              Status
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-text/60 uppercase tracking-wider">
              Timestamp
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-text/60 uppercase tracking-wider">
              Hash
            </th>
            <th className="pl-2 pr-6 py-3 text-right text-xs font-medium text-text/60 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr 
              key={transaction.id} 
              className={`
                ${index % 2 === 0 ? 'bg-background/10' : 'bg-transparent'}
                ${index === transactions.length - 1 ? '' : 'border-b border-cta/5'}
              `}
            >
              <td className="pl-6 pr-2 py-3 whitespace-nowrap text-sm text-text">
                {transaction.id}
              </td>
              <td className="px-2 py-3 whitespace-nowrap text-sm text-text">
                {transaction.type}
              </td>
              <td className="px-2 py-3 whitespace-nowrap text-sm">
                {renderStatus(transaction.status)}
              </td>
              <td className="px-2 py-3 whitespace-nowrap text-sm text-text/80">
                {transaction.timestamp}
              </td>
              <td className="px-2 py-3 whitespace-nowrap text-sm text-cta/80">
                {transaction.hash}
              </td>
              <td className="pl-2 pr-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-cta hover:text-cta-dark">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;