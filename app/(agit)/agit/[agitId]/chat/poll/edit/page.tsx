import { PollEditTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ agitId: string }>;
};

export default async function AgitPollEditPage({ params }: PageProps) {
  const { agitId } = await params;
  return <PollEditTemplate agitId={agitId} />;
}
