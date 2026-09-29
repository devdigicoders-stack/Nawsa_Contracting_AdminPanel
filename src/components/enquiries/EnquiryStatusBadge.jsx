import React from 'react';

const EnquiryStatusBadge = ({ status }) => {
  const getBadgeStyles = (status) => {
    switch (status.toLowerCase()) {
      case 'new': 
        return 'bg-red-50 text-red-600 border border-red-200';
      case 'contacted': 
        return 'bg-blue-50 text-blue-600 border border-blue-200';
      case 'closed': 
        return 'bg-gray-50 text-gray-600 border border-gray-200';
      default: 
        return 'bg-gray-50 text-gray-600 border border-gray-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold font-heading uppercase tracking-wider ${getBadgeStyles(status)}`}>
      {status}
    </span>
  );
};

export default EnquiryStatusBadge;
