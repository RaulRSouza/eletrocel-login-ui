import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { EletrocelLogo } from "@/components/EletrocelLogo";

export const NIGHT = "#0a0e1a";
export const SUN = "#facc15";

interface AuthShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  backTo?: string;
  backLabel?: string;
}

export function AuthShell({ title, subtitle, children, backTo, backLabel }: AuthShellProps) {
  return (
    <main
      className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6 py-12 text-slate-100"
      style={{ background: NIGHT }}
    >
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
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-10 flex flex-col items-center text-center"
        >
          <EletrocelLogo size={64} primary={SUN} soft={SUN} />
          <h1 className="mt-5 text-base font-medium tracking-[0.32em] text-slate-100">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 max-w-[280px] text-xs leading-relaxed text-slate-500">
              {subtitle}
            </p>
          )}
        </motion.div>

        {children}

        {backTo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-8 text-center"
          >
            <Link
              to={backTo}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-slate-200"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {backLabel ?? "Voltar"}
            </Link>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mt-10 text-center text-[10px] tracking-[0.2em] text-slate-600"
        >
          © {new Date().getFullYear()} ELETROCEL
        </motion.p>
      </motion.section>
    </main>
  );
}
