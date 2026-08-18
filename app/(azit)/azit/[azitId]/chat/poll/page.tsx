import { PollCreateTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ azitId: string }>;
};

export default async function AzitPollCreatePage({ params }: PageProps) {
  const { azitId } = await params;
  return <PollCreateTemplate azitId={azitId} />;
}
