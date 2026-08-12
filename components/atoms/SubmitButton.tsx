import type { ComponentProps } from "react";

type SubmitButtonProps = ComponentProps<"button">;

export function SubmitButton({
  className = "",
  type = "submit",
  children,
  ...props
}: SubmitButtonProps) {
  return (
    <button
      type={type}
      className={`flex h-9 w-full items-center justify-center rounded-md bg-zinc-900 px-4 text-sm font-medium text-white disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
