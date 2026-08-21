import type { ComponentProps } from "react";

type GlassInputProps = ComponentProps<"input">;

export function GlassInput({ className = "", ...props }: GlassInputProps) {
  return (
    <input
      className={`bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] border border-[var(--dc-glass-border)] shadow-[var(--dc-shadow)] backdrop-blur-[20px] text-[var(--dc-fg-primary)] h-12 w-full rounded-[10px] px-4 text-sm font-medium text-[var(--dc-fg-primary)] placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-white/70 sm:h-14 sm:px-4 sm:text-base ${className}`}
      {...props}
    />
  );
}
