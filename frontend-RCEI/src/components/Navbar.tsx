import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md z-50 sticky top-0">
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-gray-800">
            RCEI - Repositório Científico e Educacional Integrado
          </Link>
          <div>
            <Link to="/contact" className="mr-4 text-gray-700 hover:text-gray-900">
              Contato
            </Link>
            <Link to="/login" className="mr-4 text-gray-700 hover:text-gray-900">
              Entrar
            </Link>
            <Link
              to="/register"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
            >
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;