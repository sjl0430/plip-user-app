import { DailyIcon, type DailyIconName } from "@/components/atoms";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ProfileOptionProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  description: string;
  icon: DailyIconName;
  selected?: boolean;
  ghost?: boolean;
  children?: ReactNode;
};

export function ProfileOption({
  title,
  description,
  icon,
  selected = false,
  ghost = false,
  className = "",
  type = "button",
  ...props
}: ProfileOptionProps) {
  const stateClass = selected ? "border-[var(--dl-color-border-brand)] bg-[var(--dl-color-bg-brand-subtle)] m-dlProfileCardSelected" : ghost ? "gap-[10px] bg-[var(--dl-color-bg-surface)] p-[16px_14px] m-dlProfileCardGhost" : "";

  return (
    <button type={type} className={`flex w-full items-center gap-[12px] border border-[var(--dl-color-border-default)] rounded-[var(--dl-radius-lg)] bg-[var(--dl-color-bg-elevated)] p-[14px] text-left min-h-[100px] rounded-[16px] bg-[var(--dl-color-bg-surface)] ${stateClass} ${className}`.trim()} {...props}>
      <DailyIcon name={icon} size={20} />
      <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
        <p className="m-0 text-sm font-medium leading-5 text-[var(--dl-color-text-primary)] font-semibold">{title}</p>
        <p className="m-0 text-xs font-normal leading-[17px] text-[var(--dl-color-text-secondary)]">{description}</p>
      </div>
    </button>
  );
}
