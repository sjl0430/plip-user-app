import { AgitDetailTemplate } from "@/components/templates";

type AgitDetailPageProps = {
  params: Promise<{ agitId: string }>;
};

export default async function AgitDetailPage({ params }: AgitDetailPageProps) {
  const { agitId } = await params;
  return <AgitDetailTemplate agitId={agitId} />;
}
