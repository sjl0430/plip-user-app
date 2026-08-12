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
      className={`plip-gradient-btn relative inline-flex h-12 items-center justify-center overflow-hidden rounded-[200px] sm:h-[55px] ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      <span className="relative z-10 font-[family-name:var(--font-gothic-a1)] text-lg font-semibold uppercase tracking-wide text-white sm:text-xl">
        {children}
      </span>
    </Link>
  );
}
