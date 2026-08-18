"use client";

import type { ReactNode } from "react";

type AppRouteShellProps = {
  children: ReactNode;
};

/**
 * PC / 모바일 모두 네이티브 반응형 레이아웃을 사용합니다.
 * (과거 Desktop에서 MobileDeviceFrame으로 가두던 방식은 제거)
 */
export function AppRouteShell({ children }: AppRouteShellProps) {
  return children;
}
