import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ScreenHeaderProps = {
  leading?: ReactNode;
  trailing?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  align?: "start" | "center";
  trailingFit?: boolean;
  padTitle?: boolean;
  className?: string;
};

export function ScreenHeader({
  leading,
  trailing,
  title,
  subtitle,
  align = "start",
  trailingFit = false,
  padTitle,
  className,
}: ScreenHeaderProps) {
  const titlePad = padTitle ?? Boolean(leading && align === "start");
  const center = (
    <div className={cn("min-w-0", titlePad ? "pt-[14px]" : null, align === "center" ? "text-center" : null)}>
      {title}
      {subtitle}
    </div>
  );

  if (!leading) {
    return (
      <header className={cn("flex items-center justify-between gap-3", className)}>
        {center}
        {trailing}
      </header>
    );
  }

  return (
    <header
      className={cn(
        trailingFit ? "grid-cols-[44px_1fr_auto]" : "grid-cols-[44px_1fr_44px]",
        align === "center" ? "items-center" : "items-start",
        className,
      )}
    >
      {leading}
      {center}
      {trailing ?? <span className="w-[44px]" aria-hidden />}
    </header>
  );
}
