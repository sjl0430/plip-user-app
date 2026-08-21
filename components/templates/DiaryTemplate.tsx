import { BottomNavigation } from "@/components/molecules";
import type { ReactNode } from "react";

type DiaryTemplateProps = {
  children: ReactNode;
};

export function DiaryTemplate({ children }: DiaryTemplateProps) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-full flex-col bg-[var(--dc-page-bg)] font-[family-name:var(--font-inter),var(--font-sans),system-ui,sans-serif] text-[var(--dc-fg-primary)] md:h-full md:min-h-0">
      <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
        <main className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none]">{children}</main>
      </div>
      <BottomNavigation active="diary" variant="light" />
    </div>
  );
}
