"use client";

import { motion } from "framer-motion";

interface HippoMarkProps {
  className?: string;
  size?: "sm" | "md";
}

const sizeClasses = {
  sm: "h-14 w-14 sm:h-16 sm:w-16",
  md: "h-24 w-24 sm:h-28 sm:w-28",
};

export function HippoMark({ className, size = "md" }: HippoMarkProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      className={`inline-flex items-center justify-center ${className ?? ""}`}
    >
      <div className="relative flex items-center justify-center">
        <div className="pointer-events-none absolute inset-0 scale-150 rounded-full bg-violet-500/10 blur-2xl" />
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          <svg
            viewBox="0 0 120 78"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
            className={sizeClasses[size]}
          >
        <ellipse
          cx="60"
          cy="88"
          rx="34"
          ry="5"
          fill="rgba(139,92,246,0.12)"
        />

        <path
          d="M28 52c0-18 14-32 32-32s32 14 32 32v8c0 4-3 7-7 7H35c-4 0-7-3-7-7v-8Z"
          fill="#3f3f46"
        />
        <path
          d="M28 52c0-18 14-32 32-32s32 14 32 32v8c0 4-3 7-7 7H35c-4 0-7-3-7-7v-8Z"
          stroke="#52525b"
          strokeWidth="1.5"
        />

        <ellipse cx="38" cy="24" rx="7" ry="9" fill="#52525b" />
        <ellipse cx="82" cy="24" rx="7" ry="9" fill="#52525b" />

        <rect x="34" y="44" width="52" height="22" rx="11" fill="#71717a" />
        <rect x="34" y="44" width="52" height="22" rx="11" stroke="#a1a1aa" strokeWidth="1.5" />

        <ellipse cx="47" cy="53" rx="2.5" ry="3" fill="#18181b" />
        <ellipse cx="73" cy="53" rx="2.5" ry="3" fill="#18181b" />

        <path
          d="M54 58c2 2 10 2 12 0"
          stroke="#18181b"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <circle cx="60" cy="36" r="18" fill="#52525b" />
        <circle cx="60" cy="36" r="18" stroke="#71717a" strokeWidth="1.5" />

        <ellipse cx="48" cy="34" rx="3" ry="3.5" fill="#18181b" />
        <ellipse cx="72" cy="34" rx="3" ry="3.5" fill="#18181b" />
        <circle cx="49" cy="33" r="1" fill="#fafafa" opacity="0.7" />
        <circle cx="73" cy="33" r="1" fill="#fafafa" opacity="0.7" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}
