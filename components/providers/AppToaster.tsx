"use client";

import { Toaster } from "@/components/ui/toast";
import type { ReactNode } from "react";
import { useRef } from "react";

type AppToasterProps = {
  children: ReactNode;
};

/** 폰 프레임 안에 토스트를 붙인다. PC에서 body fixed로 프레임 밖으로 나가지 않게 한다. */
export function AppToaster({ children }: AppToasterProps) {
  const frameRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={frameRef} className="relative flex min-h-dvh flex-1 flex-col md:min-h-0">
      <Toaster portalContainer={frameRef}>{children}</Toaster>
    </div>
  );
}
