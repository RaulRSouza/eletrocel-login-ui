import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { AuthShell, SUN } from "@/components/auth/AuthShell";
import { Field, SubmitButton } from "@/components/auth/Field";
import { resetPasswordSchema } from "@/lib/auth-schemas";

export interface ResetPasswordPageProps {
  onSubmit: (password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export function ResetPasswordPage({
  onSubmit,
  isLoading,
  error,
  success,
}: ResetPasswordPageProps) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = resetPasswordSchema.safeParse({ password, confirm });
    if (!parsed.success) {
      const errs: { password?: string; confirm?: string } = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as "password" | "confirm";
        if (!errs[key]) errs[key] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    await onSubmit(parsed.data.password);
  };

  const eyeButton = (
    <button
      type="button"
      onClick={() => setShow((v) => !v)}
      aria-label={show ? "Ocultar senha" : "Mostrar senha"}
      className="text-slate-500 transition-colors hover:text-slate-200 focus:outline-none"
    >
      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  );

  return (
    <AuthShell
      title="NOVA SENHA"
      subtitle="Escolha uma nova senha para acessar o sistema."
      backTo="/"
      backLabel="Voltar para o login"
    >
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 rounded-lg border border-white/5 bg-white/[0.02] px-6 py-8 text-center"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }}
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{ background: `${SUN}18`, color: SUN }}
            >
              <CheckCircle2 className="h-5 w-5" />
            </motion.div>
            <div>
              <p className="text-sm text-slate-100">Senha redefinida</p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                Tudo pronto. Você já pode entrar com sua nova senha.
              </p>
            </div>
            <Link
              to="/"
              className="mt-2 inline-flex items-center justify-center rounded-full px-5 py-2 text-xs font-semibold text-slate-950"
              style={{ background: SUN }}
            >
              Ir para o login
            </Link>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            className="space-y-6"
          >
            <Field
              id="password"
              label="Nova senha"
              type={show ? "text" : "password"}
              value={password}
              onChange={(v) => {
                setPassword(v);
                if (errors.password) setErrors((p) => ({ ...p, password: undefined }));
              }}
              disabled={isLoading}
              autoComplete="new-password"
              delay={0.18}
              error={errors.password}
              trailing={eyeButton}
            />

            <Field
              id="confirm"
              label="Confirmar senha"
              type={show ? "text" : "password"}
              value={confirm}
              onChange={(v) => {
                setConfirm(v);
                if (errors.confirm) setErrors((p) => ({ ...p, confirm: undefined }));
              }}
              disabled={isLoading}
              autoComplete="new-password"
              delay={0.24}
              error={errors.confirm}
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

            <SubmitButton isLoading={isLoading} loadingLabel="Salvando">
              Redefinir senha
            </SubmitButton>
          </motion.form>
        )}
      </AnimatePresence>
    </AuthShell>
  );
}

export default ResetPasswordPage;
