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
    <section className="dl-topic-viewer" aria-label={title}>
      <header className="dl-topic-viewer-head">
        <TextLink href={backHref} className="dl-icon-sq no-underline" aria-label="뒤로">
          <DailyIcon name="chevronLeft" size={20} />
        </TextLink>
        <div className="dl-topic-viewer-head__main">
          <h1 className="dl-topic-viewer-head__title">{title}</h1>
          <p className="dl-topic-viewer-head__meta">{meta}</p>
        </div>
        {onMenuClick ? (
          <button type="button" className="dl-icon-sq" aria-label="아지트 메뉴" onClick={onMenuClick}>
            <DailyIcon name="ellipsis" size={20} />
          </button>
        ) : (
          <span className="dl-icon-sq dl-icon-sq--spacer" aria-hidden />
        )}
      </header>

      <div className="dl-video-grid">
        {CLIPS.map((clip) => (
          <TextLink key={clip.id} href={ROUTES.viewer.clip(clip.id)} className="dl-video-tile no-underline">
            <Image src={clip.src} alt="" fill className="object-cover" sizes="173px" />
          </TextLink>
        ))}
      </div>

      <div className="dl-topic-viewer-foot">
        <p className="dl-topic-pagination">{pageLabel}</p>
        <TextLink href={ROUTES.agit.upload(agitId)} className="dl-topic-camera-fab no-underline" aria-label="영상 업로드">
          <DailyIcon name="camera" size={20} />
        </TextLink>
      </div>
    </section>
  );
}
