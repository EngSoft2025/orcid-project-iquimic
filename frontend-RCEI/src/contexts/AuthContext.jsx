import React, { createContext, useState, useEffect, useContext } from 'react';
import { getOrcidToken, setOrcidToken, clearOrcidToken } from '@/services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const stored = getOrcidToken();
    if (stored) {
      setToken(stored);
    }
  }, []);

  // Calcule a autenticação com base na presença do token
  const isAuthenticated = token !== null;

  const login = (newToken) => {
    setOrcidToken(newToken);
    setToken(newToken);
  };

  const logout = () => {
    clearOrcidToken();
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
