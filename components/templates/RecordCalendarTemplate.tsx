import { TextLink } from "@/components/atoms";
import { RecordCalendar } from "@/components/organisms/RecordCalendar";
import { AppChromeTemplate } from "@/components/templates/AppChromeTemplate";
import { getAzitById } from "@/config/azit-mock";
import { ROUTES } from "@/config/routes";

type RecordCalendarTemplateProps = {
  azitId: string;
};

export function RecordCalendarTemplate({ azitId }: RecordCalendarTemplateProps) {
  const azit = getAzitById(azitId);
  if (!azit) {
    return (
      <AppChromeTemplate activeTab="azit" variant="light">
        <section className="px-6 py-8">
          <p className="dl-subtitle">방을 찾을 수 없습니다.</p>
          <TextLink href={ROUTES.azit.root} className="dl-link">
            목록으로
          </TextLink>
        </section>
      </AppChromeTemplate>
    );
  }

  return (
    <AppChromeTemplate activeTab="azit" variant="light">
      <RecordCalendar azitId={azitId} />
    </AppChromeTemplate>
  );
}
