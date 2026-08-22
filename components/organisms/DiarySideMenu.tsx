"use client";

import { DailyIcon, TextLink } from "@/components/atoms";
import { MenuNavRow, SideSheetHeader } from "@/components/molecules";
import { AnimatedSideSheet } from "@/components/molecules/AnimatedOverlays";
import { ROUTES } from "@/config/routes";

type DiarySideMenuProps = {
  open: boolean;
  onClose: () => void;
};

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

function buildAugust2026Days() {
  const leading = 6;
  const daysInMonth = 31;
  const cells: Array<{ day: number; date?: string; outside?: boolean }> = [];

  for (let i = 0; i < leading; i += 1) {
    cells.push({ day: 26 + i, outside: true });
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    const dd = String(day).padStart(2, "0");
    cells.push({ day, date: `2026-08-${dd}` });
  }
  while (cells.length % 7 !== 0) {
    const overflow = cells.length - (leading + daysInMonth) + 1;
    cells.push({ day: overflow, outside: true });
  }
  return cells;
}

export function DiarySideMenu({ open, onClose }: DiarySideMenuProps) {
  const cells = buildAugust2026Days();

  return (
    <AnimatedSideSheet
      open={open}
      onClose={onClose}
      aria-label="다이어리 메뉴"
      className="flex w-[min(310px,86vw)] flex-col gap-4 rounded-l-[24px] bg-[#fbfaff] px-6 pt-12 pb-6"
    >
      <SideSheetHeader title="다이어리" onClose={onClose} />

      <div className="flex shrink-0 flex-col gap-2">
        <MenuNavRow href={ROUTES.diary.themes.root} onClick={onClose}>
          <DailyIcon name="usersBrand" size={24} />
          테마 관리
        </MenuNavRow>
        <MenuNavRow href={ROUTES.diary.themes.root} onClick={onClose}>
          <DailyIcon name="grid" size={24} />
          테마별
        </MenuNavRow>
        <MenuNavRow href={ROUTES.diary.root} onClick={onClose}>
          <DailyIcon name="calendar" size={24} />
          날짜별
        </MenuNavRow>
      </div>

      <div
        className="flex shrink-0 flex-col gap-[0.85rem] rounded-[var(--dc-radius)] border border-[var(--dc-glass-border)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] p-[0.85rem] shadow-[var(--dc-shadow)] backdrop-blur-[20px]"
        aria-label="캘린더"
      >
        <div className="flex items-center justify-between gap-[0.5rem] [&_button]:h-[2rem] [&_button]:w-[2rem] [&_button]:cursor-pointer [&_button]:rounded-[999px] [&_button]:border-0 [&_button]:bg-[#fff] [&_button]:text-[1.1rem] [&_button]:leading-none [&_button]:text-[#111] [&_p]:m-0 [&_p]:flex-1 [&_p]:text-center [&_p]:text-[0.88rem] [&_p]:font-extrabold [&_p]:text-[#111]">
          <button type="button" aria-label="이전 달">
            ‹
          </button>
          <p>August 2026</p>
          <button type="button" aria-label="다음 달">
            ›
          </button>
        </div>
        <div className="grid grid-cols-[repeat(7,_minmax(0,_1fr))] gap-[0.2rem] [&_span]:inline-flex [&_span]:h-[1.35rem] [&_span]:items-center [&_span]:justify-center [&_span]:text-[0.7rem] [&_span]:font-bold [&_span]:text-[rgba(0,_0,_0,_0.4)]">
          {WEEKDAYS.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="grid grid-cols-[repeat(7,_minmax(0,_1fr))] gap-[0.2rem]">
          {cells.map((cell, index) =>
            cell.date && !cell.outside ? (
              <TextLink
                key={`${cell.day}-${index}`}
                href={ROUTES.diary.date(cell.date)}
                className={`!inline-flex aspect-[1] items-center justify-center rounded-[999px] !text-[0.8rem] !font-bold !text-[#111] !no-underline [&.is-outside]:!text-[rgba(0,_0,_0,_0.28)] [&.is-selected]:bg-[var(--dc-accent)] [&.is-selected]:!text-[#fff] ${cell.day === 11 ? "is-selected" : ""}`}
                onClick={onClose}
              >
                {cell.day}
              </TextLink>
            ) : (
              <span
                key={`${cell.day}-${index}`}
                className="!inline-flex aspect-[1] items-center justify-center rounded-[999px] !text-[0.8rem] !font-bold !text-[rgba(0,_0,_0,_0.28)]"
              >
                {cell.day}
              </span>
            ),
          )}
        </div>
      </div>
    </AnimatedSideSheet>
  );
}
