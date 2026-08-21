"use client";

import { useOverlayTransition } from "@/hooks/useOverlayTransition";
import { cn } from "@/lib/utils";
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
        className={cn(
          "fixed inset-0 z-[41] border-0 bg-[rgba(23,23,28,0.4)] [transition:opacity_280ms_ease] motion-reduce:transition-none",
          visible ? "opacity-100" : "opacity-0",
        )}
        aria-label="닫기"
        onClick={onClose}
      />
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-[42] flex max-h-[70dvh] flex-col gap-3 overflow-auto rounded-t-3xl bg-[var(--dl-color-bg-elevated)] px-6 pb-8 pt-6 [transition:transform_280ms_cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
          visible ? "[transform:translateY(0)]" : "[transform:translateY(100%)]",
        )}
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
