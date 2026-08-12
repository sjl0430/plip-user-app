"use client";

import { Separator, TextLink } from "@/components/atoms";
import { DiaryMenuLink } from "@/components/organisms/DiaryHeader";
import { DIARY_THEMES } from "@/config/diary-mock";
import { ROUTES } from "@/config/routes";

type DiarySideMenuProps = {
  open: boolean;
  onClose: () => void;
};

const CALENDAR_DAYS = Array.from({ length: 31 }, (_, index) => index + 1);

export function DiarySideMenu({ open, onClose }: DiarySideMenuProps) {
  if (!open) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        aria-label="메뉴 닫기"
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
      />

      <aside
        aria-label="다이어리 메뉴"
        className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,280px)] flex-col gap-4 overflow-y-auto bg-white p-6 shadow-xl dark:bg-zinc-900"
      >
        <DiaryMenuLink href={ROUTES.diary.themes.root}>전체보기</DiaryMenuLink>
        <Separator />

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">테마</p>
          {DIARY_THEMES.map((theme) => (
            <DiaryMenuLink
              key={theme.id}
              href={ROUTES.diary.themes.detail(theme.id)}
            >
              {theme.name}
            </DiaryMenuLink>
          ))}
        </div>

        <Separator />

        <nav aria-label="캘린더" className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm font-medium">
            <span>2026. 08</span>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-zinc-500">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <span key={day}>{day}</span>
            ))}
            {CALENDAR_DAYS.map((day) => {
              const date = `2026-08-${String(day).padStart(2, "0")}`;
              return (
                <TextLink
                  key={day}
                  href={ROUTES.diary.date(date)}
                  className="rounded p-1 no-underline hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  onClick={onClose}
                >
                  {day}
                </TextLink>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
}
