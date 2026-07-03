import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, EyeOff, Loader2, Mail, Lock, AlertCircle, ArrowRight } from "lucide-react";
import logo from "@/assets/eletrocel-logo.jpg";

export interface LoginPageProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

// Palette calibrated to the logo: warm gold on rich black
const GOLD = "#d4a24c";
const GOLD_SOFT = "#e8c078";
const GOLD_DEEP = "#a67a2a";

export function LoginPage({ onSubmit, isLoading, error }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
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
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#0a0806] px-4 py-10 text-neutral-100">
      {/* Animated ambient orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${GOLD}33, transparent 70%)` }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 h-[560px] w-[560px] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${GOLD_DEEP}40, transparent 70%)` }}
        animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, ${GOLD} 1px, transparent 1px), linear-gradient(to bottom, ${GOLD} 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />

      {/* Floating specks */}
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute h-1 w-1 rounded-full"
          style={{
            background: GOLD_SOFT,
            left: `${(i * 83) % 100}%`,
            top: `${(i * 47) % 100}%`,
            boxShadow: `0 0 8px ${GOLD}`,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{
            duration: 4 + (i % 5),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      <motion.section
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        {/* Gradient border wrapper */}
        <div
          className="rounded-[22px] p-[1px]"
          style={{
            background: `linear-gradient(140deg, ${GOLD}66, transparent 40%, ${GOLD_DEEP}55)`,
          }}
        >
          <div
            className="relative rounded-[21px] bg-[#0f0b07]/90 p-8 backdrop-blur-xl sm:p-10"
            style={{ boxShadow: `0 30px 80px -20px ${GOLD}33` }}
          >
            {/* Sheen sweep */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-[21px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="absolute -top-1/2 h-[200%] w-1/3 -skew-x-12"
                style={{
                  background: `linear-gradient(90deg, transparent, ${GOLD}18, transparent)`,
                }}
                animate={{ x: ["-150%", "350%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
              />
            </motion.div>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="relative mb-8 flex flex-col items-center text-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="mb-4 h-24 w-24 overflow-hidden rounded-2xl p-[2px]"
                style={{
                  background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DEEP})`,
                  boxShadow: `0 0 30px ${GOLD}55`,
                }}
              >
                <img
                  src={logo}
                  alt="Eletrocel"
                  className="h-full w-full rounded-[14px] object-cover"
                />
              </motion.div>
              <h1
                className="text-2xl font-bold tracking-[0.15em]"
                style={{ color: GOLD }}
              >
                ELETROCEL
              </h1>
              <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                Celulares · Acessórios · Assistência
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} noValidate className="relative space-y-5">
              <FieldWrap delay={0.25}>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-neutral-200">
                  E-mail
                </label>
                <div className="group relative">
                  <Mail
                    aria-hidden
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 transition-colors group-focus-within:text-[color:var(--gold)]"
                    style={{ ["--gold" as string]: GOLD }}
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="admin@eletrocel.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    aria-label="E-mail"
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950/70 py-2.5 pl-10 pr-3 text-sm text-neutral-100 placeholder:text-neutral-600 transition-all outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/30 disabled:cursor-not-allowed disabled:opacity-60"
                    style={{ ["--gold" as string]: GOLD }}
                  />
                </div>
              </FieldWrap>

              <FieldWrap delay={0.32}>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-neutral-200">
                  Senha
                </label>
                <div className="group relative">
                  <Lock
                    aria-hidden
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 transition-colors group-focus-within:text-[color:var(--gold)]"
                    style={{ ["--gold" as string]: GOLD }}
                  />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    aria-label="Senha"
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950/70 py-2.5 pl-10 pr-11 text-sm text-neutral-100 placeholder:text-neutral-600 transition-all outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/30 disabled:cursor-not-allowed disabled:opacity-60"
                    style={{ ["--gold" as string]: GOLD }}
                  />
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    aria-pressed={showPassword}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-neutral-500 transition-colors hover:text-[color:var(--gold)] focus:outline-none"
                    style={{ ["--gold" as string]: GOLD }}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={showPassword ? "off" : "on"}
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.15 }}
                        className="block"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </motion.span>
                    </AnimatePresence>
                  </motion.button>
                </div>
              </FieldWrap>

              <FieldWrap delay={0.38}>
                <div className="flex items-center justify-between text-sm">
                  <label className="flex cursor-pointer items-center gap-2 text-neutral-400 select-none">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="h-4 w-4 cursor-pointer rounded border-neutral-700 bg-neutral-900 focus:ring-2"
                      style={{ accentColor: GOLD }}
                    />
                    Lembrar-me
                  </label>
                  <button
                    type="button"
                    className="font-medium transition-colors hover:brightness-125"
                    style={{ color: GOLD_SOFT }}
                  >
                    Esqueci a senha
                  </button>
                </div>
              </FieldWrap>

              <AnimatePresence>
                {displayError && (
                  <motion.div
                    key="err"
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    transition={{ duration: 0.25 }}
                    role="alert"
                    className="overflow-hidden"
                  >
                    <motion.div
                      animate={{ x: [0, -6, 6, -4, 4, 0] }}
                      transition={{ duration: 0.4 }}
                      className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-400"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                      <span>{displayError}</span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <FieldWrap delay={0.44}>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg px-4 py-3 text-sm font-bold text-neutral-950 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-950 disabled:cursor-not-allowed disabled:opacity-70"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD_SOFT}, ${GOLD}, ${GOLD_DEEP})`,
                    boxShadow: `0 10px 30px -8px ${GOLD}88`,
                  }}
                >
                  {/* Shine on hover */}
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                  />
                  <span className="relative flex items-center gap-2">
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        Entrando...
                      </>
                    ) : (
                      <>
                        Entrar
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                </motion.button>
              </FieldWrap>
            </form>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-center text-xs text-neutral-600"
        >
          © {new Date().getFullYear()} Eletrocel — Sistema de Gestão
        </motion.p>
      </motion.section>
    </main>
  );
}

function FieldWrap({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default LoginPage;
