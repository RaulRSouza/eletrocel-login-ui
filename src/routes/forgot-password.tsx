import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ForgotPasswordPage } from "@/components/ForgotPasswordPage";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Eletrocel — Recuperar acesso" },
      {
        name: "description",
        content: "Recupere o acesso ao sistema de gestão da Eletrocel.",
      },
      { property: "og:title", content: "Eletrocel — Recuperar acesso" },
      { property: "og:description", content: "Enviamos um link para redefinir sua senha." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ForgotPasswordRoute,
});

function ForgotPasswordRoute() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (_email: string) => {
    setError(null);
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 900));
      setSubmitted(true);
    } catch {
      setError("Não foi possível enviar o e-mail. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ForgotPasswordPage
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      submitted={submitted}
    />
  );
}
