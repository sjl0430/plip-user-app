import type { ComponentProps } from "react";

type ButtonVariant = "primary" | "secondary";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc]",
  secondary:
    "border border-solid border-black/[.08] hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]",
};

type ButtonProps = ComponentProps<"a"> & {
  variant?: ButtonVariant;
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <a
      className={`flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-base font-medium transition-colors md:w-[158px] ${variantStyles[variant]} ${className}`}
      {...props}
    />
  );
}
