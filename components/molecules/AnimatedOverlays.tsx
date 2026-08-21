"use client";
import leftoverStyles from "@/components/styles/leftover.module.css";

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
      className={`${leftoverStyles.dlDropdownPanel} ${visible ? "pointer-events-auto opacity-100 [transform:translateY(0)_scale(1)]" : ""} ${className}`.trim()}
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
        className={`absolute inset-0 border-0 bg-[rgba(0,_0,_0,_0.45)] opacity-0 transition-[opacity_280ms_ease] motion-reduce:transition-[none] ${visible ? "opacity-100 m-dlDialogScrimOpen" : ""}`}
        aria-label="닫기"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal
        aria-labelledby={labelledBy}
        aria-hidden={!visible}
        className={`${leftoverStyles.dlDialogPanel} ${visible ? "opacity-100 [transform:scale(1)_translateY(0)]" : ""} ${className}`.trim()}
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

  const sideClass =
    side === "left"
      ? `left-0 -translate-x-full ${leftoverStyles.dlSideSheetLeft}`
      : `right-0 translate-x-full ${leftoverStyles.dlSideSheetRight}`;

  return (
    <>
      <button
        type="button"
        className={`fixed inset-0 z-[40] border-0 bg-[rgba(0,_0,_0,_0.32)] opacity-0 pointer-events-none transition-[opacity_280ms_ease] motion-reduce:transition-[none] ${visible ? "opacity-100 pointer-events-auto m-dlDrawerScrimOpen" : ""}`}
        aria-label="닫기"
        onClick={onClose}
      />
      <aside
        aria-label={ariaLabel}
        aria-hidden={!visible}
        className={`${leftoverStyles.dlSideSheet} ${sideClass} ${visible ? leftoverStyles.dlSideSheetOpen : ""} ${className}`.trim()}
      >
        {children}
      </aside>
    </>
  );
}
