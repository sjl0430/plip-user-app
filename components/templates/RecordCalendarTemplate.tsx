import { TextLink } from "@/components/atoms";
import { RecordCalendar } from "@/components/organisms/RecordCalendar";
import { AppChromeTemplate } from "@/components/templates/AppChromeTemplate";
import { getAgitById } from "@/config/agit-mock";
import { ROUTES } from "@/config/routes";

type RecordCalendarTemplateProps = {
  agitId: string;
};

export function RecordCalendarTemplate({ agitId }: RecordCalendarTemplateProps) {
  const agit = getAgitById(agitId);
  if (!agit) {
    return (
      <AppChromeTemplate activeTab="agit" variant="light">
        <section className="px-6 py-8">
          <p className="dl-subtitle">방을 찾을 수 없습니다.</p>
          <TextLink href={ROUTES.agit.root} className="dl-link">
            목록으로
          </TextLink>
        </section>
      </AppChromeTemplate>
    );
  }

  return (
    <AppChromeTemplate activeTab="agit" variant="light">
      <RecordCalendar agitId={agitId} />
    </AppChromeTemplate>
  );
}
