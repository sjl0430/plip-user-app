import type { ComponentProps } from "react";

type SwitchProps = Omit<ComponentProps<"input">, "type">;

export function Switch({ className = "", ...props }: SwitchProps) {
  return (
    <input
      type="checkbox"
      role="switch"
      className={`h-5 w-9 appearance-none rounded-full bg-zinc-200 checked:bg-zinc-800 dark:bg-zinc-700 dark:checked:bg-zinc-200 ${className}`}
      {...props}
    />
  );
}
