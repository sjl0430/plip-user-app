"use client";

import { useEffect, useId, useRef } from "react";
import { AnimatedDropdown } from "@/components/molecules/AnimatedOverlays";
import {
  CURSOR_SPARK_SHAPES,
  type CursorSparkShape,
} from "@/config/cursorSparkShapes";

type CursorShapePickerProps = {
  selectedShapeId: string;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  onSelect: (shapeId: string) => void;
};

function MousePointerIcon() {
  return (
    <svg className="cursor-shape-picker__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M5.5 3.2 L5.5 18.8 L9.8 14.8 L13.2 21.5 L15.4 20.4 L12 13.7 L17.5 13.7 Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ShapePreview({ shape }: { shape: CursorSparkShape }) {
  return (
    <svg viewBox={shape.viewBox} aria-hidden="true" focusable="false">
      <path d={shape.path} fill="currentColor" />
    </svg>
  );
}

export function CursorShapePicker({
  selectedShapeId,
  open,
  onToggle,
  onClose,
  onSelect,
}: CursorShapePickerProps) {
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        onClose();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div ref={rootRef} className="cursor-shape-picker">
      <button
        type="button"
        className={`cursor-shape-picker__trigger ${open ? "is-open" : ""}`.trim()}
        aria-label="커서 이펙트 모양 선택"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <MousePointerIcon />
      </button>

      <AnimatedDropdown
        open={open}
        id={panelId}
        role="dialog"
        aria-label="커서 이펙트 모양"
        className="cursor-shape-picker__panel"
      >
        <div className="cursor-shape-picker__grid" role="group" aria-label="모양 목록">
          {CURSOR_SPARK_SHAPES.map((shape) => {
            const selected = shape.id === selectedShapeId;

            return (
              <button
                key={shape.id}
                type="button"
                className={`cursor-shape-picker__option ${selected ? "is-selected" : ""}`.trim()}
                aria-label={shape.label}
                aria-pressed={selected}
                onClick={() => onSelect(shape.id)}
              >
                <ShapePreview shape={shape} />
              </button>
            );
          })}
        </div>
      </AnimatedDropdown>
    </div>
  );
}
