import { AppLogo } from "@/components/atoms";
import type { ReactNode } from "react";

type AuthTemplateProps = {
  children: ReactNode;
};

export function AuthTemplate({ children }: AuthTemplateProps) {
  return (
    <main className="mx-auto flex min-h-dvh w-full flex-col bg-[var(--dc-page-bg)] text-[var(--dc-fg-primary)] font-[var(--font-inter),_var(--font-sans),_system-ui,_sans-serif] items-center px-4 py-8 sm:px-6 sm:py-12 md:px-8 lg:max-w-2xl">
      <div className="flex items-center justify-center w-full max-w-[14rem] p-[1rem_1.25rem] rounded-[var(--dc-radius)] border border-[var(--dc-glass-border)] bg-[#0b1220] shadow-[var(--dc-shadow-card)] mb-6 sm:mb-8">
        <AppLogo />
      </div>
      <div className="flex w-full max-w-xs flex-col sm:max-w-md md:max-w-lg gap-6 sm:gap-8">{children}</div>
    </main>
  );
}
