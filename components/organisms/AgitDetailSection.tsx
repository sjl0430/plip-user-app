"use client";

import { DailyIcon, IconButton, IconLink, TextLink } from "@/components/atoms";
import { ScreenHeader } from "@/components/molecules";
import { AgitMenuDrawer } from "@/components/organisms/AgitMenuDrawer";
import { TopicGallerySection } from "@/components/organisms/TopicGallerySection";
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
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
      <ScreenHeader
        className="shrink-0 p-[12px_23px_0]"
        leading={
          <IconLink href={ROUTES.agit.root} label="뒤로">
            <DailyIcon name="chevronLeft" size={20} />
          </IconLink>
        }
        title={
          <h1 className="m-0 text-[22px] font-bold leading-[27px] text-[var(--dl-color-text-primary)]">{heading}</h1>
        }
        subtitle={
          <p className="m-[4px_0_0] text-xs leading-[16px] text-[var(--dl-color-text-secondary)]">
            {formatTopicMeta(gallery)}
          </p>
        }
        trailing={
          <IconButton variant="surface" label="아지트 메뉴" onClick={() => setMenuOpen(true)}>
            <DailyIcon name="ellipsis" size={20} />
          </IconButton>
        }
      />

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
