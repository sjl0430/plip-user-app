"use client";
import animStyles from "./CursorShapePicker.module.css";

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
    <svg className="w-[1.15rem] h-[1.15rem]" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
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
    <div ref={rootRef} className="[@media(hover:none),(pointer:coarse)]:hidden motion-reduce:hidden fixed top-[1.25rem] right-[1.25rem] z-50">
      <button
        type="button"
        className={`${animStyles.cursorShapePickerTrigger} ${open ? animStyles.isOpen : ""}`.trim()}
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
        className="absolute top-[calc(100%_+_0.55rem)] right-[0] p-[0.55rem_0.6rem] border border-[rgba(170,_220,_255,_0.22)] rounded-[1rem] bg-[rgba(6,_14,_44,_0.88)] shadow-[0_12px_32px_rgba(0,_0,_0,_0.28)] backdrop-blur-[12px]"
      >
        <div className="grid grid-cols-[repeat(5,_2.25rem)] gap-[0.15rem]" role="group" aria-label="모양 목록">
          {CURSOR_SPARK_SHAPES.map((shape) => {
            const selected = shape.id === selectedShapeId;

            return (
              <button
                key={shape.id}
                type="button"
                className={`${animStyles.cursorShapePickerOption} ${selected ? animStyles.isSelected : ""}`.trim()}
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
