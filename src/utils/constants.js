// Role types
export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
};

// User status
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
};

// Messages
export const MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  LOGIN_FAILED: 'Login failed. Please check your credentials.',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  PERMISSION_DENIED: 'You do not have permission to perform this action.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SOMETHING_WRONG: 'Something went wrong. Please try again.',
  CREATE_SUCCESS: 'Created successfully!',
  UPDATE_SUCCESS: 'Updated successfully!',
  DELETE_SUCCESS: 'Deleted successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  PASSWORD_RESET: 'Password reset successfully!',
};

// API endpoints
export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  USERS: '/api/users',
  UNITS: '/api/units',
  DESIGNATIONS: '/api/designations',
};

// Password validation
export const PASSWORD_RULES = {
  MIN_LENGTH: 8,
  PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/,
  MESSAGE: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character',
};
