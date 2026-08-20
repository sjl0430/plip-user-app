import { DailyIcon, TextLink } from "@/components/atoms";
import { ROUTES } from "@/config/routes";
import type { UiAgit } from "@/types/agit/ui";
import Image from "next/image";

type AgitListRowProps = {
  agit: UiAgit;
};

function visibilityLabel(visibility?: UiAgit["visibility"]) {
  return visibility === "private" ? "비공개" : "공개";
}

export function AgitListRow({ agit }: AgitListRowProps) {
  const videoCount = agit.todayVideoCount ?? 0;
  const memberLabel = agit.maxMembers ? `${agit.memberCount}/${agit.maxMembers}명` : `${agit.memberCount}명`;

  return (
    <article className={`dl-azit-card${videoCount > 0 ? " dl-azit-card--active" : ""}`}>
      <TextLink href={ROUTES.agit.detail(agit.id)} className="dl-azit-card__main no-underline">
        <div className="dl-azit-card__cover" style={{ background: agit.coverGradient }}>
          {agit.thumbnailSrc ? (
            <Image src={agit.thumbnailSrc} alt="" width={56} height={56} className="dl-azit-card__cover-img" />
          ) : null}
          {videoCount > 0 ? (
            <span className="dl-azit-card__cover-badge" aria-hidden>
              {videoCount}
            </span>
          ) : null}
        </div>

        <div className="dl-azit-card__body">
          <div className="dl-azit-card__title-row">
            <p className="dl-azit-card__name">{agit.name}</p>
            <span className="dl-azit-card__visibility">{visibilityLabel(agit.visibility)}</span>
          </div>
          {agit.topicSummary ? (
            <p className="dl-azit-card__topic">
              {agit.topicSummary.startsWith("#")
                ? agit.topicSummary
                : `#${agit.topicSummary.replace(/\s+/g, "_")}`}
            </p>
          ) : null}
          <div className="dl-azit-card__meta-row">
            <span>{memberLabel}</span>
            <span aria-hidden>·</span>
            <span className={videoCount > 0 ? "dl-azit-card__meta--hot" : ""}>
              오늘 {videoCount}개 영상
            </span>
          </div>
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
