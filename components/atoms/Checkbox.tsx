import type { ComponentProps } from "react";

type CheckboxProps = ComponentProps<"input">;

export function Checkbox({ className = "", ...props }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className={`size-4 rounded border-zinc-300 ${className}`}
      {...props}
    />
  );
}
