import { JoinCompleteTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ azitId: string }>;
};

export default async function AzitJoinedPage({ params }: PageProps) {
  const { azitId } = await params;
  return <JoinCompleteTemplate azitId={azitId} />;
}
