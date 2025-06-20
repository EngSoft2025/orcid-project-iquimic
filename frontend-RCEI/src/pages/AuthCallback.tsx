import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const token = params.get("access_token");
        if (token) {
            localStorage.setItem("orcid_token", token);
        }
        navigate("/dashboard");
    }, [navigate]);

    return <div className="p-4">Autenticando...</div>;
}
