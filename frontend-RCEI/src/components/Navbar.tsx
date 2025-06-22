import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/'); // Redireciona para a home após logout
  };

  // Verificar o modo escuro na inicialização
  useEffect(() => {
    const darkModeStatus = localStorage.getItem('darkMode') === 'true';
    setDarkMode(darkModeStatus);
    if (darkModeStatus) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkModeStatus = !darkMode;
    setDarkMode(newDarkModeStatus);
    localStorage.setItem('darkMode', String(newDarkModeStatus));

    if (newDarkModeStatus) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  return (
    <nav className={`bg-white shadow-md z-50 sticky top-0 dark:bg-gray-800 dark:text-white`}>
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
      <div className="text-xl font-bold text-gray-800 dark:text-white">
        RCEI - Repositório Científico e Educacional Integrado
      </div>

        <div className="flex items-center space-x-4">
          <Button
            onClick={toggleDarkMode}
            className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white py-2 px-4 rounded-md"
          >
            {darkMode ? 'Modo Claro' : 'Modo Escuro'}
          </Button>
          {isAuthenticated ? (
            <Button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
            >
              Sair
            </Button>
          ) : (
            <>
              <Link to="/" className="text-gray-700 hover:text-gray-900 dark:text-white">
                Início
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-gray-900 dark:text-white">
                Contato
              </Link>
              <Link to="/login" className="text-gray-700 hover:text-gray-900 dark:text-white">
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
