import { JoinCompleteTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ agitId: string }>;
};

export default async function AgitJoinedPage({ params }: PageProps) {
  const { agitId } = await params;
  return <JoinCompleteTemplate agitId={agitId} />;
}
