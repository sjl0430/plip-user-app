import { DiaryDateDetailSection } from "@/components/organisms";
import { DiaryTemplate } from "@/components/templates/DiaryTemplate";
import type { UiDiaryDateGroup } from "@/types/diary/ui";

type DiaryDateTemplateProps = {
  dateGroup: UiDiaryDateGroup;
  prevDate: string;
  nextDate: string;
  error?: string;
};

export function DiaryDateTemplate({
  dateGroup,
  prevDate,
  nextDate,
  error,
}: DiaryDateTemplateProps) {
  return (
    <DiaryTemplate>
      <DiaryDateDetailSection
        date={dateGroup.date}
        themes={dateGroup.themes}
        prevDate={prevDate}
        nextDate={nextDate}
        error={error}
      />
    </DiaryTemplate>
  );
}
