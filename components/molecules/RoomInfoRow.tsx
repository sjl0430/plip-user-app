import { DailyIcon, type DailyIconName } from "@/components/atoms";

type RoomInfoRowProps = {
  icon: DailyIconName;
  title: string;
  description: string;
};

export function RoomInfoRow({ icon, title, description }: RoomInfoRowProps) {
  return (
    <div className="dl-info-row">
      <DailyIcon name={icon} size={20} />
      <div className="dl-info-row__body">
        <p className="dl-info-row__title">{title}</p>
        <p className="dl-info-row__desc">{description}</p>
      </div>
    </div>
  );
}
