import { FEED_CLIPS } from "@/config/feed-mock";
import type { UiFeedClip } from "@/types/feed/ui";
import Image from "next/image";

function FeedSlide({ clip, index, total }: { clip: UiFeedClip; index: number; total: number }) {
  return (
    <article className="relative min-h-[calc(100dvh_-_3.4rem)] [scroll-snap-align:start] overflow-hidden" aria-label={`${clip.authorName} 그룹 클립`}>
      <div className="absolute inset-0">
        {clip.coverSrc ? (
          <Image
            src={clip.coverSrc}
            alt=""
            fill
            className="object-cover"
            sizes="540px"
            priority={clip.id === "clip-1"}
          />
        ) : (
          <div className="absolute inset-0" style={{ background: clip.gradient }} />
        )}
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(_180deg,_rgba(0,_0,_0,_0.42)_0%,_transparent_22%,_transparent_48%,_rgba(0,_0,_0,_0.55)_72%,_rgba(0,_0,_0,_0.82)_100%_)] pointer-events-none" aria-hidden />

      <div className="absolute left-[24px] top-[56px] z-20 text-[#fff]">
        <p className="m-0 text-[26px] font-bold leading-[31px]">피드</p>
        <p className="mt-1 text-[13px] text-white/80">{clip.agitName} · 오늘 4/5명</p>
      </div>

      <div className="absolute right-[20px] bottom-[180px] z-20 flex flex-col gap-[12px] rounded-[16px] bg-[rgba(0,_0,_0,_0.28)] p-[12px_10px] text-[#fff] text-xs font-medium" aria-label="리액션">
        <span>💜 {clip.likeCount}</span>
        <span>💬 {clip.commentCount}</span>
        <span>↗ 공유</span>
      </div>

      <div className="absolute left-[24px] bottom-[96px] z-20 text-[#fff]">
        <p className="m-0 text-[16px] font-semibold">{clip.authorName} · #{clip.topicTitle}</p>
        <p className="mt-1 text-[14px] text-white/90">{clip.caption}</p>
        <p className="mt-4 text-center text-[12px] text-white/70">
          {index + 1} / {total}
        </p>
      </div>
    </article>
  );
}

export function HomeFeedSection() {
  return (
    <div className="relative flex flex-1 min-h-0 flex-col">
      <section aria-label="소속 아지트 그룹영상 피드" className="flex-1 min-h-0 overflow-y-auto [scroll-snap-type:y_mandatory] bg-[#000]">
        {FEED_CLIPS.map((clip, index) => (
          <FeedSlide key={clip.id} clip={clip} index={index} total={FEED_CLIPS.length} />
        ))}
      </section>
    </div>
  );
}
