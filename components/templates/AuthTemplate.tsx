import { AppLogo } from "@/components/atoms";
import type { ReactNode } from "react";

type AuthTemplateProps = {
  children: ReactNode;
};

export function AuthTemplate({ children }: AuthTemplateProps) {
  return (
    <main className="plip-page-shell plip-dc-auth items-center px-4 py-8 sm:px-6 sm:py-12 md:px-8 lg:max-w-2xl">
      <div className="plip-auth-logo-plate mb-6 sm:mb-8">
        <AppLogo />
      </div>
      <div className="plip-content-column gap-6 sm:gap-8">{children}</div>
    </main>
  );
}
