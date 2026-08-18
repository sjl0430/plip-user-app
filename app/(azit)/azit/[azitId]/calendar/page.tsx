import { RecordCalendarTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ azitId: string }>;
};

export default async function AzitCalendarPage({ params }: PageProps) {
  const { azitId } = await params;
  return <RecordCalendarTemplate azitId={azitId} />;
}
