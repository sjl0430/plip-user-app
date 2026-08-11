import type { ComponentProps } from "react";

type ExternalLinkProps = ComponentProps<"a">;

export function ExternalLink({
  className = "",
  children,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      className={`font-medium text-zinc-950 dark:text-zinc-50 ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
