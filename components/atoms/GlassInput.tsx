import type { ComponentProps } from "react";

type GlassInputProps = ComponentProps<"input">;

export function GlassInput({ className = "", ...props }: GlassInputProps) {
  return (
    <input
      className={`plip-glass-input h-12 w-full rounded-[10px] px-4 font-[family-name:var(--font-poppins)] text-sm font-bold text-plip-teal placeholder:text-black/20 focus:outline-none focus:ring-2 focus:ring-white/40 sm:h-14 sm:px-4 sm:text-base ${className}`}
      {...props}
    />
  );
}
