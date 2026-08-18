import { TextLink } from "@/components/atoms";
import { RecordCalendar } from "@/components/organisms/RecordCalendar";
import { DailyLoopAuthTemplate } from "@/components/templates/DailyLoopAuthTemplate";
import { getAzitById } from "@/config/azit-mock";
import { ROUTES } from "@/config/routes";

type RecordCalendarTemplateProps = {
  azitId: string;
};

export function RecordCalendarTemplate({ azitId }: RecordCalendarTemplateProps) {
  const azit = getAzitById(azitId);
  if (!azit) {
    return (
      <DailyLoopAuthTemplate>
        <p className="dl-subtitle">방을 찾을 수 없습니다.</p>
        <TextLink href={ROUTES.azit.root} className="dl-link">
          목록으로
        </TextLink>
      </DailyLoopAuthTemplate>
    );
  }

  return (
    <DailyLoopAuthTemplate>
      <RecordCalendar azitId={azitId} />
    </DailyLoopAuthTemplate>
  );
}
