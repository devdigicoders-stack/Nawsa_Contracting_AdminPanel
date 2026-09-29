import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ fullScreen = false, message = "Loading..." }) => {
  const containerClasses = fullScreen 
    ? "fixed inset-0 bg-warm-white flex flex-col items-center justify-center z-[9999]" 
    : "flex flex-col items-center justify-center p-16 w-full";

  return (
    <div className={containerClasses}>
      <motion.div
        className="w-10 h-10 border-4 border-[var(--color-gold-primary)]/20 border-t-[var(--color-gold-primary)] rounded-full mb-4"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <div className="text-[#667085] text-[14px] font-medium font-heading uppercase tracking-wider">
        {message}
      </div>
    </div>
  );
};

export default LoadingSpinner;
