"use client";

import { Separator, TextLink } from "@/components/atoms";
import { DiaryMenuLink } from "@/components/organisms/DiaryHeader";
import { DIARY_THEMES } from "@/config/diary-mock";
import { ROUTES } from "@/config/routes";

type DiarySideMenuProps = {
  open: boolean;
  onClose: () => void;
};

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

function buildAugust2026Days() {
  // Align with diary mock entries (August 2026 starts Saturday)
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
  if (!open) {
    return null;
  }

  const cells = buildAugust2026Days();

  return (
    <>
      <button
        type="button"
        aria-label="메뉴 닫기"
        className="plip-diary-sheet__overlay"
        onClick={onClose}
      />

      <aside aria-label="다이어리 메뉴" className="plip-diary-sheet">
        <div className="plip-diary-sheet__top">
          <p className="plip-diary-sheet__title">Menu</p>
          <button
            type="button"
            className="plip-diary-sheet__close"
            aria-label="닫기"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <DiaryMenuLink href={ROUTES.diary.themes.root}>전체보기</DiaryMenuLink>
        <Separator className="plip-diary-sheet__separator" />

        <p className="plip-diary-sheet__label">Themes</p>
        <div className="plip-diary-sheet__themes">
          {DIARY_THEMES.map((theme) => (
            <DiaryMenuLink
              key={theme.id}
              href={ROUTES.diary.themes.detail(theme.id)}
            >
              {theme.name}
            </DiaryMenuLink>
          ))}
        </div>

        <div className="plip-diary-calendar" aria-label="캘린더">
          <div className="plip-diary-calendar__nav">
            <button type="button" aria-label="이전 달">
              ‹
            </button>
            <p>August 2026</p>
            <button type="button" aria-label="다음 달">
              ›
            </button>
          </div>
          <div className="plip-diary-calendar__weekdays">
            {WEEKDAYS.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="plip-diary-calendar__grid">
            {cells.map((cell, index) =>
              cell.date && !cell.outside ? (
                <TextLink
                  key={`${cell.day}-${index}`}
                  href={ROUTES.diary.date(cell.date)}
                  className={`plip-diary-calendar__day ${
                    cell.day === 11 ? "is-selected" : ""
                  }`}
                  onClick={onClose}
                >
                  {cell.day}
                </TextLink>
              ) : (
                <span
                  key={`${cell.day}-${index}`}
                  className="plip-diary-calendar__day is-outside"
                >
                  {cell.day}
                </span>
              ),
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
