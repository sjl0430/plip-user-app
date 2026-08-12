import type { ComponentProps } from "react";

type InputProps = ComponentProps<"input">;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`h-9 w-full rounded-md border border-zinc-200 px-3 text-sm sm:h-10 sm:text-base dark:border-zinc-700 ${className}`}
      {...props}
    />
  );
}
