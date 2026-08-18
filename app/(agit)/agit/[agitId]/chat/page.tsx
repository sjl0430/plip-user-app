import { AgitChatTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ agitId: string }>;
};

export default async function AgitChatPage({ params }: PageProps) {
  const { agitId } = await params;
  return <AgitChatTemplate agitId={agitId} />;
}
