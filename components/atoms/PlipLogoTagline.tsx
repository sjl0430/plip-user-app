"use client";

import { useEffect, useState } from "react";
import {
  PLIP_TAGLINE_CHAR_COUNT,
  PLIP_TAGLINE_CHARS,
} from "@/config/plipTaglineChars";

const CHAR_INTERVAL_MS = 65;
const HOLD_WHEN_FULL_MS = 300;

type TaglinePhase = "typing" | "hold" | "erasing";

export function PlipLogoTagline() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [phase, setPhase] = useState<TaglinePhase>("typing");
  const [motionEnabled, setMotionEnabled] = useState(true);

  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionEnabled(!motionMq.matches);
    update();
    motionMq.addEventListener("change", update);
    return () => motionMq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!motionEnabled) {
      return;
    }

    let cancelled = false;
    let timeoutId: number | undefined;

    const schedule = (delay: number, fn: () => void) => {
      timeoutId = window.setTimeout(() => {
        if (!cancelled) {
          fn();
        }
      }, delay);
    };

    const runTyping = (count: number) => {
      if (count >= PLIP_TAGLINE_CHAR_COUNT) {
        setPhase("hold");
        schedule(HOLD_WHEN_FULL_MS, () => {
          setPhase("erasing");
          runErasing(PLIP_TAGLINE_CHAR_COUNT);
        });
        return;
      }

      const next = count + 1;
      setVisibleCount(next);
      schedule(CHAR_INTERVAL_MS, () => runTyping(next));
    };

    const runErasing = (count: number) => {
      if (count <= 0) {
        setPhase("typing");
        schedule(CHAR_INTERVAL_MS, () => runTyping(0));
        return;
      }

      const next = count - 1;
      setVisibleCount(next);
      schedule(CHAR_INTERVAL_MS, () => runErasing(next));
    };

    schedule(CHAR_INTERVAL_MS, () => runTyping(0));

    return () => {
      cancelled = true;
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [motionEnabled]);

  const showAll = !motionEnabled;

  return (
    <g className="plip-logo__tagline" aria-label="PERSONAL CLIP">
      {PLIP_TAGLINE_CHARS.map((d, index) => {
        const visible = showAll || index < visibleCount;
        const isTyping = phase === "typing" && index === visibleCount - 1;
        const isErasing = phase === "erasing" && index === visibleCount;

        return (
          <g
            key={index}
            className={[
              "plip-logo__tagline-char",
              visible ? "is-visible" : "",
              isTyping ? "is-typing" : "",
              isErasing ? "is-erasing" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <path d={d} fill="white" />
          </g>
        );
      })}
    </g>
  );
}
