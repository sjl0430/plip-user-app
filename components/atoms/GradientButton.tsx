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
      className={`border border-[var(--dc-glass-border)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] shadow-[var(--dc-shadow)] backdrop-blur-[20px] [&_span]:!text-[var(--dc-fg-primary)] [&_span]:font-[var(--font-inter),_var(--font-sans),_system-ui,_sans-serif] [&_span]:text-[0.9375rem] [&_span]:font-semibold [&_span]:tracking-[0.02em] relative h-12 overflow-hidden rounded-[8px] sm:h-[55px] ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex h-full items-center justify-center font-[family-name:var(--font-gothic-a1)] text-lg font-extrabold uppercase tracking-wide text-white sm:text-xl">
        {children}
      </span>
    </button>
  );
}
