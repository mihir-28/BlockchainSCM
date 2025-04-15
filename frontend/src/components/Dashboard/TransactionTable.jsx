import React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TransactionTable = ({ transactions }) => {
  const navigate = useNavigate();
  
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

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      month: 'short',
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  // Navigate to transaction details page
  const handleViewTransaction = (txId) => {
    navigate(`/dashboard/transactions?txid=${txId}`);
  };

  return (
    <div className="overflow-x-auto bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl shadow-sm">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-cta/10">
            <th className="pl-6 pr-2 py-3 text-left text-xs font-medium text-text/60 uppercase tracking-wider">
              Type
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-text/60 uppercase tracking-wider">
              Name
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-text/60 uppercase tracking-wider">
              Description
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-text/60 uppercase tracking-wider">
              Status
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-text/60 uppercase tracking-wider">
              Timestamp
            </th>
            <th className="pl-6 pr-2 py-3 text-left text-xs font-medium text-text/60 uppercase tracking-wider">
              Block
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="6" className="px-6 py-8 text-center text-text/60">
                No transactions found
              </td>
            </tr>
          ) : (
            transactions.map((transaction, index) => (
              <tr 
                key={transaction.id} 
                className={`
                  ${index % 2 === 0 ? 'bg-background/10' : 'bg-transparent'}
                  ${index === transactions.length - 1 ? '' : 'border-b border-cta/5'}
                  hover:bg-cta/5 cursor-pointer transition-colors
                `}
                onClick={() => handleViewTransaction(transaction.id)}
              >
                <td className="pl-6 pr-2 py-3 whitespace-nowrap text-sm text-text capitalize">
                  {transaction.type}
                </td>
                <td className="px-2 py-3 text-sm text-text font-medium whitespace-nowrap">
                  {transaction.data.name}
                </td>
                <td className="px-2 py-3 text-sm text-text line-clamp-3">
                  {transaction.description}
                </td>
                <td className="px-2 py-3 whitespace-nowrap text-sm">
                  {renderStatus(transaction.status)}
                </td>
                <td className="px-2 py-3 whitespace-nowrap text-sm text-text/80">
                  {formatDate(transaction.timestamp)}
                </td>
                <td className="pl-6 pr-2 py-3 whitespace-nowrap text-sm text-cta/80">
                  {transaction.blockNumber}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;