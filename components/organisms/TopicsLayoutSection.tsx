"use client";

import { DailyIcon, TextLink } from "@/components/atoms";
import { ROUTES } from "@/config/routes";
import { useState } from "react";

type TopicSectionId = "ongoing" | "upcoming" | "past";

type MockTopic = {
  id: string;
  title: string;
  meta: string;
  clips: number;
  section: TopicSectionId;
};

const INITIAL_TOPICS: MockTopic[] = [
  { id: "today", title: "오늘의 한 컷", meta: "매일 · 1인 1영상", clips: 12, section: "ongoing" },
  { id: "workout", title: "운동 인증", meta: "평일 · 릴레이", clips: 8, section: "ongoing" },
  { id: "weekend", title: "주말 산책", meta: "주말 · 그리드", clips: 0, section: "upcoming" },
  { id: "archive", title: "지난 챌린지", meta: "종료됨", clips: 21, section: "past" },
];

const SECTIONS: { id: TopicSectionId; label: string }[] = [
  { id: "ongoing", label: "진행중" },
  { id: "upcoming", label: "다가오는" },
  { id: "past", label: "지난" },
];

type TopicsLayoutSectionProps = {
  agitId: string;
};

export function TopicsLayoutSection({ agitId }: TopicsLayoutSectionProps) {
  const [topics, setTopics] = useState(INITIAL_TOPICS);
  const [openSections, setOpenSections] = useState<Record<TopicSectionId, boolean>>({
    ongoing: true,
    upcoming: true,
    past: true,
  });

  function toggleSection(id: TopicSectionId) {
    setOpenSections((current) => ({ ...current, [id]: !current[id] }));
  }

  return (
    <section className="flex w-full flex-col gap-3.5">
      <p className="m-0 text-[13px] font-normal leading-5 text-[var(--dl-color-text-secondary)]">
        토픽을 진행 상태별로 보고 목업으로 만들고 지울 수 있어요
      </p>

      <TextLink
        href={ROUTES.agit.topicCreate(agitId)}
        className="m-dlBtnSecondary inline-flex h-[44px] w-full items-center justify-center gap-[8px] rounded-[var(--dl-radius-md)] border-0 bg-[var(--dl-color-bg-brand-subtle)] p-[12px_20px] text-sm font-medium leading-5 !text-[var(--dl-color-text-brand)] !no-underline shadow-[none] [backdrop-filter:none]"
      >
        <DailyIcon name="plus" size={16} />
        토픽 만들기
      </TextLink>

      {SECTIONS.map((section) => {
        const items = topics.filter((topic) => topic.section === section.id);
        const open = openSections[section.id];

        return (
          <div key={section.id} className="flex flex-col gap-2">
            <button
              type="button"
              className="flex min-h-[40px] items-center justify-between"
              onClick={() => toggleSection(section.id)}
              aria-expanded={open}
            >
              <h2 className="m-0 text-[17px] font-semibold leading-[23px] text-[var(--dl-color-text-primary)]">
                {section.label}
              </h2>
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex h-[28px] items-center justify-center rounded-[14px] bg-[var(--dl-color-bg-brand-subtle)] p-[0_12px] text-xs font-semibold leading-none text-[var(--dl-color-text-brand)]">
                  {items.length}개
                </span>
                <DailyIcon
                  name="chevronRight"
                  size={16}
                  className={open ? "rotate-90" : ""}
                />
              </span>
            </button>

            {open
              ? items.map((topic) => (
                  <div
                    key={topic.id}
                    className="flex w-full items-center gap-[10px] rounded-[var(--dl-radius-lg)] border border-[var(--dl-color-border-default)] bg-[var(--dl-color-bg-surface)] p-[12px_14px]"
                  >
                    <DailyIcon name="grip" size={18} />
                    <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
                      <p className="m-0 text-sm font-semibold leading-5 text-[var(--dl-color-text-primary)]">
                        {topic.title}
                      </p>
                      <p className="m-0 text-xs font-normal leading-[17px] text-[var(--dl-color-text-secondary)]">
                        {topic.meta}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span
                        className={`inline-flex h-[28px] items-center justify-center rounded-[14px] p-[0_12px] text-xs font-semibold leading-none ${
                          topic.clips === 0
                            ? "m-dlBadgeSuccess bg-[var(--dl-color-bg-success)] text-[var(--dl-color-text-success)]"
                            : "bg-[var(--dl-color-bg-brand-subtle)] text-[var(--dl-color-text-brand)]"
                        }`}
                      >
                        {topic.clips}개 영상
                      </span>
                      {topic.clips === 0 ? (
                        <button
                          type="button"
                          className="text-[12px] font-semibold text-[var(--dl-color-text-danger)]"
                          onClick={() =>
                            setTopics((current) => current.filter((item) => item.id !== topic.id))
                          }
                        >
                          삭제
                        </button>
                      ) : (
                        <span className="text-[12px] font-semibold text-[var(--dl-color-text-tertiary)]">
                          삭제 불가
                        </span>
                      )}
                    </div>
                  </div>
                ))
              : null}
          </div>
        );
      })}

      <div className="flex w-full items-center gap-[10px] rounded-[12px] bg-[var(--dl-color-bg-warning)] p-[12px_14px]">
        <DailyIcon name="alert" size={18} />
        <p className="m-0 text-[12px] font-medium text-[var(--dl-color-text-primary)]">
          영상이 등록된 토픽은 삭제할 수 없어요.
        </p>
      </div>
    </section>
  );
}
