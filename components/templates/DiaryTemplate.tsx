import { BottomNavigation } from "@/components/molecules";
import type { ReactNode } from "react";

type DiaryTemplateProps = {
  children: ReactNode;
};

export function DiaryTemplate({ children }: DiaryTemplateProps) {
  return (
    <div className="plip-tt-shell plip-tt-shell--light plip-diary-shell">
      <div className="plip-tt-shell__stage">
        <main className="plip-diary-main plip-tt-shell__main">{children}</main>
      </div>
      <BottomNavigation active="diary" variant="light" />
    </div>
  );
}
