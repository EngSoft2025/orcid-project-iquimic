import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// Obtenção dos valores de ambiente
const { VITE_BACK_BASE_URL } = import.meta.env;

export default function LoginPage() {
  const navigate = useNavigate();  // Hook para navegação
  const { login, isAuthenticated } = useAuth();  // Obtemos o estado de autenticação
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  // Se já estiver logado, redireciona para o /search
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/search");
    }

    // Ajustar o tema quando o componente for montado
    const darkModeStatus = localStorage.getItem('darkMode') === 'true';
    if (darkModeStatus) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isAuthenticated, navigate]);

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
      const response = await fetch(VITE_BACK_BASE_URL + '/auth/login', {
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
        localStorage.setItem('authToken', result.token); // Salva o token no localStorage
        login(result.token, result.orcidId);

        // Redirecionar para /search após login
        navigate("/search");
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col dark:bg-gray-900 dark:text-white">
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="w-full max-w-md"> {/* Centralizando o card */}
          {/* Card Formulário Manual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full"
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
