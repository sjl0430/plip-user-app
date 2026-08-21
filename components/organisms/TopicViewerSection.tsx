"use client";

import { DailyIcon, TextLink } from "@/components/atoms";
import { ROUTES } from "@/config/routes";
import Image from "next/image";

const CLIPS = [
  { id: "clip-1", src: "/plip/v13/topic-video-1.png" },
  { id: "clip-2", src: "/plip/v13/topic-video-2.png" },
  { id: "clip-3", src: "/plip/v13/topic-video-3.png" },
  { id: "clip-4", src: "/plip/v13/topic-video-4.png" },
];

type TopicViewerSectionProps = {
  agitId: string;
  title?: string;
  meta?: string;
  pageLabel?: string;
  backHref?: string;
  onMenuClick?: () => void;
};

export function TopicViewerSection({
  agitId,
  title = "오늘의 토픽",
  meta = "8월 18일 · #7시_러닝_인증 · 7개 영상",
  pageLabel = "1 / 2 · 다음 3개",
  backHref = ROUTES.agit.root,
  onMenuClick,
}: TopicViewerSectionProps) {
  return (
    <section className="flex flex-col gap-[16px] p-[12px_23px_24px]" aria-label={title}>
      <header className="grid grid-cols-[44px_1fr_44px] items-start gap-[10px]">
        <TextLink href={backHref} className="grid w-[44px] h-[44px] shrink-0 place-items-center rounded-[var(--dl-radius-md)] bg-[var(--dl-color-bg-surface)] no-underline" aria-label="뒤로">
          <DailyIcon name="chevronLeft" size={20} />
        </TextLink>
        <div className="min-w-0 pt-[14px]">
          <h1 className="m-0 text-[22px] font-bold leading-[27px] text-[var(--dl-color-text-primary)]">{title}</h1>
          <p className="m-[4px_0_0] text-xs leading-[16px] text-[var(--dl-color-text-secondary)]">{meta}</p>
        </div>
        {onMenuClick ? (
          <button type="button" className="grid w-[44px] h-[44px] shrink-0 place-items-center rounded-[var(--dl-radius-md)] bg-[var(--dl-color-bg-surface)]" aria-label="아지트 메뉴" onClick={onMenuClick}>
            <DailyIcon name="ellipsis" size={20} />
          </button>
        ) : (
          <span className="grid w-[44px] h-[44px] shrink-0 place-items-center rounded-[var(--dl-radius-md)] bg-[var(--dl-color-bg-surface)] [visibility:hidden] pointer-events-none m-dlIconSqSpacer" aria-hidden />
        )}
      </header>

      <div className="grid grid-cols-[1fr_1fr] gap-[8px]">
        {CLIPS.map((clip) => (
          <TextLink key={clip.id} href={ROUTES.viewer.clip(clip.id)} className="relative h-[240px] overflow-hidden border border-[var(--dl-color-border-default)] rounded-[16px] bg-[var(--dl-color-bg-surface)] no-underline">
            <Image src={clip.src} alt="" fill className="object-cover" sizes="173px" />
          </TextLink>
        ))}
      </div>

      <div className="relative flex items-center justify-center min-h-[44px]">
        <p className="m-0 inline-flex items-center p-[8px_16px] rounded-[999px] bg-[#f5f0ff] text-xs font-medium leading-[16px] text-[#6338ed]">{pageLabel}</p>
        <TextLink href={ROUTES.agit.upload(agitId)} className="absolute right-[0] top-[50%] grid w-[44px] h-[44px] [transform:translateY(-50%)] place-items-center border border-[var(--dl-color-border-default)] rounded-[16px] bg-[var(--dl-color-bg-elevated)] text-[var(--dl-color-text-primary)] no-underline" aria-label="영상 업로드">
          <DailyIcon name="camera" size={20} />
        </TextLink>
      </div>
    </section>
  );
}
