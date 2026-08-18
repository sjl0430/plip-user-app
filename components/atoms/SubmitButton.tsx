import type { ComponentProps } from "react";

type SubmitButtonProps = ComponentProps<"button"> & {
  variant?: "glass" | "brand" | "outline";
};

const variantClass: Record<NonNullable<SubmitButtonProps["variant"]>, string> = {
  glass: "dc-btn dc-btn--block",
  brand: "dl-btn dl-btn--primary",
  outline: "dl-btn dl-btn--secondary",
};

export function SubmitButton({
  className = "",
  type = "submit",
  variant = "glass",
  children,
  ...props
}: SubmitButtonProps) {
  return (
    <button
      type={type}
      className={`${variantClass[variant]} disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
