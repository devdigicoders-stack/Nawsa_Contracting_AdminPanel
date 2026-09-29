export const mockStats = [
  { id: 1, title: 'Total Enquiries', value: 24, text: 'View all →', link: '/admin/enquiries', icon: 'FiMail' },
  { id: 2, title: 'New Enquiries', value: 6, text: 'View new →', link: '/admin/enquiries', icon: 'FiInbox' },
  { id: 3, title: 'Contacted Enquiries', value: 12, text: 'View contacted →', link: '/admin/enquiries', icon: 'FiPhoneForwarded' },
  { id: 4, title: 'Closed Enquiries', value: 6, text: 'View closed →', link: '/admin/enquiries', icon: 'FiCheckCircle' },
];

export const mockEnquiries = [
  { id: 1, name: 'Michael Santos', service: 'ISO 9001 Consultancy', received: 'Today', status: 'New' },
  { id: 2, name: 'Andrea Cruz', service: 'Internal Auditor Training', received: 'Yesterday', status: 'Contacted' },
  { id: 3, name: 'Daniel Reyes', service: 'Digital & AI', received: '2 days ago', status: 'New' },
  { id: 4, name: 'Maria Lopez', service: 'Process Improvement', received: '4 days ago', status: 'Closed' },
  { id: 5, name: 'John Garcia', service: 'ISO 45001', received: '5 days ago', status: 'Contacted' },
];

export const mockActivity = [
  { id: 1, text: 'New enquiry received from Michael Santos', time: '10 minutes ago' },
  { id: 2, text: 'Enquiry from Andrea Cruz marked as Contacted', time: '2 hours ago' },
  { id: 3, text: 'Enquiry from Maria Lopez closed', time: 'Yesterday' },
];
