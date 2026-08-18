"use client";

import { DailyIcon, TextLink } from "@/components/atoms";
import {
  getCompactCalendarDetail,
  listCompactCalendarActiveDays,
} from "@/config/compact-calendar-mock";
import { ROUTES } from "@/config/routes";
import { useMemo, useState } from "react";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

type RecordCalendarProps = {
  azitId: string;
};

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
  const cells = useMemo(() => monthCells(year, month), [year, month]);
  const activeDays = useMemo(() => new Set(listCompactCalendarActiveDays(year, month)), [year, month]);
  const selectedDetail = getCompactCalendarDetail(year, month, selectedDay);

  function shiftMonth(delta: number) {
    const next = new Date(year, month + delta, 1);
    const nextYear = next.getFullYear();
    const nextMonth = next.getMonth();
    const nextActive = listCompactCalendarActiveDays(nextYear, nextMonth);

    setYear(nextYear);
    setMonth(nextMonth);
    setSelectedDay(nextActive[0] ?? 1);
  }

  return (
    <section className="dl-compact-cal px-[23px] pb-8 pt-3" aria-label="기록 캘린더">
      <header className="dl-page-head">
        <TextLink href={ROUTES.azit.detail(azitId)} className="dl-icon-sq no-underline" aria-label="뒤로">
          <DailyIcon name="chevronLeft" size={20} />
        </TextLink>
        <div className="dl-page-head__copy">
          <h1 className="dl-compact-cal__title">기록 캘린더</h1>
        </div>
      </header>

      <div className="dl-compact-cal__nav">
        <button type="button" className="dl-icon-sq" aria-label="이전 달" onClick={() => shiftMonth(-1)}>
          <DailyIcon name="chevronLeft" size={20} />
        </button>
        <p className="dl-compact-cal__month">
          {year}년 {month + 1}월
        </p>
        <button type="button" className="dl-icon-sq" aria-label="다음 달" onClick={() => shiftMonth(1)}>
          <DailyIcon name="chevronRight" size={20} />
        </button>
      </div>

      <div className="dl-compact-cal__weekdays">
        {WEEKDAYS.map((label, index) => (
          <span
            key={label}
            className={index === 0 ? "dl-compact-cal__weekday dl-compact-cal__weekday--sun" : "dl-compact-cal__weekday"}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="dl-compact-cal__grid">
        {cells.map((day, index) => {
          if (!day) return <span key={`empty-${index}`} className="dl-compact-cal__cell" aria-hidden />;

          const available = activeDays.has(day);
          const selected = day === selectedDay;

          return (
            <button
              key={day}
              type="button"
              className={`dl-compact-cal__cell ${available ? "dl-compact-cal__cell--available" : "dl-compact-cal__cell--empty"} ${selected ? "dl-compact-cal__cell--selected" : ""}`}
              disabled={!available}
              aria-pressed={selected}
              onClick={() => available && setSelectedDay(day)}
            >
              {day}
              {available ? <span className="dl-compact-cal__dot" aria-hidden /> : null}
            </button>
          );
        })}
      </div>

      {selectedDetail ? (
        <>
          <div className="dl-compact-cal__detail">
            <p className="dl-compact-cal__detail-title">
              {month + 1}월 {selectedDay}일 · 영상 {selectedDetail.videoCount}개
            </p>
            <p className="dl-compact-cal__detail-tags">{selectedDetail.tags.join("   ")}</p>
            <p className="dl-compact-cal__detail-body">{selectedDetail.summary}</p>
          </div>

          <TextLink href={ROUTES.azit.detail(azitId)} className="dl-compact-cal__link no-underline">
            <span className="dl-compact-cal__link-icon" aria-hidden />
            <span>
              <span className="dl-compact-cal__link-title">오늘의 영상 보기</span>
              <span className="dl-compact-cal__link-sub">태그와 리액션 확인</span>
            </span>
          </TextLink>
        </>
      ) : null}

      <p className="dl-compact-cal__hint">활성 날짜를 누르면 해당 일자의 영상·내역으로 바로 이동합니다.</p>
    </section>
  );
}
