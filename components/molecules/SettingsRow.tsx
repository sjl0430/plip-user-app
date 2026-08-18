import { DailyIcon, TextLink, type DailyIconName } from "@/components/atoms";
import type { ReactNode } from "react";

type SettingsRowProps = {
  title: string;
  description?: string;
  icon?: DailyIconName;
  href?: string;
  showChevron?: boolean;
  trailing?: ReactNode;
};

function RowBody({ title, description, icon, showChevron, trailing }: Omit<SettingsRowProps, "href">) {
  return (
    <>
      {icon ? <DailyIcon name={icon} size={20} /> : null}
      <div className="dl-info-row__body">
        <p className="dl-info-row__title font-semibold">{title}</p>
        {description ? <p className="dl-info-row__desc">{description}</p> : null}
      </div>
      {trailing}
      {showChevron ? <DailyIcon name="chevronRight" size={18} /> : null}
    </>
  );
}

export function SettingsRow({ href, showChevron = Boolean(href), ...props }: SettingsRowProps) {
  if (href) {
    return (
      <TextLink href={href} className="dl-row no-underline">
        <RowBody {...props} showChevron={showChevron} />
      </TextLink>
    );
  }

  return (
    <div className="dl-row">
      <RowBody {...props} showChevron={showChevron} />
    </div>
  );
}
