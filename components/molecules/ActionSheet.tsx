"use client";
import leftoverStyles from "@/components/styles/leftover.module.css";

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
        className={`fixed inset-0 z-[41] border-0 bg-[rgba(23,_23,_28,_0.4)] opacity-0 transition-[opacity_280ms_ease] motion-reduce:transition-[none] ${visible ? "opacity-100 m-dlSheetScrimOpen" : ""}`}
        aria-label="닫기"
        onClick={onClose}
      />
      <div
        className={`${leftoverStyles.dlSheet} ${visible ? "[transform:translateY(0)] m-dlSheetOpen" : ""}`}
        role="dialog"
        aria-modal
        aria-hidden={!visible}
      >
        {title ? <h2 className="m-0 text-[28px] font-bold leading-[34px] text-[var(--dl-color-text-primary)] text-[24px] leading-[29px]">{title}</h2> : null}
        {description ? <p className="m-0 text-sm font-normal leading-5 text-[var(--dl-color-text-secondary)]">{description}</p> : null}
        {children}
      </div>
    </>
  );
}
