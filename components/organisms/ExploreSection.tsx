"use client";

import { DailyIcon, Pill, TextLink } from "@/components/atoms";
import { ExploreNav } from "@/components/molecules";
import { AGIT_LIST } from "@/config/agit-mock";
import { ROUTES } from "@/config/routes";
import { useState } from "react";

const CATEGORIES = ["추천", "운동", "공부", "일상"] as const;
const FEATURED_ID = "agit-run";
const ACTIVE_IDS = ["agit-study", "agit-dish"];

function roomHref(id: string, joined?: boolean) {
  return joined ? ROUTES.agit.detail(id) : ROUTES.agit.enter(id);
}

function memberLabel(count: number, max?: number) {
  return max ? `${count}/${max}명` : `${count}명`;
}

export function ExploreSection() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("추천");

  const featured = AGIT_LIST.find((room) => room.id === FEATURED_ID);
  const keyword = query.trim();
  const rooms = AGIT_LIST.filter((room) => {
    if (category !== "추천" && room.category !== category) return false;
    if (category === "추천" && !ACTIVE_IDS.includes(room.id) && room.id !== FEATURED_ID) {
      return Boolean(keyword);
    }
    if (!keyword) return true;
    const haystack = `${room.name} ${room.category ?? ""} ${room.description}`;
    return haystack.includes(keyword);
  });

  const listRooms = rooms.filter((room) => room.id !== FEATURED_ID || category !== "추천");
  const showFeatured =
    featured &&
    category === "추천" &&
    (!query.trim() || `${featured.name} ${featured.category ?? ""}`.includes(query.trim()));

  return (
    <section className="flex w-full flex-col gap-4" aria-label="새로운 루프 찾기">
      <header className="dl-hub-head">
        <div>
          <h1 className="dl-hub-head__title">새로운 루프 찾기</h1>
          <p className="dl-hub-head__sub">목적이 맞는 방에 참여해요</p>
        </div>
        <TextLink href={ROUTES.mypage.root} className="dl-avatar-link no-underline" aria-label="프로필">
          <img src="/plip/daily-loop/explore-avatar.svg" alt="" width={40} height={40} />
        </TextLink>
      </header>

      <label className="dl-search">
        <DailyIcon name="search" size={20} />
        <input
          className="dl-search__input"
          value={query}
          placeholder="방 이름, 목표, 카테고리 검색"
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      <div className="dl-pills">
        {CATEGORIES.map((item) => (
          <Pill
            key={item}
            selected={category === item}
            className="dl-pill--compact"
            onClick={() => setCategory(item)}
          >
            {item}
          </Pill>
        ))}
      </div>

      {showFeatured && featured ? (
        <TextLink href={roomHref(featured.id, featured.joined)} className="dl-featured no-underline">
          <span className="dl-badge">공개 방</span>
          <p className="dl-featured__title">
            러닝 메이트의
            <br />
            30일 기록
          </p>
          <p className="dl-featured__meta">
            #{featured.category} · {memberLabel(featured.memberCount, featured.maxMembers)} · 오늘 3개
          </p>
          <span className="dl-featured__glow">
            <img src="/plip/daily-loop/explore-glow.svg" alt="" width={124} height={124} />
          </span>
        </TextLink>
      ) : null}

      <h2 className="m-0 text-[18px] font-semibold leading-[26px] text-[var(--dl-color-text-primary)]">
        지금 활발한 방
      </h2>
      <div className="flex w-full flex-col gap-2.5">
        {(category === "추천" && !query.trim()
          ? AGIT_LIST.filter((room) => ACTIVE_IDS.includes(room.id))
          : listRooms
        ).map((room) => (
          <TextLink
            key={room.id}
            href={roomHref(room.id, room.joined)}
            className="dl-room-card no-underline"
          >
            <span className="dl-room-card__thumb" style={{ background: room.coverGradient }}>
              {room.thumbnailSrc ? (
                <img src={room.thumbnailSrc} alt="" width={58} height={58} />
              ) : null}
            </span>
            <span>
              <p className="dl-room-card__name">{room.name}</p>
              <p className="dl-room-card__meta">
                {room.category ? `#${room.category} · ` : ""}
                {memberLabel(room.memberCount, room.maxMembers)}
              </p>
            </span>
          </TextLink>
        ))}
      </div>

      <ExploreNav active="explore" />
    </section>
  );
}
