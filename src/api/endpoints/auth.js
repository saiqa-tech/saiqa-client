import apiClient from '../client';

export const authAPI = {
  // Login
  login: async (email, password) => {
    const response = await apiClient.post('/api/auth/login', { email, password });
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await apiClient.post('/api/auth/logout');
    return response.data;
  },

  // Get current user
  getMe: async () => {
    const response = await apiClient.get('/api/auth/me');
    return response.data;
  },

  // Change password
  changePassword: async (oldPassword, newPassword) => {
    const response = await apiClient.post('/api/auth/change-password', {
      oldPassword,
      newPassword,
    });
    return response.data;
  },

  // Refresh token
  refreshToken: async (refreshToken) => {
    const response = await apiClient.post('/api/auth/refresh', { refreshToken });
    return response.data;
  },
};
