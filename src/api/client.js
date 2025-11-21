const API_BASE_URL = '/api';

let tokenRefreshPromise = null;

async function apiRequest(endpoint, options = {}) {
  const defaultOptions = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const requestOptions = { ...defaultOptions, ...options };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);
    
    if (response.status === 401 && endpoint !== '/auth/login' && endpoint !== '/auth/refresh') {
      // Token expired, try to refresh
      const refreshed = await refreshToken();
      if (refreshed) {
        // Retry the original request
        return fetch(`${API_BASE_URL}${endpoint}`, requestOptions);
      } else {
        throw new Error('Session expired');
      }
    }

    return response;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

async function refreshToken() {
  if (tokenRefreshPromise) {
    return tokenRefreshPromise;
  }

  tokenRefreshPromise = (async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        return true;
      } else {
        // Refresh failed, redirect to login
        window.location.href = '/login';
        return false;
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      window.location.href = '/login';
      return false;
    } finally {
      tokenRefreshPromise = null;
    }
  })();

  return tokenRefreshPromise;
}

// Auth API
export const authAPI = {
  login: async (email, password) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  logout: async () => {
    const response = await apiRequest('/auth/logout', {
      method: 'POST',
    });
    return response.json();
  },

  changePassword: async (currentPassword, newPassword) => {
    const response = await apiRequest('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    return response.json();
  },

  getCurrentUser: async () => {
    const response = await apiRequest('/auth/me');
    return response.json();
  },

  refresh: async () => {
    const response = await apiRequest('/auth/refresh', {
      method: 'POST',
    });
    return response.json();
  },
};

// Users API
export const usersAPI = {
  getUsers: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await apiRequest(`/users?${queryString}`);
    return response.json();
  },

  getUserById: async (id) => {
    const response = await apiRequest(`/users/${id}`);
    return response.json();
  },

  createUser: async (userData) => {
    const response = await apiRequest('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  updateUser: async (id, userData) => {
    const response = await apiRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  deleteUser: async (id) => {
    const response = await apiRequest(`/users/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  resetPassword: async (id, newPassword) => {
    const response = await apiRequest(`/users/${id}/reset-password`, {
      method: 'POST',
      body: JSON.stringify({ newPassword }),
    });
    return response.json();
  },
};

// Units API
export const unitsAPI = {
  getUnits: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await apiRequest(`/units?${queryString}`);
    return response.json();
  },

  getUnitById: async (id) => {
    const response = await apiRequest(`/units/${id}`);
    return response.json();
  },

  createUnit: async (unitData) => {
    const response = await apiRequest('/units', {
      method: 'POST',
      body: JSON.stringify(unitData),
    });
    return response.json();
  },

  updateUnit: async (id, unitData) => {
    const response = await apiRequest(`/units/${id}`, {
      method: 'PUT',
      body: JSON.stringify(unitData),
    });
    return response.json();
  },

  deleteUnit: async (id) => {
    const response = await apiRequest(`/units/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};

// Designations API
export const designationsAPI = {
  getDesignations: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await apiRequest(`/designations?${queryString}`);
    return response.json();
  },

  getDesignationById: async (id) => {
    const response = await apiRequest(`/designations/${id}`);
    return response.json();
  },

  createDesignation: async (designationData) => {
    const response = await apiRequest('/designations', {
      method: 'POST',
      body: JSON.stringify(designationData),
    });
    return response.json();
  },

  updateDesignation: async (id, designationData) => {
    const response = await apiRequest(`/designations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(designationData),
    });
    return response.json();
  },

  deleteDesignation: async (id) => {
    const response = await apiRequest(`/designations/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};
