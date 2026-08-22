"use client";

import { IconButton, ScreenTitle } from "@/components/atoms";
import { DiaryThemeClipGroup, HeaderBackLink, ScreenHeader } from "@/components/molecules";
import { ROUTES } from "@/config/routes";
import type { UiDiaryThemeDateGroup } from "@/types/diary/ui";

type DiaryThemeDetailSectionProps = {
  themeId: string;
  themeName: string;
  dateGroups: UiDiaryThemeDateGroup[];
  error?: string;
};

export function DiaryThemeDetailSection({
  themeName,
  dateGroups,
  error,
}: DiaryThemeDetailSectionProps) {
  return (
    <div className="flex flex-col gap-[1.15rem] p-[0.9rem_1rem_1.75rem]">
      <ScreenHeader
        tone="plain"
        titleAlign="center"
        leading={<HeaderBackLink href={ROUTES.diary.themes.root} />}
        title={<ScreenTitle className="text-[1rem] font-extrabold text-[#111]">{themeName}</ScreenTitle>}
      />

      {error ? <p className="m-0 text-center text-sm text-red-600">{error}</p> : null}

      {dateGroups.length > 0 ? (
        dateGroups.map((group) => (
          <DiaryThemeClipGroup
            key={group.date}
            themeName={themeName}
            date={group.date}
            clipCount={group.clipCount}
            clips={group.clips}
            showDateLink
          />
        ))
      ) : (
        <p className="m-[2rem_0_0] text-center text-[0.85rem] font-semibold text-[rgba(0,_0,_0,_0.4)]">해당 테마의 클립이 없습니다.</p>
      )}

      <div className="flex justify-center pt-[0.25rem]">
        <IconButton label="테마 옵션" className="!border-[var(--dc-glass-border)] !bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] shadow-[var(--dc-shadow)] !text-[var(--dc-fg-primary)]">
          <span aria-hidden>⋮</span>
        </IconButton>
      </div>
    </div>
  );
}
