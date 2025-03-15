import React from 'react';
import { Link } from 'react-router-dom';

const QuickActionCard = ({ title, description, icon, linkTo, linkText, bgClass = "bg-cta/20" }) => {
  return (
    <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-5 shadow-sm flex">
      <div className={`${bgClass} p-3 rounded-lg flex items-center justify-center mr-4`}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-text mb-1">{title}</h3>
        <p className="text-text/60 text-sm mb-3">{description}</p>
        <Link 
          to={linkTo} 
          className="text-cta hover:text-cta/80 flex items-center text-sm font-medium"
        >
          {linkText}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default QuickActionCard;