import { ROLES } from './constants';

// Check if user is admin
export const isAdmin = (role) => {
  return role === ROLES.ADMIN;
};

// Check if user is manager
export const isManager = (role) => {
  return role === ROLES.MANAGER;
};

// Check if user is regular user
export const isUser = (role) => {
  return role === ROLES.USER;
};

// Check if user can create users
export const canCreateUser = (role) => {
  return isAdmin(role) || isManager(role);
};

// Check if user can update other users
export const canUpdateUser = (role, targetUserRole) => {
  if (isAdmin(role)) return true;
  if (isManager(role) && !isAdmin(targetUserRole)) return true;
  return false;
};

// Check if user can delete users
export const canDeleteUser = (role) => {
  return isAdmin(role);
};

// Check if user can reset passwords
export const canResetPassword = (role) => {
  return isAdmin(role);
};

// Check if user can manage units
export const canManageUnits = (role) => {
  return isAdmin(role) || isManager(role);
};

// Check if user can manage designations
export const canManageDesignations = (role) => {
  return isAdmin(role) || isManager(role);
};

// Check if user can change roles
export const canChangeRole = (role) => {
  return isAdmin(role);
};

// Get accessible menu items based on role
export const getAccessibleMenuItems = (role) => {
  const items = [
    { key: 'dashboard', label: 'Dashboard', path: '/', icon: 'HomeOutlined' },
  ];

  if (canManageUnits(role)) {
    items.push(
      { key: 'users', label: 'Users', path: '/users', icon: 'UserOutlined' },
      { key: 'units', label: 'Units', path: '/units', icon: 'ApartmentOutlined' },
      { key: 'designations', label: 'Designations', path: '/designations', icon: 'TagsOutlined' }
    );
  }

  items.push({ key: 'profile', label: 'Profile', path: '/profile', icon: 'UserOutlined' });

  return items;
};
