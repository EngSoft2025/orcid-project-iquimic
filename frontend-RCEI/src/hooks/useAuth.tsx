import React, { createContext, useContext, useEffect, useState } from 'react';
import { getOrcidToken, setOrcidToken, clearOrcidToken } from '@/services/auth';

interface AuthState {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = getOrcidToken();
    if (stored) {
      setToken(stored);
    }
  }, []);

  const login = (newToken: string) => {
    setOrcidToken(newToken);
    setToken(newToken);
  };

  const logout = () => {
    clearOrcidToken();
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
