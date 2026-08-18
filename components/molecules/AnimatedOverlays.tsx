"use client";

import { useOverlayTransition } from "@/hooks/useOverlayTransition";
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
      className={`dl-dropdown-panel ${visible ? "dl-dropdown-panel--open" : ""} ${className}`.trim()}
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
    <div className="dl-dialog-root" role="presentation">
      <button
        type="button"
        className={`dl-dialog-scrim ${visible ? "dl-dialog-scrim--open" : ""}`}
        aria-label="닫기"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal
        aria-labelledby={labelledBy}
        aria-hidden={!visible}
        className={`dl-dialog-panel ${visible ? "dl-dialog-panel--open" : ""} ${className}`.trim()}
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

  const sideClass = side === "left" ? "dl-side-sheet--left" : "dl-side-sheet--right";

  return (
    <>
      <button
        type="button"
        className={`dl-drawer-scrim ${visible ? "dl-drawer-scrim--open" : ""}`}
        aria-label="닫기"
        onClick={onClose}
      />
      <aside
        aria-label={ariaLabel}
        aria-hidden={!visible}
        className={`dl-side-sheet ${sideClass} ${visible ? "dl-side-sheet--open" : ""} ${className}`.trim()}
      >
        {children}
      </aside>
    </>
  );
}
