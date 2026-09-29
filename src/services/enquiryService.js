import api from './api';

export const enquiryService = {
  getEnquiries: async (params = {}) => {
    const response = await api.get('/enquiries', { params });
    // Assuming backend returns { success: true, data: [...], total, page, pages }
    // but the frontend might expect the array directly if it was just returning mock result. 
    // Let's return the full response data so we can use pagination.
    return response.data;
  },

  getEnquiryById: async (id) => {
    const response = await api.get(`/enquiries/${id}`);
    return response.data.data;
  },

  updateEnquiryStatus: async (id, status) => {
    const response = await api.patch(`/enquiries/${id}/status`, { status });
    return response.data;
  },

  deleteEnquiry: async (id) => {
    const response = await api.delete(`/enquiries/${id}`);
    return response.data;
  }
};
