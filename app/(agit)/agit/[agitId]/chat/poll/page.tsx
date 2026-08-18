import { PollCreateTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ agitId: string }>;
};

export default async function AgitPollCreatePage({ params }: PageProps) {
  const { agitId } = await params;
  return <PollCreateTemplate agitId={agitId} />;
}
