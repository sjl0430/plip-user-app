import { DiaryThemeDetailSection } from "@/components/organisms";
import { DiaryTemplate } from "@/components/templates/DiaryTemplate";
import type { UiDiaryThemeDateGroup } from "@/types/diary/ui";

type DiaryThemeDetailTemplateProps = {
  themeId: string;
  themeName: string;
  dateGroups: UiDiaryThemeDateGroup[];
  error?: string;
};

export function DiaryThemeDetailTemplate({
  themeId,
  themeName,
  dateGroups,
  error,
}: DiaryThemeDetailTemplateProps) {
  return (
    <DiaryTemplate>
      <DiaryThemeDetailSection
        themeId={themeId}
        themeName={themeName}
        dateGroups={dateGroups}
        error={error}
      />
    </DiaryTemplate>
  );
}
