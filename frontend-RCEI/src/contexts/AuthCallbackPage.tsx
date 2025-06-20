import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    // Captura o token da URL (o ORCID retorna como um fragmento na URL)
    const hash = window.location.hash;
    const token = new URLSearchParams(hash.replace("#", "?")).get("access_token");

    if (token) {
      // Armazenar o token no contexto de autenticação
      login(token);

      // Redireciona para o dashboard após o login bem-sucedido
      navigate("/dashboard");
    } else {
      // Se não encontrar o token, redireciona para a tela de login
      alert("Erro ao obter o token do ORCID.");
      navigate("/login");
    }
  }, [navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1>Carregando...</h1>
    </div>
  );
}
