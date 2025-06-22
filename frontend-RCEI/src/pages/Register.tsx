import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: "",
    });
    const [senhaDiferente, setSenhaDiferente] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        if (e.target.name === "confirmarSenha") {
            setSenhaDiferente(e.target.value !== formData.senha)
        }
        if (e.target.name === "senha") {
            setSenhaDiferente(e.target.value !== formData.confirmarSenha)
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.senha !== formData.confirmarSenha) {
            alert("As senhas não conferem.");
            return;
        }

        try {
            const response = await fetch(import.meta.env.VITE_BACK_BASE_URL + '/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: formData.nome,
                    email: formData.email,
                    senha: formData.senha,
                    confirmarSenha: formData.confirmarSenha,
                    tipo: 'aluno', // Alterar conforme necessário
                    // Não enviar orcidId
                }),
            });

            const result = await response.json();
            if (response.ok) {
                alert(`Cadastro realizado para: ${formData.nome} (${formData.email})`);
                navigate("/login");
            } else {
                alert(result.error || 'Erro ao cadastrar usuário');
            }
        } catch (error) {
            console.error('Erro de rede:', error);
            alert('Erro ao se conectar com o servidor');
        }

        setFormData({ nome: "", email: "", senha: "", confirmarSenha: "" });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="flex-grow flex items-center justify-center p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    {/* Card Formulário de Cadastro */}
                    <Card className="rounded-2xl shadow-lg border border-gray-200">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl font-semibold text-gray-800">
                                Cadastre-se
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    name="nome"
                                    placeholder="Nome completo"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
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
                                <input
                                    type="password"
                                    name="confirmarSenha"
                                    placeholder="Confirmar senha"
                                    value={formData.confirmarSenha}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                {senhaDiferente && (
                                    <p className="text-red-500 text-sm">As senhas não coincidem.</p>
                                )}
                                <Button
                                    type="submit"
                                    className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-xl flex justify-center items-center"
                                >
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Cadastrar
                                </Button>
                                <div className="text-center text-sm text-gray-600">
                                    Já tem uma conta? <Link to="/login" className="text-green-500 hover:underline">Entrar</Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
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