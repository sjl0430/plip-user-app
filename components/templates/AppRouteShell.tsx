"use client";

import { MobileDeviceFrame } from "@/components/organisms/MobileDeviceFrame";
import { AppToaster } from "@/components/providers/AppToaster";
import type { ReactNode } from "react";

type AppRouteShellProps = {
  children: ReactNode;
};

/**
 * 실제 모바일은 풀스크린, PC는 Figma(390)와 같은 폰 프레임으로 미리봅니다.
 */
export function AppRouteShell({ children }: AppRouteShellProps) {
  return (
    <MobileDeviceFrame>
      <AppToaster>{children}</AppToaster>
    </MobileDeviceFrame>
  );
}
