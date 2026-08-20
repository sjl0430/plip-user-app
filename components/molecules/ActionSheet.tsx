"use client";

import { useOverlayTransition } from "@/hooks/useOverlayTransition";
import type { ReactNode } from "react";

type ActionSheetProps = {
  open: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
};

export function ActionSheet({ open, title, description, onClose, children }: ActionSheetProps) {
  const { mounted, visible } = useOverlayTransition(open);

  if (!mounted) return null;

  return (
    <>
      <button
        type="button"
        className={`dl-sheet-scrim ${visible ? "dl-sheet-scrim--open" : ""}`}
        aria-label="닫기"
        onClick={onClose}
      />
      <div
        className={`dl-sheet ${visible ? "dl-sheet--open" : ""}`}
        role="dialog"
        aria-modal
        aria-hidden={!visible}
      >
        {title ? <h2 className="dl-title text-[24px] leading-[29px]">{title}</h2> : null}
        {description ? <p className="dl-subtitle">{description}</p> : null}
        {children}
      </div>
    </>
  );
}
