import { DiaryThemesTemplate } from "@/components/templates";
import { listDiaryThemes } from "@/services/diaryService";
import type { UiDiaryTheme } from "@/types/diary/ui";

export default async function DiaryThemesPage() {
  let themes: UiDiaryTheme[] = [];
  let error: string | undefined;

  try {
    themes = await listDiaryThemes();
  } catch (caught) {
    themes = [];
    error = caught instanceof Error ? caught.message : "테마 목록을 불러오지 못했습니다.";
  }

  return <DiaryThemesTemplate themes={themes} error={error} />;
}
