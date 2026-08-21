"use client";

import { Separator, TextLink } from "@/components/atoms";
import { AnimatedSideSheet } from "@/components/molecules/AnimatedOverlays";
import { DiaryMenuLink } from "@/components/organisms/DiaryHeader";
import { DIARY_THEMES } from "@/config/diary-mock";
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
    <AnimatedSideSheet open={open} onClose={onClose} aria-label="다이어리 메뉴" className="flex w-[min(300px,_82vw)] h-[100dvh] flex-col gap-[0.75rem] p-[1rem] [border-left:1px_solid_var(--dc-glass-border)] bg-[linear-gradient(180deg,_rgba(255,_255,_255,_0.82),_rgba(255,_255,_255,_0.58))] shadow-[var(--dc-shadow-card)] backdrop-blur-[20px] overflow-y-auto">
      <div className="flex items-center justify-between gap-[0.75rem]">
        <p className="m-0 text-[1rem] font-extrabold">Menu</p>
        <button type="button" className="border-0 bg-[transparent] text-[rgba(0,_0,_0,_0.45)] cursor-pointer text-[0.95rem] font-bold leading-none p-[0.15rem]" aria-label="닫기" onClick={onClose}>
          ✕
        </button>
      </div>

      <DiaryMenuLink href={ROUTES.diary.themes.root}>전체보기</DiaryMenuLink>
      <Separator className="!m-[0.1rem_0] !border-[rgba(0,_0,_0,_0.08)]" />

      <p className="m-[0.15rem_0_0] text-[rgba(0,_0,_0,_0.4)] text-[0.72rem] font-extrabold tracking-[0.06em] uppercase">Themes</p>
      <div className="flex flex-col">
        {DIARY_THEMES.map((theme) => (
          <DiaryMenuLink key={theme.id} href={ROUTES.diary.themes.detail(theme.id)}>
            {theme.name}
          </DiaryMenuLink>
        ))}
      </div>

      <div className="mt-[0.5rem] flex flex-col gap-[0.85rem] p-[0.85rem] border border-[var(--dc-glass-border)] rounded-[var(--dc-radius)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] shadow-[var(--dc-shadow)] backdrop-blur-[20px]" aria-label="캘린더">
        <div className="flex items-center justify-between gap-[0.5rem] [&_p]:m-0 [&_p]:flex-1 [&_p]:text-center [&_p]:text-[0.88rem] [&_p]:font-extrabold [&_p]:text-[#111] [&_button]:w-[2rem] [&_button]:h-[2rem] [&_button]:border-0 [&_button]:rounded-[999px] [&_button]:bg-[#fff] [&_button]:text-[#111] [&_button]:cursor-pointer [&_button]:text-[1.1rem] [&_button]:leading-none">
          <button type="button" aria-label="이전 달">
            ‹
          </button>
          <p>August 2026</p>
          <button type="button" aria-label="다음 달">
            ›
          </button>
        </div>
        <div className="grid grid-cols-[repeat(7,_minmax(0,_1fr))] gap-[0.2rem] [&_span]:inline-flex [&_span]:h-[1.35rem] [&_span]:items-center [&_span]:justify-center [&_span]:text-[rgba(0,_0,_0,_0.4)] [&_span]:text-[0.7rem] [&_span]:font-bold">
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
                className={`!inline-flex aspect-[1] items-center justify-center rounded-[999px] !text-[#111] !text-[0.8rem] !font-bold !no-underline [&.is-selected]:bg-[var(--dc-accent)] [&.is-selected]:!text-[#fff] [&.is-outside]:!text-[rgba(0,_0,_0,_0.28)] ${cell.day === 11 ? "is-selected" : ""}`}
                onClick={onClose}
              >
                {cell.day}
              </TextLink>
            ) : (
              <span key={`${cell.day}-${index}`} className="!inline-flex aspect-[1] items-center justify-center rounded-[999px] !text-[#111] !text-[0.8rem] !font-bold !no-underline [&.is-selected]:bg-[var(--dc-accent)] [&.is-selected]:!text-[#fff] [&.is-outside]:!text-[rgba(0,_0,_0,_0.28)] is-outside">
                {cell.day}
              </span>
            ),
          )}
        </div>
      </div>
    </AnimatedSideSheet>
  );
}
