import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Loader2, Mail, Lock, AlertCircle } from "lucide-react";
import logo from "@/assets/eletrocel-logo.jpg";

export interface LoginPageProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

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
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 py-10 text-neutral-100">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 20%, rgba(234,179,8,0.18), transparent 60%), radial-gradient(50% 40% at 85% 85%, rgba(202,138,4,0.15), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #eab308 1px, transparent 1px), linear-gradient(to bottom, #eab308 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />

      <section className="relative w-full max-w-md">
        <div className="rounded-2xl border border-yellow-500/20 bg-neutral-950/80 p-8 shadow-[0_20px_60px_-15px_rgba(234,179,8,0.35)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_25px_70px_-15px_rgba(234,179,8,0.5)] sm:p-10">
          {/* Logo */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 h-20 w-20 overflow-hidden rounded-2xl ring-2 ring-yellow-500/40">
              <img src={logo} alt="Eletrocel" className="h-full w-full object-cover" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-yellow-400">
              ELETROCEL
            </h1>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-neutral-500">
              Sistema de Gestão
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-neutral-200">
                E-mail
              </label>
              <div className="group relative">
                <Mail
                  aria-hidden
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 transition-colors group-focus-within:text-yellow-400"
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
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-900/60 py-2.5 pl-10 pr-3 text-sm text-neutral-100 placeholder:text-neutral-600 transition-all outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-neutral-200">
                Senha
              </label>
              <div className="group relative">
                <Lock
                  aria-hidden
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 transition-colors group-focus-within:text-yellow-400"
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
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-900/60 py-2.5 pl-10 pr-11 text-sm text-neutral-100 placeholder:text-neutral-600 transition-all outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 disabled:cursor-not-allowed disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  aria-pressed={showPassword}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-neutral-500 transition-colors hover:bg-yellow-500/10 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/40"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember + forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex cursor-pointer items-center gap-2 text-neutral-400 select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 cursor-pointer rounded border-neutral-700 bg-neutral-900 accent-yellow-500 focus:ring-2 focus:ring-yellow-500/40"
                />
                Lembrar-me
              </label>
              <button
                type="button"
                className="font-medium text-yellow-400/80 transition-colors hover:text-yellow-300"
              >
                Esqueci a senha
              </button>
            </div>

            {/* Error */}
            {displayError && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-400 animate-in fade-in slide-in-from-top-1"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <span>{displayError}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-400 px-4 py-2.5 text-sm font-semibold text-neutral-950 shadow-lg shadow-yellow-500/20 transition-all duration-200 hover:shadow-yellow-500/40 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-neutral-950 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          {/* Test credentials hint */}
          <div className="mt-6 rounded-lg border border-yellow-500/15 bg-yellow-500/5 px-4 py-3 text-xs text-neutral-400">
            <p className="mb-1 font-semibold uppercase tracking-wider text-yellow-400/80">
              Credenciais de teste
            </p>
            <p>
              <span className="text-neutral-500">E-mail:</span> admin@eletrocel.com
            </p>
            <p>
              <span className="text-neutral-500">Senha:</span> admin123
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-neutral-600">
          © {new Date().getFullYear()} Eletrocel — Celulares, acessórios e assistência
        </p>
      </section>
    </main>
  );
}

export default LoginPage;
