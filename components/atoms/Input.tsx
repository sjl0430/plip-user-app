import { ui } from "@/components/atoms/styles";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {
  variant?: "glass" | "daily";
};

export function Input({ className = "", variant = "glass", ...props }: InputProps) {
  const base =
    variant === "daily" ? ui.input : cn(ui.glass, "h-10 w-full px-3 text-sm outline-none sm:h-11 sm:text-base");

  return <input className={cn(base, className)} {...props} />;
}
