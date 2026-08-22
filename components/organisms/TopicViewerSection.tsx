"use client";

import { DailyIcon, IconButton, IconLink, TextLink } from "@/components/atoms";
import { ScreenHeader } from "@/components/molecules";
import { ROUTES } from "@/config/routes";
import type { UiTopicVideo } from "@/types/topic/ui";

type TopicViewerSectionProps = {
  agitId: string;
  title?: string;
  meta?: string;
  videos?: UiTopicVideo[];
  backHref?: string;
  onMenuClick?: () => void;
};

export function TopicViewerSection({
  agitId,
  title = "오늘의 토픽",
  meta = "",
  videos = [],
  backHref = ROUTES.agit.root,
  onMenuClick,
}: TopicViewerSectionProps) {
  return (
    <section className="flex flex-col gap-[16px] p-[12px_23px_24px]" aria-label={title}>
      <ScreenHeader
        leading={
          <IconLink href={backHref} label="뒤로">
            <DailyIcon name="chevronLeft" size={20} />
          </IconLink>
        }
        title={<h1 className="m-0 text-[22px] font-bold leading-[27px] text-[var(--dl-color-text-primary)]">{title}</h1>}
        subtitle={
          meta ? (
            <p className="m-[4px_0_0] text-xs leading-[16px] text-[var(--dl-color-text-secondary)]">{meta}</p>
          ) : null
        }
        trailing={
          onMenuClick ? (
            <IconButton variant="surface" label="아지트 메뉴" onClick={onMenuClick}>
              <DailyIcon name="ellipsis" size={20} />
            </IconButton>
          ) : (
            <span
              className="m-dlIconSqSpacer pointer-events-none grid h-[44px] w-[44px] shrink-0 place-items-center rounded-[var(--dl-radius-md)] bg-[var(--dl-color-bg-surface)] [visibility:hidden]"
              aria-hidden
            />
          )
        }
      />

      {videos.length === 0 ? (
        <p className="m-0 text-[13px] text-[var(--dl-color-text-secondary)]">아직 영상이 없어요</p>
      ) : (
        <div className="grid grid-cols-[1fr_1fr] gap-[8px]">
          {videos.map((video) => (
            <TextLink
              key={video.id}
              href={ROUTES.viewer.clip(video.id)}
              className="relative h-[240px] overflow-hidden border border-[var(--dl-color-border-default)] rounded-[16px] bg-[var(--dl-color-bg-surface)] no-underline"
            >
              <img src={video.thumbnailSrc} alt="" className="absolute inset-0 size-full object-cover" />
            </TextLink>
          ))}
        </div>
      )}

      <div className="relative flex min-h-[44px] items-center justify-end">
        <TextLink href={ROUTES.agit.upload(agitId)} className="grid w-[44px] h-[44px] place-items-center border border-[var(--dl-color-border-default)] rounded-[16px] bg-[var(--dl-color-bg-elevated)] text-[var(--dl-color-text-primary)] no-underline" aria-label="영상 업로드">
          <DailyIcon name="camera" size={20} />
        </TextLink>
      </div>
    </section>
  );
}
