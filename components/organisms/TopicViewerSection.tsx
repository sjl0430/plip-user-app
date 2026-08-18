import { DailyIcon, TextLink } from "@/components/atoms";
import { ROUTES } from "@/config/routes";
import Image from "next/image";

const CLIPS = [
  { id: "clip-1", src: "/plip/daily-loop/recent-video-1.png" },
  { id: "clip-2", src: "/plip/daily-loop/recent-video-2.png" },
  { id: "clip-3", src: "/plip/daily-loop/cal-thumb-1.png" },
  { id: "clip-4", src: "/plip/daily-loop/cal-thumb-2.png" },
];

type TopicViewerSectionProps = {
  azitId: string;
  title?: string;
  meta?: string;
  showHeader?: boolean;
};

export function TopicViewerSection({
  azitId,
  title = "오늘의 토픽",
  meta = "8월 18일 · #7시_러닝_인증 · 7개 영상",
  showHeader = true,
}: TopicViewerSectionProps) {
  return (
    <section className="flex w-full flex-col gap-4" aria-label={title}>
      {showHeader ? (
        <header className="flex items-start justify-between gap-3">
          <TextLink href={ROUTES.azit.detail(azitId)} className="dl-icon-sq no-underline" aria-label="뒤로">
            <DailyIcon name="chevronLeft" size={20} />
          </TextLink>
          <div className="min-w-0 flex-1">
            <h1 className="m-0 text-[22px] font-bold leading-[27px] text-[var(--dl-color-text-primary)]">{title}</h1>
            <p className="mt-1 text-[12px] text-[var(--dl-color-text-secondary)]">{meta}</p>
          </div>
          <TextLink href={ROUTES.azit.upload(azitId)} className="dl-icon-sq no-underline" aria-label="업로드">
            <DailyIcon name="camera" size={20} />
          </TextLink>
        </header>
      ) : null}
      <div className="dl-video-grid">
        {CLIPS.map((clip) => (
          <TextLink key={clip.id} href={ROUTES.viewer.clip(clip.id)} className="dl-video-tile no-underline">
            <Image src={clip.src} alt="" fill className="object-cover" sizes="173px" />
          </TextLink>
        ))}
      </div>
      <p className="text-center text-[12px] font-medium text-[var(--dl-color-text-secondary)]">1 / 2 · 다음 3개</p>
    </section>
  );
}
