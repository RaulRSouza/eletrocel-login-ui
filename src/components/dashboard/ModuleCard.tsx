import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

const SUN = "#facc15";

export interface ModuleCardProps {
  to: string;
  title: string;
  description: string;
  icon: LucideIcon;
  disabled?: boolean;
  index?: number;
}

export function ModuleCard({
  to,
  title,
  description,
  icon: Icon,
  disabled,
  index = 0,
}: ModuleCardProps) {
  const content = (
    <>
      <div className="flex items-start justify-between">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform group-hover:scale-105"
          style={{ background: `${SUN}14`, color: SUN }}
        >
          <Icon className="h-5 w-5" />
        </div>
        <ArrowUpRight
          className="h-4 w-4 text-slate-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-200"
          aria-hidden
        />
      </div>
      <div className="mt-5">
        <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">{description}</p>
      </div>
      {disabled && (
        <span className="absolute right-4 top-4 rounded-full bg-white/5 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-slate-400">
          em breve
        </span>
      )}
    </>
  );

  const className =
    "group relative flex h-full flex-col rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-colors hover:border-white/15 hover:bg-white/[0.04]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index + 0.15, duration: 0.4 }}
      className={disabled ? "opacity-60" : ""}
    >
      {disabled ? (
        <div className={className}>{content}</div>
      ) : (
        <Link to={to} className={className}>
          {content}
        </Link>
      )}
    </motion.div>
  );
}
