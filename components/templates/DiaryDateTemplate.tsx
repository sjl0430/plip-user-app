import { DiaryDateDetailSection } from "@/components/organisms";
import { DiaryTemplate } from "@/components/templates/DiaryTemplate";

type DiaryDateTemplateProps = {
  date: string;
};

export function DiaryDateTemplate({ date }: DiaryDateTemplateProps) {
  return (
    <DiaryTemplate>
      <DiaryDateDetailSection date={date} />
    </DiaryTemplate>
  );
}
