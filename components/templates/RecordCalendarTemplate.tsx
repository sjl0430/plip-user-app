import { TextLink } from "@/components/atoms";
import { RecordCalendar } from "@/components/organisms/RecordCalendar";
import { DailyLoopAuthTemplate } from "@/components/templates/DailyLoopAuthTemplate";
import { getAgitById } from "@/config/agit-mock";
import { ROUTES } from "@/config/routes";

type RecordCalendarTemplateProps = {
  agitId: string;
};

export function RecordCalendarTemplate({ agitId }: RecordCalendarTemplateProps) {
  const agit = getAgitById(agitId);
  if (!agit) {
    return (
      <DailyLoopAuthTemplate>
        <p className="dl-subtitle">방을 찾을 수 없습니다.</p>
        <TextLink href={ROUTES.agit.root} className="dl-link">
          목록으로
        </TextLink>
      </DailyLoopAuthTemplate>
    );
  }

  return (
    <DailyLoopAuthTemplate>
      <RecordCalendar agitId={agitId} />
    </DailyLoopAuthTemplate>
  );
}
