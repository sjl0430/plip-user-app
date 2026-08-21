import { DiaryDateTemplate } from "@/components/templates";
import { getDiaryDateGroup } from "@/services/diaryService";
import type { UiDiaryDateGroup } from "@/types/diary/ui";
import {
  getTodayKstDateString,
  isFutureDiaryDate,
  parseDiaryDateParam,
  shiftDiaryDate,
} from "@/types/diary/schema";
import { notFound } from "next/navigation";

type DiaryDatePageProps = {
  params: Promise<{ date: string }>;
};

export default async function DiaryDatePage({ params }: DiaryDatePageProps) {
  const { date } = await params;
  const parsedDate = parseDiaryDateParam(date);

  if (!parsedDate || isFutureDiaryDate(parsedDate)) {
    notFound();
  }

  const nextDate = shiftDiaryDate(parsedDate, 1);
  const canGoNext = !isFutureDiaryDate(nextDate, getTodayKstDateString());

  let dateGroup: UiDiaryDateGroup = { date: parsedDate, themes: [] };
  let error: string | undefined;

  try {
    dateGroup = await getDiaryDateGroup(parsedDate);
  } catch (caught) {
    dateGroup = { date: parsedDate, themes: [] };
    error = caught instanceof Error ? caught.message : "날짜 상세를 불러오지 못했습니다.";
  }

  return (
    <DiaryDateTemplate
      dateGroup={dateGroup}
      prevDate={shiftDiaryDate(parsedDate, -1)}
      nextDate={nextDate}
      canGoNext={canGoNext}
      error={error}
    />
  );
}
