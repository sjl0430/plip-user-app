"use client";

import { useEffect, useState } from "react";

export function useDesktopPointer() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const pointerMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setEnabled(pointerMq.matches && !motionMq.matches);
    };

    update();
    pointerMq.addEventListener("change", update);
    motionMq.addEventListener("change", update);

    return () => {
      pointerMq.removeEventListener("change", update);
      motionMq.removeEventListener("change", update);
    };
  }, []);

  return enabled;
}
