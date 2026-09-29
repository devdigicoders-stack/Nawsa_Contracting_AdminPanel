import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

const DeleteEnquiryModal = ({ isOpen, onClose, onConfirm, enquiryName }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-deep/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white w-full max-w-md shadow-2xl overflow-hidden"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="flex justify-between items-center p-5 border-b border-[#E5E7EB] bg-warm-white">
              <h3 className="text-lg font-heading font-bold text-primary-deep flex items-center gap-2">
                <FiAlertTriangle className="text-red-500" /> Delete Enquiry
              </h3>
              <button onClick={onClose} className="text-[#667085] hover:text-primary-deep transition-colors">
                <FiX className="text-xl" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-[15px] text-[#667085] leading-relaxed mb-8">
                Are you sure you want to permanently delete this enquiry from <strong className="text-primary-deep">{enquiryName}</strong>? This action cannot be undone and all data will be lost.
              </p>
              <div className="flex justify-end gap-3">
                <button 
                  className="px-6 py-2.5 font-bold text-[13px] tracking-wider uppercase border border-[#E5E7EB] text-[#667085] hover:bg-warm-white hover:text-primary-deep transition-colors" 
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button 
                  className="px-6 py-2.5 font-bold text-[13px] tracking-wider uppercase bg-red-600 text-white hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20" 
                  onClick={onConfirm}
                >
                  Delete Enquiry
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteEnquiryModal;
