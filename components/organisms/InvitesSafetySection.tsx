"use client";

import { DailyToggle } from "@/components/molecules/DailyToggle";
import { NotificationIconToggle } from "@/components/molecules/NotificationIconToggle";
import { useState } from "react";

const INVITE_LINK = "dailyloop.app/join/7K2M9";

export function InvitesSafetySection() {
  const [copied, setCopied] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [notify, setNotify] = useState(true);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`https://${INVITE_LINK}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="flex w-full flex-col gap-3.5">
      <p className="dl-subtitle text-[13px]">초대 링크의 수명과 신고 처리 상태를 명확히 확인</p>

      <h2 className="dl-section-title text-[17px]">초대 링크</h2>
      <div className="dl-manage-card items-start">
        <div className="dl-info-row__body">
          <p className="m-0 text-[11px] font-semibold text-[var(--dl-color-text-secondary)]">현재 링크</p>
          <p className="m-0 text-[13px] font-semibold text-[var(--dl-color-text-primary)]">{INVITE_LINK}</p>
        </div>
        <button type="button" className="dl-badge" onClick={copyLink}>
          {copied ? "복사됨" : "복사"}
        </button>
      </div>

      <div className="dl-pair">
        <button type="button" className="dl-btn dl-btn--neutral">
          새 링크 발급
        </button>
        <button type="button" className="dl-btn dl-btn--primary">
          링크 공유
        </button>
      </div>

      <div className="dl-panel" style={{ background: "var(--dl-color-bg-danger)" }}>
        <p className="m-0 text-[11px] font-medium text-[var(--dl-color-text-danger)]">
          재발급하면 기존 링크는 즉시 사용할 수 없어요.
        </p>
      </div>

      <h2 className="dl-section-title text-[17px]">공개 설정</h2>
      <div className="dl-manage-card">
        <div className="dl-info-row__body">
          <p className="dl-info-row__title font-semibold">공개 방</p>
          <p className="dl-info-row__desc">검색 결과에 노출됩니다.</p>
        </div>
        <DailyToggle checked={isPublic} label="공개 방" onChange={setIsPublic} />
      </div>

      <div className="flex items-center justify-between">
        <h2 className="dl-section-title text-[17px]">신고 및 안전</h2>
        <span className="dl-badge dl-badge--danger">처리 대기 1건</span>
      </div>

      <div className="dl-manage-card flex-col items-stretch gap-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="m-0 text-[14px] font-semibold text-[var(--dl-color-text-primary)]">부적절한 콘텐츠</p>
            <p className="mt-1 text-[11px] text-[var(--dl-color-text-secondary)]">
              영상 · 오늘의 한 컷 · 신고 사유 작성됨
            </p>
          </div>
          <span className="dl-badge dl-badge--danger">검토 필요</span>
        </div>
        <button type="button" className="dl-btn dl-btn--secondary">
          신고 내용 보기
        </button>
      </div>

      <div className="dl-manage-card">
        <div className="dl-info-row__body">
          <p className="dl-info-row__title font-semibold">관리 알림</p>
          <p className="dl-info-row__desc">신고·추방·초대 링크 변경</p>
        </div>
        <NotificationIconToggle checked={notify} label="관리 알림" onChange={setNotify} />
      </div>
    </section>
  );
}
