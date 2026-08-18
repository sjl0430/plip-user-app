import { RecordCalendarTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ agitId: string }>;
};

export default async function AgitCalendarPage({ params }: PageProps) {
  const { agitId } = await params;
  return <RecordCalendarTemplate agitId={agitId} />;
}
