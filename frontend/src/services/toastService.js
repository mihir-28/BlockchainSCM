import React from 'react';
import { toast } from 'react-toastify';
import { FaCheck, FaTimes, FaExchangeAlt, FaInfoCircle } from 'react-icons/fa';

// Custom toast styling
const toastOptions = {
  style: {
    background: '#1e1e2d', // Dark background matching your app
    color: '#fff',
    borderRadius: '0.5rem',
    border: '1px solid rgba(152, 103, 255, 0.2)', // Your cta color with opacity
  },
  success: {
    style: {
      background: 'rgba(34, 197, 94, 0.1)', // Green with low opacity
      border: '1px solid rgba(34, 197, 94, 0.3)',
    },
  },
  error: {
    style: {
      background: 'rgba(239, 68, 68, 0.1)', // Red with low opacity
      border: '1px solid rgba(239, 68, 68, 0.3)',
    },
  },
};

// Success toasts
export const showSuccessToast = (message) => {
  toast.success(message, {
    ...toastOptions.success,
    icon: React.createElement(FaCheck, { className: "text-green-500" })
  });
};

export const showTransferSuccessToast = () => {
  toast.success(
    React.createElement("div", { className: "flex" },
      React.createElement(FaExchangeAlt, { className: "text-green-500 mr-2 text-xl" }),
      React.createElement("div", null,
        React.createElement("p", { className: "font-bold" }, "Ownership Transferred"),
        React.createElement("p", { className: "text-sm" }, "The product ownership has been successfully transferred on the blockchain.")
      )
    )
  );
};

export const showStatusUpdateSuccessToast = (status) => {
  toast.success(
    React.createElement("div", { className: "flex" },
      React.createElement(FaCheck, { className: "text-green-500 mr-2 text-xl" }),
      React.createElement("div", null,
        React.createElement("p", { className: "font-bold" }, "Status Updated"),
        React.createElement("p", { className: "text-sm" }, `Product status updated to "${status}" successfully.`)
      )
    )
  );
};

// Error toasts
export const showErrorToast = (message) => {
  toast.error(message, {
    icon: React.createElement(FaTimes, { className: "text-red-500" })
  });
};

export const showTransferErrorToast = (error) => {
  toast.error(
    React.createElement("div", { className: "flex" },
      React.createElement(FaTimes, { className: "text-red-500 mr-2 text-xl" }),
      React.createElement("div", null,
        React.createElement("p", { className: "font-bold" }, "Transfer Failed"),
        React.createElement("p", { className: "text-sm" }, error || "An error occurred during ownership transfer. Please try again.")
      )
    )
  );
};

export const showStatusUpdateErrorToast = (error) => {
  toast.error(
    React.createElement("div", { className: "flex" },
      React.createElement(FaTimes, { className: "text-red-500 mr-2 text-xl" }),
      React.createElement("div", null,
        React.createElement("p", { className: "font-bold" }, "Status Update Failed"),
        React.createElement("p", { className: "text-sm" }, error || "An error occurred while updating status. Please try again.")
      )
    )
  );
};

// Info toast
export const showInfoToast = (message) => {
  toast.info(
    React.createElement("div", { className: "flex" },
      React.createElement(FaInfoCircle, { className: "text-blue-500 mr-2 text-xl" }),
      React.createElement("div", null, message)
    )
  );
};