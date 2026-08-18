import type { ButtonHTMLAttributes, ReactNode } from "react";

type PillProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  selected?: boolean;
};

export function Pill({ children, selected = false, className = "", type = "button", ...props }: PillProps) {
  return (
    <button
      type={type}
      className={`dl-pill ${selected ? "dl-pill--brand" : ""} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
