import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
      
      if (storedToken) {
        try {
          // Attempt to fetch profile with stored token
          const user = await authService.getProfile();
          if (user) {
            setAdmin(user);
            setToken(storedToken);
            setIsAuthenticated(true);
          } else {
            // Token invalid or user not found
            authService.logout();
          }
        } catch (error) {
          console.error("Auth check failed", error);
          authService.logout();
        }
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password, rememberMe) => {
    const data = await authService.login(email, password, rememberMe);
    setAdmin(data.admin);
    setToken(data.token);
    setIsAuthenticated(true);
    return data;
  };

  const logout = () => {
    authService.logout();
    setAdmin(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  const updateAdmin = async (data) => {
    const res = await authService.updateProfile(data);
    setAdmin(res.admin);
    setToken(res.token);
    return res;
  };

  return (
    <AuthContext.Provider value={{ admin, token, isAuthenticated, loading, login, logout, updateAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
