import type { ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {
  variant?: "glass" | "daily";
};

export function Input({ className = "", variant = "glass", ...props }: InputProps) {
  const base =
    variant === "daily"
      ? "dl-input"
      : "dc-glass h-10 w-full px-3 text-sm outline-none sm:h-11 sm:text-base";

  return <input className={`${base} ${className}`} {...props} />;
}
