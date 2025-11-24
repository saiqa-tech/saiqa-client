import apiClient from '../client';

export const usersAPI = {
  // Get all users with pagination and filters
  getUsers: async (params = {}) => {
    const response = await apiClient.get('/api/users', { params });
    return response.data;
  },

  // Get single user
  getUser: async (id) => {
    const response = await apiClient.get(`/api/users/${id}`);
    return response.data;
  },

  // Create user
  createUser: async (userData) => {
    const response = await apiClient.post('/api/users', userData);
    return response.data;
  },

  // Update user
  updateUser: async (id, userData) => {
    const response = await apiClient.put(`/api/users/${id}`, userData);
    return response.data;
  },

  // Delete user
  deleteUser: async (id) => {
    const response = await apiClient.delete(`/api/users/${id}`);
    return response.data;
  },

  // Reset user password (admin only)
  resetPassword: async (id) => {
    const response = await apiClient.post(`/api/users/${id}/reset-password`);
    return response.data;
  },
};
