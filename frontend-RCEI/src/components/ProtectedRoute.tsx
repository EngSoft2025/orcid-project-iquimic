import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from "@/contexts/AuthContext";  // Verifique se o caminho está correto

export default function ProtectedRoute({ children }: { children: ReactElement }) {
  const { isAuthenticated } = useAuth();  // Usando 'isAuthenticated' para verificar se o usuário está autenticado

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;  // Se o usuário estiver autenticado, renderiza o conteúdo protegido
}
