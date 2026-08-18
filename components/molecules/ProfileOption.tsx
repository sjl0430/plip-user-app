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
  const stateClass = selected ? "dl-profile-card--selected" : ghost ? "dl-profile-card--ghost" : "";

  return (
    <button type={type} className={`dl-profile-card ${stateClass} ${className}`.trim()} {...props}>
      <DailyIcon name={icon} size={20} />
      <div className="dl-info-row__body">
        <p className="dl-info-row__title font-semibold">{title}</p>
        <p className="dl-info-row__desc">{description}</p>
      </div>
    </button>
  );
}
