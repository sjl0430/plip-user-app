import { ui } from "@/components/atoms/styles";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type SubmitButtonProps = ComponentProps<"button"> & {
  variant?: "glass" | "brand" | "outline" | "danger";
};

const variantClass: Record<NonNullable<SubmitButtonProps["variant"]>, string> = {
  glass: cn(ui.glassBtn, ui.glassBtnBlock),
  brand: cn(ui.btn, ui.btnPrimary),
  outline: cn(ui.btn, ui.btnSecondary),
  danger: cn(ui.btn, ui.btnDanger),
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
      className={cn(variantClass[variant], "disabled:opacity-50", className)}
      {...props}
    >
      {children}
    </button>
  );
}
