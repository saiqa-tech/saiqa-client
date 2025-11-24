import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../api/endpoints/auth';
import { setTokens, clearAuthData, setUserData, getUserData } from '../utils/storage';
import { message } from 'antd';
import { MESSAGES } from '../utils/constants';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = getUserData();
        if (userData) {
          // Verify token is still valid by fetching current user
          const response = await authAPI.getMe();
          setUser(response.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Failed to load user:', error);
        clearAuthData();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = useCallback(async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      const { accessToken, refreshToken, user: userData } = response;

      setTokens(accessToken, refreshToken);
      setUserData(userData);
      setUser(userData);
      setIsAuthenticated(true);

      message.success(MESSAGES.LOGIN_SUCCESS);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || MESSAGES.LOGIN_FAILED;
      message.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuthData();
      setUser(null);
      setIsAuthenticated(false);
      message.success(MESSAGES.LOGOUT_SUCCESS);
      window.location.href = '/login';
    }
  }, []);

  // Update user data
  const updateUser = useCallback((userData) => {
    setUser(userData);
    setUserData(userData);
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
