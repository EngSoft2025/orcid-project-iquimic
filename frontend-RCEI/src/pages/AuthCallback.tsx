import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthCallback() {
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const token = params.get("access_token");
        if (token) {
            login(token);
        }
        navigate("/dashboard");
    }, [navigate, login]);

    return <div className="p-4">Autenticando...</div>;
}
