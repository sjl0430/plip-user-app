"use client";

import { useOverlayTransition } from "@/hooks/useOverlayTransition";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type AnimatedDropdownProps = {
  open: boolean;
  children: ReactNode;
  className?: string;
  id?: string;
  role?: string;
  "aria-label"?: string;
};

export function AnimatedDropdown({
  open,
  children,
  className = "",
  id,
  role = "menu",
  "aria-label": ariaLabel,
}: AnimatedDropdownProps) {
  const { mounted, visible } = useOverlayTransition(open, 200);

  if (!mounted) return null;

  return (
    <div
      id={id}
      role={role}
      aria-label={ariaLabel}
      aria-hidden={!visible}
      className={cn(
        "origin-top-right [transition:opacity_200ms_ease,transform_200ms_cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
        visible
          ? "pointer-events-auto opacity-100 [transform:translateY(0)_scale(1)]"
          : "pointer-events-none opacity-0 [transform:translateY(-6px)_scale(0.96)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

type AnimatedDialogProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
};

export function AnimatedDialog({
  open,
  onClose,
  children,
  className = "",
  labelledBy,
}: AnimatedDialogProps) {
  const { mounted, visible } = useOverlayTransition(open);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-[1rem]" role="presentation">
      <button
        type="button"
        className={cn(
          "absolute inset-0 border-0 bg-[rgba(0,0,0,0.45)] [transition:opacity_280ms_ease] motion-reduce:transition-none",
          visible ? "opacity-100" : "opacity-0",
        )}
        aria-label="닫기"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal
        aria-labelledby={labelledBy}
        aria-hidden={!visible}
        className={cn(
          "relative z-[1] w-full max-w-full [transition:opacity_280ms_ease,transform_280ms_cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
          visible
            ? "opacity-100 [transform:scale(1)_translateY(0)]"
            : "opacity-0 [transform:scale(0.96)_translateY(8px)]",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

type AnimatedSideSheetProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  side?: "left" | "right";
  "aria-label"?: string;
};

export function AnimatedSideSheet({
  open,
  onClose,
  children,
  className = "",
  side = "right",
  "aria-label": ariaLabel,
}: AnimatedSideSheetProps) {
  const { mounted, visible } = useOverlayTransition(open);

  if (!mounted) return null;

  return (
    <>
      <button
        type="button"
        className={cn(
          "fixed inset-0 z-[40] border-0 bg-[rgba(0,0,0,0.32)] [transition:opacity_280ms_ease] motion-reduce:transition-none",
          visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-label="닫기"
        onClick={onClose}
      />
      <aside
        aria-label={ariaLabel}
        aria-hidden={!visible}
        className={cn(
          "fixed top-0 z-50 flex h-dvh flex-col overflow-y-auto [transition:transform_280ms_cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
          side === "left" ? "left-0" : "right-0",
          visible
            ? "[transform:translateX(0)]"
            : side === "left"
              ? "[transform:translateX(-100%)]"
              : "[transform:translateX(100%)]",
          className,
        )}
      >
        {children}
      </aside>
    </>
  );
}
