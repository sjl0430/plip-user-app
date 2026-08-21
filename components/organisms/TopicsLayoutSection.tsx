"use client";

import { DailyIcon, TextLink } from "@/components/atoms";
import { ROUTES } from "@/config/routes";
import { useState } from "react";

const INITIAL_TOPICS = [
  { id: "today", title: "오늘의 한 컷", meta: "매일 · 1인 1영상", clips: 12 },
  { id: "workout", title: "운동 인증", meta: "평일 · 릴레이", clips: 8 },
  { id: "weekend", title: "주말 산책", meta: "주말 · 그리드", clips: 0 },
] as const;

type LayoutId = "grid" | "list" | "relay";

type TopicsLayoutSectionProps = {
  agitId: string;
};

export function TopicsLayoutSection({ agitId }: TopicsLayoutSectionProps) {
  const [topics, setTopics] = useState([...INITIAL_TOPICS]);
  const [layout, setLayout] = useState<LayoutId>("grid");

  return (
    <section className="flex w-full flex-col gap-3.5">
      <p className="m-0 text-sm font-normal leading-5 text-[var(--dl-color-text-secondary)] text-[13px]">토픽별 영상 상태와 표시 방식을 한 화면에서 관리</p>

      <div className="flex items-center justify-between">
        <h2 className="m-0 text-base font-semibold leading-[23px] text-[var(--dl-color-text-primary)] text-[17px]">토픽</h2>
        <span className="inline-flex items-center justify-center h-[28px] rounded-[14px] p-[0_12px] text-xs font-semibold leading-none bg-[var(--dl-color-bg-brand-subtle)] text-[var(--dl-color-text-brand)]">{topics.length}개 사용 중</span>
      </div>

      <TextLink href={ROUTES.agit.topicCreate(agitId)} className="inline-flex h-[44px] w-full items-center justify-center gap-[8px] rounded-[var(--dl-radius-md)] p-[12px_20px] text-sm font-medium leading-5 !no-underline border-0 bg-[var(--dl-color-bg-brand-subtle)] border-0 bg-[var(--dl-color-bg-brand-subtle)] !text-[var(--dl-color-text-brand)] shadow-[none] [backdrop-filter:none] m-dlBtnSecondary no-underline">
        <DailyIcon name="plus" size={16} />
        토픽 만들기
      </TextLink>

      {topics.map((topic) => (
        <div key={topic.id} className="flex w-full items-center gap-[10px] border border-[var(--dl-color-border-default)] rounded-[var(--dl-radius-lg)] bg-[var(--dl-color-bg-surface)] p-[12px_14px]">
          <DailyIcon name="grip" size={18} />
          <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
            <p className="m-0 text-sm font-medium leading-5 text-[var(--dl-color-text-primary)] font-semibold">{topic.title}</p>
            <p className="m-0 text-xs font-normal leading-[17px] text-[var(--dl-color-text-secondary)]">{topic.meta}</p>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className={`inline-flex items-center justify-center h-[28px] rounded-[14px] p-[0_12px] text-xs font-semibold leading-none bg-[var(--dl-color-bg-brand-subtle)] text-[var(--dl-color-text-brand)] ${topic.clips === 0 ? "bg-[var(--dl-color-bg-success)] text-[var(--dl-color-text-success)] m-dlBadgeSuccess" : ""}`}>
              {topic.clips}개 영상
            </span>
            {topic.clips === 0 ? (
              <button
                type="button"
                className="text-[12px] font-semibold text-[var(--dl-color-text-danger)]"
                onClick={() => setTopics((current) => current.filter((item) => item.id !== topic.id))}
              >
                삭제
              </button>
            ) : (
              <span className="text-[12px] font-semibold text-[var(--dl-color-text-tertiary)]">삭제 불가</span>
            )}
          </div>
        </div>
      ))}

      <div className="flex w-full items-center gap-[10px] rounded-[12px] bg-[var(--dl-color-bg-warning)] p-[12px_14px]">
        <DailyIcon name="alert" size={18} />
        <p className="m-0 text-[12px] font-medium text-[var(--dl-color-text-primary)]">
          영상이 등록된 토픽은 삭제할 수 없어요.
        </p>
      </div>

      <h2 className="m-0 text-base font-semibold leading-[23px] text-[var(--dl-color-text-primary)] text-[17px]">그룹 영상 표시 방식</h2>
      <div className="grid w-full grid-cols-[repeat(3,_1fr)] gap-[12px]">
        {(
          [
            { id: "grid", label: "그리드", icon: "grid" },
            { id: "list", label: "리스트", icon: "list" },
            { id: "relay", label: "꼬리물기", icon: "chevronRight" },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            type="button"
            className={`flex min-h-[104px] flex-col items-center justify-center gap-[12px] border border-[var(--dl-color-border-default)] rounded-[var(--dl-radius-lg)] bg-[var(--dl-color-bg-surface)] ${layout === item.id ? "border border-[var(--dl-color-border-brand)] bg-[var(--dl-color-bg-brand-subtle)] text-[var(--dl-color-text-brand)] m-dlLayoutActive" : ""}`}
            onClick={() => setLayout(item.id)}
          >
            <DailyIcon name={item.icon} size={22} />
            <span className="text-[13px] font-semibold">{item.label}</span>
          </button>
        ))}
      </div>
      <p className="m-0 text-sm font-normal leading-5 text-[var(--dl-color-text-secondary)] text-[12px]">선택한 형식은 다음 업로드부터 적용됩니다.</p>
    </section>
  );
}
