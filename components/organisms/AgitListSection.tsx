"use client";

import { DailyIcon, TextLink } from "@/components/atoms";
import { AgitListRow } from "@/components/molecules/AgitListRow";
import { ROUTES } from "@/config/routes";
import type { UiAgit } from "@/types/agit/ui";
import { useMemo, useState } from "react";

type AgitListSectionProps = {
  items: UiAgit[];
  error?: string;
};

export function AgitListSection({ items, error }: AgitListSectionProps) {
  const [query, setQuery] = useState("");
  const keyword = query.trim().toLowerCase();

  const rooms = useMemo(
    () =>
      items.filter((room) => {
        if (!keyword) return true;
        const haystack = `${room.name} ${room.category ?? ""} ${room.topicSummary ?? ""}`.toLowerCase();
        return haystack.includes(keyword);
      }),
    [items, keyword],
  );

  const totalVideos = rooms.reduce((sum, room) => sum + (room.todayVideoCount ?? 0), 0);

  return (
    <section aria-label="내 아지트" className="dl-azit-list">
      <header className="dl-azit-list__head">
        <div>
          <h1 className="dl-azit-list__title">아지트</h1>
          <p className="dl-azit-list__subtitle">참여 중인 방에서 오늘의 기록을 이어가요</p>
        </div>
        <TextLink href={ROUTES.agit.search} className="dl-icon-sq no-underline" aria-label="검색">
          <DailyIcon name="search" size={20} />
        </TextLink>
      </header>

      <label className="dl-azit-search">
        <DailyIcon name="search" size={18} />
        <input
          className="dl-azit-search__input"
          value={query}
          placeholder="제목 또는 토픽으로 검색"
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      {error ? (
        <p className="m-0 text-[14px] text-[var(--dl-color-text-secondary)]" role="alert">
          {error}
        </p>
      ) : null}

      <div className="dl-azit-list__summary">
        <div className="dl-azit-list__summary-copy">
          <p className="dl-azit-list__summary-title">참여 중인 아지트</p>
          <p className="dl-azit-list__summary-meta">오늘 업로드 {totalVideos}개</p>
        </div>
        <span className="dl-azit-list__count">{rooms.length}</span>
      </div>

      <div className="dl-azit-list__stack">
        {rooms.length > 0 ? (
          rooms.map((room) => <AgitListRow key={room.id} agit={room} />)
        ) : (
          <div className="dl-azit-list__empty">
            <p>{keyword ? "검색 결과가 없어요." : "참여 중인 아지트가 없어요."}</p>
            <TextLink href={ROUTES.agit.create} className="dl-link">
              새 아지트 만들기
            </TextLink>
          </div>
        )}
      </div>

      <TextLink href={ROUTES.agit.create} className="dl-azit-list__create no-underline">
        <span className="dl-azit-list__create-icon" aria-hidden>
          +
        </span>
        <span>
          <strong>아지트 만들기</strong>
          <small>새 루틴을 함께 시작해요</small>
        </span>
      </TextLink>
    </section>
  );
}
