import { motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";

const SUN = "#facc15";

export interface MetricCardProps {
  label: string;
  value: string;
  delta?: { value: string; positive: boolean };
  icon: LucideIcon;
  spark?: number[];
  index?: number;
}

function Sparkline({ data }: { data: number[] }) {
  if (data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 96;
  const h = 28;
  const step = w / (data.length - 1);
  const points = data
    .map((v, i) => `${i * step},${h - ((v - min) / range) * h}`)
    .join(" ");
  return (
    <svg width={w} height={h} className="opacity-70" aria-hidden>
      <polyline
        fill="none"
        stroke={SUN}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

export function MetricCard({ label, value, delta, icon: Icon, spark, index = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-colors hover:border-white/10"
    >
      <div
        aria-hidden
        className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ background: SUN }}
      />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
            {label}
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-100 tabular-nums">{value}</p>
        </div>
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ background: `${SUN}18`, color: SUN }}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="relative mt-4 flex items-end justify-between">
        {delta ? (
          <span
            className="inline-flex items-center gap-1 text-xs font-medium"
            style={{ color: delta.positive ? "#4ade80" : "#f87171" }}
          >
            {delta.positive ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}
            {delta.value}
          </span>
        ) : (
          <span />
        )}
        {spark && <Sparkline data={spark} />}
      </div>
    </motion.div>
  );
}

export function MetricSkeleton({ index = 0 }: { index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.05 * index }}
      className="rounded-2xl border border-white/5 bg-white/[0.02] p-5"
    >
      <div className="h-3 w-20 animate-pulse rounded bg-white/5" />
      <div className="mt-3 h-7 w-32 animate-pulse rounded bg-white/5" />
      <div className="mt-6 h-3 w-16 animate-pulse rounded bg-white/5" />
    </motion.div>
  );
}
