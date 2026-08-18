import { DailyIcon, TextLink } from "@/components/atoms";
import { ROUTES } from "@/config/routes";
import Image from "next/image";

type AzitListRowProps = {
  id: string;
  name: string;
  todayVideoCount?: number;
  thumbnailSrc?: string;
};

export function AzitListRow({ id, name, todayVideoCount = 0, thumbnailSrc }: AzitListRowProps) {
  return (
    <div className="dl-azit-row">
      <TextLink href={ROUTES.azit.detail(id)} className="dl-azit-row__who no-underline">
        <span className="dl-azit-row__avatar">
          <Image src={thumbnailSrc ?? "/plip/v13/azit-avatar.svg"} alt="" width={52} height={52} />
        </span>
        <span>
          <p className="dl-azit-row__name">{name}</p>
          <p className="dl-azit-row__meta">오늘 {todayVideoCount}개 영상</p>
        </span>
      </TextLink>
      <div className="dl-azit-row__actions">
        <TextLink
          href={ROUTES.azit.chat(id)}
          className="dl-icon-sq dl-icon-sq--elevated no-underline"
          aria-label={`${name} 채팅`}
        >
          <DailyIcon name="message" size={20} />
        </TextLink>
        <TextLink
          href={ROUTES.azit.upload(id)}
          className="dl-icon-sq dl-icon-sq--elevated no-underline"
          aria-label={`${name} 촬영`}
        >
          <DailyIcon name="camera" size={20} />
        </TextLink>
      </div>
    </div>
  );
}
