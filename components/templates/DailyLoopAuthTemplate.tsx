import type { ReactNode } from "react";

type DailyLoopAuthTemplateProps = {
  children: ReactNode;
};

export function DailyLoopAuthTemplate({ children }: DailyLoopAuthTemplateProps) {
  return (
    <main className="dl-auth-page">
      <div className="dl-auth-content">{children}</div>
    </main>
  );
}
