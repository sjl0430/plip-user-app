import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export const manageListRowClassName =
  "flex w-full min-h-[64px] items-center gap-[10px] rounded-[var(--dl-radius-lg)] border border-[var(--dl-color-border-default)] bg-[var(--dl-color-bg-surface)] p-[12px_14px]";

type ManageListRowProps = {
  leading?: ReactNode;
  title: ReactNode;
  meta?: ReactNode;
  trailing?: ReactNode;
  className?: string;
};

export function ManageListRow({ leading, title, meta, trailing, className }: ManageListRowProps) {
  return (
    <div className={cn(manageListRowClassName, className)}>
      {leading}
      <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
        {typeof title === "string" ? (
          <p className="m-0 text-sm font-semibold leading-5 text-[var(--dl-color-text-primary)]">{title}</p>
        ) : (
          title
        )}
        {meta == null ? null : typeof meta === "string" ? (
          <p className="m-0 text-xs font-normal leading-[17px] text-[var(--dl-color-text-secondary)]">{meta}</p>
        ) : (
          meta
        )}
      </div>
      {trailing ? <div className="flex shrink-0 items-center gap-1">{trailing}</div> : null}
    </div>
  );
}
