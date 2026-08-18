import { AzitTopicCreateTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ azitId: string }>;
};

export default async function AzitTopicCreatePage({ params }: PageProps) {
  const { azitId } = await params;
  return <AzitTopicCreateTemplate azitId={azitId} />;
}
