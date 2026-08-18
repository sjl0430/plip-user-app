import { PollEditTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ azitId: string }>;
};

export default async function AzitPollEditPage({ params }: PageProps) {
  const { azitId } = await params;
  return <PollEditTemplate azitId={azitId} />;
}
