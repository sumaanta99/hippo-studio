import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-violet-500/90 text-white hover:bg-violet-500 border border-violet-400/20 shadow-[0_0_0_1px_rgba(139,92,246,0.15)]",
  secondary:
    "bg-zinc-900 text-zinc-200 hover:bg-zinc-800 border border-zinc-800",
  ghost: "bg-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60",
};

export function Button({
  className,
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
