import { DiaryThemesListSection } from "@/components/organisms";
import { DiaryTemplate } from "@/components/templates/DiaryTemplate";
import type { UiDiaryTheme } from "@/types/diary/ui";

type DiaryThemesTemplateProps = {
  themes: UiDiaryTheme[];
  error?: string;
};

export function DiaryThemesTemplate({ themes, error }: DiaryThemesTemplateProps) {
  return (
    <DiaryTemplate>
      <DiaryThemesListSection themes={themes} error={error} />
    </DiaryTemplate>
  );
}
