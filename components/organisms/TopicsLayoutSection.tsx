"use client";

import { DailyIcon, SubmitButton } from "@/components/atoms";
import { TopicCreateForm } from "@/components/organisms/TopicCreateForm";
import { useState } from "react";

const INITIAL_TOPICS = [
  { id: "today", title: "오늘의 한 컷", meta: "매일 · 1인 1영상", clips: 12 },
  { id: "workout", title: "운동 인증", meta: "평일 · 릴레이", clips: 8 },
  { id: "weekend", title: "주말 산책", meta: "주말 · 그리드", clips: 0 },
] as const;

type LayoutId = "grid" | "list" | "relay";

export function TopicsLayoutSection() {
  const [topics, setTopics] = useState([...INITIAL_TOPICS]);
  const [layout, setLayout] = useState<LayoutId>("grid");
  const [creating, setCreating] = useState(false);

  return (
    <section className="flex w-full flex-col gap-3.5">
      <p className="dl-subtitle text-[13px]">토픽별 영상 상태와 표시 방식을 한 화면에서 관리</p>

      <div className="flex items-center justify-between">
        <h2 className="dl-section-title text-[17px]">토픽</h2>
        <span className="dl-badge">{topics.length}개 사용 중</span>
      </div>

      <button type="button" className="dl-btn dl-btn--secondary" onClick={() => setCreating((current) => !current)}>
        <DailyIcon name="plus" size={16} />
        토픽 만들기
      </button>
      {creating ? <TopicCreateForm /> : null}

      {topics.map((topic) => (
        <div key={topic.id} className="dl-manage-card">
          <DailyIcon name="grip" size={18} />
          <div className="dl-info-row__body">
            <p className="dl-info-row__title font-semibold">{topic.title}</p>
            <p className="dl-info-row__desc">{topic.meta}</p>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className={`dl-badge ${topic.clips === 0 ? "dl-badge--success" : ""}`}>
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

      <div className="dl-warn">
        <DailyIcon name="alert" size={18} />
        <p className="m-0 text-[12px] font-medium text-[var(--dl-color-text-primary)]">
          영상이 등록된 토픽은 삭제할 수 없어요.
        </p>
      </div>

      <h2 className="dl-section-title text-[17px]">그룹 영상 표시 방식</h2>
      <div className="dl-layout-grid">
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
            className={`dl-layout ${layout === item.id ? "dl-layout--active" : ""}`}
            onClick={() => setLayout(item.id)}
          >
            <DailyIcon name={item.icon} size={22} />
            <span className="text-[13px] font-semibold">{item.label}</span>
          </button>
        ))}
      </div>
      <p className="dl-subtitle text-[12px]">선택한 형식은 다음 업로드부터 적용됩니다.</p>
      <SubmitButton variant="brand">변경사항 저장</SubmitButton>
    </section>
  );
}
