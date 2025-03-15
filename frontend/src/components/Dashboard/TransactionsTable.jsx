import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaClipboardList } from 'react-icons/fa';

const TransactionsTable = ({ transactions }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-panel/30 backdrop-blur-sm border border-cta/10 rounded-lg overflow-hidden"
    >
      <div className="flex items-center justify-between p-6 border-b border-cta/10">
        <h3 className="text-lg font-display font-bold text-cta flex items-center">
          <FaClipboardList className="mr-2" /> Recent Transactions
        </h3>
        <Link to="/dashboard/transactions" className="text-xs text-cta hover:text-cta/80 transition-all">
          View All
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-cta/10">
          <thead className="bg-panel/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text/60 tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text/60 tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text/60 tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text/60 tracking-wider">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text/60 tracking-wider">Hash</th>
            </tr>
          </thead>
          <tbody className="bg-background/20 divide-y divide-cta/5">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-cta/5 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text">{transaction.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text/70">{transaction.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${transaction.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                      transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text/70">{transaction.timestamp}</td>
                <td className="px-6 py-4 whitespace-nowrap text-xs text-cta font-mono">{transaction.hash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default TransactionsTable;