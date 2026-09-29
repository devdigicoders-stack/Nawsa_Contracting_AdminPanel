export const initialEnquiries = [
  {
    id: 1,
    name: 'Michael Santos',
    email: 'michael.santos@example.com',
    phone: '+63 917 123 4567',
    company: 'Santos Engineering Corp.',
    service: 'Management Systems Consultancy',
    subject: 'ISO 9001 Consultancy Requirement',
    message: 'We are currently reviewing our quality management system and would like support with ISO 9001 implementation and readiness assessment.',
    status: 'New',
    createdAt: '2026-09-27T10:30:00'
  },
  {
    id: 2,
    name: 'Andrea Cruz',
    email: 'acruz@buildright.ph',
    phone: '+63 920 987 6543',
    company: 'BuildRight Construction',
    service: 'Training & Professional Development',
    subject: 'Internal Auditor Training for QMS',
    message: 'Hello, I would like to inquire about the schedule and pricing for your Internal Auditor Training covering ISO 9001. We have a team of 5 people.',
    status: 'Contacted',
    createdAt: '2026-09-26T14:15:00'
  },
  {
    id: 3,
    name: 'Daniel Reyes',
    email: 'dreyes@techinnovate.com',
    phone: '',
    company: 'Tech Innovate Solutions',
    service: 'Digital Innovation & AI',
    subject: 'KPI Dashboard and Reporting Support',
    message: 'Our organization needs help setting up automated KPI dashboards. Do you offer consultancy on digital tools for performance tracking?',
    status: 'New',
    createdAt: '2026-09-28T08:45:00'
  },
  {
    id: 4,
    name: 'Maria Lopez',
    email: 'm.lopez@foodcorp.ph',
    phone: '+63 918 555 1234',
    company: 'FoodCorp Manufacturing',
    service: 'Process Improvement',
    subject: 'Process Mapping Consultancy',
    message: 'We are experiencing bottlenecks in our production line and would like to engage a consultant to map and improve our core processes.',
    status: 'Closed',
    createdAt: '2026-09-20T09:00:00'
  },
  {
    id: 5,
    name: 'John Garcia',
    email: 'jgarcia@safetyfirst.com',
    phone: '+63 915 222 3344',
    company: 'Safety First Logistics',
    service: 'Audit & Assessment',
    subject: 'ISO 45001 Internal Audit',
    message: 'Looking for a 3rd party to conduct an internal audit for ISO 45001 compliance before our certification audit next month.',
    status: 'Contacted',
    createdAt: '2026-09-23T11:20:00'
  },
  {
    id: 6,
    name: 'Elena Dominguez',
    email: 'elena.d@retailgroup.ph',
    phone: '+63 917 888 9999',
    company: 'Prime Retail Group',
    service: 'Business Performance Improvement',
    subject: 'Strategic Planning Facilitation',
    message: 'Do you offer facilitation for annual strategic planning? We need an expert to guide our executive team.',
    status: 'New',
    createdAt: '2026-09-28T10:05:00'
  },
  {
    id: 7,
    name: 'Kevin Tan',
    email: 'ktan@manufacturing.com.ph',
    phone: '',
    company: 'Tan Manufacturing Inc.',
    service: 'Management Systems Consultancy',
    subject: 'ISO 14001 Migration',
    message: 'We need assistance upgrading our current environmental management system. Please send a proposal.',
    status: 'Closed',
    createdAt: '2026-09-15T15:30:00'
  },
  {
    id: 8,
    name: 'Sarah Lim',
    email: 'slim@healthcare.ph',
    phone: '+63 922 111 2222',
    company: 'Metro Healthcare Partners',
    service: 'Customized Requirement',
    subject: 'Leadership Training Program',
    message: 'We are looking for a customized leadership training program for our middle managers focusing on quality and compliance.',
    status: 'Contacted',
    createdAt: '2026-09-25T13:40:00'
  }
];

// Helper to format date string
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  
  // Calculate difference in days
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Available services for filters
export const servicesList = [
  'Management Systems Consultancy',
  'Training & Professional Development',
  'Audit & Assessment',
  'Business Performance Improvement',
  'Process Improvement',
  'Digital Innovation & AI',
  'Customized Requirement',
  'Other'
];
