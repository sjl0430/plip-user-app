import animStyles from "./CursorSpark.module.css";
import type { CSSProperties } from "react";
import { getCursorSparkShape } from "@/config/cursorSparkShapes";

type CursorSparkProps = {
  shapeId: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  sparkId: number;
};

export function CursorSpark({
  shapeId,
  x,
  y,
  rotation,
  scale,
  sparkId,
}: CursorSparkProps) {
  const shape = getCursorSparkShape(shapeId);
  const gradientId = `cursor-spark-fill-${shapeId}-${sparkId}`;

  return (
    <span
      className={`${animStyles.cursorLightningSpark}`}
      style={
        {
          "--spark-x": `${x}px`,
          "--spark-y": `${y}px`,
          "--spark-rot": `${rotation}deg`,
          "--spark-scale": scale,
        } as CSSProperties
      }
    >
      <svg
        className="block w-full h-full [filter:drop-shadow(0_0_4px_rgba(160,_230,_255,_0.95))_drop-shadow(0_0_12px_rgba(80,_170,_255,_0.75))]"
        viewBox={shape.viewBox}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#f5fbff" />
            <stop offset="45%" stopColor="#9fe4ff" />
            <stop offset="100%" stopColor="#4cb8ff" />
          </linearGradient>
        </defs>
        <path d={shape.path} fill={`url(#${gradientId})`} />
      </svg>
      <span className={`${animStyles.cursorLightningSparkFlare}`} />
    </span>
  );
}
