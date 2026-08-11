import type { ComponentProps } from "react";

type HeadingProps = ComponentProps<"h1">;

export function Heading({ className = "", children, ...props }: HeadingProps) {
  return (
    <h1
      className={`max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 ${className}`}
      {...props}
    >
      {children}
    </h1>
  );
}
