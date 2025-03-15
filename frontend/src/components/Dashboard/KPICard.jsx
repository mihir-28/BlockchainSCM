import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const KPICard = ({ title, value, change, isPositive, icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="bg-panel/30 backdrop-blur-sm border border-cta/10 rounded-lg p-6 hover:border-cta/30 transition-all"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="bg-cta/10 p-3 rounded-lg">
          {icon}
        </div>
        <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          <span className="text-xs font-medium">{change}</span>
          {isPositive ? <FaArrowUp className="ml-1 text-xs" /> : <FaArrowDown className="ml-1 text-xs" />}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-text/60 text-sm">{title}</p>
        <h4 className="text-2xl font-display font-bold mt-1 text-text">{value}</h4>
      </div>
    </motion.div>
  );
};

export default KPICard;