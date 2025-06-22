import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/'); // opcional: redireciona para a home após logout
  };

  return (
    <nav className="bg-white shadow-md z-50 sticky top-0">
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-800">
          RCEI - Repositório Científico e Educacional Integrado
        </Link>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            // Se está logado, só mostra o botão Sair
            <Button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
            >
              Sair
            </Button>
          ) : (
            // Se não está logado, mostra Contato, Entrar e Cadastre-se
            <>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-gray-900"
              >
                Contato
              </Link>
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900"
              >
                Entrar
              </Link>
              <Link
                to="/register"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
              >
                Cadastre-se
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}