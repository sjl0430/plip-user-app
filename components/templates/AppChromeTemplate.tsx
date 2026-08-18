import { BottomNavigation, type BottomNavTab } from "@/components/molecules/BottomNavigation";
import type { ReactNode } from "react";

type AppChromeTemplateProps = {
  children: ReactNode;
  activeTab?: BottomNavTab;
  header?: ReactNode;
  showNav?: boolean;
  variant?: "feed" | "light" | "diary";
  className?: string;
};

export function AppChromeTemplate({
  children,
  activeTab = "diary",
  header,
  showNav = true,
  variant = "feed",
  className = "",
}: AppChromeTemplateProps) {
  const shellClass =
    variant === "light" || variant === "diary"
      ? "plip-tt-shell plip-tt-shell--light"
      : "plip-tt-shell";

  return (
    <div className={`${shellClass} ${className}`.trim()}>
      <div className="plip-tt-shell__stage">
        {header}
        <main className="plip-tt-shell__main">{children}</main>
      </div>
      {showNav ? <BottomNavigation active={activeTab} variant={variant} /> : null}
    </div>
  );
}
