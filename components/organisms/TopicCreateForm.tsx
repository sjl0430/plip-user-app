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
        className={`relative flex min-h-[130px] w-[min(170px,100%)] cursor-pointer flex-col gap-1 rounded-[16px] border border-[var(--dl-color-border-brand)] bg-[var(--dl-color-bg-brand-subtle)] p-[15px] text-left`}
        onClick={() => setItemSelected((current) => !current)}
      >
        <p className="m-0 text-[24px] font-bold text-[var(--dl-color-text-brand)]">＋</p>
        <p className="m-0 text-sm font-semibold text-[var(--dl-color-text-brand)]">아이템 적용</p>
        <p className="m-0 text-[11px] text-[var(--dl-color-text-secondary)]">보유 아이템에서 선택</p>
        {itemSelected ? <span className="inline-flex items-center justify-center w-[fit-content] mt-[8px] p-[6px_12px] rounded-[15px] bg-[var(--dl-color-bg-brand)] text-xs font-medium text-[#fff]">선택됨</span> : null}
      </button>

      <NoticeCard
        tone="brand"
        title="등록 규칙"
        body="한 사용자는 이 토픽에 영상 1개만 등록할 수 있어요. 방장은 이후 표시 형식을 변경할 수 있습니다."
      />

      <div className="flex w-full flex-col gap-[14px] mt-auto">
        <SubmitButton variant="brand">토픽 만들기</SubmitButton>
      </div>
    </form>
  );
}
