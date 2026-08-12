"use client";

import { MobileDeviceFrame } from "@/components/organisms/MobileDeviceFrame";
import { useDesktopViewport } from "@/hooks/useDesktopViewport";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const INTRO_PATHS = new Set(["/"]);

type AppRouteShellProps = {
  children: ReactNode;
};

export function AppRouteShell({ children }: AppRouteShellProps) {
  const pathname = usePathname();
  const isDesktop = useDesktopViewport();
  const isIntro = INTRO_PATHS.has(pathname);

  if (isIntro || !isDesktop) {
    return children;
  }

  return <MobileDeviceFrame>{children}</MobileDeviceFrame>;
}
