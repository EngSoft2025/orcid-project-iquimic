import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthCallback() {
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        async function authenticate() {
            if (!code) {
                navigate("/login");
                return;
            }

            try {
                const res = await fetch("http://localhost:5000/api/auth/orcid", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        code,
                    }),
                });

                const data = await res.json();

                if (res.ok) {
                    login(data.token);
                    navigate("/dashboard");
                } else {
                    console.error(data.error);
                    navigate("/login");
                }
            } catch (error) {
                console.error("Erro ao autenticar via ORCID:", error);
                navigate("/login");
            }
        }

        authenticate();
    }, [navigate, login]);

    return <div className="p-4">Autenticando...</div>;
}
