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
    <div className="flex w-full flex-col gap-8">
      <h2 className="text-lg font-semibold sm:text-xl">{themeName}</h2>

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
        <p className="text-sm text-zinc-500">해당 테마의 클립이 없습니다.</p>
      )}
    </div>
  );
}
