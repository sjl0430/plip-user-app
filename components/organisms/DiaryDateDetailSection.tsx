import { TextLink } from "@/components/atoms";
import { DiaryThemeClipGroup } from "@/components/molecules";
import {
  DIARY_DATE_GROUPS,
  DIARY_MAIN_ENTRIES,
  formatDiaryDate,
} from "@/config/diary-mock";
import { ROUTES } from "@/config/routes";

type DiaryDateDetailSectionProps = {
  date: string;
};

export function DiaryDateDetailSection({ date }: DiaryDateDetailSectionProps) {
  const groups = DIARY_DATE_GROUPS[date] ?? [];
  const index = DIARY_MAIN_ENTRIES.findIndex((entry) => entry.date === date);
  const prev = index > 0 ? DIARY_MAIN_ENTRIES[index - 1] : undefined;
  const next =
    index >= 0 && index < DIARY_MAIN_ENTRIES.length - 1
      ? DIARY_MAIN_ENTRIES[index + 1]
      : undefined;

  return (
    <div className="flex flex-col gap-[1.15rem] p-[0.9rem_1rem_1.75rem]">
      <div className="grid grid-cols-[2.25rem_1fr_2.25rem] items-center gap-[0.5rem]">
        {prev ? (
          <TextLink
            href={ROUTES.diary.date(prev.date)}
            className="!grid place-items-center w-[2.25rem] h-[2.25rem] rounded-[999px] border border-[var(--dc-glass-border)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] shadow-[var(--dc-shadow)] !text-[var(--dc-fg-primary)] text-[1.35rem] font-bold leading-none !no-underline [&.is-disabled]:opacity-[0.28]"
            aria-label="이전 날짜"
          >
            ‹
          </TextLink>
        ) : (
          <span className="!grid place-items-center w-[2.25rem] h-[2.25rem] rounded-[999px] border border-[var(--dc-glass-border)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] shadow-[var(--dc-shadow)] !text-[var(--dc-fg-primary)] text-[1.35rem] font-bold leading-none !no-underline [&.is-disabled]:opacity-[0.28] is-disabled" aria-hidden>
            ‹
          </span>
        )}
        <h2 className="m-0 text-center text-[1rem] font-extrabold text-[#111]">{formatDiaryDate(date)}</h2>
        {next ? (
          <TextLink
            href={ROUTES.diary.date(next.date)}
            className="!grid place-items-center w-[2.25rem] h-[2.25rem] rounded-[999px] border border-[var(--dc-glass-border)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] shadow-[var(--dc-shadow)] !text-[var(--dc-fg-primary)] text-[1.35rem] font-bold leading-none !no-underline [&.is-disabled]:opacity-[0.28]"
            aria-label="다음 날짜"
          >
            ›
          </TextLink>
        ) : (
          <span className="!grid place-items-center w-[2.25rem] h-[2.25rem] rounded-[999px] border border-[var(--dc-glass-border)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] shadow-[var(--dc-shadow)] !text-[var(--dc-fg-primary)] text-[1.35rem] font-bold leading-none !no-underline [&.is-disabled]:opacity-[0.28] is-disabled" aria-hidden>
            ›
          </span>
        )}
      </div>

      {groups.length > 0 ? (
        groups.map((group) => (
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
