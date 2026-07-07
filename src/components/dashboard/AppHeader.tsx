import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import { LogOut, Wifi, WifiOff } from "lucide-react";
import { EletrocelLogo } from "@/components/EletrocelLogo";

const SUN = "#facc15";

const nav = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/produtos", label: "Produtos" },
] as const;

export function AppHeader() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [online, setOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true,
  );

  useEffect(() => {
    const up = () => setOnline(true);
    const down = () => setOnline(false);
    window.addEventListener("online", up);
    window.addEventListener("offline", down);
    return () => {
      window.removeEventListener("online", up);
      window.removeEventListener("offline", down);
    };
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem("eletrocel:session");
        window.sessionStorage.removeItem("eletrocel:session");
      } catch {
        /* ignore storage errors */
      }
    }
    navigate({ to: "/", replace: true });
  };


  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-[#0a0e1a]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link to="/dashboard" className="flex items-center gap-2.5 shrink-0">
          <EletrocelLogo size={28} primary={SUN} soft={SUN} />
          <span className="hidden text-sm font-semibold tracking-[0.28em] text-slate-100 sm:inline">
            ELETROCEL
          </span>
        </Link>

        <nav className="ml-2 flex items-center gap-1">
          {nav.map((n) => {
            const active = pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className="relative rounded-full px-3 py-1.5 text-xs font-medium tracking-wide transition-colors"
                style={{ color: active ? "#0a0e1a" : "#94a3b8" }}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: SUN }}
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  />
                )}
                <span className="relative">{n.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <span
            className="inline-flex items-center gap-1.5 rounded-full border border-white/5 px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase"
            style={{ color: online ? "#4ade80" : "#f87171" }}
            aria-live="polite"
          >
            {online ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
            {online ? "online" : "offline"}
          </span>

          <button
            onClick={handleLogout}
            type="button"
            aria-label="Sair da sessão"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-slate-950 transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/60"
            style={{ background: `linear-gradient(135deg, #fef08a, ${SUN})` }}
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden />
            Sair
          </button>

        </div>
      </div>
    </header>
  );
}
