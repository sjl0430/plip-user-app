"use client";

import { DailyIcon, Pill, TextLink } from "@/components/atoms";
import { CalendarClipCard, CalendarDay, RoomNav } from "@/components/molecules";
import {
  CALENDAR_CLIPS,
  CALENDAR_LEGEND,
  CALENDAR_RECORDS,
  CALENDAR_STATS,
  CALENDAR_TOPICS,
  type CalendarTopic,
} from "@/config/calendar-mock";
import { ROUTES } from "@/config/routes";
import { useMemo, useState } from "react";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
const WEEKDAY_NAMES = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

type RecordCalendarProps = {
  azitId: string;
};

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function dateKey(year: number, month: number, day: number) {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

function monthCells(year: number, month: number) {
  const startPad = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<number | undefined> = [
    ...Array<undefined>(startPad).fill(undefined),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(undefined);
  return cells;
}

export function RecordCalendar({ azitId }: RecordCalendarProps) {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(7);
  const [selectedDay, setSelectedDay] = useState(14);
  const [view, setView] = useState<"month" | "week">("month");
  const [topic, setTopic] = useState<CalendarTopic>("전체");

  const cells = useMemo(() => monthCells(year, month), [year, month]);
  const selectedKey = dateKey(year, month, selectedDay);
  const selectedRecord = CALENDAR_RECORDS[selectedKey];
  const selectedClips = (CALENDAR_CLIPS[selectedKey] ?? []).filter(
    (clip) => topic === "전체" || clip.topic === topic,
  );
  const weekday = new Date(year, month, selectedDay).getDay();

  const visibleCells = useMemo(() => {
    if (view === "month") return cells;
    const index = cells.findIndex((day) => day === selectedDay);
    const start = index >= 0 ? index - (index % 7) : 0;
    return cells.slice(start, start + 7);
  }, [cells, selectedDay, view]);

  function shiftMonth(delta: number) {
    const next = new Date(year, month + delta, 1);
    setYear(next.getFullYear());
    setMonth(next.getMonth());
    setSelectedDay(1);
  }

  function recordFor(day?: number) {
    if (!day) return undefined;
    const record = CALENDAR_RECORDS[dateKey(year, month, day)];
    if (!record) return undefined;
    if (topic !== "전체" && !record.topics[topic]) return undefined;
    return record;
  }

  return (
    <section className="flex w-full flex-col gap-3" aria-label="기록 캘린더">
      <header className="dl-hub-head">
        <div>
          <h1 className="dl-hub-head__title">기록 캘린더</h1>
          <p className="dl-hub-head__sub">활성 날짜를 누르면 해당 일자의 영상·내역으로 바로 이동합니다.</p>
        </div>
        <div className="dl-view-toggle" role="tablist" aria-label="보기">
          <button
            type="button"
            className={`dl-view-toggle__item ${view === "month" ? "dl-view-toggle__item--active" : ""}`}
            onClick={() => setView("month")}
          >
            월
          </button>
          <button
            type="button"
            className={`dl-view-toggle__item ${view === "week" ? "dl-view-toggle__item--active" : ""}`}
            onClick={() => setView("week")}
          >
            주
          </button>
        </div>
      </header>

      <div className="dl-summary">
        <div className="dl-stat">
          <p className="dl-summary__value">{CALENDAR_STATS.recordedDays}일</p>
          <p className="dl-summary__label">기록한 날</p>
        </div>
        <div className="dl-stat">
          <p className="dl-summary__value">{CALENDAR_STATS.monthVideos}개</p>
          <p className="dl-summary__label">이번 달 영상</p>
        </div>
        <div className="dl-stat">
          <p className="dl-summary__value">{CALENDAR_STATS.streak}일</p>
          <p className="dl-summary__label">연속 기록</p>
        </div>
      </div>

      <div className="dl-pills">
        {CALENDAR_TOPICS.map((item) => (
          <Pill
            key={item}
            selected={topic === item}
            className="dl-pill--compact"
            onClick={() => setTopic(item)}
          >
            {item}
          </Pill>
        ))}
      </div>

      <div className="dl-cal">
        <div className="dl-cal__nav">
          <button type="button" className="dl-cal__nav-btn" aria-label="이전 달" onClick={() => shiftMonth(-1)}>
            <DailyIcon name="chevronLeft" size={20} />
          </button>
          <p className="dl-cal__month">
            {year}년 {month + 1}월
          </p>
          <button type="button" className="dl-cal__nav-btn" aria-label="다음 달" onClick={() => shiftMonth(1)}>
            <DailyIcon name="chevronRight" size={20} />
          </button>
        </div>
        <div className="dl-cal__weekdays">
          {WEEKDAYS.map((label) => (
            <p key={label} className="dl-cal__weekday">
              {label}
            </p>
          ))}
        </div>
        <div className="dl-cal__grid">
          {visibleCells.map((day, index) => {
            const record = recordFor(day);
            return (
              <CalendarDay
                key={`${year}-${month}-${day ?? `empty-${index}`}`}
                day={day}
                count={record?.count}
                selected={day === selectedDay}
                onSelect={setSelectedDay}
              />
            );
          })}
        </div>
        <div className="dl-cal__legend">
          {CALENDAR_LEGEND.map((item) => (
            <span key={item.label} className="dl-cal__legend-item">
              <span className="dl-cal__legend-dot">
                <img src={item.src} alt="" width={7} height={7} />
              </span>
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <article className="dl-date-card">
        <div className="dl-section-row">
          <div>
            <p className="m-0 text-[14px] font-semibold leading-[19px] text-[var(--dl-color-text-primary)]">
              {month + 1}월 {selectedDay}일 · {WEEKDAY_NAMES[weekday]}
            </p>
            <p className="m-0 text-[10px] leading-[14px] text-[var(--dl-color-text-secondary)]">
              {selectedRecord
                ? Object.entries(selectedRecord.topics)
                    .map(([name, count]) => `${name} ${count}`)
                    .join(" · ")
                : "기록이 없는 날이에요"}
            </p>
          </div>
          <TextLink
            href={ROUTES.diary.date(selectedKey)}
            className="dl-section-row__link no-underline"
          >
            {selectedRecord ? `${selectedRecord.count}개 영상` : "영상 보기"}
            <DailyIcon name="chevronRight" size={16} />
          </TextLink>
        </div>
        {selectedClips.length > 0 ? (
          <div className="dl-clip-row">
            {selectedClips.map((clip) => (
              <CalendarClipCard key={clip.id} clip={clip} />
            ))}
          </div>
        ) : null}
      </article>

      <RoomNav azitId={azitId} active="calendar" />
    </section>
  );
}
