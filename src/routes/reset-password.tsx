import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ResetPasswordPage } from "@/components/ResetPasswordPage";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Eletrocel — Nova senha" },
      { name: "description", content: "Defina uma nova senha para o sistema Eletrocel." },
      { property: "og:title", content: "Eletrocel — Nova senha" },
      { property: "og:description", content: "Redefina sua senha em segundos." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPasswordRoute,
});

function ResetPasswordRoute() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (_password: string) => {
    setError(null);
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 900));
      setSuccess(true);
    } catch {
      setError("Não foi possível redefinir a senha. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ResetPasswordPage
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      success={success}
    />
  );
}
