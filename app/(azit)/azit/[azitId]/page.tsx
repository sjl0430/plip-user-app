import { AzitDetailTemplate } from "@/components/templates";

type AzitDetailPageProps = {
  params: Promise<{ azitId: string }>;
};

export default async function AzitDetailPage({ params }: AzitDetailPageProps) {
  const { azitId } = await params;
  return <AzitDetailTemplate azitId={azitId} />;
}
