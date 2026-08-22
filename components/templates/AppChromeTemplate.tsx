import { ui } from "@/components/atoms/styles";
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
      ? "mx-auto flex min-h-dvh w-full flex-col bg-[var(--dl-color-bg-elevated)] font-[family-name:var(--font-inter),var(--font-sans),system-ui,sans-serif] text-[var(--dl-color-text-primary)] md:h-full md:min-h-0"
      : "mx-auto flex min-h-dvh w-full flex-col bg-[var(--plip-tt-bg)] text-[var(--plip-tt-text)] md:h-full md:min-h-0";

  return (
    <div className={`${shellClass} ${className}`.trim()}>
      <div className="flex flex-1 min-w-0 min-h-0 flex-col w-full">
        {header}
        <main className="flex flex-1 min-h-0 flex-col w-full">{children}</main>
      </div>
      {showNav ? <BottomNavigation active={activeTab} variant={variant} /> : null}
    </div>
  );
}

export function AgitFlowChrome({ children }: { children: ReactNode }) {
  return (
    <AppChromeTemplate activeTab="agit" variant="light">
      <div className={`${ui.authContent} min-h-0 flex-1 overflow-y-auto`}>{children}</div>
    </AppChromeTemplate>
  );
}
