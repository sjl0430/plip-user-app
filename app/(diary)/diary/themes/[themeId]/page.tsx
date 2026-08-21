import { DiaryThemeDetailTemplate } from "@/components/templates";
import { ApiError } from "@/lib/api/apiFetch";
import { getDiaryThemeTimeline } from "@/services/diaryService";
import type { UiDiaryThemeDateGroup } from "@/types/diary/ui";
import { parseThemeId } from "@/types/diary/schema";
import { notFound } from "next/navigation";

type DiaryThemePageProps = {
  params: Promise<{ themeId: string }>;
};

export default async function DiaryThemePage({ params }: DiaryThemePageProps) {
  const { themeId } = await params;
  const parsedId = parseThemeId(themeId);

  if (!parsedId.ok) {
    notFound();
  }

  let themeName = "";
  let dateGroups: UiDiaryThemeDateGroup[] = [];
  let error: string | undefined;

  try {
    const result = await getDiaryThemeTimeline(parsedId.data);
    themeName = result.theme.name;
    dateGroups = result.dateGroups;
  } catch (caught) {
    if (caught instanceof ApiError && caught.status === 404) {
      notFound();
    }

    error = caught instanceof Error ? caught.message : "테마 상세를 불러오지 못했습니다.";
  }

  return (
    <DiaryThemeDetailTemplate
      themeId={parsedId.data}
      themeName={themeName}
      dateGroups={dateGroups}
      error={error}
    />
  );
}
