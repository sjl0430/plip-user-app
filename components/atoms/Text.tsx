import type { ComponentProps } from "react";

type TextProps = ComponentProps<"p">;

export function Text({ className = "", children, ...props }: TextProps) {
  return (
    <p
      className={`max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400 ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}
