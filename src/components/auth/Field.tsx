import { useState } from "react";
import { motion } from "motion/react";
import { SUN } from "./AuthShell";

interface FieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  autoComplete?: string;
  delay?: number;
  error?: string | null;
  trailing?: React.ReactNode;
}

export function Field({
  id,
  label,
  type,
  value,
  onChange,
  disabled,
  autoComplete,
  delay = 0,
  error,
  trailing,
}: FieldProps) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  const underline = error ? "#f87171" : SUN;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="relative"
    >
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 origin-left transition-all duration-200"
        style={{
          transform: active ? "translateY(-18px) scale(0.78)" : "translateY(8px)",
          color: error ? "#f87171" : active ? SUN : "#64748b",
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
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-label={label}
          className="w-full border-0 bg-transparent pb-2 pt-3 pr-8 text-sm text-slate-100 outline-none placeholder:text-transparent disabled:opacity-60"
        />
        {trailing && <div className="absolute right-0">{trailing}</div>}
      </div>

      <div className="relative h-px w-full bg-white/10">
        <motion.div
          className="absolute inset-y-0 left-0"
          style={{ background: underline }}
          initial={false}
          animate={{ width: focused || error ? "100%" : "0%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {error && (
        <motion.p
          id={`${id}-error`}
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-[11px] text-red-400"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}

export function SubmitButton({
  isLoading,
  children,
  loadingLabel,
  delay = 0.32,
}: {
  isLoading: boolean;
  children: React.ReactNode;
  loadingLabel: string;
  delay?: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileTap={{ scale: 0.985 }}
      type="submit"
      disabled={isLoading}
      className="mt-2 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-slate-950 transition-[transform,box-shadow] duration-200 hover:shadow-[0_0_0_4px_rgba(250,204,21,0.12)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
      style={{ background: SUN }}
    >
      {isLoading ? (
        <>
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950"
            aria-hidden
          />
          {loadingLabel}
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}
