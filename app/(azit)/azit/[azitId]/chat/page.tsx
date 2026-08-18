import { AzitChatTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ azitId: string }>;
};

export default async function AzitChatPage({ params }: PageProps) {
  const { azitId } = await params;
  return <AzitChatTemplate azitId={azitId} />;
}
