"use client";

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
      className={`dl-icon-sq dl-icon-sq--notify${checked ? " is-on" : ""}`}
      aria-label={label}
      aria-pressed={checked}
      title={checked ? `${label} 끄기` : `${label} 켜기`}
      onClick={() => onChange(!checked)}
    >
      <DailyIcon name="bell" size={size} />
    </button>
  );
}
