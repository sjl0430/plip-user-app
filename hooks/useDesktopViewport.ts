"use client";

import { useEffect, useState } from "react";

export function useDesktopViewport() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const viewportMq = window.matchMedia("(min-width: 768px)");

    const update = () => {
      setIsDesktop(viewportMq.matches);
    };

    update();
    viewportMq.addEventListener("change", update);

    return () => {
      viewportMq.removeEventListener("change", update);
    };
  }, []);

  return isDesktop;
}
