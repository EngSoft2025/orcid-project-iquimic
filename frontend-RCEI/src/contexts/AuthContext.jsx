import React, { createContext, useState, useEffect, useContext } from 'react';
import { getOrcidToken, setOrcidToken, clearOrcidToken } from '@/services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Carregar o token armazenado no localStorage quando o componente for montado
  useEffect(() => {
    const stored = getOrcidToken(); // Tenta recuperar o token do localStorage
    if (stored) {
      setToken(stored); // Se o token existir, define o estado com o token
    }
  }, []);

  // Verifica se o usuário está autenticado com base na presença do token
  const isAuthenticated = token !== null;

  // Função de login, que armazena o token e atualiza o estado
  const login = (newToken, orcidId = null) => {
    setOrcidToken(newToken); // Armazena o token no localStorage
    setToken(newToken); // Atualiza o estado com o novo token
    localStorage.setItem('selectedResearcherOrcid', orcidId);
  };

  // Função de logout, que remove o token e limpa o estado
  const logout = () => {
    clearOrcidToken(); // Remove o token do localStorage
    setToken(null); // Limpa o estado
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
