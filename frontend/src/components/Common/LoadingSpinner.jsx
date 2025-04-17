import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-6">
      <div className="w-12 h-12 rounded-full border-4 border-cta/20 border-t-cta animate-spin mb-4"></div>
      <p className="text-sm text-text/70">{message}</p>
    </div>
  );
};

export default LoadingSpinner;