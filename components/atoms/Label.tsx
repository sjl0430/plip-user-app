import type { ComponentProps } from "react";

type LabelProps = ComponentProps<"label">;

export function Label({ className = "", children, ...props }: LabelProps) {
  return (
    <label
      className={`text-sm font-medium text-zinc-700 dark:text-zinc-300 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}
