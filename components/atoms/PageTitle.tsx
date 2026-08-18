import type { ComponentProps } from "react";

type PageTitleProps = ComponentProps<"h1">;

export function PageTitle({ className = "", children, ...props }: PageTitleProps) {
  return (
    <h1
      className={`text-center text-lg font-semibold text-current sm:text-xl md:text-2xl ${className}`}
      {...props}
    >
      {children}
    </h1>
  );
}
