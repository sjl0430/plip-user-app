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
    <div className="plip-diary-detail">
      <div className="plip-diary-detail__nav">
        {prev ? (
          <TextLink
            href={ROUTES.diary.date(prev.date)}
            className="plip-diary-detail__fab"
            aria-label="이전 날짜"
          >
            ‹
          </TextLink>
        ) : (
          <span className="plip-diary-detail__fab is-disabled" aria-hidden>
            ‹
          </span>
        )}
        <h2 className="plip-diary-detail__date">{formatDiaryDate(date)}</h2>
        {next ? (
          <TextLink
            href={ROUTES.diary.date(next.date)}
            className="plip-diary-detail__fab"
            aria-label="다음 날짜"
          >
            ›
          </TextLink>
        ) : (
          <span className="plip-diary-detail__fab is-disabled" aria-hidden>
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
        <p className="plip-diary-empty">해당 날짜의 클립이 없습니다.</p>
      )}
    </div>
  );
}
