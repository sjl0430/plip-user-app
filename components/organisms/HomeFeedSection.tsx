import { FEED_CLIPS } from "@/config/feed-mock";
import type { UiFeedClip } from "@/types/feed/ui";
import Image from "next/image";

function FeedSlide({ clip, index, total }: { clip: UiFeedClip; index: number; total: number }) {
  return (
    <article className="plip-tt-feed__slide" aria-label={`${clip.authorName} 그룹 클립`}>
      <div className="plip-tt-feed__media">
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
      <div className="plip-tt-feed__veil" aria-hidden />

      <div className="dl-shorts-meta">
        <p className="m-0 text-[26px] font-bold leading-[31px]">피드</p>
        <p className="mt-1 text-[13px] text-white/80">{clip.azitName} · 오늘 4/5명</p>
      </div>

      <div className="dl-reaction-rail" aria-label="리액션">
        <span>💜 {clip.likeCount}</span>
        <span>💬 {clip.commentCount}</span>
        <span>↗ 공유</span>
      </div>

      <div className="dl-shorts-copy">
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
    <div className="plip-tt-feed-wrap">
      <section aria-label="소속 아지트 그룹영상 피드" className="plip-tt-feed">
        {FEED_CLIPS.map((clip, index) => (
          <FeedSlide key={clip.id} clip={clip} index={index} total={FEED_CLIPS.length} />
        ))}
      </section>
    </div>
  );
}
