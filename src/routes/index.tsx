import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LoginPage } from "@/components/LoginPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eletrocel — Entrar no Sistema de Gestão" },
      {
        name: "description",
        content:
          "Acesse o sistema de gestão da Eletrocel: celulares, acessórios e assistência técnica.",
      },
      { property: "og:title", content: "Eletrocel — Entrar" },
      { property: "og:description", content: "Login do sistema de gestão da Eletrocel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 700));
      if (email === "admin@eletrocel.com" && password === "admin123") {
        navigate({ to: "/dashboard" });
      } else {
        setError("Credenciais inválidas. Verifique seu e-mail e senha.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return <LoginPage onSubmit={handleSubmit} isLoading={isLoading} error={error} />;
}
