import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { EletrocelLogo } from "@/components/EletrocelLogo";

export interface LoginPageProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const NIGHT = "#0a0e1a";
const SUN = "#facc15";

export function LoginPage({ onSubmit, isLoading, error }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError(null);
    if (!email.trim() || !password.trim()) {
      setLocalError("Preencha e-mail e senha para continuar.");
      return;
    }
    await onSubmit(email.trim(), password);
  };

  const displayError = error ?? localError;

  return (
    <main
      className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6 py-12 text-slate-100"
      style={{ background: NIGHT }}
    >
      {/* Single soft halo */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${SUN}18, transparent 70%)` }}
        animate={{ opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-sm"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-10 flex flex-col items-center"
        >
          <EletrocelLogo size={72} primary={SUN} soft={SUN} />
          <h1
            className="mt-4 text-lg font-medium tracking-[0.42em] text-slate-100"
          >
            ELETROCEL
          </h1>
          <p className="mt-1.5 text-[11px] tracking-[0.24em] text-slate-500">
            SISTEMA DE GESTÃO
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <Field
            id="email"
            label="E-mail"
            type="email"
            value={email}
            onChange={setEmail}
            disabled={isLoading}
            autoComplete="email"
            delay={0.18}
          />

          <Field
            id="password"
            label="Senha"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={setPassword}
            disabled={isLoading}
            autoComplete="current-password"
            delay={0.24}
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
            {displayError && (
              <motion.div
                initial={{ opacity: 0, y: -4, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -4, height: 0 }}
                transition={{ duration: 0.2 }}
                role="alert"
                className="flex items-start gap-2 text-xs text-red-400"
              >
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                <span>{displayError}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.4 }}
            whileTap={{ scale: 0.985 }}
            type="submit"
            disabled={isLoading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-slate-950 transition-[transform,box-shadow] duration-200 hover:shadow-[0_0_0_4px_rgba(250,204,21,0.12)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
            style={{ background: SUN }}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Entrando
              </>
            ) : (
              "Entrar"
            )}
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-2 text-center"
          >
            <button
              type="button"
              className="text-xs text-slate-500 transition-colors hover:text-slate-300"
            >
              Esqueci a senha
            </button>
          </motion.div>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mt-12 text-center text-[10px] tracking-[0.2em] text-slate-600"
        >
          © {new Date().getFullYear()} ELETROCEL
        </motion.p>
      </motion.section>
    </main>
  );
}

function Field({
  id,
  label,
  type,
  value,
  onChange,
  disabled,
  autoComplete,
  delay,
  trailing,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  autoComplete?: string;
  delay: number;
  trailing?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="relative"
    >
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 origin-left text-slate-500 transition-all duration-200"
        style={{
          transform: active ? "translateY(-18px) scale(0.78)" : "translateY(8px)",
          color: active ? SUN : undefined,
        }}
      >
        <span className="text-sm tracking-wide">{label}</span>
      </label>

      <div className="flex items-center">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-label={label}
          className="w-full border-0 bg-transparent pb-2 pt-3 pr-8 text-sm text-slate-100 outline-none placeholder:text-transparent disabled:opacity-60"
        />
        {trailing && <div className="absolute right-0">{trailing}</div>}
      </div>

      {/* Underline */}
      <div className="relative h-px w-full bg-white/10">
        <motion.div
          className="absolute inset-y-0 left-0"
          style={{ background: SUN }}
          initial={false}
          animate={{ width: focused ? "100%" : "0%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}

export default LoginPage;
