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
      <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
        <p className="m-0 text-sm font-medium leading-5 text-[var(--dl-color-text-primary)] font-semibold">{title}</p>
        {description ? <p className="m-0 text-xs font-normal leading-[17px] text-[var(--dl-color-text-secondary)]">{description}</p> : null}
      </div>
      {trailing}
      {showChevron ? <DailyIcon name="chevronRight" size={18} /> : null}
    </>
  );
}

export function SettingsRow({ href, showChevron = Boolean(href), ...props }: SettingsRowProps) {
  if (href) {
    return (
      <TextLink href={href} className="flex w-full items-center gap-[12px] border-0 rounded-[var(--dl-radius-lg)] bg-[var(--dl-color-bg-elevated)] p-[14px] text-left !no-underline text-[inherit] no-underline">
        <RowBody {...props} showChevron={showChevron} />
      </TextLink>
    );
  }

  return (
    <div className="flex w-full items-center gap-[12px] border-0 rounded-[var(--dl-radius-lg)] bg-[var(--dl-color-bg-elevated)] p-[14px] text-left !no-underline text-[inherit]">
      <RowBody {...props} showChevron={showChevron} />
    </div>
  );
}
