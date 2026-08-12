import type { ComponentProps, ReactNode } from "react";

type IconButtonProps = ComponentProps<"button"> & {
  label: string;
  children?: ReactNode;
};

export function IconButton({
  label,
  children,
  className = "",
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={`inline-flex size-8 items-center justify-center rounded-md border border-zinc-200 text-zinc-600 sm:size-9 dark:border-zinc-700 dark:text-zinc-300 ${className}`}
      {...props}
    >
      {children ?? <span aria-hidden className="text-xs">···</span>}
    </button>
  );
}
