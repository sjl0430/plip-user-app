import type { ButtonHTMLAttributes, ReactNode } from "react";

type PillProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  selected?: boolean;
};

export function Pill({ children, selected = false, className = "", type = "button", ...props }: PillProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center border border-[var(--dl-color-border-default)] rounded-[18px] bg-[var(--dl-color-bg-surface)] p-[8px_14px] text-[13px] font-medium leading-[19px] text-[var(--dl-color-text-secondary)] ${selected ? "border-[var(--dl-color-border-brand)] bg-[var(--dl-color-bg-brand)] text-[#fff] m-dlPillBrand" : ""} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
