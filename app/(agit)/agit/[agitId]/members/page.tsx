import { AgitMembersTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ agitId: string }>;
};

export default async function AgitMembersPage({ params }: PageProps) {
  const { agitId } = await params;
  return <AgitMembersTemplate agitId={agitId} />;
}
