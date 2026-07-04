import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, MailCheck } from "lucide-react";
import { AuthShell, SUN } from "@/components/auth/AuthShell";
import { Field, SubmitButton } from "@/components/auth/Field";
import { forgotPasswordSchema } from "@/lib/auth-schemas";

export interface ForgotPasswordPageProps {
  onSubmit: (email: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  submitted: boolean;
}

export function ForgotPasswordPage({
  onSubmit,
  isLoading,
  error,
  submitted,
}: ForgotPasswordPageProps) {
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = forgotPasswordSchema.safeParse({ email });
    if (!parsed.success) {
      setFieldError(parsed.error.issues[0]?.message ?? "E-mail inválido");
      return;
    }
    setFieldError(null);
    await onSubmit(parsed.data.email);
  };

  return (
    <AuthShell
      title="RECUPERAR ACESSO"
      subtitle="Informe seu e-mail e enviaremos um link para redefinir sua senha."
      backTo="/"
      backLabel="Voltar para o login"
    >
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center gap-4 rounded-lg border border-white/5 bg-white/[0.02] px-6 py-8 text-center"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }}
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{ background: `${SUN}18`, color: SUN }}
            >
              <MailCheck className="h-5 w-5" />
            </motion.div>
            <div>
              <p className="text-sm text-slate-100">Verifique seu e-mail</p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                Se <span className="text-slate-300">{email}</span> estiver cadastrado, o link de recuperação chegará em instantes.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            className="space-y-6"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Field
              id="email"
              label="E-mail"
              type="email"
              value={email}
              onChange={(v) => {
                setEmail(v);
                if (fieldError) setFieldError(null);
              }}
              disabled={isLoading}
              autoComplete="email"
              delay={0.18}
              error={fieldError}
            />

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -4, height: 0 }}
                  transition={{ duration: 0.2 }}
                  role="alert"
                  className="flex items-start gap-2 text-xs text-red-400"
                >
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <SubmitButton isLoading={isLoading} loadingLabel="Enviando">
              Enviar link de recuperação
            </SubmitButton>
          </motion.form>
        )}
      </AnimatePresence>
    </AuthShell>
  );
}

export default ForgotPasswordPage;
