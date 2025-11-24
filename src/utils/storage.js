import Cookies from 'js-cookie';

// Token management
export const setTokens = (accessToken, refreshToken) => {
  Cookies.set('accessToken', accessToken, { expires: 7 }); // 7 days
  Cookies.set('refreshToken', refreshToken, { expires: 30 }); // 30 days
};

export const getAccessToken = () => {
  return Cookies.get('accessToken');
};

export const getRefreshToken = () => {
  return Cookies.get('refreshToken');
};

export const clearTokens = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};

// User data management in localStorage
export const setUserData = (user) => {
  localStorage.setItem('userData', JSON.stringify(user));
};

export const getUserData = () => {
  const data = localStorage.getItem('userData');
  return data ? JSON.parse(data) : null;
};

export const clearUserData = () => {
  localStorage.removeItem('userData');
};

// Clear all auth data
export const clearAuthData = () => {
  clearTokens();
  clearUserData();
};
