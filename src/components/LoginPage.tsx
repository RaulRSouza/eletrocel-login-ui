import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, EyeOff, Loader2, Mail, Lock, AlertCircle, ArrowRight } from "lucide-react";
import { EletrocelLogo } from "@/components/EletrocelLogo";

export interface LoginPageProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

// Midnight & Sun palette
const NIGHT_DEEP = "#05070f";
const NIGHT = "#0a0e1a";
const NIGHT_SOFT = "#141b2e";
const SUN = "#facc15";
const SUN_SOFT = "#fef08a";

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
    <main
      className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-10 text-slate-100"
      style={{
        background: `radial-gradient(1200px 700px at 15% 10%, ${NIGHT_SOFT} 0%, ${NIGHT} 45%, ${NIGHT_DEEP} 100%)`,
      }}
    >
      {/* Sun halo */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-52 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${SUN}22, transparent 65%)` }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-60 -right-40 h-[560px] w-[560px] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${NIGHT_SOFT}, transparent 70%)` }}
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Precision grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(to right, ${SUN} 1px, transparent 1px), linear-gradient(to bottom, ${SUN} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 35%, transparent 78%)",
        }}
      />

      {/* Constellation specks */}
      {[...Array(18)].map((_, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute rounded-full"
          style={{
            width: (i % 3) + 1,
            height: (i % 3) + 1,
            background: i % 4 === 0 ? SUN : "#ffffff",
            left: `${(i * 53) % 100}%`,
            top: `${(i * 37) % 100}%`,
            boxShadow: i % 4 === 0 ? `0 0 8px ${SUN}` : "0 0 4px #ffffff88",
          }}
          animate={{ opacity: [0.15, 0.9, 0.15] }}
          transition={{
            duration: 3 + (i % 5),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}

      <motion.section
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        {/* Hairline gradient border */}
        <div
          className="rounded-[24px] p-[1px]"
          style={{
            background: `linear-gradient(140deg, ${SUN}55, transparent 45%, ${SUN_SOFT}22 70%, transparent)`,
          }}
        >
          <div
            className="relative overflow-hidden rounded-[23px] p-8 backdrop-blur-xl sm:p-10"
            style={{
              background: `linear-gradient(180deg, ${NIGHT_SOFT}cc, ${NIGHT}f2)`,
              boxShadow: `0 30px 80px -20px ${SUN}22, inset 0 1px 0 #ffffff10`,
            }}
          >
            {/* Sheen sweep */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-[23px]"
            >
              <motion.div
                className="absolute -top-1/2 h-[200%] w-1/3 -skew-x-12"
                style={{
                  background: `linear-gradient(90deg, transparent, ${SUN}14, transparent)`,
                }}
                animate={{ x: ["-150%", "350%"] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
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
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="mb-5"
                style={{ filter: `drop-shadow(0 0 24px ${SUN}55)` }}
              >
                <EletrocelLogo size={104} primary={SUN} soft={SUN_SOFT} />
              </motion.div>
              <h1
                className="text-[26px] font-semibold tracking-[0.32em]"
                style={{
                  color: SUN,
                  background: `linear-gradient(180deg, ${SUN_SOFT}, ${SUN})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ELETROCEL
              </h1>
              <div className="mt-2 flex items-center gap-2">
                <span className="h-px w-6" style={{ background: `linear-gradient(90deg, transparent, ${SUN}88)` }} />
                <p className="text-[10px] uppercase tracking-[0.32em] text-slate-400">
                  Celulares · Acessórios · Assistência
                </p>
                <span className="h-px w-6" style={{ background: `linear-gradient(90deg, ${SUN}88, transparent)` }} />
              </div>
            </motion.div>

            <form onSubmit={handleSubmit} noValidate className="relative space-y-5">
              <FieldWrap delay={0.25}>
                <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  E-mail
                </label>
                <div className="group relative">
                  <Mail
                    aria-hidden
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-[color:var(--sun)]"
                    style={{ ["--sun" as string]: SUN }}
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="voce@eletrocel.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    aria-label="E-mail"
                    className="w-full rounded-lg border border-white/10 bg-slate-950/60 py-2.5 pl-10 pr-3 text-sm text-slate-100 placeholder:text-slate-600 transition-all outline-none focus:border-[color:var(--sun)] focus:ring-2 focus:ring-[color:var(--sun)]/25 disabled:cursor-not-allowed disabled:opacity-60"
                    style={{ ["--sun" as string]: SUN }}
                  />
                </div>
              </FieldWrap>

              <FieldWrap delay={0.32}>
                <label htmlFor="password" className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  Senha
                </label>
                <div className="group relative">
                  <Lock
                    aria-hidden
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-[color:var(--sun)]"
                    style={{ ["--sun" as string]: SUN }}
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
                    className="w-full rounded-lg border border-white/10 bg-slate-950/60 py-2.5 pl-10 pr-11 text-sm text-slate-100 placeholder:text-slate-600 transition-all outline-none focus:border-[color:var(--sun)] focus:ring-2 focus:ring-[color:var(--sun)]/25 disabled:cursor-not-allowed disabled:opacity-60"
                    style={{ ["--sun" as string]: SUN }}
                  />
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    aria-pressed={showPassword}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-500 transition-colors hover:text-[color:var(--sun)] focus:outline-none"
                    style={{ ["--sun" as string]: SUN }}
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
                  <label className="flex cursor-pointer items-center gap-2 text-slate-400 select-none">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="h-4 w-4 cursor-pointer rounded border-white/20 bg-slate-900 focus:ring-2"
                      style={{ accentColor: SUN }}
                    />
                    Lembrar-me
                  </label>
                  <button
                    type="button"
                    className="font-medium transition-colors hover:brightness-125"
                    style={{ color: SUN_SOFT }}
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
                      className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-300"
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
                  className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg px-4 py-3 text-sm font-bold text-slate-950 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
                  style={{
                    background: `linear-gradient(135deg, ${SUN_SOFT}, ${SUN})`,
                    boxShadow: `0 12px 32px -10px ${SUN}88`,
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full"
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
          className="mt-6 text-center text-xs text-slate-500"
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
