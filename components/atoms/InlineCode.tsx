import type { ComponentProps } from "react";

type InlineCodeProps = ComponentProps<"code">;

export function InlineCode({
  className = "",
  children,
  ...props
}: InlineCodeProps) {
  return (
    <code
      className={`rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08] ${className}`}
      {...props}
    >
      {children}
    </code>
  );
}
