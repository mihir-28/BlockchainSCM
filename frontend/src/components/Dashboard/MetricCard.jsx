import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const MetricCard = ({ title, value, change, isPositive, icon }) => {
  return (
    <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-5 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 h-16 w-16 bg-cta/5 rounded-bl-2xl flex items-center justify-center">
        <div className="text-cta/80">{icon}</div>
      </div>
      <div className="space-y-1">
        <h3 className="text-text/60 text-sm">{title}</h3>
        <p className="text-2xl font-semibold text-text">{value}</p>
        <p className={`text-xs flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
          {change}
          <span className="text-text/40 ml-1">vs. last week</span>
        </p>
      </div>
    </div>
  );
};

export default MetricCard;