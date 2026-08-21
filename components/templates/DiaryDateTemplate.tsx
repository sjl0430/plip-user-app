import { DiaryDateDetailSection } from "@/components/organisms";
import { DiaryTemplate } from "@/components/templates/DiaryTemplate";
import type { UiDiaryDateGroup } from "@/types/diary/ui";

type DiaryDateTemplateProps = {
  dateGroup: UiDiaryDateGroup;
  prevDate: string;
  nextDate: string;
  canGoNext: boolean;
  error?: string;
};

export function DiaryDateTemplate({
  dateGroup,
  prevDate,
  nextDate,
  canGoNext,
  error,
}: DiaryDateTemplateProps) {
  return (
    <DiaryTemplate fixedMain>
      <DiaryDateDetailSection
        date={dateGroup.date}
        themes={dateGroup.themes}
        prevDate={prevDate}
        nextDate={nextDate}
        canGoNext={canGoNext}
        error={error}
      />
    </DiaryTemplate>
  );
}
