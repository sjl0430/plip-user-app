"use client";

import { HeaderBackLink, HeaderMenuButton, ScreenHeader } from "@/components/molecules";
import { MoveTopicSheet } from "@/components/organisms/MoveTopicSheet";
import { ViewerActionsSheet } from "@/components/organisms/ViewerActionsSheet";
import { FEED_CLIPS } from "@/config/feed-mock";
import { ROUTES } from "@/config/routes";
import Image from "next/image";
import { useState } from "react";

type ClipViewerSectionProps = {
  clipId: string;
  mode?: "view" | "edit";
};

export function ClipViewerSection({ clipId, mode = "view" }: ClipViewerSectionProps) {
  const clip = FEED_CLIPS.find((item) => item.id === clipId) ?? FEED_CLIPS[0];
  const coverSrc = clip.coverSrc ?? "/plip/v13/runner-preview.png";
  const [actionsOpen, setActionsOpen] = useState(mode === "edit");
  const [moveOpen, setMoveOpen] = useState(false);

  return (
    <section className="relative flex min-h-full flex-1 flex-col bg-[#09080f]" aria-label="그룹영상 뷰어">
      <Image src={coverSrc} alt="" fill className="object-cover" sizes="430px" priority />
      <div className="absolute inset-0 bg-black/14" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/80" />

      <ScreenHeader
        tone="overlay"
        leading={<HeaderBackLink href={ROUTES.home} label="닫기" />}
        title="오늘의 영상"
        subtitle="8월 14일 · #기상 #러닝"
        trailing={<HeaderMenuButton label="더보기" onClick={() => setActionsOpen(true)} />}
      />

      <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center">
        <p className="m-0 text-[18px] font-semibold text-white/90">재생</p>
      </div>
      <p className="pointer-events-none absolute right-6 top-[42%] z-[1] m-0 text-[12px] font-semibold text-white">
        00:05
      </p>

      <div className="absolute right-[20px] bottom-[180px] z-20 flex flex-col gap-[12px] rounded-[16px] bg-[rgba(0,_0,_0,_0.28)] p-[12px_10px] text-[#fff] text-xs font-medium" aria-label="이모지 리액션">
        <span>🔥 12</span>
        <span>💜 8</span>
        <span>👏 5</span>
        <span>＋</span>
      </div>

      <div className="relative z-10 mt-auto flex flex-col gap-1 px-6 pb-10 text-white">
        <p className="m-0 text-[18px] font-bold">새벽 러닝 완료</p>
        <p className="m-0 text-[13px] text-white/80">안지민 · 07:12 업로드</p>
      </div>

      <ViewerActionsSheet
        open={actionsOpen}
        onClose={() => setActionsOpen(false)}
        onMoveTopic={() => setMoveOpen(true)}
      />
      <MoveTopicSheet open={moveOpen} onClose={() => setMoveOpen(false)} />
    </section>
  );
}
