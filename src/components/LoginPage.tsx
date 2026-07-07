import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Field, SubmitButton } from "@/components/auth/Field";
import { loginSchema } from "@/lib/auth-schemas";

export interface LoginPageProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function LoginPage({ onSubmit, isLoading, error }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      const errs: { email?: string; password?: string } = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as "email" | "password";
        if (!errs[key]) errs[key] = issue.message;
      }
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    await onSubmit(parsed.data.email, parsed.data.password);
  };

  return (
    <AuthShell title="ELETROCEL" subtitle="Sistema de gestão · Entre para continuar">
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <Field
          id="email"
          label="E-mail"
          type="email"
          value={email}
          onChange={(v) => {
            setEmail(v);
            if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: undefined }));
          }}
          disabled={isLoading}
          autoComplete="email"
          delay={0.18}
          error={fieldErrors.email}
        />

        <Field
          id="password"
          label="Senha"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(v) => {
            setPassword(v);
            if (fieldErrors.password) setFieldErrors((p) => ({ ...p, password: undefined }));
          }}
          disabled={isLoading}
          autoComplete="current-password"
          delay={0.24}
          error={fieldErrors.password}
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              className="text-slate-500 transition-colors hover:text-slate-200 focus:outline-none"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={showPassword ? "off" : "on"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
          }
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

        <SubmitButton
          isLoading={isLoading}
          loadingLabel="Entrando"
          disabled={email.trim().length === 0 || password.length === 0}
        >
          Entrar
        </SubmitButton>


        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="pt-2 text-center"
        >
          <Link
            to="/forgot-password"
            className="text-xs text-slate-500 transition-colors hover:text-slate-300"
          >
            Esqueci minha senha
          </Link>
        </motion.div>
      </form>
    </AuthShell>
  );
}

export default LoginPage;
