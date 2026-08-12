"use client";

import { useCallback, useEffect, useState } from "react";
import { CursorSpark } from "@/components/atoms/CursorSpark";
import { CursorShapePicker } from "@/components/molecules/CursorShapePicker";
import {
  DEFAULT_CURSOR_SPARK_SHAPE_ID,
  getCursorSparkShape,
} from "@/config/cursorSparkShapes";
import { useDesktopPointer } from "@/hooks/useDesktopPointer";

const STORAGE_KEY = "plip-cursor-spark-shape";

type Spark = {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
};

const MAX_SPARKS = 28;
const SPARK_LIFETIME_MS = 540;
const SPAWN_INTERVAL_MS = 90;
const MIN_MOVE_PX = 5;

function readStoredShapeId() {
  if (typeof window === "undefined") {
    return DEFAULT_CURSOR_SPARK_SHAPE_ID;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return DEFAULT_CURSOR_SPARK_SHAPE_ID;
  }

  return getCursorSparkShape(stored).id === stored
    ? stored
    : DEFAULT_CURSOR_SPARK_SHAPE_ID;
}

export function IntroCursorEffects() {
  const enabled = useDesktopPointer();
  const [shapeId, setShapeId] = useState(readStoredShapeId);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);

  const handleSelectShape = useCallback((nextShapeId: string) => {
    setShapeId(nextShapeId);
    setPickerOpen(false);
    window.localStorage.setItem(STORAGE_KEY, nextShapeId);
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let idCounter = 0;
    const cursor = { x: 0, y: 0 };
    const lastSpawn = { x: 0, y: 0, t: 0 };
    let moving = false;
    let moveTimeout: number | undefined;

    const spawnSpark = (x: number, y: number) => {
      const id = ++idCounter;
      const spark: Spark = {
        id,
        x: x + (Math.random() - 0.5) * 16,
        y: y + (Math.random() - 0.5) * 16,
        rotation: (Math.random() - 0.5) * 80,
        scale: 0.5 + Math.random() * 0.85,
      };

      setSparks((prev) => [...prev.slice(-(MAX_SPARKS - 1)), spark]);

      window.setTimeout(() => {
        setSparks((prev) => prev.filter((item) => item.id !== id));
      }, SPARK_LIFETIME_MS);
    };

    const onMove = (event: MouseEvent) => {
      cursor.x = event.clientX;
      cursor.y = event.clientY;
      moving = true;

      window.clearTimeout(moveTimeout);
      moveTimeout = window.setTimeout(() => {
        moving = false;
      }, 140);

      const dx = event.clientX - lastSpawn.x;
      const dy = event.clientY - lastSpawn.y;
      const distance = Math.hypot(dx, dy);
      const now = performance.now();

      if (distance >= MIN_MOVE_PX && now - lastSpawn.t >= 35) {
        spawnSpark(event.clientX, event.clientY);
        lastSpawn.x = event.clientX;
        lastSpawn.y = event.clientY;
        lastSpawn.t = now;
      }
    };

    const interval = window.setInterval(() => {
      if (!moving || (cursor.x === 0 && cursor.y === 0)) {
        return;
      }

      spawnSpark(cursor.x, cursor.y);
    }, SPAWN_INTERVAL_MS);

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.clearInterval(interval);
      window.clearTimeout(moveTimeout);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div className="cursor-lightning-layer" aria-hidden="true">
        {sparks.map((spark) => (
          <CursorSpark
            key={spark.id}
            sparkId={spark.id}
            shapeId={shapeId}
            {...spark}
          />
        ))}
      </div>

      <CursorShapePicker
        selectedShapeId={shapeId}
        open={pickerOpen}
        onToggle={() => setPickerOpen((open) => !open)}
        onClose={() => setPickerOpen(false)}
        onSelect={handleSelectShape}
      />
    </>
  );
}
