import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthCallback() {
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const orcidToken = params.get("access_token");
        const orcidId = params.get("orcid");

        async function authenticate() {
            if (!orcidToken || !orcidId) {
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
                        orcidId,
                        orcidToken,
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
