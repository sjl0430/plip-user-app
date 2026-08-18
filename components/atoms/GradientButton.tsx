import type { ComponentProps, ReactNode } from "react";

type GradientButtonProps = ComponentProps<"button"> & {
  children: ReactNode;
  fullWidth?: boolean;
};

export function GradientButton({
  children,
  className = "",
  fullWidth = true,
  type = "button",
  ...props
}: GradientButtonProps) {
  return (
    <button
      type={type}
      className={`plip-gradient-btn relative h-12 overflow-hidden rounded-[8px] sm:h-[55px] ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex h-full items-center justify-center font-[family-name:var(--font-gothic-a1)] text-lg font-extrabold uppercase tracking-wide text-white sm:text-xl">
        {children}
      </span>
    </button>
  );
}
