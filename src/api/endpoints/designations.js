import apiClient from '../client';

export const designationsAPI = {
  // Get all designations
  getDesignations: async (params = {}) => {
    const response = await apiClient.get('/api/designations', { params });
    return response.data;
  },

  // Get single designation
  getDesignation: async (id) => {
    const response = await apiClient.get(`/api/designations/${id}`);
    return response.data;
  },

  // Create designation
  createDesignation: async (designationData) => {
    const response = await apiClient.post('/api/designations', designationData);
    return response.data;
  },

  // Update designation
  updateDesignation: async (id, designationData) => {
    const response = await apiClient.put(`/api/designations/${id}`, designationData);
    return response.data;
  },

  // Delete designation
  deleteDesignation: async (id) => {
    const response = await apiClient.delete(`/api/designations/${id}`);
    return response.data;
  },
};
