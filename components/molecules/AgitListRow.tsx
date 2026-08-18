import { DailyIcon, TextLink } from "@/components/atoms";
import { ROUTES } from "@/config/routes";

type AgitListRowProps = {
  id: string;
  name: string;
};

export function AgitListRow({ id, name }: AgitListRowProps) {
  return (
    <div className="dl-agit-row">
      <TextLink href={ROUTES.agit.detail(id)} className="dl-agit-row__who no-underline">
        <p className="dl-agit-row__name">{name}</p>
      </TextLink>
      <div className="dl-agit-row__actions">
        <TextLink
          href={ROUTES.agit.chat(id)}
          className="dl-icon-sq dl-icon-sq--elevated no-underline"
          aria-label={`${name} 채팅`}
        >
          <DailyIcon name="message" size={20} />
        </TextLink>
        <TextLink
          href={ROUTES.agit.upload(id)}
          className="dl-icon-sq dl-icon-sq--elevated no-underline"
          aria-label={`${name} 촬영`}
        >
          <DailyIcon name="camera" size={20} />
        </TextLink>
      </div>
    </div>
  );
}
