"use client";

import { DailyIcon, TextLink } from "@/components/atoms";
import { AgitMenuDrawer } from "@/components/organisms/AgitMenuDrawer";
import { TopicViewerSection } from "@/components/organisms/TopicViewerSection";
import { getAgitById } from "@/config/agit-mock";
import { ROUTES } from "@/config/routes";
import { useState } from "react";

type AgitDetailSectionProps = {
  agitId: string;
};

export function AgitDetailSection({ agitId }: AgitDetailSectionProps) {
  const agit = getAgitById(agitId);
  const [menuOpen, setMenuOpen] = useState(false);

  if (!agit) {
    return (
      <section className="px-6 py-8">
        <p className="dl-subtitle">아지트를 찾을 수 없습니다.</p>
        <TextLink href={ROUTES.agit.root} className="dl-link">
          목록으로
        </TextLink>
      </section>
    );
  }

  return (
    <section aria-label="아지트 메인" className="relative flex flex-col gap-4 px-6 pb-8 pt-3">
      <header className="flex items-start justify-between gap-3">
        <TextLink href={ROUTES.agit.root} className="dl-icon-sq no-underline" aria-label="뒤로">
          <DailyIcon name="chevronLeft" size={20} />
        </TextLink>
        <div className="min-w-0 flex-1">
          <h1 className="m-0 text-[22px] font-bold leading-[27px] text-[var(--dl-color-text-primary)]">
            {agit.name}
          </h1>
          <p className="mt-1 text-[12px] text-[var(--dl-color-text-secondary)]">
            루틴 · {agit.memberCount}
            {agit.maxMembers ? `/${agit.maxMembers}` : ""}명 · {agit.visibility === "private" ? "비공개" : "공개"}
          </p>
        </div>
        <button type="button" className="dl-icon-sq" aria-label="아지트 메뉴" onClick={() => setMenuOpen(true)}>
          <DailyIcon name="ellipsis" size={20} />
        </button>
      </header>

      <div
        className="h-[110px] overflow-hidden rounded-2xl"
        style={{ background: agit.coverGradient }}
        aria-hidden
      />

      <nav className="flex gap-2" aria-label="아지트 로컬 메뉴">
        {(
          [
            { href: ROUTES.agit.detail(agit.id), label: "영상" },
            { href: ROUTES.agit.chat(agit.id), label: "채팅" },
            { href: ROUTES.agit.calendar(agit.id), label: "캘린더" },
            { href: ROUTES.agit.members(agit.id), label: "멤버" },
          ] as const
        ).map((item) => (
          <TextLink key={item.label} href={item.href} className="dl-topic-chip no-underline">
            {item.label}
          </TextLink>
        ))}
      </nav>

      <TopicViewerSection agitId={agit.id} title="오늘의 토픽" showHeader={false} />
      <p className="text-[12px] text-[var(--dl-color-text-secondary)]">🔥 6 💜 3 👏 2 전체 영상 4개</p>

      <AgitMenuDrawer agit={agit} open={menuOpen} onClose={() => setMenuOpen(false)} />
    </section>
  );
}
