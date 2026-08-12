import { IconButton, TextLink } from "@/components/atoms";
import { VideoThumbnailGrid } from "@/components/molecules/VideoThumbnailGrid";
import {
  DIARY_DATE_GROUPS,
  formatDiaryDate,
  formatDiaryWeekday,
} from "@/config/diary-mock";
import { ROUTES } from "@/config/routes";
import type { UiDiaryDateEntry } from "@/types/diary/ui";

type DiaryDateScrollSectionProps = {
  entry: UiDiaryDateEntry;
};

export function DiaryDateScrollSection({ entry }: DiaryDateScrollSectionProps) {
  const groups = DIARY_DATE_GROUPS[entry.date] ?? [];
  const dateLabel = formatDiaryDate(entry.date);
  const weekday = formatDiaryWeekday(entry.date);

  return (
    <section
      className="plip-diary-date-section"
      aria-label={`${dateLabel} 다이어리`}
    >
      <header className="plip-diary-date-section__head">
        <div className="plip-diary-date-section__date-block">
          <TextLink
            href={ROUTES.diary.date(entry.date)}
            className="plip-diary-date-section__date-link"
          >
            {dateLabel}
          </TextLink>
          <span className="plip-diary-date-section__weekday">{weekday}</span>
        </div>
        {entry.relativeLabel ? (
          <span className="plip-diary-date-section__badge">
            {entry.relativeLabel}
          </span>
        ) : null}
      </header>

      <div className="plip-diary-date-section__body">
        {entry.isEmpty || groups.length === 0 ? (
          <TextLink
            href={ROUTES.diary.date(entry.date)}
            className="plip-diary-date-section__empty"
          >
            <span className="plip-diary-date-section__empty-text">
              오늘의 클립을 추가해 보세요
            </span>
            <IconButton
              label="클립 추가"
              className="plip-diary-date-section__add-btn"
            />
          </TextLink>
        ) : (
          <div className="plip-diary-date-section__themes">
            {groups.map((group) => (
              <article
                key={group.themeId}
                className="plip-diary-date-section__theme"
              >
                <div className="plip-diary-date-section__theme-head">
                  <h3>{group.themeName}</h3>
                  <span>{group.clipCount} clips</span>
                </div>
                <VideoThumbnailGrid
                  count={Math.min(group.clipCount, 6)}
                  blurred
                  className="plip-diary-thumb-grid"
                />
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
