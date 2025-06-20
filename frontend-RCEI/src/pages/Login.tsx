import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// Obtenção dos valores de ambiente
const { VITE_ORCID_CLIENT_ID, VITE_ORCID_REDIRECT_URI } = import.meta.env;

export default function LoginPage() {
  const navigate = useNavigate();  // Hook para navegação
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar se o e-mail e a senha são fornecidos
    if (!formData.email || !formData.senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      // Fazendo a requisição para a API de login do backend
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          senha: formData.senha,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Sucesso no login
        alert(`Login realizado com sucesso para: ${formData.email}`);
        login(result.token); // Armazenando o token no contexto de autenticação

        // Redirecionar para o dashboard
        navigate("/dashboard");
      } else {
        // Caso haja erro na autenticação
        alert(result.error || "Erro ao realizar login");
      }
    } catch (error) {
      console.error('Erro ao fazer o login:', error);
      alert('Erro ao se conectar ao servidor');
    }

    // Limpar o formulário
    setFormData({ email: "", senha: "" });
  };

  const handleOrcidLogin = () => {
    // Criação da URL de autenticação para o ORCID
    const params = new URLSearchParams({
      client_id: VITE_ORCID_CLIENT_ID,
      response_type: "code", // Usando 'code' ao invés de 'token', para garantir o fluxo OAuth adequado
      scope: "/authenticate /read-public",
      redirect_uri: VITE_ORCID_REDIRECT_URI,
    });

    // Redirecionamento para a URL de autenticação ORCID
    window.location.assign(`https://orcid.org/oauth/authorize?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-gray-800">RCEI - Repositório Científico e Educacional Integrado</Link>
            <div>
              <Link to="/login" className="mr-4 text-gray-700 hover:text-gray-900">Login</Link>
              <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors">Cadastre-se</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center p-8">
        <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8">
          {/* Card ORCID */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2"
          >
            <Card className="rounded-2xl shadow-lg border border-gray-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-semibold text-gray-800">
                  Entrar com ORCID
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 text-sm text-center mb-6">
                  Para acessar o sistema RCEI, conecte-se com sua conta ORCID.
                </p>
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-xl"
                  onClick={handleOrcidLogin}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Conectar com ORCID
                </Button>
                <div className="mt-6 text-center text-xs text-gray-500">
                  ORCID é uma plataforma que permite identificar pesquisadores de forma única.
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Separador (apenas em telas maiores) */}
          <div className="hidden md:flex items-center justify-center text-gray-400 font-semibold">OU</div>

          {/* Card Formulário Manual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full md:w-1/2"
          >
            <Card className="rounded-2xl shadow-lg border border-gray-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-semibold text-gray-800">
                  Login
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="password"
                    name="senha"
                    placeholder="Senha"
                    value={formData.senha}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-xl flex justify-center items-center"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Entrar
                  </Button>
                  <div className="text-center text-sm text-gray-600">
                    Ainda não tem uma conta? <Link to="/register" className="text-green-500 hover:underline">Cadastre-se</Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 RCEI. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
