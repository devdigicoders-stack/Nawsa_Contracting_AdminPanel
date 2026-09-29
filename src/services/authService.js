import api from './api';

export const authService = {
  login: async (email, password, rememberMe = true) => {
    try {
      const response = await api.post('/admin/login', { email, password });
      if (response.data.token) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('adminToken', response.data.token);
        storage.setItem('adminUser', JSON.stringify(response.data.admin));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get('/admin/profile');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  updateProfile: async (data) => {
    try {
      const response = await api.put('/admin/profile', data);
      if (response.data.token) {
        const storage = localStorage.getItem('adminToken') ? localStorage : sessionStorage;
        storage.setItem('adminToken', response.data.token);
        storage.setItem('adminUser', JSON.stringify(response.data.admin));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminUser');
  }
};
