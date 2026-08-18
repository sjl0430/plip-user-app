"use client";

import { DailyIcon, TextLink } from "@/components/atoms";
import { AzitListRow } from "@/components/molecules/AzitListRow";
import { AZIT_LIST } from "@/config/azit-mock";
import { ROUTES } from "@/config/routes";
import { useState } from "react";

export function AzitListSection() {
  const [query, setQuery] = useState("");
  const keyword = query.trim();
  const rooms = AZIT_LIST.filter((room) => {
    if (room.joined === false) return false;
    if (!keyword) return true;
    return `${room.name} ${room.category ?? ""}`.includes(keyword);
  });

  return (
    <section aria-label="내 아지트" className="flex flex-1 flex-col gap-4 px-6 pb-8 pt-3">
      <header className="dl-page-head">
        <h1 className="dl-page-head__title">아지트</h1>
        <TextLink href={ROUTES.azit.search} className="dl-icon-sq no-underline" aria-label="검색">
          <DailyIcon name="search" size={20} />
        </TextLink>
      </header>

      <label className="dl-field">
        <span className="dl-field__label">내 아지트 검색</span>
        <input
          className="dl-input"
          value={query}
          placeholder="제목 또는 프로필로 검색"
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      <p className="m-0 text-[16px] font-semibold text-[var(--dl-color-text-primary)]">
        참여 중인 아지트  {rooms.length}
      </p>
      <div className="flex flex-col gap-2.5">
        {rooms.map((room) => (
          <AzitListRow
            key={room.id}
            id={room.id}
            name={room.name}
            todayVideoCount={room.todayVideoCount}
            thumbnailSrc={room.thumbnailSrc}
          />
        ))}
      </div>
    </section>
  );
}
