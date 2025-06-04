import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function OrcidSignupPage() {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Cadastro realizado para: ${formData.nome} (${formData.email})`);
        setFormData({ nome: "", email: "", senha: "" });
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
            <Navbar />

            <main className="flex-grow flex flex-row items-center justify-center pt-20 pb-16 px-4 space-x-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    {/* Card ORCID */}
                    <Card className="rounded-2xl shadow-xl border border-slate-200">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl font-semibold text-slate-700">
                                Entrar com ORCID
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-600 text-sm text-center mb-6">
                                Para acessar o sistema RCEI, conecte-se com sua conta ORCID.
                            </p>
                            <Button
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-xl"
                                onClick={() => {
                                    window.location.href = "/api/auth/orcid";
                                }}
                            >
                                <LogIn className="w-4 h-4 mr-2" />
                                Conectar com ORCID
                            </Button>
                            <div className="mt-6 text-center text-xs text-slate-500">
                                ORCID é uma plataforma que permite identificar pesquisadores de
                                forma única.
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <div className="text-slate-400 font-semibold">OU</div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="w-full max-w-md"
                >
                    {/* Card Formulário Manual */}
                    <Card className="rounded-2xl shadow-xl border border-slate-200">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl font-semibold text-slate-700">
                                Cadastro Manual
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    name="nome"
                                    placeholder="Nome completo"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="E-mail"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                                />
                                <input
                                    type="password"
                                    name="senha"
                                    placeholder="Senha"
                                    value={formData.senha}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                                />
                                <Button
                                    type="submit"
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-xl flex justify-center items-center"
                                >
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Cadastrar
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
