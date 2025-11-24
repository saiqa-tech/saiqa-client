import apiClient from '../client';

export const unitsAPI = {
  // Get all units
  getUnits: async (params = {}) => {
    const response = await apiClient.get('/api/units', { params });
    return response.data;
  },

  // Get single unit
  getUnit: async (id) => {
    const response = await apiClient.get(`/api/units/${id}`);
    return response.data;
  },

  // Create unit
  createUnit: async (unitData) => {
    const response = await apiClient.post('/api/units', unitData);
    return response.data;
  },

  // Update unit
  updateUnit: async (id, unitData) => {
    const response = await apiClient.put(`/api/units/${id}`, unitData);
    return response.data;
  },

  // Delete unit
  deleteUnit: async (id) => {
    const response = await apiClient.delete(`/api/units/${id}`);
    return response.data;
  },
};
