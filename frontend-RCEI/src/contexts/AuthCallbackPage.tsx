import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const hash = window.location.hash;
    const token = new URLSearchParams(hash.replace("#", "?")).get("access_token");

    if (token) {
      // Buscar ORCID iD do usuário com o token
      fetch("https://orcid.org/oauth/userinfo", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao buscar dados do usuário");
          return res.json();
        })
        .then((data) => {
          const orcidId = data.sub; // O ORCID iD vem no campo "sub"
          login(token, orcidId);
          navigate("/dashboard");
        })
        .catch(() => {
          alert("Erro ao obter dados do usuário ORCID.");
          navigate("/login");
        });
    } else {
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
