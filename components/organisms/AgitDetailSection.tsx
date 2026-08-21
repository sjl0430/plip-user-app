"use client";

import { AgitMenuDrawer } from "@/components/organisms/AgitMenuDrawer";
import { TopicGallerySection } from "@/components/organisms/TopicGallerySection";
import { DailyIcon, TextLink } from "@/components/atoms";
import { ROUTES } from "@/config/routes";
import type { UiAgit } from "@/types/agit/ui";
import type { UiTopicGallery } from "@/types/topic/ui";
import { useState } from "react";

type AgitDetailSectionProps = {
  agit: UiAgit | null;
  gallery: UiTopicGallery;
  error?: string;
  galleryError?: string;
};

function formatTopicMeta(gallery: UiTopicGallery): string {
  const topic = gallery.topic;
  if (!topic) {
    return "아직 토픽이 없습니다";
  }

  const parsed = new Date(topic.startAt);
  const date = Number.isNaN(parsed.getTime())
    ? ""
    : new Intl.DateTimeFormat("ko-KR", {
        timeZone: "Asia/Seoul",
        month: "long",
        day: "numeric",
      }).format(parsed);
  const title = topic.title ? `#${topic.title}` : "";
  const count = `${gallery.videos.length}개 영상`;
  return [date, title, count].filter(Boolean).join(" · ");
}

export function AgitDetailSection({ agit, gallery, error, galleryError }: AgitDetailSectionProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  if (error) {
    return (
      <section className="px-6 py-8">
        <p className="m-0 text-sm font-normal leading-5 text-[var(--dl-color-text-secondary)]">{error}</p>
        <TextLink href={ROUTES.agit.root} className="!text-[var(--dl-color-text-brand)] text-sm font-medium leading-5 !no-underline hover:!underline">
          목록으로
        </TextLink>
      </section>
    );
  }

  if (!agit) {
    return (
      <section className="px-6 py-8">
        <p className="m-0 text-sm font-normal leading-5 text-[var(--dl-color-text-secondary)]">아지트를 찾을 수 없습니다.</p>
        <TextLink href={ROUTES.agit.root} className="!text-[var(--dl-color-text-brand)] text-sm font-medium leading-5 !no-underline hover:!underline">
          목록으로
        </TextLink>
      </section>
    );
  }

  const heading = gallery.topic?.isToday || !gallery.topic ? "오늘의 토픽" : gallery.topic.title || "토픽";

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="grid shrink-0 grid-cols-[44px_1fr_44px] items-start gap-[10px] p-[12px_23px_0]">
        <TextLink href={ROUTES.agit.root} className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-[var(--dl-radius-md)] bg-[var(--dl-color-bg-surface)] no-underline" aria-label="뒤로">
          <DailyIcon name="chevronLeft" size={20} />
        </TextLink>
        <div className="min-w-0 pt-[14px]">
          <h1 className="m-0 text-[22px] font-bold leading-[27px] text-[var(--dl-color-text-primary)]">{heading}</h1>
          <p className="m-[4px_0_0] text-xs leading-[16px] text-[var(--dl-color-text-secondary)]">{formatTopicMeta(gallery)}</p>
        </div>
        <button type="button" className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-[var(--dl-radius-md)] bg-[var(--dl-color-bg-surface)]" aria-label="아지트 메뉴" onClick={() => setMenuOpen(true)}>
          <DailyIcon name="ellipsis" size={20} />
        </button>
      </header>

      {galleryError ? (
        <section className="px-6 py-8">
          <p className="m-0 text-sm font-normal leading-5 text-[var(--dl-color-text-secondary)]">{galleryError}</p>
        </section>
      ) : (
        <TopicGallerySection videos={gallery.videos} captureHref={ROUTES.agit.upload(agit.id)} />
      )}

      <AgitMenuDrawer agit={agit} open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
