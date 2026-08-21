"use client";
import leftoverStyles from "@/components/styles/leftover.module.css";

import { DailyIcon } from "@/components/atoms";

type NotificationIconToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  size?: number;
};

export function NotificationIconToggle({
  checked,
  onChange,
  label,
  size = 20,
}: NotificationIconToggleProps) {
  return (
    <button
      type="button"
      className={`grid size-11 shrink-0 place-items-center rounded-[var(--dl-radius-md)] bg-[var(--dl-color-bg-surface)] ${leftoverStyles.dlIconSqNotify} ${checked ? leftoverStyles.isOn : ""}`}
      aria-label={label}
      aria-pressed={checked}
      title={checked ? `${label} 끄기` : `${label} 켜기`}
      onClick={() => onChange(!checked)}
    >
      <DailyIcon name="bell" size={size} />
    </button>
  );
}
