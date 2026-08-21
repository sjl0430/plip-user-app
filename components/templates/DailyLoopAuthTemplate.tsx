import { ui } from "@/components/atoms/styles";
import type { ReactNode } from "react";

type DailyLoopAuthTemplateProps = {
  children: ReactNode;
};

export function DailyLoopAuthTemplate({ children }: DailyLoopAuthTemplateProps) {
  return (
    <main className={`${ui.authPage} md:h-full md:min-h-full`}>
      <div className={ui.authContent}>{children}</div>
    </main>
  );
}
