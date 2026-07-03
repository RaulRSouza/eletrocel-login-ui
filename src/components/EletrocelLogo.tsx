import { motion } from "motion/react";

interface EletrocelLogoProps {
  size?: number;
  className?: string;
  primary?: string;
  soft?: string;
}

/**
 * Vectorized Eletrocel mark: a stylized lowercase "e" inside a smartphone
 * silhouette wrapped by two orbital rings — a clean SVG rebuild of the
 * reference logo, redrawn for the Midnight & Sun palette.
 */
export function EletrocelLogo({
  size = 96,
  className,
  primary = "#facc15",
  soft = "#fef08a",
}: EletrocelLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Eletrocel"
      role="img"
    >
      <defs>
        <linearGradient id="ec-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={soft} />
          <stop offset="55%" stopColor={primary} />
          <stop offset="100%" stopColor={primary} stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id="ec-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={soft} stopOpacity="0.9" />
          <stop offset="100%" stopColor={primary} stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Rotating orbital rings */}
      <motion.g
        style={{ transformOrigin: "100px 100px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <ellipse
          cx="100"
          cy="100"
          rx="78"
          ry="30"
          transform="rotate(-24 100 100)"
          stroke="url(#ec-ring)"
          strokeWidth="2.2"
          fill="none"
        />
      </motion.g>
      <motion.g
        style={{ transformOrigin: "100px 100px" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        <ellipse
          cx="100"
          cy="100"
          rx="82"
          ry="24"
          transform="rotate(28 100 100)"
          stroke="url(#ec-ring)"
          strokeWidth="1.4"
          strokeDasharray="2 6"
          fill="none"
          opacity="0.75"
        />
      </motion.g>

      {/* Smartphone body */}
      <rect
        x="66"
        y="42"
        width="68"
        height="116"
        rx="14"
        stroke="url(#ec-gold)"
        strokeWidth="3.2"
        fill="none"
      />
      {/* Speaker slit */}
      <rect x="90" y="52" width="20" height="2.6" rx="1.3" fill={primary} opacity="0.85" />
      {/* Home indicator */}
      <rect x="88" y="148" width="24" height="2.6" rx="1.3" fill={primary} opacity="0.6" />

      {/* Stylized lowercase "e" */}
      <path
        d="M120 96
           a22 22 0 1 0 -6 20
           M80 100
           h40"
        stroke="url(#ec-gold)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Corner glints */}
      <circle cx="30" cy="70" r="1.6" fill={soft} opacity="0.9" />
      <circle cx="170" cy="132" r="1.6" fill={soft} opacity="0.9" />
    </svg>
  );
}

export default EletrocelLogo;
