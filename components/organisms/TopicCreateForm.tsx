"use client";

import { SubmitButton } from "@/components/atoms";
import { AuthField } from "@/components/molecules";
import { NoticeCard } from "@/components/molecules/NoticeCard";
import { useState } from "react";

export function TopicCreateForm() {
  const [itemSelected, setItemSelected] = useState(true);

  return (
    <form className="flex w-full flex-col gap-3.5">
      <AuthField
        id="topic-name"
        name="name"
        label="토픽 이름"
        defaultValue="#저녁_산책"
        maxLength={24}
        required
      />
      <AuthField
        id="topic-range"
        name="range"
        label="토픽 진행 날짜"
        defaultValue="2026.08.18 — 2026.08.31"
        required
      />

      <p className="m-0 text-[16px] font-semibold text-[var(--dl-color-text-primary)]">아이템</p>
      <button
        type="button"
        className={`dl-item-card${itemSelected ? " dl-item-card--selected" : ""}`}
        onClick={() => setItemSelected((current) => !current)}
      >
        <p className="dl-item-card__plus">＋</p>
        <p className="dl-item-card__title">아이템 적용</p>
        <p className="dl-item-card__desc">보유 아이템에서 선택</p>
        {itemSelected ? <span className="dl-item-card__pill">선택됨</span> : null}
      </button>

      <NoticeCard
        tone="brand"
        title="등록 규칙"
        body="한 사용자는 이 토픽에 영상 1개만 등록할 수 있어요. 방장은 이후 표시 형식을 변경할 수 있습니다."
      />

      <div className="dl-actions">
        <SubmitButton variant="brand">토픽 만들기</SubmitButton>
      </div>
    </form>
  );
}
