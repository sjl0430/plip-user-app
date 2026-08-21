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
  agitId: string;
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

export function RecordCalendar({ agitId }: RecordCalendarProps) {
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
    <section className="flex flex-col gap-[16px] px-[23px] pb-8 pt-3" aria-label="기록 캘린더">
      <header className="flex items-start justify-between gap-[12px] gap-[10px] mb-[4px]">
        <TextLink href={ROUTES.agit.detail(agitId)} className="grid w-[44px] h-[44px] shrink-0 place-items-center rounded-[var(--dl-radius-md)] bg-[var(--dl-color-bg-surface)] no-underline" aria-label="뒤로">
          <DailyIcon name="chevronLeft" size={20} />
        </TextLink>
        <div className="pt-[14px] min-w-0 flex-1">
          <h1 className="m-0 text-[22px] font-bold leading-[27px] text-[var(--dl-color-text-primary)]">기록 캘린더</h1>
        </div>
      </header>

      <div className="flex items-center justify-between gap-[12px]">
        <button type="button" className="grid w-[44px] h-[44px] shrink-0 place-items-center rounded-[var(--dl-radius-md)] bg-[var(--dl-color-bg-surface)]" aria-label="이전 달" onClick={() => shiftMonth(-1)}>
          <DailyIcon name="chevronLeft" size={20} />
        </button>
        <p className="m-0 flex-1 text-center text-lg font-semibold text-[var(--dl-color-text-primary)]">
          {year}년 {month + 1}월
        </p>
        <button type="button" className="grid w-[44px] h-[44px] shrink-0 place-items-center rounded-[var(--dl-radius-md)] bg-[var(--dl-color-bg-surface)]" aria-label="다음 달" onClick={() => shiftMonth(1)}>
          <DailyIcon name="chevronRight" size={20} />
        </button>
      </div>

      <div className="grid grid-cols-[repeat(7,_1fr)] gap-[4px]">
        {WEEKDAYS.map((label, index) => (
          <span
            key={label}
            className={index === 0 ? "text-center text-[11px] font-medium text-[var(--dl-color-text-secondary)] text-[var(--dl-color-text-danger)] m-dlCompactCalWeekdaySun" : "text-center text-[11px] font-medium text-[var(--dl-color-text-secondary)]"}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-[repeat(7,_1fr)] gap-[4px]">
        {cells.map((day, index) => {
          if (!day) return <span key={`empty-${index}`} className="relative flex h-[36px] flex-col items-center justify-center gap-[4px] border-0 rounded-[12px] bg-[transparent] text-sm font-medium text-[var(--dl-color-text-tertiary)]" aria-hidden />;

          const available = activeDays.has(day);
          const selected = day === selectedDay;

          return (
            <button
              key={day}
              type="button"
              className={`relative flex h-[36px] flex-col items-center justify-center gap-[4px] border-0 rounded-[12px] bg-[transparent] text-sm font-medium text-[var(--dl-color-text-tertiary)] ${available ? "text-[var(--dl-color-text-primary)] m-dlCompactCalCellAvailable" : "opacity-[0.45] m-dlCompactCalCellEmpty"} ${selected ? "text-[var(--dl-color-text-inverse)] bg-[var(--dl-color-bg-brand)] m-dlCompactCalCellSelected" : ""}`}
              disabled={!available}
              aria-pressed={selected}
              onClick={() => available && setSelectedDay(day)}
            >
              {day}
              {available ? <span className="w-[5px] h-[5px] rounded-[999px] bg-[var(--dl-color-text-brand)] bg-[#fff]" aria-hidden /> : null}
            </button>
          );
        })}
      </div>

      {selectedDetail ? (
        <>
          <div className="flex flex-col gap-[7px] min-h-[112px] p-[14px_16px] rounded-[16px] bg-[var(--dl-color-bg-brand-subtle)]">
            <p className="m-0 text-base font-semibold text-[var(--dl-color-text-primary)]">
              {month + 1}월 {selectedDay}일 · 영상 {selectedDetail.videoCount}개
            </p>
            <p className="m-0 text-xs font-medium text-[var(--dl-color-text-brand)]">{selectedDetail.tags.join("   ")}</p>
            <p className="m-0 text-[11px] text-[var(--dl-color-text-secondary)]">{selectedDetail.summary}</p>
          </div>

          <TextLink href={ROUTES.agit.detail(agitId)} className="flex items-center gap-[12px] min-h-[70px] p-[10px] border border-[var(--dl-color-border-default)] rounded-[14px] bg-[var(--dl-color-bg-elevated)] text-[var(--dl-color-text-primary)] no-underline">
            <span className="w-[54px] h-[54px] shrink-0 rounded-[10px] bg-[linear-gradient(135deg,_#fc8c6e_0%,_#6b4af5_100%)]" aria-hidden />
            <span>
              <span className="block text-[13px] font-semibold">오늘의 영상 보기</span>
              <span className="block mt-[2px] text-[13px] font-semibold">태그와 리액션 확인</span>
            </span>
          </TextLink>
        </>
      ) : null}

      <p className="m-0 text-xs font-medium text-[#706985]">활성 날짜를 누르면 해당 일자의 영상·내역으로 바로 이동합니다.</p>
    </section>
  );
}
