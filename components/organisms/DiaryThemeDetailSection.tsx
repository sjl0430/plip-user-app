import { IconButton } from "@/components/atoms";
import { DiaryThemeClipGroup } from "@/components/molecules";
import { DIARY_THEME_DATE_GROUPS } from "@/config/diary-mock";

type DiaryThemeDetailSectionProps = {
  themeId: string;
  themeName: string;
};

export function DiaryThemeDetailSection({
  themeId,
  themeName,
}: DiaryThemeDetailSectionProps) {
  const groups = DIARY_THEME_DATE_GROUPS[themeId] ?? [];

  return (
    <div className="plip-diary-detail">
      <h2 className="plip-diary-detail__date">{themeName}</h2>

      {groups.length > 0 ? (
        groups.map((group) => (
          <DiaryThemeClipGroup
            key={group.date}
            themeName={themeName}
            date={group.date}
            clipCount={group.clipCount}
            showDateLink
          />
        ))
      ) : (
        <p className="plip-diary-empty">해당 테마의 클립이 없습니다.</p>
      )}

      <div className="plip-diary-detail__more">
        <IconButton label="테마 옵션" className="plip-diary-detail__more-btn">
          <span aria-hidden>⋮</span>
        </IconButton>
      </div>
    </div>
  );
}
