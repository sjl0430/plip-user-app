import { DailyIcon, TextLink } from "@/components/atoms";
import { ROUTES } from "@/config/routes";
import type { UiAgit } from "@/types/agit/ui";
import Image from "next/image";

type AgitListRowProps = {
  agit: UiAgit;
};

export function AgitListRow({ agit }: AgitListRowProps) {
  return (
    <article className="dl-azit-card">
      <TextLink href={ROUTES.agit.detail(agit.id)} className="dl-azit-card__main no-underline">
        <div className="dl-azit-card__cover" style={{ background: agit.coverGradient }}>
          {agit.thumbnailSrc ? (
            <Image src={agit.thumbnailSrc} alt="" width={56} height={56} className="dl-azit-card__cover-img" />
          ) : null}
        </div>

        <div className="dl-azit-card__body">
          <p className="dl-azit-card__name">{agit.name}</p>
          {agit.topicSummary ? (
            <p className="dl-azit-card__topic">
              {agit.topicSummary.startsWith("#")
                ? agit.topicSummary
                : `#${agit.topicSummary.replace(/\s+/g, "_")}`}
            </p>
          ) : null}
        </div>
      </TextLink>

      <div className="dl-azit-card__actions">
        <TextLink
          href={ROUTES.agit.chat(agit.id)}
          className="dl-azit-card__action no-underline"
          aria-label={`${agit.name} 채팅`}
        >
          <DailyIcon name="message" size={20} />
          {agit.hasNewChat ? <span className="dl-azit-card__dot" aria-hidden /> : null}
        </TextLink>
        <TextLink
          href={ROUTES.agit.upload(agit.id)}
          className="dl-azit-card__action no-underline"
          aria-label={`${agit.name} 촬영`}
        >
          <DailyIcon name="camera" size={20} />
          {agit.hasTodayTopic ? <span className="dl-azit-card__dot" aria-hidden /> : null}
        </TextLink>
      </div>
    </article>
  );
}
