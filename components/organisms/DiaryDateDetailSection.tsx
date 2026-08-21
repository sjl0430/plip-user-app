import { TextLink } from "@/components/atoms";
import { DiaryThemeClipGroup } from "@/components/molecules";
import { formatDiaryDate } from "@/config/diary-mock";
import { ROUTES } from "@/config/routes";
import type { UiDiaryDateThemeGroup } from "@/types/diary/ui";

type DiaryDateDetailSectionProps = {
  date: string;
  themes: UiDiaryDateThemeGroup[];
  prevDate: string;
  nextDate: string;
  error?: string;
};

export function DiaryDateDetailSection({
  date,
  themes,
  prevDate,
  nextDate,
  error,
}: DiaryDateDetailSectionProps) {
  return (
    <div className="flex flex-col gap-[1.15rem] p-[0.9rem_1rem_1.75rem]">
      <div className="grid grid-cols-[2.25rem_1fr_2.25rem] items-center gap-[0.5rem]">
        <TextLink
          href={ROUTES.diary.date(prevDate)}
          className="!grid place-items-center w-[2.25rem] h-[2.25rem] rounded-[999px] border border-[var(--dc-glass-border)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] shadow-[var(--dc-shadow)] !text-[var(--dc-fg-primary)] text-[1.35rem] font-bold leading-none !no-underline [&.is-disabled]:opacity-[0.28]"
          aria-label="이전 날짜"
        >
          ‹
        </TextLink>
        <h2 className="m-0 text-center text-[1rem] font-extrabold text-[#111]">{formatDiaryDate(date)}</h2>
        <TextLink
          href={ROUTES.diary.date(nextDate)}
          className="!grid place-items-center w-[2.25rem] h-[2.25rem] rounded-[999px] border border-[var(--dc-glass-border)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] shadow-[var(--dc-shadow)] !text-[var(--dc-fg-primary)] text-[1.35rem] font-bold leading-none !no-underline [&.is-disabled]:opacity-[0.28]"
          aria-label="다음 날짜"
        >
          ›
        </TextLink>
      </div>

      {error ? <p className="m-0 text-center text-sm text-red-600">{error}</p> : null}

      {themes.length > 0 ? (
        themes.map((group) => (
          <DiaryThemeClipGroup
            key={group.themeId}
            themeName={group.themeName}
            date={date}
            clipCount={group.clipCount}
          />
        ))
      ) : (
        <p className="m-[2rem_0_0] text-center text-[0.85rem] font-semibold text-[rgba(0,_0,_0,_0.4)]">해당 날짜의 클립이 없습니다.</p>
      )}
    </div>
  );
}
