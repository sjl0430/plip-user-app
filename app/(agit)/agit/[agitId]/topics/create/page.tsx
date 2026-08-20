import { AgitTopicCreateTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ agitId: string }>;
};

export default async function AgitTopicCreatePage({ params }: PageProps) {
  const { agitId } = await params;
  return <AgitTopicCreateTemplate agitId={agitId} />;
}
