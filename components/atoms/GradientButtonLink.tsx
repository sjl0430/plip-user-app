import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type GradientButtonLinkProps = ComponentProps<typeof Link> & {
  children: ReactNode;
  fullWidth?: boolean;
};

export function GradientButtonLink({
  children,
  className = "",
  fullWidth = true,
  ...props
}: GradientButtonLinkProps) {
  return (
    <Link
      className={`border border-[var(--dc-glass-border)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] shadow-[var(--dc-shadow)] backdrop-blur-[20px] [&_span]:!text-[var(--dc-fg-primary)] [&_span]:font-[var(--font-inter),_var(--font-sans),_system-ui,_sans-serif] [&_span]:text-[0.9375rem] [&_span]:font-semibold [&_span]:tracking-[0.02em] relative inline-flex h-12 items-center justify-center overflow-hidden rounded-[200px] sm:h-[55px] ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      <span className="relative z-10 font-[family-name:var(--font-gothic-a1)] text-lg font-semibold uppercase tracking-wide text-white sm:text-xl">
        {children}
      </span>
    </Link>
  );
}
