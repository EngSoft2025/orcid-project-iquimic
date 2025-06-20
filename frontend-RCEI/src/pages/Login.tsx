import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        senha: "",
    });

    const authUrl = `https://orcid.org/oauth/authorize?client_id=${import.meta.env.VITE_ORCID_CLIENT_ID}&response_type=token&scope=/authenticate&redirect_uri=${import.meta.env.VITE_ORCID_REDIRECT_URI}`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aqui você faria a chamada à API para autenticação
        console.log(`Tentativa de login para: ${formData.email}`); //Remova essa linha
        // Simulação de sucesso no login (para fins de exemplo)
        alert(`Login realizado para: ${formData.email}`);
        navigate("/dashboard");
        setFormData({ email: "", senha: "" });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Navbar */}
            <nav className="bg-white shadow-md">
                <div className="container mx-auto py-4 px-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="text-xl font-bold text-gray-800">RCEI</Link>
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
                                    onClick={() => {
                                        window.location.href = authUrl;
                                    }}
                                >
                                    <LogIn className="w-4 h-4 mr-2" />
                                    Conectar com ORCID
                                </Button>
                                <div className="mt-6 text-center text-xs text-gray-500">
                                    ORCID é uma plataforma que permite identificar pesquisadores de
                                    forma única.
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
                    <p>© 2024 RCEI. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
}