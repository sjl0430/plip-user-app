import { DailyIcon, TextLink } from "@/components/atoms";
import { ROUTES } from "@/config/routes";
import type { UiAzit } from "@/types/azit/ui";
import Image from "next/image";

type AzitListRowProps = {
  azit: UiAzit;
};

function visibilityLabel(visibility?: UiAzit["visibility"]) {
  return visibility === "private" ? "비공개" : "공개";
}

export function AzitListRow({ azit }: AzitListRowProps) {
  const videoCount = azit.todayVideoCount ?? 0;
  const memberLabel = azit.maxMembers ? `${azit.memberCount}/${azit.maxMembers}명` : `${azit.memberCount}명`;

  return (
    <article className={`dl-azit-card${videoCount > 0 ? " dl-azit-card--active" : ""}`}>
      <TextLink href={ROUTES.azit.detail(azit.id)} className="dl-azit-card__main no-underline">
        <div className="dl-azit-card__cover" style={{ background: azit.coverGradient }}>
          {azit.thumbnailSrc ? (
            <Image src={azit.thumbnailSrc} alt="" width={56} height={56} className="dl-azit-card__cover-img" />
          ) : null}
          {videoCount > 0 ? (
            <span className="dl-azit-card__cover-badge" aria-hidden>
              {videoCount}
            </span>
          ) : null}
        </div>

        <div className="dl-azit-card__body">
          <div className="dl-azit-card__title-row">
            <p className="dl-azit-card__name">{azit.name}</p>
            <span className="dl-azit-card__visibility">{visibilityLabel(azit.visibility)}</span>
          </div>
          {azit.topicSummary ? (
            <p className="dl-azit-card__topic">
              {azit.topicSummary.startsWith("#")
                ? azit.topicSummary
                : `#${azit.topicSummary.replace(/\s+/g, "_")}`}
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
          href={ROUTES.azit.chat(azit.id)}
          className="dl-azit-card__action no-underline"
          aria-label={`${azit.name} 채팅`}
        >
          <DailyIcon name="message" size={20} />
          {azit.hasNewChat ? <span className="dl-azit-card__dot" aria-hidden /> : null}
        </TextLink>
        <TextLink
          href={ROUTES.azit.upload(azit.id)}
          className="dl-azit-card__action no-underline"
          aria-label={`${azit.name} 촬영`}
        >
          <DailyIcon name="camera" size={20} />
          {azit.hasTodayTopic ? <span className="dl-azit-card__dot" aria-hidden /> : null}
        </TextLink>
      </div>
    </article>
  );
}
