import React from 'react';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

const ErrorState = ({ title = "Something went wrong", message = "Unable to load data. Please try again.", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-16 text-center bg-white border border-[#E5E7EB] my-4 max-w-2xl mx-auto shadow-sm">
      <FiAlertCircle className="text-5xl text-red-500 mb-4" />
      <h3 className="text-xl font-heading font-bold text-primary-deep mb-2">{title}</h3>
      <p className="text-[#667085] mb-6 max-w-md">{message}</p>
      
      {onRetry && (
        <button 
          onClick={onRetry}
          className="inline-flex items-center gap-2 bg-white text-primary-deep border border-primary-deep px-6 py-2.5 text-[13px] font-bold uppercase tracking-wider hover:bg-primary-deep hover:text-[var(--color-gold-primary)] transition-colors"
        >
          <FiRefreshCw /> Retry
        </button>
      )}
    </div>
  );
};

export default ErrorState;
