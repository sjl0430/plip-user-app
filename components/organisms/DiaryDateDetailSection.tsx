import { DiaryThemeClipGroup } from "@/components/molecules";
import { DIARY_DATE_GROUPS, formatDiaryDate } from "@/config/diary-mock";

type DiaryDateDetailSectionProps = {
  date: string;
};

export function DiaryDateDetailSection({ date }: DiaryDateDetailSectionProps) {
  const groups = DIARY_DATE_GROUPS[date] ?? [];

  return (
    <div className="flex w-full flex-col gap-8">
      <h2 className="text-lg font-semibold sm:text-xl">{formatDiaryDate(date)}</h2>

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
        <p className="text-sm text-zinc-500">해당 날짜의 클립이 없습니다.</p>
      )}
    </div>
  );
}
