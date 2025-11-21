import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requiresPasswordChange, setRequiresPasswordChange] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const data = await authAPI.getCurrentUser();
      setUser(data.user);
      setRequiresPasswordChange(data.user.force_password_change);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(email, password) {
    const data = await authAPI.login(email, password);
    setUser(data.user);
    setRequiresPasswordChange(data.requiresPasswordChange);
    return data;
  }

  async function logout() {
    await authAPI.logout();
    setUser(null);
    setRequiresPasswordChange(false);
  }

  async function changePassword(currentPassword, newPassword) {
    await authAPI.changePassword(currentPassword, newPassword);
    setRequiresPasswordChange(false);
  }

  const value = {
    user,
    loading,
    requiresPasswordChange,
    login,
    logout,
    changePassword,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
