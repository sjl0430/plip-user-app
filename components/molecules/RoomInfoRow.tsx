import { DailyIcon, type DailyIconName } from "@/components/atoms";

type RoomInfoRowProps = {
  icon: DailyIconName;
  title: string;
  description: string;
};

export function RoomInfoRow({ icon, title, description }: RoomInfoRowProps) {
  return (
    <div className="flex w-full items-center gap-[10px]">
      <DailyIcon name={icon} size={20} />
      <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
        <p className="m-0 text-sm font-medium leading-5 text-[var(--dl-color-text-primary)]">{title}</p>
        <p className="m-0 text-xs font-normal leading-[17px] text-[var(--dl-color-text-secondary)]">{description}</p>
      </div>
    </div>
  );
}
