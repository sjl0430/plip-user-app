import { DailyIcon, TextLink } from "@/components/atoms";
import { DiaryCard } from "@/components/molecules/DiaryCard";
import { TopicChip } from "@/components/molecules/TopicChip";
import { ROUTES } from "@/config/routes";
import Image from "next/image";

export function DiaryMainSection() {
  return (
    <section className="flex flex-col gap-4 px-6 pb-8 pt-2" aria-label="다이어리 홈">
      <header className="dl-page-head">
        <div>
          <h1 className="m-0 text-[22px] font-bold leading-normal text-[var(--dl-color-text-primary)]">
            안녕하세요, 지민님
          </h1>
          <p className="dl-page-head__sub">오늘의 5초를 자유롭게 남겨보세요.</p>
        </div>
        <TextLink href={ROUTES.mypage.notifications} className="dl-icon-sq no-underline" aria-label="알림">
          <DailyIcon name="bell" size={20} />
        </TextLink>
      </header>

      <div className="flex items-center justify-between">
        <TopicChip selected>8월 · 6일 기록</TopicChip>
        <p className="m-0 text-[12px] font-medium text-[var(--dl-color-text-secondary)]">이번 주  3 / 7</p>
      </div>

      <DiaryCard
        href={ROUTES.diary.date("2026-08-14")}
        imageSrc="/plip/v13/diary-breakfast.png"
        dateLabel="8월 14일"
        duration="00:05"
        title="8월의 러닝 기록"
        theme="테마 · 5초 운동 일기"
        reactions="🔥 12   💜 8   👏 5"
      />

      <h2 className="m-0 text-[18px] font-semibold text-[var(--dl-color-text-primary)]">최근 기록</h2>
      <TextLink href={ROUTES.diary.date("2026-08-12")} className="dl-recent-strip no-underline">
        <Image src="/plip/v13/diary-recent.png" alt="" fill className="object-cover" sizes="354px" />
        <p className="dl-recent-strip__label">퇴근 후 산책 · 8월 12일</p>
      </TextLink>
    </section>
  );
}
